#!/bin/bash

SUCCESS='\033[1;32m'
FAILURE='\033[1;35m'
RES='\033[0m'

IPS=("47.92.213.241")
USER="apps" 
API_ROOT="/home/apps/projects/www.yesapi.top"

if [ $# -lt 1 ]; then
    echo "Usage: $0 <cmd>"
    exit 1
fi

cmd=$1
# echo ""

for ip in ${IPS[*]} 
do 
    if [ $ip = "47.92.213.241" ]; then
        port="41918" 
    else 
        port="22" 
    fi 

    echo -e "[${SUCCESS}$ip${RES}] start to run:${FAILURE} $1 ${RES} ..."

    ssh -t -p $port $USER@$ip "$cmd" 

    # echo ""
done  
