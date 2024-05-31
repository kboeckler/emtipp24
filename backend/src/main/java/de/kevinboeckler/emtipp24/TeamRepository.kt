package de.kevinboeckler.emtipp24

import org.springframework.data.repository.CrudRepository

interface TeamRepository : CrudRepository<TeamEntity, String> {
}