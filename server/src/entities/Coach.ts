import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { Person } from "./Person";
import { Student } from "./Student";

@ObjectType()
@Entity()
export class Coach extends Person {
  @Field(() => String)
  @Column({ type: "text", unique: true })
  username!: string;

  @Column({ type: "text" })
  password!: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isCoordinator!: boolean;

  @OneToMany(() => Student, (student) => student.assignedCoach)
  students: Student[];
}
