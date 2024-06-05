package de.kevinboeckler.emtipp24.player

import org.springframework.data.repository.CrudRepository

interface PlayerRepository : CrudRepository<Player, String> {

}