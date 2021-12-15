// first experiment for User class as global Object

interface UserProps {
  // userProps interface for User class data constructor
  name?: string;
  id?: number;
}

export class User {
  // initialize the User class
  // constructor takes interface UserProps
  constructor(private data: UserProps) {}

  // retrieve user props
  get(propName: string): number | string {
    return this.data[propName];
  }

  // update user props, assign data to update
  set(update: UserProps): void {
    Object.assign(this.data, update);
  }
}
