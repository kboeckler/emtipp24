package de.kevinboeckler.emtipp24.user

import org.springframework.data.repository.CrudRepository

interface ExternalUserRepository : CrudRepository<ExternalUser, String> {

    fun findByEmail(email: String): ExternalUser?
}