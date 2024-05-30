package de.kevinboeckler.emtipp24

import org.springframework.data.repository.CrudRepository

interface MatchRepository : CrudRepository<MatchEntity, String> {
}