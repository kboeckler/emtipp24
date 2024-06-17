import MatchesList from "@/app/matches/matches-list";
import {findAllRounds} from "@/app/actions/repo";
import Link from "next/link";
import {Round} from "@/app/round";

export default async function Matches() {
    const rounds = await findAllRounds()
    rounds.sort((a: Round, b: Round) => {
        return a.start.getTime() - b.start.getTime()
    })

    return (
        <main>
            <div>
                <div>
                    Springe zu <br/>
                    <ul>
                        {rounds.map((round, index) => (
                                <li key={round.id}><Link href={"#" + round.id}>{round.name}</Link></li>
                            )
                        )}
                    </ul>
                </div>
                <div className={"list-container"}>
                    {rounds.map((round, index) => (
                            <div key={round.id} id={round.id}>
                                <Link href={`/round/${round.id}`}><h2>{round.name}</h2></Link>
                                <MatchesList roundId={round.id}></MatchesList>
                            </div>
                        )
                    )}
                </div>
            </div>
        </main>
    )
}
