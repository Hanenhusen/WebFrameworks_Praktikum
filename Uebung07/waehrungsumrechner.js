class Waehrungsumrechner {
    constructor(htmlKnoten, optionen) {
      this.htmlKnoten = htmlKnoten;
      this.optionen = optionen || {};
      this.wechselkurse = optionen.wechselkurse || {};
      this.erzeugeWidget();
      this.fuegeEreignisListenerHinzu();
    }
  
    // Widget erstellen
    erzeugeWidget() {
      this.htmlKnoten.innerHTML = `
        <h3>${this.optionen.titel || "Währungsumrechner"}</h3>
        <div>
          <label for="betrag">Betrag:</label>
          <input type="number" min="0" id="betrag" placeholder="Betrag eingeben">
        </div>
        <div>
          <label for="vonWaehrung">Von:</label>
          <select id="vonWaehrung">
            ${this.getWaehrungsOptionen()}
          </select>
        </div>
        <div>
          <label for="nachWaehrung">In:</label>
          <select id="nachWaehrung">
            ${this.getWaehrungsOptionen()}
          </select>
        </div>
        <button id="umrechnenButton">Umrechnen</button>
        <div id="ergebnis" class="ergebnis" style="display: none;"></div>
      `;
    }
  
    // Dropdown-Optionen für Währungen erstellen
    getWaehrungsOptionen() {
      return Object.keys(this.wechselkurse) //alle Währungen aus den Wechselkursen abrufen
        .map(waehrung => `<option value="${waehrung}">${waehrung}</option>`) // Dropdown-Option erstellen
        .join('');//alle Optionen zu einem einzigen String.
    }
  
    // Ereignis-Listener hinzufügen, button suchen , click listener regestrieren und callback function aufrufen
    fuegeEreignisListenerHinzu() {
      this.htmlKnoten.querySelector("#umrechnenButton").addEventListener("click", () => this.umrechnen());
    }
  
    // Umrechnungslogik
    umrechnen() {
      const betrag = parseFloat(this.htmlKnoten.querySelector("#betrag").value);
      const vonWaehrung = this.htmlKnoten.querySelector("#vonWaehrung").value;
      const nachWaehrung = this.htmlKnoten.querySelector("#nachWaehrung").value;
  
      if (isNaN(betrag) || betrag <= 0) {
        alert("Bitte geben Sie einen gültigen Betrag ein.");
        return;
      }
  
      const ergebnis = (betrag / this.wechselkurse[vonWaehrung]) * this.wechselkurse[nachWaehrung];
      //console.log("Event wird geworfen:", { betrag, vonWaehrung, ergebnis, nachWaehrung }); // Debugging

      // Ereignis werfen
      this.htmlKnoten.dispatchEvent(new CustomEvent("umrechnungAbgeschlossen", {
        detail: {
          betrag,
          vonWaehrung,
          ergebnis,
          nachWaehrung
        }
      }));
  
      this.zeigeErgebnis(betrag, vonWaehrung, ergebnis, nachWaehrung);
    }
  
    // Ergebnis anzeigen
    zeigeErgebnis(betrag, vonWaehrung, ergebnis, nachWaehrung) {
      const ergebnisDiv = this.htmlKnoten.querySelector("#ergebnis");
      ergebnisDiv.innerHTML = `${betrag} ${vonWaehrung} = ${ergebnis.toFixed(2)} ${nachWaehrung}`;
      ergebnisDiv.style.display = "block"; // Ergebnis einblenden
    }
  
    // Getter für eingegebenen Betrag
    getEingabeBetrag() {
      const betrag = parseFloat(this.htmlKnoten.querySelector("#betrag").value); // Eingegebener Betrag
      const vonWaehrung = this.htmlKnoten.querySelector("#vonWaehrung").value; // Quellwährung
    
      if (isNaN(betrag)) {
        return null; // Falls der Betrag ungültig ist
      }
    
      return `${betrag} ${vonWaehrung}`; // Betrag mit Währung zurückgeben
    }
    
    // Getter für umgerechneten Betrag
    getUmgerechnetenBetrag() {
      const ergebnisDiv = this.htmlKnoten.querySelector("#ergebnis"); // Ergebnisfeld
      const ergebnisText = ergebnisDiv.innerText || "";
    
      const parts = ergebnisText.split("=");
      if (parts.length === 2) {
        const zielTeil = parts[1].trim(); // "135.30 USD"
        return zielTeil; // Nur den umgerechneten Betrag mit Währung zurückgeben
      }
    
      return null; // Wenn das Format nicht passt
    }
    
  }
  
  // Factory-Funktion
  function WaehrungsumrechnerFactory(htmlKnoten, optionen) {
    if (!htmlKnoten) {
      throw new Error("Ein gültiger HTML-Knoten muss übergeben werden.");
    }
    return new Waehrungsumrechner(htmlKnoten, optionen);
  }
  