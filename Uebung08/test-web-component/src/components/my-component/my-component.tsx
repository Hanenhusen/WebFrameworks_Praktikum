import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'my-component', // Name des Custom Elements
  shadow: true, // Shadow DOM aktivieren
})
export class Mycomponent {
  // Interner State für den Namen
  @State() name: string = '';

  // Funktion, die den Namen aktualisiert
  handleInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.name = input.value; // Aktualisiert den State
  };

  render() {
    return (
      <div>
        <h1>Willkommen!</h1>
        <p>Gib deinen Namen ein:</p>
        <input
          type="text"
          placeholder="Dein Name"
          onInput={this.handleInputChange}
        />
        <p>
          {this.name
            ? `Hallo, ${this.name}! Schön, dich zu sehen!`
            : 'Bitte gib deinen Namen ein.'}
        </p>
      </div>
    );
  }
}