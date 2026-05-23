import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
	@IsEmail({}, { message: 'Email must be a valid address.' })
	public email!: string;

	@IsString({ message: 'Password must be at least 8 characters.' })
	@MinLength(8)
	public password!: string;
}
