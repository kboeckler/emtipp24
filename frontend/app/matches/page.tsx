import Link from 'next/link'
import {findAllMatches} from "@/app/actions/repo";
import MatchItem from "@/app/matches/match-item";

export default async function Match() {
    const matches = await findAllMatches()

    return (
        <main>
            <h2>Match List</h2>
            <ul>
                {matches.map((match, index) => (
                        <li key={match.id}><Link href={`/match/${match.id}`}><MatchItem id={match.id}></MatchItem></Link>
                        </li>
                    )
                )}
            </ul>
        </main>
    );
}
