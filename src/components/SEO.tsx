// src/components/SEO.tsx
'use client';

import Head from 'next/head';
import type { ReactNode } from 'react';

type SEOProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  children?: ReactNode;
};

export function SEO({
  title = 'ToldYouNotToTell — Анонимные истории',
  description = 'Платформа для анонимного сторителлинга с конфиденциальностью и наградами.',
  url = 'https://toldyounottotell.com',
  image = 'https://toldyounottotell.com/og-image.png',
  children,
}: SEOProps) {
  return (
    <Head>
      {/* Основные мета-теги */}
      <meta charSet="UTF-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph для соцсетей */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="ToldYouNotToTell" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="ToldYouNotToTell OG Image" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ToldYouNot2Tell" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Фавикон */}
      <link rel="icon" href="/favicon.ico" />

      {/* Дополнительные теги, если нужно */}
      {children}
    </Head>
  );
}