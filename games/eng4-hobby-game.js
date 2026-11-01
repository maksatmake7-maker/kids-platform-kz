/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Hobbies — увлечения». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4hobby",
 "theme": "autumn",
 "groups": [
  {
   "k": "act",
   "name": "Занятия",
   "c": "green",
   "words": [
    [
     "reading",
     "чтение"
    ],
    [
     "drawing",
     "рисование"
    ],
    [
     "swimming",
     "плавание"
    ],
    [
     "dancing",
     "танцы"
    ],
    [
     "cycling",
     "катание на велосипеде"
    ],
    [
     "skating",
     "катание на коньках"
    ]
   ]
  },
  {
   "k": "sport",
   "name": "Спорт",
   "c": "orange",
   "words": [
    [
     "football",
     "футбол"
    ],
    [
     "tennis",
     "теннис"
    ],
    [
     "chess",
     "шахматы"
    ],
    [
     "volleyball",
     "волейбол"
    ],
    [
     "karate",
     "каратэ"
    ],
    [
     "judo",
     "дзюдо"
    ]
   ]
  },
  {
   "k": "say",
   "name": "Нравится",
   "c": "blue",
   "words": [
    [
     "like",
     "нравится"
    ],
    [
     "love",
     "обожаю"
    ],
    [
     "enjoy",
     "получаю удовольствие"
    ],
    [
     "hate",
     "ненавижу"
    ],
    [
     "want",
     "хочу"
    ],
    [
     "would like",
     "хотел бы"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "like",
   "любить",
   "hate",
   "ненавидеть"
  ],
  [
   "win",
   "выигрывать",
   "lose",
   "проигрывать"
  ],
  [
   "fast",
   "быстрый",
   "slow",
   "медленный"
  ],
  [
   "easy",
   "лёгкий",
   "difficult",
   "трудный"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я люблю читать.",
   "pre": "I like ",
   "right": "reading",
   "wrong": [
    "read",
    "reads"
   ],
   "post": ".",
   "ru": "Я люблю читать",
   "hint": "После like глагол с -ing."
  },
  {
   "lv": 1,
   "q": "Она любит танцевать.",
   "pre": "She ",
   "right": "likes",
   "wrong": [
    "like",
    "liking"
   ],
   "post": " dancing.",
   "ru": "Она любит танцевать",
   "hint": "С she — likes."
  },
  {
   "lv": 1,
   "q": "Мы любим плавать.",
   "pre": "We ",
   "right": "like",
   "wrong": [
    "likes",
    "liking"
   ],
   "post": " swimming.",
   "ru": "Мы любим плавать",
   "hint": "С we — like."
  },
  {
   "lv": 2,
   "q": "Я хожу плавать.",
   "pre": "I go ",
   "right": "swimming",
   "wrong": [
    "swim",
    "swims"
   ],
   "post": ".",
   "ru": "Я хожу плавать",
   "hint": "Go + глагол с -ing."
  },
  {
   "lv": 2,
   "q": "Он хочет играть в футбол.",
   "pre": "He ",
   "right": "wants",
   "wrong": [
    "want",
    "wanting"
   ],
   "post": " to play football.",
   "ru": "Он хочет играть в футбол",
   "hint": "С he — wants."
  },
  {
   "lv": 2,
   "q": "Мне нравится рисовать.",
   "pre": "I enjoy ",
   "right": "drawing",
   "wrong": [
    "draw",
    "draws"
   ],
   "post": ".",
   "ru": "Мне нравится рисовать",
   "hint": "После enjoy глагол с -ing."
  },
  {
   "lv": 3,
   "q": "Я учусь, чтобы стать врачом.",
   "pre": "I study ",
   "right": "to",
   "wrong": [
    "for",
    "by"
   ],
   "post": " be a doctor.",
   "ru": "Я учусь, чтобы стать врачом",
   "hint": "Цель — to + глагол."
  },
  {
   "lv": 3,
   "q": "Мы ходим кататься на велосипедах.",
   "pre": "We go ",
   "right": "cycling",
   "wrong": [
    "cycle",
    "cycles"
   ],
   "post": ".",
   "ru": "Мы ходим кататься на велосипедах",
   "hint": "Go + глагол с -ing."
  },
  {
   "lv": 3,
   "q": "Она хотела бы поиграть в теннис.",
   "pre": "She ",
   "right": "would like",
   "wrong": [
    "like",
    "wants"
   ],
   "post": " to play tennis.",
   "ru": "Она хотела бы поиграть в теннис",
   "hint": "Would like to — хотел бы."
  }
 ],
 "sound": [
  [
   "reading",
   "чтение",
   "a",
   [
    "e",
    "o"
   ],
   2,
   1
  ],
  [
   "drawing",
   "рисование",
   "w",
   [
    "v",
    "u"
   ],
   3,
   1
  ],
  [
   "cycling",
   "велосипед",
   "c",
   [
    "k",
    "s"
   ],
   2,
   1
  ],
  [
   "skating",
   "коньки",
   "k",
   [
    "c",
    "q"
   ],
   1,
   1
  ],
  [
   "chess",
   "шахматы",
   "e",
   [
    "a",
    "i"
   ],
   2,
   1
  ],
  [
   "tennis",
   "теннис",
   "n",
   [
    "m",
    "l"
   ],
   2,
   2
  ],
  [
   "karate",
   "каратэ",
   "r",
   [
    "l",
    "n"
   ],
   2,
   2
  ],
  [
   "volleyball",
   "волейбол",
   "y",
   [
    "i",
    "e"
   ],
   5,
   2
  ],
  [
   "swimming",
   "плавание",
   "w",
   [
    "v",
    "u"
   ],
   1,
   3
  ]
 ],
 "order": [
  [
   "I like reading.",
   [
    "I reading like.",
    "I like read."
   ],
   "Я люблю читать",
   "I like + глагол с -ing."
  ],
  [
   "She goes swimming.",
   [
    "She go swimming.",
    "She goes swim."
   ],
   "Она ходит плавать",
   "She goes + глагол с -ing."
  ],
  [
   "He wants to play.",
   [
    "He wants play.",
    "He want to play."
   ],
   "Он хочет играть",
   "Wants + to + глагол."
  ],
  [
   "We enjoy dancing.",
   [
    "We enjoy dance.",
    "We dancing enjoy."
   ],
   "Мы любим танцевать",
   "Enjoy + глагол с -ing."
  ]
 ],
 "tf": [
  [
   "После «{like}» глагол ставим с «-ing»: «I like {swimming}».",
   true,
   "Like + -ing."
  ],
  [
   "«{go swimming}» значит «ходить плавать».",
   true,
   "Go swimming."
  ],
  [
   "«{hate}» значит «обожаю».",
   false,
   "Hate — ненавижу; love — обожаю."
  ],
  [
   "«{would like}» значит «хотел бы».",
   true,
   "Would like."
  ],
  [
   "«{enjoy}» значит «ненавижу».",
   false,
   "Enjoy — получаю удовольствие."
  ],
  [
   "«I want {to} play» — правильно.",
   true,
   "Want + to + глагол."
  ]
 ]
});
