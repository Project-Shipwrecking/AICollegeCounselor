import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [CredentialsProvider({
    name: "Credentials",
    credentials: {
      username: {
        label: "username",
        type: "username",
        placeholder: "Jane Doe"
      },
      password: {
        label: "Password",
        type: "password"
      }
    },
    async authorize(credentials, req) {
      const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const user = await res.json()

      // If no error and we have user data, return it
      if (res.ok && user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })],
  callbacks: {
    session({session, user}) {
      // session.user.id = user.id;
      // console.log(session);
      // console.log(user)
      return session
    }
  }
});
