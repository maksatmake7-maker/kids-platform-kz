/* Английский язык, 2 класс — «Commands — команды». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2cmd",
 "theme": "garden",
 "groups": [
  {
   "k": "act",
   "name": "Движения",
   "c": "green",
   "words": [
    [
     "stand up",
     "встань"
    ],
    [
     "sit down",
     "сядь"
    ],
    [
     "walk",
     "иди, ходи"
    ],
    [
     "jump",
     "прыгай"
    ],
    [
     "clap",
     "хлопай"
    ]
   ]
  },
  {
   "k": "cls",
   "name": "На уроке",
   "c": "orange",
   "words": [
    [
     "open your book",
     "открой книгу"
    ],
    [
     "close your book",
     "закрой книгу"
    ],
    [
     "listen",
     "слушай"
    ],
    [
     "look",
     "смотри"
    ],
    [
     "draw",
     "рисуй"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "stand up",
   "встань",
   "sit down",
   "сядь"
  ],
  [
   "open",
   "открой",
   "close",
   "закрой"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Встань!",
   "pre": "Stand ",
   "right": "up",
   "wrong": [
    "down",
    "book"
   ],
   "post": "!",
   "ru": "Встань!",
   "hint": "Stand up — встань."
  },
  {
   "lv": 1,
   "q": "Сядь!",
   "pre": "Sit ",
   "right": "down",
   "wrong": [
    "up",
    "open"
   ],
   "post": "!",
   "ru": "Сядь!",
   "hint": "Sit down — сядь."
  },
  {
   "lv": 1,
   "q": "Открой свою книгу.",
   "pre": "",
   "right": "Open",
   "wrong": [
    "Close",
    "Sit"
   ],
   "post": " your book.",
   "ru": "Открой свою книгу.",
   "hint": "Open — открой."
  },
  {
   "lv": 1,
   "q": "Закрой свою книгу.",
   "pre": "",
   "right": "Close",
   "wrong": [
    "Open",
    "Stand"
   ],
   "post": " your book.",
   "ru": "Закрой свою книгу.",
   "hint": "Close — закрой."
  },
  {
   "lv": 2,
   "q": "Иди!",
   "pre": "",
   "right": "Walk",
   "wrong": [
    "Jump",
    "Sit"
   ],
   "post": "!",
   "ru": "Иди!",
   "hint": "Walk — идти, ходить."
  },
  {
   "lv": 2,
   "q": "Прыгай!",
   "pre": "",
   "right": "Jump",
   "wrong": [
    "Walk",
    "Clap"
   ],
   "post": "!",
   "ru": "Прыгай!",
   "hint": "Jump — прыгать."
  },
  {
   "lv": 3,
   "q": "Открой свои книги.",
   "pre": "Open your ",
   "right": "books",
   "wrong": [
    "book",
    "pen"
   ],
   "post": ".",
   "ru": "Открой свои книги.",
   "hint": "Если книг много, говорим books."
  },
  {
   "lv": 3,
   "q": "Хлопай в ладоши.",
   "pre": "",
   "right": "Clap",
   "wrong": [
    "Claps",
    "Clapping"
   ],
   "post": " your hands.",
   "ru": "Хлопай в ладоши.",
   "hint": "В команде глагол стоит в начале без изменений."
  }
 ],
 "sound": [
  [
   "stand",
   "вставать",
   "a",
   [
    "o",
    "e"
   ],
   2,
   1
  ],
  [
   "open",
   "открыть",
   "e",
   [
    "a",
    "i"
   ],
   2,
   1
  ],
  [
   "jump",
   "прыгать",
   "u",
   [
    "a",
    "o"
   ],
   1,
   2
  ],
  [
   "clap",
   "хлопать",
   "a",
   [
    "o",
    "e"
   ],
   2,
   2
  ]
 ],
 "order": [
  [
   "Stand up, please.",
   [
    "Up stand, please.",
    "Please up stand."
   ],
   "Встань, пожалуйста.",
   "Сначала глагол Stand, потом up."
  ],
  [
   "Open your books.",
   [
    "Your open books.",
    "Books open your."
   ],
   "Откройте книги.",
   "Сначала глагол Open, потом your books."
  ]
 ],
 "tf": [
  [
   "«{Stand up}» значит «сядь».",
   false,
   "Stand up — встань. А «сядь» — sit down."
  ],
  [
   "«{Sit down}» значит «сядь».",
   true,
   "Sit down — сядь."
  ],
  [
   "«{Close your book}» значит «закрой книгу».",
   true,
   "Close — закрой."
  ],
  [
   "Команда «{Jump}» — это «прыгай».",
   true,
   "Jump — прыгать."
  ]
 ]
});
