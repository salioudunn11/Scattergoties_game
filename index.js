import express from "express";
const app = express();
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html'});
    const html = `
    <html>
    <head><title>Scattergories</title></head>
    <body><h1>Endpoint game to make a session</h1></body>
    </html>
    `;
    res.end(html);
});

const port = 8080;
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});