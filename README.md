# node_docker_balacer_api

to run it: docker-compose up --build  -d --scale worker=4

examples of calls: 

http://localhost:5000/?ip=172.217.3.78&request=ping,geoip,reversedns,virustotal
http://localhost:5000/?ip=172.217.3.78&request=ping,geoip
http://localhost:5000/?ip=172.217.3.78

