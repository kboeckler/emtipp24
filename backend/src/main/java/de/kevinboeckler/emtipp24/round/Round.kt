package de.kevinboeckler.emtipp24.round

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
class Round(

    @Id
    val id: String,

    val name: String

)
