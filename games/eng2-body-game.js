/* Английский язык, 2 класс — «Parts of the body — части тела». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2body",
 "theme": "meadow",
 "groups": [
  {
   "k": "face",
   "name": "Лицо",
   "c": "green",
   "words": [
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
     "teeth",
     "зубы"
    ]
   ]
  },
  {
   "k": "inside",
   "name": "Внутри тела",
   "c": "orange",
   "words": [
    [
     "bones",
     "кости"
    ],
    [
     "heart",
     "сердце"
    ],
    [
     "muscles",
     "мышцы"
    ],
    [
     "brain",
     "мозг"
    ],
    [
     "skin",
     "кожа"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "big",
   "большой",
   "small",
   "маленький"
  ],
  [
   "long",
   "длинный",
   "short",
   "короткий"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Чем мы видим?",
   "pre": "",
   "right": "Eyes",
   "wrong": [
    "Ears",
    "Nose"
   ],
   "post": ".",
   "ru": "Глазами.",
   "hint": "Eyes — глаза."
  },
  {
   "lv": 1,
   "q": "Чем мы слышим?",
   "pre": "",
   "right": "Ears",
   "wrong": [
    "Eyes",
    "Mouth"
   ],
   "post": ".",
   "ru": "Ушами.",
   "hint": "Ears — уши."
  },
  {
   "lv": 1,
   "q": "Чем мы дышим и чувствуем запах?",
   "pre": "A ",
   "right": "nose",
   "wrong": [
    "mouth",
    "heart"
   ],
   "post": ".",
   "ru": "Носом.",
   "hint": "Nose — нос."
  },
  {
   "lv": 2,
   "q": "У него зелёные глаза.",
   "pre": "He's got green ",
   "right": "eyes",
   "wrong": [
    "ears",
    "nose"
   ],
   "post": ".",
   "ru": "У него зелёные глаза.",
   "hint": "Eyes — глаза."
  },
  {
   "lv": 2,
   "q": "У неё красный рот.",
   "pre": "She's got a red ",
   "right": "mouth",
   "wrong": [
    "nose",
    "ear"
   ],
   "post": ".",
   "ru": "У неё красный рот.",
   "hint": "Mouth — рот."
  },
  {
   "lv": 2,
   "q": "У неё маленький нос.",
   "pre": "She's got a ",
   "right": "small",
   "wrong": [
    "big",
    "long"
   ],
   "post": " nose.",
   "ru": "У неё маленький нос.",
   "hint": "Small — маленький."
  },
  {
   "lv": 3,
   "q": "У него большой нос.",
   "pre": "He's got a ",
   "right": "big",
   "wrong": [
    "small",
    "short"
   ],
   "post": " nose.",
   "ru": "У него большой нос.",
   "hint": "Big — большой."
  },
  {
   "lv": 3,
   "q": "У неё два уха.",
   "pre": "She's got two ",
   "right": "ears",
   "wrong": [
    "ear",
    "ears'"
   ],
   "post": ".",
   "ru": "У неё два уха.",
   "hint": "Если ушей два, добавляем s."
  }
 ],
 "sound": [
  [
   "nose",
   "нос",
   "o",
   [
    "a",
    "e"
   ],
   1,
   1
  ],
  [
   "mouth",
   "рот",
   "o",
   [
    "a",
    "e"
   ],
   1,
   1
  ],
  [
   "heart",
   "сердце",
   "e",
   [
    "a",
    "o"
   ],
   1,
   2
  ],
  [
   "muscles",
   "мышцы",
   "u",
   [
    "a",
    "o"
   ],
   1,
   2
  ]
 ],
 "order": [
  [
   "He's got green eyes.",
   [
    "He's green got eyes.",
    "Got he's eyes green."
   ],
   "У него зелёные глаза.",
   "Сначала He's got, потом цвет и eyes."
  ],
  [
   "She's got a small nose.",
   [
    "She's got small a nose.",
    "A she's got small nose."
   ],
   "У неё маленький нос.",
   "Сначала She's got a, потом small и nose."
  ]
 ],
 "tf": [
  [
   "«{eyes}» значит «глаза».",
   true,
   "Eyes — глаза."
  ],
  [
   "«{heart}» значит «мозг».",
   false,
   "Heart — сердце, а мозг — brain."
  ],
  [
   "«{big}» значит «большой».",
   true,
   "Big — большой."
  ],
  [
   "«{small}» значит «большой».",
   false,
   "Small — маленький."
  ]
 ]
});
