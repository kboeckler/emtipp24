package de.kevinboeckler.emtipp24.team

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
class Team(

    @Id
    val id: String,

    val name: String
)
