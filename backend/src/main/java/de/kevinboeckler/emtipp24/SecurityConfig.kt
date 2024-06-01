package de.kevinboeckler.emtipp24;

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@PropertySource("classpath:application.yml")
class SecurityConfig {

    @Value("\${spring.security.oauth2.enabled}")
    var oAuth2Enabled: Boolean = true


    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {
        if (oAuth2Enabled) {
            http.authorizeHttpRequests { it.anyRequest().authenticated() }
                .oauth2ResourceServer { it.jwt(Customizer.withDefaults()) }
        } else {
            http.authorizeHttpRequests { it.anyRequest().permitAll() }
        }
        return http.build();
    }

}
