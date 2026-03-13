export declare class UserType {
    id: string;
    email: string;
    name: string;
    role: string;
}
export declare class AuthPayload {
    token: string;
    user: UserType;
}
