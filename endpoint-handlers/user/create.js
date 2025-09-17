import {SQL_ERROR_CODE} from '../../consts/sql-error-code.js';
import pool from '../../database.js';
import {hashString} from '../../utils/hash-string.js';

async function addUser({name, password}) {
    try {
        const result = await pool.query(
            'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING *',
            [name, await hashString(password)]
        );

        console.log('✅ Пользователь добавлен');

        return result.rows[0];
    } catch (error) {
        if (error.code === SQL_ERROR_CODE.UNIQUE) {
            console.log('❌ Пользователь с таким именем уже существует');
        } else {
            console.error('❌ Ошибка добавления пользователя:', error.message);
        }
        throw error;
    }
}

export default addUser;
