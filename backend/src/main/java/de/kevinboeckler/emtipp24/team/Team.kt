package de.kevinboeckler.emtipp24.team

import de.kevinboeckler.emtipp24.team.role.Role
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.OneToMany

@Entity
class Team(

    @Id
    val id: String,

    val name: String,

    @OneToMany
    val reachedRoles: List<Role>
)
