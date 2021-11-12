import express, { Response } from "express";
import compression from "compression";
import path from "path";

const PORT = process.env.PORT || 3000;
const BUILD_PATH = "public";

const app = express();

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
  res.setHeader("Cache-Control", "public, max-age=2592000, immutable");
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

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});

