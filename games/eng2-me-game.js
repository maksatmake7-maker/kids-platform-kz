/* Английский язык, 2 класс — «All about me — всё обо мне». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2me",
 "theme": "garden",
 "groups": [
  {
   "k": "desc",
   "name": "Обо мне",
   "c": "green",
   "words": [
    [
     "name",
     "имя"
    ],
    [
     "age",
     "возраст"
    ],
    [
     "height",
     "рост"
    ],
    [
     "hair",
     "волосы"
    ],
    [
     "eyes",
     "глаза"
    ]
   ]
  },
  {
   "k": "hair",
   "name": "Цвет волос",
   "c": "orange",
   "words": [
    [
     "black",
     "чёрный"
    ],
    [
     "brown",
     "каштановый"
    ],
    [
     "blond",
     "светлый"
    ],
    [
     "ginger",
     "рыжий"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Как тебя зовут?",
   "pre": "What's your ",
   "right": "name",
   "wrong": [
    "hair",
    "colour"
   ],
   "post": "?",
   "ru": "Как тебя зовут?",
   "hint": "Name — имя."
  },
  {
   "lv": 1,
   "q": "Меня зовут Дана.",
   "pre": "My name ",
   "right": "is",
   "wrong": [
    "am",
    "are"
   ],
   "post": " Dana.",
   "ru": "Меня зовут Дана.",
   "hint": "С name говорим is."
  },
  {
   "lv": 2,
   "q": "Мне восемь лет.",
   "pre": "I'm ",
   "right": "eight",
   "wrong": [
    "eighty",
    "eighteen"
   ],
   "post": ".",
   "ru": "Мне восемь.",
   "hint": "I'm eight — мне восемь."
  },
  {
   "lv": 2,
   "q": "У меня каштановые волосы.",
   "pre": "I've got ",
   "right": "brown",
   "wrong": [
    "blue",
    "green"
   ],
   "post": " hair.",
   "ru": "У меня каштановые волосы.",
   "hint": "Цвет стоит перед словом hair."
  },
  {
   "lv": 2,
   "q": "У меня голубые глаза.",
   "pre": "I've got blue ",
   "right": "eyes",
   "wrong": [
    "eye",
    "ear"
   ],
   "post": ".",
   "ru": "У меня голубые глаза.",
   "hint": "Глаз два, поэтому eyes."
  },
  {
   "lv": 3,
   "q": "Какой твой любимый цвет?",
   "pre": "What's your ",
   "right": "favourite",
   "wrong": [
    "favourites",
    "family"
   ],
   "post": " colour?",
   "ru": "Какой твой любимый цвет?",
   "hint": "Favourite — любимый."
  },
  {
   "lv": 3,
   "q": "Мой любимый цвет — зелёный.",
   "pre": "My favourite colour ",
   "right": "is",
   "wrong": [
    "am",
    "are"
   ],
   "post": " green.",
   "ru": "Мой любимый цвет — зелёный.",
   "hint": "С colour говорим is."
  }
 ],
 "sound": [
  [
   "name",
   "имя",
   "a",
   [
    "o",
    "e"
   ],
   1,
   1
  ],
  [
   "hair",
   "волосы",
   "a",
   [
    "o",
    "e"
   ],
   1,
   1
  ],
  [
   "eyes",
   "глаза",
   "y",
   [
    "i",
    "e"
   ],
   1,
   2
  ],
  [
   "favourite",
   "любимый",
   "v",
   [
    "b",
    "w"
   ],
   2,
   2
  ]
 ],
 "order": [
  [
   "My name is Dana.",
   [
    "Name my is Dana.",
    "Is my name Dana."
   ],
   "Меня зовут Дана.",
   "Сначала My name, потом is и имя."
  ],
  [
   "I've got blue eyes.",
   [
    "I've blue got eyes.",
    "Got I've eyes blue."
   ],
   "У меня голубые глаза.",
   "Сначала I've got, потом цвет и eyes."
  ]
 ],
 "tf": [
  [
   "«{What's your name?}» значит «Как тебя зовут?».",
   true,
   "Так спрашивают имя."
  ],
  [
   "«{hair}» значит «глаза».",
   false,
   "Hair — волосы, а eyes — глаза."
  ],
  [
   "«{My favourite colour is red}» значит «Мой любимый цвет — красный».",
   true,
   "Favourite — любимый."
  ],
  [
   "«{I'm eight}» значит «Мне восемь лет».",
   true,
   "Так говорим о возрасте."
  ]
 ]
});
