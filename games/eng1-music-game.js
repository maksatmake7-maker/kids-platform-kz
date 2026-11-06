/* Английский язык, 1 класс (пререквизит A1: слова и фразы по темам программы). Барсик объясняет по-русски, английские слова звучат английским голосом (в казахском отделении звук выключен). Тексты проверяет Максат. */
ENG3.define({
 "key": "eng1music",
 "theme": "sky",
 "groups": [
  {
   "k": "inst",
   "name": "Музыкальные инструменты",
   "c": "purple",
   "words": [
    [
     "trumpet",
     "труба"
    ],
    [
     "guitar",
     "гитара"
    ],
    [
     "drum",
     "барабан"
    ],
    [
     "piano",
     "пианино"
    ],
    [
     "recorder",
     "блокфлейта"
    ]
   ]
  },
  {
   "k": "act",
   "name": "Что я делаю",
   "c": "orange",
   "words": [
    [
     "sing",
     "петь"
    ],
    [
     "skip",
     "прыгать со скакалкой"
    ],
    [
     "jump",
     "прыгать"
    ],
    [
     "dance",
     "танцевать"
    ]
   ]
  }
 ],
 "pairs": [],
 "fills": [
  {
   "lv": 1,
   "q": "Я умею играть на барабане.",
   "pre": "I can play the ",
   "right": "drum",
   "wrong": [
    "guitar",
    "piano"
   ],
   "post": ".",
   "ru": "Я умею играть на барабане.",
   "hint": "Drum — барабан."
  },
  {
   "lv": 1,
   "q": "Я умею играть на гитаре.",
   "pre": "I can play the ",
   "right": "guitar",
   "wrong": [
    "drum",
    "trumpet"
   ],
   "post": ".",
   "ru": "Я умею играть на гитаре.",
   "hint": "Guitar — гитара."
  },
  {
   "lv": 1,
   "q": "Я умею играть на пианино.",
   "pre": "I can play the ",
   "right": "piano",
   "wrong": [
    "drum",
    "recorder"
   ],
   "post": ".",
   "ru": "Я умею играть на пианино.",
   "hint": "Piano — пианино."
  },
  {
   "lv": 2,
   "q": "Я умею играть на барабане.",
   "pre": "I ",
   "right": "can",
   "wrong": [
    "am",
    "is"
   ],
   "post": " play the drum.",
   "ru": "Я умею играть на барабане.",
   "hint": "I can — я умею."
  },
  {
   "lv": 2,
   "q": "Я умею петь.",
   "pre": "I can ",
   "right": "sing",
   "wrong": [
    "skip",
    "drum"
   ],
   "post": ".",
   "ru": "Я умею петь.",
   "hint": "Sing — петь."
  },
  {
   "lv": 3,
   "q": "Я умею прыгать со скакалкой.",
   "pre": "I can ",
   "right": "skip",
   "wrong": [
    "sing",
    "drum"
   ],
   "post": ".",
   "ru": "Я умею прыгать со скакалкой.",
   "hint": "Skip — прыгать со скакалкой."
  }
 ],
 "sound": [
  [
   "drum",
   "барабан",
   "r",
   [
    "l",
    "n"
   ],
   1,
   1
  ],
  [
   "piano",
   "пианино",
   "n",
   [
    "m",
    "l"
   ],
   2,
   2
  ],
  [
   "sing",
   "петь",
   "i",
   [
    "a",
    "o"
   ],
   1,
   1
  ]
 ],
 "order": [
  [
   "I can play the drum.",
   [
    "Can I play the drum.",
    "I play can the drum."
   ],
   "Я умею играть на барабане.",
   "Сначала I can, потом play the и инструмент."
  ],
  [
   "I can sing.",
   [
    "Can I sing.",
    "Sing I can."
   ],
   "Я умею петь.",
   "Сначала I can, потом что умею."
  ]
 ],
 "tf": [
  [
   "«{guitar}» — это «гитара».",
   true,
   "Guitar — гитара."
  ],
  [
   "«{drum}» — это «пианино».",
   false,
   "Drum — барабан, piano — пианино."
  ],
  [
   "«{trumpet}» — это «труба».",
   true,
   "Trumpet — труба."
  ],
  [
   "«{I can sing}» значит «Я умею петь».",
   true,
   "I can — я умею."
  ],
  [
   "«{recorder}» — это музыкальный инструмент.",
   true,
   "Recorder — блокфлейта."
  ]
 ]
});
