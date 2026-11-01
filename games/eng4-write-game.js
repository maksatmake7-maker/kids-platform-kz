/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Writing — пишем письма и объявления». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4write",
 "theme": "garden",
 "groups": [
  {
   "k": "conn",
   "name": "Соединяем мысли",
   "c": "green",
   "words": [
    [
     "and",
     "и"
    ],
    [
     "but",
     "но"
    ],
    [
     "then",
     "потом"
    ],
    [
     "or",
     "или"
    ],
    [
     "because",
     "потому что"
    ],
    [
     "so",
     "поэтому"
    ]
   ]
  },
  {
   "k": "punct",
   "name": "Знаки",
   "c": "orange",
   "words": [
    [
     "capital letter",
     "заглавная буква"
    ],
    [
     "full stop",
     "точка"
    ],
    [
     "comma",
     "запятая"
    ],
    [
     "question mark",
     "вопросительный знак"
    ],
    [
     "exclamation mark",
     "восклицательный знак"
    ],
    [
     "apostrophe",
     "апостроф"
    ]
   ]
  },
  {
   "k": "card",
   "name": "Открытка и письмо",
   "c": "blue",
   "words": [
    [
     "Dear",
     "дорогой"
    ],
    [
     "best wishes",
     "с наилучшими пожеланиями"
    ],
    [
     "love",
     "с любовью"
    ],
    [
     "Happy birthday",
     "с днём рождения"
    ],
    [
     "Thank you",
     "спасибо"
    ],
    [
     "write soon",
     "пиши скорее"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "and",
   "и",
   "but",
   "но"
  ],
  [
   "or",
   "или",
   "so",
   "поэтому"
  ],
  [
   "Dear",
   "дорогой",
   "Yours",
   "твой"
  ],
  [
   "hello",
   "привет",
   "goodbye",
   "до свидания"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я люблю чай и молоко.",
   "pre": "I like tea ",
   "right": "and",
   "wrong": [
    "but",
    "or"
   ],
   "post": " milk.",
   "ru": "Я люблю чай и молоко",
   "hint": "And — и."
  },
  {
   "lv": 1,
   "q": "Я люблю чай, но не люблю кофе.",
   "pre": "I like tea, ",
   "right": "but",
   "wrong": [
    "and",
    "or"
   ],
   "post": " I don’t like coffee.",
   "ru": "Я люблю чай, но не люблю кофе",
   "hint": "But — но."
  },
  {
   "lv": 1,
   "q": "Хочешь чай или кофе?",
   "pre": "Do you want tea ",
   "right": "or",
   "wrong": [
    "and",
    "but"
   ],
   "post": " coffee?",
   "ru": "Хочешь чай или кофе",
   "hint": "Or — или."
  },
  {
   "lv": 2,
   "q": "Начало письма.",
   "pre": "",
   "right": "Dear",
   "wrong": [
    "Love",
    "Bye"
   ],
   "post": " Aidar,",
   "ru": "Дорогой Айдар,",
   "hint": "Письмо начинаем с Dear."
  },
  {
   "lv": 2,
   "q": "Мы пошли в парк, а потом домой.",
   "pre": "We went to the park ",
   "right": "and then",
   "wrong": [
    "but then",
    "or then"
   ],
   "post": " we went home.",
   "ru": "Мы пошли в парк, а потом домой",
   "hint": "Then — потом."
  },
  {
   "lv": 2,
   "q": "Моё имя пишется с заглавной буквы.",
   "pre": "My name is ",
   "right": "Dana",
   "wrong": [
    "dana",
    "DANA"
   ],
   "post": ".",
   "ru": "Меня зовут Дана",
   "hint": "Имена пишем с заглавной буквы."
  },
  {
   "lv": 3,
   "q": "Конец вопроса.",
   "pre": "What is your name",
   "right": "?",
   "wrong": [
    ".",
    "!"
   ],
   "post": "",
   "ru": "Как тебя зовут",
   "hint": "В конце вопроса ставим «?»."
  },
  {
   "lv": 3,
   "q": "Конец предложения.",
   "pre": "I am nine years old",
   "right": ".",
   "wrong": [
    "?",
    ","
   ],
   "post": "",
   "ru": "Мне девять лет",
   "hint": "В конце обычного предложения ставим точку."
  },
  {
   "lv": 3,
   "q": "Мы любим футбол, поэтому играем каждый день.",
   "pre": "We love football, ",
   "right": "so",
   "wrong": [
    "but",
    "or"
   ],
   "post": " we play every day.",
   "ru": "Мы любим футбол, поэтому играем каждый день",
   "hint": "So — поэтому."
  }
 ],
 "sound": [
  [
   "Dear",
   "дорогой",
   "e",
   [
    "a",
    "i"
   ],
   1,
   1
  ],
  [
   "birthday",
   "день рождения",
   "r",
   [
    "l",
    "n"
   ],
   2,
   1
  ],
  [
   "letter",
   "письмо",
   "e",
   [
    "a",
    "i"
   ],
   1,
   1
  ],
  [
   "postcard",
   "открытка",
   "c",
   [
    "k",
    "s"
   ],
   4,
   1
  ],
  [
   "because",
   "потому что",
   "c",
   [
    "k",
    "s"
   ],
   2,
   2
  ],
  [
   "comma",
   "запятая",
   "m",
   [
    "n",
    "w"
   ],
   2,
   2
  ],
  [
   "capital",
   "заглавная",
   "p",
   [
    "b",
    "t"
   ],
   2,
   2
  ],
  [
   "question",
   "вопрос",
   "q",
   [
    "g",
    "p"
   ],
   0,
   3
  ],
  [
   "exclamation",
   "восклицание",
   "x",
   [
    "k",
    "c"
   ],
   1,
   3
  ]
 ],
 "order": [
  [
   "I like tea and milk.",
   [
    "I like and tea milk.",
    "I and like tea milk."
   ],
   "Я люблю чай и молоко",
   "And стоит между двумя словами."
  ],
  [
   "Dear Aidar, how are you?",
   [
    "Dear Aidar how are you.",
    "Aidar dear, how are you?"
   ],
   "Дорогой Айдар, как дела",
   "Dear + имя + запятая."
  ],
  [
   "I like tea but I don’t like coffee.",
   [
    "I like but tea I don’t like coffee.",
    "But I like tea I don’t like coffee."
   ],
   "Я люблю чай, но не люблю кофе",
   "But соединяет две части."
  ],
  [
   "Happy birthday to you!",
   [
    "Birthday happy to you!",
    "Happy to you birthday!"
   ],
   "С днём рождения",
   "Happy birthday to you."
  ]
 ],
 "tf": [
  [
   "Предложение начинаем с «{capital letter}».",
   true,
   "Capital letter — заглавная буква."
  ],
  [
   "В конце вопроса ставим «{full stop}».",
   false,
   "В конце вопроса — question mark."
  ],
  [
   "«{and}» значит «и».",
   true,
   "And — и."
  ],
  [
   "«{but}» значит «или».",
   false,
   "But — но; or — или."
  ],
  [
   "Письмо друзьям начинаем со слова «{Dear}».",
   true,
   "Dear Aidar."
  ],
  [
   "«{because}» значит «поэтому».",
   false,
   "Because — потому что; so — поэтому."
  ]
 ]
});
