/* Английский язык, 1 класс (пререквизит A1: слова и фразы по темам программы). Барсик объясняет по-русски, английские слова звучат английским голосом (в казахском отделении звук выключен). Тексты проверяет Максат. */
ENG3.define({
 "key": "eng1hello",
 "theme": "garden",
 "groups": [
  {
   "k": "hi",
   "name": "Слова для знакомства",
   "c": "green",
   "words": [
    [
     "hello",
     "привет"
    ],
    [
     "goodbye",
     "до свидания"
    ],
    [
     "name",
     "имя"
    ],
    [
     "my",
     "мой"
    ],
    [
     "your",
     "твой"
    ]
   ]
  }
 ],
 "pairs": [],
 "fills": [
  {
   "lv": 1,
   "q": "Скажи «привет».",
   "pre": "",
   "right": "Hello",
   "wrong": [
    "Goodbye",
    "Mummy"
   ],
   "post": "!",
   "ru": "Привет!",
   "hint": "Hello — привет."
  },
  {
   "lv": 1,
   "q": "Скажи «до свидания».",
   "pre": "",
   "right": "Goodbye",
   "wrong": [
    "Hello",
    "Daddy"
   ],
   "post": "!",
   "ru": "До свидания!",
   "hint": "Goodbye — до свидания."
  },
  {
   "lv": 2,
   "q": "Как тебя зовут?",
   "pre": "What's your ",
   "right": "name",
   "wrong": [
    "book",
    "pen"
   ],
   "post": "?",
   "ru": "Как тебя зовут?",
   "hint": "Name — имя."
  },
  {
   "lv": 2,
   "q": "Меня зовут Дана.",
   "pre": "I'm ",
   "right": "Dana",
   "wrong": [
    "Hello",
    "Goodbye"
   ],
   "post": ".",
   "ru": "Я Дана.",
   "hint": "I'm — я. После I'm говорим своё имя."
  },
  {
   "lv": 3,
   "q": "Это моя мама.",
   "pre": "This is ",
   "right": "my",
   "wrong": [
    "your",
    "is"
   ],
   "post": " mummy.",
   "ru": "Это моя мама.",
   "hint": "My — мой, моя."
  }
 ],
 "sound": [
  [
   "hello",
   "привет",
   "e",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
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
  ]
 ],
 "order": [
  [
   "What's your name?",
   [
    "Your name what's?",
    "Name your what's?"
   ],
   "Как тебя зовут?",
   "Сначала What's, потом your name."
  ],
  [
   "Hello! I'm Aidar.",
   [
    "I'm Hello! Aidar.",
    "Aidar I'm hello!"
   ],
   "Привет! Я Айдар.",
   "Сначала приветствие, потом I'm и имя."
  ]
 ],
 "tf": [
  [
   "«{Hello}» значит «привет».",
   true,
   "Hello — привет."
  ],
  [
   "«{Goodbye}» значит «привет».",
   false,
   "Goodbye — до свидания."
  ],
  [
   "Когда встречаешь друга, говоришь: «{Hello}!»",
   true,
   "При встрече говорим hello."
  ],
  [
   "«{What's your name?}» значит «Как тебя зовут?»",
   true,
   "Так спрашивают имя."
  ]
 ]
});
