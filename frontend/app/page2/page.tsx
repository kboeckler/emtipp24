import Link from 'next/link'
import {findAllMatches} from "@/app/repo";
import MatchItem from "@/app/match";

export default async function Home() {
    const matches = await findAllMatches()

    return (
        <main>
            <h1>Hallo 2</h1>
            <Link href="/">Home</Link>
            <ul>
                {matches.map((match, index) => (
                        <li key={match.id}><Link href={`/match/${match.id}`}><MatchItem id={match.id}></MatchItem></Link></li>
                    )
                )}
            </ul>
        </main>
    );
}
