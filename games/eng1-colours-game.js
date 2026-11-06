/* Английский язык, 1 класс (пререквизит A1: слова и фразы по темам программы). Барсик объясняет по-русски, английские слова звучат английским голосом (в казахском отделении звук выключен). Тексты проверяет Максат. */
ENG3.define({
 "key": "eng1colours",
 "theme": "meadow",
 "groups": [
  {
   "k": "main",
   "name": "Цвета радуги",
   "c": "orange",
   "words": [
    [
     "red",
     "красный"
    ],
    [
     "yellow",
     "жёлтый"
    ],
    [
     "green",
     "зелёный"
    ],
    [
     "blue",
     "голубой"
    ],
    [
     "orange",
     "оранжевый"
    ],
    [
     "purple",
     "фиолетовый"
    ]
   ]
  },
  {
   "k": "other",
   "name": "Другие цвета",
   "c": "blue",
   "words": [
    [
     "black",
     "чёрный"
    ],
    [
     "brown",
     "коричневый"
    ],
    [
     "white",
     "белый"
    ],
    [
     "pink",
     "розовый"
    ]
   ]
  }
 ],
 "pairs": [],
 "fills": [
  {
   "lv": 1,
   "q": "Какого цвета эта вещь? Она красная.",
   "pre": "It's ",
   "right": "red",
   "wrong": [
    "blue",
    "green"
   ],
   "post": ".",
   "ru": "Она красная.",
   "hint": "Red — красный."
  },
  {
   "lv": 1,
   "q": "Она голубая.",
   "pre": "It's ",
   "right": "blue",
   "wrong": [
    "red",
    "yellow"
   ],
   "post": ".",
   "ru": "Она голубая.",
   "hint": "Blue — голубой, синий."
  },
  {
   "lv": 1,
   "q": "Она жёлтая.",
   "pre": "It's ",
   "right": "yellow",
   "wrong": [
    "green",
    "black"
   ],
   "post": ".",
   "ru": "Она жёлтая.",
   "hint": "Yellow — жёлтый."
  },
  {
   "lv": 2,
   "q": "Какого цвета портфель? Он голубой.",
   "pre": "It's a ",
   "right": "blue",
   "wrong": [
    "brown",
    "pink"
   ],
   "post": " schoolbag.",
   "ru": "Это голубой портфель.",
   "hint": "Цвет стоит перед словом: blue schoolbag."
  },
  {
   "lv": 2,
   "q": "Какого цвета эта вещь?",
   "pre": "What ",
   "right": "colour",
   "wrong": [
    "book",
    "name"
   ],
   "post": " is it?",
   "ru": "Какого она цвета?",
   "hint": "Colour — цвет."
  },
  {
   "lv": 3,
   "q": "Какого цвета эта вещь?",
   "pre": "What colour ",
   "right": "is",
   "wrong": [
    "am",
    "are"
   ],
   "post": " it?",
   "ru": "Какого она цвета?",
   "hint": "С it говорим is."
  }
 ],
 "sound": [
  [
   "red",
   "красный",
   "e",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "pink",
   "розовый",
   "i",
   [
    "a",
    "o"
   ],
   1,
   2
  ],
  [
   "black",
   "чёрный",
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
   "What colour is it?",
   [
    "Colour what is it?",
    "What is it colour?"
   ],
   "Какого цвета эта вещь?",
   "Сначала What colour, потом is it."
  ],
  [
   "It's a blue schoolbag.",
   [
    "It's blue a schoolbag.",
    "A it's schoolbag blue."
   ],
   "Это голубой портфель.",
   "Цвет стоит перед словом schoolbag."
  ]
 ],
 "tf": [
  [
   "«{red}» — это «красный».",
   true,
   "Red — красный."
  ],
  [
   "«{green}» — это «жёлтый».",
   false,
   "Green — зелёный."
  ],
  [
   "«{purple}» — это «фиолетовый».",
   true,
   "Purple — фиолетовый."
  ],
  [
   "Цвета радуги: {red}, {yellow}, {green}.",
   true,
   "Это цвета радуги."
  ],
  [
   "«{white}» — это «чёрный».",
   false,
   "White — белый, а black — чёрный."
  ]
 ]
});
