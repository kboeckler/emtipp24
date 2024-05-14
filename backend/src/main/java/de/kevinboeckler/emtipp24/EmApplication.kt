package de.kevinboeckler.emtipp24

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class EmApplication

fun main(args: Array<String>) {
    runApplication<EmApplication>(*args)
}
