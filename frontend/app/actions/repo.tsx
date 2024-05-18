'use server'

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

// GET /matches/{id}
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

// GET /matches/{id}/bets
export async function readBetsForMatch(id: string): Promise<Bet[]> {
    return fetch('http://localhost:8080/matches/' + id + '/bets', NO_STORE)
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
            'Content-Type': 'application/json'
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
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bet)
    })
        .then(res => res.json())
        .then(data => {
            const bet: Bet = data
            return bet
        })
}
