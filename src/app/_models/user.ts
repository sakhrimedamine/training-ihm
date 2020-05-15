import { Role } from "./role";

export class User {
    userId: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
    age : number;
    height : number;
    weight : number;
}
