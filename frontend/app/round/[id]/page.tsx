import MatchesList from "@/app/matches/matches-list";
import {readRound} from "@/app/actions/repo";

export default async function RoundDetailsPage({params}: { params: { id: string } }) {
    const {id} = params

    const round = await readRound(id)

    return (
        <main>
            <h2>Round Detail</h2>
            <span>{round?.name}</span>
            <MatchesList roundId={id}></MatchesList>
        </main>
    );
}
