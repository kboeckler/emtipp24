"use client"

import {useEffect, useState} from "react";
import {findCurrentPlayer} from "@/app/actions/repo";
import {Player} from "@/app/player";

export default function CurrentPlayer() {
    const [currentPlayer, setCurrentPlayer] = useState<Player | undefined>()

    useEffect(() => {
        findCurrentPlayer().then(res => {
            setCurrentPlayer(res)
        })
    }, [])


    function renderCurrentPlayerIfPossible() {
        if (currentPlayer !== undefined) {

            return (
                <div>
                    Hallo Current Player<br/>
                    It is: {currentPlayer?.id}
                </div>
            )
        }
    }

    return (
        <div>
            {renderCurrentPlayerIfPossible()}
        </div>
    )

}