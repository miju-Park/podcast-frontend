import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { CATEGORY_TYPES } from '../../const';
import { createPodcast, createPodcastVariables } from '../../__generated__/createPodcast';

const CREATE_PODCAST_MUTATION = gql`
  mutation createPodcast($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      error
      ok
      id
    }
  }
`;

interface IFormProps {
  title: string;
  category: string;
  description: string;
  file: FileList;
}

export const CreatePodcast = () => {

  const onCompleted = (data: createPodcast) => {
    const { createPodcast: { ok, error } } = data
    if (ok) {
      setUploading(false)
    }
  }
  const [createPodcastMutation, { data }] = useMutation<
    createPodcast,
    createPodcastVariables
  >(CREATE_PODCAST_MUTATION, {
    onCompleted,
  });
  const [uploading, setUploading] = useState(false)
  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, title, category, description } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const { url: coverImg } = await (
        await fetch("http://localhost:4000/upload/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      // setImageUrl(coverImg);
      createPodcastMutation({
        variables: {
          input: {
            title,
            category,
            description,
            coverImg,
          },
        },
      });
    } catch (e) { }
  };

  return (
    <div className="container flex flex-col items-center mt-52">

      <h4 className="font-semibold text-2xl mb-3">Add Podcast</h4>
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
        <input
          {...register("description")}
          className="input"
          type="text"
          name="description"
          placeholder="description of podcast"
        />
        <div>
          <input
            {...register("file", { required: true })}
            type="file"
            name="file"
            accept="image/*"
          />
        </div>
        <Button
          loading={uploading}
          canClick={formState.isValid}
          actionText="Create Podcast"
        />
        {data?.createPodcast?.error && (
        <FormError errorMessage={data.createPodcast.error} />
      )}
      </form>
    </div>
  );

}
