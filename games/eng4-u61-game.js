/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «On the farm — на ферме». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u61",
 "theme": "garden",
 "groups": [
  {
   "k": "animals",
   "name": "Животные",
   "c": "green",
   "words": [
    [
     "cow",
     "корова"
    ],
    [
     "horse",
     "лошадь"
    ],
    [
     "sheep",
     "овца"
    ],
    [
     "goat",
     "коза"
    ],
    [
     "hen",
     "курица"
    ],
    [
     "duck",
     "утка"
    ],
    [
     "donkey",
     "осёл"
    ],
    [
     "camel",
     "верблюд"
    ]
   ]
  },
  {
   "k": "farm",
   "name": "На ферме",
   "c": "orange",
   "words": [
    [
     "farmer",
     "фермер"
    ],
    [
     "barn",
     "амбар, сарай"
    ],
    [
     "field",
     "поле"
    ],
    [
     "farm",
     "ферма"
    ],
    [
     "tractor",
     "трактор"
    ],
    [
     "hay",
     "сено"
    ]
   ]
  },
  {
   "k": "prod",
   "name": "Что мы получаем",
   "c": "blue",
   "words": [
    [
     "milk",
     "молоко"
    ],
    [
     "eggs",
     "яйца"
    ],
    [
     "wool",
     "шерсть"
    ],
    [
     "cheese",
     "сыр"
    ],
    [
     "honey",
     "мёд"
    ],
    [
     "butter",
     "масло"
    ]
   ]
  },
  {
   "k": "body",
   "name": "Части тела",
   "c": "green",
   "words": [
    [
     "head",
     "голова"
    ],
    [
     "body",
     "тело"
    ],
    [
     "legs",
     "ноги"
    ],
    [
     "tail",
     "хвост"
    ],
    [
     "wings",
     "крылья"
    ],
    [
     "horns",
     "рога"
    ]
   ]
  },
  {
   "k": "pl",
   "name": "Особые множественные числа",
   "c": "orange",
   "words": [
    [
     "geese",
     "гуси"
    ],
    [
     "mice",
     "мыши"
    ],
    [
     "sheep (2)",
     "две овцы"
    ],
    [
     "children",
     "дети"
    ],
    [
     "goose",
     "гусь"
    ],
    [
     "mouse",
     "мышь"
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
   "old",
   "старый",
   "young",
   "молодой"
  ],
  [
   "fast",
   "быстрый",
   "slow",
   "медленный"
  ],
  [
   "fat",
   "толстый",
   "thin",
   "худой"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "У коровы четыре ноги.",
   "pre": "A cow has got four ",
   "right": "legs",
   "wrong": [
    "leg",
    "foot"
   ],
   "post": ".",
   "ru": "У коровы четыре ноги",
   "hint": "Ног несколько — legs."
  },
  {
   "lv": 1,
   "q": "Это курица.",
   "pre": "This is ",
   "right": "a hen",
   "wrong": [
    "an hen",
    "hens"
   ],
   "post": ".",
   "ru": "Это курица",
   "hint": "Одна курица — a hen."
  },
  {
   "lv": 1,
   "q": "Это осёл.",
   "pre": "This is ",
   "right": "a donkey",
   "wrong": [
    "an donkey",
    "donkeys"
   ],
   "post": ".",
   "ru": "Это осёл",
   "hint": "Один осёл, слово на согласный — a donkey."
  },
  {
   "lv": 1,
   "q": "Это яйцо.",
   "pre": "This is ",
   "right": "an",
   "wrong": [
    "a",
    "two"
   ],
   "post": " egg.",
   "ru": "Это яйцо",
   "hint": "Перед гласным звуком — an."
  },
  {
   "lv": 1,
   "q": "У лошади длинный хвост.",
   "pre": "The horse has got a long ",
   "right": "tail",
   "wrong": [
    "tails",
    "tall"
   ],
   "post": ".",
   "ru": "У лошади длинный хвост",
   "hint": "Tail — хвост, у лошади он один."
  },
  {
   "lv": 2,
   "q": "Две овцы в поле.",
   "pre": "Two ",
   "right": "sheep",
   "wrong": [
    "sheeps",
    "sheepes"
   ],
   "post": " are in the field.",
   "ru": "Две овцы в поле",
   "hint": "Sheep во множественном числе не меняется."
  },
  {
   "lv": 2,
   "q": "Посмотри на трёх гусей!",
   "pre": "Look at the three ",
   "right": "geese",
   "wrong": [
    "gooses",
    "goose"
   ],
   "post": "!",
   "ru": "Посмотри на трёх гусей",
   "hint": "Много гусей — geese."
  },
  {
   "lv": 2,
   "q": "Две мыши в амбаре.",
   "pre": "Two ",
   "right": "mice",
   "wrong": [
    "mouses",
    "mouse"
   ],
   "post": " are in the barn.",
   "ru": "Две мыши в амбаре",
   "hint": "Много мышей — mice."
  },
  {
   "lv": 2,
   "q": "Это корова фермера.",
   "pre": "This is the ",
   "right": "farmer's",
   "wrong": [
    "farmers",
    "farmer"
   ],
   "post": " cow.",
   "ru": "Это корова фермера",
   "hint": "Принадлежность: имя + 's."
  },
  {
   "lv": 2,
   "q": "Это лошадь Айдара.",
   "pre": "This is ",
   "right": "Aidar's",
   "wrong": [
    "Aidars",
    "Aidar"
   ],
   "post": " horse.",
   "ru": "Это лошадь Айдара",
   "hint": "Принадлежность: имя + 's."
  },
  {
   "lv": 2,
   "q": "Пожалуйста, покорми курицу!",
   "pre": "Please ",
   "right": "feed",
   "wrong": [
    "feeds",
    "feeding"
   ],
   "post": " the hen!",
   "ru": "Пожалуйста, покорми курицу",
   "hint": "Приказ: глагол без изменений."
  },
  {
   "lv": 3,
   "q": "У козы два рога.",
   "pre": "The goat ",
   "right": "has got",
   "wrong": [
    "have got",
    "is got"
   ],
   "post": " two horns.",
   "ru": "У козы два рога",
   "hint": "С he, she, it и одним животным — has got."
  },
  {
   "lv": 3,
   "q": "У коров длинные хвосты.",
   "pre": "Cows ",
   "right": "have got",
   "wrong": [
    "has got",
    "is got"
   ],
   "post": " long tails.",
   "ru": "У коров длинные хвосты",
   "hint": "Животных несколько — have got."
  },
  {
   "lv": 3,
   "q": "Верблюд большой, а мышь маленькая.",
   "pre": "A camel is big, but a mouse is ",
   "right": "small",
   "wrong": [
    "big",
    "long"
   ],
   "post": ".",
   "ru": "Верблюд большой, а мышь маленькая",
   "hint": "But — «но»; противоположность big — small."
  },
  {
   "lv": 3,
   "q": "Пожалуйста, не бегай по полю!",
   "pre": "Please ",
   "right": "don't",
   "wrong": [
    "not",
    "no"
   ],
   "post": " run in the field!",
   "ru": "Пожалуйста, не бегай по полю",
   "hint": "Запрет: don't + глагол."
  },
  {
   "lv": 3,
   "q": "Мы получаем шерсть от овцы.",
   "pre": "We get wool from ",
   "right": "a sheep",
   "wrong": [
    "an sheep",
    "a sheeps"
   ],
   "post": ".",
   "ru": "Мы получаем шерсть от овцы",
   "hint": "Одна овца — a sheep."
  },
  {
   "lv": 3,
   "q": "Это старая лошадь.",
   "pre": "It is ",
   "right": "an old",
   "wrong": [
    "a old",
    "old a"
   ],
   "post": " horse.",
   "ru": "Это старая лошадь",
   "hint": "Old начинается с гласного звука — an."
  },
  {
   "lv": 3,
   "q": "У фермера есть курица. Эта курица голодная.",
   "pre": "The farmer has a hen. ",
   "right": "The",
   "wrong": [
    "A",
    "An"
   ],
   "post": " hen is hungry.",
   "ru": "Эта курица голодная",
   "hint": "Когда уже известно, какая курица, — the."
  }
 ],
 "sound": [
  [
   "cow",
   "корова",
   "w",
   [
    "v",
    "u"
   ],
   2,
   1
  ],
  [
   "goat",
   "коза",
   "o",
   [
    "a",
    "u"
   ],
   1,
   1
  ],
  [
   "hen",
   "курица",
   "e",
   [
    "a",
    "i"
   ],
   1,
   1
  ],
  [
   "duck",
   "утка",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "horse",
   "лошадь",
   "r",
   [
    "l",
    "n"
   ],
   2,
   2
  ],
  [
   "sheep",
   "овца",
   "p",
   [
    "b",
    "t"
   ],
   4,
   2
  ],
  [
   "camel",
   "верблюд",
   "m",
   [
    "n",
    "l"
   ],
   2,
   2
  ],
  [
   "milk",
   "молоко",
   "l",
   [
    "r",
    "k"
   ],
   2,
   2
  ],
  [
   "eggs",
   "яйца",
   "g",
   [
    "j",
    "q"
   ],
   1,
   3
  ],
  [
   "wool",
   "шерсть",
   "l",
   [
    "i",
    "t"
   ],
   3,
   3
  ],
  [
   "farm",
   "ферма",
   "r",
   [
    "l",
    "n"
   ],
   2,
   3
  ],
  [
   "barn",
   "амбар",
   "r",
   [
    "l",
    "m"
   ],
   2,
   3
  ]
 ],
 "order": [
  [
   "The cow has got four legs.",
   [
    "The cow have got four legs.",
    "The cow has four got legs."
   ],
   "У коровы четыре ноги",
   "С одним животным — has got."
  ],
  [
   "Feed the hen!",
   [
    "Feeds the hen!",
    "The hen feed!"
   ],
   "Покорми курицу!",
   "Приказ начинается с глагола."
  ],
  [
   "This is the farmer's horse.",
   [
    "This is the farmers horse.",
    "This is the horse farmer's."
   ],
   "Это лошадь фермера",
   "Принадлежность: farmer's + предмет."
  ],
  [
   "Two sheep are in the field.",
   [
    "Two sheeps are in the field.",
    "Two sheep is in the field."
   ],
   "Две овцы в поле",
   "Sheep не меняется; несколько — are."
  ],
  [
   "The geese are on the farm.",
   [
    "The gooses are on the farm.",
    "The geese is on the farm."
   ],
   "Гуси на ферме",
   "Geese — много гусей, are."
  ],
  [
   "It is an egg.",
   [
    "It is a egg.",
    "It an is egg."
   ],
   "Это яйцо",
   "Egg начинается с гласного звука — an."
  ],
  [
   "Don't open the barn door!",
   [
    "Don't opens the barn door!",
    "Not open the barn door!"
   ],
   "Не открывай дверь амбара!",
   "Запрет: don't + глагол."
  ],
  [
   "A camel has got a big body.",
   [
    "A camel have got a big body.",
    "A camel has got big a body."
   ],
   "У верблюда большое тело",
   "Has got a big body: a стоит перед big."
  ],
  [
   "I can see three mice.",
   [
    "I can see three mouses.",
    "I can see three mouse."
   ],
   "Я вижу трёх мышей",
   "Много мышей — mice."
  ],
  [
   "What has it got?",
   [
    "What it has got?",
    "What has got it?"
   ],
   "Что у него есть?",
   "В вопросе has стоит после what."
  ]
 ],
 "tf": [
  [
   "«{sheep}» во множественном числе не меняется: two {sheep}.",
   true,
   "Sheep — и одна овца, и много овец."
  ],
  [
   "Много гусей по-английски — «{geese}».",
   true,
   "Один гусь — goose, много — geese."
  ],
  [
   "Много мышей по-английски — «{mouses}».",
   false,
   "Правильно — mice."
  ],
  [
   "«{the farmer's cow}» значит «корова фермера».",
   true,
   "'s показывает, чья корова."
  ],
  [
   "Перед словом «{egg}» ставим «{a}».",
   false,
   "Egg начинается с гласного звука, поэтому an egg."
  ],
  [
   "«{Feed the hen!}» значит «Покорми курицу!».",
   true,
   "Feed — кормить."
  ],
  [
   "«{wool}» — это шерсть.",
   true,
   "Wool — шерсть."
  ],
  [
   "У курицы четыре ноги: «A {hen} has got four {legs}».",
   false,
   "У курицы две ноги (two legs)."
  ],
  [
   "«{donkey}» — это осёл.",
   true,
   "Donkey — осёл."
  ],
  [
   "«{camel}» значит «лошадь».",
   false,
   "Camel — верблюд; лошадь — horse."
  ],
  [
   "«{barn}» — это амбар или сарай на ферме.",
   true,
   "Barn — амбар, сарай."
  ],
  [
   "«{Aidar's} horse» значит «лошадь Айдара».",
   true,
   "Имя + 's — принадлежность."
  ],
  [
   "«{Don't run!}» значит «Беги!».",
   false,
   "Don't run — «Не беги!»."
  ]
 ]
});
