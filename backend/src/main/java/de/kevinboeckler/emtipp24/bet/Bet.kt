package de.kevinboeckler.emtipp24.bet

import de.kevinboeckler.emtipp24.match.Match
import de.kevinboeckler.emtipp24.player.Player
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne

@Entity
class Bet(

    @Id
    val id: String,

    @ManyToOne
    @JoinColumn(name = "match")
    val match: Match,

    @ManyToOne
    @JoinColumn(name = "player")
    val player: Player,

    val teamA: Int,

    val teamB: Int,

    val reward: Int?

)