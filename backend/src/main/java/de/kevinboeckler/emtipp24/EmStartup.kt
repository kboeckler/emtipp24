package de.kevinboeckler.emtipp24;

import de.kevinboeckler.emtipp24.match.Match
import de.kevinboeckler.emtipp24.match.MatchRepository
import de.kevinboeckler.emtipp24.player.Player
import de.kevinboeckler.emtipp24.player.PlayerRepository
import de.kevinboeckler.emtipp24.round.Round
import de.kevinboeckler.emtipp24.round.RoundRepository
import de.kevinboeckler.emtipp24.team.Team
import de.kevinboeckler.emtipp24.team.TeamRepository
import de.kevinboeckler.emtipp24.user.ExternalUser
import de.kevinboeckler.emtipp24.user.ExternalUserRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Component
import java.time.OffsetDateTime

@Component
class EmStartup(
    val matchRepo: MatchRepository,
    val teamRepo: TeamRepository,
    val roundRepo: RoundRepository,
    val playerRepo: PlayerRepository,
    val userRepo: ExternalUserRepository
) :
    ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        val playerMeinsa = Player("meinsa")
        val playerFraxxor = Player("frax", true)
        val playerSeinsa = Player("seinsa")
        playerRepo.saveAll(listOf(playerMeinsa, playerSeinsa, playerFraxxor))

        val userMeinsa = ExternalUser("a1", "meinsa@tippspiel.de", playerMeinsa)
        val userFraxxor = ExternalUser("a2", "fraxxor@gmail.com", playerFraxxor)
        val userSeinsa = ExternalUser("b9", "seinsa@tippspiel.de", playerSeinsa)
        userRepo.saveAll(listOf(userMeinsa, userSeinsa, userFraxxor))

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
