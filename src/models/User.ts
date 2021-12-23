import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { Attributes } from './Attributes';
export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

// Default development URL
const rootUrl = 'http://localhost:3000/users';
export class User {
  public events: Eventing = new Eventing();
  public sync: ApiSync<UserProps> = new ApiSync<UserProps>(rootUrl);
  public attributes: Attributes<UserProps>;

  constructor(attributes: UserProps) {
    this.attributes = new Attributes<UserProps>(attributes);
  }
}
