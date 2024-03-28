// https://en.wikipedia.org/wiki/Basic_access_authentication
// Basic (Traditional) Auth
// req.header("Authorization", "Basic <username:password>")

const express = require("express");
const app = express();

app.use(express.json());

app.get("/decode", (req, res) => {
    const base64Data = req.header("Authorization").split(" ")[1];
    const decodedData = Buffer.from(base64Data, "base64").toString("ascii");
    const [username, password] = decodedData.split(":");
    res.send({
        username, password
    });
});

// random
app.get("/encode", (req, res) => {
    const usernamePassword = `${req.body.username}:${req.body.password}`; // mimhe:12345678
    const base64Data = Buffer.from(usernamePassword).toString("base64");
    res.header("Authorization", `Basic ${base64Data}`);
    res.send(base64Data); // bWltaGU6MTIzNDU2Nzg=
});

app.listen(3000, () => console.log("Listening to port 3000."));