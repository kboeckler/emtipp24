"use server"

import {signIn, signOut} from "@/auth";

export const login = async function () {
    await signIn("google")
}

export const logout = async function () {
    await signOut()
}
