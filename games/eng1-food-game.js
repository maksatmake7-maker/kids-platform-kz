/* Английский язык, 1 класс (пререквизит A1: слова и фразы по темам программы). Барсик объясняет по-русски, английские слова звучат английским голосом (в казахском отделении звук выключен). Тексты проверяет Максат. */
ENG3.define({
 "key": "eng1food",
 "theme": "garden",
 "groups": [
  {
   "k": "fruit",
   "name": "Фрукты",
   "c": "orange",
   "words": [
    [
     "apples",
     "яблоки"
    ],
    [
     "bananas",
     "бананы"
    ],
    [
     "pears",
     "груши"
    ]
   ]
  },
  {
   "k": "veg",
   "name": "Овощи",
   "c": "green",
   "words": [
    [
     "carrots",
     "морковь"
    ],
    [
     "onions",
     "лук"
    ],
    [
     "tomatoes",
     "помидоры"
    ]
   ]
  },
  {
   "k": "other",
   "name": "Другая еда и напитки",
   "c": "blue",
   "words": [
    [
     "milk",
     "молоко"
    ],
    [
     "cheese",
     "сыр"
    ],
    [
     "juice",
     "сок"
    ],
    [
     "eggs",
     "яйца"
    ],
    [
     "chicken",
     "курица"
    ]
   ]
  },
  {
   "k": "feel",
   "name": "Что я чувствую",
   "c": "red",
   "words": [
    [
     "hungry",
     "голодный"
    ],
    [
     "thirsty",
     "хочу пить"
    ]
   ]
  }
 ],
 "pairs": [],
 "fills": [
  {
   "lv": 1,
   "q": "Я люблю молоко.",
   "pre": "I like ",
   "right": "milk",
   "wrong": [
    "cheese",
    "eggs"
   ],
   "post": ".",
   "ru": "Я люблю молоко.",
   "hint": "Milk — молоко."
  },
  {
   "lv": 1,
   "q": "Я люблю бананы.",
   "pre": "I like ",
   "right": "bananas",
   "wrong": [
    "pears",
    "apples"
   ],
   "post": ".",
   "ru": "Я люблю бананы.",
   "hint": "Bananas — бананы."
  },
  {
   "lv": 1,
   "q": "Я не люблю лук.",
   "pre": "I don't like ",
   "right": "onions",
   "wrong": [
    "apples",
    "milk"
   ],
   "post": ".",
   "ru": "Я не люблю лук.",
   "hint": "Onions — лук."
  },
  {
   "lv": 2,
   "q": "Я люблю молоко.",
   "pre": "I ",
   "right": "like",
   "wrong": [
    "likes",
    "liking"
   ],
   "post": " milk.",
   "ru": "Я люблю молоко.",
   "hint": "С I говорим like."
  },
  {
   "lv": 2,
   "q": "Я не люблю сыр.",
   "pre": "I ",
   "right": "don't",
   "wrong": [
    "doesn't",
    "not"
   ],
   "post": " like cheese.",
   "ru": "Я не люблю сыр.",
   "hint": "С I говорим don't."
  },
  {
   "lv": 2,
   "q": "Я голодный.",
   "pre": "I'm ",
   "right": "hungry",
   "wrong": [
    "thirsty",
    "big"
   ],
   "post": ".",
   "ru": "Я голодный.",
   "hint": "Hungry — голодный."
  },
  {
   "lv": 2,
   "q": "Мне хочется пить.",
   "pre": "I'm ",
   "right": "thirsty",
   "wrong": [
    "hungry",
    "small"
   ],
   "post": ".",
   "ru": "Мне хочется пить.",
   "hint": "Thirsty — хочу пить."
  },
  {
   "lv": 3,
   "q": "Можно мне немного сока?",
   "pre": "Can I have some ",
   "right": "juice",
   "wrong": [
    "pens",
    "books"
   ],
   "post": "?",
   "ru": "Можно мне немного сока?",
   "hint": "Can I have some — можно мне немного."
  },
  {
   "lv": 3,
   "q": "Дай мне, пожалуйста, молока.",
   "pre": "Give me some ",
   "right": "milk",
   "wrong": [
    "rubber",
    "desk"
   ],
   "post": ", please.",
   "ru": "Дай мне, пожалуйста, молока.",
   "hint": "Give me some, please — дай мне, пожалуйста."
  }
 ],
 "sound": [
  [
   "milk",
   "молоко",
   "i",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "egg",
   "яйцо",
   "g",
   [
    "d",
    "b"
   ],
   2,
   2
  ],
  [
   "pear",
   "груша",
   "a",
   [
    "o",
    "e"
   ],
   2,
   2
  ],
  [
   "apple",
   "яблоко",
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
   "I like milk.",
   [
    "Like I milk.",
    "Milk like I."
   ],
   "Я люблю молоко.",
   "Сначала I like, потом что."
  ],
  [
   "I don't like onions.",
   [
    "I like don't onions.",
    "Don't I like onions."
   ],
   "Я не люблю лук.",
   "Сначала I don't like, потом что."
  ],
  [
   "Can I have some milk?",
   [
    "I can have some milk?",
    "Have I can some milk?"
   ],
   "Можно мне немного молока?",
   "В вопросе сначала Can I have some."
  ]
 ],
 "tf": [
  [
   "«{apples}» — это «яблоки».",
   true,
   "Apples — яблоки."
  ],
  [
   "«{carrots}» — это «груши».",
   false,
   "Carrots — морковь, pears — груши."
  ],
  [
   "«{milk}» — это «молоко».",
   true,
   "Milk — молоко."
  ],
  [
   "«{I'm hungry}» значит «Я голодный».",
   true,
   "Hungry — голодный."
  ],
  [
   "«{thirsty}» значит «хочу есть».",
   false,
   "Thirsty — хочу пить, hungry — голодный."
  ],
  [
   "«{onions}» — это «лук».",
   true,
   "Onions — лук."
  ]
 ]
});
