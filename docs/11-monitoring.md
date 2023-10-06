# Monitoring

Zunächst setze ich nur auf ein eigenes Logging. Dabei wird während der Entwicklungszeit sehr
ausführlich geloggt. Das sollte produktiv stark reduziert werden.

## Prisma

- Entwicklungszeit: Query logging auf die Konsole
- Produktionszeit: Nur Errors oder Warnings oder Event-based logging (mit Treshold?)

Siehe [Prisma Logging](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/logging) und Lösung im [Epic Stack](https://github.com/epicweb-dev/epic-stack/blob/main/app/utils/db.server.ts).
