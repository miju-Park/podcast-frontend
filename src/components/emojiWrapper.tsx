import React from "react";

interface IEmojiProps {
  label: string;
  emoji: string;
  className?: string;
}

export const Emoji: React.FC<IEmojiProps> = (props: IEmojiProps) => (
  <span aria-label={props.label} className={props.className}>
    {props.emoji}
  </span>
);
