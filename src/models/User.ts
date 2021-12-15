// first experiment for User class as global Object

interface UserProps {
  name: string;
  id: number;
}

export class User {
  constructor(private data: UserProps) {}

  get(propName: string): number | string {
    return this.data[propName];
  }
}
