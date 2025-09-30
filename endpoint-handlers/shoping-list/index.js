import { ENDPOINTS, ENDPOINTS_ADDITIONAL } from '../../consts/endpoints.js';
import {HTTP_METHOD} from '../../consts/http-methods.js';
import {notFoundHandler} from '../../utils/404-handler.js';
import create from './create.js';

export const handler = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const urlFields = url.pathname.split('/');

    // create
    if (req.method === HTTP_METHOD.POST && urlFields[2] === ENDPOINTS_ADDITIONAL.CREATE) {
        return create(req, res);
    }
    // read list
    // update
    // delete

    return notFoundHandler(req, res);
};
