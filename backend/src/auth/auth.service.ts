import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { User } from "../models/user.models";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {
    this.createDefaultAdmin();
  }

  private async createDefaultAdmin() {
    const adminExists = await this.usersRepository.findOne({
      where: { username: "admin" },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      const admin = this.usersRepository.create({
        username: "admin",
        password: hashedPassword,
      });
      await this.usersRepository.save(admin);
      console.log("Default admin user created");
    }

    const adminUsers = await this.usersRepository.findOne({
      where: { username: "admin" },
    });
    console.log(adminUsers);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
      user,
    };
  }
}
