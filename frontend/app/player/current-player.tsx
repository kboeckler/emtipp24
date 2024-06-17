"use client"

import {useEffect, useRef, useState} from "react";
import {insertCurrentPlayer, isAuthenticated, MyPlayer} from "@/app/actions/repo";
import {Player} from "@/app/player/player";

export default function CurrentPlayer() {
    const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>()

    const initialized = useRef(false)
    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            isAuthenticated().then(authenticated => {
                if (authenticated) {
                    MyPlayer().then(playerOrUndefined => {
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
            return (<span>(Admin)</span>)
        }
    }

    function renderCurrentPlayerIfPossible() {
        if (currentPlayer !== undefined) {
            return (
                <div>
                    {currentPlayer.name}
                    {renderAdminIfSo()}
                    <br/>
                </div>
            )
        } else {
            return (<div>
                Nicht angemeldet
            </div>)
        }
    }

    return (
        <div>
            {renderCurrentPlayerIfPossible()}
        </div>
    )

}