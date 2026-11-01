/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «My day — мой день». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4routine",
 "theme": "sky",
 "groups": [
  {
   "k": "act",
   "name": "Действия за день",
   "c": "green",
   "words": [
    [
     "get up",
     "вставать"
    ],
    [
     "wash",
     "умываться"
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
     "do homework",
     "делать уроки"
    ],
    [
     "go to bed",
     "ложиться спать"
    ]
   ]
  },
  {
   "k": "freq",
   "name": "Как часто",
   "c": "orange",
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
    ],
    [
     "every day",
     "каждый день"
    ]
   ]
  },
  {
   "k": "time",
   "name": "Время",
   "c": "blue",
   "words": [
    [
     "morning",
     "утро"
    ],
    [
     "afternoon",
     "день"
    ],
    [
     "evening",
     "вечер"
    ],
    [
     "night",
     "ночь"
    ],
    [
     "noon",
     "полдень"
    ],
    [
     "o’clock",
     "ровно (о времени)"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "always",
   "всегда",
   "never",
   "никогда"
  ],
  [
   "early",
   "рано",
   "late",
   "поздно"
  ],
  [
   "morning",
   "утро",
   "evening",
   "вечер"
  ],
  [
   "start",
   "начинать",
   "finish",
   "заканчивать"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я встаю в семь часов.",
   "pre": "I ",
   "right": "get up",
   "wrong": [
    "gets up",
    "getting up"
   ],
   "post": " at seven.",
   "ru": "Я встаю в семь",
   "hint": "С I глагол без изменений."
  },
  {
   "lv": 1,
   "q": "Он встаёт в семь часов.",
   "pre": "He ",
   "right": "gets up",
   "wrong": [
    "get up",
    "getting up"
   ],
   "post": " at seven.",
   "ru": "Он встаёт в семь",
   "hint": "С he, she, it добавляем -s."
  },
  {
   "lv": 1,
   "q": "Мы завтракаем в восемь.",
   "pre": "We ",
   "right": "have",
   "wrong": [
    "has",
    "having"
   ],
   "post": " breakfast at eight.",
   "ru": "Мы завтракаем в восемь",
   "hint": "С we говорим have."
  },
  {
   "lv": 2,
   "q": "Она идёт в школу пешком.",
   "pre": "She ",
   "right": "goes",
   "wrong": [
    "go",
    "going"
   ],
   "post": " to school on foot.",
   "ru": "Она идёт в школу пешком",
   "hint": "Go → goes (с she)."
  },
  {
   "lv": 2,
   "q": "Я всегда делаю уроки.",
   "pre": "I ",
   "right": "always",
   "wrong": [
    "never",
    "sometimes"
   ],
   "post": " do my homework.",
   "ru": "Я всегда делаю уроки",
   "hint": "Always — всегда."
  },
  {
   "lv": 2,
   "q": "Он никогда не опаздывает.",
   "pre": "He ",
   "right": "never",
   "wrong": [
    "always",
    "often"
   ],
   "post": " comes late.",
   "ru": "Он никогда не опаздывает",
   "hint": "Never — никогда."
  },
  {
   "lv": 2,
   "q": "Он не ест рыбу.",
   "pre": "He ",
   "right": "doesn’t",
   "wrong": [
    "don’t",
    "isn’t"
   ],
   "post": " eat fish.",
   "ru": "Он не ест рыбу",
   "hint": "С he отрицание — doesn’t."
  },
  {
   "lv": 3,
   "q": "Ты любишь мороженое?",
   "pre": "",
   "right": "Do",
   "wrong": [
    "Does",
    "Are"
   ],
   "post": " you like ice cream?",
   "ru": "Ты любишь мороженое",
   "hint": "Вопрос с you: Do you…?"
  },
  {
   "lv": 3,
   "q": "Она танцует?",
   "pre": "",
   "right": "Does",
   "wrong": [
    "Do",
    "Is"
   ],
   "post": " she dance?",
   "ru": "Она танцует",
   "hint": "Вопрос с she: Does she…?"
  },
  {
   "lv": 3,
   "q": "Мы иногда ходим в парк.",
   "pre": "We ",
   "right": "sometimes",
   "wrong": [
    "never",
    "always"
   ],
   "post": " go to the park.",
   "ru": "Мы иногда ходим в парк",
   "hint": "Sometimes — иногда."
  }
 ],
 "sound": [
  [
   "always",
   "всегда",
   "l",
   [
    "r",
    "n"
   ],
   1,
   1
  ],
  [
   "usually",
   "обычно",
   "u",
   [
    "a",
    "o"
   ],
   0,
   1
  ],
  [
   "often",
   "часто",
   "f",
   [
    "v",
    "t"
   ],
   1,
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
   "afternoon",
   "день",
   "t",
   [
    "d",
    "l"
   ],
   2,
   2
  ],
  [
   "homework",
   "домашнее задание",
   "w",
   [
    "v",
    "u"
   ],
   4,
   2
  ],
  [
   "breakfast",
   "завтрак",
   "k",
   [
    "c",
    "g"
   ],
   4,
   3
  ],
  [
   "sometimes",
   "иногда",
   "t",
   [
    "d",
    "l"
   ],
   4,
   3
  ]
 ],
 "order": [
  [
   "I get up at seven.",
   [
    "I at seven get up.",
    "Get up I at seven."
   ],
   "Я встаю в семь",
   "I + действие + время."
  ],
  [
   "He always does homework.",
   [
    "He does always homework.",
    "Always he homework does."
   ],
   "Он всегда делает уроки",
   "Always стоит перед глаголом."
  ],
  [
   "Do you like tea?",
   [
    "You do like tea?",
    "Do like you tea?"
   ],
   "Ты любишь чай",
   "Вопрос: Do + you + глагол."
  ],
  [
   "She never comes late.",
   [
    "She comes never late.",
    "Never she late comes."
   ],
   "Она никогда не опаздывает",
   "Never стоит перед глаголом."
  ]
 ],
 "tf": [
  [
   "«{always}» значит «всегда».",
   true,
   "Always — всегда."
  ],
  [
   "«{never}» значит «часто».",
   false,
   "Never — никогда; often — часто."
  ],
  [
   "С «he» глагол получает «{-s}»: He gets up.",
   true,
   "He gets up."
  ],
  [
   "С «I» говорим «I {gets} up».",
   false,
   "I get up."
  ],
  [
   "Вопрос: «{Does} she dance?»",
   true,
   "С she — does."
  ],
  [
   "Отрицание с he: «He {don’t} like fish».",
   false,
   "He doesn’t like fish."
  ]
 ]
});
