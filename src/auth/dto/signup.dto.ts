import { IsEmail, IsNotEmpty, IsString, MinLength, IsIn } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['Supervisor', 'Guardia'], { message: 'Role must be either Supervisor or Guardia' })
  readonly role: 'Supervisor' | 'Guardia';
}
