const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError')

class CollaborationsService {
    constructor() {
        this._pool = new Pool();
    }
    async addCollaboration(noteId, userId) {
        const id = `collab-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO collaborations values ($1, $2,$3) returning id',
            values: [id, noteId, userId]
        }

        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('kolaborasi gagal ditambahkan');
        }
        return result.rows[0].id;
    }

    async deleteCollaboration(noteId, userId) {
        const query = {
            text: 'delete from collaborations where note_id = $1 AND user_id = $2 returning id',
            values: [noteId, userId]
        }
        const result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('kolaborasi gagal dihapus');
        }
    }

    async verifyCollaborator(noteId, userId) {
        const query = {
            text: 'SELECT * from collaborations where note_id = $1 and user_id =$2 returning id',
            values: [noteId, userId],
        };
        result = await this._pool.query(query);
        if (!result.rows.length) {
            throw new InvariantError('kolaborasi gagal diverifikasi');
        }
    }
}
module.exports = CollaborationsService;