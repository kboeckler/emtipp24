import {findAllPlayers} from "@/app/actions/repo";

export default async function Players() {
    const players = await findAllPlayers()

    return (
        <main>
            <h2>Player Overview</h2>
            {players.map((player, index) => (
                    <div key={player.id}>
                        <span>{player.name} | {player.score}</span>
                    </div>
                )
            )}
        </main>
    )
}