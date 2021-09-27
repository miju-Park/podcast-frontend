/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreatePodcastInput {
  title: string;
  category: string;
  description: string;
  coverImg: string;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface PodcastSearchInput {
  id: number;
}

export interface UpdatePodcastInput {
  id: number;
  payload: UpdatePodcastPayload;
}

export interface UpdatePodcastPayload {
  title?: string | null;
  category?: string | null;
  rating?: number | null;
  description?: string | null;
  coverImg?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
