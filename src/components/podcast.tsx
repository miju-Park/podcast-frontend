import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

interface IPodcast {
  id: number;
  title: string;
  updatedAt: Date;
  rating: number;
  coverImg: string;
  description: string
}

export const Podcast: React.FC<IPodcast> = ({
  id,
  title,
  updatedAt,
  rating,
  coverImg,
  description
}) => {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="flex items-center justify-center py-4 px-2 hover:border-purple-700 border-transparent border-2">
        <div
          className="w-16 h-16  mr-4 bg-center bg-cover"
          style={{
            backgroundImage: `url(${coverImg || 'https://seeklogo.com/images/A/apple-podcast-logo-0CF661058F-seeklogo.com.png'})`
          }}
        />
        <div className="inline-flex flex-col w-2/3 ">
          <h3 className="text-base font-bold mb-1 text-purple-800">{title}</h3>
          <h5 className="text-sm mb-1 text-gray-500">{moment(updatedAt).format("YYYY. MM. DD")}</h5>
          <span className="text-xs text-gray-500">{rating}/5</span>
        </div>
      </div>
    </Link>
  );
};
