package de.kevinboeckler.emtipp24.match;

import de.kevinboeckler.emtipp24.round.Round
import de.kevinboeckler.emtipp24.team.Team
import jakarta.persistence.*
import java.time.OffsetDateTime

@Entity
class Match(

    @Id
    val id: String,

    val start: OffsetDateTime?,

    @OneToOne
    @JoinColumn(name = "round")
    val round: Round,

    @ManyToOne
    @JoinColumn(name = "teamA")
    val teamA: Team?,

    @ManyToOne
    @JoinColumn(name = "teamB")
    val teamB: Team?,

    @ManyToOne
    @JoinColumn(name = "roundA")
    val roundA: Round?,

    val placementA: Int?,

    @ManyToOne
    @JoinColumn(name = "roundB")
    val roundB: Round?,

    val placementB: Int?

)
