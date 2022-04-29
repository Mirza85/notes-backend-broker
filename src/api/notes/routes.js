// const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler')

const routes = (handler) => [{
        method: 'POST',
        path: '/notes',
        handler: handler.postNoteHandler,
        options: {
            auth: 'notesapp_jwt'
        }
    },

    //menampilkan semua notes 
    {
        method: 'GET',
        path: '/notes',
        handler: handler.getNotesHandler,
        options: {
            auth: 'notesapp_jwt'
        }
    },
    // {
    //     method: 'Get',
    //     path: '/notes',
    //     handler: getNoteByIdHandler,
    // },

    //menampilkan notes berdasarkan index
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: handler.getNoteByIdHandler,
        options: {
            auth: 'notesapp_jwt'
        }
    },
    //mengedit notes berdasarkan index
    {
        method: 'put',
        path: '/notes/{id}',
        handler: handler.putNoteByIdHandler,
        options: {
            auth: 'notesapp_jwt'
        }
    },
    //menghapus notes berdasarkan index
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: handler.deleteNoteByIdHandler,
        options: {
            auth: 'notesapp_jwt'
        }
    }
];

module.exports = routes;