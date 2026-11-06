/* Английский язык, 1 класс (пререквизит A1: слова и фразы по темам программы). Барсик объясняет по-русски, английские слова звучат английским голосом (в казахском отделении звук выключен). Тексты проверяет Максат. */
ENG3.define({
 "key": "eng1room",
 "theme": "meadow",
 "groups": [
  {
   "k": "furn",
   "name": "Мебель и техника",
   "c": "blue",
   "words": [
    [
     "bed",
     "кровать"
    ],
    [
     "chair",
     "стул"
    ],
    [
     "TV",
     "телевизор"
    ],
    [
     "table",
     "стол"
    ],
    [
     "desk",
     "парта"
    ]
   ]
  },
  {
   "k": "toy",
   "name": "Игрушки",
   "c": "orange",
   "words": [
    [
     "doll",
     "кукла"
    ],
    [
     "kite",
     "воздушный змей"
    ],
    [
     "bike",
     "велосипед"
    ],
    [
     "car",
     "машина"
    ],
    [
     "plane",
     "самолёт"
    ],
    [
     "train",
     "поезд"
    ]
   ]
  }
 ],
 "pairs": [],
 "fills": [
  {
   "lv": 1,
   "q": "Это моя кровать.",
   "pre": "This is my ",
   "right": "bed",
   "wrong": [
    "chair",
    "table"
   ],
   "post": ".",
   "ru": "Это моя кровать.",
   "hint": "Bed — кровать."
  },
  {
   "lv": 1,
   "q": "У меня есть воздушный змей.",
   "pre": "I've got a ",
   "right": "kite",
   "wrong": [
    "doll",
    "train"
   ],
   "post": ".",
   "ru": "У меня есть воздушный змей.",
   "hint": "Kite — воздушный змей."
  },
  {
   "lv": 1,
   "q": "У меня есть машина.",
   "pre": "I've got a ",
   "right": "car",
   "wrong": [
    "bike",
    "plane"
   ],
   "post": ".",
   "ru": "У меня есть машина.",
   "hint": "Car — машина."
  },
  {
   "lv": 2,
   "q": "Посмотри на кровать.",
   "pre": "Look at the ",
   "right": "bed",
   "wrong": [
    "kite",
    "doll"
   ],
   "post": ".",
   "ru": "Посмотри на кровать.",
   "hint": "Look at — посмотри на."
  },
  {
   "lv": 2,
   "q": "У меня есть змей.",
   "pre": "I've ",
   "right": "got",
   "wrong": [
    "get",
    "is"
   ],
   "post": " a kite.",
   "ru": "У меня есть змей.",
   "hint": "I've got — у меня есть."
  },
  {
   "lv": 3,
   "q": "Это моя кровать.",
   "pre": "This ",
   "right": "is",
   "wrong": [
    "am",
    "are"
   ],
   "post": " my bed.",
   "ru": "Это моя кровать.",
   "hint": "С This говорим is."
  }
 ],
 "sound": [
  [
   "bed",
   "кровать",
   "e",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "car",
   "машина",
   "a",
   [
    "o",
    "e"
   ],
   1,
   1
  ],
  [
   "doll",
   "кукла",
   "o",
   [
    "a",
    "e"
   ],
   1,
   2
  ],
  [
   "train",
   "поезд",
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
   "This is my bed.",
   [
    "Bed this is my.",
    "Is this my bed."
   ],
   "Это моя кровать.",
   "Сначала This is, потом my и предмет."
  ],
  [
   "I've got a kite.",
   [
    "Got I've a kite.",
    "I've a got kite."
   ],
   "У меня есть змей.",
   "Сначала I've got, потом a и предмет."
  ],
  [
   "Look at the bed.",
   [
    "At look the bed.",
    "The bed look at."
   ],
   "Посмотри на кровать.",
   "Сначала Look at, потом the и предмет."
  ]
 ],
 "tf": [
  [
   "«{doll}» — это «кукла».",
   true,
   "Doll — кукла."
  ],
  [
   "«{plane}» — это «поезд».",
   false,
   "Plane — самолёт, train — поезд."
  ],
  [
   "«{kite}» — это «воздушный змей».",
   true,
   "Kite — воздушный змей."
  ],
  [
   "«{I've got a bike}» значит «У меня есть велосипед».",
   true,
   "I've got — у меня есть."
  ],
  [
   "«{chair}» — это «стол».",
   false,
   "Chair — стул, table — стол."
  ]
 ]
});
