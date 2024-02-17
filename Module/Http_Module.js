const http = require('http');
// http.Server => net.Server => EventEmitter
const server = http.createServer((request, response) => {
    // url => web address
    // here => address in localhost

    const { url, method } = request;

    if (url === '/' && method === "GET") {
        // response:
        //  specify header:
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write('Hello World');
        response.end(); // response.end('Hello World');
    }

    if (url === '/html') {
        response.writeHead(200, { 'Content-Type': 'text/html' }); // not necessary
        response.end('<h1>Hello HTML</h1>'); // it parses text (not html page), if the header was text/plain.
    }

    if (url === '/json') {
        response.writeHead(200, { 'Content-Type': 'application/json' }); // not necessary
        response.write(JSON.stringify([1, 2, 3])); // just accept string as argument.
        response.end();
    }

    if (url === '/xml') {
        response.writeHead(200, { 'Content-Type': 'text/xml' });
        response.write("<XML><KEY>I'm a key.</KEY></XML>>");
        response.end();
    }
});

server.listen(3000, () => {
console.log('Listening for port 3000...');
}); // server is listening to port 3000, for connections (requests).