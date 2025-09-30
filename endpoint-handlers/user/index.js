import { ENDPOINTS_ADDITIONAL } from '../../consts/endpoints.js';
import {HTTP_METHOD} from '../../consts/http-methods.js';
import { notFoundHandler } from '../../utils/404-handler.js';
import addUser from './create.js';

export const handler = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const urlFields = url.pathname.split('/');

    // create
    if (req.method === HTTP_METHOD.POST && urlFields[2] === ENDPOINTS_ADDITIONAL.CREATE) {
        let body = [];
        return req
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                body = JSON.parse(Buffer.concat(body).toString());
                addUser(body).then(() => {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end('Пользователь успешно создан');
                });
            });
    }

    return notFoundHandler(req, res);
};
