package de.kevinboeckler.emtipp24;

import jakarta.persistence.Entity
import jakarta.persistence.Id
import java.time.OffsetDateTime

@Entity
class MatchEntity(

    @Id
    val id: String,

    val start: OffsetDateTime?,

    val teamA: Int?,

    val teamB: Int?
)
