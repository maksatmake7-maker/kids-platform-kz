/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «My body — моё тело». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3body",
 "theme": "garden",
 "groups": [
  {
   "k": "head",
   "name": "Голова",
   "c": "green",
   "words": [
    [
     "head",
     "голова"
    ],
    [
     "eyes",
     "глаза"
    ],
    [
     "ears",
     "уши"
    ],
    [
     "nose",
     "нос"
    ],
    [
     "mouth",
     "рот"
    ],
    [
     "hair",
     "волосы"
    ],
    [
     "teeth",
     "зубы"
    ],
    [
     "face",
     "лицо"
    ]
   ]
  },
  {
   "k": "body",
   "name": "Тело",
   "c": "orange",
   "words": [
    [
     "arm",
     "рука"
    ],
    [
     "hand",
     "кисть"
    ],
    [
     "finger",
     "палец"
    ],
    [
     "leg",
     "нога"
    ],
    [
     "foot",
     "ступня"
    ],
    [
     "knee",
     "колено"
    ],
    [
     "back",
     "спина"
    ],
    [
     "tummy",
     "живот"
    ]
   ]
  },
  {
   "k": "sense",
   "name": "Что мы делаем",
   "c": "blue",
   "words": [
    [
     "see",
     "видеть"
    ],
    [
     "hear",
     "слышать"
    ],
    [
     "smell",
     "нюхать"
    ],
    [
     "taste",
     "пробовать"
    ],
    [
     "touch",
     "трогать"
    ],
    [
     "speak",
     "говорить"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я смотрю глазами.",
   "pre": "I see with my ",
   "right": "eyes",
   "wrong": [
    "ears",
    "nose"
   ],
   "post": ".",
   "ru": "Я смотрю глазами.",
   "hint": "Eyes — глаза."
  },
  {
   "lv": 1,
   "q": "Я слышу ушами.",
   "pre": "I hear with my ",
   "right": "ears",
   "wrong": [
    "eyes",
    "hands"
   ],
   "post": ".",
   "ru": "Я слышу ушами.",
   "hint": "Ears — уши."
  },
  {
   "lv": 1,
   "q": "Я нюхаю носом.",
   "pre": "I smell with my ",
   "right": "nose",
   "wrong": [
    "mouth",
    "knee"
   ],
   "post": ".",
   "ru": "Я нюхаю носом.",
   "hint": "Nose — нос."
  },
  {
   "lv": 2,
   "q": "Я чищу зубы каждый день.",
   "pre": "I clean my ",
   "right": "teeth",
   "wrong": [
    "tooths",
    "teeths"
   ],
   "post": " every day.",
   "ru": "Я чищу зубы каждый день.",
   "hint": "Teeth — зубы (один — tooth)."
  },
  {
   "lv": 2,
   "q": "У неё две ноги (ступни).",
   "pre": "She has got two ",
   "right": "feet",
   "wrong": [
    "foots",
    "feets"
   ],
   "post": ".",
   "ru": "У неё две ступни.",
   "hint": "Foot — ступня, feet — ступни."
  },
  {
   "lv": 2,
   "q": "У меня есть голова.",
   "pre": "I ",
   "right": "have got",
   "wrong": [
    "has got",
    "is got"
   ],
   "post": " a head.",
   "ru": "У меня есть голова.",
   "hint": "С I говорим have got."
  },
  {
   "lv": 3,
   "q": "У него десять пальцев.",
   "pre": "He has got ten ",
   "right": "fingers",
   "wrong": [
    "finger",
    "fingeres"
   ],
   "post": ".",
   "ru": "У него десять пальцев.",
   "hint": "Fingers — много пальцев."
  },
  {
   "lv": 3,
   "q": "У неё два глаза.",
   "pre": "She has got two ",
   "right": "eyes",
   "wrong": [
    "eye",
    "eyess"
   ],
   "post": ".",
   "ru": "У неё два глаза.",
   "hint": "Eyes — много глаз."
  }
 ],
 "sound": [
  [
   "head",
   "голова",
   "e",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "nose",
   "нос",
   "s",
   [
    "z",
    "c"
   ],
   2,
   1
  ],
  [
   "mouth",
   "рот",
   "u",
   [
    "a",
    "o"
   ],
   2,
   1
  ],
  [
   "hand",
   "кисть",
   "n",
   [
    "m",
    "l"
   ],
   2,
   1
  ],
  [
   "finger",
   "палец",
   "g",
   [
    "k",
    "j"
   ],
   3,
   2
  ],
  [
   "knee",
   "колено",
   "n",
   [
    "m",
    "l"
   ],
   1,
   2
  ],
  [
   "teeth",
   "зубы",
   "t",
   [
    "d",
    "p"
   ],
   3,
   3
  ],
  [
   "tummy",
   "живот",
   "m",
   [
    "n",
    "b"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "I have got two eyes.",
   [
    "I got have two eyes.",
    "Have I got two eyes."
   ],
   "У меня два глаза.",
   "Сначала I have got, потом сколько."
  ],
  [
   "Touch your nose.",
   [
    "Your nose touch.",
    "Nose touch your."
   ],
   "Дотронься до носа.",
   "Сначала глагол Touch."
  ],
  [
   "Open your mouth.",
   [
    "Your mouth open.",
    "Mouth open your."
   ],
   "Открой рот.",
   "Сначала глагол Open."
  ],
  [
   "My hands are clean.",
   [
    "My hands clean are.",
    "Are my hands clean."
   ],
   "Мои руки чистые.",
   "Сначала My hands, потом are."
  ]
 ],
 "tf": [
  [
   "«{eyes}» — это «глаза».",
   true,
   "Eyes — глаза."
  ],
  [
   "«{foot}» во множественном числе — «{foots}».",
   false,
   "Foot — feet."
  ],
  [
   "«{tooth}» во множественном числе — «{teeth}».",
   true,
   "Tooth — teeth."
  ],
  [
   "Слышат «{ears}».",
   true,
   "Ears — уши."
  ],
  [
   "«{nose}» — это «рот».",
   false,
   "Nose — нос, mouth — рот."
  ],
  [
   "«{hand}» — это «рука (кисть)».",
   true,
   "Hand — кисть руки."
  ]
 ]
});
