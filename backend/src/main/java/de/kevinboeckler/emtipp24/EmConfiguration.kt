package de.kevinboeckler.emtipp24

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class EmConfiguration: WebMvcConfigurer{

    override fun configurePathMatch(configurer: PathMatchConfigurer) {
        configurer.setUseTrailingSlashMatch(true)
    }
}