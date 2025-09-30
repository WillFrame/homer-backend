export const notFoundHandler = (req, res) => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Такой ссылки не существует');
}