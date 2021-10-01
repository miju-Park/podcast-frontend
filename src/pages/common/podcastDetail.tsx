import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import React, { useCallback ,useMemo} from 'react'
import { useHistory, useParams } from 'react-router'
import { getPodcast, getPodcastVariables } from '../../__generated__/getPodcast'
import moment from 'moment'
import { useMe } from '../../hooks/useMe'
import { UserRole } from '../../__generated__/globalTypes'
import { Link } from 'react-router-dom'
import { DeletePodcast, DeletePodcastVariables } from '../../__generated__/DeletePodcast'
import { PODCASTS_QUERY } from './podcasts'
{/* <i class="fas fa-headphones-alt"></i> */}

export const GET_PODCAST_QUERY = gql`
  query getPodcast($input: PodcastSearchInput!) {
    getPodcast(input:$input) {
      ok
      error
      podcast {
        id
        title
        updatedAt
        category
        rating
        description
        creator {
          id
        }
        episodes {
          title
          updatedAt
        }
      }
    }
  }
`
const DELETE_PODCAST_QUERY = gql`
  mutation DeletePodcast($input: PodcastSearchInput!) {
    deletePodcast(input:$input) {
      ok
      error
    }
  }
`


interface IPodcastParams {
  id: string
}

const PodcastDetail = () => {
  const {data:me} = useMe()
  const params = useParams<IPodcastParams>()
  const history = useHistory()
  const { loading, data } = useQuery<getPodcast, getPodcastVariables>(GET_PODCAST_QUERY, {
    variables: {
      input: {
        id: +params.id
      }
    },
    fetchPolicy:"cache-and-network"
  })
  const [deletePodcastMutation, { data:deleteData }] = useMutation<
  DeletePodcast,
  DeletePodcastVariables
>(DELETE_PODCAST_QUERY, {
  refetchQueries:[PODCASTS_QUERY]
});

  const isEditable = useMemo(()=> me?.me.id === data?.getPodcast?.podcast?.creator.id,[data, me])
  const movePrevPage = useCallback(()=>{
    history.push('/')
  },[history])
  const {title='', category, episodes} = data?.getPodcast?.podcast??{}

  const moveEditPage = useCallback(()=>{
    history.push({
      pathname:`/edit-podcast/${params.id}`,
      state: {podcast : data?.getPodcast?.podcast??{}}
    })
  },[history, params.id, data?.getPodcast])

  const deletePodcast = useCallback(()=>{
    deletePodcastMutation({
      variables: {
        input: {
          id: +params.id
        }
      }
    })
    history.push('/')
  },[deletePodcastMutation, params.id, history])

  if(loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-widest">Loading...</span>
      </div>
    )
  }
  return (
    <div>   
      <div className="w-full py-10 bg-gradient-to-r from-red-300 to-pink-400">
        <button onClick={movePrevPage} className="text-white text-2xl  ml-4 hover:text-purple-600">&larr;</button>
        <span className="text-white text-2xl ml-2">{title}</span>
      </div>
      <div className="flex flex-col justify-center mt-4 w-1/4 items-center mx-auto mb-4">
        <div
          className="w-32 h-32  mb-4 bg-center bg-cover"
          style={{
            backgroundImage: `url(https://seeklogo.com/images/A/apple-podcast-logo-0CF661058F-seeklogo.com.png)`
          }}
        />
        <div className="w-full underline"># {category}</div>
        <h3 className="w-full font-bold">{title}</h3>
      </div>
      {episodes?.length ===0 && <div className="h-full flex justify-center items-center text-gray-400">There is no episode yet... 
        </div>}
      {episodes?.map(episode=>(
        <div className="flex w-2/4 mx-auto border-gray-300 border-b-2 justify-between">
          <div>
            <span>{episode.title}</span>
            <h5 className="text-sm mt-2 text-gray-500">{moment(episode.updatedAt).format("YYYY. MM. DD")}</h5>
            </div>
            <div
          className="w-16 h-16  bg-center bg-cover cursor-pointer"
          style={{
            backgroundImage: `url(https://previews.123rf.com/images/veronawinner/veronawinner1806/veronawinner180600010/102641645-headphones-icon-headset-symbol-abstract-dj-icon.jpg)`
          }}
        />
          </div>
      ))}
      {isEditable && <div>
        <button onClick={moveEditPage}>Edit</button>
        <button onClick={deletePodcast}>Delete</button>
        </div>}
    </div>
  )
}
export default PodcastDetail