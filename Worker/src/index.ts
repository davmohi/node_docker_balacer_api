import * as express from "express";
import { MainRouter } from "./router";

const PORT = 8080;

let app = express();

app.use( function(req, res,next) {

  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    console.log(`favicon`);
    return res.sendStatus(204);
  }
  return next();
});

app.use(MainRouter);


app.listen(PORT, () => {
  
  console.log(`Server listening on port ${PORT}`);
});

