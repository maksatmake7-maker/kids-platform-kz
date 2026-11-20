/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «What do you do? — чем ты занимаешься?». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u42",
 "theme": "autumn",
 "groups": [
  {
   "k": "do",
   "name": "Что делают",
   "c": "green",
   "words": [
    [
     "help sick people",
     "помогать больным"
    ],
    [
     "make bread",
     "печь хлеб"
    ],
    [
     "fight fires",
     "тушить пожары"
    ],
    [
     "bring letters and parcels",
     "приносить письма и посылки"
    ],
    [
     "sell vegetables",
     "продавать овощи"
    ],
    [
     "grow fruit",
     "выращивать фрукты"
    ],
    [
     "teach pupils",
     "учить учеников"
    ]
   ]
  },
  {
   "k": "job",
   "name": "Профессии",
   "c": "orange",
   "words": [
    [
     "doctor",
     "врач"
    ],
    [
     "baker",
     "пекарь"
    ],
    [
     "firefighter",
     "пожарный"
    ],
    [
     "postman",
     "почтальон"
    ],
    [
     "farmer",
     "фермер"
    ],
    [
     "teacher",
     "учитель"
    ],
    [
     "shop assistant",
     "продавец"
    ]
   ]
  },
  {
   "k": "q",
   "name": "Вопросы",
   "c": "blue",
   "words": [
    [
     "Who",
     "кто"
    ],
    [
     "What",
     "что"
    ],
    [
     "Where",
     "где"
    ],
    [
     "When",
     "когда"
    ],
    [
     "How many",
     "сколько"
    ],
    [
     "Whose",
     "чей"
    ]
   ]
  },
  {
   "k": "day",
   "name": "Мой день",
   "c": "green",
   "words": [
    [
     "get up early",
     "вставать рано"
    ],
    [
     "have breakfast",
     "завтракать"
    ],
    [
     "work all day",
     "работать весь день"
    ],
    [
     "have dinner",
     "ужинать"
    ],
    [
     "watch TV",
     "смотреть телевизор"
    ],
    [
     "go to bed",
     "ложиться спать"
    ]
   ]
  },
  {
   "k": "safe",
   "name": "На улице",
   "c": "orange",
   "words": [
    [
     "helmet",
     "шлем"
    ],
    [
     "seat belt",
     "ремень безопасности"
    ],
    [
     "pavement",
     "тротуар"
    ],
    [
     "zebra crossing",
     "зебра, пешеходный переход"
    ],
    [
     "street",
     "улица"
    ],
    [
     "cross the street",
     "переходить улицу"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "early",
   "рано",
   "late",
   "поздно"
  ],
  [
   "always",
   "всегда",
   "never",
   "никогда"
  ],
  [
   "morning",
   "утро",
   "evening",
   "вечер"
  ],
  [
   "safe",
   "безопасный",
   "dangerous",
   "опасный"
  ],
  [
   "sick",
   "больной",
   "healthy",
   "здоровый"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Она выращивает фрукты.",
   "pre": "She ",
   "right": "grows",
   "wrong": [
    "grow",
    "growing"
   ],
   "post": " fruit.",
   "ru": "Она выращивает фрукты",
   "hint": "С she к глаголу добавляем -s."
  },
  {
   "lv": 1,
   "q": "Он печёт хлеб.",
   "pre": "He ",
   "right": "makes",
   "wrong": [
    "make",
    "making"
   ],
   "post": " bread.",
   "ru": "Он печёт хлеб",
   "hint": "С he глагол с -s."
  },
  {
   "lv": 1,
   "q": "Пожарный тушит пожары.",
   "pre": "A firefighter ",
   "right": "fights",
   "wrong": [
    "fight",
    "fighting"
   ],
   "post": " fires.",
   "ru": "Пожарный тушит пожары",
   "hint": "Один человек (he, she) — глагол с -s."
  },
  {
   "lv": 1,
   "q": "Почтальон приносит письма.",
   "pre": "A postman ",
   "right": "brings",
   "wrong": [
    "bring",
    "bringing"
   ],
   "post": " letters.",
   "ru": "Почтальон приносит письма",
   "hint": "Один человек — brings."
  },
  {
   "lv": 1,
   "q": "Они продают овощи.",
   "pre": "They ",
   "right": "sell",
   "wrong": [
    "sells",
    "selling"
   ],
   "post": " vegetables.",
   "ru": "Они продают овощи",
   "hint": "С they глагол без -s."
  },
  {
   "lv": 1,
   "q": "Врач помогает больным.",
   "pre": "A doctor ",
   "right": "helps",
   "wrong": [
    "help",
    "helping"
   ],
   "post": " sick people.",
   "ru": "Врач помогает больным",
   "hint": "Один человек — helps."
  },
  {
   "lv": 2,
   "q": "Он не печёт хлеб.",
   "pre": "He ",
   "right": "doesn't",
   "wrong": [
    "don't",
    "isn't"
   ],
   "post": " make bread.",
   "ru": "Он не печёт хлеб",
   "hint": "С he/she отрицание — doesn't."
  },
  {
   "lv": 2,
   "q": "Что он делает?",
   "pre": "What ",
   "right": "does",
   "wrong": [
    "do",
    "is"
   ],
   "post": " he do?",
   "ru": "Что он делает?",
   "hint": "С he/she в вопросе — does."
  },
  {
   "lv": 2,
   "q": "Где она работает?",
   "pre": "Where does she ",
   "right": "work",
   "wrong": [
    "works",
    "working"
   ],
   "post": "?",
   "ru": "Где она работает?",
   "hint": "После does глагол без -s."
  },
  {
   "lv": 2,
   "q": "Кто она?",
   "pre": "Who ",
   "right": "is",
   "wrong": [
    "does",
    "are"
   ],
   "post": " she?",
   "ru": "Кто она?",
   "hint": "С she — is."
  },
  {
   "lv": 2,
   "q": "Сколько учеников в классе?",
   "pre": "How ",
   "right": "many",
   "wrong": [
    "much",
    "old"
   ],
   "post": " pupils are there?",
   "ru": "Сколько учеников?",
   "hint": "Если можно посчитать — how many."
  },
  {
   "lv": 2,
   "q": "Чьи это книги?",
   "pre": "",
   "right": "Whose",
   "wrong": [
    "Who",
    "What"
   ],
   "post": " books are these?",
   "ru": "Чьи это книги?",
   "hint": "Whose — чей, чья, чьи."
  },
  {
   "lv": 3,
   "q": "Мой папа встаёт рано.",
   "pre": "My dad ",
   "right": "gets up",
   "wrong": [
    "get up",
    "getting up"
   ],
   "post": " early.",
   "ru": "Мой папа встаёт рано",
   "hint": "Dad — это he, значит gets."
  },
  {
   "lv": 3,
   "q": "Мы завтракаем в семь часов.",
   "pre": "We ",
   "right": "have",
   "wrong": [
    "has",
    "having"
   ],
   "post": " breakfast at seven.",
   "ru": "Мы завтракаем в семь",
   "hint": "С we глагол без -s."
  },
  {
   "lv": 3,
   "q": "Всегда надевай шлем.",
   "pre": "Always ",
   "right": "wear",
   "wrong": [
    "wears",
    "wearing"
   ],
   "post": " a helmet.",
   "ru": "Всегда надевай шлем",
   "hint": "Приказ — глагол без -s."
  },
  {
   "lv": 3,
   "q": "Никогда не играй на улице.",
   "pre": "Never ",
   "right": "play",
   "wrong": [
    "plays",
    "playing"
   ],
   "post": " in the street.",
   "ru": "Никогда не играй на улице",
   "hint": "Приказ — глагол без -s."
  },
  {
   "lv": 3,
   "q": "Он работает весь день.",
   "pre": "He ",
   "right": "works",
   "wrong": [
    "work",
    "working"
   ],
   "post": " all day.",
   "ru": "Он работает весь день",
   "hint": "С he глагол с -s."
  },
  {
   "lv": 3,
   "q": "Когда она идёт в школу?",
   "pre": "When does she ",
   "right": "go",
   "wrong": [
    "goes",
    "going"
   ],
   "post": " to school?",
   "ru": "Когда она идёт в школу?",
   "hint": "После does глагол без -s."
  },
  {
   "lv": 3,
   "q": "Всегда ходи по тротуару.",
   "pre": "Always walk on the ",
   "right": "pavement",
   "wrong": [
    "helmet",
    "seat belt"
   ],
   "post": ".",
   "ru": "Всегда ходи по тротуару",
   "hint": "Pavement — тротуар."
  },
  {
   "lv": 3,
   "q": "Она не продаёт овощи.",
   "pre": "She ",
   "right": "doesn't",
   "wrong": [
    "don't",
    "isn't"
   ],
   "post": " sell vegetables.",
   "ru": "Она не продаёт овощи",
   "hint": "С she отрицание — doesn't."
  }
 ],
 "sound": [
  [
   "doctor",
   "врач",
   "c",
   [
    "k",
    "s"
   ],
   2,
   1
  ],
  [
   "baker",
   "пекарь",
   "k",
   [
    "c",
    "q"
   ],
   2,
   1
  ],
  [
   "bread",
   "хлеб",
   "e",
   [
    "a",
    "i"
   ],
   2,
   1
  ],
  [
   "fruit",
   "фрукты",
   "u",
   [
    "o",
    "i"
   ],
   2,
   1
  ],
  [
   "parcels",
   "посылки",
   "c",
   [
    "k",
    "s"
   ],
   3,
   2
  ],
  [
   "helmet",
   "шлем",
   "l",
   [
    "r",
    "n"
   ],
   2,
   2
  ],
  [
   "pavement",
   "тротуар",
   "v",
   [
    "w",
    "b"
   ],
   2,
   2
  ],
  [
   "farmer",
   "фермер",
   "m",
   [
    "n",
    "r"
   ],
   3,
   2
  ],
  [
   "teacher",
   "учитель",
   "a",
   [
    "e",
    "o"
   ],
   2,
   3
  ],
  [
   "vegetables",
   "овощи",
   "g",
   [
    "j",
    "k"
   ],
   2,
   3
  ],
  [
   "firefighter",
   "пожарный",
   "h",
   [
    "g",
    "k"
   ],
   7,
   3
  ]
 ],
 "order": [
  [
   "She grows fruit.",
   [
    "She grow fruit.",
    "She fruit grows."
   ],
   "Она выращивает фрукты",
   "С she глагол с -s: grows."
  ],
  [
   "He doesn't make bread.",
   [
    "He don't make bread.",
    "He doesn't makes bread."
   ],
   "Он не печёт хлеб",
   "Doesn't + глагол без -s."
  ],
  [
   "What does he do?",
   [
    "What he does do?",
    "What do he do?"
   ],
   "Чем он занимается?",
   "What does he do? — вопрос о профессии."
  ],
  [
   "Where does she work?",
   [
    "Where she works?",
    "Where does she works?"
   ],
   "Где она работает?",
   "Where does she + глагол без -s."
  ],
  [
   "How many pupils are there?",
   [
    "How many pupil are there?",
    "How much pupils are there?"
   ],
   "Сколько там учеников?",
   "How many + множественное число."
  ],
  [
   "Whose books are these?",
   [
    "Who books are these?",
    "Whose are books these?"
   ],
   "Чьи это книги?",
   "Whose + существительное + are these?"
  ],
  [
   "A postman brings letters.",
   [
    "A postman bring letters.",
    "A postman letters brings."
   ],
   "Почтальон приносит письма",
   "A postman — это he, значит brings."
  ],
  [
   "I always wear a helmet.",
   [
    "I wear always a helmet.",
    "I always wears a helmet."
   ],
   "Я всегда надеваю шлем",
   "Always стоит перед глаголом."
  ],
  [
   "We never play in the street.",
   [
    "We play never in the street.",
    "We never plays in the street."
   ],
   "Мы никогда не играем на улице",
   "Never стоит перед глаголом."
  ],
  [
   "He gets up early.",
   [
    "He get up early.",
    "He gets early up."
   ],
   "Он встаёт рано",
   "С he: gets up."
  ]
 ],
 "tf": [
  [
   "«{She grows fruit}» — так говорят про фермера.",
   true,
   "Farmer grows fruit — фермер выращивает фрукты."
  ],
  [
   "«{A firefighter makes bread}» — верное предложение о пожарном.",
   false,
   "Хлеб печёт baker. Пожарный fights fires."
  ],
  [
   "С «he» и «she» к глаголу добавляем «-s»: «{He works}».",
   true,
   "He works, she works."
  ],
  [
   "Правильно сказать «{She don't sell vegetables}».",
   false,
   "С she говорим doesn't: She doesn't sell vegetables."
  ],
  [
   "«{Who is he?}» значит «Кто он?».",
   true,
   "Who — кто."
  ],
  [
   "«{Where}» значит «когда».",
   false,
   "Where — где, when — когда."
  ],
  [
   "«{How many}» используем, чтобы спросить «сколько» о том, что можно посчитать.",
   true,
   "How many pupils? How many books?"
  ],
  [
   "«{Whose bag is this?}» значит «Чья это сумка?».",
   true,
   "Whose — чей, чья, чьи."
  ],
  [
   "После «{does}» глагол ставим с «-s»: «{Does he works?}».",
   false,
   "После does глагол без -s: Does he work?"
  ],
  [
   "«{pavement}» значит «тротуар».",
   true,
   "Pavement — тротуар, по нему ходят пешеходы."
  ],
  [
   "«{Always wear a helmet}» значит «Никогда не надевай шлем».",
   false,
   "Always — всегда: всегда надевай шлем."
  ],
  [
   "Перед тем как перейти дорогу, нужно сделать «{stop, look and listen}».",
   true,
   "Остановись, посмотри и послушай."
  ],
  [
   "«{seat belt}» — это ремень безопасности.",
   true,
   "Seat belt надевают в машине."
  ],
  [
   "«{Never play in the street}» значит «Всегда играй на улице».",
   false,
   "Never — никогда: никогда не играй на улице."
  ]
 ]
});
