export const parseRequestBody = (req) => (
    new Promise((resolve, reject) => {
        let body = [];
        req
            .on('data', chunk => body.push(chunk))
            .on('end', () => {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                    resolve(body);
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', reject);
    })
)
