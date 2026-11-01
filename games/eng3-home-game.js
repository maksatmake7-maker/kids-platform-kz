/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «My home and town — дом и город». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3home",
 "theme": "workshop",
 "groups": [
  {
   "k": "room",
   "name": "Комнаты",
   "c": "green",
   "words": [
    [
     "kitchen",
     "кухня"
    ],
    [
     "bedroom",
     "спальня"
    ],
    [
     "bathroom",
     "ванная"
    ],
    [
     "living room",
     "гостиная"
    ],
    [
     "garden",
     "сад"
    ]
   ]
  },
  {
   "k": "thing",
   "name": "Вещи в доме",
   "c": "orange",
   "words": [
    [
     "bed",
     "кровать"
    ],
    [
     "table",
     "стол"
    ],
    [
     "sofa",
     "диван"
    ],
    [
     "lamp",
     "лампа"
    ],
    [
     "fridge",
     "холодильник"
    ],
    [
     "TV",
     "телевизор"
    ],
    [
     "carpet",
     "ковёр"
    ]
   ]
  },
  {
   "k": "town",
   "name": "Здания в городе",
   "c": "blue",
   "words": [
    [
     "school",
     "школа"
    ],
    [
     "shop",
     "магазин"
    ],
    [
     "hospital",
     "больница"
    ],
    [
     "park",
     "парк"
    ],
    [
     "library",
     "библиотека"
    ],
    [
     "cinema",
     "кинотеатр"
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
   "near",
   "рядом",
   "far",
   "далеко"
  ],
  [
   "left",
   "налево",
   "right",
   "направо"
  ],
  [
   "up",
   "вверх",
   "down",
   "вниз"
  ],
  [
   "open",
   "открыто",
   "closed",
   "закрыто"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я сплю в спальне.",
   "pre": "I sleep in the ",
   "right": "bedroom",
   "wrong": [
    "kitchen",
    "bathroom"
   ],
   "post": ".",
   "ru": "Я сплю в спальне.",
   "hint": "Bedroom — спальня."
  },
  {
   "lv": 1,
   "q": "Мама готовит на кухне.",
   "pre": "Mum cooks in the ",
   "right": "kitchen",
   "wrong": [
    "bedroom",
    "garden"
   ],
   "post": ".",
   "ru": "Мама готовит на кухне.",
   "hint": "Kitchen — кухня."
  },
  {
   "lv": 1,
   "q": "Я умываюсь в ванной.",
   "pre": "I wash in the ",
   "right": "bathroom",
   "wrong": [
    "kitchen",
    "garden"
   ],
   "post": ".",
   "ru": "Я умываюсь в ванной.",
   "hint": "Bathroom — ванная."
  },
  {
   "lv": 2,
   "q": "В гостиной есть диван.",
   "pre": "There ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " a sofa in the living room.",
   "ru": "В гостиной есть диван.",
   "hint": "Один предмет — there is."
  },
  {
   "lv": 2,
   "q": "В спальне две кровати.",
   "pre": "There ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " two beds in the bedroom.",
   "ru": "В спальне две кровати.",
   "hint": "Много предметов — there are."
  },
  {
   "lv": 2,
   "q": "В нашем городе есть больница.",
   "pre": "There ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " a hospital in our town.",
   "ru": "В нашем городе есть больница.",
   "hint": "Одно здание — there is."
  },
  {
   "lv": 3,
   "q": "Мы читаем книги в библиотеке.",
   "pre": "We read books in the ",
   "right": "library",
   "wrong": [
    "cinema",
    "shop"
   ],
   "post": ".",
   "ru": "Мы читаем книги в библиотеке.",
   "hint": "Library — библиотека."
  },
  {
   "lv": 3,
   "q": "Мы смотрим фильмы в кинотеатре.",
   "pre": "We watch films in the ",
   "right": "cinema",
   "wrong": [
    "hospital",
    "library"
   ],
   "post": ".",
   "ru": "Мы смотрим фильмы в кинотеатре.",
   "hint": "Cinema — кинотеатр."
  }
 ],
 "sound": [
  [
   "kitchen",
   "кухня",
   "t",
   [
    "d",
    "p"
   ],
   2,
   1
  ],
  [
   "bedroom",
   "спальня",
   "d",
   [
    "t",
    "b"
   ],
   2,
   1
  ],
  [
   "bathroom",
   "ванная",
   "h",
   [
    "r",
    "n"
   ],
   3,
   2
  ],
  [
   "sofa",
   "диван",
   "f",
   [
    "v",
    "p"
   ],
   2,
   2
  ],
  [
   "lamp",
   "лампа",
   "m",
   [
    "n",
    "l"
   ],
   2,
   2
  ],
  [
   "hospital",
   "больница",
   "s",
   [
    "z",
    "c"
   ],
   2,
   3
  ],
  [
   "library",
   "библиотека",
   "b",
   [
    "d",
    "p"
   ],
   2,
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
   "There is a lamp on the table.",
   [
    "There a lamp is on the table.",
    "Is there a lamp on the table."
   ],
   "На столе лампа.",
   "There is + предмет + место."
  ],
  [
   "Mum cooks in the kitchen.",
   [
    "Mum in the kitchen cooks.",
    "Cooks mum in the kitchen."
   ],
   "Мама готовит на кухне.",
   "Сначала кто, потом что делает."
  ],
  [
   "There are two beds in the bedroom.",
   [
    "There two beds are in the bedroom.",
    "Are there two beds in the bedroom."
   ],
   "В спальне две кровати.",
   "There are + сколько + что."
  ],
  [
   "The school is near the park.",
   [
    "The school near is the park.",
    "Is the school near the park."
   ],
   "Школа рядом с парком.",
   "Сначала The school is, потом где."
  ]
 ],
 "tf": [
  [
   "«{kitchen}» — это «кухня».",
   true,
   "Kitchen — кухня."
  ],
  [
   "«{bedroom}» — это «ванная».",
   false,
   "Bedroom — спальня, bathroom — ванная."
  ],
  [
   "В больнице работают врачи: «{hospital}».",
   true,
   "Hospital — больница."
  ],
  [
   "«{cinema}» — это «библиотека».",
   false,
   "Cinema — кинотеатр, library — библиотека."
  ],
  [
   "Про один предмет говорим «{There is}».",
   true,
   "Один предмет — there is."
  ],
  [
   "Про много предметов говорим «{There are}».",
   true,
   "Много предметов — there are."
  ]
 ]
});
