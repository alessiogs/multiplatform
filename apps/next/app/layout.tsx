import type { Metadata } from "next";
import "@multiplatform/ui/ui.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multiplatform Design System",
  description: "Shared design tokens across web and mobile apps.",
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
