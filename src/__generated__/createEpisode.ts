/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createPodcast
// ====================================================

export interface createEpisode_createEpisode {
  __typename: "CreateEpisodeOutput";
  error: string | null;
  ok: boolean;
  id: number | null;
}

export interface createEpisode {
  createEpisode: createEpisode_createEpisode;
}

export interface createEpisodeVariables {
  input: CreateEpisodeInput;
}
