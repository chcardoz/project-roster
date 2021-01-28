import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Coach } from "./Coach";
import { Meeting } from "./Meeting";
import { Outreach } from "./Outreach";
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

  /*
    RELATIONSHIPS
  */

  @Field(() => Int, { nullable: true })
  @Column({ default: null })
  assignedCoachID: number;

  @ManyToOne(() => Coach, (coach) => coach.students)
  assignedCoach: Coach;

  @OneToMany(() => Meeting, (meeting) => meeting.studentID)
  meetings: Meeting[];

  @OneToMany(() => Outreach, (outreach) => outreach.studentID)
  outreach: Outreach[];
}
