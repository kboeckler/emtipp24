'use server'

import {Match} from "@/app/matches/match";
import {Bet} from "@/app/bet";
import {auth} from "@/auth";
import {TokenSession} from "@/auth.config";
import {Player} from "@/app/player";
import {Round} from "@/app/round";
import {RoundBet} from "@/app/round-bet";
import {Team} from "@/app/team";

async function cfg(cache?: RequestCache): Promise<RequestInit> {
    const token = (await getAuth()).idToken
    return {
        cache: cache ? cache : 'no-cache',
        headers: {
            "Authorization": "Bearer " + token
        }
    }
}

export async function MyPlayer(): Promise<Player | undefined> {
    return isAuthenticated().then(async isAuthenticated => {
        if (isAuthenticated) {
            return await findCurrentPlayer();
        } else {
            return undefined
        }
    })
}

export async function isAuthenticated(): Promise<boolean> {
    return getAuth().then(res => {
        const expiresString = res ? res.expires : "";
        const expired: boolean = new Date().getTime() > new Date(expiresString).getTime()
        return !expired && res.idToken != null
    }, _ => {
        return false
    })
}

async function getAuth(): Promise<TokenSession> {
    const tokenSession = await auth() as TokenSession;
    if (tokenSession != null) {
        return tokenSession
    }
    return Promise.reject("Error getting authentication")
}

export async function findCurrentPlayer(): Promise<Player | undefined> {
    return cfg().then(cfg => fetch('http://localhost:8080/currentplayer', cfg))
        .then(res => res.json())
        .catch(_ => undefined)
        .then(data => {
            if (data) {
                return data as Player
            }
            return undefined
        })
}

export async function insertCurrentPlayer(): Promise<Player> {
    const auth = await getAuth()
    return fetch('http://localhost:8080/players', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.idToken
        },
        body: JSON.stringify({name: auth.user?.name, email: auth.user?.email})
    })
        .then(res => res.json())
        .then(data => {
            const player: Player = data
            return player
        })
}

// GET /players
export async function findAllPlayers(): Promise<Player[]> {
    return cfg()
        .then(cfg => fetch('http://localhost:8080/players', cfg))
        .then(res => res.json())
        .then(data => {
            const players: Player[] = []
            for (const item of data) {
                const playeItem: Player = item
                players.push(playeItem)
            }
            return players
        })
}

// GET /matches
export async function findAllMatches(): Promise<Match[]> {
    return cfg()
        .then(cfg => fetch('http://localhost:8080/matches', cfg))
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

// GET /matches/?=roundId=%s
export async function findMatchesForRound(roundId: String): Promise<Match[]> {
    return cfg()
        .then(cfg => fetch('http://localhost:8080/matches?roundId=' + roundId, cfg))
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

// GET /matches/{id}
export async function readMatch(id: string): Promise<Match | undefined> {
    return cfg()
        .then(cfg => fetch('http://localhost:8080/matches/' + id, cfg))
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

// PUT /matches/{id}
export async function updateMatch(match: Match): Promise<Match> {
    return fetch('http://localhost:8080/matches/' + match.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (await getAuth()).idToken
        },
        body: JSON.stringify(match)
    })
        .then(res => res.json())
        .then(data => {
            const bet: Match = data
            return bet
        })
}

// GET /matches/{id}/bets
export async function readBetsForMatch(id: string): Promise<Bet[]> {
    return cfg()
        .then(cfg => fetch('http://localhost:8080/matches/' + id + '/bets', cfg))
        .then(res => res.json())
        .then(data => {
            const bets: Bet[] = []
            for (const item of data) {
                const bet: Bet = item
                bets.push(bet)
            }
            return bets
        })
}

// POST /matches/{id}/bets
export async function insertBet(bet: Bet): Promise<Bet> {
    return fetch('http://localhost:8080/matches/' + bet.matchId + '/bets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (await getAuth()).idToken
        },
        body: JSON.stringify(bet)
    })
        .then(res => res.json())
        .then(data => {
            const bet: Bet = data
            return bet
        })
}

// PUT /matches/{id}/bets/{id}
export async function updateBet(bet: Bet): Promise<Bet> {
    return fetch('http://localhost:8080/matches/' + bet.matchId + '/bets/' + bet.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (await getAuth()).idToken
        },
        body: JSON.stringify(bet)
    })
        .then(res => res.json())
        .then(data => {
            const bet: Bet = data
            return bet
        })
}

// GET /rounds
export async function findAllRounds(): Promise<Round[]> {
    return cfg()
        .then(cfg => fetch('http://localhost:8080/rounds', cfg))
        .then(res => res.json())
        .then(data => {
            const rounds: Round[] = []
            for (const item of data) {
                const roundItem: Round = item
                rounds.push(roundItem)
            }
            return rounds
        })
}

// GET /rounds/{id}
export async function readRound(id: string): Promise<Round | undefined> {
    return cfg()
        .then(cfg => fetch('http://localhost:8080/rounds/' + id, cfg))
        .then(res => res.json())
        .then(data => {
            const round: Round = data
            return round
        })
}

// PUT /rounds/{id}
export async function updateRound(round: Round): Promise<Round> {
    return fetch('http://localhost:8080/rounds/' + round.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (await getAuth()).idToken
        },
        body: JSON.stringify(round)
    })
        .then(res => res.json())
        .then(data => {
            const bet: Round = data
            return bet
        })
}

// GET /rounds/{id}/bets
export async function readBetsForRound(id: string): Promise<RoundBet[]> {
    return cfg()
        .then(cfg => fetch('http://localhost:8080/rounds/' + id + '/bets', cfg))
        .then(res => res.json())
        .then(data => {
            const bets: RoundBet[] = []
            for (const item of data) {
                const bet: RoundBet = item
                bets.push(bet)
            }
            return bets
        })
}

// POST /rounds/{id}/bets
export async function insertRoundBet(bet: RoundBet): Promise<RoundBet> {
    return fetch('http://localhost:8080/rounds/' + bet.roundId + '/bets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (await getAuth()).idToken
        },
        body: JSON.stringify(bet)
    })
        .then(res => res.json())
        .then(data => {
            const bet: RoundBet = data
            return bet
        })
}

// PUT /rounds/{id}/bets/{id}
export async function updateRoundBet(bet: RoundBet): Promise<RoundBet> {
    return fetch('http://localhost:8080/rounds/' + bet.roundId + '/bets/' + bet.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (await getAuth()).idToken
        },
        body: JSON.stringify(bet)
    })
        .then(res => res.json())
        .then(data => {
            const bet: RoundBet = data
            return bet
        })
}


// GET /teams/?roundId=%s
export async function findTeamsForRound(roundId: string): Promise<Team[]> {
    return cfg()
        .then(cfg => fetch('http://localhost:8080/teams?roundId=' + roundId, cfg))
        .then(res => res.json())
        .then(data => {
            const teams: Team[] = []
            for (const item of data) {
                const bet: Team = item
                teams.push(bet)
            }
            console.log("Teams for " + roundId)
            console.log(teams)
            return teams
        })
}
