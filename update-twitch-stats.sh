#!/bin/bash

npx twitch-stats-getter -c cmgriffing -d /Users/cmgriffing/Downloads -o /Users/cmgriffing/repos/blog-gatsby/src/stream-metrics/monthly.csv -e

cd /Users/cmgriffing/repos/blog-gatsby &&
git add ./src/stream-metrics/monthly.csv &&
git commit -m "chore: update monthly stream metrics" &&
git push origin main
