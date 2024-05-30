package de.kevinboeckler.emtipp24;

import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component
import java.time.OffsetDateTime

@Component
class EmStartup(val matchRepo: MatchRepository) : ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        matchRepo.save(MatchEntity("testId", OffsetDateTime.now(), 1, 2))
        matchRepo.save(MatchEntity("anotherMatchId", OffsetDateTime.now(), 3, 4))
    }
}
