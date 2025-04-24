import { useEffect } from "react";

export function useMetadata(
  title?: string,
  description?: string,
  keywords?: string[]
) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ToldYouNotToTell`;
      const metaTitle = document.querySelector('meta[property="og:title"]');
      if (metaTitle) metaTitle.setAttribute("content", title);
    }

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (metaDesc) metaDesc.setAttribute("content", description);
      if (ogDesc) ogDesc.setAttribute("content", description);
    }

    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", keywords.join(", "));
      }
    }
  }, [title, description, keywords]);
}
