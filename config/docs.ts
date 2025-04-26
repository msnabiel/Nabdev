import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Data Structures",
      items: [
        {
          title: "Introduction",
          href: "/docs/data-structures",
        },
        {
          title: "Arrays",
          href: "/docs/data-structures/arrays",
        },
        {
          title: "Linked Lists",
          href: "/docs/data-structures/linked-lists",
        },
        {
          title: "Contentlayer",
          href: "/docs/in-progress",
          disabled: true,
        },

        {
          title: "Style Guide",
          href: "/docs/data-structures/style-guide",
        },
        {
          title: "Search",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "Algorithms",
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Build your own",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Writing Posts",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "Patterns & Techniques",
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Layouts",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Server Components",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Authentication",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Database with Prisma",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "API Routes",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
    {
      title: "Graphs & Advanced Concepts",
      items: [
        {
          title: "Introduction",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "File Structure",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Tailwind CSS",
          href: "/docs/in-progress",
          disabled: true,
        },
        {
          title: "Typography",
          href: "/docs/in-progress",
          disabled: true,
        },
      ],
    },
  ],
}
