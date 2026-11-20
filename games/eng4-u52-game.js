/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Daily meals — ежедневное питание». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u52",
 "theme": "autumn",
 "groups": [
  {
   "k": "meal",
   "name": "Приёмы пищи",
   "c": "green",
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
    ],
    [
     "meal",
     "приём пищи"
    ]
   ]
  },
  {
   "k": "food",
   "name": "Еда",
   "c": "orange",
   "words": [
    [
     "cereal",
     "хлопья"
    ],
    [
     "butter",
     "масло"
    ],
    [
     "jam",
     "джем"
    ],
    [
     "eggs",
     "яйца"
    ],
    [
     "pasta",
     "макароны, паста"
    ],
    [
     "soup",
     "суп"
    ],
    [
     "salad",
     "салат"
    ],
    [
     "sandwich",
     "сэндвич"
    ]
   ]
  },
  {
   "k": "drink",
   "name": "Напитки",
   "c": "blue",
   "words": [
    [
     "cocoa",
     "какао"
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
     "juice",
     "сок"
    ],
    [
     "tea",
     "чай"
    ]
   ]
  },
  {
   "k": "how",
   "name": "Как делаем",
   "c": "purple",
   "words": [
    [
     "quickly",
     "быстро"
    ],
    [
     "happily",
     "радостно"
    ],
    [
     "carefully",
     "осторожно"
    ],
    [
     "safely",
     "безопасно"
    ],
    [
     "well",
     "хорошо"
    ],
    [
     "slowly",
     "медленно"
    ]
   ]
  },
  {
   "k": "freq",
   "name": "Как часто",
   "c": "green",
   "words": [
    [
     "always",
     "всегда"
    ],
    [
     "usually",
     "обычно"
    ],
    [
     "often",
     "часто"
    ],
    [
     "sometimes",
     "иногда"
    ],
    [
     "never",
     "никогда"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "quickly",
   "быстро",
   "slowly",
   "медленно"
  ],
  [
   "always",
   "всегда",
   "never",
   "никогда"
  ],
  [
   "hot",
   "горячий",
   "cold",
   "холодный"
  ],
  [
   "sweet",
   "сладкий",
   "salty",
   "солёный"
  ],
  [
   "healthy",
   "полезный",
   "unhealthy",
   "вредный"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Завтрак бывает утром.",
   "pre": "We eat ",
   "right": "breakfast",
   "wrong": [
    "dinner",
    "lunch"
   ],
   "post": " in the morning.",
   "ru": "Мы едим завтрак утром",
   "hint": "Утром — breakfast."
  },
  {
   "lv": 1,
   "q": "Обед бывает днём.",
   "pre": "We have ",
   "right": "lunch",
   "wrong": [
    "breakfast",
    "dinner"
   ],
   "post": " at school at midday.",
   "ru": "Мы обедаем в школе в полдень",
   "hint": "Днём — lunch."
  },
  {
   "lv": 1,
   "q": "Ужин бывает вечером.",
   "pre": "We have ",
   "right": "dinner",
   "wrong": [
    "breakfast",
    "lunch"
   ],
   "post": " in the evening.",
   "ru": "Мы ужинаем вечером",
   "hint": "Вечером — dinner."
  },
  {
   "lv": 1,
   "q": "Дана ест хлопья с молоком.",
   "pre": "Dana eats cereal with ",
   "right": "milk",
   "wrong": [
    "pasta",
    "eggs"
   ],
   "post": ".",
   "ru": "Дана ест хлопья с молоком",
   "hint": "Хлопья едят с молоком — milk."
  },
  {
   "lv": 1,
   "q": "Он бежит быстро.",
   "pre": "He runs ",
   "right": "quickly",
   "wrong": [
    "quick",
    "quicker"
   ],
   "post": ".",
   "ru": "Он бежит быстро",
   "hint": "Глагол описываем словом на -ly: quickly."
  },
  {
   "lv": 1,
   "q": "Она поёт радостно.",
   "pre": "She sings ",
   "right": "happily",
   "wrong": [
    "happy",
    "happyly"
   ],
   "post": ".",
   "ru": "Она поёт радостно",
   "hint": "happy → happily (y меняем на i + ly)."
  },
  {
   "lv": 2,
   "q": "Берик осторожно режет хлеб.",
   "pre": "Berik cuts the bread ",
   "right": "carefully",
   "wrong": [
    "careful",
    "carefuly"
   ],
   "post": ".",
   "ru": "Берик осторожно режет хлеб",
   "hint": "careful + ly = carefully."
  },
  {
   "lv": 2,
   "q": "Дети переходят дорогу безопасно.",
   "pre": "The children cross the road ",
   "right": "safely",
   "wrong": [
    "safe",
    "safety"
   ],
   "post": ".",
   "ru": "Дети безопасно переходят дорогу",
   "hint": "safe + ly = safely."
  },
  {
   "lv": 2,
   "q": "Айдар очень хорошо готовит.",
   "pre": "Aidar cooks very ",
   "right": "well",
   "wrong": [
    "good",
    "goodly"
   ],
   "post": ".",
   "ru": "Айдар очень хорошо готовит",
   "hint": "От good наречие — well."
  },
  {
   "lv": 2,
   "q": "Поезд едет быстро.",
   "pre": "The train goes ",
   "right": "fast",
   "wrong": [
    "fastly",
    "fasting"
   ],
   "post": ".",
   "ru": "Поезд едет быстро",
   "hint": "Fast — и «быстрый», и «быстро»."
  },
  {
   "lv": 2,
   "q": "Она усердно работает.",
   "pre": "She works ",
   "right": "hard",
   "wrong": [
    "hardly",
    "hards"
   ],
   "post": ".",
   "ru": "Она усердно работает",
   "hint": "Hard — и «трудный», и «усердно»."
  },
  {
   "lv": 2,
   "q": "Он медленно ест суп.",
   "pre": "He eats his soup ",
   "right": "slowly",
   "wrong": [
    "slow",
    "slowy"
   ],
   "post": ".",
   "ru": "Он медленно ест суп",
   "hint": "slow + ly = slowly."
  },
  {
   "lv": 2,
   "q": "Я никогда не ем суп на завтрак.",
   "pre": "I ",
   "right": "never",
   "wrong": [
    "always",
    "usually"
   ],
   "post": " eat soup for breakfast.",
   "ru": "Я никогда не ем суп на завтрак",
   "hint": "Never — никогда."
  },
  {
   "lv": 2,
   "q": "Она обычно завтракает дома.",
   "pre": "She ",
   "right": "usually",
   "wrong": [
    "never",
    "sometimes"
   ],
   "post": " has breakfast at home.",
   "ru": "Она обычно завтракает дома",
   "hint": "Usually — обычно."
  },
  {
   "lv": 2,
   "q": "Иногда мы едим плов.",
   "pre": "We ",
   "right": "sometimes",
   "wrong": [
    "always",
    "never"
   ],
   "post": " eat plov.",
   "ru": "Иногда мы едим плов",
   "hint": "Sometimes — иногда."
  },
  {
   "lv": 2,
   "q": "Сколько приёмов пищи нужно в день?",
   "pre": "How ",
   "right": "many",
   "wrong": [
    "much",
    "more"
   ],
   "post": " meals do we need every day?",
   "ru": "Сколько приёмов пищи нам нужно каждый день?",
   "hint": "Приёмы пищи можно посчитать — how many."
  },
  {
   "lv": 2,
   "q": "Сколько воды нужно пить?",
   "pre": "How ",
   "right": "much",
   "wrong": [
    "many",
    "few"
   ],
   "post": " water do we need every day?",
   "ru": "Сколько воды нам нужно каждый день?",
   "hint": "Воду не считают по штукам — how much."
  },
  {
   "lv": 2,
   "q": "Что ты хочешь на завтрак?",
   "pre": "What do you want ",
   "right": "for",
   "wrong": [
    "in",
    "at"
   ],
   "post": " breakfast?",
   "ru": "Что ты хочешь на завтрак?",
   "hint": "На завтрак — for breakfast."
  },
  {
   "lv": 2,
   "q": "Я хочу яйца.",
   "pre": "I want ",
   "right": "some",
   "wrong": [
    "a",
    "an"
   ],
   "post": " eggs.",
   "ru": "Я хочу яиц",
   "hint": "Перед eggs ставим some."
  },
  {
   "lv": 3,
   "q": "Она часто ест салат.",
   "pre": "She ",
   "right": "often eats",
   "wrong": [
    "eats often",
    "often eat"
   ],
   "post": " salad.",
   "ru": "Она часто ест салат",
   "hint": "Often — перед глаголом; с she глагол с -s."
  },
  {
   "lv": 3,
   "q": "Он всегда весёлый.",
   "pre": "He is ",
   "right": "always",
   "wrong": [
    "eat",
    "eats"
   ],
   "post": " happy.",
   "ru": "Он всегда весёлый",
   "hint": "После is ставим always."
  },
  {
   "lv": 3,
   "q": "Можно мне сэндвич, пожалуйста?",
   "pre": "Can I have ",
   "right": "a",
   "wrong": [
    "an",
    "many"
   ],
   "post": " sandwich, please?",
   "ru": "Можно мне сэндвич, пожалуйста?",
   "hint": "Один сэндвич — a sandwich."
  }
 ],
 "sound": [
  [
   "chicken",
   "курица",
   "h",
   [
    "n",
    "k"
   ],
   1,
   1
  ],
  [
   "cheese",
   "сыр",
   "h",
   [
    "k",
    "s"
   ],
   1,
   1
  ],
  [
   "chocolate",
   "шоколад",
   "h",
   [
    "t",
    "s"
   ],
   1,
   1
  ],
  [
   "cherries",
   "вишни",
   "h",
   [
    "k",
    "t"
   ],
   1,
   1
  ],
  [
   "lunch",
   "обед",
   "h",
   [
    "n",
    "l"
   ],
   4,
   2
  ],
  [
   "children",
   "дети",
   "h",
   [
    "k",
    "l"
   ],
   1,
   2
  ],
  [
   "sandwich",
   "сэндвич",
   "w",
   [
    "v",
    "u"
   ],
   4,
   2
  ],
  [
   "juice",
   "сок",
   "j",
   [
    "g",
    "y"
   ],
   0,
   2
  ],
  [
   "butter",
   "масло",
   "u",
   [
    "a",
    "o"
   ],
   1,
   3
  ],
  [
   "cereal",
   "хлопья",
   "r",
   [
    "l",
    "n"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "Aidar is eating soup slowly.",
   [
    "Aidar is eating slowly soup.",
    "Aidar eating is soup slowly."
   ],
   "Айдар медленно ест суп",
   "Наречие manner обычно стоит в конце: eating soup slowly."
  ],
  [
   "She cooks very well.",
   [
    "She cooks very good.",
    "She cooks well very."
   ],
   "Она очень хорошо готовит",
   "От good наречие — well."
  ],
  [
   "Dana always drinks milk.",
   [
    "Dana drinks always milk.",
    "Always Dana milk drinks."
   ],
   "Дана всегда пьёт молоко",
   "Always стоит перед глаголом."
  ],
  [
   "We usually have lunch at school.",
   [
    "We have usually lunch at school.",
    "We usually lunch have at school."
   ],
   "Мы обычно обедаем в школе",
   "Usually — перед have."
  ],
  [
   "Berik cuts the bread carefully.",
   [
    "Berik cuts carefully the bread.",
    "Berik cut the bread careful."
   ],
   "Берик осторожно режет хлеб",
   "Carefully ставим после «the bread»; с he — cuts."
  ],
  [
   "I never eat fish for breakfast.",
   [
    "I eat never fish for breakfast.",
    "I never eats fish for breakfast."
   ],
   "Я никогда не ем рыбу на завтрак",
   "Never перед глаголом; с I — eat."
  ],
  [
   "The children are playing happily.",
   [
    "The children are playing happy.",
    "The children playing are happily."
   ],
   "Дети играют радостно",
   "Для глагола нужно happily, а не happy."
  ],
  [
   "How many meals do we need?",
   [
    "How much meals do we need?",
    "How many meals we need?"
   ],
   "Сколько приёмов пищи нам нужно?",
   "How many + что считаем; потом do we need."
  ],
  [
   "Assel sometimes has a snack.",
   [
    "Assel has sometimes a snack.",
    "Assel sometimes have a snack."
   ],
   "Асель иногда перекусывает",
   "Sometimes перед has; с she — has."
  ],
  [
   "What do you want for dinner?",
   [
    "What you want for dinner?",
    "What do you wants for dinner?"
   ],
   "Что ты хочешь на ужин?",
   "Вопрос: What do you want…?"
  ]
 ],
 "tf": [
  [
   "Слово {breakfast} значит «завтрак».",
   true,
   "Верно. Breakfast — завтрак."
  ],
  [
   "Слово {dinner} значит «завтрак».",
   false,
   "Неверно. Dinner — ужин, breakfast — завтрак."
  ],
  [
   "Слово {lunch} значит «обед».",
   true,
   "Верно. Lunch — обед."
  ],
  [
   "От {careful} наречие получается так: {carefully}.",
   true,
   "Верно. careful + ly = carefully."
  ],
  [
   "От {happy} наречие получается так: {happyly}.",
   false,
   "Неверно. Правильно happily: y меняем на i."
  ],
  [
   "От слова {good} наречие — {well}.",
   true,
   "Верно. She cooks well."
  ],
  [
   "Правильно сказать: {He runs quick}.",
   false,
   "Неверно. Нужно quickly: He runs quickly."
  ],
  [
   "Слово {fast} — и «быстрый», и «быстро».",
   true,
   "Верно. A fast train. It goes fast."
  ],
  [
   "Слово {never} значит «всегда».",
   false,
   "Неверно. Never — никогда, always — всегда."
  ],
  [
   "Правильно сказать: {I always drink water}.",
   true,
   "Верно. Always стоит перед глаголом."
  ],
  [
   "Правильно сказать: {I drink always water}.",
   false,
   "Неверно. Always ставим перед drink."
  ],
  [
   "Про воду говорим {How much water}, про приёмы пищи — {How many meals}.",
   true,
   "Верно. Meals считаем — many; воду — much."
  ],
  [
   "{Cocoa} — это напиток.",
   true,
   "Верно. Cocoa — какао."
  ],
  [
   "В слове {chicken} буквы «ch» читаются как «ч».",
   true,
   "Верно. Chicken, cheese, lunch."
  ]
 ]
});
