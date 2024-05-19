import {Team} from "@/app/team";

export type Match = {
    id: string
    start?: Date
    teamA?: Team
    teamB?: Team
}
