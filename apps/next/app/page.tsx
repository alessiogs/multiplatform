import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background font-sans">
      <main className="flex w-full max-w-[var(--token-layout-max-content-width)] flex-1 flex-col items-center justify-between gap-[var(--token-space-four)] bg-background px-[var(--token-space-four)] py-[var(--token-space-six)] sm:items-start">
        <Image
          className="h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-[var(--token-space-four)] text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-[var(--token-line-height-subtitle)] tracking-tight text-foreground">
            To get started, edit the{" "}
            <code className="rounded-xxs bg-surface px-[var(--token-space-two)] py-[var(--token-space-half)] font-mono text-[0.9em]">
              page.tsx
            </code>{" "}
            file.
          </h1>
          <p className="max-w-md text-base leading-[var(--token-line-height-body)] text-muted">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-primary"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-primary"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-[var(--token-space-two)] text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-[var(--token-space-two)] rounded-[var(--token-radius-pill)] bg-primary px-[var(--token-space-four)] text-background transition-opacity hover:opacity-80 md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-[var(--token-radius-pill)] border border-solid border-border px-[var(--token-space-four)] transition-colors hover:bg-surface md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
