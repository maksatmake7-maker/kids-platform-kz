/* Английский язык, 2 класс — «My family and friends». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2family",
 "theme": "garden",
 "groups": [
  {
   "k": "fam",
   "name": "Семья",
   "c": "green",
   "words": [
    [
     "mummy",
     "мама"
    ],
    [
     "daddy",
     "папа"
    ],
    [
     "grandma",
     "бабушка"
    ],
    [
     "grandpa",
     "дедушка"
    ],
    [
     "brother",
     "брат"
    ],
    [
     "sister",
     "сестра"
    ]
   ]
  },
  {
   "k": "fr",
   "name": "Друзья",
   "c": "orange",
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
     "boy",
     "мальчик"
    ],
    [
     "girl",
     "девочка"
    ],
    [
     "class",
     "класс"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Это моя бабушка.",
   "pre": "This is my ",
   "right": "grandma",
   "wrong": [
    "grandpa",
    "daddy"
   ],
   "post": ".",
   "ru": "Это моя бабушка.",
   "hint": "Grandma — бабушка."
  },
  {
   "lv": 1,
   "q": "Это мой дедушка.",
   "pre": "This is my ",
   "right": "grandpa",
   "wrong": [
    "grandma",
    "sister"
   ],
   "post": ".",
   "ru": "Это мой дедушка.",
   "hint": "Grandpa — дедушка."
  },
  {
   "lv": 1,
   "q": "Это мой брат.",
   "pre": "This is my ",
   "right": "brother",
   "wrong": [
    "sister",
    "mummy"
   ],
   "post": ".",
   "ru": "Это мой брат.",
   "hint": "Brother — брат."
  },
  {
   "lv": 2,
   "q": "Это мой лучший друг.",
   "pre": "This is my best ",
   "right": "friend",
   "wrong": [
    "family",
    "sister"
   ],
   "post": ".",
   "ru": "Это мой лучший друг.",
   "hint": "Friend — друг."
  },
  {
   "lv": 2,
   "q": "Это моя семья.",
   "pre": "This is my ",
   "right": "family",
   "wrong": [
    "friend",
    "class"
   ],
   "post": ".",
   "ru": "Это моя семья.",
   "hint": "Family — семья."
  },
  {
   "lv": 3,
   "q": "Это мои бабушка и дедушка.",
   "pre": "These ",
   "right": "are",
   "wrong": [
    "is",
    "am"
   ],
   "post": " my grandma and grandpa.",
   "ru": "Это мои бабушка и дедушка.",
   "hint": "Когда их двое, говорим These are."
  },
  {
   "lv": 3,
   "q": "Мы в одном классе.",
   "pre": "We are in the same ",
   "right": "class",
   "wrong": [
    "house",
    "family"
   ],
   "post": ".",
   "ru": "Мы в одном классе.",
   "hint": "Class — класс."
  }
 ],
 "sound": [
  [
   "mummy",
   "мама",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "grandma",
   "бабушка",
   "a",
   [
    "o",
    "e"
   ],
   2,
   1
  ],
  [
   "sister",
   "сестра",
   "s",
   [
    "c",
    "z"
   ],
   0,
   2
  ],
  [
   "friend",
   "друг",
   "e",
   [
    "a",
    "i"
   ],
   3,
   2
  ]
 ],
 "order": [
  [
   "This is my grandma.",
   [
    "Is this my grandma.",
    "My this is grandma."
   ],
   "Это моя бабушка.",
   "Сначала This is, потом my и кто это."
  ],
  [
   "He is my best friend.",
   [
    "Best he is my friend.",
    "He my is friend best."
   ],
   "Он мой лучший друг.",
   "Сначала He is, потом my best friend."
  ]
 ],
 "tf": [
  [
   "«{grandpa}» значит «дедушка».",
   true,
   "Grandpa — дедушка."
  ],
  [
   "«{sister}» значит «брат».",
   false,
   "Sister — сестра, а брат — brother."
  ],
  [
   "«{best friend}» значит «лучший друг».",
   true,
   "Best — лучший."
  ],
  [
   "«{family}» значит «семья».",
   true,
   "Family — семья."
  ]
 ]
});
