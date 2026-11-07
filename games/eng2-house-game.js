/* Английский язык, 2 класс — «Things in a house — дом». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2house",
 "theme": "garden",
 "groups": [
  {
   "k": "rooms",
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
     "living room",
     "гостиная"
    ],
    [
     "bathroom",
     "ванная"
    ],
    [
     "garden",
     "сад"
    ]
   ]
  },
  {
   "k": "things",
   "name": "Предметы",
   "c": "orange",
   "words": [
    [
     "tree house",
     "домик на дереве"
    ],
    [
     "chair",
     "стул"
    ],
    [
     "table",
     "стол"
    ],
    [
     "radio",
     "радио"
    ],
    [
     "bed",
     "кровать"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Где ты готовишь еду?",
   "pre": "In the ",
   "right": "kitchen",
   "wrong": [
    "bedroom",
    "garden"
   ],
   "post": ".",
   "ru": "На кухне.",
   "hint": "Kitchen — кухня."
  },
  {
   "lv": 1,
   "q": "Где ты спишь?",
   "pre": "In the ",
   "right": "bedroom",
   "wrong": [
    "bathroom",
    "kitchen"
   ],
   "post": ".",
   "ru": "В спальне.",
   "hint": "Bedroom — спальня."
  },
  {
   "lv": 1,
   "q": "Где растут цветы?",
   "pre": "In the ",
   "right": "garden",
   "wrong": [
    "kitchen",
    "bedroom"
   ],
   "post": ".",
   "ru": "В саду.",
   "hint": "Garden — сад."
  },
  {
   "lv": 2,
   "q": "Лили в саду?",
   "pre": "Is Lilly in the ",
   "right": "garden",
   "wrong": [
    "kitchen",
    "bath"
   ],
   "post": "?",
   "ru": "Лили в саду?",
   "hint": "Garden — сад."
  },
  {
   "lv": 2,
   "q": "Да, она там.",
   "pre": "Yes, she ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": ".",
   "ru": "Да, она там.",
   "hint": "С she говорим is."
  },
  {
   "lv": 2,
   "q": "Нет, её там нет.",
   "pre": "No, she ",
   "right": "isn't",
   "wrong": [
    "aren't",
    "am not"
   ],
   "post": ".",
   "ru": "Нет, её там нет.",
   "hint": "Isn't — это is not."
  },
  {
   "lv": 3,
   "q": "Это стул.",
   "pre": "It's a ",
   "right": "chair",
   "wrong": [
    "table",
    "radio"
   ],
   "post": ".",
   "ru": "Это стул.",
   "hint": "Chair — стул."
  },
  {
   "lv": 3,
   "q": "Где Чарли?",
   "pre": "Where ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " Charlie?",
   "ru": "Где Чарли?",
   "hint": "С Charlie говорим is."
  }
 ],
 "sound": [
  [
   "kitchen",
   "кухня",
   "i",
   [
    "a",
    "e"
   ],
   1,
   1
  ],
  [
   "bedroom",
   "спальня",
   "e",
   [
    "a",
    "i"
   ],
   1,
   1
  ],
  [
   "chair",
   "стул",
   "a",
   [
    "o",
    "e"
   ],
   2,
   2
  ],
  [
   "table",
   "стол",
   "b",
   [
    "d",
    "p"
   ],
   2,
   2
  ]
 ],
 "order": [
  [
   "Where's Charlie?",
   [
    "Charlie where's?",
    "Where Charlie's?"
   ],
   "Где Чарли?",
   "Сначала Where's, потом имя."
  ],
  [
   "He's in the kitchen.",
   [
    "He's the in kitchen.",
    "In the he's kitchen."
   ],
   "Он на кухне.",
   "Сначала He's, потом in the и комната."
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
   "Bedroom — спальня, а ванная — bathroom."
  ],
  [
   "В «{garden}» можно играть на улице.",
   true,
   "Garden — сад."
  ],
  [
   "«{living room}» — это «гостиная».",
   true,
   "Living room — гостиная."
  ]
 ]
});
