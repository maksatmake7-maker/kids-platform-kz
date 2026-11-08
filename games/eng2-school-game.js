/* Английский язык, 2 класс — «School things — школьные вещи». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2school",
 "theme": "meadow",
 "groups": [
  {
   "k": "bag",
   "name": "В портфеле",
   "c": "green",
   "words": [
    [
     "schoolbag",
     "портфель"
    ],
    [
     "pencil case",
     "пенал"
    ],
    [
     "book",
     "книга"
    ],
    [
     "pen",
     "ручка"
    ],
    [
     "pencil",
     "карандаш"
    ]
   ]
  },
  {
   "k": "desk",
   "name": "На парте",
   "c": "orange",
   "words": [
    [
     "ruler",
     "линейка"
    ],
    [
     "rubber",
     "ластик"
    ],
    [
     "sharpener",
     "точилка"
    ],
    [
     "desk",
     "парта"
    ],
    [
     "chair",
     "стул"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Чем ты стираешь?",
   "pre": "A ",
   "right": "rubber",
   "wrong": [
    "ruler",
    "pen"
   ],
   "post": ".",
   "ru": "Ластик.",
   "hint": "Rubber — ластик."
  },
  {
   "lv": 1,
   "q": "Чем ты измеряешь?",
   "pre": "A ",
   "right": "ruler",
   "wrong": [
    "rubber",
    "book"
   ],
   "post": ".",
   "ru": "Линейка.",
   "hint": "Ruler — линейка."
  },
  {
   "lv": 1,
   "q": "Коробочка для ручек и карандашей.",
   "pre": "A pencil ",
   "right": "case",
   "wrong": [
    "bag",
    "box"
   ],
   "post": ".",
   "ru": "Пенал.",
   "hint": "Pencil case — пенал."
  },
  {
   "lv": 2,
   "q": "Это портфель.",
   "pre": "It's a ",
   "right": "schoolbag",
   "wrong": [
    "desk",
    "pen"
   ],
   "post": ".",
   "ru": "Это портфель.",
   "hint": "Schoolbag — портфель."
  },
  {
   "lv": 2,
   "q": "Здесь одна линейка.",
   "pre": "There's ",
   "right": "one",
   "wrong": [
    "two",
    "three"
   ],
   "post": " ruler.",
   "ru": "Здесь одна линейка.",
   "hint": "One — один."
  },
  {
   "lv": 3,
   "q": "Здесь две точилки.",
   "pre": "There are two ",
   "right": "sharpeners",
   "wrong": [
    "sharpener",
    "sharpens"
   ],
   "post": ".",
   "ru": "Здесь две точилки.",
   "hint": "Если предметов два, добавляем s."
  },
  {
   "lv": 3,
   "q": "Здесь один карандаш.",
   "pre": "There ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " one pencil.",
   "ru": "Здесь один карандаш.",
   "hint": "С one говорим There is (There's)."
  },
  {
   "lv": 3,
   "q": "Здесь две ручки.",
   "pre": "There ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " two pens.",
   "ru": "Здесь две ручки.",
   "hint": "Когда предметов много, говорим There are."
  }
 ],
 "sound": [
  [
   "pencil",
   "карандаш",
   "e",
   [
    "a",
    "i"
   ],
   1,
   1
  ],
  [
   "ruler",
   "линейка",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "rubber",
   "ластик",
   "u",
   [
    "a",
    "o"
   ],
   1,
   2
  ],
  [
   "sharpener",
   "точилка",
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
   "There's one ruler.",
   [
    "One there's ruler.",
    "Ruler one there's."
   ],
   "Здесь одна линейка.",
   "Сначала There's, потом one и предмет."
  ],
  [
   "There are two pens.",
   [
    "Two there are pens.",
    "Are there two pens."
   ],
   "Здесь две ручки.",
   "Сначала There are, потом two и предмет."
  ]
 ],
 "tf": [
  [
   "«{ruler}» значит «линейка».",
   true,
   "Ruler — линейка."
  ],
  [
   "«{rubber}» значит «карандаш».",
   false,
   "Rubber — ластик, а карандаш — pencil."
  ],
  [
   "Про один предмет говорим: «{There's one pen}».",
   true,
   "Один предмет — There's one."
  ],
  [
   "Про два предмета говорим: «{There are two pens}».",
   true,
   "Два предмета — There are two."
  ]
 ]
});
