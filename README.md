# Nabdev

A platform to code, learn, & enhance skills!

Explore coding problems, track your progress, and learn with detailed documentation. Follow the journey — we're building this together.

## Get Started

- **Docs**: Learn key concepts with simple, friendly guides.
- **Features**: Solve a growing set of coding challenges to level up your skills.
- **AI Code Review**: Your code buddy — quick tips, fast feedback, cleaner code!
- **Collaborative Coding**: Pair up to solve challenges, share tips, and learn together.
- **Discussion Forum**: Engage, ask questions, and share solutions with the community.

Nabdev also includes a blog and a full-featured documentation site built using Contentlayer and MDX.

## Features

- **Coding Challenges**: Solve problems and level up your skills.
- **Progress Tracking**: Monitor your learning journey and growth.
- **Leaderboard**: Connect with friends and compete for the top spot.
- **Detailed Documentation**: Learn key concepts with easy-to-understand guides.
- **AI Code Review**: Receive quick tips and feedback on your code.
- **Collaborative Coding**: Pair with others to solve challenges and share knowledge.
- **Discussion Forum**: Share solutions and engage with the community.
- **Open Source**: Nabdev is open source and powered by open source software. The code is available on GitHub.

## About this Project

Nabdev is a platform designed to help you practice coding, track your progress, and learn new concepts. It includes a growing set of coding challenges, detailed documentation for learning, and AI-powered code reviews for instant feedback. Join us on our journey as we continue to build this platform together!

## Roadmap

- [x] Add MDX support for basic pages
- [x] Build marketing pages
- [x] Implement subscriptions using Stripe
- [x] Make the site responsive
- [x] Add OG image for blog using @vercel/og
- [x] Dark mode support

## Known Issues

- GitHub authentication (use email)
- Prisma error: ENOENT: no such file or directory, open '/var/task/.next/server/chunks/schema.prisma'
- Next.js 13 client-side navigation does not update head
- Cannot use opengraph-image.tsx inside catch-all routes

## Running Locally

1. Install dependencies using pnpm:

    ```sh
    pnpm install
    ```

2. Copy `.env.example` to `.env.local` and update the variables:

    ```sh
    cp .env.example .env.local
    ```

3. Start the development server:

    ```sh
    pnpm dev
    ```

## License

Licensed under the [MIT license](https://github.com/msnabiel/Nabdev/blob/main/LICENSE.md).

Proudly built by Nabiel. All rights reserved.
