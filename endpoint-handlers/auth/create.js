import pool from '../../database.js';
import {compareHashed} from '../../utils/hash-string.js';
import tokenManager from '../../utils/token-manager.js';
import {TOKEN_EXPIRES} from '../../consts/token-expires.js';

async function singIn({name, password, ip, user_agent}) {
    try {
        const result = await pool.query(
            `SELECT id, name, password
            FROM users
            WHERE name = $1`,
            [name]
        );

        if (result.rows[0]) {
            const {id, name, password: hashedPassword} = result.rows[0];

            if (await compareHashed(password, hashedPassword)) {
                const generatedToken = tokenManager.generateRandomToken();

                await pool.query(
                    `
                        INSERT INTO user_sessions (user_id, token_hash, user_agent, ip_address, expires_at)
                        VALUES ($1, $2, $3, $4, $5)
                    `,
                    [id, generatedToken, user_agent, ip, new Date(Date.now() + TOKEN_EXPIRES)]
                );
                return `Bearer ${generatedToken}`;
            }

            throw new Error('Неверный пароль');
        } else {
            throw new Error('Пользователь не найден');
        }
    } catch (error) {
        return `❌ Ошибка добавления пользователя: ${error.message}`
    }
}

export default singIn;
