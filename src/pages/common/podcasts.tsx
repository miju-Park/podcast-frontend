import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { getAllPodcasts } from "../../__generated__/getAllPodcasts";
import { Podcast as PodcastComponent } from "../../components/podcast";

export const PODCASTS_QUERY = gql`
  query getAllPodcasts {
    getAllPodcasts {
      ok
      error
      podcasts {
        id
        updatedAt
        title
        description
        coverImg
        category
        rating
        episodes {
          id
          updatedAt
          title
          category
        }
      }
    }
  }
`;

interface IFormProps {
  searchTerm: string;
}

const Podcasts = () => {
  const { data, loading } = useQuery<getAllPodcasts>(PODCASTS_QUERY);
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const onSearchSubmit = () => {};
  return (
    <div>
      <div className="w-full py-10 bg-gradient-to-r from-red-300 to-pink-400">
        <span className="text-white text-2xl ml-10">Today's Rating</span>
      </div>
      {loading &&  
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-widest">Loading...</span>
      </div>
    }

      {!loading && (
        <div className="grid md:grid-cols-3">
          {data?.getAllPodcasts?.podcasts?.map((podcast, index) =>
        (
              <PodcastComponent
                key={podcast.id}
                id={podcast.id}
                title={podcast.title}
                updatedAt={podcast.updatedAt}
                rating={podcast.rating}
                coverImg={podcast.coverImg}
                description={podcast.description}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};
export default Podcasts;
