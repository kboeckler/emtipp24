"use client"

import {useEffect, useRef, useState} from "react";
import {findCurrentPlayer, insertCurrentPlayer, isAuthenticated} from "@/app/actions/repo";
import {Player} from "@/app/player";

export default function CurrentPlayer() {
    const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>()

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            isAuthenticated().then(isAuthenticated => {
                if (isAuthenticated) {
                    findCurrentPlayer().then(playerOrUndefined => {
                        if (playerOrUndefined === undefined) {
                            insertCurrentPlayer().then(insertedPlayer => setCurrentPlayer(insertedPlayer))
                        } else {
                            setCurrentPlayer(playerOrUndefined)
                        }
                    })
                }
            })
        }
    }, [])

    function renderAdminIfSo() {
        if (currentPlayer?.admin) {
            return (<span><br/>recognized as Admin</span>)
        }
    }

    function renderCurrentPlayerIfPossible() {
        if (currentPlayer !== undefined) {
            return (
                <div>
                    Hallo Current Player<br/>
                    It is: {currentPlayer?.id}
                    {renderAdminIfSo()}
                    <br/>
                </div>
            )
        } else {
            return (<div>
                no known Player
            </div>)
        }
    }

    return (
        <div>
            {renderCurrentPlayerIfPossible()}
        </div>
    )

}