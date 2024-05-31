package de.kevinboeckler.emtipp24

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
class TeamEntity(

    @Id
    val id: String,

    val name: String
)
