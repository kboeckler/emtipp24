package de.kevinboeckler.emtipp24.match

import de.kevinboeckler.emtipp24.EmAuthorityFilter.Companion.ADMIN_ROLE
import de.kevinboeckler.emtipp24.bet.Bet
import de.kevinboeckler.emtipp24.bet.BetModel
import de.kevinboeckler.emtipp24.bet.BetRepository
import de.kevinboeckler.emtipp24.player.PlayerRepository
import de.kevinboeckler.emtipp24.round.Round
import de.kevinboeckler.emtipp24.round.RoundModel
import de.kevinboeckler.emtipp24.round.RoundRepository
import de.kevinboeckler.emtipp24.team.Team
import de.kevinboeckler.emtipp24.team.TeamModel
import de.kevinboeckler.emtipp24.team.TeamRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.access.annotation.Secured
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
class MatchController(
    val matchRepo: MatchRepository,
    val betRepo: BetRepository,
    val playerRepo: PlayerRepository,
    val roundRepo: RoundRepository,
    val teamRepo: TeamRepository
) {

    @GetMapping("/matches")
    fun matches(@RequestParam("roundId") roundId: String?): List<MatchModel> {
        val matches = if (roundId != null) {
            matchRepo.findByRound_Id(roundId)
        } else {
            matchRepo.findAll()
        }
        return matches
            .map(this::map)
            .toList()
    }

    @GetMapping("/matches/{id}")
    fun match(@PathVariable id: String): MatchModel? {
        return matchRepo.findByIdOrNull(id)?.let(this::map)
    }

    @Secured(ADMIN_ROLE)
    @PutMapping("/matches/{id}")
    fun updateMatch(@PathVariable id: String, @RequestBody match: MatchModel): MatchModel {
        return map(matchRepo.save(map(match)))
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
        MatchModel(
            match.id,
            match.start,
            mapRound(match.round),
            match.teamA?.let(this::mapTeam),
            match.teamB?.let(this::mapTeam),
            match.scoreA,
            match.scoreB
        )

    private fun map(match: MatchModel) = Match(
        match.id,
        match.start,
        mapRoundModel(match.round),
        match.teamA?.let(this::mapTeamModel),
        match.teamB?.let(this::mapTeamModel),
        null,
        null,
        null,
        null,
        match.scoreA,
        match.scoreB
    )

    private fun mapTeam(team: Team) = TeamModel(team.id, team.name)

    private fun mapBet(bet: Bet) = BetModel(bet.id, bet.match.id, bet.player.id, bet.teamA, bet.teamB, bet.reward)

    private fun mapRound(round: Round) = RoundModel(round.id, round.name)

    private fun mapBetModel(bet: BetModel): Bet {
        val match = matchRepo.findByIdOrNull(bet.matchId)
        val player = playerRepo.findByIdOrNull(bet.playerId)
        return Bet(bet.id!!, match!!, player!!, bet.teamA, bet.teamB, bet.reward)
    }

    private fun mapTeamModel(team: TeamModel): Team {
        val teamOrNull = teamRepo.findByIdOrNull(team.id)
        return Team(teamOrNull!!.id, teamOrNull.name)
    }

    private fun mapRoundModel(round: RoundModel): Round {
        val roundOrNull = roundRepo.findByIdOrNull(round.id)
        return Round(roundOrNull!!.id, roundOrNull.name)
    }

}
