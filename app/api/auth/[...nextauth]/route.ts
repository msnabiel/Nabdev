import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

// Export both GET and POST handlers explicitly
export const GET = handler
export const POST = handler
