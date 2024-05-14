package de.kevinboeckler.emtipp24

import java.time.OffsetDateTime

data class Match(val id: String, val start: OffsetDateTime?, val teamA: String?, val teamB: String?)
