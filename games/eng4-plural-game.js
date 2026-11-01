/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «One or many? Единственное и множественное». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4plural",
 "theme": "meadow",
 "groups": [
  {
   "k": "s",
   "name": "Окончание -s",
   "c": "green",
   "words": [
    [
     "book",
     "книга"
    ],
    [
     "pen",
     "ручка"
    ],
    [
     "cat",
     "кошка"
    ],
    [
     "bag",
     "сумка"
    ],
    [
     "apple",
     "яблоко"
    ],
    [
     "dog",
     "собака"
    ]
   ]
  },
  {
   "k": "es",
   "name": "Окончание -es",
   "c": "orange",
   "words": [
    [
     "box",
     "коробка"
    ],
    [
     "bus",
     "автобус"
    ],
    [
     "watch",
     "часы"
    ],
    [
     "dish",
     "тарелка"
    ],
    [
     "class",
     "класс"
    ],
    [
     "glass",
     "стакан"
    ]
   ]
  },
  {
   "k": "irr",
   "name": "Особые формы",
   "c": "blue",
   "words": [
    [
     "child",
     "ребёнок (children)"
    ],
    [
     "man",
     "мужчина (men)"
    ],
    [
     "woman",
     "женщина (women)"
    ],
    [
     "foot",
     "ступня (feet)"
    ],
    [
     "tooth",
     "зуб (teeth)"
    ],
    [
     "mouse",
     "мышь (mice)"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "one",
   "один",
   "many",
   "много"
  ],
  [
   "a",
   "один",
   "the",
   "определённый"
  ],
  [
   "child",
   "ребёнок",
   "children",
   "дети"
  ],
  [
   "man",
   "мужчина",
   "men",
   "мужчины"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Три книги.",
   "pre": "Three ",
   "right": "books",
   "wrong": [
    "book",
    "bookes"
   ],
   "post": ".",
   "ru": "Три книги",
   "hint": "Когда много, добавляем -s."
  },
  {
   "lv": 1,
   "q": "Две коробки.",
   "pre": "Two ",
   "right": "boxes",
   "wrong": [
    "boxs",
    "box"
   ],
   "post": ".",
   "ru": "Две коробки",
   "hint": "После x, s, ch, sh добавляем -es."
  },
  {
   "lv": 1,
   "q": "У меня есть яблоко.",
   "pre": "I have ",
   "right": "an",
   "wrong": [
    "a",
    "the"
   ],
   "post": " apple.",
   "ru": "У меня есть яблоко",
   "hint": "Перед гласным звуком ставим an."
  },
  {
   "lv": 2,
   "q": "Это книга Айдара.",
   "pre": "This is ",
   "right": "Aidar’s",
   "wrong": [
    "Aidars",
    "Aidars’"
   ],
   "post": " book.",
   "ru": "Это книга Айдара",
   "hint": "Принадлежность: имя + ’s."
  },
  {
   "lv": 2,
   "q": "Четверо детей.",
   "pre": "Four ",
   "right": "children",
   "wrong": [
    "childs",
    "childrens"
   ],
   "post": ".",
   "ru": "Четверо детей",
   "hint": "Child — особая форма children."
  },
  {
   "lv": 2,
   "q": "Это мой друг.",
   "pre": "He is ",
   "right": "a",
   "wrong": [
    "an",
    "—"
   ],
   "post": " friend.",
   "ru": "Он друг",
   "hint": "Перед согласным звуком ставим a."
  },
  {
   "lv": 3,
   "q": "Две женщины.",
   "pre": "Two ",
   "right": "women",
   "wrong": [
    "womans",
    "womens"
   ],
   "post": ".",
   "ru": "Две женщины",
   "hint": "Woman — особая форма women."
  },
  {
   "lv": 3,
   "q": "Солнце яркое.",
   "pre": "",
   "right": "The",
   "wrong": [
    "A",
    "An"
   ],
   "post": " sun is bright.",
   "ru": "Солнце яркое",
   "hint": "Одно известное нам солнце — the."
  },
  {
   "lv": 3,
   "q": "Это мои зубы.",
   "pre": "These are my ",
   "right": "teeth",
   "wrong": [
    "tooths",
    "toothes"
   ],
   "post": ".",
   "ru": "Это мои зубы",
   "hint": "Tooth — особая форма teeth."
  },
  {
   "lv": 3,
   "q": "Это мяч Дины.",
   "pre": "It is ",
   "right": "Dina’s",
   "wrong": [
    "Dinas",
    "Dina"
   ],
   "post": " ball.",
   "ru": "Это мяч Дины",
   "hint": "Принадлежность: имя + ’s."
  }
 ],
 "sound": [
  [
   "book",
   "книга",
   "o",
   [
    "a",
    "u"
   ],
   1,
   1
  ],
  [
   "apple",
   "яблоко",
   "p",
   [
    "b",
    "t"
   ],
   1,
   1
  ],
  [
   "boxes",
   "коробки",
   "e",
   [
    "a",
    "i"
   ],
   3,
   1
  ],
  [
   "buses",
   "автобусы",
   "s",
   [
    "c",
    "z"
   ],
   2,
   1
  ],
  [
   "children",
   "дети",
   "l",
   [
    "r",
    "n"
   ],
   3,
   1
  ],
  [
   "women",
   "женщины",
   "o",
   [
    "a",
    "u"
   ],
   1,
   2
  ],
  [
   "teeth",
   "зубы",
   "e",
   [
    "a",
    "i"
   ],
   1,
   2
  ],
  [
   "glasses",
   "стаканы",
   "l",
   [
    "r",
    "n"
   ],
   1,
   2
  ],
  [
   "watches",
   "часы",
   "c",
   [
    "k",
    "s"
   ],
   3,
   3
  ],
  [
   "mice",
   "мыши",
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
   "I have two books.",
   [
    "I have two book.",
    "I two have books."
   ],
   "У меня две книги",
   "Когда много, добавляем -s."
  ],
  [
   "It is Aidar’s bag.",
   [
    "It is Aidars bag.",
    "It Aidar’s is bag."
   ],
   "Это сумка Айдара",
   "Принадлежность: имя + ’s."
  ],
  [
   "There are three boxes.",
   [
    "There are three boxs.",
    "There three are boxes."
   ],
   "Здесь три коробки",
   "После x ставим -es."
  ],
  [
   "I have an apple.",
   [
    "I have a apple.",
    "I an have apple."
   ],
   "У меня есть яблоко",
   "Перед гласным — an."
  ]
 ],
 "tf": [
  [
   "«{a}» ставим перед гласным звуком.",
   false,
   "Перед гласным — an."
  ],
  [
   "«{an}» ставим перед гласным звуком.",
   true,
   "An apple."
  ],
  [
   "Множественное от «{box}» — «{boxes}».",
   true,
   "После x — -es."
  ],
  [
   "Множественное от «{child}» — «{childs}».",
   false,
   "Child — children."
  ],
  [
   "«{Aidar’s book}» значит «книга Айдара».",
   true,
   "’s показывает, чьё."
  ],
  [
   "Множественное от «{man}» — «{men}».",
   true,
   "Особая форма."
  ]
 ]
});
