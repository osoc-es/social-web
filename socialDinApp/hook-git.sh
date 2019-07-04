#!/bin/bash
echo "Updating content"
git pull origin master
./docker.build
./docker.push
./docker.deploy
