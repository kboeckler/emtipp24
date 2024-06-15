import type {DefaultSession, NextAuthConfig} from 'next-auth';
import {JWT} from "@auth/core/jwt";

export interface TokenSession extends DefaultSession {
    idToken: string
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: JWT) {
    try {
        const params: any = {
            client_id: process.env.AUTH_GOOGLE_ID,
            client_secret: process.env.AUTH_GOOGLE_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
        }

        const url =
            "https://oauth2.googleapis.com/token?" +
            new URLSearchParams(params)

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "POST",
        })

        const refreshedTokens = await response.json()

        if (!response.ok) {
            throw refreshedTokens
        }

        let newExpiresAt = Date.now() + (refreshedTokens.expires_in * 1000);
        return {
            ...token,
            idToken: refreshedTokens.id_token,
            expires_at: newExpiresAt,
            accessToken: refreshedTokens.access_token,
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken
        }
    } catch (error) {
        console.log("Error refreshing the token")
        console.log(error)

        return {
            ...token,
            error: "RefreshAccessTokenError",
        }
    }
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
                expires: new Date((token.expires_at as number)).toISOString(),
                idToken: token.idToken + "",
            }
        },
        jwt({token, trigger, session, account}) {
            if (account == null) {
                const expired: boolean = new Date().getTime() > new Date((token.expires_at as number)).getTime()
                if (expired) {
                    console.log("Token expired, trying to refresh it")
                    return refreshAccessToken(token)
                }
            } else if (account.provider === "google") {
                console.log('JWT with google provider triggered: ' + trigger)
                return {
                    ...token,
                    idToken: account?.id_token,
                    expires_at: account.expires_at!! * 1000,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token
                }
            }
            return token
        }
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
