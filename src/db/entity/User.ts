import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
} from "typeorm";

const addPath = (avatar: string, folder: string) => {
  if (!avatar) {
    return null;
  }

  const link = `http://localhost:3000/${folder}/${avatar}`;
  return link;
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

  @Column({ type: "varchar", nullable: true })
  avatar?: string;

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

  @AfterLoad()
  updateAvatarPath() {
    this.avatar = addPath(this.avatar, "public");
  }
}
