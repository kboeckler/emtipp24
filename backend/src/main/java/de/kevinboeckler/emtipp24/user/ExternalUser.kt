package de.kevinboeckler.emtipp24.user

import de.kevinboeckler.emtipp24.player.Player
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.OneToOne

@Entity
class ExternalUser(
    @Id
    val id: String,

    val email: String,

    @OneToOne
    @JoinColumn(name = "player")
    val player: Player,
) {}