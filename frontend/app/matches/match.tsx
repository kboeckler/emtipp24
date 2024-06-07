import {Team} from "@/app/team";
import {Round} from "@/app/round";

export type Match = {
    id: string
    start?: Date
    round: Round
    teamA?: Team
    teamB?: Team
    scoreA?: number,
    scoreB?: number
}
