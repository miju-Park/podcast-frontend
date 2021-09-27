import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { isLoggedInVar, tokenVar } from "../../apollo";
import { LOCALSTORAGE_TOKEN } from "../../const";
import { Emoji } from "../../components/emojiWrapper";

interface ILoginForm {
  email: string;
  password: string;
}

interface ILoginMutation {
  login: {
    error?: string;
    ok: boolean;
    token?: string;
  };
}

interface ILoginMutationVariables extends ILoginForm {}

const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      ok
      error
      token
    }
  }
`;

export const Login: React.FC = () => {
  const { register, handleSubmit, getValues } = useForm<ILoginForm>();

  const onCompleted = (data: ILoginMutation) => {
    const { ok, token } = data.login;
    if (!ok) return;
    if (token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      tokenVar(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { data, loading }] = useMutation<
    ILoginMutation,
    ILoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted
  });
  const onValid = () => {
    if (loading) return;
    loginMutation({
      variables: {
        email: getValues().email,
        password: getValues().password
      }
    });
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-red-300 to-pink-400">
      <div className="bg-transparent w-full max-w-lg text-center pt-5 pb-7 rounded-lg">
        <h1 className="text-2xl text-white">
          Welcome Back <Emoji emoji="👋" label="hi" />
        </h1>
        <form
          className="grid gap-3 mt-3 px-10"
          onSubmit={handleSubmit(onValid)}
        >
          <input
            className="input rounded-3xl p-3 focus:outline-none focus:ring-2 focus:ring-opacity-80 focus:ring-pink-50"
            placeholder="email"
            type="email"
            required
            {...register("email", { required: true })}
            name="email"
          />
          <input
            className="input rounded-3xl p-3 focus:outline-none focus:ring-2 focus:ring-opacity-80 focus:ring-pink-50"
            placeholder="password"
            required
            {...register("password", { required: true })}
            type="password"
            name="password"
          />
          {data?.login.error && (
            <div className="text-red-500 text-sm pl-1 font-bold">
              {data.login.error}
            </div>
          )}
          <div>
            <button
              type="submit"
              className="bg-gray-900 text-white py-3 w-40 hover:opacity-90 rounded-3xl"
            >
              {loading ? "loading" : "Sign In"}
            </button>
          </div>
          <div className="text-gray-900">
            new here?{" "}
            <Link to="/create-account" className="text-white hover:underline">
              create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
