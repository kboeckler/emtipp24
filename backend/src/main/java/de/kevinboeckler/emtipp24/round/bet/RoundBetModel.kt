package de.kevinboeckler.emtipp24.round.bet

data class RoundBetModel(
    val id: String?,
    val roundId: String,
    val playerId: String,
    val placement: Int,
    val placingTeamId: String
)