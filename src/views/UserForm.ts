import { View } from './View';
export class UserForm extends View {
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
    };
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      const name = input.value;
      this.model.set({ name });
    }
  };

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  template(): string {
    return `
      <div>
        <h1>user form</h1>
        <div>user name: ${this.model.get('name')} </div>
        <div>user name: ${this.model.get('age')} </div>
        <input class="" />
        <button class="set-age">Hi there</button>
      </div>
    `;
  }
}
