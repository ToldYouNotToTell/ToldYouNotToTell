import "./globals.css";
import { FirebaseProvider } from "@/components/FirebaseProvider";
import { Web3Provider } from "@/contexts/Web3Context";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PostsProvider } from "@/contexts/PostsContext";
import { StakingProvider } from "@/contexts/StakingContext";
import { RewardsProvider } from "@/contexts/RewardsContext";
import { SEO } from "@/components/SEO";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SEO />
      </head>
      <body>
        <FirebaseProvider>
          <Web3Provider>
            <ThemeProvider>
              <StakingProvider>
                <RewardsProvider>
                  <PostsProvider>{children}</PostsProvider>
                </RewardsProvider>
              </StakingProvider>
            </ThemeProvider>
          </Web3Provider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
