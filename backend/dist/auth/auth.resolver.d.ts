import { AuthService } from './auth.service';
import { AuthPayload, UserType } from './auth.types';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(email: string, password: string): Promise<AuthPayload>;
    me(user: UserType): Promise<UserType | null>;
}
