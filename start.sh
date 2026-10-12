#!/bin/bash
set -e
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  npm install
fi

export HOST=0.0.0.0
npm run dev
