
// not needed if you are using docker-compose with initial environment variables
// db.createUser({
//     user: 'root',
//     pwd: 'root',
//     roles: [
//         {
//             role: 'readWrite',
//             db: 'logs_db',
//         },
//     ],
// });

db = new Mongo().getDB("logs_db");

db.createCollection('logs', { capped: false });
