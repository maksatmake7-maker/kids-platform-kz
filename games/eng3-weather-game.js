/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «Weather — погода». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3weather",
 "theme": "sky",
 "groups": [
  {
   "k": "w",
   "name": "Погода",
   "c": "orange",
   "words": [
    [
     "sunny",
     "солнечно"
    ],
    [
     "rainy",
     "дождливо"
    ],
    [
     "cloudy",
     "облачно"
    ],
    [
     "windy",
     "ветрено"
    ],
    [
     "snowy",
     "снежно"
    ],
    [
     "foggy",
     "туманно"
    ]
   ]
  },
  {
   "k": "s",
   "name": "Времена года",
   "c": "green",
   "words": [
    [
     "spring",
     "весна"
    ],
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
    ]
   ]
  },
  {
   "k": "n",
   "name": "Явления природы",
   "c": "blue",
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
     "snow",
     "снег"
    ],
    [
     "wind",
     "ветер"
    ],
    [
     "cloud",
     "облако"
    ],
    [
     "rainbow",
     "радуга"
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
  ],
  [
   "warm",
   "тепло",
   "cool",
   "прохладно"
  ],
  [
   "summer",
   "лето",
   "winter",
   "зима"
  ],
  [
   "sunny",
   "солнечно",
   "cloudy",
   "облачно"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Сегодня солнечно.",
   "pre": "It is ",
   "right": "sunny",
   "wrong": [
    "snowy",
    "windy"
   ],
   "post": " today.",
   "ru": "Сегодня солнечно.",
   "hint": "Sunny — солнечно."
  },
  {
   "lv": 1,
   "q": "Идёт снег. Сегодня снежно.",
   "pre": "It is ",
   "right": "snowy",
   "wrong": [
    "sunny",
    "hot"
   ],
   "post": " today.",
   "ru": "Сегодня снежно.",
   "hint": "Snowy — снежно."
  },
  {
   "lv": 1,
   "q": "Зимой холодно.",
   "pre": "In ",
   "right": "winter",
   "wrong": [
    "summer",
    "spring"
   ],
   "post": " it is cold.",
   "ru": "Зимой холодно.",
   "hint": "In winter — зимой."
  },
  {
   "lv": 1,
   "q": "Летом жарко.",
   "pre": "In ",
   "right": "summer",
   "wrong": [
    "winter",
    "autumn"
   ],
   "post": " it is hot.",
   "ru": "Летом жарко.",
   "hint": "In summer — летом."
  },
  {
   "lv": 2,
   "q": "После лета наступает...",
   "pre": "After summer comes ",
   "right": "autumn",
   "wrong": [
    "spring",
    "winter"
   ],
   "post": ".",
   "ru": "После лета наступает осень.",
   "hint": "Autumn — осень."
  },
  {
   "lv": 2,
   "q": "Какая сегодня погода?",
   "pre": "What is the ",
   "right": "weather",
   "wrong": [
    "water",
    "whether"
   ],
   "post": " like today?",
   "ru": "Какая сегодня погода?",
   "hint": "Weather — погода."
  },
  {
   "lv": 3,
   "q": "Весной тепло.",
   "pre": "In spring it is ",
   "right": "warm",
   "wrong": [
    "hot",
    "snowy"
   ],
   "post": ".",
   "ru": "Весной тепло.",
   "hint": "Warm — тепло."
  }
 ],
 "sound": [
  [
   "sunny",
   "солнечно",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "rainy",
   "дождливо",
   "i",
   [
    "e",
    "a"
   ],
   2,
   1
  ],
  [
   "windy",
   "ветрено",
   "n",
   [
    "m",
    "l"
   ],
   2,
   1
  ],
  [
   "winter",
   "зима",
   "t",
   [
    "d",
    "p"
   ],
   3,
   2
  ],
  [
   "summer",
   "лето",
   "m",
   [
    "n",
    "b"
   ],
   2,
   2
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
   "m",
   [
    "n",
    "b"
   ],
   4,
   3
  ],
  [
   "cloudy",
   "облачно",
   "o",
   [
    "a",
    "u"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "It is sunny today.",
   [
    "Today sunny it is.",
    "Sunny is it today."
   ],
   "Сегодня солнечно.",
   "Сначала It is, потом какая погода."
  ],
  [
   "In winter it is cold.",
   [
    "In winter is cold it.",
    "It in winter cold is."
   ],
   "Зимой холодно.",
   "Сначала In winter, потом it is cold."
  ],
  [
   "What is the weather like?",
   [
    "What the weather is like?",
    "Is what the weather like?"
   ],
   "Какая погода?",
   "Вопрос начинается с What is."
  ],
  [
   "It is hot in summer.",
   [
    "It hot is in summer.",
    "Hot it is in summer."
   ],
   "Летом жарко.",
   "Сначала It is, потом какая погода."
  ]
 ],
 "tf": [
  [
   "«{winter}» — это «зима».",
   true,
   "Winter — зима."
  ],
  [
   "«{hot}» и «{cold}» — противоположные слова.",
   true,
   "Hot — жарко, cold — холодно."
  ],
  [
   "«{snowy}» значит «солнечно».",
   false,
   "Snowy — снежно, sunny — солнечно."
  ],
  [
   "После «{summer}» идёт «{autumn}».",
   true,
   "После лета — осень."
  ],
  [
   "«{spring}» — это «осень».",
   false,
   "Spring — весна, autumn — осень."
  ],
  [
   "«{It is rainy}» значит «Дождливо».",
   true,
   "Rainy — дождливо."
  ]
 ]
});
