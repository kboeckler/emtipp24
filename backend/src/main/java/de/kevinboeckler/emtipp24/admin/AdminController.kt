package de.kevinboeckler.emtipp24.admin

import de.kevinboeckler.emtipp24.AuthenticationInfo
import de.kevinboeckler.emtipp24.EmAuthorityFilter.Companion.ADMIN_ROLE
import de.kevinboeckler.emtipp24.player.Player
import org.springframework.security.access.annotation.Secured
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class AdminController(val authenticationInfo: AuthenticationInfo) {

    @Secured(ADMIN_ROLE)
    @GetMapping("/admin")
    fun admin(): Player {
        return authenticationInfo.player ?: Player("")
    }

}
