package de.kevinboeckler.emtipp24.player

import de.kevinboeckler.emtipp24.AuthenticationInfo
import de.kevinboeckler.emtipp24.user.ExternalUser
import de.kevinboeckler.emtipp24.user.ExternalUserRepository
import org.springframework.http.HttpStatus
import org.springframework.http.HttpStatusCode
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

    @GetMapping("/currentplayer")
    fun getCurrentPlayer(): PlayerModel? {
        return authInfo.player?.let(this::map)
    }

    @PostMapping("/players")
    fun createPlayer(@RequestBody playerCreate: PlayerCreateModel): ResponseEntity<Player> {
        if (userRepo.existsByEmail(playerCreate.email)) {
            return ResponseEntity(HttpStatus.BAD_REQUEST)
        }
        val newPlayer = Player(UUID.randomUUID().toString(), true)
        playerRepo.save(newPlayer)
        val newUser = ExternalUser(UUID.randomUUID().toString(), playerCreate.email, newPlayer)
        userRepo.save(newUser)
        return ResponseEntity(newPlayer, HttpStatus.CREATED)
    }

    fun map(player: Player): PlayerModel = PlayerModel(player.id, player.admin)

}
