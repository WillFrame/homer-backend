import {HTTP_METHOD} from '../../consts/http-methods.js';
import {notFoundHandler} from '../404/index.js';
import singIn from './create.js';

export const authHandler = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const urlFields = url.pathname.split('/');

    // sign_in
    if (req.method === HTTP_METHOD.POST && urlFields[2] === 'sign_in') {
        let body = [];
        return req
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                body = JSON.parse(Buffer.concat(body).toString());
                singIn({...body, ip: req.ip, user_agent: req.headers['user-agent']})
                    .then((response) => {
                        res.writeHead(200, {'Content-Type': 'text/plain'});
                        res.end(response);
                    });
            });
    }

    return notFoundHandler(req, res);
};
