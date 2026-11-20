/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Back to school — назад в школу». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u11",
 "theme": "autumn",
 "groups": [
  {
   "k": "subj",
   "name": "Школьные предметы",
   "c": "green",
   "words": [
    [
     "Art",
     "рисование (ИЗО)"
    ],
    [
     "English",
     "английский язык"
    ],
    [
     "Geography",
     "география"
    ],
    [
     "History",
     "история"
    ],
    [
     "ICT",
     "информатика"
    ],
    [
     "Maths",
     "математика"
    ],
    [
     "Music",
     "музыка"
    ],
    [
     "PE",
     "физкультура"
    ],
    [
     "Science",
     "естествознание"
    ]
   ]
  },
  {
   "k": "days",
   "name": "Дни недели",
   "c": "orange",
   "words": [
    [
     "Monday",
     "понедельник"
    ],
    [
     "Tuesday",
     "вторник"
    ],
    [
     "Wednesday",
     "среда"
    ],
    [
     "Thursday",
     "четверг"
    ],
    [
     "Friday",
     "пятница"
    ],
    [
     "Saturday",
     "суббота"
    ],
    [
     "Sunday",
     "воскресенье"
    ]
   ]
  },
  {
   "k": "ord",
   "name": "Порядковые числа",
   "c": "blue",
   "words": [
    [
     "first",
     "первый"
    ],
    [
     "second",
     "второй"
    ],
    [
     "third",
     "третий"
    ],
    [
     "fifth",
     "пятый"
    ],
    [
     "ninth",
     "девятый"
    ],
    [
     "twelfth",
     "двенадцатый"
    ],
    [
     "twentieth",
     "двадцатый"
    ],
    [
     "twenty-first",
     "двадцать первый"
    ],
    [
     "thirtieth",
     "тридцатый"
    ]
   ]
  },
  {
   "k": "num",
   "name": "Числа",
   "c": "purple",
   "words": [
    [
     "fifteen",
     "пятнадцать"
    ],
    [
     "forty",
     "сорок"
    ],
    [
     "sixty",
     "шестьдесят"
    ],
    [
     "ninety",
     "девяносто"
    ],
    [
     "one hundred",
     "сто"
    ],
    [
     "five hundred",
     "пятьсот"
    ],
    [
     "nine hundred",
     "девятьсот"
    ],
    [
     "one thousand",
     "тысяча"
    ]
   ]
  },
  {
   "k": "when",
   "name": "Когда?",
   "c": "pink",
   "words": [
    [
     "in the morning",
     "утром"
    ],
    [
     "in the afternoon",
     "днём"
    ],
    [
     "in the evening",
     "вечером"
    ],
    [
     "at night",
     "ночью"
    ],
    [
     "on Monday",
     "в понедельник"
    ],
    [
     "in September",
     "в сентябре"
    ],
    [
     "at seven o'clock",
     "в семь часов"
    ],
    [
     "at the weekend",
     "в выходные"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "morning",
   "утро",
   "evening",
   "вечер"
  ],
  [
   "early",
   "рано",
   "late",
   "поздно"
  ],
  [
   "new",
   "новый",
   "old",
   "старый"
  ],
  [
   "easy",
   "лёгкий",
   "difficult",
   "трудный"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я люблю рисовать. Мой любимый предмет — ИЗО.",
   "pre": "I like drawing. My favourite subject is",
   "right": "Art",
   "wrong": [
    "Music",
    "PE"
   ],
   "post": ".",
   "ru": "Я люблю рисовать. Мой любимый предмет — ИЗО",
   "hint": "Art — рисование, ИЗО."
  },
  {
   "lv": 1,
   "q": "Мы идём в школу в понедельник.",
   "pre": "We go to school",
   "right": "on",
   "wrong": [
    "in",
    "at"
   ],
   "post": "Monday.",
   "ru": "Мы идём в школу в понедельник",
   "hint": "С днями недели — on."
  },
  {
   "lv": 1,
   "q": "Я встаю в семь часов.",
   "pre": "I get up",
   "right": "at",
   "wrong": [
    "in",
    "on"
   ],
   "post": "seven o'clock.",
   "ru": "Я встаю в семь часов",
   "hint": "С точным временем — at."
  },
  {
   "lv": 1,
   "q": "Мой день рождения в мае.",
   "pre": "My birthday is",
   "right": "in",
   "wrong": [
    "on",
    "at"
   ],
   "post": "May.",
   "ru": "Мой день рождения в мае",
   "hint": "С месяцами — in."
  },
  {
   "lv": 1,
   "q": "Сегодня первое сентября.",
   "pre": "Today is the",
   "right": "first",
   "wrong": [
    "one",
    "second"
   ],
   "post": "of September.",
   "ru": "Сегодня первое сентября",
   "hint": "Дата — порядковое число: first."
  },
  {
   "lv": 1,
   "q": "Мне девять лет.",
   "pre": "I am nine",
   "right": "years",
   "wrong": [
    "year",
    "age"
   ],
   "post": "old.",
   "ru": "Мне девять лет",
   "hint": "I am nine years old."
  },
  {
   "lv": 2,
   "q": "Он ходит в школу каждый день.",
   "pre": "He",
   "right": "goes",
   "wrong": [
    "go",
    "going"
   ],
   "post": "to school every day.",
   "ru": "Он ходит в школу каждый день",
   "hint": "С he, she — goes."
  },
  {
   "lv": 2,
   "q": "Они обедают днём.",
   "pre": "They have lunch",
   "right": "in",
   "wrong": [
    "on",
    "at"
   ],
   "post": "the afternoon.",
   "ru": "Они обедают днём",
   "hint": "С частями дня — in the morning / afternoon / evening."
  },
  {
   "lv": 2,
   "q": "Сегодня пятое мая.",
   "pre": "Today is the",
   "right": "fifth",
   "wrong": [
    "five",
    "fiveth"
   ],
   "post": "of May.",
   "ru": "Сегодня пятое мая",
   "hint": "5-й — fifth."
  },
  {
   "lv": 2,
   "q": "У нас музыка в четверг.",
   "pre": "We have Music",
   "right": "on",
   "wrong": [
    "in",
    "at"
   ],
   "post": "Thursday.",
   "ru": "У нас музыка в четверг",
   "hint": "С днями недели — on."
  },
  {
   "lv": 2,
   "q": "Дана делает уроки днём.",
   "pre": "Dana",
   "right": "does",
   "wrong": [
    "do",
    "doing"
   ],
   "post": "her homework in the afternoon.",
   "ru": "Дана делает уроки днём",
   "hint": "С she — does."
  },
  {
   "lv": 2,
   "q": "Урок начинается в девять часов.",
   "pre": "The lesson starts",
   "right": "at",
   "wrong": [
    "in",
    "on"
   ],
   "post": "nine o'clock.",
   "ru": "Урок начинается в девять часов",
   "hint": "С точным временем — at."
  },
  {
   "lv": 3,
   "q": "Он всегда рано встаёт.",
   "pre": "He",
   "right": "always gets up",
   "wrong": [
    "always get up",
    "gets always up"
   ],
   "post": "early.",
   "ru": "Он всегда рано встаёт",
   "hint": "Always — перед глаголом; с he — gets."
  },
  {
   "lv": 3,
   "q": "Айдар никогда не ложится спать поздно.",
   "pre": "Aidar",
   "right": "never goes",
   "wrong": [
    "never go",
    "not goes"
   ],
   "post": "to bed late.",
   "ru": "Айдар никогда не ложится спать поздно",
   "hint": "Never — перед глаголом; с he — goes."
  },
  {
   "lv": 3,
   "q": "Сегодня двенадцатое октября.",
   "pre": "Today is the",
   "right": "twelfth",
   "wrong": [
    "twelve",
    "twelveth"
   ],
   "post": "of October.",
   "ru": "Сегодня двенадцатое октября",
   "hint": "12-й — twelfth."
  },
  {
   "lv": 3,
   "q": "В нашей школе пятьсот учеников.",
   "pre": "There are",
   "right": "five hundred",
   "wrong": [
    "five hundreds",
    "fifty"
   ],
   "post": "pupils at our school.",
   "ru": "В нашей школе пятьсот учеников",
   "hint": "500 — five hundred, без -s."
  },
  {
   "lv": 3,
   "q": "Сегодня тридцатое июня.",
   "pre": "Today is the",
   "right": "thirtieth",
   "wrong": [
    "thirty",
    "thirtyth"
   ],
   "post": "of June.",
   "ru": "Сегодня тридцатое июня",
   "hint": "30-й — thirtieth."
  },
  {
   "lv": 3,
   "q": "Дети ложатся спать ночью.",
   "pre": "Children go to bed",
   "right": "at",
   "wrong": [
    "in",
    "on"
   ],
   "post": "night.",
   "ru": "Дети ложатся спать ночью",
   "hint": "At night — ночью."
  }
 ],
 "sound": [],
 "order": [
  [
   "My favourite subject is Music.",
   [
    "My favourite is subject Music.",
    "Favourite my subject is Music."
   ],
   "Мой любимый предмет — музыка",
   "My favourite subject is + предмет."
  ],
  [
   "I get up at seven o'clock.",
   [
    "I get up in seven o'clock.",
    "I up get at seven o'clock."
   ],
   "Я встаю в семь часов",
   "At + точное время."
  ],
  [
   "We have Maths on Monday.",
   [
    "We have Maths in Monday.",
    "We Maths have on Monday."
   ],
   "У нас математика в понедельник",
   "On + день недели."
  ],
  [
   "Today is Friday, the third of October.",
   [
    "Today Friday is, the third of October.",
    "Today is Friday, the three of October."
   ],
   "Сегодня пятница, третье октября",
   "В дате — порядковое число: third."
  ],
  [
   "She goes to school every day.",
   [
    "She go to school every day.",
    "She goes school to every day."
   ],
   "Она ходит в школу каждый день",
   "С she — goes."
  ],
  [
   "My birthday is in May.",
   [
    "My birthday is on May.",
    "My birthday in May is."
   ],
   "Мой день рождения в мае",
   "In + месяц."
  ],
  [
   "I am nine years old.",
   [
    "I have nine years old.",
    "I am years nine old."
   ],
   "Мне девять лет",
   "I am ... years old."
  ],
  [
   "Dana never goes to bed late.",
   [
    "Dana goes never to bed late.",
    "Dana never go to bed late."
   ],
   "Дана никогда не ложится спать поздно",
   "Never — перед глаголом; с she — goes."
  ],
  [
   "They have lunch in the afternoon.",
   [
    "They has lunch in the afternoon.",
    "They have lunch on the afternoon."
   ],
   "Они обедают днём",
   "С they — have; in the afternoon."
  ],
  [
   "What is your favourite subject?",
   [
    "What your favourite subject is?",
    "What is favourite your subject?"
   ],
   "Какой твой любимый предмет?",
   "What is your ...? — вопрос."
  ]
 ],
 "tf": [
  [
   "«{Maths}» — это математика.",
   true,
   "Верно. Maths — математика."
  ],
  [
   "«{History}» значит «география».",
   false,
   "History — история, а география — Geography."
  ],
  [
   "«{PE}» — это физкультура.",
   true,
   "Верно. PE — физкультура."
  ],
  [
   "Перед днём недели ставим «{on}»: «{on Monday}».",
   true,
   "Верно. On + день недели."
  ],
  [
   "Перед месяцем ставим «{on}»: «{on May}».",
   false,
   "С месяцами — in: in May."
  ],
  [
   "С точным временем ставим «{at}»: «{at seven o'clock}».",
   true,
   "Верно. At + точное время."
  ],
  [
   "«{fifth}» значит «пятый».",
   true,
   "Верно. Fifth — пятый."
  ],
  [
   "«{twelveth}» — правильное написание слова «двенадцатый».",
   false,
   "Правильно — twelfth."
  ],
  [
   "«{thirty-first}» значит «тридцать первый».",
   true,
   "Верно. Thirty-first — 31-й."
  ],
  [
   "«{Saturday}» и «{Sunday}» — выходные дни.",
   true,
   "Верно. Saturday — суббота, Sunday — воскресенье."
  ],
  [
   "«{one thousand}» значит «тысяча».",
   true,
   "Верно. One thousand — 1000."
  ],
  [
   "Правильно сказать: «{He go to school}».",
   false,
   "С he нужно goes: He goes to school."
  ],
  [
   "«{in the morning}» значит «утром».",
   true,
   "Верно. In the morning — утром."
  ],
  [
   "«{ICT}» — предмет, где работают с компьютером.",
   true,
   "Верно. ICT — информатика."
  ]
 ]
});
