/* Английский язык, 1 класс (пререквизит A1: слова и фразы по темам программы). Барсик объясняет по-русски, английские слова звучат английским голосом (в казахском отделении звук выключен). Тексты проверяет Максат. */
ENG3.define({
 "key": "eng1family",
 "theme": "garden",
 "groups": [
  {
   "k": "fam",
   "name": "Моя семья",
   "c": "green",
   "words": [
    [
     "mummy",
     "мама, мамочка"
    ],
    [
     "daddy",
     "папа, папочка"
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
  }
 ],
 "pairs": [],
 "fills": [
  {
   "lv": 1,
   "q": "Это моя мама.",
   "pre": "This is my ",
   "right": "mummy",
   "wrong": [
    "daddy",
    "sister"
   ],
   "post": ".",
   "ru": "Это моя мама.",
   "hint": "Mummy — мама."
  },
  {
   "lv": 1,
   "q": "Это мой папа.",
   "pre": "This is my ",
   "right": "daddy",
   "wrong": [
    "mummy",
    "brother"
   ],
   "post": ".",
   "ru": "Это мой папа.",
   "hint": "Daddy — папа."
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
   "lv": 1,
   "q": "Это моя сестра.",
   "pre": "This is my ",
   "right": "sister",
   "wrong": [
    "brother",
    "daddy"
   ],
   "post": ".",
   "ru": "Это моя сестра.",
   "hint": "Sister — сестра."
  },
  {
   "lv": 2,
   "q": "Это мой папа.",
   "pre": "This ",
   "right": "is",
   "wrong": [
    "am",
    "are"
   ],
   "post": " my daddy.",
   "ru": "Это мой папа.",
   "hint": "С This говорим is."
  },
  {
   "lv": 3,
   "q": "Это моя сестра.",
   "pre": "This is ",
   "right": "my",
   "wrong": [
    "me",
    "I"
   ],
   "post": " sister.",
   "ru": "Это моя сестра.",
   "hint": "My — мой, моя."
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
   "sister",
   "сестра",
   "i",
   [
    "a",
    "e"
   ],
   1,
   2
  ]
 ],
 "order": [
  [
   "This is my mummy.",
   [
    "Is this my mummy.",
    "My this is mummy."
   ],
   "Это моя мама.",
   "Сначала This is, потом my и кто это."
  ],
  [
   "This is my brother.",
   [
    "My brother this is.",
    "Brother this is my."
   ],
   "Это мой брат.",
   "Сначала This is, потом my и кто это."
  ]
 ],
 "tf": [
  [
   "«{mummy}» — это «мама».",
   true,
   "Mummy — мама."
  ],
  [
   "«{daddy}» — это «брат».",
   false,
   "Daddy — папа."
  ],
  [
   "«{sister}» — это «сестра».",
   true,
   "Sister — сестра."
  ],
  [
   "«{brother}» — это «мама».",
   false,
   "Brother — брат."
  ]
 ]
});
