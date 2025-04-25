import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ToldYouNotToTell",
  description: "Anonymous confessions platform",
};

export default function MainTemplate({ children }: { children: ReactNode }) {
  return <div className="main-template">{children}</div>;
}