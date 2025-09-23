import {createServer} from 'node:http';
import {userHandler} from './endpoint-handlers/user/index.js';
import {authHandler} from './endpoint-handlers/auth/index.js';
import {notFoundHandler} from './endpoint-handlers/404/index.js';
import {ENDPOINTS} from './consts/endpoints.js';

const server = createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const baseUrlPath = url.pathname.split('/')[1];

    switch (baseUrlPath) {
        case ENDPOINTS.USER:
            return userHandler(req, res);
        case ENDPOINTS.AUTH:
            return authHandler(req, res);
        default:
            return notFoundHandler(req, res);
    }
});

export default server;
