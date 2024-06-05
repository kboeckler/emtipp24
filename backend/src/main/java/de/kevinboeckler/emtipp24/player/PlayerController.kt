package de.kevinboeckler.emtipp24.player

import de.kevinboeckler.emtipp24.AuthenticationInfo
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class PlayerController(val authInfo: AuthenticationInfo) {

    @GetMapping("/currentplayer")
    fun getCurrentPlayer(): Player? {
        return authInfo.player
    }

}
