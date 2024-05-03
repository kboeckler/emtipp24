export class Bet {
    id: string
    matchId: string
    playerId: string
    teamA: number
    teamB: number
    reward?: number

    constructor(id: string, matchId: string, playerId: string, teamA: number, teamB: number, reward?: number) {
        this.id = id
        this.matchId = matchId
        this.playerId = playerId
        this.teamA = teamA
        this.teamB = teamB
        this.reward = reward
    }
}


