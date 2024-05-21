"use client"

import {getSession} from "next-auth/react";
import {logout} from "@/app/login/helper";
import {useEffect, useState} from "react";
import {User} from "next-auth";

export default function LogoutForm() {
    const [user, setUser] = useState<User | undefined>()

    useEffect(() => {
        getSession().then(res => {
            const userRes: User | undefined = res?.user
            setUser(userRes)
        })
    }, [])

    const renderFormIfLoggedIn = function () {
        if (user) {
            return (<form
                action={logout}
            >
                <button type="submit">Logout from Google</button>
            </form>)
        } else
            return ("")
    }

    return (
        <div>
            {renderFormIfLoggedIn()}
        </div>)
}