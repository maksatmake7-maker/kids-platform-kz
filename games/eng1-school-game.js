/* Английский язык, 1 класс (пререквизит A1: слова и фразы по темам программы). Барсик объясняет по-русски, английские слова звучат английским голосом (в казахском отделении звук выключен). Тексты проверяет Максат. */
ENG3.define({
 "key": "eng1school",
 "theme": "sky",
 "groups": [
  {
   "k": "sch",
   "name": "Школьные вещи",
   "c": "green",
   "words": [
    [
     "schoolbag",
     "школьная сумка, портфель"
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
    ],
    [
     "rubber",
     "ластик"
    ]
   ]
  },
  {
   "k": "furn",
   "name": "Мебель",
   "c": "blue",
   "words": [
    [
     "desk",
     "парта"
    ],
    [
     "chair",
     "стул"
    ],
    [
     "table",
     "стол"
    ]
   ]
  }
 ],
 "pairs": [],
 "fills": [
  {
   "lv": 1,
   "q": "Это ручка.",
   "pre": "It's a ",
   "right": "pen",
   "wrong": [
    "book",
    "pencil"
   ],
   "post": ".",
   "ru": "Это ручка.",
   "hint": "Pen — ручка."
  },
  {
   "lv": 1,
   "q": "Это карандаш.",
   "pre": "It's a ",
   "right": "pencil",
   "wrong": [
    "pen",
    "rubber"
   ],
   "post": ".",
   "ru": "Это карандаш.",
   "hint": "Pencil — карандаш."
  },
  {
   "lv": 1,
   "q": "Это книга.",
   "pre": "It's a ",
   "right": "book",
   "wrong": [
    "pen",
    "schoolbag"
   ],
   "post": ".",
   "ru": "Это книга.",
   "hint": "Book — книга."
  },
  {
   "lv": 1,
   "q": "Это ластик.",
   "pre": "It's a ",
   "right": "rubber",
   "wrong": [
    "pencil",
    "book"
   ],
   "post": ".",
   "ru": "Это ластик.",
   "hint": "Rubber — ластик."
  },
  {
   "lv": 2,
   "q": "Это голубой портфель.",
   "pre": "It's a blue ",
   "right": "schoolbag",
   "wrong": [
    "book",
    "pen"
   ],
   "post": ".",
   "ru": "Это голубой портфель.",
   "hint": "Schoolbag — школьная сумка."
  },
  {
   "lv": 3,
   "q": "Это ручка.",
   "pre": "It's ",
   "right": "a",
   "wrong": [
    "an",
    "two"
   ],
   "post": " pen.",
   "ru": "Это ручка.",
   "hint": "Перед одним предметом ставим a: a pen."
  }
 ],
 "sound": [
  [
   "pen",
   "ручка",
   "e",
   [
    "a",
    "i"
   ],
   1,
   1
  ],
  [
   "book",
   "книга",
   "o",
   [
    "a",
    "e"
   ],
   1,
   1
  ],
  [
   "pencil",
   "карандаш",
   "e",
   [
    "a",
    "i"
   ],
   1,
   2
  ]
 ],
 "order": [
  [
   "It's a blue schoolbag.",
   [
    "It's blue a schoolbag.",
    "A it's schoolbag blue."
   ],
   "Это голубой портфель.",
   "Сначала It's a, потом цвет и предмет."
  ],
  [
   "It's a pen.",
   [
    "A it's pen.",
    "Pen it's a."
   ],
   "Это ручка.",
   "Сначала It's a, потом предмет."
  ]
 ],
 "tf": [
  [
   "«{pen}» — это «ручка».",
   true,
   "Pen — ручка."
  ],
  [
   "«{rubber}» — это «книга».",
   false,
   "Rubber — ластик, book — книга."
  ],
  [
   "«{pencil}» — это «карандаш».",
   true,
   "Pencil — карандаш."
  ],
  [
   "«{schoolbag}» — это «школьная сумка».",
   true,
   "Schoolbag — школьная сумка."
  ],
  [
   "«{desk}» — это школьная вещь для письма.",
   false,
   "Desk — парта, это мебель."
  ]
 ]
});
