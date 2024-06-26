import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import Google from 'next-auth/providers/google';

export const {handlers, signIn, signOut, auth} = NextAuth({
    ...authConfig,
    providers: [Google({
        authorization: {
            params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
            },
        },
    })],
});
