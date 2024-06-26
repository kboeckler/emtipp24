import Image from 'next/image'
import {Match} from "@/app/matches/match";

export default async function MatchItem({match}: { match: Match }) {

    const renderVersusOrPlaceholder = function () {
        if (match.teamA && match.teamB) {
            return (
                <div className={"versus-container"}>
                    <div>
                        <Image className={"img-flag"}
                               src={"https://img.uefa.com/imgml/flags/50x50/" + match.teamA?.id + ".png"} width={30}
                               height={30}
                               alt={"Flagge " + match.teamA?.name}></Image>
                        {match.teamA?.name}
                    </div>
                    <div>x</div>
                    <div>
                        {match.teamB?.name}
                        <Image className={"img-flag"}
                               src={"https://img.uefa.com/imgml/flags/50x50/" + match.teamB?.id + ".png"} width={30}
                               height={30}
                               alt={"Flagge " + match.teamB?.name}></Image>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={"versus-container"}>
                    <span>Teams unbekannt</span>
                </div>
            )
        }
    }

    return (
        <div>
            <div>{match.round.name}</div>
            <div>{match.start.toDateString()} {match.start.toLocaleTimeString()}</div>
            {renderVersusOrPlaceholder()}
        </div>
    )
}
