import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { CATEGORY_TYPES } from '../../const';
import { getPodcast, getPodcast_getPodcast_podcast } from '../../__generated__/getPodcast';
import { updatePodcast, updatePodcastVariables } from '../../__generated__/updatePodcast';

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
}
interface IPodcastParams {
  id:string
}

export const EditPodcast = ()=>{
  const history = useHistory()
  const [editPodcast, {loading}] = useMutation<updatePodcast, updatePodcastVariables>(EDIT_PODCAST_MUTATION)
  const location = useLocation<{podcast:getPodcast_getPodcast_podcast}>();
  const params = useParams<IPodcastParams>()

const podcast = location?.state?.podcast

const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
  mode: "onChange",
  defaultValues: {
   title: podcast?.title??'',
   category:podcast?.category ??'',
   description: podcast?.description ,
  },
});
const onSubmit = async () => {
  try {
    const { title, category, description, file}  = getValues();
    let coverImg = ''
    if(file.length>0) {
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url } = await (
        await fetch("http://localhost:4000/upload/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      coverImg = url
    }
    editPodcast({
      variables: {
        input : {
          id: +params.id, 
          payload: {
            title,
            category,
            description,
            ...(coverImg !== '' && {coverImg})
          }
        }
      }
    })
    history.push('/')
  }catch(e) {

  }
  
};
return(
    <div className="container flex flex-col items-center mt-52">

      <h4 className="font-semibold text-2xl mb-3">Edit Podcast</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          {...register("title", {required:true})}
          className="input"
          type="text"
          name="title"
          placeholder="Podcast title"
        />
        <select
         {...register("category", {required:true})}
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
        <Button
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