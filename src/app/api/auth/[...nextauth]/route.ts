import { getUser } from "@/services/UserService";
import { validatePassword } from "@/util/passwordUtil";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: "BmrfbNplpy1ErIMLGEbz7Lb14dxYowVWP5q8CXpySFc=",
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      return true;
    },
    async redirect({ url, baseUrl }: any) {
      return baseUrl;
    },
    async session({ session, token, ...data }: any) {
      console.log(session, token, data);
      if (token) {
        if (token.role) session.user.role = token.role;
        if (token.id) session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser, trigger }: any) {
      console.log(token, user, account, profile, isNewUser, trigger);
      if (user && user.role) token.role = user.role;
      if (user && user.id) token.id = user.id;
      if (trigger === "update") {
        console.log("updating session");
        const user = await getUser(token.email);
        if (!user) {
          throw new Error("User not found to update user session.");
        }
        token.role = user.role;
        token.name = user.userName;
        token.email = user.email;
        token.picture = user.profileImgUrl;
        token.id = user.id;
      }

      return token;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/new-account", // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        try {
          const user = await getUser(credentials?.username);
          console.log(credentials);
          if (!user) return null;
          console.log(
            "verifying the password ",
            credentials?.password,
            " ",
            user.password
          );
          if (
            !(await validatePassword(
              credentials?.password ?? "",
              user.password ?? ""
            ))
          )
            throw new Error("Password is not valid");
          console.log("password is valid");
          // Return null if user data could not be retrieved
          return {
            email: user.email,
            name: user.userName,
            image: user.profileImgUrl,
            id: user.id ?? "",
            role: user.role,
          };
        } catch (error) {
          console.error("Login failed: ", error);
          throw error;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export const revalidate = 0;
export { handler as GET, handler as POST };
