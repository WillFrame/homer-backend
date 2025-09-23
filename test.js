import crypto from 'crypto';

class TokenManager {
    constructor(salt = '') {
        this.salt = salt;
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

const tokenManager = new TokenManager(10);

export const token = 'd3f66c50a590a746f646465ced589c06fe2b42bbee84276334738c9a1324a043';

console.log(tokenManager.hashToken(token), tokenManager.hashToken(token));
console.log(tokenManager.verifyToken(token, tokenManager.hashToken(token)));