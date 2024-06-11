package de.kevinboeckler.emtipp24.team.bet

import org.springframework.data.repository.CrudRepository

interface TeamBetRepository : CrudRepository<TeamBet, String> {

    fun findAllByTeam_Id(teamId: String): Iterable<TeamBet>

}