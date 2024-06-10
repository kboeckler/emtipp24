package de.kevinboeckler.emtipp24.round

import de.kevinboeckler.emtipp24.EmAuthorityFilter.Companion.ADMIN_ROLE
import de.kevinboeckler.emtipp24.player.PlayerRepository
import de.kevinboeckler.emtipp24.round.bet.RoundBet
import de.kevinboeckler.emtipp24.round.bet.RoundBetModel
import de.kevinboeckler.emtipp24.round.bet.RoundBetRepository
import de.kevinboeckler.emtipp24.team.TeamRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.annotation.Secured
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
class RoundController(
    val roundRepo: RoundRepository,
    val betRepo: RoundBetRepository,
    val playerRepo: PlayerRepository,
    val teamRepo: TeamRepository
) {

    @GetMapping("/rounds")
    fun rounds(): List<RoundModel> {
        return roundRepo.findAll().map(this::map).toList()
    }

    @GetMapping("/rounds/{id}")
    fun round(@PathVariable id: String): RoundModel? {
        return roundRepo.findByIdOrNull(id)?.let(this::map)
    }

    @Secured(ADMIN_ROLE)
    @PutMapping("/rounds/{id}")
    fun updateRound(@PathVariable id: String, @RequestBody round: RoundModel): RoundModel {
        return map(roundRepo.save(mapModel(round)))
    }

    @GetMapping("/rounds/{roundId}/bets")
    fun betsForRound(@PathVariable roundId: String): List<RoundBetModel> {
        return betRepo.findAllByRound_Id(roundId).map(this::mapBet).toList()
    }

    @PostMapping("/rounds/{roundId}/bets")
    fun createBetForMatch(
        @PathVariable roundId: String,
        @RequestBody bet: RoundBetModel
    ): ResponseEntity<RoundBetModel> {
        val resultBet = bet.copy(id = UUID.randomUUID().toString())
        betRepo.save(mapBetModel(resultBet))
        return ResponseEntity(resultBet, HttpStatus.CREATED)
    }

    @PutMapping("/rounds/{roundId}/bets/{betId}")
    fun updateBetForMatch(
        @PathVariable roundId: String,
        @PathVariable betId: String,
        @RequestBody bet: RoundBetModel
    ): ResponseEntity<RoundBetModel> {
        betRepo.save(mapBetModel(bet))
        return ResponseEntity(bet, HttpStatus.OK)
    }

    private fun map(round: Round) =
        RoundModel(round.id, round.name, round.winnerFirst?.id, round.winnerSecond?.id)

    private fun mapBet(bet: RoundBet) =
        RoundBetModel(bet.id, bet.round.id, bet.player.id, bet.placement, bet.placingTeam.id)

    private fun mapModel(round: RoundModel): Round {
        val winnerFirstTeam = round.winnerFirstId?.let { teamRepo.findByIdOrNull(it) }
        val winnerSecondTeam = round.winnerSecondId?.let { teamRepo.findByIdOrNull(it) }
        return Round(round.id, round.name, winnerFirstTeam, winnerSecondTeam)
    }

    private fun mapBetModel(bet: RoundBetModel): RoundBet {
        val round = roundRepo.findByIdOrNull(bet.roundId)
        val player = playerRepo.findByIdOrNull(bet.playerId)
        val team = teamRepo.findByIdOrNull(bet.placingTeamId)
        return RoundBet(bet.id!!, round!!, player!!, bet.placement, team!!)
    }

}