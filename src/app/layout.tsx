import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "StudyCoach Lite",
  description: "AI-native learning UI demo"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">
        <div className="max-w-3xl mx-auto p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold">StudyCoach Lite</h1>
            <p className="text-sm text-neutral-400">
              Tiny demo: Author → Learn → Coach. AI provider is <code>mock</code>.
            </p>
          </header>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}