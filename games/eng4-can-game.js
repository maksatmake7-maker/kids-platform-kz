/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Can, must, let’s». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4can",
 "theme": "play",
 "groups": [
  {
   "k": "can",
   "name": "Могу / умею",
   "c": "green",
   "words": [
    [
     "can",
     "могу, умею"
    ],
    [
     "can’t",
     "не могу"
    ],
    [
     "Can I",
     "можно мне"
    ],
    [
     "please",
     "пожалуйста"
    ],
    [
     "of course",
     "конечно"
    ],
    [
     "sorry",
     "извини"
    ]
   ]
  },
  {
   "k": "rules",
   "name": "Правила",
   "c": "orange",
   "words": [
    [
     "must",
     "должен"
    ],
    [
     "mustn’t",
     "нельзя"
    ],
    [
     "listen",
     "слушай"
    ],
    [
     "open",
     "открой"
    ],
    [
     "close",
     "закрой"
    ],
    [
     "be quiet",
     "тише"
    ]
   ]
  },
  {
   "k": "idea",
   "name": "Предложения",
   "c": "blue",
   "words": [
    [
     "let’s",
     "давай"
    ],
    [
     "play",
     "играть"
    ],
    [
     "go",
     "идти"
    ],
    [
     "sing",
     "петь"
    ],
    [
     "draw",
     "рисовать"
    ],
    [
     "read",
     "читать"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "can",
   "могу",
   "can’t",
   "не могу"
  ],
  [
   "must",
   "должен",
   "mustn’t",
   "нельзя"
  ],
  [
   "open",
   "открой",
   "close",
   "закрой"
  ],
  [
   "stand",
   "встань",
   "sit",
   "сядь"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я умею плавать.",
   "pre": "I ",
   "right": "can",
   "wrong": [
    "must",
    "am"
   ],
   "post": " swim.",
   "ru": "Я умею плавать",
   "hint": "Can — умею."
  },
  {
   "lv": 1,
   "q": "Можно мне войти?",
   "pre": "",
   "right": "Can",
   "wrong": [
    "Must",
    "Are"
   ],
   "post": " I come in?",
   "ru": "Можно мне войти",
   "hint": "Can I…? — можно мне?"
  },
  {
   "lv": 1,
   "q": "Открой книгу.",
   "pre": "",
   "right": "Open",
   "wrong": [
    "Opens",
    "Opening"
   ],
   "post": " your book.",
   "ru": "Открой книгу",
   "hint": "Просьба — глагол без изменений."
  },
  {
   "lv": 2,
   "q": "Нельзя бегать в классе.",
   "pre": "You ",
   "right": "mustn’t",
   "wrong": [
    "must",
    "can’t"
   ],
   "post": " run in the classroom.",
   "ru": "Нельзя бегать в классе",
   "hint": "Mustn’t — нельзя."
  },
  {
   "lv": 2,
   "q": "Мы должны слушать учителя.",
   "pre": "We ",
   "right": "must",
   "wrong": [
    "mustn’t",
    "can’t"
   ],
   "post": " listen to the teacher.",
   "ru": "Мы должны слушать учителя",
   "hint": "Must — должен."
  },
  {
   "lv": 2,
   "q": "Давай играть!",
   "pre": "",
   "right": "Let’s",
   "wrong": [
    "Lets",
    "Let"
   ],
   "post": " play!",
   "ru": "Давай играть",
   "hint": "Let’s + глагол."
  },
  {
   "lv": 3,
   "q": "Не говори громко!",
   "pre": "",
   "right": "Don’t",
   "wrong": [
    "Not",
    "Doesn’t"
   ],
   "post": " talk loudly!",
   "ru": "Не говори громко",
   "hint": "Запрет: Don’t + глагол."
  },
  {
   "lv": 3,
   "q": "Она не умеет плавать.",
   "pre": "She ",
   "right": "can’t",
   "wrong": [
    "mustn’t",
    "doesn’t"
   ],
   "post": " swim.",
   "ru": "Она не умеет плавать",
   "hint": "Can’t — не умеет."
  },
  {
   "lv": 3,
   "q": "Нужно мыть руки.",
   "pre": "You ",
   "right": "must",
   "wrong": [
    "can",
    "mustn’t"
   ],
   "post": " wash your hands.",
   "ru": "Нужно мыть руки",
   "hint": "Must — нужно."
  }
 ],
 "sound": [
  [
   "listen",
   "слушай",
   "s",
   [
    "z",
    "c"
   ],
   2,
   1
  ],
  [
   "open",
   "открой",
   "p",
   [
    "b",
    "t"
   ],
   1,
   1
  ],
  [
   "close",
   "закрой",
   "l",
   [
    "r",
    "n"
   ],
   1,
   1
  ],
  [
   "quiet",
   "тихо",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "please",
   "пожалуйста",
   "l",
   [
    "r",
    "n"
   ],
   1,
   2
  ],
  [
   "sorry",
   "извини",
   "r",
   [
    "l",
    "n"
   ],
   2,
   2
  ],
  [
   "sing",
   "петь",
   "n",
   [
    "m",
    "l"
   ],
   2,
   2
  ],
  [
   "draw",
   "рисовать",
   "r",
   [
    "l",
    "w"
   ],
   1,
   3
  ],
  [
   "mustn’t",
   "нельзя",
   "u",
   [
    "a",
    "o"
   ],
   1,
   3
  ]
 ],
 "order": [
  [
   "You must listen.",
   [
    "You listen must.",
    "Must you listen."
   ],
   "Ты должен слушать",
   "You must + глагол."
  ],
  [
   "Can I come in?",
   [
    "I can come in?",
    "Come in can I?"
   ],
   "Можно войти",
   "Вопрос: Can + I + глагол."
  ],
  [
   "Let’s play football.",
   [
    "Lets play football.",
    "Let’s playing football."
   ],
   "Давай играть в футбол",
   "Let’s + глагол."
  ],
  [
   "Don’t run!",
   [
    "Run don’t!",
    "Don’t running!"
   ],
   "Не бегай",
   "Don’t + глагол."
  ]
 ],
 "tf": [
  [
   "«{can’t}» значит «не могу».",
   true,
   "Can’t."
  ],
  [
   "«{must}» значит «нельзя».",
   false,
   "Must — должен; mustn’t — нельзя."
  ],
  [
   "«{mustn’t}» значит «нельзя».",
   true,
   "Mustn’t."
  ],
  [
   "После «{let’s}» глагол с «-ing».",
   false,
   "Let’s + глагол без изменений."
  ],
  [
   "«{Can I}…?» значит «Можно мне…?»",
   true,
   "Can I come in?"
  ],
  [
   "«{Don’t}» — запрет.",
   true,
   "Don’t run!"
  ]
 ]
});
