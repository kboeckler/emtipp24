import MatchesList from "@/app/matches/matches-list";
import {findAllRounds} from "@/app/actions/repo";
import Link from "next/link";

export default async function Matches() {
    const rounds = await findAllRounds()

    return (
        <main>
            <h2>Match List</h2>
            {rounds.map((round, index) => (
                    <div key={round.id}>
                        <Link href={`/round/${round.id}`}><h3>{round.name}</h3></Link>
                        <MatchesList roundId={round.id}></MatchesList>
                    </div>
                )
            )}
        </main>
    )
}
