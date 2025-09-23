import crypto from 'crypto';
import {HASH_SALT} from '../consts/hash-salt.js';

class TokenManager {
    constructor(salt = '') {
        this.salt = salt ?? HASH_SALT ?? '';
    }

    hashToken(token) {
        return crypto
            .createHash('sha256')
            .update(token + this.salt)
            .digest('hex');
    }

    generateRandomToken(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }

    verifyToken(providedToken, storedHash) {
        const computedHash = this.hashToken(providedToken);
        return computedHash === storedHash;
    }
}

// Экспорт экземпляра
const tokenManager = new TokenManager();
export default tokenManager;
