import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @Column({ type: "character varying" })
  fullName: string;

  // @Column({ type: "character varying" })
  // firstName: string;

  // @Column({ type: "character varying" })
  // lastName: string;

  @Column({ type: "character varying" })
  email: string;

  @Column({ type: "character varying", select: false })
  password: string;

  @Column({ type: "timestamp without time zone" })
  dayOfBirth: Date;

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
