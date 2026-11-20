/* Английский язык, 4 класс (A1.2) — «Places around us — места вокруг нас». Барсик объясняет по-русски. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u71",
 "theme": "autumn",
 "groups": [
  {
   "k": "places",
   "name": "Места в городе",
   "c": "green",
   "words": [
    [
     "fire station",
     "пожарная часть"
    ],
    [
     "police station",
     "полицейский участок"
    ],
    [
     "hospital",
     "больница"
    ],
    [
     "school",
     "школа"
    ],
    [
     "library",
     "библиотека"
    ],
    [
     "post office",
     "почта"
    ]
   ]
  },
  {
   "k": "shops",
   "name": "Магазины",
   "c": "orange",
   "words": [
    [
     "supermarket",
     "супермаркет"
    ],
    [
     "greengrocer's",
     "овощной магазин"
    ],
    [
     "bakery",
     "пекарня"
    ],
    [
     "butcher's",
     "мясной магазин"
    ],
    [
     "bank",
     "банк"
    ]
   ]
  },
  {
   "k": "fun",
   "name": "Отдых и транспорт",
   "c": "blue",
   "words": [
    [
     "park",
     "парк"
    ],
    [
     "cinema",
     "кинотеатр"
    ],
    [
     "museum",
     "музей"
    ],
    [
     "bus stop",
     "автобусная остановка"
    ],
    [
     "hotel",
     "гостиница"
    ]
   ]
  },
  {
   "k": "prep",
   "name": "Где находится",
   "c": "purple",
   "words": [
    [
     "between",
     "между"
    ],
    [
     "next to",
     "рядом с"
    ],
    [
     "opposite",
     "напротив"
    ],
    [
     "behind",
     "за, позади"
    ],
    [
     "in front of",
     "перед"
    ],
    [
     "near",
     "около, рядом"
    ]
   ]
  },
  {
   "k": "struct",
   "name": "Есть ли...?",
   "c": "blue",
   "words": [
    [
     "There is",
     "есть (один)"
    ],
    [
     "There are",
     "есть (несколько)"
    ],
    [
     "There isn't",
     "нет (одного)"
    ],
    [
     "There aren't",
     "нет (нескольких)"
    ],
    [
     "Is there...?",
     "есть ли...?"
    ],
    [
     "Are there any...?",
     "есть ли какие-нибудь...?"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "in front of",
   "перед",
   "behind",
   "за, позади"
  ],
  [
   "near",
   "рядом",
   "far from",
   "далеко от"
  ],
  [
   "opposite",
   "напротив",
   "next to",
   "рядом с"
  ],
  [
   "big",
   "большой",
   "small",
   "маленький"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Есть ли здесь парк?",
   "pre": "Is",
   "right": "there",
   "wrong": [
    "it",
    "this"
   ],
   "post": "a park here?",
   "ru": "Есть ли здесь парк?",
   "hint": "Is there a...? — вопрос «есть ли один предмет»."
  },
  {
   "lv": 1,
   "q": "В нашей улице есть библиотека.",
   "pre": "There",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": "a library in our street.",
   "ru": "В нашей улице есть библиотека.",
   "hint": "Один предмет — There is."
  },
  {
   "lv": 1,
   "q": "В Алматы есть два кинотеатра.",
   "pre": "There",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": "two cinemas in Almaty.",
   "ru": "В Алматы есть два кинотеатра.",
   "hint": "Несколько предметов — There are."
  },
  {
   "lv": 1,
   "q": "Где находится пожарная часть?",
   "pre": "",
   "right": "Where",
   "wrong": [
    "What",
    "Who"
   ],
   "post": "is the fire station?",
   "ru": "Где находится пожарная часть?",
   "hint": "Where is...? — вопрос «где находится»."
  },
  {
   "lv": 1,
   "q": "Почта находится рядом с банком.",
   "pre": "The post office is",
   "right": "next to",
   "wrong": [
    "between",
    "opposite"
   ],
   "post": "the bank.",
   "ru": "Почта находится рядом с банком.",
   "hint": "Next to — рядом с."
  },
  {
   "lv": 1,
   "q": "Кинотеатр находится напротив парка.",
   "pre": "The cinema is",
   "right": "opposite",
   "wrong": [
    "behind",
    "between"
   ],
   "post": "the park.",
   "ru": "Кинотеатр находится напротив парка.",
   "hint": "Opposite — напротив."
  },
  {
   "lv": 2,
   "q": "Здесь нет банка.",
   "pre": "There",
   "right": "isn't",
   "wrong": [
    "aren't",
    "don't"
   ],
   "post": "a bank here.",
   "ru": "Здесь нет банка.",
   "hint": "Один предмет, отрицание — There isn't."
  },
  {
   "lv": 2,
   "q": "В нашем районе нет магазинов.",
   "pre": "There",
   "right": "aren't",
   "wrong": [
    "isn't",
    "don't"
   ],
   "post": "any shops in our area.",
   "ru": "В нашем районе нет магазинов.",
   "hint": "Несколько предметов, отрицание — There aren't any."
  },
  {
   "lv": 2,
   "q": "Есть ли здесь рядом какие-нибудь магазины?",
   "pre": "Are",
   "right": "there",
   "wrong": [
    "they",
    "these"
   ],
   "post": "any shops near here?",
   "ru": "Есть ли здесь рядом какие-нибудь магазины?",
   "hint": "Несколько предметов — Are there any...?"
  },
  {
   "lv": 2,
   "q": "Школа находится между библиотекой и парком.",
   "pre": "The school is",
   "right": "between",
   "wrong": [
    "next to",
    "opposite"
   ],
   "post": "the library and the park.",
   "ru": "Школа находится между библиотекой и парком.",
   "hint": "Между двумя местами — between ... and ..."
  },
  {
   "lv": 2,
   "q": "Пекарня находится за супермаркетом.",
   "pre": "The bakery is",
   "right": "behind",
   "wrong": [
    "between",
    "in front of"
   ],
   "post": "the supermarket.",
   "ru": "Пекарня находится за супермаркетом.",
   "hint": "Behind — за, позади."
  },
  {
   "lv": 2,
   "q": "Автобусная остановка находится перед школой.",
   "pre": "The bus stop is",
   "right": "in front of",
   "wrong": [
    "behind",
    "between"
   ],
   "post": "the school.",
   "ru": "Автобусная остановка находится перед школой.",
   "hint": "In front of — перед."
  },
  {
   "lv": 2,
   "q": "Есть ли здесь кинотеатр? — Да, есть.",
   "pre": "Yes,",
   "right": "there is",
   "wrong": [
    "it is",
    "there are"
   ],
   "post": ".",
   "ru": "Да, есть.",
   "hint": "На вопрос Is there...? отвечаем Yes, there is."
  },
  {
   "lv": 2,
   "q": "Есть ли здесь парки? — Нет, нет.",
   "pre": "No,",
   "right": "there aren't",
   "wrong": [
    "there isn't",
    "there not"
   ],
   "post": ".",
   "ru": "Нет, нет.",
   "hint": "На вопрос Are there any...? отвечаем No, there aren't."
  },
  {
   "lv": 3,
   "q": "Больница находится рядом с нашей школой.",
   "pre": "The hospital is",
   "right": "near",
   "wrong": [
    "between",
    "behind"
   ],
   "post": "our school.",
   "ru": "Больница находится рядом с нашей школой.",
   "hint": "Near — около, рядом."
  },
  {
   "lv": 3,
   "q": "Рядом с домом Айдара есть овощной магазин.",
   "pre": "There",
   "right": "is",
   "wrong": [
    "are",
    "isn't"
   ],
   "post": "a greengrocer's near Aidar's house.",
   "ru": "Рядом с домом Айдара есть овощной магазин.",
   "hint": "Один магазин — There is a ..."
  },
  {
   "lv": 3,
   "q": "Байтерек находится в Астане.",
   "pre": "Baiterek",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": "in Astana.",
   "ru": "Байтерек находится в Астане.",
   "hint": "Один предмет — is."
  },
  {
   "lv": 3,
   "q": "Музей находится напротив почты.",
   "pre": "The museum is",
   "right": "opposite",
   "wrong": [
    "between",
    "behind"
   ],
   "post": "the post office.",
   "ru": "Музей находится напротив почты.",
   "hint": "Opposite — напротив."
  },
  {
   "lv": 3,
   "q": "Нет, здесь нет полицейского участка.",
   "pre": "No,",
   "right": "there isn't",
   "wrong": [
    "there aren't",
    "it isn't"
   ],
   "post": "a police station here.",
   "ru": "Нет, здесь нет полицейского участка.",
   "hint": "Один предмет, отрицание — there isn't."
  },
  {
   "lv": 3,
   "q": "Есть ли здесь рядом больница? — Да.",
   "pre": "Yes,",
   "right": "there is",
   "wrong": [
    "there are",
    "there isn't"
   ],
   "post": "a hospital near here.",
   "ru": "Да, рядом есть больница.",
   "hint": "Is there...? — Yes, there is."
  }
 ],
 "sound": [
  [
   "library",
   "библиотека",
   "b",
   [
    "d",
    "p"
   ],
   2,
   1
  ],
  [
   "hospital",
   "больница",
   "p",
   [
    "b",
    "q"
   ],
   3,
   1
  ],
  [
   "bakery",
   "пекарня",
   "k",
   [
    "c",
    "q"
   ],
   2,
   1
  ],
  [
   "cinema",
   "кинотеатр",
   "m",
   [
    "n",
    "w"
   ],
   4,
   2
  ],
  [
   "opposite",
   "напротив",
   "s",
   [
    "z",
    "c"
   ],
   4,
   2
  ],
  [
   "museum",
   "музей",
   "u",
   [
    "o",
    "a"
   ],
   1,
   2
  ]
 ],
 "order": [
  [
   "There is a park near my school.",
   [
    "There are a park near my school.",
    "Is there a park near my school."
   ],
   "Рядом с моей школой есть парк",
   "There is + один предмет."
  ],
  [
   "There are two cinemas in Almaty.",
   [
    "There is two cinemas in Almaty.",
    "There two are cinemas in Almaty."
   ],
   "В Алматы есть два кинотеатра",
   "There are + несколько предметов."
  ],
  [
   "Is there a library here?",
   [
    "There is a library here?",
    "Is a there library here?"
   ],
   "Есть ли здесь библиотека?",
   "Вопрос: Is there + a ...?"
  ],
  [
   "Are there any shops near here?",
   [
    "Is there any shops near here?",
    "There are any shops near here?"
   ],
   "Есть ли здесь рядом магазины?",
   "Несколько предметов: Are there any ...?"
  ],
  [
   "There isn't a bank in our street.",
   [
    "There not is a bank in our street.",
    "There don't a bank in our street."
   ],
   "В нашей улице нет банка",
   "Отрицание: There isn't a ..."
  ],
  [
   "The post office is next to the bakery.",
   [
    "The post office next to is the bakery.",
    "The post office is next the bakery."
   ],
   "Почта находится рядом с пекарней",
   "Is + предлог + the + место."
  ],
  [
   "The school is between the park and the library.",
   [
    "The school is between the park or the library.",
    "The school between is the park and the library."
   ],
   "Школа находится между парком и библиотекой",
   "Between ... and ..."
  ],
  [
   "Where is the fire station?",
   [
    "Where the fire station is?",
    "Is where the fire station?"
   ],
   "Где находится пожарная часть?",
   "Where + is + the ..."
  ],
  [
   "The cinema is opposite the hotel.",
   [
    "The cinema opposite is the hotel.",
    "The cinema is opposite of hotel."
   ],
   "Кинотеатр находится напротив гостиницы",
   "Opposite the + место."
  ],
  [
   "No, there aren't.",
   [
    "No, there isn't any.",
    "No, they aren't."
   ],
   "Нет, нет",
   "Короткий ответ: No, there aren't."
  ]
 ],
 "tf": [
  [
   "«{There is}» мы говорим, когда место одно: «{There is a park}».",
   true,
   "There is + один предмет."
  ],
  [
   "«{There are}» мы говорим, когда мест несколько: «{There are two schools}».",
   true,
   "There are + несколько."
  ],
  [
   "Фраза «{There is two cinemas}» правильная.",
   false,
   "Два кинотеатра — There are two cinemas."
  ],
  [
   "«{opposite}» значит «напротив».",
   true,
   "Opposite — напротив."
  ],
  [
   "«{behind}» значит «перед».",
   false,
   "Behind — за, позади; перед — in front of."
  ],
  [
   "«{greengrocer's}» — это овощной магазин.",
   true,
   "Greengrocer's — овощной магазин."
  ],
  [
   "«{bakery}» — это больница.",
   false,
   "Bakery — пекарня; больница — hospital."
  ],
  [
   "На вопрос «{Is there a library?}» можно ответить «{Yes, there is.}»",
   true,
   "Короткий ответ: Yes, there is."
  ],
  [
   "На вопрос «{Are there any parks?}» можно ответить «{No, there isn't.}»",
   false,
   "Вопрос про несколько мест — No, there aren't."
  ],
  [
   "Фраза «{The school is between the park and the library}» значит: школа между парком и библиотекой.",
   true,
   "Between ... and ... — между."
  ],
  [
   "«{bus stop}» значит «автобусная остановка».",
   true,
   "Bus stop — автобусная остановка."
  ],
  [
   "Байтерек находится в Астане: «{Baiterek is in Astana}».",
   true,
   "Baiterek — символ Астаны."
  ],
  [
   "Чтобы спросить «где находится почта?», говорим «{Where is the post office?}»",
   true,
   "Where is ...? — где находится?"
  ],
  [
   "«{There isn't a bank}» значит «здесь есть банк».",
   false,
   "There isn't — нет."
  ]
 ]
});
