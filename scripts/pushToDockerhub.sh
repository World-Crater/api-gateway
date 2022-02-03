#!/bin/bash

docker build . --platform linux/amd64 -t=superj80820/api-gateway
docker push superj80820/api-gateway