// src/app/layout.tsx
import "@/styles/globals.css";
import "@/styles/theme.css";

import { FirebaseProvider }   from "@/components/FirebaseProvider";
import { Web3Provider }       from "@/contexts/Web3Context";
import { ThemeProvider }      from "@/contexts/ThemeContext";
import { PostsProvider }      from "@/contexts/PostsContext";
import { StakingProvider }    from "@/contexts/StakingContext";
import { RewardsProvider }    from "@/contexts/RewardsContext";

import { SEO }                    from "@/components/SEO";
import Header                 from "@/components/header/Header";      // <<< добавили
import BackToTopButton        from "@/components/ui/buttons/BackToTopButton"; // опционально, если хотите кнопку всегда

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <SEO />
      </head>
      <body>
        <FirebaseProvider>
          <Web3Provider>
            <ThemeProvider>
              <StakingProvider>
                <RewardsProvider>
                  <PostsProvider>
                    {/* Шапка сайта */}
                    <Header />

                    {/* Основной контент */}
                    <main>{children}</main>

                    {/* Кнопка "Наверх", если хотите всегда */}
                    <BackToTopButton />
                  </PostsProvider>
                </RewardsProvider>
              </StakingProvider>
            </ThemeProvider>
          </Web3Provider>
        </FirebaseProvider>
      </body>
    </html>
  );
}