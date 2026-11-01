/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «School things — школа». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3school",
 "theme": "workshop",
 "groups": [
  {
   "k": "bag",
   "name": "В портфеле",
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
     "pencil",
     "карандаш"
    ],
    [
     "ruler",
     "линейка"
    ],
    [
     "rubber",
     "ластик"
    ],
    [
     "notebook",
     "тетрадь"
    ],
    [
     "bag",
     "портфель"
    ]
   ]
  },
  {
   "k": "class",
   "name": "В классе",
   "c": "orange",
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
     "board",
     "доска"
    ],
    [
     "door",
     "дверь"
    ],
    [
     "window",
     "окно"
    ],
    [
     "clock",
     "часы"
    ],
    [
     "map",
     "карта"
    ]
   ]
  },
  {
   "k": "do",
   "name": "Что делаем в классе",
   "c": "blue",
   "words": [
    [
     "read",
     "читать"
    ],
    [
     "write",
     "писать"
    ],
    [
     "draw",
     "рисовать"
    ],
    [
     "listen",
     "слушать"
    ],
    [
     "count",
     "считать"
    ],
    [
     "sing",
     "петь"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "open",
   "открой",
   "close",
   "закрой"
  ],
  [
   "sit down",
   "сядь",
   "stand up",
   "встань"
  ],
  [
   "come in",
   "входи",
   "go out",
   "выходи"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Сядь, пожалуйста.",
   "pre": "",
   "right": "Sit",
   "wrong": [
    "Open",
    "Write"
   ],
   "post": " down, please.",
   "ru": "Сядь, пожалуйста.",
   "hint": "Sit down — садись."
  },
  {
   "lv": 1,
   "q": "Слушай, пожалуйста.",
   "pre": "",
   "right": "Listen",
   "wrong": [
    "Eat",
    "Sleep"
   ],
   "post": ", please.",
   "ru": "Слушай, пожалуйста.",
   "hint": "Listen — слушай."
  },
  {
   "lv": 1,
   "q": "Пиши ручкой.",
   "pre": "Write with a ",
   "right": "pen",
   "wrong": [
    "door",
    "chair"
   ],
   "post": ".",
   "ru": "Пиши ручкой.",
   "hint": "Pen — ручка."
  },
  {
   "lv": 1,
   "q": "Садись на стул.",
   "pre": "Sit on the ",
   "right": "chair",
   "wrong": [
    "board",
    "clock"
   ],
   "post": ".",
   "ru": "Садись на стул.",
   "hint": "Chair — стул."
  },
  {
   "lv": 2,
   "q": "Проведи линию линейкой.",
   "pre": "Draw a line with a ",
   "right": "ruler",
   "wrong": [
    "clock",
    "window"
   ],
   "post": ".",
   "ru": "Проведи линию линейкой.",
   "hint": "Ruler — линейка."
  },
  {
   "lv": 2,
   "q": "Положи карандаши в портфель.",
   "pre": "Put your pencils in your ",
   "right": "bag",
   "wrong": [
    "door",
    "board"
   ],
   "post": ".",
   "ru": "Положи карандаши в портфель.",
   "hint": "Bag — портфель."
  },
  {
   "lv": 3,
   "q": "Открой книгу.",
   "pre": "",
   "right": "Open",
   "wrong": [
    "Close",
    "Stand"
   ],
   "post": " your book.",
   "ru": "Открой книгу.",
   "hint": "Open — открой; close — закрой."
  }
 ],
 "sound": [
  [
   "pencil",
   "карандаш",
   "c",
   [
    "s",
    "k"
   ],
   3,
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
   "desk",
   "парта",
   "e",
   [
    "a",
    "i"
   ],
   1,
   1
  ],
  [
   "board",
   "доска",
   "a",
   [
    "o",
    "e"
   ],
   2,
   2
  ],
  [
   "window",
   "окно",
   "d",
   [
    "t",
    "b"
   ],
   3,
   2
  ],
  [
   "chair",
   "стул",
   "h",
   [
    "r",
    "l"
   ],
   1,
   2
  ],
  [
   "rubber",
   "ластик",
   "b",
   [
    "d",
    "p"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "Open your book.",
   [
    "Your open book.",
    "Book your open."
   ],
   "Открой книгу.",
   "В команде сначала глагол."
  ],
  [
   "Close the door, please.",
   [
    "Close please the door.",
    "The door close, please."
   ],
   "Закрой дверь, пожалуйста.",
   "Сначала Close, потом the door."
  ],
  [
   "Stand up, please.",
   [
    "Up stand, please.",
    "Please up stand."
   ],
   "Встань, пожалуйста.",
   "Сначала глагол Stand."
  ],
  [
   "Listen to the teacher.",
   [
    "The teacher listen to.",
    "To listen the teacher."
   ],
   "Слушай учителя.",
   "Сначала глагол Listen."
  ]
 ],
 "tf": [
  [
   "«{pencil}» — это «карандаш».",
   true,
   "Pencil — карандаш."
  ],
  [
   "«{Stand up}» значит «сядь».",
   false,
   "Stand up — встань. Сядь — sit down."
  ],
  [
   "«{board}» — это «доска».",
   true,
   "Board — доска."
  ],
  [
   "«{Close}» значит «открой».",
   false,
   "Close — закрой. Открой — open."
  ],
  [
   "«{ruler}» — это «линейка».",
   true,
   "Ruler — линейка."
  ],
  [
   "Ручкой пишут: «{pen}».",
   true,
   "Pen — ручка."
  ]
 ]
});
