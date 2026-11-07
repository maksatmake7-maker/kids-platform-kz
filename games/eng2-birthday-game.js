/* Английский язык, 2 класс — «Birthday and traditions — праздники». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2birthday",
 "theme": "garden",
 "groups": [
  {
   "k": "bd",
   "name": "День рождения",
   "c": "pink",
   "words": [
    [
     "birthday",
     "день рождения"
    ],
    [
     "cake",
     "торт"
    ],
    [
     "present",
     "подарок"
    ],
    [
     "balloon",
     "воздушный шар"
    ],
    [
     "candle",
     "свеча"
    ],
    [
     "party",
     "вечеринка"
    ]
   ]
  },
  {
   "k": "hol",
   "name": "Праздники",
   "c": "orange",
   "words": [
    [
     "New Year's Day",
     "Новый год"
    ],
    [
     "Easter Day",
     "Пасха"
    ],
    [
     "Nauryz",
     "Наурыз"
    ],
    [
     "holiday",
     "праздник"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "С днём рождения!",
   "pre": "Happy ",
   "right": "birthday",
   "wrong": [
    "Easter",
    "party"
   ],
   "post": "!",
   "ru": "С днём рождения!",
   "hint": "Birthday — день рождения."
  },
  {
   "lv": 1,
   "q": "Что мы едим на дне рождения?",
   "pre": "A birthday ",
   "right": "cake",
   "wrong": [
    "balloon",
    "candle"
   ],
   "post": ".",
   "ru": "Торт.",
   "hint": "Cake — торт."
  },
  {
   "lv": 1,
   "q": "Что мы дарим?",
   "pre": "A ",
   "right": "present",
   "wrong": [
    "party",
    "cake"
   ],
   "post": ".",
   "ru": "Подарок.",
   "hint": "Present — подарок."
  },
  {
   "lv": 2,
   "q": "Я вижу воздушный шар.",
   "pre": "I can see a ",
   "right": "balloon",
   "wrong": [
    "present",
    "party"
   ],
   "post": ".",
   "ru": "Я вижу воздушный шар.",
   "hint": "Balloon — воздушный шар."
  },
  {
   "lv": 2,
   "q": "Эти яйца к Пасхе.",
   "pre": "The eggs are for ",
   "right": "Easter",
   "wrong": [
    "birthday",
    "Nauryz"
   ],
   "post": " Day.",
   "ru": "Яйца к Пасхе.",
   "hint": "Easter Day — Пасха."
  },
  {
   "lv": 3,
   "q": "Что можно увидеть?",
   "pre": "I can ",
   "right": "see",
   "wrong": [
    "sees",
    "seeing"
   ],
   "post": " a kite.",
   "ru": "Я вижу воздушного змея.",
   "hint": "После can глагол не меняется: can see."
  },
  {
   "lv": 3,
   "q": "Это для Нового года.",
   "pre": "This is ",
   "right": "for",
   "wrong": [
    "at",
    "to"
   ],
   "post": " New Year's Day.",
   "ru": "Это для Нового года.",
   "hint": "For — для."
  }
 ],
 "sound": [
  [
   "cake",
   "торт",
   "a",
   [
    "o",
    "e"
   ],
   1,
   1
  ],
  [
   "present",
   "подарок",
   "e",
   [
    "a",
    "o"
   ],
   2,
   1
  ],
  [
   "balloon",
   "воздушный шар",
   "l",
   [
    "n",
    "t"
   ],
   2,
   2
  ],
  [
   "candle",
   "свеча",
   "a",
   [
    "o",
    "e"
   ],
   1,
   2
  ]
 ],
 "order": [
  [
   "I can see a balloon.",
   [
    "I see can a balloon.",
    "Can I see balloon a."
   ],
   "Я вижу шар.",
   "Сначала I can see, потом a и предмет."
  ],
  [
   "Happy birthday!",
   [
    "Birthday happy!",
    "Happy! birthday"
   ],
   "С днём рождения!",
   "Сначала Happy, потом birthday."
  ]
 ],
 "tf": [
  [
   "«{cake}» значит «торт».",
   true,
   "Cake — торт."
  ],
  [
   "«{present}» значит «воздушный шар».",
   false,
   "Present — подарок, а шар — balloon."
  ],
  [
   "«{Happy birthday!}» говорят на дне рождения.",
   true,
   "Так поздравляют с днём рождения."
  ],
  [
   "«{New Year's Day}» значит «Новый год».",
   true,
   "New Year's Day — Новый год."
  ]
 ]
});
