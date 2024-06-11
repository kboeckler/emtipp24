package de.kevinboeckler.emtipp24.team

import de.kevinboeckler.emtipp24.match.MatchRepository
import de.kevinboeckler.emtipp24.player.PlayerRepository
import de.kevinboeckler.emtipp24.team.bet.TeamBet
import de.kevinboeckler.emtipp24.team.bet.TeamBetModel
import de.kevinboeckler.emtipp24.team.bet.TeamBetRepository
import de.kevinboeckler.emtipp24.team.bet.TeamRole
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
class TeamController(
    val teamRepo: TeamRepository,
    val matchRepo: MatchRepository,
    val betRepo: TeamBetRepository,
    val playerRepo: PlayerRepository
) {

    @GetMapping("/teams")
    fun findTeams(@RequestParam("roundId") roundId: String?): List<TeamModel> {
        val teams = if (roundId != null) {
            matchRepo.findByRound_Id(roundId).flatMap { listOf(it.teamA, it.teamB) }.filterNotNull()
        } else {
            teamRepo.findAll()
        }
        return teams.map(this::map).toList()
    }

    @GetMapping("/teams/{teamId}")
    fun findTeam(@PathVariable("teamId") teamId: String): TeamModel? {
        return teamRepo.findByIdOrNull(teamId)?.let(this::map)
    }

    @GetMapping("/teambets")
    fun allBets(): List<TeamBetModel> {
        return betRepo.findAll().map(this::mapBet).toList()
    }

    @GetMapping("/teams/{teamId}/bets")
    fun betsForTeam(@PathVariable teamId: String): List<TeamBetModel> {
        return betRepo.findAllByTeam_Id(teamId).map(this::mapBet).toList()
    }

    @PostMapping("/teams/{teamId}/bets")
    fun createBetForMatch(
        @PathVariable teamId: String,
        @RequestBody bet: TeamBetModel
    ): ResponseEntity<TeamBetModel> {
        val resultBet = bet.copy(id = UUID.randomUUID().toString())
        betRepo.save(mapBetModel(resultBet))
        return ResponseEntity(resultBet, HttpStatus.CREATED)
    }

    @PutMapping("/teams/{teamId}/bets/{betId}")
    fun updateBetForMatch(
        @PathVariable teamId: String,
        @PathVariable betId: String,
        @RequestBody bet: TeamBetModel
    ): ResponseEntity<TeamBetModel> {
        betRepo.save(mapBetModel(bet))
        return ResponseEntity(bet, HttpStatus.OK)
    }

    private fun map(team: Team) = TeamModel(team.id, team.name)

    private fun mapBet(bet: TeamBet) = TeamBetModel(bet.id, bet.player.id, bet.team.id, bet.reachedRole.name)

    private fun mapBetModel(bet: TeamBetModel): TeamBet {
        val player = playerRepo.findByIdOrNull(bet.playerId)
        val team = teamRepo.findByIdOrNull(bet.teamId)
        return TeamBet(bet.id!!, player!!, team!!, TeamRole.valueOf(bet.reachedRoleId))
    }

}