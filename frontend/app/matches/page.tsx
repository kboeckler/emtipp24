import Link from 'next/link'
import {findAllMatches} from "@/app/repo";
import MatchItem from "@/app/matches/match-item";

export default async function Match() {
    const matches = await findAllMatches()

    return (
        <main>
            <h1>Match List</h1>
            <Link href="/">Home</Link><br/>
            <Link href={"/matches"}>Match List</Link><br/>
            <hr/>
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
