const { createReadStream, statSync } = require('fs');
const http = require('http');
const fileName = './BurnInIt.mp4';

/*
Without seek video.
http.createServer(async (req, res) => {
   const readable = createReadStream(fileName);

   res.writeHead(200, {
       'Content-type': 'video/mp4'
   });
   readable.pipe(res);
}).listen(3000, () => console.log('Listening to port 3000.'));
*/

http.createServer(async (req, res) => {
    const readStream = createReadStream(fileName);
    const { size } = statSync(fileName);
    const range = req.headers.range; // bytes=0-985626

    if(range) {
        let [start, end] = range.replace(/bytes=/, '').split("-");
        start = Number(start);
        end = end ? Number(end) : size - 1;

        res.writeHead(206, {
            'Content-Range' : `bytes ${start}-${end}/${size}`,
            'Accept-Range' : 'bytes',
            'Content-Length' : (end - start) + 1,
            'Content-Type' : 'video/mp4',
        });
        createReadStream(fileName, { start, end }).pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length' : size,
            'Content-Type' : 'video/mp4'
        })
        readStream.pipe(res);
    }
}).listen(3000, () => console.log('Listening to port 3000.'));
