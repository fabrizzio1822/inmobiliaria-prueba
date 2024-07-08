import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';
import bcrypt from 'bcrypt';
import dbConnect from '@/utils/dbConnect';

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();
        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error('Correo electrónico o contraseña incorrectos');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error('Correo electrónico o contraseña incorrectos');
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { email, name, image } = user;
      await dbConnect();
      let dbUser = await User.findOne({ email });
      if (!dbUser) {
        await User.create({
          email,
          name,
          image,
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const userByEmail = await User.findOne({ email: token.email });
        if (userByEmail) {
          userByEmail.password = undefined;
          userByEmail.resetCode = undefined;
          token.user = userByEmail;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  debug: true, // Habilita el modo de depuración
};
