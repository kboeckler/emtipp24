"use client"

import {logout} from "@/app/login/helper";
import {useEffect, useState} from "react";
import {isAuthenticated} from "@/app/actions/repo";

export default function LogoutForm() {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        isAuthenticated().then(res => {
            setLoggedIn(res)
        })
    }, [])

    const renderFormIfLoggedIn = function () {
        if (isLoggedIn) {
            return (<form
                action={logout}
            >
                <button type="submit">Logout</button>
            </form>)
        } else
            return ("")
    }

    return (
        <div>
            {renderFormIfLoggedIn()}
        </div>)
}