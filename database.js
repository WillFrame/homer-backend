import {Pool} from 'pg';

const pool = new Pool({
    user: 'matvey',
    host: 'localhost',
    database: 'homer',
    password: '',
    port: 5432,
});

export default pool;
