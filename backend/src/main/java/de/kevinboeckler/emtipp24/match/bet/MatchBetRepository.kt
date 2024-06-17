package de.kevinboeckler.emtipp24.match.bet

import org.springframework.data.repository.CrudRepository

interface MatchBetRepository : CrudRepository<MatchBet, String> {

    fun findAllByMatch_Id(matchId: String): Iterable<MatchBet>

    fun findAllByPlayer_Id(playerId: String): Iterable<MatchBet>

}