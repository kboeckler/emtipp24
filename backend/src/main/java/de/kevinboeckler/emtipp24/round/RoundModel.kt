package de.kevinboeckler.emtipp24.round

import java.time.OffsetDateTime

class RoundModel(
    val id: String, val start: OffsetDateTime, val name: String, val winnerFirstId: String?, val winnerSecondId: String?
) {}