package de.kevinboeckler.emtipp24.team.bet

import de.kevinboeckler.emtipp24.player.Player
import de.kevinboeckler.emtipp24.team.Team
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne

@Entity
class TeamBet(

    @Id
    val id: String,

    @ManyToOne
    @JoinColumn(name = "player")
    val player: Player,

    @ManyToOne
    @JoinColumn(name = "team")
    val team: Team,

    val reachedRole: TeamRole,

    )