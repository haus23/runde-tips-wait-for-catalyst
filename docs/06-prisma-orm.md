# Prisma ORM

Nach einer kurzen Evalution habe ich mich für Prisma als ORM entschieden. Gründe waren definitiv
die besseren und zahlreicheren Features gegenüber Drizzle, das ich auch in Betracht gezogen hatte.

Insbesondere fehlte mir an Drizzle einiges beim Type-Mapping. Generell würde ich den schlankeren
Ansatz eigentlich bevorzugen.

## Dev Workflow

Während der Entwicklung der App verzichte ich komplett auf Migrationen. Die Datenbank wird
lediglich aus dem Schema gepusht. Da ich vermutlich ohne die Prisma-CLI im Produktions-Build
auskomme (im Gegensatz zum Epic Stack), wird diese auch nur als Entwicklungszeitabhängigkeit
installiert.

Sehr hilfreich ist überigens die VS Code Erweiterung: [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)

Workflow-Steps:

1. Änderungen am Prisma Schema
2. `npx prisma db push` (generiert auch den Client, ansonsten: `npx prisma generate`)

## Prod Deployment

Im Docker-Build muss ich also drauf achten, dass die Client-Generierung explizit in der Dev-Phase
ausgeführt wird. Und dann nur die Prod-Module weiter kopiert werden.
