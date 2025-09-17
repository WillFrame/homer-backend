import {HTTP_METHOD} from '../../consts/http-methods.js';
import addUser from './create.js';

export const userHandler = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const urlFields = url.pathname.split('/');

    if (req.method === HTTP_METHOD.POST && urlFields[2] === 'create') {
        let body = [];
        req
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                body = JSON.parse(Buffer.concat(body).toString());
                addUser(body).then(() => {
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end('Пользователь успешно создан');
                });
            });
    }
};
