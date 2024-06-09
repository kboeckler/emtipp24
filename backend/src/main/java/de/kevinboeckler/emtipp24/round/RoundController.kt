package de.kevinboeckler.emtipp24.round

import org.springframework.data.repository.findByIdOrNull
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class RoundController(val roundRepo: RoundRepository) {

    @GetMapping("/rounds")
    fun rounds(): List<RoundModel> {
        return roundRepo.findAll().map(this::map).toList()
    }

    @GetMapping("/rounds/{id}")
    fun round(@PathVariable id: String): RoundModel? {
        return roundRepo.findByIdOrNull(id)?.let(this::map)
    }

    private fun map(round: Round) = RoundModel(round.id, round.name)

}