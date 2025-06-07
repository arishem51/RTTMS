import { IsString, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "Username for login",
    example: "john_doe",
    required: true,
  })
  @IsString()
  @IsNotEmpty({ message: "Username is required" })
  username: string;

  @ApiProperty({
    description: "Password for login",
    example: "password123",
    required: true,
    minLength: 4,
  })
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(4, { message: "Password must be at least 4 characters long" })
  password: string;
}
