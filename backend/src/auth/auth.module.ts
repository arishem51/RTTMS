import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../models/user.models";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";

const JWT_SECRET = "your-super-secret-key-123"; // Use a consistent secret

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({
      defaultStrategy: "jwt",
      session: false,
    }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: "JWT_STRATEGY",
      useClass: JwtStrategy,
    },
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {
  constructor() {
    console.log("AuthModule initialized");
  }
}
