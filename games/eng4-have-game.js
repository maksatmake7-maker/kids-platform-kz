/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «I have got, there is». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4have",
 "theme": "meadow",
 "groups": [
  {
   "k": "pets",
   "name": "Домашние животные",
   "c": "green",
   "words": [
    [
     "dog",
     "собака"
    ],
    [
     "cat",
     "кошка"
    ],
    [
     "rabbit",
     "кролик"
    ],
    [
     "hamster",
     "хомяк"
    ],
    [
     "parrot",
     "попугай"
    ],
    [
     "fish",
     "рыбка"
    ]
   ]
  },
  {
   "k": "room",
   "name": "В комнате",
   "c": "orange",
   "words": [
    [
     "bed",
     "кровать"
    ],
    [
     "table",
     "стол"
    ],
    [
     "lamp",
     "лампа"
    ],
    [
     "sofa",
     "диван"
    ],
    [
     "carpet",
     "ковёр"
    ],
    [
     "window",
     "окно"
    ]
   ]
  },
  {
   "k": "school",
   "name": "В школе",
   "c": "blue",
   "words": [
    [
     "library",
     "библиотека"
    ],
    [
     "gym",
     "спортзал"
    ],
    [
     "canteen",
     "столовая"
    ],
    [
     "desk",
     "парта"
    ],
    [
     "board",
     "доска"
    ],
    [
     "playground",
     "площадка"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "have",
   "иметь",
   "has",
   "иметь (он, она)"
  ],
  [
   "is",
   "есть (один)",
   "are",
   "есть (много)"
  ],
  [
   "some",
   "несколько",
   "any",
   "какие-нибудь"
  ],
  [
   "yes",
   "да",
   "no",
   "нет"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "У меня есть собака.",
   "pre": "I ",
   "right": "have got",
   "wrong": [
    "has got",
    "is got"
   ],
   "post": " a dog.",
   "ru": "У меня есть собака",
   "hint": "С I говорим have got."
  },
  {
   "lv": 1,
   "q": "У неё есть кошка.",
   "pre": "She ",
   "right": "has got",
   "wrong": [
    "have got",
    "is got"
   ],
   "post": " a cat.",
   "ru": "У неё есть кошка",
   "hint": "С he, she, it говорим has got."
  },
  {
   "lv": 1,
   "q": "В комнате одна лампа.",
   "pre": "There ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " a lamp in the room.",
   "ru": "В комнате лампа",
   "hint": "Один предмет — there is."
  },
  {
   "lv": 2,
   "q": "В классе много парт.",
   "pre": "There ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " many desks in the class.",
   "ru": "В классе много парт",
   "hint": "Много предметов — there are."
  },
  {
   "lv": 2,
   "q": "У нас нет кролика.",
   "pre": "We ",
   "right": "haven’t got",
   "wrong": [
    "hasn’t got",
    "aren’t got"
   ],
   "post": " a rabbit.",
   "ru": "У нас нет кролика",
   "hint": "Отрицание: haven’t got."
  },
  {
   "lv": 2,
   "q": "У тебя есть хомяк?",
   "pre": "",
   "right": "Have",
   "wrong": [
    "Has",
    "Are"
   ],
   "post": " you got a hamster?",
   "ru": "У тебя есть хомяк",
   "hint": "Вопрос: Have + you + got?"
  },
  {
   "lv": 3,
   "q": "У него есть попугай?",
   "pre": "",
   "right": "Has",
   "wrong": [
    "Have",
    "Is"
   ],
   "post": " he got a parrot?",
   "ru": "У него есть попугай",
   "hint": "С he говорим Has he got?"
  },
  {
   "lv": 3,
   "q": "В библиотеке нет окон.",
   "pre": "There ",
   "right": "aren’t",
   "wrong": [
    "isn’t",
    "haven’t"
   ],
   "post": " any windows in the library.",
   "ru": "В библиотеке нет окон",
   "hint": "Отрицание со многими: there aren’t."
  },
  {
   "lv": 3,
   "q": "Есть ли в классе доска?",
   "pre": "",
   "right": "Is",
   "wrong": [
    "Are",
    "Has"
   ],
   "post": " there a board in the class?",
   "ru": "В классе есть доска",
   "hint": "Вопрос с одним предметом: Is there…?"
  }
 ],
 "sound": [
  [
   "rabbit",
   "кролик",
   "b",
   [
    "d",
    "p"
   ],
   2,
   1
  ],
  [
   "hamster",
   "хомяк",
   "m",
   [
    "n",
    "w"
   ],
   2,
   1
  ],
  [
   "parrot",
   "попугай",
   "r",
   [
    "l",
    "n"
   ],
   3,
   1
  ],
  [
   "carpet",
   "ковёр",
   "r",
   [
    "l",
    "n"
   ],
   2,
   1
  ],
  [
   "window",
   "окно",
   "d",
   [
    "b",
    "t"
   ],
   3,
   2
  ],
  [
   "library",
   "библиотека",
   "b",
   [
    "d",
    "p"
   ],
   2,
   2
  ],
  [
   "canteen",
   "столовая",
   "t",
   [
    "d",
    "l"
   ],
   3,
   2
  ],
  [
   "playground",
   "площадка",
   "y",
   [
    "g",
    "j"
   ],
   3,
   3
  ],
  [
   "sofa",
   "диван",
   "f",
   [
    "v",
    "t"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "I have got a dog.",
   [
    "I got have a dog.",
    "Have I got a dog."
   ],
   "У меня есть собака",
   "I have got + что."
  ],
  [
   "There is a lamp in the room.",
   [
    "There a lamp is in the room.",
    "Is there a lamp in the room."
   ],
   "В комнате есть лампа",
   "There is + предмет + место."
  ],
  [
   "Has she got a cat?",
   [
    "She has got a cat?",
    "Got she has a cat?"
   ],
   "У неё есть кошка",
   "Вопрос: Has + she + got."
  ],
  [
   "There are two windows.",
   [
    "There two are windows.",
    "Are there two windows."
   ],
   "Здесь два окна",
   "There are + число + что."
  ]
 ],
 "tf": [
  [
   "С «I» говорим «{have got}».",
   true,
   "I have got."
  ],
  [
   "С «she» говорим «{have got}».",
   false,
   "She has got."
  ],
  [
   "«{There is}» — для одного предмета.",
   true,
   "There is a book."
  ],
  [
   "«{There is}» — для многих предметов.",
   false,
   "There are many books."
  ],
  [
   "Вопрос: «{Has} he got a bike?»",
   true,
   "С he — has."
  ],
  [
   "Отрицание: «{She haven’t got} a pet».",
   false,
   "She hasn’t got a pet."
  ]
 ]
});
