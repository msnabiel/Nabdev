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
  logger: true,  // Enable logging for debugging
  debug: true,  // Enable debug output
});
// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error('Transporter verification failed:', error);
  } else {
    console.log('Email server is ready');
  }
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
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      from: env.GMAIL_USER,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const message = {
          from: provider.from,
          to: identifier,
          subject: `Sign in to ${siteConfig.name}`,
          text: `Click here to sign in: ${url}`,
          html: `
            <div style="padding: 24px; font-family: system-ui, sans-serif;">
              <h1 style="margin-bottom: 16px;">Sign in to ${siteConfig.name}</h1>
              <a href="${url}" style="display: inline-block; padding: 12px 24px; background: #0284c7; color: white; text-decoration: none; border-radius: 4px; font-weight: 500; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);">
                Sign in
              </a>
              <p style="margin-top: 16px; color: #666;">
                If the button doesn't work, copy and paste this link into your browser:
                ${url}
              </p>
            </div>
          `,
        };

        try {
          console.log('Attempting to send email...', { to: identifier });
          const result = await transporter.sendMail(message);
          console.log('Email sent successfully:', result);
        } catch (error) {
          console.error('Failed to send email:', error);
          throw new Error(`Email sending failed: ${error.message}`);
        }
      },
    }),
  ],
// Enable automatic linking of email accounts across different providers
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
