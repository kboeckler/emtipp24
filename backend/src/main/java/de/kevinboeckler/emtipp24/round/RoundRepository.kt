package de.kevinboeckler.emtipp24.round

import org.springframework.data.repository.CrudRepository

interface RoundRepository : CrudRepository<Round, String> {
}