  import Link from "next/link"
  import { Trophy, Users, PlayCircle, Target, FileCode, Book, Bot, Code2, Code, Share2, UserPlus, MessageSquare } from "lucide-react"
  import { env } from "@/env.mjs"
  import { siteConfig } from "@/config/site"
  import { cn } from "@/lib/utils"
  import { buttonVariants } from "@/components/ui/button"
import { BookmarkPlus } from "lucide-react"

  async function getGitHubStars(): Promise<string | null> {
    try {
      const response = await fetch(
        "https://api.github.com/repos/shadcn/taxonomy",
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
          },
          next: {
            revalidate: 60,
          },
        }
      )

      if (!response?.ok) {
        return null
      }

      const json = await response.json()

      return parseInt(json["stargazers_count"]).toLocaleString()
    } catch (error) {
      return null
    }
  }

  export default async function IndexPage() {
    const stars = await getGitHubStars()

    return (
      <>
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <Link
              href={siteConfig.links.github}
              className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
              target="_blank"
            >
              Follow along on GitHub
            </Link>
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            A platform to code, learn, & enhance skills!
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Explore coding problems, track your progress, and learn with detailed documentation.
            Follow the journey &mdash; we&apos;re building this together.
            </p>
            <div className="space-x-4">
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
                Get Started
              </Link>
              <Link
                href="/docs"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Docs
              </Link>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Nabdev offers coding challenges, progress tracking, and detailed documentation to boost your skills.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <FileCode className="h-12 w-12 text-current" />
                <div className="space-y-2">
                  <h3 className="font-bold">Ready, Set, Code! 🎯</h3>
                  <p className="text-sm text-muted-foreground">
                  Solve a growing set of coding challenges to level up your skills.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <Trophy className="h-12 w-12 text-current" />
                <div className="space-y-2">
                  <h3 className="font-bold">Connect & Compete 🏆</h3>
                  <p className="text-sm">
                  Follow friends and climb the leaderboard like a boss.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Book className="h-12 w-12 text-current" />
                <div className="space-y-2">
                  <h3 className="font-bold">Docs That Don’t Suck 📚</h3>
                  <p className="text-sm text-muted-foreground">
                  Learn key concepts with simple, friendly guides.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Bot className="h-12 w-12 text-current" />
                <div className="space-y-2">
                  <h3 className="font-bold">AI Code Review 🤖</h3>
                  <p className="text-sm text-muted-foreground">
                  Your code buddy — quick tips, fast feedback, cleaner code!
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <UserPlus className="h-12 w-12 text-current" />
                <div className="space-y-2">
                  <h3 className="font-bold">Collaborative Coding 🔄</h3>
                  <p className="text-sm text-muted-foreground">
                  Pair up to solve challenges, share tips, and learn together.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <MessageSquare className="h-12 w-12 text-current" />
                <div className="space-y-2">
                  <h3 className="font-bold">Discussion Forum 💬</h3>
                  <p className="text-sm text-muted-foreground">
                  Engage, ask questions, and share solutions with the community.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto text-center md:max-w-[58rem]">
            <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Nabdev also includes a blog and a full-featured documentation site
              built using Contentlayer and MDX.
            </p>
          </div>
        </section>
        <section id="open-source" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Proudly Open Source
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Nabdev is open source and powered by open source software. <br />{" "}
              The code is available on{" "}
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
              >
                GitHub
              </Link>
              .{" "}
            </p>
            {stars && (
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex"
              >
                <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-foreground"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent"></div>
                  <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
                    {stars} stars on GitHub
                  </div>
                </div>
              </Link>
            )}
          </div>
        </section>
      </>
    )
  }
