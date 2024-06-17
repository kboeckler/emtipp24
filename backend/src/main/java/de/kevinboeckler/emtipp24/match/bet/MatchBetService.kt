package de.kevinboeckler.emtipp24.match.bet

import de.kevinboeckler.emtipp24.match.Match
import org.springframework.stereotype.Service

@Service
class MatchBetService(val betRepo: MatchBetRepository) {
    fun updateBetsForMatch(match: Match) {
        val bets = betRepo.findAllByMatch_Id(match.id)
        val updatedBets =
            bets.map { MatchBet(it.id, it.match, it.player, it.teamA, it.teamB, calculateReward(it, match)) }
        betRepo.saveAll(updatedBets)
    }

    private fun calculateReward(bet: MatchBet, match: Match): Int {
        val scoreDif = (match.scoreA ?: 0) - (match.scoreB ?: 0)
        val betDif = bet.teamA - bet.teamB
        val bothTie = scoreDif == 0 && betDif == 0
        val bothWin = scoreDif < 0 && betDif < 0
        val bothLoss = scoreDif > 0 && betDif > 0
        if (bothTie || bothWin || bothLoss) {
            var points = 3
            if (betDif == scoreDif) {
                points++
            }
            if (match.scoreA == bet.teamA && match.scoreB == bet.teamB) {
                points++
            }
            return points
        }
        return 0
    }
}