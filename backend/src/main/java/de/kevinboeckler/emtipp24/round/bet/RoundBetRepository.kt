package de.kevinboeckler.emtipp24.round.bet

import org.springframework.data.repository.CrudRepository

interface RoundBetRepository : CrudRepository<RoundBet, String> {

    fun findAllByRound_Id(roundId: String): Iterable<RoundBet>
}