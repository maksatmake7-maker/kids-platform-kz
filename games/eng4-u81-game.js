/* Английский язык, 4 класс (A1.2) — «Inventions and bright ideas — изобретения и яркие идеи». Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u81",
 "theme": "space",
 "groups": [
  {
   "k": "dev",
   "name": "Устройства",
   "c": "green",
   "words": [
    [
     "headphones",
     "наушники"
    ],
    [
     "smartphone",
     "смартфон"
    ],
    [
     "games console",
     "игровая приставка"
    ],
    [
     "digital camera",
     "цифровая камера"
    ],
    [
     "remote control",
     "пульт"
    ],
    [
     "laptop",
     "ноутбук"
    ],
    [
     "smartwatch",
     "смарт-часы"
    ],
    [
     "MP3 player",
     "MP3-плеер"
    ]
   ]
  },
  {
   "k": "part",
   "name": "Части и детали",
   "c": "orange",
   "words": [
    [
     "keyboard",
     "клавиатура"
    ],
    [
     "mouse",
     "мышь"
    ],
    [
     "screen",
     "экран"
    ],
    [
     "battery",
     "батарейка"
    ],
    [
     "torch",
     "фонарик"
    ],
    [
     "button",
     "кнопка"
    ]
   ]
  },
  {
   "k": "key",
   "name": "Клавиши",
   "c": "blue",
   "words": [
    [
     "delete",
     "удалить"
    ],
    [
     "capital letter",
     "заглавная буква"
    ],
    [
     "space",
     "пробел"
    ],
    [
     "question mark",
     "вопросительный знак"
    ],
    [
     "new line",
     "новая строка"
    ]
   ]
  },
  {
   "k": "en",
   "name": "Энергия",
   "c": "purple",
   "words": [
    [
     "batteries",
     "батарейки"
    ],
    [
     "electricity",
     "электричество"
    ],
    [
     "plug",
     "вилка"
    ],
    [
     "charger",
     "зарядное устройство"
    ],
    [
     "socket",
     "розетка"
    ],
    [
     "run on",
     "работать на"
    ]
   ]
  },
  {
   "k": "cmp",
   "name": "Сравниваем",
   "c": "green",
   "words": [
    [
     "smaller",
     "меньше"
    ],
    [
     "bigger",
     "больше"
    ],
    [
     "heavier",
     "тяжелее"
    ],
    [
     "lighter",
     "легче"
    ],
    [
     "better",
     "лучше"
    ],
    [
     "worse",
     "хуже"
    ],
    [
     "more expensive",
     "дороже"
    ]
   ]
  },
  {
   "k": "sup",
   "name": "Самый-самый",
   "c": "orange",
   "words": [
    [
     "smallest",
     "самый маленький"
    ],
    [
     "biggest",
     "самый большой"
    ],
    [
     "heaviest",
     "самый тяжёлый"
    ],
    [
     "best",
     "лучший"
    ],
    [
     "worst",
     "худший"
    ],
    [
     "most expensive",
     "самый дорогой"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "small",
   "маленький",
   "big",
   "большой"
  ],
  [
   "old",
   "старый",
   "new",
   "новый"
  ],
  [
   "heavy",
   "тяжёлый",
   "light",
   "лёгкий"
  ],
  [
   "good",
   "хороший",
   "bad",
   "плохой"
  ],
  [
   "cheap",
   "дешёвый",
   "expensive",
   "дорогой"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Мой телефон меньше твоего.",
   "pre": "My phone is ",
   "right": "smaller",
   "wrong": [
    "small",
    "smallest"
   ],
   "post": " than yours.",
   "ru": "Мой телефон меньше твоего",
   "hint": "Сравниваем двоих: small + -er и than."
  },
  {
   "lv": 1,
   "q": "Это самая большая приставка.",
   "pre": "This is the ",
   "right": "biggest",
   "wrong": [
    "bigger",
    "big"
   ],
   "post": " console.",
   "ru": "Это самая большая приставка",
   "hint": "Самый-самый: the + -est."
  },
  {
   "lv": 1,
   "q": "У меня есть идея!",
   "pre": "I've ",
   "right": "got",
   "wrong": [
    "get",
    "gets"
   ],
   "post": " an idea!",
   "ru": "У меня есть идея",
   "hint": "I've got — у меня есть."
  },
  {
   "lv": 1,
   "q": "Фонарик работает на батарейках.",
   "pre": "The torch runs on ",
   "right": "batteries",
   "wrong": [
    "electricity",
    "plug"
   ],
   "post": ".",
   "ru": "Фонарик работает на батарейках",
   "hint": "Torch работает на batteries."
  },
  {
   "lv": 1,
   "q": "Телевизор работает на электричестве.",
   "pre": "The TV runs on ",
   "right": "electricity",
   "wrong": [
    "batteries",
    "screen"
   ],
   "post": ".",
   "ru": "Телевизор работает на электричестве",
   "hint": "TV включаем в розетку: electricity."
  },
  {
   "lv": 1,
   "q": "Какую клавишу нажать, чтобы удалить?",
   "pre": "Press the ",
   "right": "delete",
   "wrong": [
    "space",
    "capital"
   ],
   "post": " key.",
   "ru": "Нажми клавишу удаления",
   "hint": "Delete — удалить."
  },
  {
   "lv": 2,
   "q": "Этот ноутбук тяжелее того.",
   "pre": "This laptop is ",
   "right": "heavier",
   "wrong": [
    "heavy",
    "heaviest"
   ],
   "post": " than that one.",
   "ru": "Этот ноутбук тяжелее того",
   "hint": "Heavy → heavier (y меняется на i)."
  },
  {
   "lv": 2,
   "q": "Эта камера лучше той.",
   "pre": "This camera is ",
   "right": "better",
   "wrong": [
    "good",
    "best"
   ],
   "post": " than that one.",
   "ru": "Эта камера лучше той",
   "hint": "Good — better — best."
  },
  {
   "lv": 2,
   "q": "Это лучшая игра из всех.",
   "pre": "This is the ",
   "right": "best",
   "wrong": [
    "better",
    "good"
   ],
   "post": " game of all.",
   "ru": "Это лучшая игра из всех",
   "hint": "После the — best."
  },
  {
   "lv": 2,
   "q": "У тебя есть идея?",
   "pre": "",
   "right": "Have",
   "wrong": [
    "Has",
    "Do"
   ],
   "post": " you got an idea?",
   "ru": "У тебя есть идея?",
   "hint": "С you — Have you got...?"
  },
  {
   "lv": 2,
   "q": "Смартфон дороже наушников.",
   "pre": "A smartphone is ",
   "right": "more expensive",
   "wrong": [
    "expensive",
    "expensiver"
   ],
   "post": " than headphones.",
   "ru": "Смартфон дороже наушников",
   "hint": "Длинные слова: more + слово."
  },
  {
   "lv": 2,
   "q": "Нужна заглавная буква: нажми Shift.",
   "pre": "Press the Shift key for a ",
   "right": "capital letter",
   "wrong": [
    "space",
    "question mark"
   ],
   "post": ".",
   "ru": "Shift даёт заглавную букву",
   "hint": "Capital letter — заглавная буква."
  },
  {
   "lv": 2,
   "q": "Новый телефон Даны новее, чем у Айдара.",
   "pre": "Dana's phone is ",
   "right": "newer",
   "wrong": [
    "new",
    "newest"
   ],
   "post": " than Aidar's.",
   "ru": "Телефон Даны новее",
   "hint": "Двое — -er, than."
  },
  {
   "lv": 3,
   "q": "Это самый дорогой смартфон в магазине.",
   "pre": "This is the ",
   "right": "most expensive",
   "wrong": [
    "more expensive",
    "expensive"
   ],
   "post": " smartphone in the shop.",
   "ru": "Самый дорогой смартфон в магазине",
   "hint": "Самый: the most + длинное слово."
  },
  {
   "lv": 3,
   "q": "Эта мышь хуже той.",
   "pre": "This mouse is ",
   "right": "worse",
   "wrong": [
    "bad",
    "worst"
   ],
   "post": " than that one.",
   "ru": "Эта мышь хуже той",
   "hint": "Bad — worse — worst."
  },
  {
   "lv": 3,
   "q": "Пульт работает на батарейках.",
   "pre": "The remote control ",
   "right": "runs on",
   "wrong": [
    "run on",
    "runs in"
   ],
   "post": " batteries.",
   "ru": "Пульт работает на батарейках",
   "hint": "С remote control — runs on (3 лицо, -s)."
  },
  {
   "lv": 3,
   "q": "Чтобы поставить пробел, нажми длинную клавишу.",
   "pre": "Press the ",
   "right": "space",
   "wrong": [
    "delete",
    "capital"
   ],
   "post": " key between words.",
   "ru": "Пробел между словами",
   "hint": "Space — пробел."
  },
  {
   "lv": 3,
   "q": "Айгерим сказала: «У меня есть идея!»",
   "pre": "Aigerim said, \"",
   "right": "I've got",
   "wrong": [
    "I've get",
    "Have got"
   ],
   "post": " an idea!\"",
   "ru": "«У меня есть идея!»",
   "hint": "I've got an idea."
  },
  {
   "lv": 3,
   "q": "Это самое лёгкое устройство в классе.",
   "pre": "This is the ",
   "right": "lightest",
   "wrong": [
    "lighter",
    "light"
   ],
   "post": " gadget in our class.",
   "ru": "Самое лёгкое устройство",
   "hint": "Light — lighter — lightest."
  }
 ],
 "sound": [
  [
   "headphones",
   "наушники",
   "p",
   [
    "b",
    "t"
   ],
   4,
   1
  ],
  [
   "camera",
   "камера",
   "m",
   [
    "n",
    "w"
   ],
   2,
   1
  ],
  [
   "laptop",
   "ноутбук",
   "p",
   [
    "b",
    "t"
   ],
   2,
   1
  ],
  [
   "keyboard",
   "клавиатура",
   "k",
   [
    "c",
    "q"
   ],
   0,
   1
  ],
  [
   "mouse",
   "мышь",
   "s",
   [
    "z",
    "c"
   ],
   3,
   2
  ],
  [
   "screen",
   "экран",
   "r",
   [
    "l",
    "n"
   ],
   2,
   2
  ],
  [
   "battery",
   "батарейка",
   "y",
   [
    "i",
    "e"
   ],
   6,
   2
  ],
  [
   "torch",
   "фонарик",
   "h",
   [
    "k",
    "l"
   ],
   4,
   2
  ],
  [
   "smartphone",
   "смартфон",
   "t",
   [
    "d",
    "l"
   ],
   4,
   3
  ],
  [
   "electricity",
   "электричество",
   "c",
   [
    "k",
    "s"
   ],
   3,
   3
  ]
 ],
 "order": [
  [
   "My phone is smaller than yours.",
   [
    "My phone smaller is than yours.",
    "My phone is small than yours."
   ],
   "Мой телефон меньше твоего",
   "Сравнение: is + -er + than."
  ],
  [
   "This is the biggest screen.",
   [
    "This is the bigger screen.",
    "This is biggest the screen."
   ],
   "Это самый большой экран",
   "The + -est + слово."
  ],
  [
   "I've got an idea!",
   [
    "I got have an idea!",
    "I've an got idea!"
   ],
   "У меня есть идея!",
   "I've got + an idea."
  ],
  [
   "Have you got an idea?",
   [
    "You have got an idea?",
    "Have got you an idea?"
   ],
   "У тебя есть идея?",
   "В вопросе Have идёт первым."
  ],
  [
   "The torch runs on batteries.",
   [
    "The torch run on batteries.",
    "The torch runs batteries on."
   ],
   "Фонарик работает на батарейках",
   "The torch runs on + что."
  ],
  [
   "This laptop is heavier than that laptop.",
   [
    "This laptop is heavy than that laptop.",
    "This laptop heavier is than that laptop."
   ],
   "Этот ноутбук тяжелее того",
   "Heavy → heavier + than."
  ],
  [
   "The best camera is here.",
   [
    "The better camera is here.",
    "The camera best is here."
   ],
   "Лучшая камера здесь",
   "The best — самый лучший."
  ],
  [
   "A console is more expensive than headphones.",
   [
    "A console is expensiver than headphones.",
    "A console is more expensive headphones."
   ],
   "Приставка дороже наушников",
   "More expensive + than."
  ],
  [
   "Press the delete key.",
   [
    "Press delete the key.",
    "Press the key delete."
   ],
   "Нажми клавишу удаления",
   "Press the + delete + key."
  ],
  [
   "This is the newest smartphone.",
   [
    "This is the newer smartphone.",
    "This is newest the smartphone."
   ],
   "Это самый новый смартфон",
   "The + -est."
  ]
 ],
 "tf": [
  [
   "«{small}» — «{smaller}» — «{smallest}»: это маленький — меньше — самый маленький.",
   true,
   "Small — smaller — smallest."
  ],
  [
   "«{headphones}» значит «клавиатура».",
   false,
   "Headphones — наушники; клавиатура — keyboard."
  ],
  [
   "«{good} — {better} — {best}» — правильный ряд.",
   true,
   "Good — better — best."
  ],
  [
   "Правильно сказать «{gooder}».",
   false,
   "Надо better."
  ],
  [
   "Фраза «{I've got an idea!}» значит «У меня есть идея!»",
   true,
   "I've got — у меня есть."
  ],
  [
   "«{screen}» значит «экран».",
   true,
   "Screen — экран."
  ],
  [
   "«{expensive}» — «{more expensive}» — «{the most expensive}»: самый дорогой — это the most expensive.",
   true,
   "Длинные слова: more и the most."
  ],
  [
   "Правильно сказать «{expensiver}».",
   false,
   "Надо more expensive."
  ],
  [
   "Фонарик работает на {batteries}.",
   true,
   "Torch — на батарейках."
  ],
  [
   "Клавиша {delete} нужна, чтобы поставить пробел.",
   false,
   "Delete — удалить; пробел — space."
  ],
  [
   "«{capital letter}» значит «заглавная буква».",
   true,
   "Capital letter — заглавная буква."
  ],
  [
   "«{heavy}» — «{heavier}» — «{heaviest}»: тяжёлый — тяжелее — самый тяжёлый.",
   true,
   "Y меняется на i."
  ],
  [
   "«{bad}» — «{worse}» — «{worst}»: плохой — хуже — худший.",
   true,
   "Bad — worse — worst."
  ],
  [
   "Правильно сказать «{badder}».",
   false,
   "Надо worse."
  ]
 ]
});
