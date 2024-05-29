package de.kevinboeckler.emtipp24;

import jakarta.annotation.PostConstruct
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.stereotype.Component
import org.springframework.web.context.annotation.RequestScope

@Component
@RequestScope
data class AuthenticationInfo(var email: String = "", var name: String = "", var picture: String = "") {

    @PostConstruct
    fun initAuthentication() {
        val jwt = SecurityContextHolder.getContext().authentication.principal as Jwt
        email = jwt.claims["email"] as String
        name = jwt.claims["name"] as String
        picture = jwt.claims["picture"] as String
    }

}

data class Authentication(val email: String) {}
