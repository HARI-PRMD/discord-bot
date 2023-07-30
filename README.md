# Typescript x Python E-Girl Discord Bot

I am no longer maintaining this or updating it with new features, so I shall Archive it.
Also word of advice, set up a separate API to track conversations etc (the AI part of this project), having two languages in the same project is super cumbersome.


A Discord bot equipped with multiple chat functions for both guilds and DMs.

## Initial setup

Run the following command in your terminal

MAC/Linux

```bash
  git clone https://github.com/HARI-PRMD/discord-bot.git
  cd discord-bot
  source setup.sh
```

Windows

```bash
  npm install
  cd src\hehe-chan-ai\
  python3 -m venv bot
  bot\Scripts\activate
  pip install nltk
  pip install numpy
  pip install torch
```

Then type for punkt tokenizer

```python
  python
  >>> import nltk
  >>> nltk.download('punkt')
  >>> quit()
```

then

```bash
  python train.py
```


> This will Install all the packages needed for the python ai component
> as well as the typescript components in an environment.

If your results aren't as accurate you can re-train the bot until you get a lower
final loss.

```bash
  source train.sh
```

## Functions

type `!help` in a server to get a full list of guild functions.

<img src="./bot-functions.png"  width="60%">

You can also train the bot by updating [intents.json](src/hehe-chan-ai/intents.json). Just define a new `tag`, possible `patterns`, and possible `responses` for the chatbot. You have to re-run the training whenever this file is modified.

```json
{
  "tag": "Greetings",
  "patterns": [
    "Hello",
    "Hi",
    "Wassup",
  ],
  "responses": [
    "Hello there!",
    "👋",
    "Hi, what can I do for you?"
  ]
},
```

## Acknowledgments

I would like to thank [Patrick Loeber](https://github.com/patrickloeber) for his implementation of the pytorch component of my bot.
