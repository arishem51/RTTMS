import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

@Entity("users")
export class User {
  @ApiProperty({ description: "Unique identifier of the user" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ description: "Username of the user", example: "john_doe" })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ description: "User password", writeOnly: true })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({ description: "Date when the user was created" })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: "Date when the user was last updated" })
  @UpdateDateColumn()
  updatedAt: Date;
}
