import { User } from "./models/User";

const user = new User({ name: "test", id: 1 });

user.set({ name: "newtest", id: 2 });

console.log(user.get("name"));
console.log(user.get("id"));
