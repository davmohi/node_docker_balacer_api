import { Router, Request, Response, NextFunction } from "express";

const router = Router();
var geoip = require('geoip-lite');
const dns = require('dns');
var ping = require('ping');
const nvt = require('node-virustotal');
var net = require('net');


const defaultTimedInstance = nvt.makeAPI();

router.get(
  "/geoip/:ip",
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`ip`);
    const { ip } = req.params;
    var geo = geoip.lookup(ip);
    res.send({"geoip":geo});
  },
);

router.get(
  "/reversedns/:ip",
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`reverse`);
    const { ip } = req.params;
    dns.reverse(ip, (err, hostnames) => {
      err ? res.send({"reverse":'not found'}) : res.send({"reverse":hostnames});
    })
  },
);

router.get(
  "/ping/:ip",
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`ping`);
    const { ip } = req.params;
    ping.sys.probe(ip, function(isAlive){
      var msg = isAlive ? 'host ' + ip + ' is alive' : 'host ' + ip + ' is dead';
      res.send({"ping":msg});
    });
  },
);

router.get(
  "/virustotal/:ip",
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`virus`);
    const { ip } = req.params;
    defaultTimedInstance.ipLookup(ip, function(err, resp){
      if (err) {
        res.send({"virustotal":'not found'});
      }
        res.send({"virustotal":resp});
    })
  },
);

router.get(
  "/portscanner/:ip",
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`portscann`);
    const { ip } = req.params;
    let host = ip;
    let start = 20;
    let stop = 9100;
    let ports = [];
    
    for(let port = start; port <= stop; port++){
      let client = new net.Socket();
      client.connect({ port: port, host: host }), function() {
        ports.push(port);
        client.destroy();
      }
    }
    console.log(ports);
    res.send({"openports":ports});
  },
);



export const MainRouter = router;