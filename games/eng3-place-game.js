/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «Where is it? Где находится?». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3place",
 "theme": "sky",
 "groups": [
  {
   "k": "prep",
   "name": "Предлоги места",
   "c": "green",
   "words": [
    [
     "in",
     "в"
    ],
    [
     "on",
     "на"
    ],
    [
     "under",
     "под"
    ],
    [
     "behind",
     "за, позади"
    ],
    [
     "between",
     "между"
    ],
    [
     "near",
     "рядом"
    ]
   ]
  },
  {
   "k": "point",
   "name": "Указатели",
   "c": "orange",
   "words": [
    [
     "this",
     "этот"
    ],
    [
     "that",
     "тот"
    ],
    [
     "these",
     "эти"
    ],
    [
     "those",
     "те"
    ],
    [
     "here",
     "здесь"
    ],
    [
     "there",
     "там"
    ]
   ]
  },
  {
   "k": "has",
   "name": "Есть / имеется",
   "c": "blue",
   "words": [
    [
     "there is",
     "есть (один предмет)"
    ],
    [
     "there are",
     "есть (много предметов)"
    ],
    [
     "have got",
     "у меня есть"
    ],
    [
     "has got",
     "у него есть"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "here",
   "здесь",
   "there",
   "там"
  ],
  [
   "this",
   "этот",
   "that",
   "тот"
  ],
  [
   "these",
   "эти",
   "those",
   "те"
  ],
  [
   "in",
   "в",
   "out",
   "вне"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Книга лежит на столе.",
   "pre": "The book is ",
   "right": "on",
   "wrong": [
    "in",
    "under"
   ],
   "post": " the desk.",
   "ru": "Книга на столе.",
   "hint": "On — на."
  },
  {
   "lv": 1,
   "q": "Кошка сидит под столом.",
   "pre": "The cat is ",
   "right": "under",
   "wrong": [
    "on",
    "in"
   ],
   "post": " the table.",
   "ru": "Кошка под столом.",
   "hint": "Under — под."
  },
  {
   "lv": 1,
   "q": "Ручка лежит в портфеле.",
   "pre": "The pen is ",
   "right": "in",
   "wrong": [
    "on",
    "under"
   ],
   "post": " the bag.",
   "ru": "Ручка в портфеле.",
   "hint": "In — в."
  },
  {
   "lv": 1,
   "q": "На парте одна книга.",
   "pre": "There ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " a book on the desk.",
   "ru": "На парте книга.",
   "hint": "Один предмет — there is."
  },
  {
   "lv": 2,
   "q": "В портфеле две книги.",
   "pre": "There ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " two books in the bag.",
   "ru": "В портфеле две книги.",
   "hint": "Много предметов — there are."
  },
  {
   "lv": 2,
   "q": "Это моя линейка.",
   "pre": "This ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " my ruler.",
   "ru": "Это моя линейка.",
   "hint": "This is — это (один предмет)."
  },
  {
   "lv": 2,
   "q": "Это мои книги.",
   "pre": "These ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " my books.",
   "ru": "Это мои книги.",
   "hint": "These are — это (много предметов)."
  },
  {
   "lv": 3,
   "q": "Школа рядом с парком.",
   "pre": "The school is ",
   "right": "near",
   "wrong": [
    "under",
    "in"
   ],
   "post": " the park.",
   "ru": "Школа рядом с парком.",
   "hint": "Near — рядом."
  },
  {
   "lv": 3,
   "q": "У меня есть новый портфель.",
   "pre": "I ",
   "right": "have got",
   "wrong": [
    "has got",
    "is got"
   ],
   "post": " a new bag.",
   "ru": "У меня есть новый портфель.",
   "hint": "С I говорим have got."
  },
  {
   "lv": 3,
   "q": "У неё есть красная ручка.",
   "pre": "She ",
   "right": "has got",
   "wrong": [
    "have got",
    "is got"
   ],
   "post": " a red pen.",
   "ru": "У неё есть красная ручка.",
   "hint": "С she говорим has got."
  }
 ],
 "sound": [
  [
   "under",
   "под",
   "d",
   [
    "t",
    "b"
   ],
   2,
   1
  ],
  [
   "behind",
   "за",
   "h",
   [
    "n",
    "d"
   ],
   2,
   1
  ],
  [
   "between",
   "между",
   "w",
   [
    "v",
    "r"
   ],
   3,
   1
  ],
  [
   "there",
   "там",
   "h",
   [
    "r",
    "n"
   ],
   1,
   1
  ],
  [
   "these",
   "эти",
   "s",
   [
    "c",
    "z"
   ],
   3,
   2
  ],
  [
   "those",
   "те",
   "o",
   [
    "a",
    "u"
   ],
   2,
   2
  ],
  [
   "near",
   "рядом",
   "e",
   [
    "a",
    "o"
   ],
   1,
   2
  ],
  [
   "front",
   "перед",
   "r",
   [
    "l",
    "n"
   ],
   1,
   3
  ]
 ],
 "order": [
  [
   "There is a book on the desk.",
   [
    "There a book is on the desk.",
    "Is there a book on the desk."
   ],
   "На парте книга.",
   "There is + предмет + место."
  ],
  [
   "The pen is in the bag.",
   [
    "The pen in is the bag.",
    "Is the pen in the bag."
   ],
   "Ручка в портфеле.",
   "Сначала предмет, потом is, потом место."
  ],
  [
   "This is my bag.",
   [
    "This my is bag.",
    "Is this my bag."
   ],
   "Это мой портфель.",
   "This is + что это."
  ],
  [
   "These are my books.",
   [
    "These my are books.",
    "Are these my books."
   ],
   "Это мои книги.",
   "These are + что это."
  ]
 ],
 "tf": [
  [
   "«{in}» значит «в».",
   true,
   "In — в."
  ],
  [
   "«{under}» значит «на».",
   false,
   "Under — под, on — на."
  ],
  [
   "С одним предметом говорим «There {is}».",
   true,
   "Один предмет — there is."
  ],
  [
   "Со многими предметами говорим «There {is}».",
   false,
   "Много предметов — there are."
  ],
  [
   "«{these}» — для нескольких предметов рядом.",
   true,
   "These — эти."
  ],
  [
   "«{behind}» значит «перед».",
   false,
   "Behind — за, in front of — перед."
  ]
 ]
});
