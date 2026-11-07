/* Английский язык, 2 класс — «Holidays and travel — каникулы и путешествия». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2travel",
 "theme": "meadow",
 "groups": [
  {
   "k": "tr",
   "name": "Транспорт",
   "c": "green",
   "words": [
    [
     "bus",
     "автобус"
    ],
    [
     "bike",
     "велосипед"
    ],
    [
     "train",
     "поезд"
    ],
    [
     "car",
     "машина"
    ],
    [
     "plane",
     "самолёт"
    ],
    [
     "boat",
     "лодка"
    ]
   ]
  },
  {
   "k": "pl",
   "name": "Куда",
   "c": "orange",
   "words": [
    [
     "beach",
     "пляж"
    ],
    [
     "sea",
     "море"
    ],
    [
     "mountains",
     "горы"
    ],
    [
     "park",
     "парк"
    ],
    [
     "zoo",
     "зоопарк"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Ехать на автобусе.",
   "pre": "by ",
   "right": "bus",
   "wrong": [
    "bike",
    "train"
   ],
   "post": ".",
   "ru": "На автобусе.",
   "hint": "By bus — на автобусе."
  },
  {
   "lv": 1,
   "q": "Ехать на велосипеде.",
   "pre": "by ",
   "right": "bike",
   "wrong": [
    "bus",
    "car"
   ],
   "post": ".",
   "ru": "На велосипеде.",
   "hint": "By bike — на велосипеде."
  },
  {
   "lv": 1,
   "q": "Ехать на поезде.",
   "pre": "by ",
   "right": "train",
   "wrong": [
    "plane",
    "boat"
   ],
   "post": ".",
   "ru": "На поезде.",
   "hint": "By train — на поезде."
  },
  {
   "lv": 2,
   "q": "Мне хочется на пляж.",
   "pre": "I want to go to the ",
   "right": "beach",
   "wrong": [
    "zoo",
    "park"
   ],
   "post": ".",
   "ru": "Я хочу на пляж.",
   "hint": "Beach — пляж."
  },
  {
   "lv": 2,
   "q": "Он хочет поехать на автобусе.",
   "pre": "He wants to go ",
   "right": "by",
   "wrong": [
    "at",
    "on"
   ],
   "post": " bus.",
   "ru": "Он хочет поехать на автобусе.",
   "hint": "By — на (транспорте)."
  },
  {
   "lv": 3,
   "q": "Дана хочет в зоопарк на машине.",
   "pre": "Dana wants to go to the zoo by ",
   "right": "car",
   "wrong": [
    "plane",
    "boat"
   ],
   "post": ".",
   "ru": "Дана хочет в зоопарк на машине.",
   "hint": "By car — на машине."
  },
  {
   "lv": 3,
   "q": "Я хочу поехать на пляж.",
   "pre": "I ",
   "right": "want",
   "wrong": [
    "wants",
    "wanting"
   ],
   "post": " to go to the beach.",
   "ru": "Я хочу на пляж.",
   "hint": "С I говорим want, с he и she — wants."
  },
  {
   "lv": 3,
   "q": "Айдар хочет в горы.",
   "pre": "Aidar ",
   "right": "wants",
   "wrong": [
    "want",
    "wanting"
   ],
   "post": " to go to the mountains.",
   "ru": "Айдар хочет в горы.",
   "hint": "С he и she говорим wants."
  }
 ],
 "sound": [
  [
   "train",
   "поезд",
   "a",
   [
    "o",
    "e"
   ],
   2,
   1
  ],
  [
   "plane",
   "самолёт",
   "l",
   [
    "n",
    "r"
   ],
   1,
   1
  ],
  [
   "beach",
   "пляж",
   "e",
   [
    "a",
    "o"
   ],
   1,
   2
  ],
  [
   "mountains",
   "горы",
   "u",
   [
    "a",
    "o"
   ],
   2,
   2
  ]
 ],
 "order": [
  [
   "I want to go by train.",
   [
    "I go want to by train.",
    "To I want go by train."
   ],
   "Я хочу поехать на поезде.",
   "Сначала I want to go, потом by и транспорт."
  ],
  [
   "He wants to go to the beach.",
   [
    "He to wants go the beach.",
    "Wants he to go to the beach."
   ],
   "Он хочет на пляж.",
   "Сначала He wants to go, потом to the и место."
  ]
 ],
 "tf": [
  [
   "«{by bus}» значит «на автобусе».",
   true,
   "By bus — на автобусе."
  ],
  [
   "«{plane}» значит «поезд».",
   false,
   "Plane — самолёт, а поезд — train."
  ],
  [
   "«{beach}» значит «пляж».",
   true,
   "Beach — пляж."
  ],
  [
   "«{He wants to go to the zoo}» значит «Он хочет в зоопарк».",
   true,
   "Wants to go — хочет пойти, поехать."
  ]
 ]
});
