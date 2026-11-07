/* Английский язык, 2 класс — «Numbers 1–50 — числа до 50». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2numbers",
 "theme": "meadow",
 "groups": [
  {
   "k": "teen",
   "name": "От 11 до 19",
   "c": "green",
   "words": [
    [
     "eleven",
     "11"
    ],
    [
     "twelve",
     "12"
    ],
    [
     "thirteen",
     "13"
    ],
    [
     "fourteen",
     "14"
    ],
    [
     "fifteen",
     "15"
    ],
    [
     "sixteen",
     "16"
    ],
    [
     "seventeen",
     "17"
    ],
    [
     "eighteen",
     "18"
    ],
    [
     "nineteen",
     "19"
    ]
   ]
  },
  {
   "k": "tens",
   "name": "Десятки",
   "c": "orange",
   "words": [
    [
     "ten",
     "10"
    ],
    [
     "twenty",
     "20"
    ],
    [
     "thirty",
     "30"
    ],
    [
     "forty",
     "40"
    ],
    [
     "fifty",
     "50"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "10 + 1 =",
   "pre": "",
   "right": "eleven",
   "wrong": [
    "twelve",
    "ten"
   ],
   "post": ".",
   "ru": "Одиннадцать.",
   "hint": "Eleven — 11."
  },
  {
   "lv": 1,
   "q": "10 + 10 =",
   "pre": "",
   "right": "twenty",
   "wrong": [
    "twelve",
    "thirty"
   ],
   "post": ".",
   "ru": "Двадцать.",
   "hint": "Twenty — 20."
  },
  {
   "lv": 1,
   "q": "20 + 10 =",
   "pre": "",
   "right": "thirty",
   "wrong": [
    "thirteen",
    "forty"
   ],
   "post": ".",
   "ru": "Тридцать.",
   "hint": "Thirty — 30."
  },
  {
   "lv": 2,
   "q": "30 + 10 =",
   "pre": "",
   "right": "forty",
   "wrong": [
    "fourteen",
    "fifty"
   ],
   "post": ".",
   "ru": "Сорок.",
   "hint": "Forty — 40."
  },
  {
   "lv": 2,
   "q": "40 + 10 =",
   "pre": "",
   "right": "fifty",
   "wrong": [
    "fifteen",
    "forty"
   ],
   "post": ".",
   "ru": "Пятьдесят.",
   "hint": "Fifty — 50."
  },
  {
   "lv": 2,
   "q": "20 + 1 =",
   "pre": "twenty-",
   "right": "one",
   "wrong": [
    "two",
    "ten"
   ],
   "post": ".",
   "ru": "Двадцать один.",
   "hint": "Между десятками и единицами ставим дефис: twenty-one."
  },
  {
   "lv": 3,
   "q": "30 + 5 =",
   "pre": "thirty-",
   "right": "five",
   "wrong": [
    "fifty",
    "fifteen"
   ],
   "post": ".",
   "ru": "Тридцать пять.",
   "hint": "Thirty-five — 35."
  },
  {
   "lv": 3,
   "q": "Сколько тебе лет?",
   "pre": "How ",
   "right": "old",
   "wrong": [
    "big",
    "many"
   ],
   "post": " are you?",
   "ru": "Сколько тебе лет?",
   "hint": "How old — сколько лет."
  }
 ],
 "sound": [
  [
   "eleven",
   "одиннадцать",
   "v",
   [
    "l",
    "n"
   ],
   3,
   1
  ],
  [
   "twelve",
   "двенадцать",
   "w",
   [
    "v",
    "l"
   ],
   1,
   1
  ],
  [
   "twenty",
   "двадцать",
   "e",
   [
    "a",
    "o"
   ],
   2,
   2
  ],
  [
   "fifty",
   "пятьдесят",
   "f",
   [
    "t",
    "v"
   ],
   0,
   2
  ]
 ],
 "order": [
  [
   "I'm nine.",
   [
    "Nine I'm.",
    "I nine'm."
   ],
   "Мне девять.",
   "Сначала I'm, потом число."
  ],
  [
   "How old are you?",
   [
    "Old how are you?",
    "How are old you?"
   ],
   "Сколько тебе лет?",
   "Сначала How old, потом are you."
  ]
 ],
 "tf": [
  [
   "«{twenty}» — это 20.",
   true,
   "Twenty — 20."
  ],
  [
   "«{forty}» — это 14.",
   false,
   "Forty — 40, а 14 — fourteen."
  ],
  [
   "«{fifty}» — это 50.",
   true,
   "Fifty — 50."
  ],
  [
   "«{thirteen}» — это 30.",
   false,
   "Thirteen — 13, а 30 — thirty."
  ]
 ]
});
