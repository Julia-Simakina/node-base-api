import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import Book from "./Book";

@Entity()
export default class Genre {
  @PrimaryGeneratedColumn({ type: "integer" })
  id: number;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @ManyToMany(() => Book, (book) => book.genres)
  books: Book[];
}
