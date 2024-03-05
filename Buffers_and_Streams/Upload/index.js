const http = require('http');
const {createWriteStream} = require('fs');
const {extname} = require('path');
const multiparty = require('multiparty');

http.createServer(async (req, res) => {
    const {url, method} = req;

    if(url === "/" && method === "POST") {
        let form = new multiparty.Form();
        form.parse(req);

        form.on('part', (part) => {
            const ext = extname(part.filename);
            console.log(ext)
            part.pipe(createWriteStream(`./stream/${Date.now() + ext}`))
                .on('close', () => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(`
                    <h1>File Uploaded: ${part.filename}</h1>
                `);
                });
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
            <form enctype="multipart/form-data" method="POST" action="/">
                <input type="file" name="upload-file">
                <button>Upload File</button>
            </form>
        `);
    }
}).listen(3000, () => console.log('Listening to port 3000.'));