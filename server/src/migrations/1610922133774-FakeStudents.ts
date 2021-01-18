import { MigrationInterface, QueryRunner } from "typeorm";

export class FakeStudents1610922133775 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('bprinett0@meetup.com', 'Bernardo', 'Prinett', 'star', '2020-10-16T23:51:23Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('dbithany1@toplist.cz', 'Denys', 'Bithany', 'star', '2020-11-09T05:52:54Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('jwinks2@aboutads.info', 'Justen', 'Winks', 'veteran', '2020-07-26T04:21:21Z', 22);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('fsavege3@bluehost.com', 'Ferne', 'Savege', 'voluntary', '2021-01-10T09:46:14Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('pjeays4@about.me', 'Perry', 'Jeays', 'veteran', '2020-12-03T12:18:07Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('lrois5@omniture.com', 'Louisa', 'Rois', 'voluntary', '2020-07-09T17:57:37Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('dhawney6@about.me', 'Darsie', 'Hawney', 'veteran', '2020-06-18T00:58:39Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('gpharo7@usda.gov', 'Giraud', 'Pharo', 'veteran', '2020-07-26T15:58:08Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('ttouson8@qq.com', 'Tana', 'Touson', 'span', '2020-04-01T22:57:40Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('gsilverson9@t.co', 'Gaston', 'Silverson', 'star', '2020-12-04T16:23:08Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('mpossela@hostgator.com', 'Moss', 'Possel', 'veteran', '2020-07-14T13:13:20Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('tfihellyb@mapquest.com', 'Tresa', 'Fihelly', 'veteran', '2020-10-15T04:23:45Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('wcoughtreyc@pagesperso-orange.fr', 'Wilona', 'Coughtrey', 'span', '2021-01-06T03:11:20Z', 22);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('mbussond@geocities.com', 'Mirilla', 'Busson', 'voluntary', '2020-07-22T12:59:15Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('dteecee@home.pl', 'Drusy', 'Teece', 'voluntary', '2020-02-04T23:16:51Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('afludef@oaic.gov.au', 'Anthea', 'Flude', 'veteran', '2020-08-27T21:46:39Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('cclaraeg@w3.org', 'Catlee', 'Clarae', 'span', '2020-10-19T09:29:33Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('mimisonh@blogger.com', 'Micheil', 'Imison', 'span', '2020-10-10T19:54:33Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('mthurlingi@marriott.com', 'Maura', 'Thurling', 'voluntary', '2021-01-05T10:56:17Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('acoltartj@mac.com', 'Andrej', 'Coltart', 'star', '2020-01-30T19:24:15Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('phanshawk@youtube.com', 'Phillis', 'Hanshaw', 'veteran', '2020-05-18T19:03:54Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('fpinxtonl@alibaba.com', 'Fayth', 'Pinxton', 'voluntary', '2020-07-26T06:35:06Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('elytlem@tinyurl.com', 'Ethelbert', 'Lytle', 'span', '2021-01-11T19:50:49Z', 22);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('tcantin@about.com', 'Thomasine', 'Canti', 'voluntary', '2020-06-22T08:06:09Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('cclymero@craigslist.org', 'Christiano', 'Clymer', 'star', '2020-05-24T04:31:14Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('bdeavep@washingtonpost.com', 'Broddie', 'Deave', 'veteran', '2020-08-03T11:42:18Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('ecatterillq@fc2.com', 'Estelle', 'Catterill', 'span', '2020-09-11T21:23:44Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('rgrigolonr@xrea.com', 'Rinaldo', 'Grigolon', 'veteran', '2020-06-22T09:02:25Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('agaws@imgur.com', 'Alford', 'Gaw', 'star', '2020-11-04T15:37:31Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('bmasont@ox.ac.uk', 'Baron', 'Mason', 'voluntary', '2020-01-23T09:05:03Z', 22);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('nrouzetu@naver.com', 'Natala', 'Rouzet', 'span', '2020-05-19T20:44:07Z', 22);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('mhannav@census.gov', 'Moll', 'Hanna', 'veteran', '2020-09-26T23:52:15Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('aleupoldw@themeforest.net', 'Ardis', 'Leupold', 'span', '2020-10-15T05:49:43Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('dgirhardx@senate.gov', 'Daryle', 'Girhard', 'star', '2021-01-01T18:49:25Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('mdubocky@hexun.com', 'Mellicent', 'Dubock', 'veteran', '2020-05-21T12:30:52Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('pdotz@cyberchimps.com', 'Patty', 'Dot', 'star', '2020-11-08T19:59:47Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('erosenkrantz10@princeton.edu', 'Eachelle', 'Rosenkrantz', 'voluntary', '2020-04-09T00:44:27Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('aeykelhof11@unblog.fr', 'Ag', 'Eykelhof', 'span', '2020-03-28T15:46:59Z', 22);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('fdrake12@purevolume.com', 'Florrie', 'Drake', 'span', '2020-07-12T13:30:27Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('mscogings13@biglobe.ne.jp', 'Monty', 'Scogings', 'veteran', '2020-04-18T02:10:24Z', 22);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('tcrips14@studiopress.com', 'Tom', 'Crips', 'veteran', '2021-01-10T14:49:15Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('sreinard15@desdev.cn', 'Serena', 'Reinard', 'star', '2020-05-26T06:25:07Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('frubinovitch16@com.com', 'Finn', 'Rubinovitch', 'voluntary', '2020-11-22T21:21:39Z', 22);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('konians17@wp.com', 'Karrah', 'Onians', 'star', '2020-03-25T18:47:00Z', 22);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('nconibear18@ucoz.ru', 'Noelle', 'Conibear', 'voluntary', '2020-08-25T04:02:34Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('jmicklem19@livejournal.com', 'Joell', 'Micklem', 'star', '2020-08-08T08:54:37Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('ahinrichsen1a@people.com.cn', 'Ariella', 'Hinrichsen', 'voluntary', '2020-08-15T14:00:56Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('mcunniffe1b@smh.com.au', 'Monah', 'Cunniffe', 'star', '2020-09-15T14:26:40Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('rtatum1c@scribd.com', 'Rosalia', 'Tatum', 'star', '2020-01-02T14:04:45Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('terdes1d@macromedia.com', 'Thorn', 'Erdes', 'voluntary', '2020-07-02T03:22:44Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('cswiffen1e@jimdo.com', 'Caye', 'Swiffen', 'span', '2020-03-03T03:40:06Z', 22);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('emaclese1f@ucoz.com', 'Eugenia', 'MacLese', 'voluntary', '2020-03-31T02:48:42Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('vgaucher1g@tmall.com', 'Vic', 'Gaucher', 'voluntary', '2020-10-29T21:53:03Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('kkalisch1h@oaic.gov.au', 'Kimball', 'Kalisch', 'span', '2020-04-15T20:42:35Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('imylan1i@phoca.cz', 'Ina', 'Mylan', 'star', '2020-02-08T17:39:31Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('achastey1j@sbwire.com', 'Adrianna', 'Chastey', 'voluntary', '2020-06-24T20:07:46Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('ctrain1k@msn.com', 'Celestine', 'Train', 'voluntary', '2020-07-08T12:30:27Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('vwithams1l@360.cn', 'Vidovik', 'Withams', 'voluntary', '2020-11-07T21:21:25Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('edaughton1m@unblog.fr', 'Edd', 'Daughton', 'veteran', '2020-06-20T20:07:44Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('peasun1n@shinystat.com', 'Pauly', 'Easun', 'star', '2020-05-10T03:26:00Z', 22);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('bbirkenhead1o@youku.com', 'Bell', 'Birkenhead', 'star', '2020-06-19T05:54:33Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('ddjorvic1p@buzzfeed.com', 'Devina', 'Djorvic', 'veteran', '2020-07-13T08:44:46Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('mcardo1q@mail.ru', 'Missie', 'Cardo', 'voluntary', '2020-06-13T14:04:13Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('dbertolin1r@hibu.com', 'Derrik', 'Bertolin', 'star', '2020-10-27T16:54:47Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('tbythway1s@reverbnation.com', 'Tiertza', 'Bythway', 'voluntary', '2020-10-01T01:05:01Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('jloder1t@cbc.ca', 'Jerry', 'Loder', 'veteran', '2020-12-15T02:06:34Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('sstribling1u@nytimes.com', 'Spence', 'Stribling', 'span', '2020-01-01T05:21:43Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('cmacphee1v@discovery.com', 'Calla', 'MacPhee', 'span', '2020-12-12T02:34:08Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('grewan1w@mlb.com', 'Gabe', 'Rewan', 'veteran', '2020-01-14T16:12:56Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('hsonger1x@ycombinator.com', 'Hyacinthe', 'Songer', 'veteran', '2020-06-04T00:27:12Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('bfairhurst1y@nbcnews.com', 'Bryana', 'Fairhurst', 'voluntary', '2020-01-17T11:10:12Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('adobbing1z@booking.com', 'Ainsley', 'Dobbing', 'star', '2020-06-27T10:16:30Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('uspieght20@hibu.com', 'Ulberto', 'Spieght', 'span', '2021-01-07T23:35:48Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('rfullom21@umn.edu', 'Raquela', 'Fullom', 'span', '2020-04-27T09:28:32Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('lfeatonby22@harvard.edu', 'Langsdon', 'Featonby', 'voluntary', '2020-09-03T08:15:46Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('jmainston23@wiley.com', 'Joceline', 'Mainston', 'voluntary', '2020-09-11T07:51:02Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('hmonsey24@samsung.com', 'Herta', 'Monsey', 'veteran', '2020-05-19T22:26:46Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('clerohan25@paypal.com', 'Chrissie', 'Lerohan', 'span', '2020-03-01T17:34:23Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('klinskill26@home.pl', 'Krisha', 'Linskill', 'star', '2020-07-19T20:22:55Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('sleeves27@sfgate.com', 'Stern', 'Leeves', 'voluntary', '2020-12-12T02:14:20Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('slesly28@godaddy.com', 'Saba', 'Lesly', 'voluntary', '2020-09-10T23:44:31Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('urenon29@amazon.de', 'Ulrika', 'Renon', 'star', '2020-10-11T20:44:32Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('pbrigman2a@webnode.com', 'Perice', 'Brigman', 'voluntary', '2020-06-13T07:02:43Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('scrockett2b@seattletimes.com', 'Sherlock', 'Crockett', 'span', '2020-04-06T00:22:17Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('lcrowche2c@netscape.com', 'Lurlene', 'Crowche', 'star', '2020-09-08T09:18:22Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('eshuxsmith2d@yahoo.com', 'Enriqueta', 'Shuxsmith', 'veteran', '2020-03-30T06:31:49Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('ccanham2e@dion.ne.jp', 'Corey', 'Canham', 'star', '2020-12-29T09:41:47Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('ydayment2f@go.com', 'Yettie', 'Dayment', 'voluntary', '2020-02-23T02:51:43Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('dleestut2g@freewebs.com', 'Daniella', 'LeEstut', 'veteran', '2021-01-13T08:03:43Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('sorhtmann2h@liveinternet.ru', 'Sutherlan', 'Orhtmann', 'veteran', '2020-04-20T00:06:16Z', 22);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('cvalois2i@addtoany.com', 'Constancy', 'Valois', 'star', '2020-08-21T07:37:50Z', 21);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('gdoggett2j@fotki.com', 'Gnni', 'Doggett', 'star', '2020-08-03T06:24:42Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('zkubiak2k@youtu.be', 'Zachariah', 'Kubiak', 'voluntary', '2020-12-06T15:49:58Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('ahedman2l@vinaora.com', 'Anna-diane', 'Hedman', 'span', '2020-06-14T11:11:04Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('crodnight2m@yahoo.com', 'Caron', 'Rodnight', 'star', '2020-06-27T18:54:11Z', 19);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('sbattisson2n@washingtonpost.com', 'Shelly', 'Battisson', 'star', '2020-04-16T00:36:42Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('bgreasley2o@surveymonkey.com', 'Belvia', 'Greasley', 'span', '2020-05-31T06:01:22Z', 18);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('jyakubov2p@google.com', 'Jecho', 'Yakubov', 'veteran', '2020-08-08T23:50:10Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('vyoules2q@histats.com', 'Vince', 'Youles', 'voluntary', '2020-08-07T15:50:56Z', 20);
insert into student (email, "firstName", "lastName", population, "createdAt", "assignedCoachID") values ('hguerri2r@mysql.com', 'Hurley', 'Guerri', 'veteran', '2020-08-26T18:08:59Z', 20);
        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}