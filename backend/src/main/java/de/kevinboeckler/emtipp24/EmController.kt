package de.kevinboeckler.emtipp24

import jakarta.annotation.PostConstruct
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.OffsetDateTime
import java.util.*

@RestController
class EmController {

    val matches: MutableMap<String, Match> = mutableMapOf()
    val bets: MutableMap<String, MutableList<Bet>> = mutableMapOf()

    @PostConstruct
    fun init() {
        matches["testId"] = Match("testId", OffsetDateTime.now(), Team("A", "ein A"), Team("B", "ein B"))
        matches["anotherMatchId"] = Match(
            "anotherMatchId",
            OffsetDateTime.now(),
            Team("apfel", "Apfel"),
            Team("birne", "Birne")
        )
    }

    @GetMapping("/matches")
    fun matches(): List<Match> {
        return matches.values.toList()
    }

    @GetMapping("/matches/{id}")
    fun match(@PathVariable id: String): Match? {
        return matches[id]
    }

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
