import {Team} from "@/app/team";

export type Round = {
    id: string
    name: string
    winnerFirst?: Team
    winnerSecond?: Team
}