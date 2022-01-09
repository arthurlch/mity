import { View } from './View';
import { User, UserProps } from '../models/User';
import { UserShow } from './UserShow';
import { UserForm } from './UserForm';

export class UserEdit extends View<User, UserProps> {
  regionsMap(): { [key: string]: string } {
    return {
      UserShow: '.user-show',
      UserForm: '.user-form',
    };
  }

  // HTML Parsing trough template using new DOMParser() would be a better option
  onRender(): void {
    const userShow = new UserShow(this.regions.userShow, this.model);
    const userForm = new UserForm(this.regions.userFhow, this.model);
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
