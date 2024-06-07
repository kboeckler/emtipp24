import MatchesList from "@/app/matches/matches-list";

export default async function Match() {
    return (
        <main>
            <h2>Match List</h2>
            <h3>Die erste Gruppe</h3>
            <MatchesList roundId={"a"}></MatchesList>
            <h3>Die zweite Gruppe</h3>
            <MatchesList roundId={"B"}></MatchesList>
        </main>
    );
}
