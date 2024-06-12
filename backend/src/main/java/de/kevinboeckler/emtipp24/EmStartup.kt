package de.kevinboeckler.emtipp24;

import de.kevinboeckler.emtipp24.match.Match
import de.kevinboeckler.emtipp24.match.MatchRepository
import de.kevinboeckler.emtipp24.player.Player
import de.kevinboeckler.emtipp24.player.PlayerRepository
import de.kevinboeckler.emtipp24.round.Round
import de.kevinboeckler.emtipp24.round.RoundRepository
import de.kevinboeckler.emtipp24.team.Team
import de.kevinboeckler.emtipp24.team.TeamRepository
import de.kevinboeckler.emtipp24.team.bet.TeamRole
import de.kevinboeckler.emtipp24.team.role.Role
import de.kevinboeckler.emtipp24.team.role.RoleRepository
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
    val roleRepository: RoleRepository
) :
    ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        playerRepo.save(Player("fp42", "Fake Player", 42, false))

        val reachedRoles = mutableListOf<Role>()
        val team1 = Team("1", "Eins", listOf())
        val team2 = Team("2", "Zwei", listOf())
        val team3 = Team("3", "Drei", listOf())
        val team4 = Team("4", "Vier", listOf())
        teamRepo.saveAll(listOf(team1, team2, team3, team4))

        teamRepo.save(team1)

        val roundA = Round("a", "Gruppe A", null, null)
        val roundB = Round("B", "Gruppe B", team3, team4)
        roundRepo.saveAll(listOf(roundA, roundB))

        val match1 = Match(
            "testId", OffsetDateTime.now(),
            roundA,
            team1,
            team2, null, null, null, null, null, null
        )
        val match2 = Match(
            "anotherMatchId", OffsetDateTime.now(),
            roundB,
            team3,
            team4,
            null, null, null, null, 2, 1
        )

        matchRepo.saveAll(listOf(match1, match2))
    }
}
