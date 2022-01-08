import { View } from './View';
import { User, UserProps } from '../models/User';

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
    <div>
      <h1>User details</h1>
      <h4>User name: ${this.model.get('name')}</h4>
      <h4>User age: ${this.model.get('age')}</h4>
    </div>
    `;
  }
}
