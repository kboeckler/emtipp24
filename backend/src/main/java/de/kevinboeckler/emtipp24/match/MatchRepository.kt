package de.kevinboeckler.emtipp24.match

import org.springframework.data.repository.CrudRepository

interface MatchRepository : CrudRepository<Match, String> {

    fun findByRound_Id(roundId: String): Iterable<Match>

}