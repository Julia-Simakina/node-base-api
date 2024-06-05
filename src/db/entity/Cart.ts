import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Book from "./Book";
import User from "./User";

@Entity()
export default class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer", nullable: false })
  bookId: number;

  @Column({ type: "integer", nullable: false })
  userId: number;

  @Column({ type: "integer", nullable: false, default: 1 })
  count: number;

  @ManyToOne(() => Book, { nullable: false })
  @JoinColumn({ name: "bookId", referencedColumnName: "id" })
  book: Book;

  @ManyToOne(() => User, (user) => user.cart, { cascade: true })
  @JoinColumn({ name: "userId", referencedColumnName: "id" })
  user: User;
}
