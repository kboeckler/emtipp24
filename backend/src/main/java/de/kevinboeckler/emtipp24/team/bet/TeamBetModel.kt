package de.kevinboeckler.emtipp24.team.bet

data class TeamBetModel(
    val id: String?,
    val playerId: String,
    val teamId: String,
    val reachedRoleId: String
)
