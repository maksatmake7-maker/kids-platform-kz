/* Английский язык, 2 класс — «Seasons and weather — времена года и погода». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2seasons",
 "theme": "meadow",
 "groups": [
  {
   "k": "s",
   "name": "Времена года",
   "c": "green",
   "words": [
    [
     "summer",
     "лето"
    ],
    [
     "autumn",
     "осень"
    ],
    [
     "winter",
     "зима"
    ],
    [
     "spring",
     "весна"
    ]
   ]
  },
  {
   "k": "w",
   "name": "Погода",
   "c": "orange",
   "words": [
    [
     "sun",
     "солнце"
    ],
    [
     "rain",
     "дождь"
    ],
    [
     "wind",
     "ветер"
    ],
    [
     "snow",
     "снег"
    ],
    [
     "hot",
     "жарко"
    ],
    [
     "cold",
     "холодно"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "hot",
   "жарко",
   "cold",
   "холодно"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Какое время года самое жаркое?",
   "pre": "",
   "right": "Summer",
   "wrong": [
    "Winter",
    "Spring"
   ],
   "post": ".",
   "ru": "Лето.",
   "hint": "Summer — лето."
  },
  {
   "lv": 1,
   "q": "Когда идёт снег?",
   "pre": "",
   "right": "Winter",
   "wrong": [
    "Summer",
    "Autumn"
   ],
   "post": ".",
   "ru": "Зимой.",
   "hint": "Winter — зима."
  },
  {
   "lv": 1,
   "q": "Когда распускаются цветы?",
   "pre": "",
   "right": "Spring",
   "wrong": [
    "Autumn",
    "Winter"
   ],
   "post": ".",
   "ru": "Весной.",
   "hint": "Spring — весна."
  },
  {
   "lv": 2,
   "q": "Мой любимый сезон — лето.",
   "pre": "My favourite season is ",
   "right": "summer",
   "wrong": [
    "winter",
    "spring"
   ],
   "post": ".",
   "ru": "Мой любимый сезон — лето.",
   "hint": "Season — время года."
  },
  {
   "lv": 2,
   "q": "Идёт дождь.",
   "pre": "It's ",
   "right": "raining",
   "wrong": [
    "snowing",
    "sunny"
   ],
   "post": ".",
   "ru": "Идёт дождь.",
   "hint": "Raining — идёт дождь."
  },
  {
   "lv": 2,
   "q": "Идёт снег.",
   "pre": "It's ",
   "right": "snowing",
   "wrong": [
    "raining",
    "windy"
   ],
   "post": ".",
   "ru": "Идёт снег.",
   "hint": "Snowing — идёт снег."
  },
  {
   "lv": 3,
   "q": "Сегодня жарко и солнечно.",
   "pre": "It's hot and ",
   "right": "sunny",
   "wrong": [
    "snowy",
    "cold"
   ],
   "post": ".",
   "ru": "Сегодня жарко и солнечно.",
   "hint": "Sunny — солнечно."
  },
  {
   "lv": 3,
   "q": "Какая сегодня погода?",
   "pre": "What's the ",
   "right": "weather",
   "wrong": [
    "season",
    "colour"
   ],
   "post": " like?",
   "ru": "Какая погода?",
   "hint": "Weather — погода."
  }
 ],
 "sound": [
  [
   "summer",
   "лето",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "winter",
   "зима",
   "i",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "spring",
   "весна",
   "r",
   [
    "l",
    "n"
   ],
   2,
   2
  ],
  [
   "autumn",
   "осень",
   "t",
   [
    "d",
    "p"
   ],
   2,
   2
  ]
 ],
 "order": [
  [
   "It's hot and sunny.",
   [
    "Hot it's and sunny.",
    "It's sunny hot and."
   ],
   "Жарко и солнечно.",
   "Сначала It's, потом описание погоды."
  ],
  [
   "My favourite season is winter.",
   [
    "Winter my favourite season is.",
    "My is favourite season winter."
   ],
   "Мой любимый сезон — зима.",
   "Сначала My favourite season, потом is и сезон."
  ]
 ],
 "tf": [
  [
   "«{summer}» значит «лето».",
   true,
   "Summer — лето."
  ],
  [
   "«{winter}» значит «весна».",
   false,
   "Winter — зима, а весна — spring."
  ],
  [
   "«{It's raining}» значит «Идёт дождь».",
   true,
   "Rain — дождь."
  ],
  [
   "«{cold}» значит «жарко».",
   false,
   "Cold — холодно, а жарко — hot."
  ]
 ]
});
