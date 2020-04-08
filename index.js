const express = require("express");

const dbRouter = require("./data/router.js")

const server = express();

server.use(express.json());

server.use("/api/posts", dbRouter)

server.get("/", (req, res)=> {
    res.send("Hello World")
})

server.listen(4007, ()=> {
    console.log("\n*** Server Running on http://localhost:4007 ***\n")
})