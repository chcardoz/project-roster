import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany } from "typeorm";
import { Meeting } from "./Meeting";
import { Outreach } from "./Outreach";
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

  /*
    RELATIONSHIPS
  */

  @Field(() => [Student], { nullable: true })
  @OneToMany(() => Student, (student) => student.assignedCoach, {
    nullable: true,
  })
  students: Student[];

  @OneToMany(() => Meeting, (meeting) => meeting.coachID)
  meetings: Meeting[];

  @OneToMany(() => Outreach, (outreach) => outreach.coachID)
  outreach: Outreach[];
}
