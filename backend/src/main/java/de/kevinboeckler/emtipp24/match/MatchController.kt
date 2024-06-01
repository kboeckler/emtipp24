package de.kevinboeckler.emtipp24.match

import de.kevinboeckler.emtipp24.AuthenticationInfo
import de.kevinboeckler.emtipp24.bet.Bet
import de.kevinboeckler.emtipp24.bet.BetModel
import de.kevinboeckler.emtipp24.bet.BetRepository
import de.kevinboeckler.emtipp24.player.Player
import de.kevinboeckler.emtipp24.player.PlayerRepository
import de.kevinboeckler.emtipp24.team.Team
import de.kevinboeckler.emtipp24.team.TeamModel
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
class MatchController(
    val authenticationInfo: AuthenticationInfo,
    val matchRepo: MatchRepository,
    val betRepo: BetRepository,
    val playerRepo: PlayerRepository,
) {

    @GetMapping("/matches")
    fun matches(): List<MatchModel> {
        return matchRepo.findAll()
            .map(this::map)
            .toList()
    }

    @GetMapping("/matches/{id}")
    fun match(@PathVariable id: String): MatchModel? {
        return matchRepo.findByIdOrNull(id)?.let(this::map)
    }

    @GetMapping("/matches/{matchId}/bets")
    fun betsForMatch(@PathVariable matchId: String): List<BetModel> {
        return betRepo.findAllByMatch_Id(matchId).map(this::mapBet).toList()
    }

    @PostMapping("/matches/{matchId}/bets")
    fun createBetForMatch(@PathVariable matchId: String, @RequestBody bet: BetModel): ResponseEntity<BetModel> {
        println("Created: $bet")
        val resultBet = bet.copy(id = UUID.randomUUID().toString())
        betRepo.save(mapBetModel(resultBet))
        return ResponseEntity(resultBet, HttpStatus.CREATED)
    }

    @PutMapping("/matches/{matchId}/bets/{betId}")
    fun updateBetForMatch(
        @PathVariable matchId: String,
        @PathVariable betId: String,
        @RequestBody bet: BetModel
    ): ResponseEntity<BetModel> {
        println("Updated: $bet")
        betRepo.save(mapBetModel(bet))
        return ResponseEntity(bet, HttpStatus.OK)
    }

    private fun map(match: Match) =
        MatchModel(match.id, match.start, match.teamA?.let(this::mapTeam), match.teamB?.let(this::mapTeam))

    private fun mapTeam(team: Team) = TeamModel(team.id, team.name)

    private fun mapBet(bet: Bet) = BetModel(bet.id, bet.match.id, bet.player.id, bet.teamA, bet.teamB, bet.reward)

    private fun mapBetModel(bet: BetModel): Bet {
        val match = matchRepo.findByIdOrNull(bet.matchId)
        val player = playerRepo.findByIdOrNull(bet.playerId)
        return Bet(bet.id!!, match!!, player!!, bet.teamA, bet.teamB, bet.reward)
    }

}
