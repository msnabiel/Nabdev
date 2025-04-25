import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GitHubProvider from "next-auth/providers/github"
import nodemailer from "nodemailer"

import { env } from "@/env.mjs"
import { siteConfig } from "@/config/site"
import { db } from "@/lib/db"

// Create Nodemailer transporter for Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.GMAIL_USER,  // Your Gmail address
    pass: env.GMAIL_PASSWORD,  // Your Gmail App Password (not your regular password)
  },
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login", // Error code passed in query string as ?error=
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      from: "NabDev Auth <no-reply@yourapp.com>",  // The sender's email address
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const message = {
          from: provider.from,
          to: identifier,
          subject: `Sign in to ${siteConfig.name}`,
          text: `Click here to sign in: ${url}`,
          html: `
            <body>
              <h1>Welcome to ${siteConfig.name}</h1>
              <p>Click the button below to sign in to your account.</p>
              <a href="${url}" style="display:inline-block;background:#000;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;">
                Sign in
              </a>
            </body>
          `,
        };

        try {
          // Send email via Gmail SMTP using Nodemailer
          await transporter.sendMail(message);
        } catch (error) {
          throw new Error(error.message || "Failed to send verification email");
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: { email: token.email },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};
