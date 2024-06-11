import TeamDetails from "@/app/team/[id]/team-details";

export default async function TeamDetailsPage({params}: { params: { id: string } }) {
    const {id} = params

    return (
        <main>
            <h2>Team Detail</h2>
            <TeamDetails teamId={id}></TeamDetails>
        </main>
    );
}
