/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: signUpMutation
// ====================================================

export interface signUpMutation_createAccount {
  __typename: "CreateAccountOutput";
  ok: boolean;
  error: string | null;
}

export interface signUpMutation {
  createAccount: signUpMutation_createAccount;
}

export interface signUpMutationVariables {
  email: string;
  password: string;
  role?: UserRole | null;
}
