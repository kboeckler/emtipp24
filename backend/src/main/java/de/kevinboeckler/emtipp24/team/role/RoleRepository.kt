package de.kevinboeckler.emtipp24.team.role

import de.kevinboeckler.emtipp24.team.bet.TeamRole
import org.springframework.data.repository.CrudRepository

interface RoleRepository : CrudRepository<Role, String> {

    fun findByReachedRoleId(reachedRoleId: TeamRole): Role?

}