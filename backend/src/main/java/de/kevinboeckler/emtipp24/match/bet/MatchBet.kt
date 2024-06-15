package de.kevinboeckler.emtipp24.match.bet

import de.kevinboeckler.emtipp24.match.Match
import de.kevinboeckler.emtipp24.player.Player
import jakarta.persistence.*

@Entity
class MatchBet(

    @Id
    val id: String,

    @ManyToOne
    @JoinColumn(name = "game")
    val match: Match,

    @ManyToOne
    @JoinColumn(name = "player")
    val player: Player,

    val teamA: Int,

    val teamB: Int,

    val reward: Int?

)