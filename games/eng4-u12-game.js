/* Английский язык, 4 класс (A1.2) — «My daily routine — мой распорядок дня». Барсик объясняет по-русски. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u12",
 "theme": "autumn",
 "groups": [
  {
   "k": "routine",
   "name": "Распорядок дня",
   "c": "green",
   "words": [
    [
     "get up",
     "вставать"
    ],
    [
     "have breakfast",
     "завтракать"
    ],
    [
     "go to school",
     "идти в школу"
    ],
    [
     "have lunch",
     "обедать"
    ],
    [
     "do my homework",
     "делать домашнее задание"
    ],
    [
     "watch TV",
     "смотреть телевизор"
    ],
    [
     "have dinner",
     "ужинать"
    ],
    [
     "go to bed",
     "ложиться спать"
    ]
   ]
  },
  {
   "k": "parts",
   "name": "Части дня",
   "c": "orange",
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
     "early",
     "рано"
    ],
    [
     "late",
     "поздно"
    ]
   ]
  },
  {
   "k": "freq",
   "name": "Как часто",
   "c": "blue",
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
  },
  {
   "k": "time",
   "name": "Время",
   "c": "purple",
   "words": [
    [
     "o'clock",
     "ровно (о времени)"
    ],
    [
     "clock",
     "часы"
    ],
    [
     "every day",
     "каждый день"
    ],
    [
     "at the weekend",
     "в выходные"
    ],
    [
     "on Monday",
     "в понедельник"
    ],
    [
     "What time?",
     "Во сколько?"
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
   "get up",
   "вставать",
   "go to bed",
   "ложиться спать"
  ],
  [
   "morning",
   "утро",
   "evening",
   "вечер"
  ],
  [
   "day",
   "день",
   "night",
   "ночь"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я встаю в семь часов.",
   "pre": "I get up ",
   "right": "at",
   "wrong": [
    "in",
    "on"
   ],
   "post": " seven o'clock.",
   "ru": "Я встаю в семь часов",
   "hint": "С точным временем — at."
  },
  {
   "lv": 1,
   "q": "Он завтракает.",
   "pre": "He ",
   "right": "has",
   "wrong": [
    "have",
    "haves"
   ],
   "post": " breakfast.",
   "ru": "Он завтракает",
   "hint": "С he глагол have → has."
  },
  {
   "lv": 1,
   "q": "Мы ходим в школу.",
   "pre": "We ",
   "right": "go",
   "wrong": [
    "goes",
    "going"
   ],
   "post": " to school.",
   "ru": "Мы ходим в школу",
   "hint": "С we — go без -es."
  },
  {
   "lv": 1,
   "q": "Она ложится спать.",
   "pre": "She ",
   "right": "goes",
   "wrong": [
    "go",
    "gos"
   ],
   "post": " to bed.",
   "ru": "Она ложится спать",
   "hint": "С she: go → goes."
  },
  {
   "lv": 1,
   "q": "Я смотрю телевизор вечером.",
   "pre": "I watch TV ",
   "right": "in",
   "wrong": [
    "at",
    "on"
   ],
   "post": " the evening.",
   "ru": "Я смотрю телевизор вечером",
   "hint": "In the morning / afternoon / evening."
  },
  {
   "lv": 2,
   "q": "Я не обедаю дома.",
   "pre": "I ",
   "right": "don't",
   "wrong": [
    "doesn't",
    "not"
   ],
   "post": " have lunch at home.",
   "ru": "Я не обедаю дома",
   "hint": "С I — don't."
  },
  {
   "lv": 2,
   "q": "Дина не смотрит телевизор утром.",
   "pre": "Dina ",
   "right": "doesn't",
   "wrong": [
    "don't",
    "isn't"
   ],
   "post": " watch TV in the morning.",
   "ru": "Дина не смотрит телевизор утром",
   "hint": "С she — doesn't, а глагол без -s."
  },
  {
   "lv": 2,
   "q": "— Ты смотришь телевизор ночью? — Нет, не смотрю.",
   "pre": "— Do you watch TV at night? — No, I ",
   "right": "don't",
   "wrong": [
    "doesn't",
    "not"
   ],
   "post": ".",
   "ru": "Нет, не смотрю",
   "hint": "Краткий ответ: No, I don't."
  },
  {
   "lv": 2,
   "q": "— Берик ходит в школу пешком? — Да, ходит.",
   "pre": "— Does Berik walk to school? — Yes, he ",
   "right": "does",
   "wrong": [
    "do",
    "is"
   ],
   "post": ".",
   "ru": "Да, ходит",
   "hint": "Краткий ответ: Yes, he does."
  },
  {
   "lv": 2,
   "q": "Я всегда ложусь спать в девять.",
   "pre": "I ",
   "right": "always",
   "wrong": [
    "never",
    "sometimes"
   ],
   "post": " go to bed at nine.",
   "ru": "Я всегда ложусь спать в девять",
   "hint": "Always — всегда."
  },
  {
   "lv": 2,
   "q": "Дана иногда играет в шахматы вечером.",
   "pre": "Dana ",
   "right": "sometimes",
   "wrong": [
    "always",
    "never"
   ],
   "post": " plays chess in the evening.",
   "ru": "Дана иногда играет в шахматы вечером",
   "hint": "Sometimes — иногда."
  },
  {
   "lv": 2,
   "q": "Асель смотрит мультфильмы.",
   "pre": "Assel ",
   "right": "watches",
   "wrong": [
    "watch",
    "watchs"
   ],
   "post": " cartoons.",
   "ru": "Асель смотрит мультфильмы",
   "hint": "После -ch ставим -es."
  },
  {
   "lv": 3,
   "q": "Дамир учит английский после школы.",
   "pre": "Damir ",
   "right": "studies",
   "wrong": [
    "studys",
    "study"
   ],
   "post": " English after school.",
   "ru": "Дамир учит английский после школы",
   "hint": "Study → studies (y меняется на ies)."
  },
  {
   "lv": 3,
   "q": "Нуржан делает домашнее задание в четыре часа.",
   "pre": "Nurzhan ",
   "right": "does",
   "wrong": [
    "do",
    "dos"
   ],
   "post": " his homework at four o'clock.",
   "ru": "Нуржан делает домашнее задание в четыре часа",
   "hint": "С he: do → does."
  },
  {
   "lv": 3,
   "q": "Мы спим ночью.",
   "pre": "We sleep ",
   "right": "at",
   "wrong": [
    "in",
    "on"
   ],
   "post": " night.",
   "ru": "Мы спим ночью",
   "hint": "Ночью — at night."
  },
  {
   "lv": 3,
   "q": "Я хожу в школу в понедельник.",
   "pre": "I go to school ",
   "right": "on",
   "wrong": [
    "in",
    "at"
   ],
   "post": " Monday.",
   "ru": "Я хожу в школу в понедельник",
   "hint": "С днями недели — on."
  },
  {
   "lv": 3,
   "q": "Канат обычно обедает в час.",
   "pre": "Kanat ",
   "right": "usually has",
   "wrong": [
    "has usually",
    "usually have"
   ],
   "post": " lunch at one o'clock.",
   "ru": "Канат обычно обедает в час",
   "hint": "Usually стоит перед глаголом; с he — has."
  },
  {
   "lv": 3,
   "q": "Во сколько встаёт Сауле?",
   "pre": "What time ",
   "right": "does",
   "wrong": [
    "do",
    "is"
   ],
   "post": " Saule get up?",
   "ru": "Во сколько встаёт Сауле?",
   "hint": "Вопрос про she/he — does, а глагол без -s."
  }
 ],
 "sound": [
  [
   "lunch",
   "обед",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "night",
   "ночь",
   "g",
   [
    "j",
    "q"
   ],
   2,
   1
  ],
  [
   "time",
   "время",
   "m",
   [
    "n",
    "w"
   ],
   2,
   1
  ],
  [
   "dinner",
   "ужин",
   "n",
   [
    "m",
    "l"
   ],
   3,
   1
  ],
  [
   "never",
   "никогда",
   "v",
   [
    "w",
    "b"
   ],
   2,
   1
  ],
  [
   "evening",
   "вечер",
   "v",
   [
    "w",
    "b"
   ],
   1,
   2
  ],
  [
   "morning",
   "утро",
   "r",
   [
    "l",
    "n"
   ],
   2,
   2
  ],
  [
   "school",
   "школа",
   "h",
   [
    "k",
    "c"
   ],
   2,
   2
  ],
  [
   "always",
   "всегда",
   "w",
   [
    "v",
    "u"
   ],
   2,
   2
  ],
  [
   "homework",
   "домашнее задание",
   "k",
   [
    "c",
    "q"
   ],
   7,
   3
  ],
  [
   "early",
   "рано",
   "y",
   [
    "i",
    "e"
   ],
   4,
   3
  ]
 ],
 "order": [
  [
   "I get up at seven.",
   [
    "I get at up seven.",
    "Get I up at seven."
   ],
   "Я встаю в семь",
   "Сначала кто, потом действие, потом время."
  ],
  [
   "She goes to school.",
   [
    "She go to school.",
    "She goes school to."
   ],
   "Она ходит в школу",
   "С she: go → goes."
  ],
  [
   "He doesn't watch TV.",
   [
    "He don't watch TV.",
    "He doesn't watches TV."
   ],
   "Он не смотрит телевизор",
   "Doesn't + глагол без -s."
  ],
  [
   "Do you have breakfast?",
   [
    "You do have breakfast?",
    "Do you has breakfast?"
   ],
   "Ты завтракаешь?",
   "Вопрос: Do + you + глагол."
  ],
  [
   "I always do my homework.",
   [
    "I do always my homework.",
    "Always I my do homework."
   ],
   "Я всегда делаю домашнее задание",
   "Always стоит перед глаголом."
  ],
  [
   "Aidar never goes to bed late.",
   [
    "Aidar never go to bed late.",
    "Aidar goes never to bed late."
   ],
   "Айдар никогда не ложится спать поздно",
   "Never — перед глаголом; с he — goes."
  ],
  [
   "We have lunch at one o'clock.",
   [
    "We have lunch in one o'clock.",
    "We has lunch at one o'clock."
   ],
   "Мы обедаем в час",
   "С точным временем — at; с we — have."
  ],
  [
   "I watch TV in the evening.",
   [
    "I watch TV at the evening.",
    "I watch in the evening TV."
   ],
   "Я смотрю телевизор вечером",
   "In the evening."
  ],
  [
   "She doesn't get up early.",
   [
    "She don't get up early.",
    "She doesn't gets up early."
   ],
   "Она не встаёт рано",
   "Doesn't + глагол без -s."
  ],
  [
   "Does Dana have dinner at six?",
   [
    "Do Dana have dinner at six?",
    "Does Dana has dinner at six?"
   ],
   "Дана ужинает в шесть?",
   "Does + имя + глагол без -s."
  ]
 ],
 "tf": [
  [
   "«{have breakfast}» значит «завтракать».",
   true,
   "Have breakfast — завтракать."
  ],
  [
   "«{have dinner}» значит «обедать».",
   false,
   "Have dinner — ужинать; have lunch — обедать."
  ],
  [
   "«{in the evening}» значит «вечером».",
   true,
   "In the evening — вечером."
  ],
  [
   "«{at night}» значит «утром».",
   false,
   "At night — ночью; утром — in the morning."
  ],
  [
   "«She {go} to school» — правильно.",
   false,
   "С she: she goes to school."
  ],
  [
   "«He {has} lunch at one o'clock» — правильно.",
   true,
   "С he: have → has."
  ],
  [
   "«Dana {don't} watch TV» — правильно.",
   false,
   "С Dana (she) — doesn't."
  ],
  [
   "«{Do} you get up early?» — правильный вопрос.",
   true,
   "Вопрос с you: Do you …?"
  ],
  [
   "«{never}» значит «всегда».",
   false,
   "Never — никогда; always — всегда."
  ],
  [
   "«{usually}» значит «обычно».",
   true,
   "Usually — обычно."
  ],
  [
   "Ответ на «Does she play chess?» — «Yes, she {does}».",
   true,
   "Краткий ответ: Yes, she does."
  ],
  [
   "С точным временем говорим «{at} seven o'clock».",
   true,
   "At + время."
  ],
  [
   "«He {studys} English» — правильно.",
   false,
   "Study → studies."
  ],
  [
   "«I {always} do my homework» — слово always стоит правильно.",
   true,
   "Always — перед глаголом."
  ]
 ]
});
