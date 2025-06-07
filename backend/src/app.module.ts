import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const username = configService.get("DB_USERNAME");
        const password = configService.get("DB_PASSWORD");

        if (!username || !password) {
          throw new Error(
            "Database configuration is missing. Please check your .env file."
          );
        }

        return {
          type: "postgres",
          host: configService.get("DB_HOST"),
          port: configService.get("DB_PORT"),
          username,
          password,
          database: configService.get("DB_DATABASE"),
          entities: [__dirname + "/**/*.models{.ts,.js}"],
          synchronize: configService.get("NODE_ENV") !== "production",
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
