/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createPodcast
// ====================================================

export interface createPodcast_createPodcast {
  __typename: "CreatePodcastOutput";
  error: string | null;
  ok: boolean;
  id: number | null;
}

export interface createPodcast {
  createPodcast: createPodcast_createPodcast;
}

export interface createPodcastVariables {
  input: CreatePodcastInput;
}
