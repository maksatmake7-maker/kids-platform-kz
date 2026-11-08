/* Английский язык, 2 класс — «My things — мои вещи». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2things",
 "theme": "garden",
 "groups": [
  {
   "k": "toys",
   "name": "Игрушки",
   "c": "green",
   "words": [
    [
     "ball",
     "мяч"
    ],
    [
     "robot",
     "робот"
    ],
    [
     "doll",
     "кукла"
    ],
    [
     "kite",
     "воздушный змей"
    ],
    [
     "skateboard",
     "скейтборд"
    ]
   ]
  },
  {
   "k": "tech",
   "name": "Техника",
   "c": "orange",
   "words": [
    [
     "computer",
     "компьютер"
    ],
    [
     "camera",
     "фотоаппарат"
    ],
    [
     "watch",
     "часы"
    ],
    [
     "radio",
     "радио"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Это мяч.",
   "pre": "It's a ",
   "right": "ball",
   "wrong": [
    "robot",
    "doll"
   ],
   "post": ".",
   "ru": "Это мяч.",
   "hint": "Ball — мяч."
  },
  {
   "lv": 1,
   "q": "Это робот.",
   "pre": "It's a ",
   "right": "robot",
   "wrong": [
    "ball",
    "kite"
   ],
   "post": ".",
   "ru": "Это робот.",
   "hint": "Robot — робот."
  },
  {
   "lv": 1,
   "q": "Это компьютер.",
   "pre": "It's a ",
   "right": "computer",
   "wrong": [
    "camera",
    "watch"
   ],
   "post": ".",
   "ru": "Это компьютер.",
   "hint": "Computer — компьютер."
  },
  {
   "lv": 2,
   "q": "Это мяч Гульнары. Он рядом.",
   "pre": "This ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " Gulnara's ball.",
   "ru": "Это мяч Гульнары.",
   "hint": "This — этот (рядом)."
  },
  {
   "lv": 2,
   "q": "Это камеры Айдара. Они рядом.",
   "pre": "These ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " Aidar's cameras.",
   "ru": "Это камеры Айдара.",
   "hint": "These — эти (рядом, много)."
  },
  {
   "lv": 3,
   "q": "Тот робот далеко.",
   "pre": "That ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " a robot.",
   "ru": "Тот — робот.",
   "hint": "That — тот (далеко)."
  },
  {
   "lv": 3,
   "q": "Те мячи далеко.",
   "pre": "Those ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " balls.",
   "ru": "Те — мячи.",
   "hint": "Those — те (далеко, много)."
  },
  {
   "lv": 3,
   "q": "Он из Италии.",
   "pre": "It's ",
   "right": "from",
   "wrong": [
    "to",
    "at"
   ],
   "post": " Italy.",
   "ru": "Он из Италии.",
   "hint": "From — из, откуда."
  }
 ],
 "sound": [
  [
   "ball",
   "мяч",
   "a",
   [
    "o",
    "e"
   ],
   1,
   1
  ],
  [
   "robot",
   "робот",
   "o",
   [
    "a",
    "e"
   ],
   1,
   1
  ],
  [
   "camera",
   "фотоаппарат",
   "m",
   [
    "n",
    "r"
   ],
   2,
   2
  ],
  [
   "computer",
   "компьютер",
   "u",
   [
    "a",
    "o"
   ],
   4,
   2
  ]
 ],
 "order": [
  [
   "This is my robot.",
   [
    "Is this my robot.",
    "My this is robot."
   ],
   "Это мой робот.",
   "Сначала This is, потом my и предмет."
  ],
  [
   "They're from Mexico.",
   [
    "From they're Mexico.",
    "Mexico they're from."
   ],
   "Они из Мексики.",
   "Сначала They're, потом from и страна."
  ]
 ],
 "tf": [
  [
   "«{ball}» значит «мяч».",
   true,
   "Ball — мяч."
  ],
  [
   "«{watch}» значит «мяч».",
   false,
   "Watch — часы, а мяч — ball."
  ],
  [
   "«{This}» говорим про то, что рядом.",
   true,
   "This — этот, рядом."
  ],
  [
   "«{Those}» говорим про многих далёких предметов.",
   true,
   "Those — те, далеко."
  ]
 ]
});
