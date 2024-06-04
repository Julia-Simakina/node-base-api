import { Entity, Column, PrimaryGeneratedColumn, AfterLoad } from "typeorm";

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

  @Column({ nullable: false, type: "varchar" })
  dateOfIssue: string;

  @Column({ nullable: true, type: "integer" })
  rating: number;

  @Column({ nullable: false, type: "varchar" })
  status: string;

  @Column({ nullable: false, type: "varchar" })
  description: string;

  @Column({ nullable: false, type: "varchar" })
  genre: string;

  @AfterLoad()
  updateAvatarPath() {
    this.cover = addPath(this.cover);
  }
}
