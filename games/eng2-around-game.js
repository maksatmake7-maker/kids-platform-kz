/* Английский язык, 2 класс — «Around school — вокруг школы». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2around",
 "theme": "meadow",
 "groups": [
  {
   "k": "sc",
   "name": "В школе",
   "c": "green",
   "words": [
    [
     "classroom",
     "класс (комната)"
    ],
    [
     "teacher",
     "учитель"
    ],
    [
     "school",
     "школа"
    ],
    [
     "desk",
     "парта"
    ]
   ]
  },
  {
   "k": "out",
   "name": "Вокруг школы",
   "c": "orange",
   "words": [
    [
     "house",
     "дом"
    ],
    [
     "statue",
     "статуя"
    ],
    [
     "fountain",
     "фонтан"
    ],
    [
     "street",
     "улица"
    ],
    [
     "bus",
     "автобус"
    ],
    [
     "tree house",
     "домик на дереве"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Кто учит детей?",
   "pre": "A ",
   "right": "teacher",
   "wrong": [
    "house",
    "bus"
   ],
   "post": ".",
   "ru": "Учитель.",
   "hint": "Teacher — учитель."
  },
  {
   "lv": 1,
   "q": "Где ты учишься?",
   "pre": "At ",
   "right": "school",
   "wrong": [
    "street",
    "house"
   ],
   "post": ".",
   "ru": "В школе.",
   "hint": "School — школа."
  },
  {
   "lv": 1,
   "q": "По улице едет автобус.",
   "pre": "A ",
   "right": "bus",
   "wrong": [
    "statue",
    "fountain"
   ],
   "post": " is on the street.",
   "ru": "Автобус едет по улице.",
   "hint": "Bus — автобус."
  },
  {
   "lv": 2,
   "q": "Возле школы есть фонтан.",
   "pre": "There's a ",
   "right": "fountain",
   "wrong": [
    "bus",
    "teacher"
   ],
   "post": ".",
   "ru": "Есть фонтан.",
   "hint": "Fountain — фонтан."
  },
  {
   "lv": 2,
   "q": "Возле школы есть статуя.",
   "pre": "There's a ",
   "right": "statue",
   "wrong": [
    "street",
    "school"
   ],
   "post": ".",
   "ru": "Есть статуя.",
   "hint": "Statue — статуя."
  },
  {
   "lv": 3,
   "q": "Здесь много домов.",
   "pre": "There are many ",
   "right": "houses",
   "wrong": [
    "house",
    "housees"
   ],
   "post": ".",
   "ru": "Здесь много домов.",
   "hint": "У слова house множественное число — houses."
  },
  {
   "lv": 3,
   "q": "Здесь нет слона.",
   "pre": "There isn't ",
   "right": "an",
   "wrong": [
    "a",
    "two"
   ],
   "post": " elephant.",
   "ru": "Здесь нет слона.",
   "hint": "Перед гласной буквой говорим an."
  }
 ],
 "sound": [
  [
   "teacher",
   "учитель",
   "a",
   [
    "o",
    "e"
   ],
   2,
   1
  ],
  [
   "school",
   "школа",
   "h",
   [
    "t",
    "d"
   ],
   2,
   1
  ],
  [
   "street",
   "улица",
   "r",
   [
    "l",
    "n"
   ],
   2,
   2
  ],
  [
   "fountain",
   "фонтан",
   "u",
   [
    "a",
    "o"
   ],
   2,
   2
  ]
 ],
 "order": [
  [
   "There's a statue.",
   [
    "A there's statue.",
    "Statue a there's."
   ],
   "Здесь есть статуя.",
   "Сначала There's, потом a и предмет."
  ],
  [
   "There are two buses.",
   [
    "Two there are buses.",
    "Are there two buses."
   ],
   "Здесь два автобуса.",
   "Сначала There are, потом two и предмет."
  ]
 ],
 "tf": [
  [
   "«{teacher}» значит «учитель».",
   true,
   "Teacher — учитель."
  ],
  [
   "«{street}» значит «школа».",
   false,
   "Street — улица, а школа — school."
  ],
  [
   "«{fountain}» — это «фонтан».",
   true,
   "Fountain — фонтан."
  ],
  [
   "Слово «{bus}» значит «автобус».",
   true,
   "Bus — автобус."
  ]
 ]
});
