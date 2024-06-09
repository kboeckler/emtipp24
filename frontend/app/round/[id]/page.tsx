import MatchesList from "@/app/matches/matches-list";
import RoundDetails from "@/app/round/[id]/round-details";
import RoundBetForm from "@/app/round/[id]/round-bet-form";

export default async function RoundDetailsPage({params}: { params: { id: string } }) {
    const {id} = params

    return (
        <main>
            <h2>Round Detail</h2>
            <RoundDetails roundId={id}></RoundDetails>
            <MatchesList roundId={id}></MatchesList>
            <RoundBetForm roundId={id}></RoundBetForm>
        </main>
    );
}
