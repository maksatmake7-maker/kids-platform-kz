/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Questions — вопросы». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4wh",
 "theme": "orange",
 "groups": [
  {
   "k": "who",
   "name": "Кто, что, где",
   "c": "green",
   "words": [
    [
     "who",
     "кто"
    ],
    [
     "what",
     "что"
    ],
    [
     "where",
     "где"
    ],
    [
     "when",
     "когда"
    ],
    [
     "why",
     "почему"
    ],
    [
     "how",
     "как"
    ]
   ]
  },
  {
   "k": "which",
   "name": "Какой, чей, сколько",
   "c": "orange",
   "words": [
    [
     "which",
     "какой, который"
    ],
    [
     "whose",
     "чей"
    ],
    [
     "how many",
     "сколько (много)"
    ],
    [
     "how much",
     "сколько (не считается)"
    ],
    [
     "how old",
     "сколько лет"
    ],
    [
     "how long",
     "как долго"
    ]
   ]
  },
  {
   "k": "ans",
   "name": "Ответы",
   "c": "blue",
   "words": [
    [
     "yes, I do",
     "да"
    ],
    [
     "no, I don’t",
     "нет"
    ],
    [
     "at school",
     "в школе"
    ],
    [
     "on Monday",
     "в понедельник"
    ],
    [
     "five",
     "пять"
    ],
    [
     "my brother",
     "мой брат"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "who",
   "кто",
   "what",
   "что"
  ],
  [
   "where",
   "где",
   "when",
   "когда"
  ],
  [
   "whose",
   "чей",
   "which",
   "какой"
  ],
  [
   "how many",
   "сколько",
   "how old",
   "сколько лет"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Кто это?",
   "pre": "",
   "right": "Who",
   "wrong": [
    "What",
    "Where"
   ],
   "post": " is this?",
   "ru": "Кто это",
   "hint": "Who — про людей."
  },
  {
   "lv": 1,
   "q": "Что это?",
   "pre": "",
   "right": "What",
   "wrong": [
    "Who",
    "Where"
   ],
   "post": " is this?",
   "ru": "Что это",
   "hint": "What — про предметы."
  },
  {
   "lv": 1,
   "q": "Где мой портфель?",
   "pre": "",
   "right": "Where",
   "wrong": [
    "Who",
    "Whose"
   ],
   "post": " is my bag?",
   "ru": "Где мой портфель",
   "hint": "Where — где."
  },
  {
   "lv": 2,
   "q": "Чья это ручка?",
   "pre": "",
   "right": "Whose",
   "wrong": [
    "Who",
    "Which"
   ],
   "post": " pen is this?",
   "ru": "Чья это ручка",
   "hint": "Whose — чей."
  },
  {
   "lv": 2,
   "q": "Сколько здесь книг?",
   "pre": "How ",
   "right": "many",
   "wrong": [
    "much",
    "old"
   ],
   "post": " books are there?",
   "ru": "Сколько здесь книг",
   "hint": "Книги можно посчитать — how many."
  },
  {
   "lv": 2,
   "q": "Сколько тебе лет?",
   "pre": "How ",
   "right": "old",
   "wrong": [
    "many",
    "long"
   ],
   "post": " are you?",
   "ru": "Сколько тебе лет",
   "hint": "How old — сколько лет."
  },
  {
   "lv": 2,
   "q": "Какой цвет тебе нравится?",
   "pre": "",
   "right": "Which",
   "wrong": [
    "Who",
    "Where"
   ],
   "post": " colour do you like?",
   "ru": "Какой цвет тебе нравится",
   "hint": "Which — какой из нескольких."
  },
  {
   "lv": 3,
   "q": "Когда у тебя урок английского?",
   "pre": "",
   "right": "When",
   "wrong": [
    "Where",
    "Why"
   ],
   "post": " is your English lesson?",
   "ru": "Когда у тебя урок английского",
   "hint": "When — когда."
  },
  {
   "lv": 3,
   "q": "Почему ты грустный?",
   "pre": "",
   "right": "Why",
   "wrong": [
    "Where",
    "Who"
   ],
   "post": " are you sad?",
   "ru": "Почему ты грустный",
   "hint": "Why — почему."
  },
  {
   "lv": 3,
   "q": "Как тебя зовут?",
   "pre": "",
   "right": "What’s",
   "wrong": [
    "Who’s",
    "Where’s"
   ],
   "post": " your name?",
   "ru": "Как тебя зовут",
   "hint": "What’s your name? — как тебя зовут."
  }
 ],
 "sound": [
  [
   "where",
   "где",
   "h",
   [
    "w",
    "r"
   ],
   1,
   1
  ],
  [
   "what",
   "что",
   "h",
   [
    "w",
    "t"
   ],
   1,
   1
  ],
  [
   "whose",
   "чей",
   "o",
   [
    "a",
    "u"
   ],
   2,
   1
  ],
  [
   "which",
   "какой",
   "c",
   [
    "k",
    "s"
   ],
   3,
   2
  ],
  [
   "many",
   "много",
   "a",
   [
    "e",
    "o"
   ],
   1,
   2
  ],
  [
   "when",
   "когда",
   "e",
   [
    "a",
    "o"
   ],
   2,
   2
  ],
  [
   "how",
   "как",
   "o",
   [
    "a",
    "u"
   ],
   1,
   3
  ],
  [
   "why",
   "почему",
   "h",
   [
    "w",
    "n"
   ],
   1,
   3
  ]
 ],
 "order": [
  [
   "Where is my bag?",
   [
    "Where my bag is?",
    "My bag where is?"
   ],
   "Где мой портфель",
   "Where + is + что."
  ],
  [
   "How many books are there?",
   [
    "How many are books there?",
    "How books many are there?"
   ],
   "Сколько книг",
   "How many + что + are there."
  ],
  [
   "Whose pen is this?",
   [
    "Whose is pen this?",
    "Pen whose is this?"
   ],
   "Чья это ручка",
   "Whose + что + is this."
  ],
  [
   "What is your name?",
   [
    "What your name is?",
    "Your name what is?"
   ],
   "Как тебя зовут",
   "What is + что."
  ]
 ],
 "tf": [
  [
   "«{Who}» — это «кто».",
   true,
   "Who — кто."
  ],
  [
   "«{Where}» — это «когда».",
   false,
   "Where — где; when — когда."
  ],
  [
   "«{How many}» — про то, что можно посчитать.",
   true,
   "How many books?"
  ],
  [
   "«{Whose}» — это «чей».",
   true,
   "Whose pen?"
  ],
  [
   "«{Why}» — это «как».",
   false,
   "Why — почему; how — как."
  ],
  [
   "«{How old}» — «сколько лет».",
   true,
   "How old are you?"
  ]
 ]
});
