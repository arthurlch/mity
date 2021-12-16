import { User } from "./models/User";

const user = new User({ name: "test", id: 1 });

user.set({ name: "newtest", id: 2 });

user.on("change", () => {});

console.log(user);
