import express from "express";
import compression from "compression";
import path from "path";

const PORT = process.env.PORT || 3000;
const BUILD_PATH = "public";
const express = require("express");
const app = express();  //create express app
const port =process.env.PORT || 3000

//define routes
app.get("/", (req, res) => {
    res.send("hello, welcome here ")
});

function setNoCache(res) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    res.setHeader("Expires", date.toUTCString());
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Cache-Control", "public, no-cache");
  }
  
  function setLongTermCache(res) {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    res.setHeader("Expires", date.toUTCString());
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  }
  
  app.use(compression());
  app.use(
    express.static(BUILD_PATH, {
      extensions: ["html"],
      setHeaders(res, path) {
        if (path.match(/(\.html|\/sw\.js)$/)) {
          setNoCache(res);
          return;
        }
  
        if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|json)$/)) {
          setLongTermCache(res);
        }
      },
    }),
  );
  
  app.get("*", (req, res) => {
    setNoCache(res);
    res.sendFile(path.resolve(BUILD_PATH, "index.html"));
  });
  
  app.listen(port, () => {
    console.log(`Server is running`);
  });
//listen to request
app.listen(port, () => {
    console.log(`server is running at port no http://localhost:${Port}`);
})
