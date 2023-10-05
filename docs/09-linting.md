# Linting

Das Projekt soll definitiv über eine Lint-Konfiguration verfügen - und zwar über aktuell ESLint.

Probleme:

- Die aktuellen Remixx-Configurationen setzten ein veraltetes TypeScript-Plugin ein: Downgrade auf
  TypeScript 5.1 wäre notwendig
- Generell wird im Remix-Projekt diskutiert, die Lint-Konfiguration komplett zu entfernen und diese
  lieber den Stacks zu überlassen
- Das neue (und ab ESLint 9) Standard-Konfigurationsformat ist noch relativ schlecht dokumentiert
  für zum Beispiel das TypeScript-ESLint Projekt bzw. wird dort noch nicht offiziell unterstützt.

Die Linting-Konfiguration wird also erstmal zurückgestellt - aber nicht aufgehoben. Das erste
Showstopper-Issue dieses Projektes geht eben an die jetzt noch fehlende Linting-Lösung.
