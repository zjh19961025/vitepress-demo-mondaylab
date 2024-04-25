#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm run docs:build

# 进入生成的文件夹
cd docs/.vitepress/dist

git init
git add -A
git commit -m '部署git-page'

git push -f git@github.com:zjh19961025/vitepress-demo-mondaylab.git master:gh-pages

# 返回上一级目录
cd ..

# 删除dist文件夹
rm -rf dist
