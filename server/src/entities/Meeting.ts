import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Coach } from "./Coach";
import { Student } from "./Student";

@ObjectType()
@Entity()
export class Meeting {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Int, { nullable: true })
  @Column({ default: null })
  coachID: number;

  @ManyToOne(() => Coach, (coach) => coach.meetings)
  coach: Coach;

  @Field(() => Int, { nullable: true })
  @Column({ default: null })
  studentID: number;

  @ManyToOne(() => Student, (student) => student.meetings)
  student: Student;
}
