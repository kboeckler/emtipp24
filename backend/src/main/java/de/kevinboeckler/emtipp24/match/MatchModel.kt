package de.kevinboeckler.emtipp24.match

import de.kevinboeckler.emtipp24.team.TeamModel
import java.time.OffsetDateTime

data class MatchModel(val id: String, val start: OffsetDateTime?, val teamA: TeamModel?, val teamB: TeamModel?)
