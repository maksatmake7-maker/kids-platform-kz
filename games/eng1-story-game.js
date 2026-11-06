/* Английский язык, 1 класс (пререквизит A1: слова и фразы по темам программы). Барсик объясняет по-русски, английские слова звучат английским голосом (в казахском отделении звук выключен). Тексты проверяет Максат. */
ENG3.define({
 "key": "eng1story",
 "theme": "night",
 "groups": [
  {
   "k": "story",
   "name": "Слова из сказки",
   "c": "purple",
   "words": [
    [
     "coat",
     "шуба, пальто"
    ],
    [
     "old",
     "старый"
    ],
    [
     "hot",
     "жарко"
    ],
    [
     "buy",
     "покупать"
    ],
    [
     "gold",
     "золото"
    ],
    [
     "horse",
     "лошадь"
    ],
    [
     "happy",
     "счастливый"
    ]
   ]
  }
 ],
 "pairs": [],
 "fills": [
  {
   "lv": 1,
   "q": "Моя шуба старая!",
   "pre": "My coat is ",
   "right": "old",
   "wrong": [
    "hot",
    "gold"
   ],
   "post": "!",
   "ru": "Моя шуба старая!",
   "hint": "Old — старый."
  },
  {
   "lv": 1,
   "q": "Мне очень жарко!",
   "pre": "I'm very ",
   "right": "hot",
   "wrong": [
    "old",
    "happy"
   ],
   "post": "!",
   "ru": "Мне очень жарко!",
   "hint": "Hot — жарко, горячий."
  },
  {
   "lv": 1,
   "q": "Я очень счастлив!",
   "pre": "I am very ",
   "right": "happy",
   "wrong": [
    "old",
    "hot"
   ],
   "post": "!",
   "ru": "Я очень счастлив!",
   "hint": "Happy — счастливый."
  },
  {
   "lv": 2,
   "q": "Можно мне купить твою шубу?",
   "pre": "Can I ",
   "right": "buy",
   "wrong": [
    "coat",
    "gold"
   ],
   "post": " your coat?",
   "ru": "Можно мне купить твою шубу?",
   "hint": "Buy — покупать."
  },
  {
   "lv": 2,
   "q": "Моя лошадь старая!",
   "pre": "My ",
   "right": "horse",
   "wrong": [
    "coat",
    "gold"
   ],
   "post": " is old!",
   "ru": "Моя лошадь старая!",
   "hint": "Horse — лошадь."
  },
  {
   "lv": 3,
   "q": "Спасибо!",
   "pre": "",
   "right": "Thank you",
   "wrong": [
    "Goodbye",
    "Hello"
   ],
   "post": "!",
   "ru": "Спасибо!",
   "hint": "Thank you — спасибо."
  }
 ],
 "sound": [
  [
   "gold",
   "золото",
   "o",
   [
    "a",
    "e"
   ],
   1,
   1
  ],
  [
   "coat",
   "шуба",
   "o",
   [
    "a",
    "e"
   ],
   1,
   2
  ],
  [
   "old",
   "старый",
   "l",
   [
    "d",
    "t"
   ],
   1,
   3
  ]
 ],
 "order": [
  [
   "My coat is old!",
   [
    "Coat my is old!",
    "Is my coat old!"
   ],
   "Моя шуба старая!",
   "Сначала My coat, потом is и какая."
  ],
  [
   "I'm very hot!",
   [
    "Very I'm hot!",
    "Hot I'm very!"
   ],
   "Мне очень жарко!",
   "Сначала I'm, потом very и hot."
  ],
  [
   "Can I buy your coat?",
   [
    "I can buy your coat?",
    "Buy I can your coat?"
   ],
   "Можно мне купить твою шубу?",
   "В вопросе сначала Can I."
  ]
 ],
 "tf": [
  [
   "«{coat}» — это «шуба, пальто».",
   true,
   "Coat — шуба, пальто."
  ],
  [
   "«{old}» — это «новый».",
   false,
   "Old — старый."
  ],
  [
   "«{gold}» — это «золото».",
   true,
   "Gold — золото."
  ],
  [
   "«{Thank you}» значит «спасибо».",
   true,
   "Thank you — спасибо."
  ],
  [
   "«{buy}» значит «продавать».",
   false,
   "Buy — покупать."
  ]
 ]
});
