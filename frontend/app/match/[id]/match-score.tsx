import {MyPlayer, readBetsForMatch} from "@/app/actions/repo";
import {Bet} from "@/app/bet";

export default async function MatchScore({matchId}: { matchId: string }) {
    const myPlayer = await MyPlayer()
    let myBet: Bet | undefined
    if (myPlayer !== undefined) {
        for (const bet of (await readBetsForMatch(matchId))) {
            if (bet.playerId == myPlayer.id) {
                myBet = bet
                break
            }
        }
    }

    const renderScoreIfPossible = function () {
        if (myPlayer?.id != undefined && myBet?.reward) {
            return (
                <span className={"tile-score"}>+{myBet?.reward}</span>
            )
        }
    }

    return renderScoreIfPossible()

}
