# Dark Mode

In meinen ersten Implementierungen habe ich immer die Auswahl zwischen System - Dunkel - Hell gehabt.
Aber das will ich wieder vereinfachen: Auswahl gibt es nur zwischen Hell und Dunkel.

Es gibt eine Spezifikation mit der Browser die gewünschten Informationen mit sogenannten Client Hints
übermitteln. Dies wird allerdings noch nicht voll unterstützt. Deshalb setzt der Epic Stack und auch
ich auf ein Cookie.

Implementierung:

- Schritt 1: Script das den aktuell gewünschten Color-Mode des Browsers ausliest und sicherstellt,
  dass ein entsprechendes Cookie gesetzt ist bzw. wird

- Schritt 2: Auslesen des Client-Hint Cookie im Root Loader und setzen des Themes

- Schritt 3: Überwachen des Color-Modes auf Browser-seitige Änderungen
