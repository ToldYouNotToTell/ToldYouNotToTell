"use client";
import React from "react";

type Props = {
  onClick: () => void;
};

export default function BackToPostsButton({ onClick }: Props) {
  return (
    <button type="button" style={{ marginTop: 20 }} onClick={onClick}>
      Back to Posts
    </button>
  );
}
