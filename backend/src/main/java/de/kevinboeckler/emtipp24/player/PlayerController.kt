package de.kevinboeckler.emtipp24.player

import de.kevinboeckler.emtipp24.AuthenticationInfo
import de.kevinboeckler.emtipp24.user.ExternalUser
import de.kevinboeckler.emtipp24.user.ExternalUserRepository
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class PlayerController(
    val authInfo: AuthenticationInfo,
    val playerRepo: PlayerRepository,
    val userRepo: ExternalUserRepository
) {

    @GetMapping("players")
    fun players(): List<PlayerModel> {
        return playerRepo.findAll().map(this::map).toList()
    }

    @GetMapping("/currentplayer")
    fun getCurrentPlayer(): PlayerModel? {
        return authInfo.player?.let(this::map)
    }

    @PostMapping("/players")
    fun createPlayer(@RequestBody playerCreate: PlayerCreateModel): ResponseEntity<PlayerModel> {
        if (userRepo.existsByEmail(playerCreate.email)) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
        val newPlayer = Player(UUID.randomUUID().toString(), playerCreate.name, 0, true)
        playerRepo.save(newPlayer)
        val newUser = ExternalUser(UUID.randomUUID().toString(), playerCreate.email, newPlayer)
        userRepo.save(newUser)
        return ResponseEntity(map(newPlayer), HttpStatus.CREATED)
    }

    fun map(player: Player): PlayerModel = PlayerModel(player.id, player.name, player.score, player.admin)

}
