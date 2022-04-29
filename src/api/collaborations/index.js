const routes = require('./routes');
const CollaborationsHandler = require('./handler')
module.exports = {
    name: 'collaborations',
    version: '1.0.0',
    register: async(server, { collaborationsService, noteService, validator }) => {
        const collaborationsHandler = new CollaborationsHandler(server, { collaborationsService, noteService, validator });
        server.route(routes(collaborationsHandler));

    }
}