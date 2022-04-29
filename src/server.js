require('dotenv').config();
const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt')

const notes = require('./api/notes')
const NotesService = require('./services/postgres/NotesService')
const NotesValidator = require('./validator/notes')

const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UserValidator = require('./validator/users');

const authentications = require('./api/authentications');
const AuthenticationService = require('./services/postgres/AuthenticationService');
const TokenManager = require('./tokenize/TokenManager')
const AuthenticationsValidator = require('./validator/authentications')

const collaborations = require('./api/collaborations');
const CollaborationsService = require('./services/postgres/CollaborationsService');
const CollaborationsValidator = require('./validator/collaborations')

//exports broker 
const _exports = require('./api/exports')
const ProducerService = require('./services/rabbitmq/producerService');
const ExportsValidator = require('./validator/exports')


const init = async() => {
    const collaborationsService = new CollaborationsService();
    const noteService = new NotesService(collaborationsService);
    const userService = new UsersService();
    const authenticationsService = new AuthenticationService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });

    await server.register([{
        plugin: Jwt,
    }]);

    //mendefinisikan staregi autentikasi jwt
    server.auth.strategy('notesapp_jwt', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            }
        })

    });
    //registrasi satu plugin
    await server.register([{
            plugin: notes,
            options: {
                service: noteService,
                validator: NotesValidator,
            },
        },
        {
            plugin: users,
            options: {
                service: userService,
                validator: UserValidator,
            }
        },
        {
            plugin: authentications,
            options: {

                authenticationsService,
                userService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            }

        },
        {
            plugin: collaborations,
            options: {
                collaborationsService,
                noteService,
                validator: CollaborationsValidator,

            }
        },
        {
            plugin: _exports,
            options: {
                service: ProducerService,
                validator: ExportsValidator,
            },
        },

    ]);

    await server.start();
    console.log(`server berjalan pada ${server.info.uri}`)



}
init();