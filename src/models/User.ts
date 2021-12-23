import axios, { Axios, AxiosResponse } from 'axios';
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

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');
    if (typeof id !== 'number') {
      throw new Error('cannot fetch without id');
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }

  save(): void {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  }
}
