import type {DefaultSession, NextAuthConfig} from 'next-auth';

export interface TokenSession extends DefaultSession {
    idToken: string
}

export const authConfig = {
    pages: {
        signIn: '/'
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            console.log('Authorized triggered, expires at: : ' + auth?.expires)
            const expiresString = auth ? auth.expires : "";
            const expired: boolean = new Date().getTime() > new Date(expiresString).getTime()
            const isAuthorized = !expired && !!auth?.user;
            if (isAuthorized) {
                if (nextUrl.search.startsWith("?callbackUrl=")) {
                    const callbackUrl = decodeURIComponent(nextUrl.search.replace("?callbackUrl=", ""));
                    const relativeCallbackPath = callbackUrl.replace(nextUrl.origin, "")
                    return Response.redirect(new URL(relativeCallbackPath, nextUrl));
                }
            }
            return isAuthorized;
        },
        session({session, user, token}): TokenSession {
            console.log('Session triggered')
            return {
                user: session.user,
                expires: new Date(1000 * (token.expires_at as number)).toISOString(),
                idToken: token.idToken + "",
            }
        },
        jwt({token, trigger, session, account}) {
            if (account?.provider === "google") {
                console.log('JWT triggered: ' + trigger)
                return {...token, idToken: account?.id_token, expires_at: account.expires_at!!}
            }
            return token
        }
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
