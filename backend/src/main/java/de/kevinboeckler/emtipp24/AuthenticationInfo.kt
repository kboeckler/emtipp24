package de.kevinboeckler.emtipp24;

import jakarta.annotation.PostConstruct
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.stereotype.Component
import org.springframework.web.context.annotation.RequestScope

@Component
@RequestScope
data class AuthenticationInfo(var email: String = "", var name: String = "", var picture: String = "") {

    @Value("\${spring.security.oauth2.enabled}")
    var oAuth2Enabled: Boolean = true

    @PostConstruct
    fun initAuthentication() {
        if (oAuth2Enabled) {
            val jwt = SecurityContextHolder.getContext().authentication.principal as Jwt
            email = jwt.claims["email"] as String
            name = jwt.claims["name"] as String
            picture = jwt.claims["picture"] as String
        } else {
            email = "guest@user.com"
            name = "Guestuser"
            picture = ""
        }
    }

}

data class Authentication(val email: String) {}
