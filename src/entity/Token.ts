import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refreshToken: string;
}
