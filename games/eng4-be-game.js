/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «I am, you are, he is». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4be",
 "theme": "sky",
 "groups": [
  {
   "k": "job",
   "name": "Профессии",
   "c": "green",
   "words": [
    [
     "teacher",
     "учитель"
    ],
    [
     "doctor",
     "врач"
    ],
    [
     "driver",
     "водитель"
    ],
    [
     "cook",
     "повар"
    ],
    [
     "farmer",
     "фермер"
    ],
    [
     "nurse",
     "медсестра"
    ]
   ]
  },
  {
   "k": "country",
   "name": "Страны",
   "c": "orange",
   "words": [
    [
     "Kazakhstan",
     "Казахстан"
    ],
    [
     "Russia",
     "Россия"
    ],
    [
     "China",
     "Китай"
    ],
    [
     "England",
     "Англия"
    ],
    [
     "Turkey",
     "Турция"
    ],
    [
     "Italy",
     "Италия"
    ]
   ]
  },
  {
   "k": "feel",
   "name": "Как ты себя чувствуешь",
   "c": "blue",
   "words": [
    [
     "happy",
     "счастливый"
    ],
    [
     "sad",
     "грустный"
    ],
    [
     "tired",
     "усталый"
    ],
    [
     "hungry",
     "голодный"
    ],
    [
     "angry",
     "сердитый"
    ],
    [
     "ready",
     "готовый"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "happy",
   "счастливый",
   "sad",
   "грустный"
  ],
  [
   "young",
   "молодой",
   "old",
   "старый"
  ],
  [
   "right",
   "правильно",
   "wrong",
   "неправильно"
  ],
  [
   "here",
   "здесь",
   "there",
   "там"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я Айдар.",
   "pre": "I ",
   "right": "am",
   "wrong": [
    "is",
    "are"
   ],
   "post": " Aidar.",
   "ru": "Я Айдар",
   "hint": "С I говорим am."
  },
  {
   "lv": 1,
   "q": "Он мой друг.",
   "pre": "He ",
   "right": "is",
   "wrong": [
    "am",
    "are"
   ],
   "post": " my friend.",
   "ru": "Он мой друг",
   "hint": "С he, she, it говорим is."
  },
  {
   "lv": 1,
   "q": "Мы из Казахстана.",
   "pre": "We ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " from Kazakhstan.",
   "ru": "Мы из Казахстана",
   "hint": "С we, you, they говорим are."
  },
  {
   "lv": 1,
   "q": "Они учителя.",
   "pre": "They ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " teachers.",
   "ru": "Они учителя",
   "hint": "С they говорим are."
  },
  {
   "lv": 2,
   "q": "Ты готов?",
   "pre": "",
   "right": "Are",
   "wrong": [
    "Is",
    "Am"
   ],
   "post": " you ready?",
   "ru": "Ты готов",
   "hint": "В вопросе are ставим вперёд: Are you…?"
  },
  {
   "lv": 2,
   "q": "Она не голодна.",
   "pre": "She ",
   "right": "is not",
   "wrong": [
    "are not",
    "am not"
   ],
   "post": " hungry.",
   "ru": "Она не голодна",
   "hint": "Для отрицания добавляем not: is not."
  },
  {
   "lv": 2,
   "q": "Мне девять лет.",
   "pre": "I ",
   "right": "am",
   "wrong": [
    "have",
    "is"
   ],
   "post": " nine years old.",
   "ru": "Мне девять лет",
   "hint": "Возраст: I am … years old."
  },
  {
   "lv": 3,
   "q": "Кто твой учитель?",
   "pre": "Who ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " your teacher?",
   "ru": "Кто твой учитель",
   "hint": "Who is — кто он, кто она."
  },
  {
   "lv": 3,
   "q": "Это мои друзья.",
   "pre": "These ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " my friends.",
   "ru": "Это мои друзья",
   "hint": "Друзей много — are."
  },
  {
   "lv": 3,
   "q": "Мама дома?",
   "pre": "",
   "right": "Is",
   "wrong": [
    "Are",
    "Am"
   ],
   "post": " mum at home?",
   "ru": "Мама дома",
   "hint": "С mum говорим is: Is mum…?"
  }
 ],
 "sound": [
  [
   "teacher",
   "учитель",
   "a",
   [
    "e",
    "o"
   ],
   2,
   1
  ],
  [
   "doctor",
   "врач",
   "o",
   [
    "a",
    "e"
   ],
   1,
   1
  ],
  [
   "driver",
   "водитель",
   "v",
   [
    "b",
    "w"
   ],
   3,
   1
  ],
  [
   "happy",
   "счастливый",
   "a",
   [
    "e",
    "o"
   ],
   1,
   1
  ],
  [
   "hungry",
   "голодный",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "Italy",
   "Италия",
   "t",
   [
    "d",
    "l"
   ],
   1,
   2
  ],
  [
   "China",
   "Китай",
   "i",
   [
    "e",
    "y"
   ],
   2,
   2
  ],
  [
   "Russia",
   "Россия",
   "s",
   [
    "c",
    "z"
   ],
   2,
   2
  ],
  [
   "farmer",
   "фермер",
   "r",
   [
    "l",
    "n"
   ],
   2,
   3
  ],
  [
   "Turkey",
   "Турция",
   "k",
   [
    "c",
    "g"
   ],
   3,
   3
  ]
 ],
 "order": [
  [
   "I am nine.",
   [
    "I nine am.",
    "Am I nine."
   ],
   "Мне девять",
   "Сначала I, потом am."
  ],
  [
   "She is a teacher.",
   [
    "She a teacher is.",
    "Is she a teacher."
   ],
   "Она учитель",
   "She is + кто она."
  ],
  [
   "Are you ready?",
   [
    "You are ready?",
    "Ready are you?"
   ],
   "Ты готов",
   "Вопрос: Are + кто + какой."
  ],
  [
   "They are from China.",
   [
    "They from China are.",
    "Are they from China."
   ],
   "Они из Китая",
   "They are + откуда."
  ]
 ],
 "tf": [
  [
   "С «I» говорим «{am}».",
   true,
   "I am."
  ],
  [
   "С «he» говорим «{are}».",
   false,
   "He is."
  ],
  [
   "С «they» говорим «{are}».",
   true,
   "They are."
  ],
  [
   "«{She is}» значит «Она есть, она».",
   true,
   "She is — она …"
  ],
  [
   "Вопрос: «{Is} you ready?»",
   false,
   "Are you ready?"
  ],
  [
   "«{I am nine}» значит «Мне девять лет».",
   true,
   "Возраст: I am … years old."
  ]
 ]
});
