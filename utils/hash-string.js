import bcrypt from 'bcrypt';
import {HASH_MINOR} from '../consts/hash-minor.js';

export async function hashString(string) {
    const hash = await bcrypt.hash(string, HASH_MINOR);
    return hash;
};
