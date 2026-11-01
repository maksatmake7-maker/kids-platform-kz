/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Describing — какой он?». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4adj",
 "theme": "garden",
 "groups": [
  {
   "k": "look",
   "name": "Как выглядит",
   "c": "green",
   "words": [
    [
     "tall",
     "высокий"
    ],
    [
     "short",
     "низкий"
    ],
    [
     "fat",
     "толстый"
    ],
    [
     "thin",
     "худой"
    ],
    [
     "young",
     "молодой"
    ],
    [
     "old",
     "старый"
    ]
   ]
  },
  {
   "k": "char",
   "name": "Какой характер",
   "c": "orange",
   "words": [
    [
     "kind",
     "добрый"
    ],
    [
     "funny",
     "смешной"
    ],
    [
     "clever",
     "умный"
    ],
    [
     "shy",
     "застенчивый"
    ],
    [
     "brave",
     "храбрый"
    ],
    [
     "lazy",
     "ленивый"
    ]
   ]
  },
  {
   "k": "thing",
   "name": "Какой предмет",
   "c": "blue",
   "words": [
    [
     "big",
     "большой"
    ],
    [
     "small",
     "маленький"
    ],
    [
     "new",
     "новый"
    ],
    [
     "heavy",
     "тяжёлый"
    ],
    [
     "light",
     "лёгкий"
    ],
    [
     "expensive",
     "дорогой"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "tall",
   "высокий",
   "short",
   "низкий"
  ],
  [
   "big",
   "большой",
   "small",
   "маленький"
  ],
  [
   "heavy",
   "тяжёлый",
   "light",
   "лёгкий"
  ],
  [
   "clever",
   "умный",
   "silly",
   "глупый"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Это мой старший брат.",
   "pre": "This is ",
   "right": "my",
   "wrong": [
    "me",
    "I"
   ],
   "post": " big brother.",
   "ru": "Это мой старший брат",
   "hint": "My — мой (перед словом)."
  },
  {
   "lv": 1,
   "q": "Она добрая.",
   "pre": "She is ",
   "right": "kind",
   "wrong": [
    "kindly",
    "kinds"
   ],
   "post": ".",
   "ru": "Она добрая",
   "hint": "После is идёт слово-описание."
  },
  {
   "lv": 1,
   "q": "Его сестра высокая.",
   "pre": "",
   "right": "His",
   "wrong": [
    "He",
    "Him"
   ],
   "post": " sister is tall.",
   "ru": "Его сестра высокая",
   "hint": "His — его (перед словом)."
  },
  {
   "lv": 2,
   "q": "Её собака маленькая.",
   "pre": "",
   "right": "Her",
   "wrong": [
    "She",
    "His"
   ],
   "post": " dog is small.",
   "ru": "Её собака маленькая",
   "hint": "Her — её."
  },
  {
   "lv": 2,
   "q": "Это умный мальчик.",
   "pre": "He is a ",
   "right": "clever",
   "wrong": [
    "cleverly",
    "clevers"
   ],
   "post": " boy.",
   "ru": "Он умный мальчик",
   "hint": "Прилагательное стоит перед словом."
  },
  {
   "lv": 2,
   "q": "Эта сумка тяжёлая.",
   "pre": "This bag is ",
   "right": "heavy",
   "wrong": [
    "light",
    "thin"
   ],
   "post": ".",
   "ru": "Эта сумка тяжёлая",
   "hint": "Heavy — тяжёлый."
  },
  {
   "lv": 3,
   "q": "Они храбрые дети.",
   "pre": "They are ",
   "right": "brave",
   "wrong": [
    "braves",
    "bravely"
   ],
   "post": " children.",
   "ru": "Они храбрые дети",
   "hint": "Прилагательное не меняется."
  },
  {
   "lv": 3,
   "q": "Мы любим наш новый класс.",
   "pre": "We love ",
   "right": "our",
   "wrong": [
    "we",
    "us"
   ],
   "post": " new classroom.",
   "ru": "Мы любим наш новый класс",
   "hint": "Our — наш."
  },
  {
   "lv": 3,
   "q": "Это их красивый дом.",
   "pre": "This is ",
   "right": "their",
   "wrong": [
    "they",
    "them"
   ],
   "post": " beautiful house.",
   "ru": "Это их красивый дом",
   "hint": "Their — их."
  }
 ],
 "sound": [
  [
   "tall",
   "высокий",
   "l",
   [
    "r",
    "n"
   ],
   2,
   1
  ],
  [
   "funny",
   "смешной",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "clever",
   "умный",
   "v",
   [
    "w",
    "b"
   ],
   3,
   1
  ],
  [
   "brave",
   "храбрый",
   "a",
   [
    "e",
    "o"
   ],
   2,
   1
  ],
  [
   "shy",
   "застенчивый",
   "y",
   [
    "i",
    "e"
   ],
   2,
   2
  ],
  [
   "heavy",
   "тяжёлый",
   "v",
   [
    "w",
    "b"
   ],
   3,
   2
  ],
  [
   "lazy",
   "ленивый",
   "z",
   [
    "s",
    "c"
   ],
   2,
   2
  ],
  [
   "expensive",
   "дорогой",
   "x",
   [
    "k",
    "c"
   ],
   1,
   3
  ],
  [
   "beautiful",
   "красивый",
   "u",
   [
    "a",
    "o"
   ],
   3,
   3
  ]
 ],
 "order": [
  [
   "She is a kind girl.",
   [
    "She is kind a girl.",
    "She a kind is girl."
   ],
   "Она добрая девочка",
   "a + какая + кто."
  ],
  [
   "My brother is tall.",
   [
    "Brother my is tall.",
    "My is brother tall."
   ],
   "Мой брат высокий",
   "My + кто + is + какой."
  ],
  [
   "His dog is small.",
   [
    "His is dog small.",
    "Dog his is small."
   ],
   "Его собака маленькая",
   "His + кто + is + какая."
  ],
  [
   "They have a big house.",
   [
    "They a big have house.",
    "They have house a big."
   ],
   "У них большой дом",
   "a + какой + что."
  ]
 ],
 "tf": [
  [
   "«{tall}» значит «высокий».",
   true,
   "Tall — высокий."
  ],
  [
   "«{his}» значит «её».",
   false,
   "His — его, her — её."
  ],
  [
   "Прилагательное стоит перед словом: «a {big} dog».",
   true,
   "Big dog."
  ],
  [
   "«{kind}» значит «злой».",
   false,
   "Kind — добрый."
  ],
  [
   "«{their}» значит «их».",
   true,
   "Their house — их дом."
  ],
  [
   "«{light}» значит «тяжёлый».",
   false,
   "Light — лёгкий; heavy — тяжёлый."
  ]
 ]
});
