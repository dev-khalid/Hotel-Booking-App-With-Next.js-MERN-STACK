import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../models/user';
import dbConnect from '../../../config/dbConnect';

export default NextAuth({
  session: {
    strategy: 'jwt',
    jwt: true,
  },
  jwt: {
    secret: 'eita amar secret',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        dbConnect();
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error('Please enter email or password');
        }

        // Find user in the database
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          throw new Error('Invalid Email or Password');
        }

        // Check if password is correct or not
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
          throw new Error('Invalid Email or Password');
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      // console.log('jwt er moddhe ki ki ache', token,account);
      if (account) {
        token.providerAccountId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      //token object
//       {
//   name: 'Khalid Hossain Akash',
//   email: 'khalid@gmail.com',
//   sub: '61f77d04241dc091309f01c6',
//   user: {
//     providerAccountId: '61f77d04241dc091309f01c6',
//     type: 'credentials',
//     provider: 'credentials'
//   },
//   iat: 1643640119,
//   exp: 1646232119,
//   jti: 'da076d7b-e76a-40e8-8e5c-d1008ec3ed25'
// }
      session.user = token;
    
      return session;
    },
  },
});
