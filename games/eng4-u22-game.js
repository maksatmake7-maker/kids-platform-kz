/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Good and bad — что такое хорошо и что такое плохо». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u22",
 "theme": "autumn",
 "groups": [
  {
   "k": "do",
   "name": "Так нужно",
   "c": "green",
   "words": [
    [
     "be quiet",
     "быть тихим"
    ],
    [
     "stay in your seat",
     "сидеть на месте"
    ],
    [
     "be on time",
     "приходить вовремя"
    ],
    [
     "wear a uniform",
     "носить форму"
    ],
    [
     "listen",
     "слушать"
    ],
    [
     "raise your hand",
     "поднять руку"
    ]
   ]
  },
  {
   "k": "dont",
   "name": "Так нельзя",
   "c": "orange",
   "words": [
    [
     "shout",
     "кричать"
    ],
    [
     "make noise",
     "шуметь"
    ],
    [
     "drop litter",
     "бросать мусор"
    ],
    [
     "chew gum",
     "жевать жвачку"
    ],
    [
     "run",
     "бегать"
    ],
    [
     "be late",
     "опаздывать"
    ]
   ]
  },
  {
   "k": "baby",
   "name": "Малыш",
   "c": "blue",
   "words": [
    [
     "smile",
     "улыбаться"
    ],
    [
     "cry",
     "плакать"
    ],
    [
     "crawl",
     "ползать"
    ],
    [
     "sleep",
     "спать"
    ],
    [
     "drink milk",
     "пить молоко"
    ],
    [
     "laugh",
     "смеяться"
    ]
   ]
  },
  {
   "k": "mod",
   "name": "Можно и нужно",
   "c": "green",
   "words": [
    [
     "must",
     "должен"
    ],
    [
     "mustn't",
     "нельзя"
    ],
    [
     "can",
     "могу, можно"
    ],
    [
     "can't",
     "не могу, нельзя"
    ],
    [
     "Can I…?",
     "Можно мне…?"
    ],
    [
     "Yes, you can.",
     "Да, можно."
    ]
   ]
  },
  {
   "k": "beh",
   "name": "Поведение",
   "c": "orange",
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
     "polite",
     "вежливый"
    ],
    [
     "rude",
     "грубый"
    ],
    [
     "kind",
     "добрый"
    ],
    [
     "helpful",
     "готовый помочь"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "good",
   "хороший",
   "bad",
   "плохой"
  ],
  [
   "polite",
   "вежливый",
   "rude",
   "грубый"
  ],
  [
   "quiet",
   "тихий",
   "noisy",
   "шумный"
  ],
  [
   "clean",
   "чистый",
   "dirty",
   "грязный"
  ],
  [
   "on time",
   "вовремя",
   "late",
   "поздно"
  ],
  [
   "can",
   "можно",
   "can't",
   "нельзя"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Ты должен быть тихим.",
   "pre": "You ",
   "right": "must",
   "wrong": [
    "mustn't",
    "are"
   ],
   "post": " be quiet.",
   "ru": "Ты должен быть тихим",
   "hint": "Must — должен."
  },
  {
   "lv": 1,
   "q": "Нельзя кричать.",
   "pre": "You ",
   "right": "mustn't",
   "wrong": [
    "must",
    "are"
   ],
   "post": " shout.",
   "ru": "Нельзя кричать",
   "hint": "Mustn't — нельзя."
  },
  {
   "lv": 1,
   "q": "Можно мне войти?",
   "pre": "",
   "right": "Can",
   "wrong": [
    "Must",
    "Are"
   ],
   "post": " I come in?",
   "ru": "Можно мне войти?",
   "hint": "Can I…? — просим разрешения."
  },
  {
   "lv": 1,
   "q": "Да, можно.",
   "pre": "Yes, you ",
   "right": "can",
   "wrong": [
    "must",
    "do"
   ],
   "post": ".",
   "ru": "Да, можно",
   "hint": "Разрешаем: Yes, you can."
  },
  {
   "lv": 1,
   "q": "Нет, нельзя.",
   "pre": "No, you ",
   "right": "can't",
   "wrong": [
    "can",
    "do"
   ],
   "post": ".",
   "ru": "Нет, нельзя",
   "hint": "Не разрешаем: No, you can't."
  },
  {
   "lv": 1,
   "q": "Это яблоко.",
   "pre": "This is ",
   "right": "an",
   "wrong": [
    "a",
    "two"
   ],
   "post": " apple.",
   "ru": "Это яблоко",
   "hint": "Перед гласным звуком — an."
  },
  {
   "lv": 1,
   "q": "Это парта.",
   "pre": "This is ",
   "right": "a",
   "wrong": [
    "an",
    "two"
   ],
   "post": " desk.",
   "ru": "Это парта",
   "hint": "Перед согласным звуком — a."
  },
  {
   "lv": 2,
   "q": "Нельзя бросать мусор.",
   "pre": "You ",
   "right": "mustn't",
   "wrong": [
    "must",
    "can"
   ],
   "post": " drop litter.",
   "ru": "Нельзя бросать мусор",
   "hint": "Mustn't — нельзя."
  },
  {
   "lv": 2,
   "q": "Дана должна приходить вовремя.",
   "pre": "Dana must ",
   "right": "be",
   "wrong": [
    "is",
    "are"
   ],
   "post": " on time.",
   "ru": "Дана должна приходить вовремя",
   "hint": "После must — глагол без изменений: be."
  },
  {
   "lv": 2,
   "q": "Мы должны носить форму.",
   "pre": "We ",
   "right": "must",
   "wrong": [
    "mustn't",
    "are"
   ],
   "post": " wear a uniform.",
   "ru": "Мы должны носить форму",
   "hint": "Must — должны."
  },
  {
   "lv": 2,
   "q": "Берику нельзя жевать жвачку на уроке.",
   "pre": "Berik ",
   "right": "mustn't",
   "wrong": [
    "must",
    "can"
   ],
   "post": " chew gum in class.",
   "ru": "Берику нельзя жевать жвачку на уроке",
   "hint": "Mustn't — нельзя, глагол без -s."
  },
  {
   "lv": 2,
   "q": "Можно мне задать вопрос?",
   "pre": "",
   "right": "Can",
   "wrong": [
    "Must",
    "Is"
   ],
   "post": " I ask a question?",
   "ru": "Можно мне задать вопрос?",
   "hint": "Can I…? — можно мне?"
  },
  {
   "lv": 2,
   "q": "Столица Казахстана — Астана.",
   "pre": "",
   "right": "The",
   "wrong": [
    "A",
    "An"
   ],
   "post": " capital of Kazakhstan is Astana.",
   "ru": "Столица Казахстана — Астана",
   "hint": "The — когда это единственный, известный предмет."
  },
  {
   "lv": 2,
   "q": "Маленький малыш умеет плакать.",
   "pre": "A baby ",
   "right": "can",
   "wrong": [
    "can't",
    "mustn't"
   ],
   "post": " cry.",
   "ru": "Малыш умеет плакать",
   "hint": "Can — умеет."
  },
  {
   "lv": 3,
   "q": "Маленький малыш не умеет читать.",
   "pre": "A little baby ",
   "right": "can't",
   "wrong": [
    "can",
    "must"
   ],
   "post": " read.",
   "ru": "Малыш не умеет читать",
   "hint": "Can't — не умеет."
  },
  {
   "lv": 3,
   "q": "Ученики должны сидеть на местах.",
   "pre": "Pupils ",
   "right": "must",
   "wrong": [
    "mustn't",
    "can't"
   ],
   "post": " stay in their seats.",
   "ru": "Ученики должны сидеть на местах",
   "hint": "Must — обязанность."
  },
  {
   "lv": 3,
   "q": "На флаге есть орёл.",
   "pre": "There is ",
   "right": "an",
   "wrong": [
    "a",
    "two"
   ],
   "post": " eagle on the flag.",
   "ru": "На флаге есть орёл",
   "hint": "Eagle начинается с гласного звука — an."
  },
  {
   "lv": 3,
   "q": "Аян не должен шуметь.",
   "pre": "Ayan ",
   "right": "mustn't",
   "wrong": [
    "must",
    "isn't"
   ],
   "post": " make noise.",
   "ru": "Аяну нельзя шуметь",
   "hint": "После mustn't — глагол без -s и без to."
  },
  {
   "lv": 3,
   "q": "Это хорошее поведение.",
   "pre": "It is ",
   "right": "good",
   "wrong": [
    "goods",
    "well"
   ],
   "post": " behaviour.",
   "ru": "Это хорошее поведение",
   "hint": "Перед словом behaviour нужно описание — good."
  }
 ],
 "sound": [
  [
   "noise",
   "шум",
   "n",
   [
    "m",
    "l"
   ],
   0,
   1
  ],
  [
   "gum",
   "жвачка",
   "g",
   [
    "j",
    "q"
   ],
   0,
   1
  ],
  [
   "seat",
   "место",
   "t",
   [
    "d",
    "p"
   ],
   3,
   1
  ],
  [
   "quiet",
   "тихий",
   "q",
   [
    "k",
    "g"
   ],
   0,
   2
  ],
  [
   "uniform",
   "форма",
   "f",
   [
    "v",
    "t"
   ],
   3,
   2
  ],
  [
   "shout",
   "кричать",
   "h",
   [
    "k",
    "s"
   ],
   1,
   2
  ],
  [
   "litter",
   "мусор",
   "l",
   [
    "r",
    "i"
   ],
   0,
   2
  ],
  [
   "desk",
   "парта",
   "k",
   [
    "c",
    "g"
   ],
   3,
   3
  ],
  [
   "baby",
   "малыш",
   "y",
   [
    "i",
    "e"
   ],
   3,
   3
  ]
 ],
 "order": [
  [
   "You must be quiet.",
   [
    "You must quiet be.",
    "You must is quiet."
   ],
   "Ты должен быть тихим",
   "Must + be + слово."
  ],
  [
   "You mustn't shout.",
   [
    "You mustn't shouts.",
    "You not must shout."
   ],
   "Тебе нельзя кричать",
   "Mustn't + глагол без изменений."
  ],
  [
   "Can I come in?",
   [
    "I can come in?",
    "Can come I in?"
   ],
   "Можно мне войти?",
   "В вопросе can идёт первым."
  ],
  [
   "Yes, you can.",
   [
    "Yes, you can't.",
    "Yes, can you."
   ],
   "Да, можно",
   "Короткий ответ: Yes, you can."
  ],
  [
   "No, you can't.",
   [
    "No, you can.",
    "No, can't you."
   ],
   "Нет, нельзя",
   "Короткий ответ: No, you can't."
  ],
  [
   "We must wear a uniform.",
   [
    "We must wears a uniform.",
    "We must to wear a uniform."
   ],
   "Мы должны носить форму",
   "После must нет to и нет -s."
  ],
  [
   "Dana must be on time.",
   [
    "Dana must is on time.",
    "Dana musts be on time."
   ],
   "Дана должна приходить вовремя",
   "Must не меняется."
  ],
  [
   "A baby can smile.",
   [
    "A baby can smiles.",
    "A baby smile can."
   ],
   "Малыш умеет улыбаться",
   "Can + глагол без изменений."
  ],
  [
   "I have an apple.",
   [
    "I have a apple.",
    "I have apple an."
   ],
   "У меня есть яблоко",
   "Перед гласным звуком — an."
  ],
  [
   "Berik mustn't chew gum.",
   [
    "Berik mustn't chews gum.",
    "Berik not must chew gum."
   ],
   "Берику нельзя жевать жвачку",
   "Mustn't + глагол без -s."
  ]
 ],
 "tf": [
  [
   "«{must}» значит «должен».",
   true,
   "Must — должен."
  ],
  [
   "«{mustn't}» значит «можно».",
   false,
   "Mustn't — нельзя; можно — can."
  ],
  [
   "Чтобы попросить разрешения, говорим «{Can I come in?}».",
   true,
   "Can I…? — можно мне…?"
  ],
  [
   "«{shout}» значит «шептать».",
   false,
   "Shout — кричать."
  ],
  [
   "«{drop litter}» значит «бросать мусор».",
   true,
   "Drop litter — бросать мусор."
  ],
  [
   "Перед гласным звуком ставим «{an}»: «an apple».",
   true,
   "An apple."
  ],
  [
   "«a umbrella» — правильно.",
   false,
   "Umbrella начинается с гласного звука: an umbrella."
  ],
  [
   "«{be on time}» значит «опаздывать».",
   false,
   "Be on time — приходить вовремя."
  ],
  [
   "Ответ «{Yes, you can.}» значит «Да, можно».",
   true,
   "Yes, you can — разрешаем."
  ],
  [
   "«You {mustn't} shout» значит «Ты должен кричать».",
   false,
   "Mustn't — нельзя."
  ],
  [
   "Новорождённый малыш умеет ходить: «A newborn baby {can} walk».",
   false,
   "Новорождённый не умеет ходить: can't."
  ],
  [
   "«{chew gum}» значит «жевать жвачку».",
   true,
   "Chew gum — жевать жвачку."
  ],
  [
   "«{quiet}» значит «шумный».",
   false,
   "Quiet — тихий; noisy — шумный."
  ]
 ]
});
