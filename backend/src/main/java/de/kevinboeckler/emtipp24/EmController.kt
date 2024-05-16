package de.kevinboeckler.emtipp24

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.OffsetDateTime

@RestController
class EmController {

    @GetMapping("/matches")
    fun matches(): List<Match> {
        return listOf(
            Match("testId", OffsetDateTime.now(), Team("A", "ein A"), Team("B", "ein B")),
            Match("anotherMatchId", OffsetDateTime.now(), Team("apfel", "Apfel"), Team("birne", "Birne"))
        )
    }

    @GetMapping("/matches/{id}")
    fun match(@PathVariable id: String): Match? {
        return Match(id, OffsetDateTime.now(), Team("a", "konkretes A"), Team("b", "konkretes B"))
    }

    @GetMapping("/matches/{matchId}/bets")
    fun betsForMatch(@PathVariable matchId: String): List<Bet> {
        return listOf(
            Bet("betId", matchId, "seinsa", 7, 9, 1),
            Bet("betId", matchId, "seinsa", 2, 0, null)
        )
    }

    @PostMapping("/matches/{matchId}/bets")
    fun createBetForMatch(@PathVariable matchId: String, @RequestBody bet: Bet): ResponseEntity<Bet> {
        println("Created: $bet")
        val resultBet = bet.copy(id = "postedId")
        return ResponseEntity(resultBet, HttpStatus.CREATED)
    }

    @PutMapping("/matches/{matchId}/bets/{betId}")
    fun updateBetForMatch(
        @PathVariable matchId: String,
        @PathVariable betId: String,
        @RequestBody bet: Bet
    ): ResponseEntity<Bet> {
        println("Updated: $bet")
        return ResponseEntity(bet, HttpStatus.OK)
    }

}
