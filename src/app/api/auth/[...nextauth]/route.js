import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        EmailID: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        return { email: credentials.EmailID };
      },
    }),
  ],
  callbacks: {

    async signIn({ user, account }) {

      const provider = account.provider; // Identify the provider (google, facebook, or credentials)

      const { email, name } = user;

      let apiEndpoint = `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/default`;

      // Set API endpoint based on provider
      if (provider === 'google') {
        apiEndpoint = `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/AuthGoogle`;
      } else if (provider === 'facebook') {
        apiEndpoint = `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/AuthFacebook`;
      } else if (provider === 'credentials') {
        apiEndpoint = `${process.env.NEXT_PUBLIC_Backend_API_URL}/api/AuthCredentials`;
      }

      // Send user data to the specific endpoint for registration
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, provider }),
      });

      if (!response.ok) {
        console.error('API error:', response.statusText);
        return false;
      }

      const data = await response.json();

      if (!data.token) {
        console.error('No token received from the backend');
        return false;
      }

      user.token = data.token; // Save token to the user object

      return true; // Allow sign-in

    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token || null;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      console.warn(`External redirects are not allowed: ${url}`);
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login", // Custom sign-in page
    newUser: "/my-account", // Redirect new users to my-account
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
