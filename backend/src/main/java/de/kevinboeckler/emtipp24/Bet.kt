package de.kevinboeckler.emtipp24

data class Bet(
    val id: String?,
    val matchId: String,
    val playerId: String,
    val teamA: Int,
    val teamB: Int,
    val reward: Int?
)
