/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «Hello! Приветствия». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3greet",
 "theme": "garden",
 "groups": [
  {
   "k": "hello",
   "name": "Здороваемся",
   "c": "green",
   "words": [
    [
     "hello",
     "привет, здравствуйте"
    ],
    [
     "hi",
     "привет"
    ],
    [
     "good morning",
     "доброе утро"
    ],
    [
     "good afternoon",
     "добрый день"
    ],
    [
     "good evening",
     "добрый вечер"
    ]
   ]
  },
  {
   "k": "bye",
   "name": "Прощаемся",
   "c": "orange",
   "words": [
    [
     "goodbye",
     "до свидания"
    ],
    [
     "bye",
     "пока"
    ],
    [
     "see you",
     "до встречи"
    ],
    [
     "good night",
     "спокойной ночи"
    ]
   ]
  },
  {
   "k": "polite",
   "name": "Вежливые слова",
   "c": "blue",
   "words": [
    [
     "please",
     "пожалуйста"
    ],
    [
     "thank you",
     "спасибо"
    ],
    [
     "sorry",
     "извини"
    ],
    [
     "excuse me",
     "извините"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "hello",
   "здравствуйте",
   "goodbye",
   "до свидания"
  ],
  [
   "hi",
   "привет",
   "bye",
   "пока"
  ],
  [
   "morning",
   "утро",
   "night",
   "ночь"
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
   "q": "Поздоровайся.",
   "pre": "",
   "right": "Hello",
   "wrong": [
    "Goodbye",
    "Sorry"
   ],
   "post": ", I am Aidar.",
   "ru": "Здравствуй, я Айдар.",
   "hint": "Hello — так здороваются."
  },
  {
   "lv": 1,
   "q": "Доброе утро!",
   "pre": "Good ",
   "right": "morning",
   "wrong": [
    "night",
    "goodbye"
   ],
   "post": "!",
   "ru": "Доброе утро!",
   "hint": "Утром говорим Good morning."
  },
  {
   "lv": 1,
   "q": "Тебе помогли. Что скажешь?",
   "pre": "",
   "right": "Thank you",
   "wrong": [
    "Sorry",
    "Hello"
   ],
   "post": " very much!",
   "ru": "Большое спасибо!",
   "hint": "Когда нам помогли, говорим Thank you."
  },
  {
   "lv": 1,
   "q": "Спокойной ночи, мама!",
   "pre": "Good ",
   "right": "night",
   "wrong": [
    "morning",
    "afternoon"
   ],
   "post": ", mum!",
   "ru": "Спокойной ночи, мама!",
   "hint": "Перед сном говорим Good night."
  },
  {
   "lv": 2,
   "q": "До встречи завтра!",
   "pre": "See ",
   "right": "you",
   "wrong": [
    "me",
    "he"
   ],
   "post": " tomorrow!",
   "ru": "До встречи завтра!",
   "hint": "See you — до встречи."
  },
  {
   "lv": 2,
   "q": "Извините, можно войти?",
   "pre": "Excuse ",
   "right": "me",
   "wrong": [
    "you",
    "it"
   ],
   "post": ", can I come in?",
   "ru": "Извините, можно войти?",
   "hint": "Excuse me — извините."
  },
  {
   "lv": 3,
   "q": "Ты опоздал и просишь прощения.",
   "pre": "",
   "right": "Sorry",
   "wrong": [
    "Please",
    "Hello"
   ],
   "post": ", I am late.",
   "ru": "Извините, я опоздал.",
   "hint": "Sorry — когда извиняемся."
  }
 ],
 "sound": [
  [
   "hello",
   "привет",
   "l",
   [
    "n",
    "t"
   ],
   2,
   1
  ],
  [
   "good",
   "хороший",
   "o",
   [
    "a",
    "e"
   ]
  ],
  [
   "morning",
   "утро",
   "r",
   [
    "l",
    "n"
   ],
   2,
   1
  ],
  [
   "night",
   "ночь",
   "g",
   [
    "k",
    "t"
   ],
   2,
   1
  ],
  [
   "thank",
   "спасибо",
   "a",
   [
    "e",
    "u"
   ],
   2,
   1
  ],
  [
   "sorry",
   "извини",
   "r",
   [
    "l",
    "n"
   ],
   2,
   1
  ],
  [
   "please",
   "пожалуйста",
   "l",
   [
    "r",
    "n"
   ],
   1,
   2
  ],
  [
   "goodbye",
   "до свидания",
   "y",
   [
    "i",
    "e"
   ],
   5,
   2
  ]
 ],
 "order": [
  [
   "Good morning, Aidar!",
   [
    "Morning good, Aidar!",
    "Aidar good morning!"
   ],
   "Доброе утро, Айдар!",
   "Сначала Good, потом morning."
  ],
  [
   "See you tomorrow!",
   [
    "You see tomorrow!",
    "Tomorrow see you!"
   ],
   "До встречи завтра!",
   "Фраза See you начинается с See."
  ],
  [
   "Thank you very much!",
   [
    "Very thank you much!",
    "Much very thank you!"
   ],
   "Большое спасибо!",
   "Thank you идут вместе в начале."
  ],
  [
   "Hello, my name is Dana.",
   [
    "Hello, name my is Dana.",
    "My name is hello, Dana."
   ],
   "Здравствуйте, меня зовут Дана.",
   "Сначала Hello, потом my name is."
  ]
 ],
 "tf": [
  [
   "«{Good morning}» говорят утром.",
   true,
   "Good morning — доброе утро."
  ],
  [
   "«{Goodbye}» значит «здравствуй».",
   false,
   "Goodbye — до свидания."
  ],
  [
   "«{Thank you}» значит «спасибо».",
   true,
   "Thank you — спасибо."
  ],
  [
   "«{Hello}» и «{hi}» оба значат «привет».",
   true,
   "Hello и hi — приветствия."
  ],
  [
   "«{Good night}» говорят утром.",
   false,
   "Good night говорят вечером, перед сном."
  ],
  [
   "«{Sorry}» значит «пожалуйста».",
   false,
   "Sorry — извини. Пожалуйста — please."
  ]
 ]
});
