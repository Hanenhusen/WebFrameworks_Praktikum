class WaehrungsUmrechner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Shadow DOM HTML und CSS erstellen
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh; /* Vollständige Fensterhöhe */
                background-color: #F5F5F5; /* Hellgrauer Hintergrund */
                margin: 0;
            }
            .umrechner {
                border: 2px solid #B0B0B0; /* Mittelgraue Umrandung */
                border-radius: 15px; /* Abgerundete Ecken */
                padding: 25px;
                max-width: 400px;
                font-family: 'Arial', sans-serif;
                background-color: #FFFFFF; /* Weißer Hintergrund */
                box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1); /* Sanfte Schattierung */
            }
            h3, .titel {
                color: #4A4A4A; /* Dunkelgraue Titel */
                font-size: 1.8em;
                margin-bottom: 25px;
                text-align: center;
            }
            label {
                display: block;
                margin-bottom: 10px;
                font-weight: bold;
                color: #333333; /* Anthrazitfarbener Text */
            }
            input, select, button {
                margin: 8px 0 18px 0;
                padding: 12px;
                width: 100%;
                font-size: 1em;
                border: 1px solid #B0B0B0; /* Mittelgrauer Rand */
                border-radius: 10px;
                box-sizing: border-box;
                background-color: #F5F5F5; /* Hellgrauer Hintergrund */
            }
            input:focus, select:focus, button:focus {
                outline: none;
                border-color: #4A4A4A; /* Dunkelgraue Fokuskante */
                box-shadow: 0 0 8px rgba(74, 74, 74, 0.4); /* Dunkelgrauer Fokus */
            }
            button {
                background-color: #4A4A4A; /* Dunkelgrau */
                color: white;
                border: none;
                cursor: pointer;
                border-radius: 10px;
                padding: 12px;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }
            button:hover {
                background-color: #333333; /* Anthrazit beim Hover */
            }
            .ergebnis {
                margin-top: 15px;
                padding: 10px;
                border: 1px solid #B0B0B0; /* Mittelgrauer Rand */
                background-color: #FFFFFF; /* Weißer Hintergrund */
                border-radius: 10px;
                box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.05); /* Eingedrückte Schattierung */
                display: none; /* Standardmäßig ausgeblendet */
                text-align: center;
                font-weight: bold;
                color: #333333; /* Anthrazit */
            }
            .toggle-button {
                margin-top: 10px;
                background-color: #B0B0B0; /* Mittelgrau */
                color: #333333; /* Anthrazit */
                border: none;
                border-radius: 10px;
                padding: 12px;
                cursor: pointer;
                font-weight: bold;
                transition: background-color 0.3s ease, color 0.3s ease;
            }
            .toggle-button:hover {
                background-color: #4A4A4A; /* Dunkelgrau beim Hover */
                color: white; /* Weißer Text beim Hover */
            }
        </style>
        <div class="umrechner">
            <div class="titel">
                <slot name="titel">Währungsumrechner</slot>
            </div>
            <div>
                <label for="betrag">Betrag:</label>
                <input type="number" id="betrag" placeholder="Betrag eingeben">
            </div>
            <div>
                <label for="vonWaehrung">Von:</label>
                <select id="vonWaehrung"></select>
            </div>
            <div>
                <label for="nachWaehrung">In:</label>
                <select id="nachWaehrung"></select>
            </div>
            <button id="umrechnenButton">Umrechnen</button>
            <div id="ergebnis" class="ergebnis"></div>
        </div>
    `;

        this._wechselkurse = {};
    }

    // Überwachung von Attributen
    static get observedAttributes() {
        return ['wechselkurse'];
    }

    // Wenn Attribute geändert werden
    attributeChangedCallback(name, alterWert, neuerWert) {
        if (name === 'wechselkurse') {
            console.log('Wechselkurse:', neuerWert); // Debugging

            this._wechselkurse = JSON.parse(neuerWert);
            this._aktualisiereWaehrungsOptionen();
        }
    }

    // wird aufgerufen, wenn die Komponente dem DOM hinzugefügt wird.
    connectedCallback() {
        // Event-Listener für den Button
        this.shadowRoot.querySelector("#umrechnenButton").addEventListener("click", () => this._umrechnen());
    }

    // Währungsoptionen in Dropdown-Menüs hinzufügen
    _aktualisiereWaehrungsOptionen() {
        const vonSelect = this.shadowRoot.querySelector('#vonWaehrung');
        const nachSelect = this.shadowRoot.querySelector('#nachWaehrung');

        vonSelect.innerHTML = '';
        nachSelect.innerHTML = '';

        //Jede Währung wird als <option> hinzugefügt.
        Object.keys(this._wechselkurse).forEach(waehrung => {
            const option = document.createElement('option');
            option.value = waehrung;
            option.textContent = waehrung;
            vonSelect.appendChild(option.cloneNode(true));
            nachSelect.appendChild(option);
        });
    }

    // Umrechnungslogik
    _umrechnen() {
        const betrag = parseFloat(this.shadowRoot.querySelector("#betrag").value);
        const vonWaehrung = this.shadowRoot.querySelector("#vonWaehrung").value;
        const nachWaehrung = this.shadowRoot.querySelector("#nachWaehrung").value;

        if (isNaN(betrag) || betrag <= 0) {
            alert("Bitte geben Sie einen gültigen Betrag ein.");
            return;
        }

        const ergebnis = (betrag / this._wechselkurse[vonWaehrung]) * this._wechselkurse[nachWaehrung];
        const ergebnisDiv = this.shadowRoot.querySelector("#ergebnis");
        ergebnisDiv.textContent = `${betrag} ${vonWaehrung} = ${ergebnis.toFixed(2)} ${nachWaehrung}`;
        ergebnisDiv.style.display = "block";
    }
}

//Die Komponente wird als Custom Element mit dem Namen <waehrungs-umrechner> registriert.
customElements.define('waehrungs-umrechner', WaehrungsUmrechner);
