"use client"

import {login} from "@/app/login/helper";
import {useEffect, useState} from "react";
import {isAuthenticated} from "@/app/actions/repo";

export default function LoginForm() {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        isAuthenticated().then(res => {
            setLoggedIn(res)
        })
    }, [])

    const renderFormIfNotLoggedIn = function () {
        if (!isLoggedIn) {
            return (<form
                action={login}
            >
                <button type="submit">Signin with Google</button>
            </form>)
        } else
            return ("")
    }

    return (
        <div>
            {renderFormIfNotLoggedIn()}
        </div>)
}