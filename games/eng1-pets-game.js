/* Английский язык, 1 класс (пререквизит A1: слова и фразы по темам программы). Барсик объясняет по-русски, английские слова звучат английским голосом (в казахском отделении звук выключен). Тексты проверяет Максат. */
ENG3.define({
 "key": "eng1pets",
 "theme": "meadow",
 "groups": [
  {
   "k": "pet",
   "name": "Питомцы",
   "c": "green",
   "words": [
    [
     "cat",
     "кошка"
    ],
    [
     "dog",
     "собака"
    ],
    [
     "rabbit",
     "кролик"
    ],
    [
     "fish",
     "рыба"
    ],
    [
     "mouse",
     "мышь"
    ],
    [
     "tortoise",
     "черепаха"
    ],
    [
     "parrot",
     "попугай"
    ],
    [
     "spider",
     "паук"
    ]
   ]
  }
 ],
 "pairs": [],
 "fills": [
  {
   "lv": 1,
   "q": "Это кошка.",
   "pre": "It's a ",
   "right": "cat",
   "wrong": [
    "dog",
    "mouse"
   ],
   "post": ".",
   "ru": "Это кошка.",
   "hint": "Cat — кошка."
  },
  {
   "lv": 1,
   "q": "Это собака.",
   "pre": "It's a ",
   "right": "dog",
   "wrong": [
    "cat",
    "rabbit"
   ],
   "post": ".",
   "ru": "Это собака.",
   "hint": "Dog — собака."
  },
  {
   "lv": 1,
   "q": "Это кролик.",
   "pre": "It's a ",
   "right": "rabbit",
   "wrong": [
    "mouse",
    "cat"
   ],
   "post": ".",
   "ru": "Это кролик.",
   "hint": "Rabbit — кролик."
  },
  {
   "lv": 1,
   "q": "Это попугай.",
   "pre": "It's a ",
   "right": "parrot",
   "wrong": [
    "spider",
    "fish"
   ],
   "post": ".",
   "ru": "Это попугай.",
   "hint": "Parrot — попугай."
  },
  {
   "lv": 2,
   "q": "Это мой питомец.",
   "pre": "This is my ",
   "right": "pet",
   "wrong": [
    "bed",
    "book"
   ],
   "post": ".",
   "ru": "Это мой питомец.",
   "hint": "Pet — домашнее животное."
  },
  {
   "lv": 2,
   "q": "Она большая?",
   "pre": "Is it ",
   "right": "big",
   "wrong": [
    "red",
    "pen"
   ],
   "post": "?",
   "ru": "Она большая?",
   "hint": "Big — большой."
  },
  {
   "lv": 3,
   "q": "Это моя черепаха.",
   "pre": "This ",
   "right": "is",
   "wrong": [
    "am",
    "are"
   ],
   "post": " my tortoise.",
   "ru": "Это моя черепаха.",
   "hint": "С This говорим is."
  }
 ],
 "sound": [
  [
   "cat",
   "кошка",
   "a",
   [
    "o",
    "u"
   ],
   1,
   1
  ],
  [
   "dog",
   "собака",
   "o",
   [
    "a",
    "e"
   ],
   1,
   1
  ],
  [
   "fish",
   "рыба",
   "i",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "spider",
   "паук",
   "p",
   [
    "b",
    "t"
   ],
   1,
   3
  ]
 ],
 "order": [
  [
   "It's a cat.",
   [
    "A it's cat.",
    "Cat it's a."
   ],
   "Это кошка.",
   "Сначала It's a, потом животное."
  ],
  [
   "Is it big?",
   [
    "It is big?",
    "Big is it?"
   ],
   "Она большая?",
   "В вопросе сначала Is, потом it."
  ],
  [
   "This is my pet.",
   [
    "My pet this is.",
    "Is this my pet."
   ],
   "Это мой питомец.",
   "Сначала This is, потом my pet."
  ]
 ],
 "tf": [
  [
   "«{cat}» — это «кошка».",
   true,
   "Cat — кошка."
  ],
  [
   "«{tortoise}» — это «попугай».",
   false,
   "Tortoise — черепаха, parrot — попугай."
  ],
  [
   "«{rabbit}» — это «кролик».",
   true,
   "Rabbit — кролик."
  ],
  [
   "«{spider}» — это «паук».",
   true,
   "Spider — паук."
  ],
  [
   "«{mouse}» — это «собака».",
   false,
   "Mouse — мышь, dog — собака."
  ]
 ]
});
