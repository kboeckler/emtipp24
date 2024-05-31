package de.kevinboeckler.emtipp24;

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import java.time.OffsetDateTime

@Entity
class MatchEntity(

    @Id
    val id: String,

    val start: OffsetDateTime?,

    @ManyToOne
    @JoinColumn(name = "teamA")
    val teamA: TeamEntity?,

    @ManyToOne
    @JoinColumn(name = "teamB")
    val teamB: TeamEntity?,

    )
