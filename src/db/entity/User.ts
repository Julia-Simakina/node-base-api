import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export default class User {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @Column({ type: "varchar", nullable: true })
  fullName?: string;

  @Column({ type: "varchar" })
  email: string;

  @Column({ type: "varchar", select: false })
  password: string;

  @Column({ type: "timestamp without time zone", nullable: true })
  dayOfBirth?: Date;

  @DeleteDateColumn({
    type: "timestamp without time zone",
    nullable: true,
    default: null,
  })
  deletedAt: Date;

  @CreateDateColumn({ type: "timestamp without time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp without time zone" })
  updatedAt: Date;
}
