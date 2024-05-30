package de.kevinboeckler.emtipp24

import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
class EmController(val authenticationInfo: AuthenticationInfo, val matchRepo: MatchRepository) {

    val bets: MutableMap<String, MutableList<Bet>> = mutableMapOf()

    @GetMapping("/matches")
    fun matches(): List<Match> {
        println(authenticationInfo.email)
        println(authenticationInfo.name)
        println(authenticationInfo.picture)
        return matchRepo.findAll()
            .map(this::map)
            .toList()
    }
    @GetMapping("/matches/{id}")
    fun match(@PathVariable id: String): Match? {
        return matchRepo.findByIdOrNull(id)?.let(this::map)
    }

    private fun map(match: MatchEntity) =
        Match(match.id, match.start, Team("${match.teamA}", "${match.teamA}"), Team("${match.teamB}", "${match.teamB}"))

    @GetMapping("/matches/{matchId}/bets")
    fun betsForMatch(@PathVariable matchId: String): List<Bet> {
        return bets[matchId] ?: emptyList()
    }

    @PostMapping("/matches/{matchId}/bets")
    fun createBetForMatch(@PathVariable matchId: String, @RequestBody bet: Bet): ResponseEntity<Bet> {
        println("Created: $bet")
        val resultBet = bet.copy(id = UUID.randomUUID().toString())
        val existingBets = bets[matchId] ?: mutableListOf()
        existingBets.add(resultBet)
        bets[matchId] = existingBets
        return ResponseEntity(resultBet, HttpStatus.CREATED)
    }

    @PutMapping("/matches/{matchId}/bets/{betId}")
    fun updateBetForMatch(
        @PathVariable matchId: String,
        @PathVariable betId: String,
        @RequestBody bet: Bet
    ): ResponseEntity<Bet> {
        println("Updated: $bet")
        val existingBets = bets[matchId] ?: mutableListOf()
        existingBets.removeIf { it.id == betId }
        existingBets.add(bet)
        bets[matchId] = existingBets
        return ResponseEntity(bet, HttpStatus.OK)
    }

}
