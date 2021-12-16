// User composition

/* 
private date: UserProps to store data
get(propsname) to get specific piece of data from user
set(update, UserProps) change user data(UserProps) 
on(eventName) event system, handle even for user object to syncronize changes in other files 


*/

interface UserProps {
  name?: string;
  id?: number;
}

// create callback, type function.
type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private data: UserProps) {}

  get(propName: string): number | string {
    return this.data[propName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }
}
