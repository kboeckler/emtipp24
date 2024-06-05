package de.kevinboeckler.emtipp24.player

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
class Player(

    @Id
    val id: String,

    val admin: Boolean = false

)