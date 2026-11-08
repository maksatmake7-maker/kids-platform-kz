/* Английский язык, 2 класс — «Food and health — еда и здоровье». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2food",
 "theme": "garden",
 "groups": [
  {
   "k": "good",
   "name": "Полезная еда",
   "c": "green",
   "words": [
    [
     "bread",
     "хлеб"
    ],
    [
     "milk",
     "молоко"
    ],
    [
     "fruit",
     "фрукты"
    ],
    [
     "vegetables",
     "овощи"
    ],
    [
     "fish",
     "рыба"
    ],
    [
     "eggs",
     "яйца"
    ],
    [
     "meat",
     "мясо"
    ]
   ]
  },
  {
   "k": "fun",
   "name": "Любимая еда",
   "c": "orange",
   "words": [
    [
     "burgers",
     "бургеры"
    ],
    [
     "chips",
     "картофель фри"
    ],
    [
     "sandwiches",
     "бутерброды"
    ],
    [
     "apples",
     "яблоки"
    ],
    [
     "bananas",
     "бананы"
    ],
    [
     "chocolate",
     "шоколад"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Белый напиток из коровы.",
   "pre": "",
   "right": "Milk",
   "wrong": [
    "Bread",
    "Fish"
   ],
   "post": ".",
   "ru": "Молоко.",
   "hint": "Milk — молоко."
  },
  {
   "lv": 1,
   "q": "Яблоки и бананы — это…",
   "pre": "",
   "right": "fruit",
   "wrong": [
    "meat",
    "bread"
   ],
   "post": ".",
   "ru": "Фрукты.",
   "hint": "Fruit — фрукты."
  },
  {
   "lv": 1,
   "q": "Морковь и огурцы — это…",
   "pre": "",
   "right": "vegetables",
   "wrong": [
    "sweets",
    "cakes"
   ],
   "post": ".",
   "ru": "Овощи.",
   "hint": "Vegetables — овощи."
  },
  {
   "lv": 2,
   "q": "Я люблю бутерброды.",
   "pre": "I ",
   "right": "like",
   "wrong": [
    "likes",
    "am"
   ],
   "post": " sandwiches.",
   "ru": "Я люблю бутерброды.",
   "hint": "Like — любить, нравиться."
  },
  {
   "lv": 2,
   "q": "Я не люблю чипсы.",
   "pre": "I ",
   "right": "don't",
   "wrong": [
    "isn't",
    "am not"
   ],
   "post": " like chips.",
   "ru": "Я не люблю чипсы.",
   "hint": "Don't — это do not. Так говорим «не»."
  },
  {
   "lv": 3,
   "q": "Молоко полезно для зубов.",
   "pre": "Milk is ",
   "right": "good",
   "wrong": [
    "bad",
    "big"
   ],
   "post": " for your teeth.",
   "ru": "Молоко полезно для зубов.",
   "hint": "Good — хороший, полезный."
  },
  {
   "lv": 3,
   "q": "Ты любишь бананы?",
   "pre": "",
   "right": "Do",
   "wrong": [
    "Are",
    "Is"
   ],
   "post": " you like bananas?",
   "ru": "Ты любишь бананы?",
   "hint": "Вопрос про «любишь» начинаем с Do."
  },
  {
   "lv": 3,
   "q": "Овощи полезны для тебя.",
   "pre": "Vegetables are good ",
   "right": "for",
   "wrong": [
    "at",
    "to"
   ],
   "post": " you.",
   "ru": "Овощи полезны для тебя.",
   "hint": "For — для."
  }
 ],
 "sound": [
  [
   "bread",
   "хлеб",
   "e",
   [
    "a",
    "o"
   ],
   2,
   1
  ],
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
   "fruit",
   "фрукты",
   "u",
   [
    "a",
    "o"
   ],
   2,
   2
  ],
  [
   "chocolate",
   "шоколад",
   "o",
   [
    "a",
    "e"
   ],
   2,
   2
  ]
 ],
 "order": [
  [
   "I like sandwiches.",
   [
    "Like I sandwiches.",
    "Sandwiches I like I."
   ],
   "Я люблю бутерброды.",
   "Сначала I like, потом что именно."
  ],
  [
   "I don't like chips.",
   [
    "I like don't chips.",
    "Don't I like chips."
   ],
   "Я не люблю чипсы.",
   "Сначала I don't like, потом что именно."
  ]
 ],
 "tf": [
  [
   "«{milk}» значит «молоко».",
   true,
   "Milk — молоко."
  ],
  [
   "«{bread}» значит «рыба».",
   false,
   "Bread — хлеб, а рыба — fish."
  ],
  [
   "«{I like apples}» значит «Я люблю яблоки».",
   true,
   "Like — любить."
  ],
  [
   "«{I don't like chips}» значит «Я люблю чипсы».",
   false,
   "Don't — не. Фраза значит: я не люблю чипсы."
  ]
 ]
});
