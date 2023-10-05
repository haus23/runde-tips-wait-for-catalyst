# Styling

Natürlich setzt das Projekt auf Tailwind CSS. Allerdings möchte ich gerne die RadixUI Farb-Palette nutzen.
Deshalb werden keine Tailwind-Farben benutzt (außer Black und White).

Zudem gelten folgende Prinzipien:

- Mobile First
- Dark-Mode Support

Um die Radix-UI Farbpalette optimal zu nutzen, werden in der `tailwind.css` die Farben importiert und
mit Alias-Namen versehen. So reicht ein einfaches Replace-Kommando in einer Datei aus, wenn ich die Palette
wechseln will. Zum zweiten ist im Vergleich zu den bisherigen Lösungen kein Copy/Paste mehr notwendig.
Keine Ahnung ob das schon immer möglich war, die CSS-Variablen von RadixUI direkt zu nutzen, oder ob
ich da ein Tailwind Update verpasst habe.

In der `tailwind.config.ts` werden dann die Alias-Namen auf Tailwind-Farben abgebildet.

Links:

- Aliasing: https://www.radix-ui.com/colors/docs/overview/aliasing
