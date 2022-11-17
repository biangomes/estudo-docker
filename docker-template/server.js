const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 8080;

app.get("/", async (req, resp) => {
    resp.setHeader("Content-Type", "text/html");
    resp.status(200);
    resp.send("<h1>Hello world!!!!!!!!!!!!</h1>");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("good");
    }, 300);
    reject("bad");
});

myPromise.then(() => {
    console.log("this will never run");
})