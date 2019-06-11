#!/usr/bin/env bash

# This script builds the app and serves it on 0.0.0.0:8000
# @NB: requires Python3

yarn build && cd build && python3 -m http.server
