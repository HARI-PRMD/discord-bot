#!/bin/bash
# run as `source setup.sh`

# Python Processes
(
  cd src/hehe-chan-ai/
  python3 -m venv bot
  . bot/bin/activate
  pip install nltk
  pip install numpy
  pip install torch
  python3 train.py
) 
activate () {
  . src/hehe-chan-ai/bot/bin/activate
}
activate

# node processes
npm install
npm run start