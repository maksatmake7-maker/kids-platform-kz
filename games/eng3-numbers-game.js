/* Английский язык, 3 класс (A1.1, школы с русским языком обучения) — «Numbers — числа». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng3numbers",
 "theme": "sky",
 "groups": [
  {
   "k": "n1",
   "name": "Числа 1–10",
   "c": "green",
   "words": [
    [
     "one",
     "один"
    ],
    [
     "two",
     "два"
    ],
    [
     "three",
     "три"
    ],
    [
     "four",
     "четыре"
    ],
    [
     "five",
     "пять"
    ],
    [
     "six",
     "шесть"
    ],
    [
     "seven",
     "семь"
    ],
    [
     "eight",
     "восемь"
    ],
    [
     "nine",
     "девять"
    ],
    [
     "ten",
     "десять"
    ]
   ]
  },
  {
   "k": "n2",
   "name": "Числа 11–20",
   "c": "orange",
   "words": [
    [
     "eleven",
     "одиннадцать"
    ],
    [
     "twelve",
     "двенадцать"
    ],
    [
     "thirteen",
     "тринадцать"
    ],
    [
     "fourteen",
     "четырнадцать"
    ],
    [
     "fifteen",
     "пятнадцать"
    ],
    [
     "sixteen",
     "шестнадцать"
    ],
    [
     "seventeen",
     "семнадцать"
    ],
    [
     "eighteen",
     "восемнадцать"
    ],
    [
     "nineteen",
     "девятнадцать"
    ],
    [
     "twenty",
     "двадцать"
    ]
   ]
  },
  {
   "k": "n3",
   "name": "Десятки",
   "c": "blue",
   "words": [
    [
     "thirty",
     "тридцать"
    ],
    [
     "forty",
     "сорок"
    ],
    [
     "fifty",
     "пятьдесят"
    ],
    [
     "sixty",
     "шестьдесят"
    ],
    [
     "seventy",
     "семьдесят"
    ],
    [
     "eighty",
     "восемьдесят"
    ],
    [
     "ninety",
     "девяносто"
    ],
    [
     "hundred",
     "сто"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Два и два будет...",
   "pre": "Two and two is ",
   "right": "four",
   "wrong": [
    "five",
    "three"
   ],
   "post": ".",
   "ru": "2 + 2 = 4",
   "hint": "Two and two is four."
  },
  {
   "lv": 1,
   "q": "Три и четыре будет...",
   "pre": "Three and four is ",
   "right": "seven",
   "wrong": [
    "six",
    "eight"
   ],
   "post": ".",
   "ru": "3 + 4 = 7",
   "hint": "Three and four is seven."
  },
  {
   "lv": 1,
   "q": "Пять и пять будет...",
   "pre": "Five and five is ",
   "right": "ten",
   "wrong": [
    "fifteen",
    "six"
   ],
   "post": ".",
   "ru": "5 + 5 = 10",
   "hint": "Five and five is ten."
  },
  {
   "lv": 2,
   "q": "Десять и десять будет...",
   "pre": "Ten and ten is ",
   "right": "twenty",
   "wrong": [
    "twelve",
    "thirty"
   ],
   "post": ".",
   "ru": "10 + 10 = 20",
   "hint": "Ten and ten is twenty."
  },
  {
   "lv": 2,
   "q": "Двадцать и десять будет...",
   "pre": "Twenty and ten is ",
   "right": "thirty",
   "wrong": [
    "thirteen",
    "forty"
   ],
   "post": ".",
   "ru": "20 + 10 = 30",
   "hint": "Twenty and ten is thirty."
  },
  {
   "lv": 3,
   "q": "Тринадцать и семь будет...",
   "pre": "Thirteen and seven is ",
   "right": "twenty",
   "wrong": [
    "seventeen",
    "thirty"
   ],
   "post": ".",
   "ru": "13 + 7 = 20",
   "hint": "Thirteen and seven is twenty."
  },
  {
   "lv": 3,
   "q": "Пятьдесят и пятьдесят будет...",
   "pre": "Fifty and fifty is one ",
   "right": "hundred",
   "wrong": [
    "thousand",
    "ten"
   ],
   "post": ".",
   "ru": "50 + 50 = 100",
   "hint": "One hundred — это сто."
  }
 ],
 "sound": [
  [
   "seven",
   "семь",
   "v",
   [
    "b",
    "w"
   ]
  ],
  [
   "three",
   "три",
   "h",
   [
    "r",
    "l"
   ],
   1,
   1
  ],
  [
   "eleven",
   "одиннадцать",
   "l",
   [
    "n",
    "v"
   ],
   1,
   2
  ],
  [
   "twenty",
   "двадцать",
   "w",
   [
    "v",
    "u"
   ],
   1,
   2
  ],
  [
   "thirty",
   "тридцать",
   "i",
   [
    "e",
    "a"
   ],
   2,
   2
  ],
  [
   "hundred",
   "сто",
   "u",
   [
    "a",
    "o"
   ],
   1,
   3
  ],
  [
   "eight",
   "восемь",
   "g",
   [
    "t",
    "h"
   ],
   2,
   3
  ],
  [
   "fifteen",
   "пятнадцать",
   "t",
   [
    "d",
    "p"
   ],
   3,
   3
  ]
 ],
 "order": [
  [
   "I am eight years old.",
   [
    "I eight am years old.",
    "Am I eight years old."
   ],
   "Мне восемь лет.",
   "Сначала I am, потом число."
  ],
  [
   "How old are you?",
   [
    "Old how are you?",
    "How are old you?"
   ],
   "Сколько тебе лет?",
   "Вопрос начинается с How old."
  ],
  [
   "I am ten.",
   [
    "Am I ten.",
    "Ten I am."
   ],
   "Мне десять.",
   "I am + число."
  ],
  [
   "I have twenty books.",
   [
    "I twenty have books.",
    "Have I twenty books."
   ],
   "У меня двадцать книг.",
   "Число стоит перед существительным."
  ]
 ],
 "tf": [
  [
   "«{Seven}» — это 7.",
   true,
   "Seven — семь."
  ],
  [
   "«{Twelve}» — это 20.",
   false,
   "Twelve — 12, а 20 — twenty."
  ],
  [
   "«{Fifteen}» — это 15.",
   true,
   "Fifteen — пятнадцать."
  ],
  [
   "«{Thirty}» — это 13.",
   false,
   "Thirty — 30, а 13 — thirteen."
  ],
  [
   "«{Hundred}» — это 100.",
   true,
   "Hundred — сто."
  ],
  [
   "«{Four}» и «{fourteen}» — одно и то же число.",
   false,
   "Four — 4, fourteen — 14."
  ]
 ]
});
