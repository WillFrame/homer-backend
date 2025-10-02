import {TOKEN_EXPIRES} from "../../consts/token-expires.js";
import pool from "../../database.js";
import {parseRequestBody} from "../../utils/get-body-data.js";
import {compareHashed} from "../../utils/hash-string.js";
import tokenManager from "../../utils/token-manager.js";

class ShopingListConroller {
    async create(req, res) {
        try {
            const {name, password} = await parseRequestBody(req);

            const result = await pool.query(
                `SELECT id, name, password
                FROM users
                WHERE name = $1`,
                [name],
            );

            if (result.rows[0]) {
                const {id, password: hashedPassword} = result.rows[0];

                if (await compareHashed(password, hashedPassword)) {
                    const generatedToken = tokenManager.generateRandomToken();

                    await pool.query(
                        `
                            INSERT INTO user_sessions (user_id, token_hash, user_agent, ip_address, expires_at)
                            VALUES ($1, $2, $3, $4, $5)
                        `,
                        [id, generatedToken, req.headers.user_agent, req.ip, new Date(Date.now() + TOKEN_EXPIRES)],
                    );

                    res.writeHead(200, {'Content-Type': 'application/json'});
                    return res.end(JSON.stringify({token: `Bearer ${generatedToken}`}));
                }

                res.writeHead(405, {'Content-Type': 'text/plain'});
                throw new Error('Wrong password');
            } else {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                throw new Error('User not found');
            }
        } catch (error) {
            return res.end(JSON.stringify({error: `Authorization error: ${error.message}`}));
        }
    }
}

const controller = new ShopingListConroller();
export default controller;
