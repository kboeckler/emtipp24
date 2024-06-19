import {Bet} from "@/app/bet";
import {Player} from "@/app/player/player";

export default async function MatchReward({player, matchBets}: {
    player: Player,
    matchBets: Bet[]
}) {

    let myBet: Bet | undefined
    for (const bet of matchBets) {
        if (bet.playerId == player.id) {
            myBet = bet
            break
        }
    }

    const renderRewardIfPossible = function () {
        if (myBet?.reward) {
            return (
                <span className={"tile-score"}>+{myBet?.reward}</span>
            )
        }
    }

    return renderRewardIfPossible()

}
