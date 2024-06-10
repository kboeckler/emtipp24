package de.kevinboeckler.emtipp24.team

import org.springframework.data.repository.CrudRepository

interface TeamRepository : CrudRepository<Team, String> {

}