import {createServer} from 'node:http';
import {
    userHandler,
    authHandler,
    shopingListHandler
} from './endpoint-handlers/index.js';
import {ENDPOINTS} from './consts/endpoints.js';
import { notFoundHandler } from './utils/404-handler.js';

const allowedOrigins = [process.env.ALLOWED_ORIGIN_1];
const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

function setSecureCorsHeaders(_req, res) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins);
    res.setHeader('Access-Control-Allow-Methods', ALLOWED_METHODS.join(', '));
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
}

const server = createServer((req, res) => {
    setSecureCorsHeaders(req, res);

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }

    const url = new URL(req.url, `http://${req.headers.host}`);
    const baseUrlPath = url.pathname.split('/')[1];

    switch (baseUrlPath) {
        case ENDPOINTS.USER:
            return userHandler(req, res);
        case ENDPOINTS.AUTH:
            return authHandler(req, res);
        case ENDPOINTS.SHOPING_LIST:
            return shopingListHandler(req, res);
        default:
            return notFoundHandler(req, res);
    }
});

export default server;
