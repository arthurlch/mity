import { View } from './View';
import { User, UserProps } from '../models/User';
import { UserShow } from './UserShow';

export class UserEdit extends View<User, UserProps> {
  regionsMap(): { [key: string]: string } {
    return {
      UserShow: '.user-show',
      UserForm: '.user-form',
    };
  }
  template(): string {
    return `
      <div>
        <div class="user-form"></div>
        <div class="user-show"></div>
      </div>
    `;
  }
}
