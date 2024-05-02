import {Match} from "@/app/match";

export async function findAllMatches(): Promise<Match[]> {
    const matches: Match[] = [new Match("apfel"), new Match("birne")]
    return Promise.resolve(matches)
}

export async function readMatch(id: string): Promise<Match | undefined> {
    const match: Match = new Match("zitrone", new Date())
    return Promise.resolve(match)
}
