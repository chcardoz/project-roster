import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
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
export class Outreach extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  type: string;

  @Field(() => String)
  @Column()
  outreachDate: Date;

  @Field(() => Int)
  @Column()
  week: number;

  /*
    RELATIONSHIPS
  */

  @Field(() => Int)
  @Column()
  coachID: number;

  @ManyToOne(() => Coach, (coach) => coach.outreach)
  coach: Coach;

  @Field(() => Int)
  @Column()
  studentID: number;

  @ManyToOne(() => Student, (student) => student.outreach)
  student: Student;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
