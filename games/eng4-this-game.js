/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «This, that, these, those». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4this",
 "theme": "garden",
 "groups": [
  {
   "k": "subj",
   "name": "Кто (подлежащее)",
   "c": "green",
   "words": [
    [
     "I",
     "я"
    ],
    [
     "you",
     "ты, вы"
    ],
    [
     "he",
     "он"
    ],
    [
     "she",
     "она"
    ],
    [
     "it",
     "оно"
    ],
    [
     "we",
     "мы"
    ],
    [
     "they",
     "они"
    ]
   ]
  },
  {
   "k": "obj",
   "name": "Кого, кому",
   "c": "orange",
   "words": [
    [
     "me",
     "меня, мне"
    ],
    [
     "you",
     "тебя, тебе"
    ],
    [
     "him",
     "его, ему"
    ],
    [
     "her",
     "её, ей"
    ],
    [
     "us",
     "нас, нам"
    ],
    [
     "them",
     "их, им"
    ]
   ]
  },
  {
   "k": "poss",
   "name": "Чей: мой, твой",
   "c": "blue",
   "words": [
    [
     "my",
     "мой"
    ],
    [
     "your",
     "твой"
    ],
    [
     "his",
     "его"
    ],
    [
     "her",
     "её"
    ],
    [
     "our",
     "наш"
    ],
    [
     "their",
     "их"
    ],
    [
     "mine",
     "мой"
    ],
    [
     "yours",
     "твой"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "this",
   "этот",
   "that",
   "тот"
  ],
  [
   "these",
   "эти",
   "those",
   "те"
  ],
  [
   "here",
   "здесь",
   "there",
   "там"
  ],
  [
   "mine",
   "мой",
   "yours",
   "твой"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Это мой карандаш (рядом).",
   "pre": "",
   "right": "This",
   "wrong": [
    "These",
    "Those"
   ],
   "post": " is my pencil.",
   "ru": "Это мой карандаш",
   "hint": "This — этот (один рядом)."
  },
  {
   "lv": 1,
   "q": "Те дома далеко.",
   "pre": "",
   "right": "Those",
   "wrong": [
    "This",
    "That"
   ],
   "post": " houses are far.",
   "ru": "Те дома далеко",
   "hint": "Those — те (много, далеко)."
  },
  {
   "lv": 1,
   "q": "Эти книги интересные.",
   "pre": "",
   "right": "These",
   "wrong": [
    "This",
    "That"
   ],
   "post": " books are interesting.",
   "ru": "Эти книги интересные",
   "hint": "These — эти (много, рядом)."
  },
  {
   "lv": 2,
   "q": "Дай мне, пожалуйста, эту ручку.",
   "pre": "Give ",
   "right": "me",
   "wrong": [
    "I",
    "my"
   ],
   "post": " the pen, please.",
   "ru": "Дай мне ручку",
   "hint": "После глагола — me (меня, мне)."
  },
  {
   "lv": 2,
   "q": "Это наш класс.",
   "pre": "This is ",
   "right": "our",
   "wrong": [
    "we",
    "us"
   ],
   "post": " class.",
   "ru": "Это наш класс",
   "hint": "Our — наш; we — мы."
  },
  {
   "lv": 2,
   "q": "Эта сумка — моя.",
   "pre": "This bag is ",
   "right": "mine",
   "wrong": [
    "my",
    "me"
   ],
   "post": ".",
   "ru": "Эта сумка моя",
   "hint": "Mine — мой (без существительного)."
  },
  {
   "lv": 2,
   "q": "Мы любим её.",
   "pre": "We like ",
   "right": "her",
   "wrong": [
    "she",
    "hers"
   ],
   "post": ".",
   "ru": "Мы любим её",
   "hint": "После глагола — her."
  },
  {
   "lv": 3,
   "q": "Та книга твоя?",
   "pre": "Is that book ",
   "right": "yours",
   "wrong": [
    "you",
    "your"
   ],
   "post": "?",
   "ru": "Та книга твоя",
   "hint": "Yours — твой (без существительного)."
  },
  {
   "lv": 3,
   "q": "Он любит их.",
   "pre": "He likes ",
   "right": "them",
   "wrong": [
    "they",
    "their"
   ],
   "post": ".",
   "ru": "Он любит их",
   "hint": "После глагола — them."
  },
  {
   "lv": 3,
   "q": "Они помогают нам.",
   "pre": "They help ",
   "right": "us",
   "wrong": [
    "we",
    "our"
   ],
   "post": ".",
   "ru": "Они помогают нам",
   "hint": "После глагола — us."
  }
 ],
 "sound": [
  [
   "these",
   "эти",
   "h",
   [
    "c",
    "s"
   ],
   1,
   1
  ],
  [
   "those",
   "те",
   "o",
   [
    "a",
    "u"
   ],
   2,
   1
  ],
  [
   "there",
   "там",
   "r",
   [
    "l",
    "n"
   ],
   3,
   1
  ],
  [
   "they",
   "они",
   "h",
   [
    "r",
    "n"
   ],
   1,
   1
  ],
  [
   "them",
   "их",
   "h",
   [
    "r",
    "n"
   ],
   1,
   1
  ],
  [
   "mine",
   "мой",
   "i",
   [
    "e",
    "a"
   ],
   1,
   2
  ],
  [
   "yours",
   "твой",
   "u",
   [
    "a",
    "o"
   ],
   2,
   2
  ],
  [
   "their",
   "их",
   "e",
   [
    "a",
    "i"
   ],
   2,
   2
  ],
  [
   "our",
   "наш",
   "u",
   [
    "a",
    "o"
   ],
   1,
   3
  ],
  [
   "her",
   "её",
   "e",
   [
    "a",
    "i"
   ],
   1,
   3
  ]
 ],
 "order": [
  [
   "This is my pencil.",
   [
    "This my is pencil.",
    "Is this my pencil."
   ],
   "Это мой карандаш",
   "This is + что это."
  ],
  [
   "Those books are mine.",
   [
    "Those are mine books.",
    "Mine those books are."
   ],
   "Те книги мои",
   "Предмет + are + чьи."
  ],
  [
   "Give me the pen.",
   [
    "Give I the pen.",
    "Me give the pen."
   ],
   "Дай мне ручку",
   "Give me + что."
  ],
  [
   "Is that bag yours?",
   [
    "That is bag yours?",
    "Yours that bag is?"
   ],
   "Та сумка твоя",
   "Вопрос: Is + предмет + чей."
  ]
 ],
 "tf": [
  [
   "«{This}» — этот предмет рядом.",
   true,
   "This — этот."
  ],
  [
   "«{Those}» — это один предмет.",
   false,
   "Those — те (много)."
  ],
  [
   "«{me}» значит «меня, мне».",
   true,
   "Me — меня, мне."
  ],
  [
   "После глагола ставим «{they}».",
   false,
   "После глагола — them."
  ],
  [
   "«{mine}» значит «мой» (без слова после).",
   true,
   "This pencil is mine."
  ],
  [
   "«{your}» и «{yours}» — одно и то же.",
   false,
   "Your book / the book is yours."
  ]
 ]
});
