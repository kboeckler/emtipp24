package de.kevinboeckler.emtipp24.info

import org.springframework.boot.info.BuildProperties
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class InfoController(val buildProperties: BuildProperties) {

    @GetMapping("/version")
    fun getVersion(): InfoVersionModel {
        return InfoVersionModel(buildProperties.version)
    }
}