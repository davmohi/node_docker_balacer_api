import * as express from "express";
import { MainRouter } from "./router";

const PORT = 9090;

let app = express();

app.use(MainRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});