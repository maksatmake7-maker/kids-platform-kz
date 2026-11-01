/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «About me — обо мне». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3me",
 "theme": "meadow",
 "groups": [
  {
   "k": "q",
   "name": "Вопросы",
   "c": "green",
   "words": [
    [
     "What is your name?",
     "Как тебя зовут?"
    ],
    [
     "How old are you?",
     "Сколько тебе лет?"
    ],
    [
     "Where are you from?",
     "Откуда ты?"
    ],
    [
     "Who are you?",
     "Кто ты?"
    ]
   ]
  },
  {
   "k": "a",
   "name": "Ответы",
   "c": "orange",
   "words": [
    [
     "My name is Dana.",
     "Меня зовут Дана."
    ],
    [
     "I am eight.",
     "Мне восемь лет."
    ],
    [
     "I am from Kazakhstan.",
     "Я из Казахстана."
    ],
    [
     "I am a pupil.",
     "Я ученик."
    ]
   ]
  },
  {
   "k": "pr",
   "name": "Местоимения",
   "c": "blue",
   "words": [
    [
     "I",
     "я"
    ],
    [
     "you",
     "ты, вы"
    ],
    [
     "he",
     "он"
    ],
    [
     "she",
     "она"
    ],
    [
     "we",
     "мы"
    ],
    [
     "they",
     "они"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "I",
   "я",
   "you",
   "ты"
  ],
  [
   "he",
   "он",
   "she",
   "она"
  ],
  [
   "boy",
   "мальчик",
   "girl",
   "девочка"
  ],
  [
   "my",
   "мой",
   "your",
   "твой"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я Айдар.",
   "pre": "I ",
   "right": "am",
   "wrong": [
    "is",
    "are"
   ],
   "post": " Aidar.",
   "ru": "Я Айдар.",
   "hint": "С местоимением I говорим am."
  },
  {
   "lv": 1,
   "q": "Ты ученик.",
   "pre": "You ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " a pupil.",
   "ru": "Ты ученик.",
   "hint": "С местоимением you говорим are."
  },
  {
   "lv": 1,
   "q": "Он мой друг.",
   "pre": "He ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " my friend.",
   "ru": "Он мой друг.",
   "hint": "С местоимением he говорим is."
  },
  {
   "lv": 1,
   "q": "Она моя сестра.",
   "pre": "She ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " my sister.",
   "ru": "Она моя сестра.",
   "hint": "С местоимением she говорим is."
  },
  {
   "lv": 2,
   "q": "Мы из Казахстана.",
   "pre": "We ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " from Kazakhstan.",
   "ru": "Мы из Казахстана.",
   "hint": "С местоимением we говорим are."
  },
  {
   "lv": 2,
   "q": "Они мои друзья.",
   "pre": "They ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " my friends.",
   "ru": "Они мои друзья.",
   "hint": "С местоимением they говорим are."
  },
  {
   "lv": 2,
   "q": "Меня зовут Дана.",
   "pre": "My name ",
   "right": "is",
   "wrong": [
    "am",
    "are"
   ],
   "post": " Dana.",
   "ru": "Меня зовут Дана.",
   "hint": "После my name говорим is."
  },
  {
   "lv": 3,
   "q": "Откуда ты?",
   "pre": "Where ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " you from?",
   "ru": "Откуда ты?",
   "hint": "После Where с you говорим are."
  },
  {
   "lv": 3,
   "q": "Сколько тебе лет?",
   "pre": "How old ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " you?",
   "ru": "Сколько тебе лет?",
   "hint": "После How old с you говорим are."
  }
 ],
 "sound": [
  [
   "name",
   "имя",
   "a",
   [
    "e",
    "o"
   ],
   1,
   1
  ],
  [
   "from",
   "из",
   "r",
   [
    "n",
    "l"
   ],
   1,
   1
  ],
  [
   "boy",
   "мальчик",
   "o",
   [
    "a",
    "u"
   ],
   1,
   1
  ],
  [
   "girl",
   "девочка",
   "i",
   [
    "e",
    "a"
   ],
   1,
   1
  ],
  [
   "pupil",
   "ученик",
   "u",
   [
    "a",
    "o"
   ],
   1,
   2
  ],
  [
   "friend",
   "друг",
   "i",
   [
    "e",
    "a"
   ],
   2,
   2
  ],
  [
   "sister",
   "сестра",
   "s",
   [
    "z",
    "c"
   ],
   2,
   2
  ],
  [
   "Kazakhstan",
   "Казахстан",
   "h",
   [
    "k",
    "z"
   ],
   5,
   3
  ]
 ],
 "order": [
  [
   "My name is Dana.",
   [
    "Name my is Dana.",
    "Is my name Dana."
   ],
   "Меня зовут Дана.",
   "Сначала My name, потом is."
  ],
  [
   "I am from Kazakhstan.",
   [
    "I from am Kazakhstan.",
    "Am I from Kazakhstan."
   ],
   "Я из Казахстана.",
   "Сначала I am, потом from."
  ],
  [
   "She is my friend.",
   [
    "She my is friend.",
    "Is she my friend."
   ],
   "Она моя подруга.",
   "Сначала She is, потом my friend."
  ],
  [
   "What is your name?",
   [
    "Your name what is?",
    "Is what your name?"
   ],
   "Как тебя зовут?",
   "Вопрос начинается с What is."
  ]
 ],
 "tf": [
  [
   "С «{I}» мы говорим «{am}».",
   true,
   "I am."
  ],
  [
   "С «{he}» мы говорим «{are}».",
   false,
   "He is."
  ],
  [
   "«{She}» значит «она».",
   true,
   "She — она."
  ],
  [
   "«{They}» значит «мы».",
   false,
   "They — они, we — мы."
  ],
  [
   "«{My name is Dana}» значит «Мне девять лет».",
   false,
   "Это значит: Меня зовут Дана."
  ],
  [
   "«{We are}» говорим про себя и друзей.",
   true,
   "We are — мы..."
  ]
 ]
});
