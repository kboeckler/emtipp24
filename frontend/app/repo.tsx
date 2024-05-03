import {Match} from "@/app/match";
import {Team} from "@/app/team";

export async function findAllMatches(): Promise<Match[]> {
    const matches: Match[] = [new Match("apfel"), new Match("birne")]
    return Promise.resolve(matches)
}

export async function readMatch(id: string): Promise<Match | undefined> {
    const match: Match = new Match(id, new Date(), new Team("atat", "A-Team"), new Team("b1234-5678", "Blub"))
    return Promise.resolve(match)
}
