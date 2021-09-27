
import { gql, useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useMe } from "../../hooks/useMe"
import {
  editProfile,
  editProfileVariables,
} from "../../__generated__/editProfile";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
            }
          `,
          data: {
            email: newEmail,
          },
        });
      }
      alert('Suceessfully change user info')
    }
  };
  const [editProfile, { loading }] = useMutation<
    editProfile,
    editProfileVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h4 className="font-semibold text-2xl mb-3">Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          className="rounded-3xl p-3 focus:outline-none focus:ring-2 focus:ring-opacity-80 focus:ring-pink-50"
          placeholder="email"
          type="email"
          required
          {...register("email",{ required: true })}
          name="email"
        />
        <input
          className="rounded-3xl p-3 focus:outline-none focus:ring-2 focus:ring-opacity-80 focus:ring-pink-50"
          placeholder="password"
          type="password"
          required
          {...register("password", { required: true })}
          name="password"
        />
       <button
              type="submit"
              className="bg-gray-900 text-white py-3 w-40 hover:opacity-90 rounded-3xl"
            >
         Save Profile</button>
      </form>
    </div>
  );
};