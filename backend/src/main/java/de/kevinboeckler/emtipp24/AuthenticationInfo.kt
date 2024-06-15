package de.kevinboeckler.emtipp24;

import de.kevinboeckler.emtipp24.player.Player
import de.kevinboeckler.emtipp24.user.ExternalUserRepository
import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.stereotype.Component
import org.springframework.web.context.annotation.RequestScope

@Component
@RequestScope
data class AuthenticationInfo(
    val userRepo: ExternalUserRepository
) {
    var email: String = ""
    var player: Player? = null

    @Value("\${spring.security.oauth2.enabled}")
    var oAuth2Enabled: Boolean = true

    @PostConstruct
    fun initAuthentication() {
        if (oAuth2Enabled) {
            val jwt = SecurityContextHolder.getContext().authentication.principal as Jwt
            email = jwt.claims["email"] as String
            val user = userRepo.findByEmail(email)
            player = user?.player ?: player
        } else {
            email = "guest@user.com"
        }
    }

}
