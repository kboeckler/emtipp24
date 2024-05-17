import {Match} from "@/app/match";
import {Bet} from "@/app/bet";

const NO_STORE: RequestInit = {cache: 'no-store'};

// GET /matches
export async function findAllMatches(): Promise<Match[]> {
    return fetch('http://localhost:8080/matches', NO_STORE)
        .then(res => res.json())
        .then(data => {
            const matches: Match[] = []
            for (const item of data) {
                const matchItem: Match = item
                matches.push(matchItem)
            }
            return matches
        })
}

export async function readMatch(id: string): Promise<Match | undefined> {
    return fetch('http://localhost:8080/matches/' + id, NO_STORE)
        .then(res => res.json())
        .then(data => {
            const match: Match = data
            if (match.start != undefined) {
                match.start = new Date(match.start)
            } else {
                match.start = undefined
            }
            return match
        })
}

// GET /matches/{id}

// GET /matches/{id}/bets
export async function readBetsForMatch(id: string): Promise<Bet[]> {
    const bets = [new Bet("betIdXY", id, "meinsa", 2, 1, 9), new Bet("troetId", id, "erda", 0, 1, 0)]
    return Promise.resolve(bets)
}

// POST /matches/{id}/bets
export async function insertBet(bet: Bet): Promise<Bet> {
    console.log('Inserting new bet:')
    console.log(bet)
    bet.id = "updatedId"
    await new Promise(resolve => setTimeout(resolve, 1000)); // 3 sec
    console.log('Done Insert')
    return Promise.resolve(bet)
}

// PUT /matches/{id}/bets/{id}
export async function updateBet(bet: Bet): Promise<Bet> {
    console.log('Update existing bet with id ' + bet.id + ':')
    console.log(bet)
    await new Promise(resolve => setTimeout(resolve, 1000)); // 3 sec
    console.log('Done Update')
    return Promise.resolve(bet)
}
