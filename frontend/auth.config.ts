import type {DefaultSession, NextAuthConfig} from 'next-auth';

export interface TokenSession extends DefaultSession {
    idToken: string
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
                idToken: token.idToken + "",
            }
        },
        jwt({token, trigger, session, account}) {
            if (account?.provider === "google") {
                return {...token, idToken: account?.id_token}
            }
            return token
        }
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
