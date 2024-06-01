package de.kevinboeckler.emtipp24;

import de.kevinboeckler.emtipp24.match.Match
import de.kevinboeckler.emtipp24.match.MatchRepository
import de.kevinboeckler.emtipp24.player.Player
import de.kevinboeckler.emtipp24.player.PlayerRepository
import de.kevinboeckler.emtipp24.round.Round
import de.kevinboeckler.emtipp24.round.RoundRepository
import de.kevinboeckler.emtipp24.team.Team
import de.kevinboeckler.emtipp24.team.TeamRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component
import java.time.OffsetDateTime

@Component
class EmStartup(
    val matchRepo: MatchRepository,
    val teamRepo: TeamRepository,
    val roundRepo: RoundRepository,
    val playerRepo: PlayerRepository
) :
    ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        val playerMeinsa = Player("meinsa", "meinsa@tippspiel.de")
        val playerSeinsa = Player("seinsa", "seinsa@tippspiel.de")
        playerRepo.saveAll(listOf(playerMeinsa, playerSeinsa))

        val roundA = Round("a", "Gruppe A")
        val roundB = Round("B", "Gruppe B")
        roundRepo.saveAll(listOf(roundA, roundB))

        val team1 = Team("1", "Eins")
        val team2 = Team("2", "Zwei")
        val team3 = Team("3", "Drei")
        val team4 = Team("4", "Vier")
        teamRepo.saveAll(listOf(team1, team2, team3, team4))

        val match1 = Match(
            "testId", OffsetDateTime.now(),
            roundA,
            team1,
            team2, null, null, null, null
        )
        val match2 = Match(
            "anotherMatchId", OffsetDateTime.now(),
            roundB,
            team3,
            team4,
            null, null, null, null
        )

        matchRepo.saveAll(listOf(match1, match2))
    }
}
