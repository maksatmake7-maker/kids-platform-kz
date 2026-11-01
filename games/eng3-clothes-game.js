/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «Clothes — одежда». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3clothes",
 "theme": "autumn",
 "groups": [
  {
   "k": "warm",
   "name": "Тёплая одежда",
   "c": "blue",
   "words": [
    [
     "coat",
     "пальто"
    ],
    [
     "jacket",
     "куртка"
    ],
    [
     "hat",
     "шапка"
    ],
    [
     "scarf",
     "шарф"
    ],
    [
     "gloves",
     "перчатки"
    ],
    [
     "boots",
     "сапоги"
    ]
   ]
  },
  {
   "k": "summer",
   "name": "Лёгкая одежда",
   "c": "orange",
   "words": [
    [
     "T-shirt",
     "футболка"
    ],
    [
     "shorts",
     "шорты"
    ],
    [
     "dress",
     "платье"
    ],
    [
     "skirt",
     "юбка"
    ],
    [
     "sandals",
     "сандалии"
    ],
    [
     "cap",
     "кепка"
    ]
   ]
  },
  {
   "k": "every",
   "name": "На каждый день",
   "c": "green",
   "words": [
    [
     "trousers",
     "брюки"
    ],
    [
     "jumper",
     "свитер"
    ],
    [
     "shirt",
     "рубашка"
    ],
    [
     "socks",
     "носки"
    ],
    [
     "shoes",
     "туфли, ботинки"
    ],
    [
     "jeans",
     "джинсы"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Зимой холодно. Я надеваю пальто.",
   "pre": "In winter I wear a ",
   "right": "coat",
   "wrong": [
    "T-shirt",
    "skirt"
   ],
   "post": ".",
   "ru": "Зимой я ношу пальто.",
   "hint": "Coat — пальто."
  },
  {
   "lv": 1,
   "q": "Жарко. Я надеваю шорты.",
   "pre": "It is hot. I wear ",
   "right": "shorts",
   "wrong": [
    "boots",
    "a scarf"
   ],
   "post": ".",
   "ru": "Жарко. Я надеваю шорты.",
   "hint": "Shorts — шорты."
  },
  {
   "lv": 1,
   "q": "Она носит красное платье.",
   "pre": "She ",
   "right": "wears",
   "wrong": [
    "wear",
    "wearing"
   ],
   "post": " a red dress.",
   "ru": "Она носит красное платье.",
   "hint": "С she говорим wears."
  },
  {
   "lv": 1,
   "q": "Я ношу шапку.",
   "pre": "I ",
   "right": "wear",
   "wrong": [
    "wears",
    "wearing"
   ],
   "post": " a hat.",
   "ru": "Я ношу шапку.",
   "hint": "С I говорим wear."
  },
  {
   "lv": 2,
   "q": "Мои туфли новые.",
   "pre": "My shoes ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " new.",
   "ru": "Мои туфли новые.",
   "hint": "Shoes — много, значит are."
  },
  {
   "lv": 2,
   "q": "Где мои перчатки?",
   "pre": "Where ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " my gloves?",
   "ru": "Где мои перчатки?",
   "hint": "Gloves — много, значит are."
  },
  {
   "lv": 2,
   "q": "Это моя куртка.",
   "pre": "This ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " my jacket.",
   "ru": "Это моя куртка.",
   "hint": "Jacket — одна, значит is."
  },
  {
   "lv": 3,
   "q": "У меня оранжевый свитер.",
   "pre": "I wear ",
   "right": "an",
   "wrong": [
    "a",
    "the"
   ],
   "post": " orange jumper.",
   "ru": "Я ношу оранжевый свитер.",
   "hint": "Перед orange говорим an."
  }
 ],
 "sound": [
  [
   "jacket",
   "куртка",
   "j",
   [
    "g",
    "y"
   ],
   0,
   1
  ],
  [
   "scarf",
   "шарф",
   "c",
   [
    "k",
    "s"
   ],
   1,
   1
  ],
  [
   "gloves",
   "перчатки",
   "l",
   [
    "r",
    "n"
   ],
   1,
   1
  ],
  [
   "shorts",
   "шорты",
   "o",
   [
    "a",
    "u"
   ],
   2,
   2
  ],
  [
   "dress",
   "платье",
   "r",
   [
    "l",
    "n"
   ],
   1,
   2
  ],
  [
   "skirt",
   "юбка",
   "k",
   [
    "c",
    "g"
   ],
   1,
   2
  ],
  [
   "shoes",
   "туфли",
   "o",
   [
    "a",
    "u"
   ],
   2,
   3
  ],
  [
   "socks",
   "носки",
   "c",
   [
    "k",
    "s"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "I wear a hat.",
   [
    "I a hat wear.",
    "Wear I a hat."
   ],
   "Я ношу шапку.",
   "Сначала I wear, потом что."
  ],
  [
   "She wears a blue dress.",
   [
    "She wears dress a blue.",
    "She a blue wears dress."
   ],
   "Она носит голубое платье.",
   "Сначала a, потом цвет, потом одежда."
  ],
  [
   "These are my shoes.",
   [
    "These my are shoes.",
    "Are these my shoes."
   ],
   "Это мои туфли.",
   "These are + my + что."
  ],
  [
   "It is cold, I wear a coat.",
   [
    "It is cold, I a coat wear.",
    "Cold it is, I wear a coat."
   ],
   "Холодно, я ношу пальто.",
   "Сначала It is cold."
  ]
 ],
 "tf": [
  [
   "«{hat}» — это «шапка».",
   true,
   "Hat — шапка."
  ],
  [
   "«{shorts}» надевают в сильный мороз.",
   false,
   "Shorts — шорты, летняя одежда."
  ],
  [
   "«{socks}» — это «носки».",
   true,
   "Socks — носки."
  ],
  [
   "«{boots}» — это «платье».",
   false,
   "Boots — сапоги, dress — платье."
  ],
  [
   "«{gloves}» надевают на руки.",
   true,
   "Gloves — перчатки."
  ],
  [
   "«{She wears a coat}» значит «Она носит пальто».",
   true,
   "Wears — носит."
  ]
 ]
});
