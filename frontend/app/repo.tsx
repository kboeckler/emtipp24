import {Match} from "@/app/match";
import {Team} from "@/app/team";
import {Bet} from "@/app/bet";

// GET /matches
export async function findAllMatches(): Promise<Match[]> {
    const matches: Match[] = [new Match("apfel"), new Match("birne")]
    return Promise.resolve(matches)
}

// GET /matches{id}
export async function readMatch(id: string): Promise<Match | undefined> {
    const match: Match = new Match(id, new Date(), new Team("atat", "A-Team"), new Team("b1234-5678", "Blub"))
    return Promise.resolve(match)
}

// GET /matches/{id}/bets
export async function readBetsForMatch(id: string): Promise<Bet[]> {
    const bets = [new Bet("betIdXY", id, "meinsa", 2, 1, 9), new Bet("troetId", id, "erda", 0, 1, 0)]
    return Promise.resolve(bets)
}
