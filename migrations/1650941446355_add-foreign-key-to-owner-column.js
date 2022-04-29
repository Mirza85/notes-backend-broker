/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    //membuat user baru
    pgm.sql("insert into users(id , username , password, fullname) values('old_notes','old_notes'old_notes')")

    //membuat nilai owner pada note yang ownernya bernilai null
    pgm.sql("update notes set ownner = 'old_notes' where owner = NULL");

    //memberikan constarint fk pada owner terhadap kolom id dari tabel user 

    pmg.sql('notes', 'fk_notes.owner_user.id', 'FOREIGN KEY(owner) REFERENCeS user(id) ON DELETE CASCADE')
};

exports.down = pgm => {

    //menghapus constraint fk_notes.owner_user pada tabel notes
    pgm.dropConstraint('notes', 'fk_notes.owner_users.id');


    //mengubah nilai owner old_notes pada note menjadi nullOverride
    pgm.sql("update notes set owner = NULL where owner = 'old_notes'");

    //mengapus user baru.owner_user
    pgm.sql("'DELETE from users where id = 'old_notes'")
};