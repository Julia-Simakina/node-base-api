import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
  AfterUpdate,
} from "typeorm";

const { PORT = 3000 } = process.env;

const addPath = (avatar: string, folder: string) => {
  if (!avatar) {
    return null;
  }

  return `http://localhost:${PORT}/public/${folder}/${avatar}`;
};

@Entity()
export default class User {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @Column({ type: "varchar", nullable: true })
  name?: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar", select: false })
  password: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  avatar: string;

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

  @AfterUpdate()
  @AfterLoad()
  updateAvatarPath() {
    this.avatar = addPath(this.avatar, "user");
  }
}
