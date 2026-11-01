/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «Healthy food — здоровая еда». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3food",
 "theme": "meadow",
 "groups": [
  {
   "k": "good",
   "name": "Полезная еда",
   "c": "green",
   "words": [
    [
     "apple",
     "яблоко"
    ],
    [
     "banana",
     "банан"
    ],
    [
     "carrot",
     "морковь"
    ],
    [
     "milk",
     "молоко"
    ],
    [
     "water",
     "вода"
    ],
    [
     "fish",
     "рыба"
    ],
    [
     "egg",
     "яйцо"
    ],
    [
     "cheese",
     "сыр"
    ],
    [
     "bread",
     "хлеб"
    ]
   ]
  },
  {
   "k": "bad",
   "name": "Вредная еда",
   "c": "red",
   "words": [
    [
     "chocolate",
     "шоколад"
    ],
    [
     "sweets",
     "конфеты"
    ],
    [
     "chips",
     "чипсы"
    ],
    [
     "ice cream",
     "мороженое"
    ],
    [
     "cola",
     "кола"
    ],
    [
     "burger",
     "бургер"
    ],
    [
     "cake",
     "торт"
    ]
   ]
  },
  {
   "k": "meal",
   "name": "Приёмы пищи",
   "c": "blue",
   "words": [
    [
     "breakfast",
     "завтрак"
    ],
    [
     "lunch",
     "обед"
    ],
    [
     "dinner",
     "ужин"
    ],
    [
     "snack",
     "перекус"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "healthy",
   "полезный",
   "unhealthy",
   "вредный"
  ],
  [
   "sweet",
   "сладкий",
   "sour",
   "кислый"
  ],
  [
   "hot",
   "горячий",
   "cold",
   "холодный"
  ],
  [
   "hungry",
   "голодный",
   "full",
   "сытый"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я люблю бананы.",
   "pre": "I ",
   "right": "like",
   "wrong": [
    "likes",
    "liking"
   ],
   "post": " bananas.",
   "ru": "Я люблю бананы.",
   "hint": "С I говорим like."
  },
  {
   "lv": 1,
   "q": "Она любит морковь.",
   "pre": "She ",
   "right": "likes",
   "wrong": [
    "like",
    "liking"
   ],
   "post": " carrots.",
   "ru": "Она любит морковь.",
   "hint": "С she говорим likes."
  },
  {
   "lv": 1,
   "q": "Я не люблю чипсы.",
   "pre": "I ",
   "right": "don't",
   "wrong": [
    "doesn't",
    "not"
   ],
   "post": " like chips.",
   "ru": "Я не люблю чипсы.",
   "hint": "С I говорим don't."
  },
  {
   "lv": 1,
   "q": "Он не любит рыбу.",
   "pre": "He ",
   "right": "doesn't",
   "wrong": [
    "don't",
    "not"
   ],
   "post": " like fish.",
   "ru": "Он не любит рыбу.",
   "hint": "С he говорим doesn't."
  },
  {
   "lv": 2,
   "q": "Фрукты и овощи полезны.",
   "pre": "Fruit and vegetables are ",
   "right": "healthy",
   "wrong": [
    "sweet",
    "hungry"
   ],
   "post": ".",
   "ru": "Фрукты и овощи полезны.",
   "hint": "Healthy — полезный."
  },
  {
   "lv": 2,
   "q": "Утром я завтракаю.",
   "pre": "I have ",
   "right": "breakfast",
   "wrong": [
    "lunch",
    "dinner"
   ],
   "post": " in the morning.",
   "ru": "Утром я завтракаю.",
   "hint": "Breakfast — завтрак."
  },
  {
   "lv": 2,
   "q": "Я пью воду каждый день.",
   "pre": "I drink ",
   "right": "water",
   "wrong": [
    "bread",
    "apple"
   ],
   "post": " every day.",
   "ru": "Я пью воду каждый день.",
   "hint": "Water — вода."
  },
  {
   "lv": 3,
   "q": "Молоко полезное.",
   "pre": "Milk ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " healthy.",
   "ru": "Молоко полезное.",
   "hint": "Milk — одно слово, значит is."
  }
 ],
 "sound": [
  [
   "apple",
   "яблоко",
   "p",
   [
    "b",
    "t"
   ],
   1,
   1
  ],
  [
   "banana",
   "банан",
   "n",
   [
    "m",
    "l"
   ],
   2,
   1
  ],
  [
   "carrot",
   "морковь",
   "r",
   [
    "l",
    "n"
   ],
   2,
   1
  ],
  [
   "cheese",
   "сыр",
   "h",
   [
    "n",
    "r"
   ],
   1,
   2
  ],
  [
   "water",
   "вода",
   "t",
   [
    "d",
    "p"
   ],
   2,
   2
  ],
  [
   "bread",
   "хлеб",
   "r",
   [
    "l",
    "n"
   ],
   1,
   2
  ],
  [
   "chips",
   "чипсы",
   "h",
   [
    "n",
    "r"
   ],
   1,
   3
  ],
  [
   "dinner",
   "ужин",
   "n",
   [
    "m",
    "l"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "I like apples.",
   [
    "I apples like.",
    "Like I apples."
   ],
   "Я люблю яблоки.",
   "Сначала I like, потом что."
  ],
  [
   "She doesn't like fish.",
   [
    "She doesn't fish like.",
    "Doesn't she like fish."
   ],
   "Она не любит рыбу.",
   "Сначала She doesn't like."
  ],
  [
   "I have breakfast at eight.",
   [
    "I breakfast have at eight.",
    "Have I breakfast at eight."
   ],
   "Я завтракаю в восемь.",
   "Сначала I have, потом приём пищи."
  ],
  [
   "Milk is healthy.",
   [
    "Healthy milk is.",
    "Is healthy milk."
   ],
   "Молоко полезное.",
   "Сначала Milk is, потом какое."
  ]
 ],
 "tf": [
  [
   "«{apple}» — это «яблоко».",
   true,
   "Apple — яблоко."
  ],
  [
   "«{chips}» — это полезная еда.",
   false,
   "Чипсы — вредная еда."
  ],
  [
   "«{breakfast}» — это «завтрак».",
   true,
   "Breakfast — завтрак."
  ],
  [
   "«{carrot}» — это «капуста».",
   false,
   "Carrot — морковь."
  ],
  [
   "Воду и молоко пьют: «I {drink} milk».",
   true,
   "Drink — пить."
  ],
  [
   "«{She likes fish}» значит «Она любит рыбу».",
   true,
   "Likes — любит."
  ]
 ]
});
