package de.kevinboeckler.emtipp24

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import java.time.OffsetDateTime

@RestController
class EmController {

    @GetMapping("/matches")
    fun match(): List<Match> {
        return listOf(
            Match("testId", OffsetDateTime.now(), "ein A", "ein B"),
            Match("anotherMatchId", OffsetDateTime.now(), "apfel", "birne")
        )
    }

}
