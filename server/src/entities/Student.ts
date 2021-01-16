import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { Coach } from "./Coach";
import { Person } from "./Person";

@ObjectType()
@Entity()
export class Student extends Person {
  @Field(() => String)
  @Column()
  population!: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isActive: boolean;

  @Field(() => String, { nullable: true })
  @Column({ default: null })
  meetingFrequency: string;

  @Field(() => String, { nullable: true })
  @Column({ default: null })
  modeOfMeeting: string;

  @Field(() => String, { nullable: true })
  @Column({ default: null })
  dateLastMet: Date;

  @Field(() => String, { nullable: true })
  @Column({ default: null })
  dateLastOutreach: Date;

  @Field(() => Int)
  @Column({ default: 0 })
  meetingCount!: number;

  @Field(() => Int, { nullable: true })
  @Column({ default: null })
  assignedCoachID: number;

  @ManyToOne(() => Coach, (coach) => coach.students)
  assignedCoach: Coach;
}
