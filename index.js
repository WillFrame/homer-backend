import server from './server.js';

const HOSTNAME = process.env.SERVER_HOSTNAME ?? 'localhost';
const PORT = process.env.SERVER_PORT ?? 3000;

server.listen(PORT, HOSTNAME, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
