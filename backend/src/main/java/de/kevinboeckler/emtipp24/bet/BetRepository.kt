package de.kevinboeckler.emtipp24.bet

import org.springframework.data.repository.CrudRepository

interface BetRepository : CrudRepository<Bet, String> {

    fun findAllByMatch_Id(matchId: String): Iterable<Bet>

}