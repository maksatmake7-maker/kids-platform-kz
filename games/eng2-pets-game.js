/* Английский язык, 2 класс — «Pets — домашние питомцы». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2pets",
 "theme": "garden",
 "groups": [
  {
   "k": "pet",
   "name": "Питомцы",
   "c": "green",
   "words": [
    [
     "cat",
     "кошка"
    ],
    [
     "dog",
     "собака"
    ],
    [
     "rabbit",
     "кролик"
    ],
    [
     "parrot",
     "попугай"
    ],
    [
     "hamster",
     "хомяк"
    ]
   ]
  },
  {
   "k": "place",
   "name": "Где?",
   "c": "orange",
   "words": [
    [
     "on",
     "на"
    ],
    [
     "in",
     "в"
    ],
    [
     "under",
     "под"
    ],
    [
     "behind",
     "за, позади"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Кто говорит «мяу»?",
   "pre": "A ",
   "right": "cat",
   "wrong": [
    "dog",
    "parrot"
   ],
   "post": ".",
   "ru": "Кошка.",
   "hint": "Cat — кошка."
  },
  {
   "lv": 1,
   "q": "Кто может говорить?",
   "pre": "A ",
   "right": "parrot",
   "wrong": [
    "rabbit",
    "cat"
   ],
   "post": ".",
   "ru": "Попугай.",
   "hint": "Parrot — попугай."
  },
  {
   "lv": 1,
   "q": "Кто любит морковку?",
   "pre": "A ",
   "right": "rabbit",
   "wrong": [
    "dog",
    "hamster"
   ],
   "post": ".",
   "ru": "Кролик.",
   "hint": "Rabbit — кролик."
  },
  {
   "lv": 2,
   "q": "Кролик на столе.",
   "pre": "There's a rabbit ",
   "right": "on",
   "wrong": [
    "in",
    "under"
   ],
   "post": " the desk.",
   "ru": "Кролик на парте.",
   "hint": "On — на."
  },
  {
   "lv": 2,
   "q": "Попугай в ванной.",
   "pre": "A parrot is ",
   "right": "in",
   "wrong": [
    "on",
    "under"
   ],
   "post": " the bathroom.",
   "ru": "Попугай в ванной.",
   "hint": "In — в."
  },
  {
   "lv": 3,
   "q": "Кошка под кроватью.",
   "pre": "The cat is ",
   "right": "under",
   "wrong": [
    "on",
    "in"
   ],
   "post": " the bed.",
   "ru": "Кошка под кроватью.",
   "hint": "Under — под."
  },
  {
   "lv": 3,
   "q": "Два попугая на парте.",
   "pre": "There are two ",
   "right": "parrots",
   "wrong": [
    "parrot",
    "parrots'"
   ],
   "post": " on the desk.",
   "ru": "Два попугая.",
   "hint": "Если питомцев два, добавляем s."
  }
 ],
 "sound": [
  [
   "rabbit",
   "кролик",
   "b",
   [
    "d",
    "p"
   ],
   2,
   1
  ],
  [
   "parrot",
   "попугай",
   "a",
   [
    "o",
    "e"
   ],
   1,
   1
  ],
  [
   "hamster",
   "хомяк",
   "a",
   [
    "o",
    "e"
   ],
   1,
   2
  ],
  [
   "under",
   "под",
   "e",
   [
    "a",
    "o"
   ],
   3,
   2
  ]
 ],
 "order": [
  [
   "The cat is on the bed.",
   [
    "The on cat is bed.",
    "Cat the bed is on."
   ],
   "Кошка на кровати.",
   "Сначала The cat is, потом on the bed."
  ],
  [
   "There's a parrot on the desk.",
   [
    "A there's parrot on the desk.",
    "There's on the desk a parrot."
   ],
   "На парте попугай.",
   "Сначала There's a parrot, потом on the desk."
  ]
 ],
 "tf": [
  [
   "«{parrot}» значит «попугай».",
   true,
   "Parrot — попугай."
  ],
  [
   "«{rabbit}» значит «кошка».",
   false,
   "Rabbit — кролик, а кошка — cat."
  ],
  [
   "«{under}» значит «под».",
   true,
   "Under — под."
  ],
  [
   "«{in}» значит «на».",
   false,
   "In — в, а «на» — on."
  ]
 ]
});
