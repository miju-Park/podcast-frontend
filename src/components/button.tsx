import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    role="button"
    className={`bg-gray-900 text-white py-3 w-40 hover:opacity-90 rounded-3xl ${canClick ? "bg-gray-900 hover:opacity-90" : "bg-gray-300 pointer-events-none"}`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);