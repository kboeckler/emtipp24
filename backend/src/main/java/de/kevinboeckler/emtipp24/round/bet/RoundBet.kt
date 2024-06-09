package de.kevinboeckler.emtipp24.round.bet

import de.kevinboeckler.emtipp24.player.Player
import de.kevinboeckler.emtipp24.round.Round
import de.kevinboeckler.emtipp24.team.Team
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne

@Entity
class RoundBet(

    @Id
    val id: String,

    @ManyToOne
    @JoinColumn(name = "round")
    val round: Round,

    @ManyToOne
    @JoinColumn(name = "player")
    val player: Player,

    val placement: Int,

    @ManyToOne
    @JoinColumn(name = "placingTeam")
    val placingTeam: Team

)