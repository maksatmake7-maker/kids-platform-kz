/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Right now — что делаю сейчас». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4cont",
 "theme": "sky",
 "groups": [
  {
   "k": "act",
   "name": "Что делаю",
   "c": "green",
   "words": [
    [
     "reading",
     "читаю"
    ],
    [
     "writing",
     "пишу"
    ],
    [
     "running",
     "бегу"
    ],
    [
     "jumping",
     "прыгаю"
    ],
    [
     "eating",
     "ем"
    ],
    [
     "sleeping",
     "сплю"
    ]
   ]
  },
  {
   "k": "now",
   "name": "Сейчас",
   "c": "orange",
   "words": [
    [
     "now",
     "сейчас"
    ],
    [
     "right now",
     "прямо сейчас"
    ],
    [
     "at the moment",
     "в данный момент"
    ],
    [
     "today",
     "сегодня"
    ],
    [
     "look",
     "смотри"
    ],
    [
     "listen",
     "слушай"
    ]
   ]
  },
  {
   "k": "place",
   "name": "Где это",
   "c": "blue",
   "words": [
    [
     "in the garden",
     "в саду"
    ],
    [
     "in the kitchen",
     "на кухне"
    ],
    [
     "in the street",
     "на улице"
    ],
    [
     "at the lesson",
     "на уроке"
    ],
    [
     "on the bus",
     "в автобусе"
    ],
    [
     "in the park",
     "в парке"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "run",
   "бегать",
   "running",
   "бегу"
  ],
  [
   "write",
   "писать",
   "writing",
   "пишу"
  ],
  [
   "sit",
   "сидеть",
   "sitting",
   "сижу"
  ],
  [
   "play",
   "играть",
   "playing",
   "играю"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я читаю сейчас.",
   "pre": "I am ",
   "right": "reading",
   "wrong": [
    "read",
    "reads"
   ],
   "post": " now.",
   "ru": "Я читаю сейчас",
   "hint": "Am + глагол с -ing."
  },
  {
   "lv": 1,
   "q": "Она бежит.",
   "pre": "She is ",
   "right": "running",
   "wrong": [
    "run",
    "runs"
   ],
   "post": ".",
   "ru": "Она бежит",
   "hint": "Is + глагол с -ing."
  },
  {
   "lv": 1,
   "q": "Они играют.",
   "pre": "They are ",
   "right": "playing",
   "wrong": [
    "play",
    "plays"
   ],
   "post": ".",
   "ru": "Они играют",
   "hint": "Are + глагол с -ing."
  },
  {
   "lv": 2,
   "q": "Он пишет письмо.",
   "pre": "He is ",
   "right": "writing",
   "wrong": [
    "write",
    "writeing"
   ],
   "post": " a letter.",
   "ru": "Он пишет письмо",
   "hint": "Write → writing (e пропадает)."
  },
  {
   "lv": 2,
   "q": "Мы едим.",
   "pre": "We are ",
   "right": "eating",
   "wrong": [
    "eat",
    "eats"
   ],
   "post": ".",
   "ru": "Мы едим",
   "hint": "Are + глагол с -ing."
  },
  {
   "lv": 2,
   "q": "Что ты делаешь?",
   "pre": "What are you ",
   "right": "doing",
   "wrong": [
    "do",
    "does"
   ],
   "post": "?",
   "ru": "Что ты делаешь",
   "hint": "Are you + глагол с -ing."
  },
  {
   "lv": 3,
   "q": "Кот спит.",
   "pre": "The cat ",
   "right": "is sleeping",
   "wrong": [
    "sleeping",
    "are sleeping"
   ],
   "post": ".",
   "ru": "Кот спит",
   "hint": "Is + sleeping."
  },
  {
   "lv": 3,
   "q": "Дети не бегут.",
   "pre": "The children ",
   "right": "aren’t running",
   "wrong": [
    "isn’t running",
    "don’t run"
   ],
   "post": ".",
   "ru": "Дети не бегут",
   "hint": "Отрицание: aren’t + глагол с -ing."
  },
  {
   "lv": 3,
   "q": "Она сидит?",
   "pre": "",
   "right": "Is",
   "wrong": [
    "Are",
    "Does"
   ],
   "post": " she sitting?",
   "ru": "Она сидит",
   "hint": "Вопрос: Is she sitting?"
  }
 ],
 "sound": [
  [
   "reading",
   "читаю",
   "d",
   [
    "t",
    "b"
   ],
   3,
   1
  ],
  [
   "writing",
   "пишу",
   "r",
   [
    "l",
    "n"
   ],
   1,
   1
  ],
  [
   "running",
   "бегу",
   "n",
   [
    "m",
    "l"
   ],
   2,
   1
  ],
  [
   "eating",
   "ем",
   "t",
   [
    "d",
    "l"
   ],
   2,
   1
  ],
  [
   "sleeping",
   "сплю",
   "l",
   [
    "r",
    "n"
   ],
   1,
   2
  ],
  [
   "sitting",
   "сижу",
   "t",
   [
    "d",
    "l"
   ],
   3,
   2
  ],
  [
   "jumping",
   "прыгаю",
   "m",
   [
    "n",
    "w"
   ],
   2,
   2
  ],
  [
   "swimming",
   "плыву",
   "w",
   [
    "v",
    "u"
   ],
   1,
   3
  ],
  [
   "listening",
   "слушаю",
   "s",
   [
    "z",
    "c"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "I am reading a book.",
   [
    "I reading am a book.",
    "Am I reading a book."
   ],
   "Я читаю книгу",
   "I am + глагол с -ing."
  ],
  [
   "She is running.",
   [
    "She running is.",
    "Is she running."
   ],
   "Она бежит",
   "She is + глагол с -ing."
  ],
  [
   "What are you doing?",
   [
    "What you are doing?",
    "What are doing you?"
   ],
   "Что ты делаешь",
   "What + are + you + doing."
  ],
  [
   "They are playing.",
   [
    "They playing are.",
    "Playing they are."
   ],
   "Они играют",
   "They are + глагол с -ing."
  ]
 ],
 "tf": [
  [
   "Present continuous: «I {am} reading».",
   true,
   "Am + глагол с -ing."
  ],
  [
   "С «she» говорим «She {am} running».",
   false,
   "She is running."
  ],
  [
   "«{now}» значит «сейчас».",
   true,
   "Now."
  ],
  [
   "«{write}» → «{writing}».",
   true,
   "Пишем -ing без e."
  ],
  [
   "«{running}» — это «бегать».",
   false,
   "Running — бегу, бегущий."
  ],
  [
   "Вопрос: «{Is} she sitting?»",
   true,
   "Is + she + sitting."
  ]
 ]
});
