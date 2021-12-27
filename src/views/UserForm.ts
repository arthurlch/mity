export class UserForm {
  constructor(public parent: Element) {}

  eventsMaps(): { [key: string]: () => void } {
    return {
      'click:button': this.onButtonClick,
    };
  }

  onButtonClick(): void {
    console.log('test');
  }

  template(): string {
    return `
      <div>
        <h1>user form</h1>
      </div>
    `;
  }

  render(): void {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.parent.append(templateElement.content);
  }
}
