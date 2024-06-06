import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterLoad,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Genre from "./Genre";

const { PORT = 3000 } = process.env;

const addPath = (cover: string) => {
  if (!cover) {
    return null;
  }

  return `http://localhost:${PORT}/public/bookCover/${cover}`;
};

@Entity()
export default class Book {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @Column({ nullable: false, type: "varchar" })
  name: string;

  @Column({ nullable: false, type: "varchar" })
  authorName: string;

  @Column({ nullable: false, type: "varchar" })
  cover: string;

  @Column({ nullable: false, type: "float" })
  paperBackPrice: number;

  @Column({ nullable: false, type: "float" })
  hardCoverPrice: number;

  @Column({ nullable: false, type: "timestamp" })
  dateOfIssue: Date;

  @Column({ nullable: true, type: "integer" })
  rating: number;

  @Column({ nullable: false, type: "varchar" })
  status: string;

  @Column({ nullable: false, type: "varchar" })
  description: string;

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

  // @Column({ nullable: false, type: "varchar" })
  // genre: string;

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable()
  genres: Genre[];

  @AfterLoad()
  updateAvatarPath() {
    this.cover = addPath(this.cover);
  }
}
