package de.kevinboeckler.emtipp24.round

import de.kevinboeckler.emtipp24.team.Team
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne

@Entity
class Round(

    @Id
    val id: String,

    val name: String,

    @ManyToOne
    @JoinColumn(name = "winnerFirst")
    val winnerFirst: Team?,

    @ManyToOne
    @JoinColumn(name = "winnerSecond")
    val winnerSecond: Team?

)
