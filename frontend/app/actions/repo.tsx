'use server'

import {Match} from "@/app/matches/match";
import {Bet} from "@/app/bet";
import {auth} from "@/auth";
import {TokenSession} from "@/auth.config";
import {Player} from "@/app/player";

async function cfg(cache?: RequestCache): Promise<RequestInit> {
    const token = (await getAuth()).idToken
    return {
        cache: cache ? cache : 'no-cache',
        headers: {
            "Authorization": "Bearer " + token
        }
    }
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
    return fetch('http://localhost:8080/players', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + (await getAuth()).idToken
        },
        body: JSON.stringify({email: (await getAuth())?.user?.email})
    })
        .then(res => res.json())
        .then(data => {
            const player: Player = data
            return player
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
