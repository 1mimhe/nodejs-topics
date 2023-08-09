const https = require('https');
const request = require('request');
const fetch = require('node-fetch'); // just v2 can be import with 'require' or import()
const axios = require('axios');
// const got = require('got'); // can not be import with 'require'

const address = 'los angeles';
const url = `https://geocode.maps.co/search?q=${address}`;

// 1. http(s) module (node.js standard module)
// it is low level.
const req = https.request(url, (response) => {
    let data = ''

    // A chunk of data has been received.
    response.on('data', (chunk) => {
        // chunk = Buffer => string (typecasting)
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    response.on('end', () => {
        console.log(JSON.parse(data));
    });
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});

req.end();

// 2. 'request' npm package
request({url, json: true}, (error, response) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Latitude: ${response.body[0].lat}, Longitude: ${response.body[0].lon}`);
    }
});

// 3. 'node-fetch' npm package (most-pop)
// node-fetch is a lightweight module that brings the browser library window.fetch to Node.js with minimal code.
async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

fetchData(url).then(data => console.log(data));
// also we can post with 'fetch'
/*
fetch(url, {
    method: 'post',
	body: JSON.stringify(body) }
*/

// 4. 'axios' npm package
// Axios is a Promise-based HTTP client for the browser as well as node.js.
// Axios even parses JSON responses by default.
axios.get(url)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    });
// also, we have 'axios.all' for parallel requests.

// 5. 'got' npm package
/*
got(url, {json: true}).then(response => {
    console.log(response.body)
}).catch(error => {
    console.log(error.response.body);
});
*/