export interface RegisterUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: boolean;
}