import { db } from "./db";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const existingUser = await db.users.findUnique({
          where: { username: credentials?.username },
          select: {
            id: true,
            username: true,
            password: true,
            role: true,
            pemagang: {
              select: {
                id: true,
                name: true,
                divisi: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            mentor: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });
        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordMatch) {
          return null;
        }

        if (existingUser.role === "admin") {
          return {
            id: `${existingUser?.mentor?.id}`,
            user_id: `${existingUser.id}`,
            username: existingUser.username,
            name: existingUser?.mentor?.name,
            role: existingUser.role,
          };
        } else {
          return {
            id: `${existingUser?.pemagang?.id}`,
            user_id: `${existingUser.id}`,
            username: existingUser.username,
            name: existingUser?.pemagang?.name,
            role: existingUser.role,
          };
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          user_id: user.user_id,
          name: user.name,
          username: user.username,
          role: user.role,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            user_id: token.user_id,
            name: token.name,
            username: token.username,
            role: token.role,
          },
        };
      }
      return session;
    },
  },
};
