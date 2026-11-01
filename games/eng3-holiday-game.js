/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «Holidays and transport». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3holiday",
 "theme": "autumn",
 "groups": [
  {
   "k": "hol",
   "name": "Праздники",
   "c": "orange",
   "words": [
    [
     "Nauryz",
     "Наурыз"
    ],
    [
     "birthday",
     "день рождения"
    ],
    [
     "New Year",
     "Новый год"
    ],
    [
     "holiday",
     "праздник, каникулы"
    ],
    [
     "party",
     "вечеринка"
    ],
    [
     "Independence Day",
     "День Независимости"
    ]
   ]
  },
  {
   "k": "gift",
   "name": "Подарки и угощение",
   "c": "pink",
   "words": [
    [
     "present",
     "подарок"
    ],
    [
     "cake",
     "торт"
    ],
    [
     "card",
     "открытка"
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
     "flowers",
     "цветы"
    ]
   ]
  },
  {
   "k": "trans",
   "name": "Транспорт",
   "c": "blue",
   "words": [
    [
     "car",
     "машина"
    ],
    [
     "bus",
     "автобус"
    ],
    [
     "train",
     "поезд"
    ],
    [
     "plane",
     "самолёт"
    ],
    [
     "bike",
     "велосипед"
    ],
    [
     "boat",
     "лодка"
    ],
    [
     "taxi",
     "такси"
    ],
    [
     "ship",
     "корабль"
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
    "holiday",
    "morning"
   ],
   "post": " to you!",
   "ru": "С днём рождения!",
   "hint": "Happy birthday — с днём рождения."
  },
  {
   "lv": 1,
   "q": "С Новым годом!",
   "pre": "Happy New ",
   "right": "Year",
   "wrong": [
    "Day",
    "Night"
   ],
   "post": "!",
   "ru": "С Новым годом!",
   "hint": "New Year — Новый год."
  },
  {
   "lv": 1,
   "q": "Я дарю маме подарок.",
   "pre": "I give my mum a ",
   "right": "present",
   "wrong": [
    "train",
    "taxi"
   ],
   "post": ".",
   "ru": "Я дарю маме подарок.",
   "hint": "Present — подарок."
  },
  {
   "lv": 1,
   "q": "Я хожу в школу на автобусе.",
   "pre": "I go to school ",
   "right": "by",
   "wrong": [
    "on",
    "at"
   ],
   "post": " bus.",
   "ru": "Я хожу в школу на автобусе.",
   "hint": "By bus — на автобусе."
  },
  {
   "lv": 2,
   "q": "Мы едем в Алматы на поезде.",
   "pre": "We go to Almaty ",
   "right": "by",
   "wrong": [
    "in",
    "at"
   ],
   "post": " train.",
   "ru": "Мы едем в Алматы на поезде.",
   "hint": "By train — на поезде."
  },
  {
   "lv": 2,
   "q": "Наурыз отмечают весной.",
   "pre": "Nauryz is in ",
   "right": "spring",
   "wrong": [
    "winter",
    "autumn"
   ],
   "post": ".",
   "ru": "Наурыз отмечают весной.",
   "hint": "Spring — весна."
  },
  {
   "lv": 2,
   "q": "Давай поедем на автобусе!",
   "pre": "Let's ",
   "right": "go",
   "wrong": [
    "going",
    "goes"
   ],
   "post": " by bus!",
   "ru": "Давай поедем на автобусе!",
   "hint": "После Let's глагол без изменений."
  },
  {
   "lv": 3,
   "q": "Мы летим на самолёте.",
   "pre": "We go ",
   "right": "by",
   "wrong": [
    "in",
    "at"
   ],
   "post": " plane.",
   "ru": "Мы летим на самолёте.",
   "hint": "By plane — на самолёте."
  },
  {
   "lv": 3,
   "q": "Я люблю путешествовать на поезде.",
   "pre": "I like ",
   "right": "travelling",
   "wrong": [
    "travel",
    "travels"
   ],
   "post": " by train.",
   "ru": "Я люблю путешествовать на поезде.",
   "hint": "После like глагол с -ing."
  }
 ],
 "sound": [
  [
   "birthday",
   "день рождения",
   "r",
   [
    "l",
    "n"
   ],
   2,
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
   "party",
   "вечеринка",
   "r",
   [
    "l",
    "n"
   ],
   2,
   1
  ],
  [
   "holiday",
   "праздник",
   "l",
   [
    "r",
    "n"
   ],
   2,
   2
  ],
  [
   "balloon",
   "воздушный шар",
   "l",
   [
    "r",
    "n"
   ],
   2,
   2
  ],
  [
   "train",
   "поезд",
   "a",
   [
    "e",
    "o"
   ],
   2,
   2
  ],
  [
   "plane",
   "самолёт",
   "l",
   [
    "r",
    "n"
   ],
   1,
   3
  ],
  [
   "taxi",
   "такси",
   "x",
   [
    "s",
    "z"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "Happy birthday to you!",
   [
    "Birthday happy to you!",
    "Happy to birthday you!"
   ],
   "С днём рождения!",
   "Сначала Happy, потом birthday."
  ],
  [
   "I go to school by bus.",
   [
    "I go to school bus by.",
    "I by bus go to school."
   ],
   "Я хожу в школу на автобусе.",
   "By bus стоит в конце."
  ],
  [
   "Nauryz is a spring holiday.",
   [
    "Nauryz a spring is holiday.",
    "Is Nauryz a spring holiday."
   ],
   "Наурыз — весенний праздник.",
   "Сначала Nauryz is."
  ],
  [
   "I give her a present.",
   [
    "I give a present her.",
    "Give I her a present."
   ],
   "Я дарю ей подарок.",
   "Сначала I give, потом кому, потом что."
  ]
 ],
 "tf": [
  [
   "«{Nauryz}» — весенний праздник.",
   true,
   "Nauryz отмечают весной."
  ],
  [
   "«{plane}» — это «поезд».",
   false,
   "Plane — самолёт, train — поезд."
  ],
  [
   "«{birthday}» — это «день рождения».",
   true,
   "Birthday — день рождения."
  ],
  [
   "На автобусе — «{by bus}».",
   true,
   "By + транспорт."
  ],
  [
   "«{present}» — это «открытка».",
   false,
   "Present — подарок, card — открытка."
  ],
  [
   "«{Happy birthday}» говорят в день рождения.",
   true,
   "Так поздравляют."
  ]
 ]
});
