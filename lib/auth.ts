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
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      from: "Your App Name <no-reply@yourapp.com>",  // The sender's email address
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const message = {
          from: provider.from as string,  // The 'from' email address set above
          to: identifier,
          subject: "Your sign-in link for our application",
          text: `To complete your login, click the following link: ${url}`,
          html: `<p>To complete your login, click the following link: <a href="${url}">Complete Login</a></p>`,
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
