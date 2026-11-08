/* Английский язык, 2 класс — «Colours — цвета». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2colours",
 "theme": "meadow",
 "groups": [
  {
   "k": "c1",
   "name": "Яркие цвета",
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
     "голубой, синий"
    ],
    [
     "orange",
     "оранжевый"
    ],
    [
     "pink",
     "розовый"
    ]
   ]
  },
  {
   "k": "c2",
   "name": "Другие цвета",
   "c": "blue",
   "words": [
    [
     "black",
     "чёрный"
    ],
    [
     "white",
     "белый"
    ],
    [
     "brown",
     "коричневый"
    ],
    [
     "purple",
     "фиолетовый"
    ],
    [
     "grey",
     "серый"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Что это за цвет? Красный.",
   "pre": "It's ",
   "right": "red",
   "wrong": [
    "blue",
    "green"
   ],
   "post": ".",
   "ru": "Он красный.",
   "hint": "Red — красный."
  },
  {
   "lv": 1,
   "q": "Какого цвета банан?",
   "pre": "A banana is ",
   "right": "yellow",
   "wrong": [
    "blue",
    "pink"
   ],
   "post": ".",
   "ru": "Банан жёлтый.",
   "hint": "Yellow — жёлтый."
  },
  {
   "lv": 1,
   "q": "Какого цвета трава?",
   "pre": "Grass is ",
   "right": "green",
   "wrong": [
    "red",
    "white"
   ],
   "post": ".",
   "ru": "Трава зелёная.",
   "hint": "Green — зелёный."
  },
  {
   "lv": 2,
   "q": "Какого цвета эта вещь?",
   "pre": "What ",
   "right": "colour",
   "wrong": [
    "name",
    "book"
   ],
   "post": " is it?",
   "ru": "Какого она цвета?",
   "hint": "Colour — цвет."
  },
  {
   "lv": 2,
   "q": "Это розовая рыба.",
   "pre": "It's a ",
   "right": "pink",
   "wrong": [
    "red",
    "orange"
   ],
   "post": " fish.",
   "ru": "Это розовая рыба.",
   "hint": "Цвет стоит перед словом: pink fish."
  },
  {
   "lv": 3,
   "q": "Какого цвета эти шарики?",
   "pre": "What colour ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " they?",
   "ru": "Какого цвета они?",
   "hint": "С they говорим are."
  },
  {
   "lv": 3,
   "q": "Они чёрные.",
   "pre": "They ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " black.",
   "ru": "Они чёрные.",
   "hint": "С they говорим are."
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
   1
  ],
  [
   "green",
   "зелёный",
   "e",
   [
    "a",
    "i"
   ],
   2,
   2
  ],
  [
   "yellow",
   "жёлтый",
   "o",
   [
    "a",
    "e"
   ],
   4,
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
   "Это синий портфель.",
   "Цвет стоит перед словом schoolbag."
  ]
 ],
 "tf": [
  [
   "«{red}» значит «красный».",
   true,
   "Red — красный."
  ],
  [
   "«{green}» значит «жёлтый».",
   false,
   "Green — зелёный."
  ],
  [
   "«{brown}» значит «коричневый».",
   true,
   "Brown — коричневый."
  ],
  [
   "Фиолетовый по-английски — {purple}.",
   true,
   "Purple — фиолетовый."
  ]
 ]
});
