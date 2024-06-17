import {readMatch} from "@/app/actions/repo";
import Image from 'next/image'

interface MatchItemProps {
    id: string
}

export default async function MatchItem({id}: MatchItemProps) {
    const match = await readMatch(id)

    const renderVersusOrPlaceholder = function() {
        if (match.teamA || match.teamB) {
            return (
                <div className={"versus-container"}>
                    <span>
                        <Image className={"img-flag"}
                               src={"https://img.uefa.com/imgml/flags/50x50/" + match.teamA?.id + ".png"} width={30}
                               height={30}
                               alt={"Flagge " + match.teamA?.name}></Image>
                        {match.teamA?.name}
                    </span>
                        <span>x</span>
                        <span>
                        {match.teamB?.name}
                            <Image className={"img-flag"}
                                   src={"https://img.uefa.com/imgml/flags/50x50/" + match.teamB?.id + ".png"} width={30}
                                   height={30}
                                   alt={"Flagge " + match.teamB?.name}></Image>
                    </span>
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
            <div>{match?.start?.toDateString()} {match?.start?.toLocaleTimeString()}</div>
            {renderVersusOrPlaceholder()}
        </div>
    )
}
