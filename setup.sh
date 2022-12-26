#!/bin/bash
# run as `source setup.sh`

# setting up token and .env
echo -n 'do you want to start bot server immediately after setup (yes/no): ';
read setup;
echo -n 'enter bot token: ';
read token;
echo 'creating .env file with token';

PWD=`pwd`;
if [[ -f "$PWD/.env" ]];
then
  echo "TOKEN=\"$token\"" > .env
else 
  touch .env
  echo "TOKEN=\"$token\"" > .env;
fi
sleep 1;
echo 'Created .env file with token';
# Python Processes
# Creating Environment
(
  cd src/hehe-chan-ai/;
  python3 -m venv bot;
  . bot/bin/activate;
  echo 'Downloading Python dependencies for AI Component';
  
  echo 'Installing Python Modules';
    pip install nltk &>/dev/null;
    echo 'Installed nltk';
    pip install numpy &>/dev/null;
    echo 'Installed numpy';
    pip install torch &>/dev/null;
    echo 'Installed torch';
    python3 - << EOF
import nltk
nltk.download('punkt')
EOF
    echo 'Installed nltk punkt tokeniser';
  echo 'Training bot'
  python train.py &>/dev/null;
  echo 'Bot trained on given intents'
)
activate () {
  . src/hehe-chan-ai/bot/bin/activate
}
sleep 1;
echo 'Activating bot environment';
activate;

# node processes
sleep 1;
echo 'Installing Node Modules'
npm install &>/dev/null;
echo 'installed'
# echo '    "colors": "^1.4.0",
#     "date-fns": "^2.29.3",
#     "discord.js": "^14.6.0",
#     "dotenv": "^16.0.3"
# '
sleep 1;
if [[ $setup = yes ]]
then
  echo 'Staring bot server';
  npm run start;
else
  sleep 1;
  echo 'setup complete';
  sleep 1;
  echo 'Use the following command to start your bot';
  echo 'npm run start';
fi