import type {DefaultSession, NextAuthConfig} from 'next-auth';

export interface TokenSession extends DefaultSession {
    accessToken: string;
}

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            //return Response.redirect(new URL('/dashboard', nextUrl));
            //console.log(nextUrl)
            return !!auth?.user;
        },
        session({session, user, token}): TokenSession {
            return {
                user: session.user,
                expires: session.expires,
                accessToken: token.accessToken + ""
            }
        },
        jwt({token, trigger, session, account}) {
            if (account?.provider === "google") {
                return {...token, accessToken: account?.access_token}
            }
            return token
        }
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
