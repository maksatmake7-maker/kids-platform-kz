/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Where is it? Где это?». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4prep",
 "theme": "sky",
 "groups": [
  {
   "k": "place",
   "name": "Где находится",
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
     "за"
    ],
    [
     "between",
     "между"
    ],
    [
     "next to",
     "рядом с"
    ]
   ]
  },
  {
   "k": "dir",
   "name": "Направления",
   "c": "orange",
   "words": [
    [
     "turn left",
     "поверни налево"
    ],
    [
     "turn right",
     "поверни направо"
    ],
    [
     "go straight",
     "иди прямо"
    ],
    [
     "go along",
     "иди вдоль"
    ],
    [
     "go across",
     "перейди"
    ],
    [
     "stop",
     "остановись"
    ]
   ]
  },
  {
   "k": "town",
   "name": "Места в городе",
   "c": "blue",
   "words": [
    [
     "park",
     "парк"
    ],
    [
     "shop",
     "магазин"
    ],
    [
     "bank",
     "банк"
    ],
    [
     "cinema",
     "кинотеатр"
    ],
    [
     "hospital",
     "больница"
    ],
    [
     "museum",
     "музей"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "left",
   "налево",
   "right",
   "направо"
  ],
  [
   "in front of",
   "перед",
   "behind",
   "за"
  ],
  [
   "near",
   "близко",
   "far",
   "далеко"
  ],
  [
   "up",
   "вверх",
   "down",
   "вниз"
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
   "post": " the table.",
   "ru": "Книга на столе",
   "hint": "On — на поверхности."
  },
  {
   "lv": 1,
   "q": "Кошка под кроватью.",
   "pre": "The cat is ",
   "right": "under",
   "wrong": [
    "on",
    "in"
   ],
   "post": " the bed.",
   "ru": "Кошка под кроватью",
   "hint": "Under — под."
  },
  {
   "lv": 1,
   "q": "Поверни налево.",
   "pre": "Turn ",
   "right": "left",
   "wrong": [
    "right",
    "straight"
   ],
   "post": ".",
   "ru": "Поверни налево",
   "hint": "Left — налево."
  },
  {
   "lv": 2,
   "q": "Иди прямо.",
   "pre": "Go ",
   "right": "straight",
   "wrong": [
    "left",
    "across"
   ],
   "post": ".",
   "ru": "Иди прямо",
   "hint": "Straight — прямо."
  },
  {
   "lv": 2,
   "q": "Банк рядом с парком.",
   "pre": "The bank is ",
   "right": "next to",
   "wrong": [
    "under",
    "across"
   ],
   "post": " the park.",
   "ru": "Банк рядом с парком",
   "hint": "Next to — рядом с."
  },
  {
   "lv": 2,
   "q": "Школа между магазином и парком.",
   "pre": "The school is ",
   "right": "between",
   "wrong": [
    "behind",
    "under"
   ],
   "post": " the shop and the park.",
   "ru": "Школа между магазином и парком",
   "hint": "Between — между двумя."
  },
  {
   "lv": 2,
   "q": "Мы в классе.",
   "pre": "We are ",
   "right": "in",
   "wrong": [
    "on",
    "at"
   ],
   "post": " the classroom.",
   "ru": "Мы в классе",
   "hint": "In — внутри."
  },
  {
   "lv": 3,
   "q": "Перейди дорогу.",
   "pre": "Go ",
   "right": "across",
   "wrong": [
    "along",
    "under"
   ],
   "post": " the road.",
   "ru": "Перейди дорогу",
   "hint": "Across — на другую сторону."
  },
  {
   "lv": 3,
   "q": "Иди вдоль реки.",
   "pre": "Go ",
   "right": "along",
   "wrong": [
    "across",
    "between"
   ],
   "post": " the river.",
   "ru": "Иди вдоль реки",
   "hint": "Along — вдоль."
  },
  {
   "lv": 3,
   "q": "Мы встретимся в пять часов.",
   "pre": "See you ",
   "right": "at",
   "wrong": [
    "in",
    "on"
   ],
   "post": " five o’clock.",
   "ru": "Встретимся в пять часов",
   "hint": "Точное время — at."
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
   "across",
   "через",
   "c",
   [
    "k",
    "s"
   ],
   1,
   1
  ],
  [
   "along",
   "вдоль",
   "l",
   [
    "r",
    "n"
   ],
   1,
   2
  ],
  [
   "straight",
   "прямо",
   "t",
   [
    "d",
    "l"
   ],
   1,
   2
  ],
  [
   "museum",
   "музей",
   "s",
   [
    "z",
    "c"
   ],
   2,
   2
  ],
  [
   "hospital",
   "больница",
   "p",
   [
    "b",
    "t"
   ],
   3,
   3
  ],
  [
   "cinema",
   "кинотеатр",
   "n",
   [
    "m",
    "l"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "The cat is under the bed.",
   [
    "The cat under is the bed.",
    "Is the cat under the bed."
   ],
   "Кошка под кроватью",
   "Предмет + is + где."
  ],
  [
   "Turn left at the bank.",
   [
    "Left turn at the bank.",
    "Turn at left the bank."
   ],
   "Поверни налево у банка",
   "Turn + куда + где."
  ],
  [
   "Go straight and turn right.",
   [
    "Straight go and right turn.",
    "Go and straight turn right."
   ],
   "Иди прямо и поверни направо",
   "Go straight, потом turn right."
  ],
  [
   "The park is next to the school.",
   [
    "The park next is to the school.",
    "Next to the park is school the."
   ],
   "Парк рядом со школой",
   "Предмет + is + next to + что."
  ]
 ],
 "tf": [
  [
   "«{under}» значит «под».",
   true,
   "Under — под."
  ],
  [
   "«{left}» значит «направо».",
   false,
   "Left — налево, right — направо."
  ],
  [
   "«{between}» — между двумя предметами.",
   true,
   "Between."
  ],
  [
   "«{go straight}» значит «иди прямо».",
   true,
   "Straight — прямо."
  ],
  [
   "«{across}» значит «вдоль».",
   false,
   "Across — через; along — вдоль."
  ],
  [
   "«{next to}» значит «рядом с».",
   true,
   "Next to."
  ]
 ]
});
