const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser("279ed519c8238db10ddf582d137ca2beb830993b"));

app.get("/set-cookies", (req, res) => {
    res.cookie("cookieName", "cookieValue"); // cookieName=cookieValue; Path=/;
    res.cookie("nodejs", "javascript, typescript", {
        maxAge: 5000, // ms
        // expires: new Date(new Date().getTime() + 5000) => Specifies the Date cookie will be expired.
        httpOnly: true, // No third party service can use cookies (Just the server via http requests).
        signed: true, // hash cookies, we must set a 'secret' in cookieParser().
        secure: true, // when we use sameSite
        sameSite: "lax",
        // indicates a cookie ought not to be sent along with cross-site requests.
        // none(default): the cookie to be sent in all contexts.
        // strict: your cookie can only be sent in a first-party context; that is,
        //          if the site for the cookie matches the site shown in the browser's address bar.
        // lax: mean that browsers will send the cookie in cross-site requests,
        //      but only if both of the following conditions are met:
        //          The request uses the GET method.
        //          The request resulted from a top-level navigation by the user, such as clicking on a link.
        // https://web.dev/articles/samesite-cookies-explained
    });
    // nodejs=s%3Ajavascript%2C%20typescript.aOodeS4llwKQi6U03uPHBxcwjZ9sNZgAOuzJz79U428
    res.send("Cookie have been saved successfully.");
});

app.get("/get-cookies", (req, res) => {
    const cookies = req.cookies;
    const signedCookies = req.signedCookies;
    res.send({cookies, signedCookies});
    // {
    //     "cookies": {
    //         "cookieName": "cookieValue"
    //     },
    //     "signedCookies": {
    //         "nodejs": "javascript, typescript"
    //     }
    // }
});

app.get("/delete-cookies", (req, res) => {
    // Web browsers and other compliant clients will only clear the cookie
    // if the given options is identical to those given to res.cookie(), excluding expires and maxAge.
    // res.cookie('name', 'tobi', { path: '/admin' })
    // res.clearCookie('name', { path: '/admin' })
    res.clearCookie("cookieName");
    res.send("Cookies have been deleted successfully.");
});

app.listen(3000, () => console.log("Listening to port 3000."));