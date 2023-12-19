#!/bin/bash

if [ "$1" != "dev_localhost" ] && [ "$1" != "dev_container" ]; then
  echo "please set MODE in /root/backend/.env correctly."
  exit 1
fi