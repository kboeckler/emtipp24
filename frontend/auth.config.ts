import type {NextAuthConfig} from 'next-auth';
import {redirect} from "next/navigation";
import {next} from "sucrase/dist/types/parser/tokenizer";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({auth, request: {nextUrl}}) {
            //return Response.redirect(new URL('/dashboard', nextUrl));
            console.log(nextUrl)
            return !!auth?.user;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
