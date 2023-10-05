# Node Version and Package Manager

- Node Version

Die Node-Version wird auf die aktuelle LTS-Version eingestellt. Siehe `package.json`.
Dies muss auch im Docker-Image berücksichtigt werden.

- Package Manager

Im Gegensatz zum Epic Stack verwendet die App `pnpm`. Auch hier muss im Docker-Image
die Installation gemacht werden.
