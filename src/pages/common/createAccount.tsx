import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Emoji } from "../../components/emojiWrapper";

enum UserRole {
  Listener = "Listener",
  Host = "Host"
}

interface ICreateAccountMutation {
  createAccount: {
    ok: boolean;
    error?: string;
  };
}

interface ICreateAccountMutationVariables {
  email: string;
  password: string;
  role: UserRole;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation signUpMutation(
    $email: String!
    $password: String!
    $role: UserRole
  ) {
    createAccount(input: { email: $email, password: $password, role: $role }) {
      ok
      error
    }
  }
`;

export const CreateAccount: React.FC = () => {
  const { register, handleSubmit, watch, getValues } = useForm();
  const history = useHistory();
  const onCompleted = (data: ICreateAccountMutation) => {
    if (data.createAccount.ok) history.push("/");
  };
  const [createAccountMutation, { data, loading }] = useMutation<
    ICreateAccountMutation,
    ICreateAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });

  const onValid = () => {
    if (loading) return;
    const { email, password, role } = getValues();
    createAccountMutation({
      variables: {
        email: email,
        password: password,
        role: role
      }
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-red-300">
      <div className="bg-transparent w-full max-w-lg text-center pt-5 pb-7 rounded-lg">
        <h1 className="text-2xl text-white">
          Create Account <Emoji emoji="🎉" label="tada" />
        </h1>
        <form
          className="grid gap-3 mt-3 px-10"
          onSubmit={handleSubmit(onValid)}
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
          <hr />
          <h2 className="text-white">And I am a..</h2>
          <div className="flex">
            <input
            {...register("role", { required: true })}
              type="radio"
              className="hidden"
              id="listener"
              name="role"
              required
              value={UserRole.Listener}
            />
            <label
              className={`cursor-pointer bg-white rounded-l-3xl w-6/12 p-3 hover:underline ${
                watch("role") === UserRole.Listener
                  ? "text-white bg-gray-900"
                  : ""
              }`}
              htmlFor="listener"
            >
              LISTENER
            </label>
            <input
              {...register("role", { required: true })}
              type="radio"
              className="hidden"
              id="host"
              name="role"
              required
              value={UserRole.Host}
            />
            <label
              className={`cursor-pointer bg-white rounded-r-3xl w-6/12 p-3 hover:underline ${
                watch("role") === UserRole.Host ? "text-white bg-gray-900" : ""
              }`}
              htmlFor="host"
            >
              HOST
            </label>
          </div>
          {data?.createAccount.error && (
            <div className="text-red-500 text-sm pl-1 font-bold">
              {data.createAccount.error}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="bg-gray-900 text-white py-3 w-40 hover:opacity-90 rounded-3xl"
            >
              {loading ? "loading" : "Sign Up"}
            </button>
          </div>
          <div className="text-gray-900">
            Already a member?{" "}
            <Link to="/" className="text-white hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
