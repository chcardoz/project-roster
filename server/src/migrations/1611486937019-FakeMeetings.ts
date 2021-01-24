import { MigrationInterface, QueryRunner } from "typeorm";

export class FakeMeetings1611486937019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-07-22T11:04:09Z', 19, 333, '2020-05-23T01:18:33Z', 31);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2021-01-14T14:18:47Z', 19, 333, '2020-04-10T15:45:36Z', 31);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-09-30T11:58:43Z', 19, 381, '2020-05-04T01:41:06Z', 34);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-09-06T12:52:32Z', 19, 381, '2019-12-07T21:40:15Z', 29);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-04-29T13:58:24Z', 19, 333, '2019-12-15T09:49:51Z', 34);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-03-20T03:18:57Z', 20, 391, '2020-04-13T19:35:19Z', 30);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-01-09T11:33:12Z', 20, 356, '2020-10-16T00:29:35Z', 29);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-05-31T17:29:13Z', 20, 391, '2020-03-21T19:46:11Z', 29);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-07-04T09:44:59Z', 20, 391, '2020-01-08T17:26:07Z', 31);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-06-12T21:47:44Z', 20, 344, '2020-08-29T11:38:50Z', 30);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-07-13T16:50:52Z', 21, 310, '2020-08-11T14:54:06Z', 34);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2019-12-23T10:08:27Z', 21, 355, '2020-02-18T04:00:54Z', 29);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-01-08T14:33:27Z', 21, 355, '2020-06-13T05:09:11Z', 29);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-04-19T00:18:29Z', 21, 349, '2020-12-27T18:45:06Z', 29);
insert into meeting ("createdAt", "coachID", "studentID", "meetingDate", duration) values ('2020-03-18T21:38:32Z', 21, 355, '2020-04-09T18:07:56Z', 29);
        `);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
