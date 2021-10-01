import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React,{useState} from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { CATEGORY_TYPES, URL } from '../../const';
import { createEpisode, createEpisodeVariables } from '../../__generated__/createEpisode';

const CREATE_EPISODE_MUTATION = gql`
  mutation createEpisode($input: CreateEpisodeInput!) {
    createEpisode(input:$input) {
      ok
      error
      id
    }
  }
`

interface IFormProps {
  title: string;
  category: string;
  file: FileList;
}

interface IEpisodeParams{ 
id:string
}

export const CreateEpisode = ()=>{
  const [uploading, setUploading] = useState(false)
  const params = useParams<IEpisodeParams>()
  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
  });
  const onCompleted = (data: createEpisode) => {
    const { createEpisode: { ok, error } } = data
    if (ok) {
      setUploading(false)
    }
  }
  const [createEpisodeMutation, { data }] = useMutation<
  createEpisode,
  createEpisodeVariables
>(CREATE_EPISODE_MUTATION, {
  onCompleted,
});

const onSubmit = async () => {
  try {
    setUploading(true);
    const { file, title, category } = getValues();
    const actualFile = file[0];
    const formBody = new FormData();
    formBody.append("file", actualFile);
    const { url: audioFile } = await (
      await fetch(`${URL}/upload`, {
        method: "POST",
        body: formBody,
      })
    ).json();
    createEpisodeMutation({
      variables: {
        input: {
          podcastId: +params.id,
          title,
          category,
          audioFile,
        },
      },
    });
  } catch (e) { }
};
  return (
    <div className="container flex flex-col items-center mt-52">

      <h4 className="font-semibold text-2xl mb-3">Add Episode</h4>
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
        <select {...register("category", { required: true })}>
          {CATEGORY_TYPES.map(category => <option value={category}>{category}</option>)}
        </select>
        <div>
          <input
            {...register("file", { required: true })}
            type="file"
            name="file"
            accept="audio/*"
          />
        </div>
        <Button
          loading={uploading}
          canClick={formState.isValid}
          actionText="Create Episode"
        />
        {data?.createEpisode?.error && (
        <FormError errorMessage={data.createEpisode.error} />
      )}
      </form>
    </div>
  );
}
