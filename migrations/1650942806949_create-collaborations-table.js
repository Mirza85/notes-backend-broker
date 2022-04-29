/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    //membuat table colaborations

    pgm.createTable('collaborations', {
        id: {
            type: 'varchar(50)',
            primaryKey: true,
        },
        note_id: {
            type: 'varchar(50)',
            notNull: true,
        },
        user_id: {
            type: 'varchar(50)',
            notNull: true,
        }
    });

    //menabahkan constrant unique . kombinasi dari kolom note_id dan user_id guna menghindari duplikasi datra antara nilai keduanya

    pgm.addConstraint('collaborations', 'unique_note_id_and_user_id', 'UNIQUE(note_id, user_id)');

    //memberikan constraint foreign key pada kolom note_Bid dan user_id terhadap notes.id dan user.id
    pgm.addConstraint('collaborations', 'fk_collaborations.note_id_notes_id', 'foreign key(note_id) references notes(id) on delete cascade');

    pgm.addConstraint('collaborations', 'fk_collaborations.user_id_users_id', 'foreign key(user_id) references users(id) on delete cascade')
};

exports.down = pgm => {

    //menghapus tabel kolaborasis
    pgm.dropTable('collaborations')
};