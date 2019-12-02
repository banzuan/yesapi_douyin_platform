#!/bin/bash
#
# 发布代码到各服务器
#
# @author dogstar 20190401

DIR="$( cd "$( dirname "$0"  )" && pwd  )"
is_pre=$(echo $DIR | grep "preview")
if [[ "$is_pre" == "" ]]
then
    echo "Please run in preview mode!"
    exit 1
fi

if [ $# -lt 1 ]; then
    echo "Usage: $0 <lite|full>"
    echo ""
    echo " - $0 lite        # publish src, public, config, etc. NOT with vendor (正常)"
    echo " - $0 full        # publish src with vendor (最慢)"
    echo ""
    exit 1
fi

SUCCESS='\033[1;32m'
FAILURE='\033[1;35m'
RES='\033[0m'

# 根路径设置为预发布
API_ROOT_PRE="/home/apps/preview/www.yesapi.top"
API_ROOT="/home/apps/projects/www.yesapi.top"


# publish/run_on_product.sh 要同步修改！！
IPS=("47.92.213.241")

publish_what=$1

echo "start to publish to product ..."
echo ""

# Step 0. 备份备份
cp $API_ROOT_PRE/publish/bak/api.tar.gz $API_ROOT_PRE/publish/bak/api.tar.gz.bak

# Step 1. 备份
cp $API_ROOT_PRE/publish/api.tar.gz $API_ROOT_PRE/publish/bak/api.tar.gz

cd $API_ROOT_PRE

# Step 2. 打包
tar -czf ./publish/api.tar.gz ./dist

# Step 3. 分发

# 其他机器，使用scp传送
for ip in ${IPS[*]} 
do 
    echo -e "[${SUCCESS}$ip${RES}] start to scp ..."

    if [ $ip = "47.92.213.241" ]; then 
        port="41918" 
    else 
        port="22" 
    fi 

    scp -P$port $API_ROOT_PRE/publish/api.tar.gz apps@$ip:$API_ROOT

    # echo ""
done

# 云端集群解压
$API_ROOT_PRE/publish/run_on_product.sh "tar -xzf $API_ROOT/api.tar.gz -C $API_ROOT"

echo -e "${SUCCESS}OK! ${RES}"
echo ""

