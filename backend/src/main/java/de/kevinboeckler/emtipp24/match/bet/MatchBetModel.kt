package de.kevinboeckler.emtipp24.match.bet

data class MatchBetModel(
    val id: String?,
    val matchId: String,
    val playerId: String,
    val teamA: Int,
    val teamB: Int,
    val reward: Int?
)
