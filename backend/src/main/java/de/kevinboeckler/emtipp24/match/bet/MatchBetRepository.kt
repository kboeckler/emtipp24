package de.kevinboeckler.emtipp24.match.bet

import org.springframework.data.repository.CrudRepository

interface MatchBetRepository : CrudRepository<MatchBet, String> {

    fun findAllByMatch_Id(matchId: String): Iterable<MatchBet>

}