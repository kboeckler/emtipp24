package de.kevinboeckler.emtipp24.team

import de.kevinboeckler.emtipp24.match.MatchRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class TeamController(val teamRepo: TeamRepository, val matchRepo: MatchRepository) {

    @GetMapping("/teams")
    fun findTeams(@RequestParam("roundId") roundId: String?): List<TeamModel> {
        val teams = if (roundId != null) {
            matchRepo.findByRound_Id(roundId).flatMap { listOf(it.teamA, it.teamB) }.filterNotNull()
        } else {
            teamRepo.findAll()
        }
        return teams.map(this::map).toList()
    }

    @GetMapping("/teams/{teamId}")
    fun findTeam(@PathVariable("teamId") teamId: String): TeamModel? {
        return teamRepo.findByIdOrNull(teamId)?.let(this::map)
    }

    private fun map(team: Team) = TeamModel(team.id, team.name)

}