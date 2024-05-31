package de.kevinboeckler.emtipp24;

import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component
import java.time.OffsetDateTime

@Component
class EmStartup(val matchRepo: MatchRepository, val teamRepo: TeamRepository) : ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        val team1 = TeamEntity("1", "Eins")
        val team2 = TeamEntity("2", "Zwei")
        val team3 = TeamEntity("3", "Drei")
        val team4 = TeamEntity("4", "Vier")
        teamRepo.saveAll(listOf(team1, team2, team3, team4))

        matchRepo.save(
            MatchEntity(
                "testId", OffsetDateTime.now(),
                team1,
                team2
            )
        )

        matchRepo.save(
            MatchEntity(
                "anotherMatchId", OffsetDateTime.now(),
                team3,
                team4
            )
        )
    }
}
