/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcast
// ====================================================

export interface getPodcast_getPodcast_podcast_creator {
  __typename: "User";
  id: number;
}

export interface getPodcast_getPodcast_podcast_episodes {
  __typename: "Episode";
  title: string;
  updatedAt: any;
}

export interface getPodcast_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  updatedAt: any;
  category: string;
  rating: number;
  description: string;
  coverImg: string;
  creator: getPodcast_getPodcast_podcast_creator;
  episodes: getPodcast_getPodcast_podcast_episodes[] | null;
}

export interface getPodcast_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: getPodcast_getPodcast_podcast | null;
}

export interface getPodcast {
  getPodcast: getPodcast_getPodcast;
}

export interface getPodcastVariables {
  input: PodcastSearchInput;
}
