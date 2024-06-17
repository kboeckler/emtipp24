package de.kevinboeckler.emtipp24

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.context.SecurityContextImpl
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class EmAuthorityFilter(val authInfo: AuthenticationInfo) : OncePerRequestFilter() {

    companion object {
        const val ADMIN_ROLE = "EMTIPP24_ADMIN"
    }

    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val newContext = createContextWithAuthorities(SecurityContextHolder.getContext())
        SecurityContextHolder.setContext(newContext)
        filterChain.doFilter(request, response)
    }

    private fun createContextWithAuthorities(originalContext: SecurityContext): SecurityContext {
        val authentication = originalContext.authentication ?: return originalContext
        val newAuthorities = authentication.authorities.toMutableList()
        if (authInfo.player?.admin == true) {
            newAuthorities.add(SimpleGrantedAuthority(ADMIN_ROLE))
        }
        val newAuthentication = AuthenticationWrapper(authentication, newAuthorities)
        return SecurityContextImpl(newAuthentication)
    }

}
