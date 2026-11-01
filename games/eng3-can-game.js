/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «I can! Я умею». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3can",
 "theme": "play",
 "groups": [
  {
   "k": "act",
   "name": "Что я умею",
   "c": "green",
   "words": [
    [
     "run",
     "бегать"
    ],
    [
     "jump",
     "прыгать"
    ],
    [
     "swim",
     "плавать"
    ],
    [
     "dance",
     "танцевать"
    ],
    [
     "sing",
     "петь"
    ],
    [
     "draw",
     "рисовать"
    ]
   ]
  },
  {
   "k": "sport",
   "name": "Спорт",
   "c": "blue",
   "words": [
    [
     "football",
     "футбол"
    ],
    [
     "basketball",
     "баскетбол"
    ],
    [
     "tennis",
     "теннис"
    ],
    [
     "swimming",
     "плавание"
    ],
    [
     "volleyball",
     "волейбол"
    ],
    [
     "chess",
     "шахматы"
    ]
   ]
  },
  {
   "k": "toy",
   "name": "Игрушки",
   "c": "orange",
   "words": [
    [
     "ball",
     "мяч"
    ],
    [
     "doll",
     "кукла"
    ],
    [
     "car",
     "машина"
    ],
    [
     "teddy bear",
     "плюшевый мишка"
    ],
    [
     "kite",
     "воздушный змей"
    ],
    [
     "robot",
     "робот"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "can",
   "могу, умею",
   "can't",
   "не могу, не умею"
  ],
  [
   "like",
   "люблю",
   "don't like",
   "не люблю"
  ],
  [
   "win",
   "выигрывать",
   "lose",
   "проигрывать"
  ],
  [
   "yes",
   "да",
   "no",
   "нет"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я умею плавать.",
   "pre": "I ",
   "right": "can",
   "wrong": [
    "am",
    "is"
   ],
   "post": " swim.",
   "ru": "Я умею плавать.",
   "hint": "Can — умею."
  },
  {
   "lv": 1,
   "q": "Он умеет быстро бегать.",
   "pre": "He ",
   "right": "can",
   "wrong": [
    "cans",
    "is"
   ],
   "post": " run fast.",
   "ru": "Он умеет быстро бегать.",
   "hint": "После he тоже can, без -s."
  },
  {
   "lv": 1,
   "q": "Кошка не умеет летать.",
   "pre": "A cat ",
   "right": "can't",
   "wrong": [
    "can",
    "is"
   ],
   "post": " fly.",
   "ru": "Кошка не умеет летать.",
   "hint": "Can't — не умеет."
  },
  {
   "lv": 2,
   "q": "Я люблю плавать.",
   "pre": "I like ",
   "right": "swimming",
   "wrong": [
    "swim",
    "swims"
   ],
   "post": ".",
   "ru": "Я люблю плавать.",
   "hint": "После like глагол с -ing."
  },
  {
   "lv": 2,
   "q": "Она любит танцевать.",
   "pre": "She likes ",
   "right": "dancing",
   "wrong": [
    "dance",
    "dances"
   ],
   "post": ".",
   "ru": "Она любит танцевать.",
   "hint": "После likes глагол с -ing."
  },
  {
   "lv": 2,
   "q": "Давай играть в футбол!",
   "pre": "Let's ",
   "right": "play",
   "wrong": [
    "playing",
    "plays"
   ],
   "post": " football!",
   "ru": "Давай играть в футбол!",
   "hint": "После Let's глагол без изменений."
  },
  {
   "lv": 3,
   "q": "Мы любим играть в теннис.",
   "pre": "We ",
   "right": "like",
   "wrong": [
    "likes",
    "liking"
   ],
   "post": " playing tennis.",
   "ru": "Мы любим играть в теннис.",
   "hint": "С we говорим like."
  },
  {
   "lv": 3,
   "q": "Ты умеешь плавать?",
   "pre": "Can you ",
   "right": "swim",
   "wrong": [
    "swims",
    "swimming"
   ],
   "post": "?",
   "ru": "Ты умеешь плавать?",
   "hint": "После can глагол не меняется."
  }
 ],
 "sound": [
  [
   "swim",
   "плавать",
   "w",
   [
    "v",
    "m"
   ],
   1,
   1
  ],
  [
   "dance",
   "танцевать",
   "n",
   [
    "m",
    "s"
   ],
   2,
   1
  ],
  [
   "jump",
   "прыгать",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "football",
   "футбол",
   "b",
   [
    "d",
    "p"
   ],
   4,
   2
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
   "robot",
   "робот",
   "b",
   [
    "d",
    "p"
   ],
   2,
   2
  ],
  [
   "kite",
   "змей",
   "i",
   [
    "e",
    "a"
   ],
   1,
   3
  ],
  [
   "doll",
   "кукла",
   "o",
   [
    "a",
    "u"
   ],
   1,
   3
  ]
 ],
 "order": [
  [
   "I can swim.",
   [
    "I swim can.",
    "Can I swim."
   ],
   "Я умею плавать.",
   "Сначала I can, потом глагол."
  ],
  [
   "I can't run.",
   [
    "I run can't.",
    "Can't I run."
   ],
   "Я не умею бегать.",
   "Сначала I can't, потом глагол."
  ],
  [
   "Can you dance?",
   [
    "You can dance?",
    "Dance you can?"
   ],
   "Ты умеешь танцевать?",
   "Вопрос: Can + кто + глагол."
  ],
  [
   "I like playing football.",
   [
    "I like football playing.",
    "I playing like football."
   ],
   "Я люблю играть в футбол.",
   "Сначала I like, потом playing."
  ]
 ],
 "tf": [
  [
   "«{I can swim}» значит «Я умею плавать».",
   true,
   "Can — умею."
  ],
  [
   "«{can't}» значит «могу».",
   false,
   "Can't — не могу, не умею."
  ],
  [
   "«{ball}» — это «мяч».",
   true,
   "Ball — мяч."
  ],
  [
   "После «{like}» глагол ставим с «-ing»: «I like {swimming}».",
   true,
   "Like + -ing."
  ],
  [
   "«{doll}» — это «машина».",
   false,
   "Doll — кукла, car — машина."
  ],
  [
   "«{Let's play}» значит «Давай играть».",
   true,
   "Let's — давай."
  ]
 ]
});
