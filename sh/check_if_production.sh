#!/bin/bash

if [ "$1" != "production" ]; then
  echo "please set MODE in /root/backend/.env correctly."
  exit 1
fi