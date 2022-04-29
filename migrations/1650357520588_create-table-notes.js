/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('notes', {
        id: {
            type: 'varchar(50)',
            primaryKey: true,
        },
        title: {
            type: 'TEXT',
            notNullB: true,
        },
        body: {
            type: 'TEXT',
            notNull: true,
        },
        tags: {
            type: 'TEXT[]',
            notNull: true,
        },
        created_at: {
            type: 'TEXT',
            notNull: true,
        },
        updated_at: {
            type: 'TEXT',
            notNull: true,
        },


    });
};

exports.down = pgm => {
    pgm.dropTable('notes');
};