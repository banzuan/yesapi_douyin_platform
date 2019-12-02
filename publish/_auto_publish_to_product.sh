#!/bin/bash
#
# 自动发布代码到各服务器
#
# @author dogstar 20190401

# 最多只有一次同时发布
cur_num=`ps -ef| grep "publish/publish_to_product.sh" |grep -v grep|wc -l`

if [ $cur_num -gt 0 ]; then
    echo "请稍候，有其他发布正在发布中……"
    exit
fi

# 根路径设置为预发布
API_ROOT_PRE="/home/apps/preview/www.yesapi.top"

detail_log="./publish/_publish_detail"

cd $API_ROOT_PRE

echo "" > $detail_log

publis_what=`cat ./publish/_publish_what`

if [ -z "$publis_what" ]; then
    exit
fi 

# 重置发布申请

echo "" > ./publish/_publish_what

date +"%Y-%m-%d %H:%M:%S" > $detail_log

echo "" >> $detail_log

echo "更新代码……" >> $detail_log

# 更新最新代码
git pull >> $detail_log 2>&1

echo "" >> $detail_log

echo "开始发布 $publis_what ……" >> $detail_log

# 开始发布
./publish/publish_to_product.sh $publis_what >> $detail_log 2>&1

date +"%Y-%m-%d %H:%M:%S" >> $detail_log

echo "FINISH 发布完成！" >> $detail_log

