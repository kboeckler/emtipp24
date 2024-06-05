package de.kevinboeckler.emtipp24

import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority

class AuthenticationWrapper(
    private val original: Authentication,
    private val authorities: MutableList<GrantedAuthority>
) :
    Authentication {
    override fun getName(): String {
        return original.name
    }

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return authorities
    }

    override fun getCredentials(): Any {
        return original.credentials
    }

    override fun getDetails(): Any {
        return original.details
    }

    override fun getPrincipal(): Any {
        return original.principal
    }

    override fun isAuthenticated(): Boolean {
        return original.isAuthenticated
    }

    override fun setAuthenticated(isAuthenticated: Boolean) {
        original.isAuthenticated = isAuthenticated
    }
}