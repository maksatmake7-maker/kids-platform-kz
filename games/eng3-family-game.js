/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «My family — моя семья». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3family",
 "theme": "garden",
 "groups": [
  {
   "k": "adult",
   "name": "Взрослые",
   "c": "green",
   "words": [
    [
     "mother",
     "мама"
    ],
    [
     "father",
     "папа"
    ],
    [
     "grandmother",
     "бабушка"
    ],
    [
     "grandfather",
     "дедушка"
    ],
    [
     "aunt",
     "тётя"
    ],
    [
     "uncle",
     "дядя"
    ]
   ]
  },
  {
   "k": "child",
   "name": "Дети",
   "c": "orange",
   "words": [
    [
     "sister",
     "сестра"
    ],
    [
     "brother",
     "брат"
    ],
    [
     "baby",
     "малыш"
    ],
    [
     "son",
     "сын"
    ],
    [
     "daughter",
     "дочь"
    ],
    [
     "cousin",
     "двоюродный брат, сестра"
    ]
   ]
  },
  {
   "k": "friends",
   "name": "Друзья",
   "c": "blue",
   "words": [
    [
     "friend",
     "друг"
    ],
    [
     "classmate",
     "одноклассник"
    ],
    [
     "teacher",
     "учитель"
    ],
    [
     "neighbour",
     "сосед"
    ],
    [
     "boy",
     "мальчик"
    ],
    [
     "girl",
     "девочка"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "mother",
   "мама",
   "father",
   "папа"
  ],
  [
   "sister",
   "сестра",
   "brother",
   "брат"
  ],
  [
   "grandmother",
   "бабушка",
   "grandfather",
   "дедушка"
  ],
  [
   "aunt",
   "тётя",
   "uncle",
   "дядя"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Это моя мама.",
   "pre": "This is my ",
   "right": "mother",
   "wrong": [
    "brother",
    "uncle"
   ],
   "post": ". She is a doctor.",
   "ru": "Это моя мама. Она врач.",
   "hint": "She — она, значит mother."
  },
  {
   "lv": 1,
   "q": "Это мой брат.",
   "pre": "This is my ",
   "right": "brother",
   "wrong": [
    "sister",
    "aunt"
   ],
   "post": ". He is ten.",
   "ru": "Это мой брат. Ему десять.",
   "hint": "He — он, значит brother."
  },
  {
   "lv": 1,
   "q": "Это моя бабушка.",
   "pre": "This is my ",
   "right": "grandmother",
   "wrong": [
    "grandfather",
    "uncle"
   ],
   "post": ". She is kind.",
   "ru": "Это моя бабушка. Она добрая.",
   "hint": "She — она, значит grandmother."
  },
  {
   "lv": 1,
   "q": "У меня есть сестра.",
   "pre": "I ",
   "right": "have got",
   "wrong": [
    "has got",
    "am"
   ],
   "post": " a sister.",
   "ru": "У меня есть сестра.",
   "hint": "С I говорим have got."
  },
  {
   "lv": 2,
   "q": "У него есть брат.",
   "pre": "He ",
   "right": "has got",
   "wrong": [
    "have got",
    "is"
   ],
   "post": " a brother.",
   "ru": "У него есть брат.",
   "hint": "С he говорим has got."
  },
  {
   "lv": 2,
   "q": "Она моя подруга.",
   "pre": "She is my ",
   "right": "friend",
   "wrong": [
    "uncle",
    "brother"
   ],
   "post": ".",
   "ru": "Она моя подруга.",
   "hint": "Friend — друг, подруга."
  },
  {
   "lv": 2,
   "q": "Они мои дедушка и бабушка.",
   "pre": "They are my ",
   "right": "grandparents",
   "wrong": [
    "parents",
    "neighbours"
   ],
   "post": ".",
   "ru": "Они мои дедушка и бабушка.",
   "hint": "Grandparents — бабушка и дедушка."
  },
  {
   "lv": 3,
   "q": "Мой дядя высокий.",
   "pre": "My uncle ",
   "right": "is",
   "wrong": [
    "are",
    "am"
   ],
   "post": " tall.",
   "ru": "Мой дядя высокий.",
   "hint": "С my uncle говорим is."
  }
 ],
 "sound": [
  [
   "mother",
   "мама",
   "o",
   [
    "a",
    "u"
   ],
   1,
   1
  ],
  [
   "father",
   "папа",
   "a",
   [
    "e",
    "o"
   ],
   1,
   1
  ],
  [
   "sister",
   "сестра",
   "s",
   [
    "z",
    "c"
   ],
   2,
   1
  ],
  [
   "brother",
   "брат",
   "r",
   [
    "l",
    "n"
   ],
   1,
   2
  ],
  [
   "family",
   "семья",
   "m",
   [
    "n",
    "l"
   ],
   2,
   2
  ],
  [
   "friend",
   "друг",
   "i",
   [
    "e",
    "a"
   ],
   2,
   2
  ],
  [
   "uncle",
   "дядя",
   "n",
   [
    "m",
    "l"
   ],
   1,
   3
  ],
  [
   "aunt",
   "тётя",
   "u",
   [
    "a",
    "o"
   ],
   1,
   3
  ]
 ],
 "order": [
  [
   "This is my mother.",
   [
    "This my is mother.",
    "Is this my mother."
   ],
   "Это моя мама.",
   "This is + my + кто."
  ],
  [
   "I have got a sister.",
   [
    "I got have a sister.",
    "Have I got a sister."
   ],
   "У меня есть сестра.",
   "Сначала I have got."
  ],
  [
   "My brother is ten.",
   [
    "Brother my is ten.",
    "Is my brother ten."
   ],
   "Моему брату десять.",
   "Сначала My brother, потом is."
  ],
  [
   "She is my friend.",
   [
    "She my is friend.",
    "Is she my friend."
   ],
   "Она моя подруга.",
   "Сначала She is."
  ]
 ],
 "tf": [
  [
   "«{mother}» — это «мама».",
   true,
   "Mother — мама."
  ],
  [
   "«{brother}» — это «сестра».",
   false,
   "Brother — брат, sister — сестра."
  ],
  [
   "«{grandfather}» — это «дедушка».",
   true,
   "Grandfather — дедушка."
  ],
  [
   "«{uncle}» — это «тётя».",
   false,
   "Uncle — дядя, aunt — тётя."
  ],
  [
   "«{baby}» — это «малыш».",
   true,
   "Baby — малыш."
  ],
  [
   "«{She is my father}» — правильная фраза.",
   false,
   "She — она, а father — папа. Правильно: She is my mother."
  ]
 ]
});
