import { Router, Request, Response, NextFunction, json } from "express";
const router = Router();
const axios = require("axios");
const { graphql, buildSchema } = require('graphql');

const getData = async url => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
var ip='127.0. 0.1';

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type Query {
  ping: String
  geoip: String
  reversedns: String
  virustotal: String
}
`);

var root = {
  ping: () => {
    return getData(`http://worker:8080/ping/${ip}`).then(r=>r['ping']);
  },
  geoip: () => {
    return getData(`http://worker:8080/geoip/${ip}`).then(r=>`~${JSON.stringify(r['geoip'])}~`);
  },
  reversedns: () => {
    return getData(`http://worker:8080/reversedns/${ip}`).then(r=>r['reverse']);
  },
  virustotal: () => {
    return getData(`http://worker:8080/virustotal/${ip}`).then(r=>`~${r['virustotal']}~`);
  },
};

router.get(
  "/",
  (req: Request, resp: Response, next: NextFunction) => {
    ip  = String(req.query.ip);
    let request;
    req.query.request? request = String(req.query.request).split(',') : request= ["ping","geoip","reversedns"];

    console.log(ip);
    console.log(request)
    request.forEach(x=> console.log(x) );
    graphql(schema, `{ ${request.toString()} }`, root).then((response) => {
      console.log(response);
      resp.send(JSON.stringify(response).replace(/\"\~|\~\"|\\n|\\/g,""));
    });
  },
);

export const MainRouter = router;