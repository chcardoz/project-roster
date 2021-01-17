import { MigrationInterface, QueryRunner } from "typeorm";

export class FakeStudents1610831657399 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Ethelin', 'Curreen', 'ecurreen0@goodreads.com', 'span', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Hermie', 'Cisson', 'hcisson1@google.it', 'voluntary', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Hortensia', 'Lerer', 'hlerer2@pen.io', 'veteran', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Theo', 'Erik', 'terik3@nydailynews.com', 'veteran', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Barbee', 'Boltwood', 'bboltwood4@goo.ne.jp', 'star', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Kendall', 'Konertz', 'kkonertz5@pinterest.com', 'span', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Wendel', 'Corgenvin', 'wcorgenvin6@japanpost.jp', 'veteran', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Avictor', 'Rainville', 'arainville7@harvard.edu', 'veteran', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Izabel', 'Furbank', 'ifurbank8@mapquest.com', 'star', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Wallie', 'Dovydenas', 'wdovydenas9@xrea.com', 'span', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Lynda', 'Milmoe', 'lmilmoea@google.ca', 'voluntary', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Daveen', 'Chapling', 'dchaplingb@spotify.com', 'span', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Magda', 'Stempe', 'mstempec@hud.gov', 'veteran', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Sascha', 'Cardiff', 'scardiffd@tripod.com', 'star', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Griffin', 'Garmey', 'ggarmeye@eventbrite.com', 'veteran', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Jarrid', 'MacConnechie', 'jmacconnechief@cloudflare.com', 'veteran', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Austine', 'Slane', 'aslaneg@blinklist.com', 'voluntary', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Kimberli', 'Freear', 'kfreearh@hatena.ne.jp', 'voluntary', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Rosemary', 'Kinglesyd', 'rkinglesydi@godaddy.com', 'veteran', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Coleen', 'Ordemann', 'cordemannj@dot.gov', 'veteran', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Ailee', 'Bletso', 'abletsok@macromedia.com', 'star', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Jodee', 'Cotilard', 'jcotilardl@parallels.com', 'veteran', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Tad', 'Edmunds', 'tedmundsm@hostgator.com', 'star', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Leland', 'Brimm', 'lbrimmn@exblog.jp', 'star', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Shina', 'Bockman', 'sbockmano@free.fr', 'star', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Kin', 'Robken', 'krobkenp@ed.gov', 'star', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Teressa', 'MacPaik', 'tmacpaikq@ucla.edu', 'voluntary', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Philly', 'Tesimon', 'ptesimonr@spiegel.de', 'voluntary', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Dene', 'Mossdale', 'dmossdales@narod.ru', 'veteran', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Ursula', 'Bloodworthe', 'ubloodworthet@theatlantic.com', 'voluntary', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Xylina', 'Crannell', 'xcrannellu@discuz.net', 'veteran', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Georgeanna', 'Jepensen', 'gjepensenv@whitehouse.gov', 'span', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Franz', 'Macenzy', 'fmacenzyw@squidoo.com', 'star', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Dori', 'Minton', 'dmintonx@ameblo.jp', 'veteran', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Sharona', 'Emanuel', 'semanuely@de.vu', 'voluntary', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Maurizia', 'Clavering', 'mclaveringz@walmart.com', 'span', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Bari', 'Pellitt', 'bpellitt10@biglobe.ne.jp', 'span', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Fianna', 'Sheryn', 'fsheryn11@bizjournals.com', 'star', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Simone', 'Mitchinson', 'smitchinson12@youtube.com', 'veteran', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Guinna', 'Philott', 'gphilott13@biglobe.ne.jp', 'voluntary', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Tammara', 'McDyer', 'tmcdyer14@dropbox.com', 'star', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Wilhelmina', 'Torpie', 'wtorpie15@marketwatch.com', 'voluntary', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Roxie', 'Exley', 'rexley16@istockphoto.com', 'voluntary', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Filberto', 'Filpi', 'ffilpi17@bloglovin.com', 'veteran', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Jenilee', 'Layman', 'jlayman18@uiuc.edu', 'star', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Maximilian', 'Heathcote', 'mheathcote19@netscape.com', 'voluntary', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Alistair', 'McGrayle', 'amcgrayle1a@newyorker.com', 'span', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Hale', 'MacDunleavy', 'hmacdunleavy1b@mlb.com', 'span', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Aldis', 'Freeburn', 'afreeburn1c@hibu.com', 'star', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Phillis', 'Besson', 'pbesson1d@usgs.gov', 'star', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Cord', 'Rivilis', 'crivilis1e@army.mil', 'span', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Bathsheba', 'Waldock', 'bwaldock1f@craigslist.org', 'voluntary', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Hulda', 'Busen', 'hbusen1g@rediff.com', 'star', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Tadeas', 'Mynard', 'tmynard1h@istockphoto.com', 'star', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Lorenzo', 'Brugsma', 'lbrugsma1i@mit.edu', 'span', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Kahlil', 'Izakson', 'kizakson1j@chron.com', 'veteran', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Tallie', 'Fley', 'tfley1k@myspace.com', 'span', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Kailey', 'Guidoni', 'kguidoni1l@bloglovin.com', 'voluntary', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Sybilla', 'Janjic', 'sjanjic1m@networksolutions.com', 'star', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Irene', 'Weatherhead', 'iweatherhead1n@dell.com', 'veteran', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Brandyn', 'Westwood', 'bwestwood1o@nba.com', 'voluntary', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Zebadiah', 'Albisser', 'zalbisser1p@amazonaws.com', 'veteran', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Carley', 'Hubback', 'chubback1q@networksolutions.com', 'star', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Brooke', 'Speak', 'bspeak1r@ifeng.com', 'veteran', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Darryl', 'Andresser', 'dandresser1s@bbb.org', 'voluntary', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Alexandro', 'De Vaux', 'adevaux1t@washingtonpost.com', 'star', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Ruby', 'Jutson', 'rjutson1u@mit.edu', 'veteran', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Herman', 'Cozzi', 'hcozzi1v@reference.com', 'span', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Annora', 'Dobby', 'adobby1w@cafepress.com', 'span', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Devondra', 'Cornels', 'dcornels1x@yandex.ru', 'star', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Erek', 'Wintour', 'ewintour1y@hugedomains.com', 'star', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Virgil', 'Furphy', 'vfurphy1z@creativecommons.org', 'span', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Dinah', 'Braley', 'dbraley20@moonfruit.com', 'voluntary', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Far', 'Castagno', 'fcastagno21@archive.org', 'voluntary', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Grover', 'Burkman', 'gburkman22@boston.com', 'span', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Therese', 'Moncreiffe', 'tmoncreiffe23@latimes.com', 'voluntary', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Nilson', 'Olifard', 'nolifard24@earthlink.net', 'star', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Theo', 'Wermerling', 'twermerling25@netvibes.com', 'star', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Barby', 'Besque', 'bbesque26@ustream.tv', 'voluntary', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Sully', 'Patron', 'spatron27@lycos.com', 'star', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Eward', 'Mcsarry', 'emcsarry28@networkadvertising.org', 'star', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Harli', 'Cordingly', 'hcordingly29@mashable.com', 'veteran', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Nola', 'Steinham', 'nsteinham2a@clickbank.net', 'voluntary', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Jarad', 'Moiser', 'jmoiser2b@amazon.co.jp', 'veteran', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Marcellus', 'Cayford', 'mcayford2c@yandex.ru', 'veteran', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Olwen', 'Giscken', 'ogiscken2d@bandcamp.com', 'voluntary', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Korney', 'Cheetam', 'kcheetam2e@berkeley.edu', 'span', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Keely', 'Tremblet', 'ktremblet2f@cdbaby.com', 'veteran', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Harlen', 'Bussetti', 'hbussetti2g@github.io', 'star', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Grayce', 'Hryniewicki', 'ghryniewicki2h@nih.gov', 'voluntary', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Flossi', 'Grebert', 'fgrebert2i@themeforest.net', 'span', 1);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Jennie', 'Siggee', 'jsiggee2j@pagesperso-orange.fr', 'veteran', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Blisse', 'Lewis', 'blewis2k@myspace.com', 'veteran', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Bobbye', 'Phelip', 'bphelip2l@paginegialle.it', 'veteran', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Farrand', 'Sharrocks', 'fsharrocks2m@nsw.gov.au', 'span', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Jenni', 'Stoyles', 'jstoyles2n@technorati.com', 'veteran', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Yorker', 'Fooks', 'yfooks2o@ca.gov', 'veteran', 3);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Anderea', 'Yonge', 'ayonge2p@youtube.com', 'veteran', 4);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Tiphani', 'Snoxell', 'tsnoxell2q@comcast.net', 'veteran', 2);
insert into student ("firstName", "lastName", email, population, "assignedCoachID") values ('Tabb', 'Owlner', 'towlner2r@nifty.com', 'voluntary', 4);
        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}