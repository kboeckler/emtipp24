import {Team} from "@/app/team";

export class Match {
    id: string
    start?: Date
    teamA?: Team
    teamB?: Team

    constructor(id: string, start?: Date, teamA?: Team, teamB?: Team) {
        this.id = id;
        this.start = start;
        this.teamA = teamA;
        this.teamB = teamB;
    }
}


