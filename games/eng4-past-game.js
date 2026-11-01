/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Was / were — было, были». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4past",
 "theme": "autumn",
 "groups": [
  {
   "k": "time",
   "name": "Когда это было",
   "c": "green",
   "words": [
    [
     "yesterday",
     "вчера"
    ],
    [
     "last week",
     "на прошлой неделе"
    ],
    [
     "last year",
     "в прошлом году"
    ],
    [
     "two days ago",
     "два дня назад"
    ],
    [
     "then",
     "тогда"
    ],
    [
     "in 2020",
     "в 2020 году"
    ]
   ]
  },
  {
   "k": "where",
   "name": "Где мы были",
   "c": "orange",
   "words": [
    [
     "at home",
     "дома"
    ],
    [
     "at school",
     "в школе"
    ],
    [
     "at the zoo",
     "в зоопарке"
    ],
    [
     "in the park",
     "в парке"
    ],
    [
     "at the cinema",
     "в кино"
    ],
    [
     "on holiday",
     "в отпуске"
    ]
   ]
  },
  {
   "k": "feel",
   "name": "Каким это было",
   "c": "blue",
   "words": [
    [
     "good",
     "хороший"
    ],
    [
     "bad",
     "плохой"
    ],
    [
     "great",
     "отличный"
    ],
    [
     "boring",
     "скучный"
    ],
    [
     "interesting",
     "интересный"
    ],
    [
     "funny",
     "смешной"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "was",
   "был",
   "were",
   "были"
  ],
  [
   "today",
   "сегодня",
   "yesterday",
   "вчера"
  ],
  [
   "now",
   "сейчас",
   "then",
   "тогда"
  ],
  [
   "happy",
   "счастливый",
   "sad",
   "грустный"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Вчера я был дома.",
   "pre": "Yesterday I ",
   "right": "was",
   "wrong": [
    "were",
    "am"
   ],
   "post": " at home.",
   "ru": "Вчера я был дома",
   "hint": "I → was."
  },
  {
   "lv": 1,
   "q": "Они были в парке.",
   "pre": "They ",
   "right": "were",
   "wrong": [
    "was",
    "are"
   ],
   "post": " in the park.",
   "ru": "Они были в парке",
   "hint": "They → were."
  },
  {
   "lv": 1,
   "q": "Она была в школе.",
   "pre": "She ",
   "right": "was",
   "wrong": [
    "were",
    "is"
   ],
   "post": " at school.",
   "ru": "Она была в школе",
   "hint": "She → was."
  },
  {
   "lv": 2,
   "q": "Мы были в зоопарке.",
   "pre": "We ",
   "right": "were",
   "wrong": [
    "was",
    "are"
   ],
   "post": " at the zoo.",
   "ru": "Мы были в зоопарке",
   "hint": "We → were."
  },
  {
   "lv": 2,
   "q": "Фильм был интересный.",
   "pre": "The film ",
   "right": "was",
   "wrong": [
    "were",
    "is"
   ],
   "post": " interesting.",
   "ru": "Фильм был интересный",
   "hint": "Один предмет — was."
  },
  {
   "lv": 2,
   "q": "Он не был дома.",
   "pre": "He ",
   "right": "wasn’t",
   "wrong": [
    "weren’t",
    "isn’t"
   ],
   "post": " at home.",
   "ru": "Он не был дома",
   "hint": "Отрицание: wasn’t."
  },
  {
   "lv": 3,
   "q": "Ты вчера был в школе?",
   "pre": "",
   "right": "Were",
   "wrong": [
    "Was",
    "Are"
   ],
   "post": " you at school yesterday?",
   "ru": "Ты вчера был в школе",
   "hint": "С you → were."
  },
  {
   "lv": 3,
   "q": "Где ты была вчера?",
   "pre": "Where ",
   "right": "were",
   "wrong": [
    "was",
    "are"
   ],
   "post": " you yesterday?",
   "ru": "Где ты была вчера",
   "hint": "С you → were."
  },
  {
   "lv": 3,
   "q": "Дети были в кино.",
   "pre": "The children ",
   "right": "were",
   "wrong": [
    "was",
    "is"
   ],
   "post": " at the cinema.",
   "ru": "Дети были в кино",
   "hint": "Много — were."
  }
 ],
 "sound": [
  [
   "yesterday",
   "вчера",
   "t",
   [
    "d",
    "l"
   ],
   3,
   1
  ],
  [
   "was",
   "был",
   "a",
   [
    "e",
    "o"
   ],
   1,
   1
  ],
  [
   "were",
   "были",
   "r",
   [
    "l",
    "n"
   ],
   2,
   1
  ],
  [
   "zoo",
   "зоопарк",
   "o",
   [
    "a",
    "u"
   ],
   1,
   1
  ],
  [
   "holiday",
   "отпуск",
   "l",
   [
    "r",
    "n"
   ],
   2,
   2
  ],
  [
   "cinema",
   "кино",
   "n",
   [
    "m",
    "l"
   ],
   2,
   2
  ],
  [
   "boring",
   "скучный",
   "r",
   [
    "l",
    "n"
   ],
   2,
   2
  ],
  [
   "interesting",
   "интересный",
   "t",
   [
    "d",
    "l"
   ],
   2,
   3
  ],
  [
   "weren’t",
   "не были",
   "r",
   [
    "l",
    "n"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "I was at home.",
   [
    "I at home was.",
    "Was I at home."
   ],
   "Я был дома",
   "I was + где."
  ],
  [
   "They were in the park.",
   [
    "They in the park were.",
    "Were they in the park."
   ],
   "Они были в парке",
   "They were + где."
  ],
  [
   "Were you at school?",
   [
    "You were at school?",
    "At school you were?"
   ],
   "Ты был в школе",
   "Вопрос: Were + you + где."
  ],
  [
   "The film was great.",
   [
    "The film great was.",
    "Was the film great."
   ],
   "Фильм был отличный",
   "Предмет + was + какой."
  ]
 ],
 "tf": [
  [
   "С «I» говорим «{was}».",
   true,
   "I was."
  ],
  [
   "С «they» говорим «{was}».",
   false,
   "They were."
  ],
  [
   "«{yesterday}» значит «вчера».",
   true,
   "Yesterday."
  ],
  [
   "«{wasn’t}» значит «не был».",
   true,
   "Wasn’t."
  ],
  [
   "«{were}» — это «был» (один человек).",
   false,
   "Were — были; was — был."
  ],
  [
   "Вопрос: «{Was} you at home?»",
   false,
   "Were you at home?"
  ]
 ]
});
