#!/bin/bash

if [ $# -eq 0 ]; then
  echo 'express_info <token> <number>'
  exit 0
fi


curl -H "Content-type:application/json" -H "Authorization:$1" -X GET http://123.207.114.250:10080/rest/express_info?order_number=$2 
