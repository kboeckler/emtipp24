package de.kevinboeckler.emtipp24.bet

data class BetModel(
    val id: String?,
    val matchId: String,
    val playerId: String,
    val teamA: Int,
    val teamB: Int,
    val reward: Int?
)
