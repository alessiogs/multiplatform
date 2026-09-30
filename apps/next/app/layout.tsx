import type { Metadata } from "next";
import "@multiplatform/ui/ui.css";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Sign in | Multiplatform',
  description: 'Sign in or create your Multiplatform account.',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
