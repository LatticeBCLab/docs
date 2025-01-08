#!/bin/bash

# 进入到你的项目目录
 
while true; do
    # 获取所有分支的列表
    branches=$(git branch -a | grep remotes/origin | grep -v HEAD | awk -F'/' '{print $3}')

    # 遍历每个分支
    for branch in $branches; do
        git pull origin $branch
        echo "Branch $branch is already up to date."
    done
    git checkout master-vue

    echo "All branches checked and synchronized."

    # 等待 10 秒
    sleep 10
done
