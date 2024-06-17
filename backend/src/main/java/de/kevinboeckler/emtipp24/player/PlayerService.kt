package de.kevinboeckler.emtipp24.player

import de.kevinboeckler.emtipp24.match.bet.MatchBetRepository
import org.springframework.stereotype.Service

@Service
class PlayerService(val playerRepo: PlayerRepository, val matchBetRepo: MatchBetRepository) {

    fun updatePlayerScore() {
        val players = playerRepo.findAll()
        val updatedPlayers =
            players.map { Player(it.id, it.name, calculateScore(it), it.admin) }
        playerRepo.saveAll(updatedPlayers)
    }

    private fun calculateScore(player: Player): Int {
        val matchBets = matchBetRepo.findAllByPlayer_Id(player.id)
        val matchScore = matchBets.sumOf { it.reward ?: 0 }
        return matchScore
    }
}