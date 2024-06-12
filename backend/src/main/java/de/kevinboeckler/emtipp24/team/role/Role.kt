package de.kevinboeckler.emtipp24.team.role

import de.kevinboeckler.emtipp24.team.Team
import de.kevinboeckler.emtipp24.team.bet.TeamRole
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne

@Entity
class Role(

    @Id
    val id: String,

    @ManyToOne
    @JoinColumn(name = "team")
    val team: Team,

    val reachedRoleId: TeamRole
)
