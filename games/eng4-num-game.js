/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Numbers — числа до 1000». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4num",
 "theme": "orange",
 "groups": [
  {
   "k": "n1",
   "name": "Числа 1–20",
   "c": "green",
   "words": [
    [
     "one",
     "один"
    ],
    [
     "five",
     "пять"
    ],
    [
     "eight",
     "восемь"
    ],
    [
     "eleven",
     "одиннадцать"
    ],
    [
     "fourteen",
     "четырнадцать"
    ],
    [
     "nineteen",
     "девятнадцать"
    ]
   ]
  },
  {
   "k": "n2",
   "name": "Десятки и сотни",
   "c": "orange",
   "words": [
    [
     "twenty",
     "двадцать"
    ],
    [
     "thirty",
     "тридцать"
    ],
    [
     "fifty",
     "пятьдесят"
    ],
    [
     "seventy",
     "семьдесят"
    ],
    [
     "a hundred",
     "сто"
    ],
    [
     "a thousand",
     "тысяча"
    ]
   ]
  },
  {
   "k": "ord",
   "name": "Порядковые числа",
   "c": "blue",
   "words": [
    [
     "first",
     "первый"
    ],
    [
     "second",
     "второй"
    ],
    [
     "third",
     "третий"
    ],
    [
     "fourth",
     "четвёртый"
    ],
    [
     "fifth",
     "пятый"
    ],
    [
     "tenth",
     "десятый"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "first",
   "первый",
   "last",
   "последний"
  ],
  [
   "many",
   "много",
   "few",
   "мало"
  ],
  [
   "more",
   "больше",
   "less",
   "меньше"
  ],
  [
   "up",
   "вверх",
   "down",
   "вниз"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Первый урок.",
   "pre": "The ",
   "right": "first",
   "wrong": [
    "one",
    "third"
   ],
   "post": " lesson.",
   "ru": "Первый урок",
   "hint": "First — первый."
  },
  {
   "lv": 1,
   "q": "Двадцать детей.",
   "pre": "",
   "right": "Twenty",
   "wrong": [
    "Twelve",
    "Two"
   ],
   "post": " children.",
   "ru": "Двадцать детей",
   "hint": "Twenty — 20, twelve — 12."
  },
  {
   "lv": 1,
   "q": "Третье место.",
   "pre": "The ",
   "right": "third",
   "wrong": [
    "three",
    "thirty"
   ],
   "post": " place.",
   "ru": "Третье место",
   "hint": "Third — третий, three — три."
  },
  {
   "lv": 2,
   "q": "Мне тринадцать.",
   "pre": "I am ",
   "right": "thirteen",
   "wrong": [
    "thirty",
    "three"
   ],
   "post": ".",
   "ru": "Мне тринадцать",
   "hint": "Thirteen — 13, thirty — 30."
  },
  {
   "lv": 2,
   "q": "Сто учеников.",
   "pre": "A ",
   "right": "hundred",
   "wrong": [
    "thousand",
    "tenth"
   ],
   "post": " pupils.",
   "ru": "Сто учеников",
   "hint": "A hundred — 100."
  },
  {
   "lv": 2,
   "q": "Пятое марта.",
   "pre": "The ",
   "right": "fifth",
   "wrong": [
    "five",
    "fifty"
   ],
   "post": " of March.",
   "ru": "Пятое марта",
   "hint": "Fifth — пятый, five — пять."
  },
  {
   "lv": 3,
   "q": "В классе двенадцать детей.",
   "pre": "There are ",
   "right": "twelve",
   "wrong": [
    "twenty",
    "two"
   ],
   "post": " children in class.",
   "ru": "В классе двенадцать детей",
   "hint": "Twelve — 12."
  },
  {
   "lv": 3,
   "q": "Это моё девятое место.",
   "pre": "This is my ",
   "right": "ninth",
   "wrong": [
    "nine",
    "ninety"
   ],
   "post": " place.",
   "ru": "Это моё девятое место",
   "hint": "Ninth — девятый."
  },
  {
   "lv": 3,
   "q": "Тысяча лет.",
   "pre": "A ",
   "right": "thousand",
   "wrong": [
    "hundred",
    "tenth"
   ],
   "post": " years.",
   "ru": "Тысяча лет",
   "hint": "A thousand — 1000."
  }
 ],
 "sound": [
  [
   "twelve",
   "двенадцать",
   "w",
   [
    "v",
    "u"
   ],
   1,
   1
  ],
  [
   "fifty",
   "пятьдесят",
   "f",
   [
    "v",
    "t"
   ],
   0,
   1
  ],
  [
   "hundred",
   "сто",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "second",
   "второй",
   "e",
   [
    "a",
    "i"
   ],
   1,
   1
  ],
  [
   "third",
   "третий",
   "i",
   [
    "e",
    "o"
   ],
   2,
   1
  ],
  [
   "eleven",
   "одиннадцать",
   "v",
   [
    "w",
    "b"
   ],
   3,
   2
  ],
  [
   "thousand",
   "тысяча",
   "s",
   [
    "z",
    "c"
   ],
   4,
   2
  ],
  [
   "seventy",
   "семьдесят",
   "v",
   [
    "w",
    "b"
   ],
   2,
   2
  ],
  [
   "thirteen",
   "тринадцать",
   "r",
   [
    "l",
    "n"
   ],
   3,
   3
  ],
  [
   "eighth",
   "восьмой",
   "g",
   [
    "q",
    "j"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "Twenty children.",
   [
    "Children twenty.",
    "Twenty are children."
   ],
   "Двадцать детей",
   "Сначала число, потом предмет."
  ],
  [
   "This is my first lesson.",
   [
    "This is first my lesson.",
    "My this first is lesson."
   ],
   "Это мой первый урок",
   "My first + что."
  ],
  [
   "I am ten years old.",
   [
    "I ten am years old.",
    "Am I ten years old."
   ],
   "Мне десять лет",
   "I am + число + years old."
  ],
  [
   "There are fifty pupils.",
   [
    "There fifty are pupils.",
    "Are there fifty pupils."
   ],
   "Пятьдесят учеников",
   "There are + число + кто."
  ]
 ],
 "tf": [
  [
   "«{first}» — это «первый».",
   true,
   "First — первый."
  ],
  [
   "«{thirteen}» — это 30.",
   false,
   "Thirteen — 13, thirty — 30."
  ],
  [
   "«{a hundred}» — это 100.",
   true,
   "A hundred — 100."
  ],
  [
   "«{a thousand}» — это 100.",
   false,
   "A thousand — 1000."
  ],
  [
   "«{third}» — это «третий».",
   true,
   "Third — третий."
  ],
  [
   "«{fifty}» — это 15.",
   false,
   "Fifty — 50, fifteen — 15."
  ]
 ]
});
