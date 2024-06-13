package de.kevinboeckler.emtipp24;

import de.kevinboeckler.emtipp24.match.Match
import de.kevinboeckler.emtipp24.match.MatchRepository
import de.kevinboeckler.emtipp24.round.Round
import de.kevinboeckler.emtipp24.round.RoundRepository
import de.kevinboeckler.emtipp24.team.Team
import de.kevinboeckler.emtipp24.team.TeamRepository
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Component
import java.time.OffsetDateTime
import java.time.ZoneOffset

@Component
class EmStartup(
    val matchRepo: MatchRepository,
    val teamRepo: TeamRepository,
    val roundRepo: RoundRepository
) :
    ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        if (teamRepo.count() > 0) {
            return
        }

        teamRepo.saveAll(
            listOf(
                Team("ALB", "Albanien", listOf()),
                Team("BEL", "Belgien", listOf()),
                Team("DEN", "Dänemark", listOf()),
                Team("GER", "Deutschland", listOf()),
                Team("ENG", "England", listOf()),
                Team("FRA", "Frankreich", listOf()),
                Team("GEO", "Georgien", listOf()),
                Team("ITA", "Italien", listOf()),
                Team("CRO", "Kroatien", listOf()),
                Team("NED", "Niederlande", listOf()),
                Team("AUT", "Österreich", listOf()),
                Team("POL", "Polen", listOf()),
                Team("POR", "Portugal", listOf()),
                Team("ROU", "Rumänien", listOf()),
                Team("SCO", "Schottland", listOf()),
                Team("SUI", "Schweiz", listOf()),
                Team("SRB", "Serbien", listOf()),
                Team("SVK", "Slowakei", listOf()),
                Team("SVN", "Slowenien", listOf()),
                Team("ESP", "Spanien", listOf()),
                Team("CZE", "Tschechien", listOf()),
                Team("TUR", "Türkei", listOf()),
                Team("UKR", "Ukraine", listOf()),
                Team("HUN", "Ungarn", listOf())
            )
        )

        roundRepo.saveAll(
            listOf(
                Round("a", "Gruppe A", null, null),
                Round("b", "Gruppe B", null, null),
                Round("c", "Gruppe C", null, null),
                Round("d", "Gruppe D", null, null),
                Round("e", "Gruppe E", null, null),
                Round("f", "Gruppe F", null, null),
                Round("8", "Achtelfinale", null, null),
                Round("4", "Viertelfinale", null, null),
                Round("2", "Halbfinale", null, null),
                Round("1", "Finale", null, null),
            )
        )

        matchRepo.saveAll(
            listOf(
                match("1", dateTime(6, 14, 21), "a", "GER", "SCO"),

                match("2", dateTime(6, 15, 15), "a", "HUN", "SUI"),
                match("3", dateTime(6, 15, 18), "b", "ESP", "CRO"),
                match("4", dateTime(6, 15, 21), "b", "ITA", "ALB"),

                match("5", dateTime(6, 16, 15), "d", "POL", "NED"),
                match("6", dateTime(6, 16, 18), "c", "SVN", "DEN"),
                match("7", dateTime(6, 16, 21), "c", "SRB", "ENG"),

                match("8", dateTime(6, 17, 15), "e", "ROU", "UKR"),
                match("9", dateTime(6, 17, 18), "e", "BEL", "SVK"),
                match("10", dateTime(6, 17, 21), "d", "AUT", "FRA"),

                match("11", dateTime(6, 18, 18), "f", "TUR", "GEO"),
                match("12", dateTime(6, 18, 21), "f", "POR", "CZE"),

                match("13", dateTime(6, 19, 15), "b", "CRO", "ALB"),
                match("14", dateTime(6, 19, 18), "a", "GER", "HUN"),
                match("15", dateTime(6, 19, 21), "a", "SCO", "SUI"),

                match("16", dateTime(6, 20, 15), "c", "SVN", "SRB"),
                match("17", dateTime(6, 20, 18), "c", "DEN", "ENG"),
                match("18", dateTime(6, 20, 21), "b", "ESP", "ITA"),

                match("19", dateTime(6, 21, 15), "e", "SVK", "UKR"),
                match("20", dateTime(6, 21, 18), "d", "POL", "AUT"),
                match("21", dateTime(6, 21, 21), "d", "NED", "FRA"),

                match("22", dateTime(6, 22, 15), "f", "GEO", "CZE"),
                match("23", dateTime(6, 22, 18), "f", "TUR", "POL"),
                match("24", dateTime(6, 22, 21), "e", "BEL", "ROU"),

                match("25", dateTime(6, 23, 21), "a", "SUI", "GER"),
                match("26", dateTime(6, 23, 21), "a", "SCO", "HUN"),

                match("27", dateTime(6, 24, 21), "b", "ALB", "ESP"),
                match("28", dateTime(6, 24, 21), "b", "CRO", "ITA"),

                match("29", dateTime(6, 25, 18), "d", "NED", "AUT"),
                match("30", dateTime(6, 25, 18), "d", "FRA", "POL"),
                match("31", dateTime(6, 25, 21), "c", "ENG", "SVN"),
                match("32", dateTime(6, 25, 21), "c", "DEN", "SRB"),

                match("33", dateTime(6, 26, 18), "e", "SVK", "ROU"),
                match("34", dateTime(6, 26, 18), "e", "UKR", "BEL"),
                match("35", dateTime(6, 26, 21), "f", "GEO", "POR"),
                match("36", dateTime(6, 26, 21), "f", "CZE", "TUR"),

                match("37", dateTime(6, 29, 18), "8"),
                match("38", dateTime(6, 29, 21), "8"),

                match("39", dateTime(6, 30, 18), "8"),
                match("40", dateTime(6, 30, 21), "8"),

                match("41", dateTime(7, 1, 18), "8"),
                match("42", dateTime(7, 1, 21), "8"),

                match("43", dateTime(7, 2, 18), "8"),
                match("44", dateTime(7, 2, 21), "8"),

                match("45", dateTime(7, 5, 18), "4"),
                match("46", dateTime(7, 5, 21), "4"),

                match("47", dateTime(7, 6, 18), "4"),
                match("48", dateTime(7, 6, 21), "4"),

                match("49", dateTime(7, 9, 21), "2"),
                match("50", dateTime(7, 10, 21), "2"),

                match("51", dateTime(7, 14, 21), "1")
            )
        )
    }

    private fun dateTime(month: Int, day: Int, hour: Int): OffsetDateTime =
        OffsetDateTime.of(2024, month, day, hour, 0, 0, 0, ZoneOffset.ofHours(2))

    private fun match(id: String, start: OffsetDateTime, roundId: String, teamAId: String, teamBId: String) = Match(
        id, start,
        roundRepo.findByIdOrNull(roundId)!!,
        teamRepo.findByIdOrNull(teamAId)!!,
        teamRepo.findByIdOrNull(teamBId)!!, null, null, null, null, null, null
    )

    private fun match(
        id: String,
        start: OffsetDateTime,
        roundId: String
    ) = Match(
        id,
        start,
        roundRepo.findByIdOrNull(roundId)!!,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    )
}
