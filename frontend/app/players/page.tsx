import {findAllPlayers} from "@/app/actions/repo";

export default async function Players() {
    const players = await findAllPlayers()

    return (
        <main>
            <h2>Spieler Übersicht</h2>
            <table>
                <thead>
                <tr>
                    <th>Spieler</th>
                    <th>Punkte</th>
                </tr>
                </thead>
                <tbody>
                {players.map((player, index) => (
                        <tr key={player.id}>
                            <td>{player.name}</td>
                            <td>{player.score}</td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </main>
    )
}