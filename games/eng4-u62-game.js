/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Wild animals — дикие животные и где они живут». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u62",
 "theme": "autumn",
 "groups": [
  {
   "k": "an",
   "name": "Дикие животные",
   "c": "green",
   "words": [
    [
     "snow leopard",
     "снежный барс"
    ],
    [
     "wolf",
     "волк"
    ],
    [
     "bear",
     "медведь"
    ],
    [
     "fox",
     "лиса"
    ],
    [
     "eagle",
     "орёл"
    ],
    [
     "dolphin",
     "дельфин"
    ],
    [
     "monkey",
     "обезьяна"
    ],
    [
     "elephant",
     "слон"
    ],
    [
     "tiger",
     "тигр"
    ],
    [
     "spider",
     "паук"
    ],
    [
     "octopus",
     "осьминог"
    ]
   ]
  },
  {
   "k": "hab",
   "name": "Где они живут",
   "c": "orange",
   "words": [
    [
     "jungle",
     "джунгли"
    ],
    [
     "mountain",
     "гора"
    ],
    [
     "forest",
     "лес"
    ],
    [
     "desert",
     "пустыня"
    ],
    [
     "sea",
     "море"
    ],
    [
     "river",
     "река"
    ],
    [
     "steppe",
     "степь"
    ]
   ]
  },
  {
   "k": "body",
   "name": "Части тела",
   "c": "blue",
   "words": [
    [
     "tail",
     "хвост"
    ],
    [
     "beak",
     "клюв"
    ],
    [
     "wings",
     "крылья"
    ],
    [
     "feathers",
     "перья"
    ],
    [
     "legs",
     "ноги, лапы"
    ]
   ]
  },
  {
   "k": "past",
   "name": "Вчера и раньше",
   "c": "green",
   "words": [
    [
     "was",
     "был, была"
    ],
    [
     "were",
     "были"
    ],
    [
     "wasn't",
     "не был, не была"
    ],
    [
     "weren't",
     "не были"
    ],
    [
     "yesterday",
     "вчера"
    ],
    [
     "last week",
     "на прошлой неделе"
    ]
   ]
  },
  {
   "k": "sh",
   "name": "Звук sh",
   "c": "orange",
   "words": [
    [
     "fish",
     "рыба"
    ],
    [
     "ship",
     "корабль"
    ],
    [
     "sheep",
     "овца"
    ],
    [
     "shark",
     "акула"
    ],
    [
     "shell",
     "ракушка"
    ],
    [
     "shop",
     "магазин"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "big",
   "большой",
   "small",
   "маленький"
  ],
  [
   "long",
   "длинный",
   "short",
   "короткий"
  ],
  [
   "hot",
   "жаркий",
   "cold",
   "холодный"
  ],
  [
   "fast",
   "быстрый",
   "slow",
   "медленный"
  ],
  [
   "strong",
   "сильный",
   "weak",
   "слабый"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Снежный барс живёт на горе.",
   "pre": "A snow leopard lives on the ",
   "right": "mountain",
   "wrong": [
    "sea",
    "river"
   ],
   "post": ".",
   "ru": "Снежный барс живёт на горе",
   "hint": "Где живёт? Snow leopard — на горе, mountain."
  },
  {
   "lv": 1,
   "q": "Дельфин живёт в море.",
   "pre": "A dolphin lives in the ",
   "right": "sea",
   "wrong": [
    "desert",
    "forest"
   ],
   "post": ".",
   "ru": "Дельфин живёт в море",
   "hint": "Dolphin — дельфин, sea — море."
  },
  {
   "lv": 1,
   "q": "Тигр живёт в джунглях.",
   "pre": "A tiger lives in the ",
   "right": "jungle",
   "wrong": [
    "sea",
    "desert"
   ],
   "post": ".",
   "ru": "Тигр живёт в джунглях",
   "hint": "Jungle — джунгли."
  },
  {
   "lv": 1,
   "q": "Медведь живёт в лесу.",
   "pre": "A bear lives in the ",
   "right": "forest",
   "wrong": [
    "sea",
    "desert"
   ],
   "post": ".",
   "ru": "Медведь живёт в лесу",
   "hint": "Forest — лес."
  },
  {
   "lv": 1,
   "q": "Вчера я был в парке.",
   "pre": "I ",
   "right": "was",
   "wrong": [
    "were",
    "is"
   ],
   "post": " at the park yesterday.",
   "ru": "Вчера я был в парке",
   "hint": "С I в прошлом — was."
  },
  {
   "lv": 1,
   "q": "Мы были на пляже.",
   "pre": "We ",
   "right": "were",
   "wrong": [
    "was",
    "are"
   ],
   "post": " at the beach.",
   "ru": "Мы были на пляже",
   "hint": "С we, you, they — were."
  },
  {
   "lv": 2,
   "q": "Дана вчера не была в школе.",
   "pre": "Dana ",
   "right": "wasn't",
   "wrong": [
    "weren't",
    "isn't"
   ],
   "post": " at school yesterday.",
   "ru": "Дана вчера не была в школе",
   "hint": "С he, she, it — wasn't."
  },
  {
   "lv": 2,
   "q": "Берик и Дамир не были в лесу.",
   "pre": "Berik and Damir ",
   "right": "weren't",
   "wrong": [
    "wasn't",
    "aren't"
   ],
   "post": " in the forest.",
   "ru": "Берик и Дамир не были в лесу",
   "hint": "С they (двое и больше) — weren't."
  },
  {
   "lv": 2,
   "q": "Ты был на реке?",
   "pre": "",
   "right": "Were",
   "wrong": [
    "Was",
    "Are"
   ],
   "post": " you at the river?",
   "ru": "Ты был на реке?",
   "hint": "С you в вопросе — Were."
  },
  {
   "lv": 2,
   "q": "Да, мы были.",
   "pre": "Yes, we ",
   "right": "were",
   "wrong": [
    "was",
    "are"
   ],
   "post": ".",
   "ru": "Да, мы были",
   "hint": "Короткий ответ: Yes, we were."
  },
  {
   "lv": 2,
   "q": "Он на прошлой неделе был в джунглях?",
   "pre": "",
   "right": "Was",
   "wrong": [
    "Were",
    "Is"
   ],
   "post": " he in the jungle last week?",
   "ru": "Он на прошлой неделе был в джунглях?",
   "hint": "С he в вопросе — Was."
  },
  {
   "lv": 2,
   "q": "У птицы есть два крыла.",
   "pre": "A bird has got two ",
   "right": "wings",
   "wrong": [
    "wing",
    "tail"
   ],
   "post": ".",
   "ru": "У птицы есть два крыла",
   "hint": "Два крыла — wings."
  },
  {
   "lv": 2,
   "q": "У паука восемь ног.",
   "pre": "A spider has got eight ",
   "right": "legs",
   "wrong": [
    "leg",
    "tails"
   ],
   "post": ".",
   "ru": "У паука восемь ног",
   "hint": "Много ног — legs."
  },
  {
   "lv": 3,
   "q": "У орла острый клюв.",
   "pre": "An eagle has got a sharp ",
   "right": "beak",
   "wrong": [
    "feathers",
    "legs"
   ],
   "post": ".",
   "ru": "У орла острый клюв",
   "hint": "Beak — клюв."
  },
  {
   "lv": 3,
   "q": "У снежного барса длинный хвост.",
   "pre": "A snow leopard has got a long ",
   "right": "tail",
   "wrong": [
    "legs",
    "wings"
   ],
   "post": ".",
   "ru": "У снежного барса длинный хвост",
   "hint": "Tail — хвост."
  },
  {
   "lv": 3,
   "q": "Лиса живёт в лесу.",
   "pre": "A fox lives ",
   "right": "in",
   "wrong": [
    "on",
    "at"
   ],
   "post": " the forest.",
   "ru": "Лиса живёт в лесу",
   "hint": "Внутри леса — in."
  },
  {
   "lv": 3,
   "q": "Мы были в парке в понедельник.",
   "pre": "We were at the park ",
   "right": "on",
   "wrong": [
    "in",
    "at"
   ],
   "post": " Monday.",
   "ru": "Мы были в парке в понедельник",
   "hint": "Перед днём недели — on."
  },
  {
   "lv": 3,
   "q": "Фильм был в пять часов.",
   "pre": "The film was ",
   "right": "at",
   "wrong": [
    "on",
    "in"
   ],
   "post": " five o'clock.",
   "ru": "Фильм был в пять часов",
   "hint": "Перед временем по часам — at."
  },
  {
   "lv": 3,
   "q": "Они не были там вчера.",
   "pre": "They ",
   "right": "weren't",
   "wrong": [
    "wasn't",
    "isn't"
   ],
   "post": " there yesterday.",
   "ru": "Они не были там вчера",
   "hint": "С they — weren't."
  },
  {
   "lv": 3,
   "q": "У орла красивые перья.",
   "pre": "An eagle has got beautiful ",
   "right": "feathers",
   "wrong": [
    "feather",
    "beaks"
   ],
   "post": ".",
   "ru": "У орла красивые перья",
   "hint": "Много перьев — feathers."
  }
 ],
 "sound": [],
 "order": [
  [
   "A snow leopard lives on the mountain.",
   [
    "A snow leopard live on the mountain.",
    "A snow leopard lives the on mountain."
   ],
   "Снежный барс живёт в горах",
   "Про одного: lives (с -s)."
  ],
  [
   "I was at the beach yesterday.",
   [
    "I were at the beach yesterday.",
    "Yesterday I at the beach was."
   ],
   "Вчера я был на пляже",
   "С I — was."
  ],
  [
   "Were you at the river?",
   [
    "Was you at the river?",
    "Were at the river you?"
   ],
   "Ты был на реке?",
   "В вопросе was или were стоит первым."
  ],
  [
   "We weren't at school.",
   [
    "We wasn't at school.",
    "We not were at school."
   ],
   "Мы не были в школе",
   "С we — weren't."
  ],
  [
   "He wasn't at the park yesterday.",
   [
    "He weren't at the park yesterday.",
    "He wasn't at the yesterday park."
   ],
   "Вчера его не было в парке",
   "С he — wasn't."
  ],
  [
   "An eagle has got big wings.",
   [
    "An eagle have got big wings.",
    "An eagle has big got wings."
   ],
   "У орла большие крылья",
   "С he, she, it — has got."
  ],
  [
   "A spider has got eight legs.",
   [
    "A spider have got eight legs.",
    "A spider has got legs eight."
   ],
   "У паука восемь ног",
   "Has got + число + существительное."
  ],
  [
   "Yes, we were.",
   [
    "Yes, we was.",
    "Yes, we weren't."
   ],
   "Да, мы были",
   "Короткий ответ: Yes, we were."
  ],
  [
   "Dolphins live in the sea.",
   [
    "Dolphins lives in the sea.",
    "Dolphins live the in sea."
   ],
   "Дельфины живут в море",
   "Много животных — live без -s."
  ],
  [
   "It lives in the jungle.",
   [
    "It live in the jungle.",
    "It lives jungle in the."
   ],
   "Оно живёт в джунглях",
   "С it — lives."
  ]
 ],
 "tf": [
  [
   "«{wolf}» значит «волк».",
   true,
   "Wolf — волк."
  ],
  [
   "«{fox}» значит «медведь».",
   false,
   "Fox — лиса; медведь — bear."
  ],
  [
   "«{octopus}» значит «осьминог».",
   true,
   "Octopus — осьминог."
  ],
  [
   "«{steppe}» значит «пустыня».",
   false,
   "Steppe — степь; пустыня — desert."
  ],
  [
   "Орёл — это птица, у неё есть «{wings}» и «{beak}».",
   true,
   "Wings — крылья, beak — клюв."
  ],
  [
   "«{tail}» значит «клюв».",
   false,
   "Tail — хвост; клюв — beak."
  ],
  [
   "Про себя в прошлом говорим «I {was}».",
   true,
   "С I — was."
  ],
  [
   "Про нескольких в прошлом говорим «They {was}».",
   false,
   "С they — were."
  ],
  [
   "«He {wasn't} at the park» значит «Его не было в парке».",
   true,
   "Wasn't — не был."
  ],
  [
   "Вопрос «{Were} you at the beach?» составлен правильно.",
   true,
   "С you — were."
  ],
  [
   "Ответ на вопрос «Were you at the river?» может быть «Yes, I {were}».",
   false,
   "С I — was: Yes, I was."
  ],
  [
   "«A dolphin lives in the {sea}» — дельфин живёт в море.",
   true,
   "Dolphin — sea."
  ],
  [
   "«A spider has got eight {legs}» — у паука восемь ног.",
   true,
   "Legs — ноги, лапы."
  ],
  [
   "Предложение начинается с большой буквы и заканчивается точкой: «The tiger is big.»",
   true,
   "Так пишем предложения."
  ],
  [
   "Слова «{ship}» и «{fish}» начинаются с одного и того же звука.",
   false,
   "Ship начинается со звука sh, а fish — со звука f; sh есть в конце слова fish."
  ],
  [
   "В слове «{sheep}» есть звук «sh».",
   true,
   "Sheep — овца, начинается со звука sh."
  ]
 ]
});
