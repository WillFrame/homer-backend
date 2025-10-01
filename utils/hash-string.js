import bcrypt from 'bcrypt';
import {HASH_SALT} from '../consts/hash-salt.js';

export async function hashString(string) {
    const hash = await bcrypt.hash(string, HASH_SALT);
    return hash;
}

export async function compareHashed(string, hashedString) {
    return await bcrypt.compare(string, hashedString);
}
