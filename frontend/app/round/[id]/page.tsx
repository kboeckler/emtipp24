import RoundDetails from "@/app/round/[id]/round-details";

export default async function RoundDetailsPage({params}: { params: { id: string } }) {
    const {id} = params

    return (
        <main>
            <h2>Gruppe Detail</h2>
            <RoundDetails roundId={id}></RoundDetails>
        </main>
    );
}
