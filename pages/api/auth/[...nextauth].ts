import NextAuth, { CallbacksOptions } from "next-auth";
import Okta from "next-auth/providers/okta";
const parseToken = (token: string) =>
  JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());

export const oktaOptions = {
  // Configure one or more authentication providers
  providers: [
    Okta({
      clientId: "0oa34atmurHrrnsr5697",
      clientSecret: "OrJGXsn9v5Swjm39lrekiSX2fOgxYfezVva1D5Ox",
      issuer: "https://trial-6783794.okta.com/oauth2/default",
      idToken: true,

      authorization: { params: { scope: "openid profile email groups" } },
    }),
  ],
  secret: "123456asdf",
  callbacks: {
    async session({ session, token, user }) {
      const parsedToken = parseToken(token.access_token as string)
      return { ...session, user: token ,...parsedToken};
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }

      return { ...token, ...account, ...profile, ...user };
    },
  } as Partial<CallbacksOptions>,
};

export default NextAuth(oktaOptions);
