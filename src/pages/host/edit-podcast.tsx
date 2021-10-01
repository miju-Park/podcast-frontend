import { useApolloClient, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, {useCallback} from 'react'
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { CATEGORY_TYPES, URL } from '../../const';
import { getPodcast, getPodcast_getPodcast_podcast } from '../../__generated__/getPodcast';
import { updatePodcast, updatePodcastVariables } from '../../__generated__/updatePodcast';
import { GET_PODCAST_QUERY } from '../common/podcastDetail';
import moment from 'moment'

const EDIT_PODCAST_MUTATION = gql`
  mutation updatePodcast($input: UpdatePodcastInput!) {
    updatePodcast(input:$input) {
      ok
      error
    }
  }
`

interface IFormProps {
  title: string;
  category: string;
  description: string;
  file: FileList;
  episodes: getPodcast_getPodcast_podcast['episodes']
}
interface IPodcastParams {
  id: string
}

export const EditPodcast = () => {
  const client = useApolloClient();
  const history = useHistory()
  const params = useParams<IPodcastParams>()
  const [editPodcast, { loading }] = useMutation<updatePodcast, updatePodcastVariables>(EDIT_PODCAST_MUTATION, {
    refetchQueries: [
      {
        query: GET_PODCAST_QUERY,
        variables: {
          input: {
            id: +params.id
          }
        }
      }
    ],
  })
  const location = useLocation<{ podcast: getPodcast_getPodcast_podcast }>();


  const podcast = location?.state?.podcast

  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      title: podcast?.title ?? '',
      category: podcast?.category ?? '',
      description: podcast?.description,
    },
  });


  const onSubmit = async () => {
    try {
      const { title, category, description, file } = getValues();
      let coverImg = ''
      if (file.length > 0) {
        const actualFile = file[0];
        const formBody = new FormData();
        formBody.append("file", actualFile);
        const { url } = await (
          await fetch(`${URL}/upload`, {
            method: "POST",
            body: formBody,
          })
        ).json();
        coverImg = url
      }
      editPodcast({
        variables: {
          input: {
            id: +params.id,
            payload: {
              title,
              category,
              description,
              ...(coverImg !== '' && { coverImg })
            }
          }
        }
      })
      history.push('/')
    } catch (e) {

    }

  };
  const moveAddEpisode = useCallback(()=>{
    history.push(`/add-episode/${params.id}`)
  },[history, params.id])
  return (
    <div className="container flex flex-col items-center mt-52">

      <h4 className="font-semibold text-2xl mb-3">Edit Podcast</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register("title", { required: true })}
          className="input"
          type="text"
          name="title"
          placeholder="Podcast title"
        />
        <select
          {...register("category", { required: true })}
        >
          {CATEGORY_TYPES.map(category => <option value={category}>{category}</option>)}
        </select>
        <input
          {...register("description")}
          className="input"
          type="text"
          name="description"
          placeholder="description of podcast"
        />
        <div>
          <input
            {...register("file")}
            type="file"
            name="file"
            accept="image/*"
          />
        </div>
        {podcast?.episodes?.map(episode=>(
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
         <Button
         onClick={moveAddEpisode}
          loading={false}
          canClick={true}
          actionText="Add Episodes"
        />
        <Button
        onClick={handleSubmit(onSubmit)}
          loading={false}
          canClick={true}
          actionText="Save Podcast"
        />
        {/* {data?.updatePodcast?.error && (
        <FormError errorMessage={data.updatePodcast.error} />
      )} */}
      </form>
    </div>
  );
}