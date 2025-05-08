import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ToldYouNotToTell",
  description: "Anonymous confessions platform",
};

export default function MainTemplate({ children }: { children: ReactNode }) {
  return <div className="main-template">{children}</div>;
}
