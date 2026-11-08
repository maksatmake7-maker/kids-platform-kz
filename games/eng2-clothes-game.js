/* Английский язык, 2 класс — «Clothes — одежда». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2clothes",
 "theme": "garden",
 "groups": [
  {
   "k": "w",
   "name": "Тёплая одежда",
   "c": "blue",
   "words": [
    [
     "coat",
     "пальто"
    ],
    [
     "jacket",
     "куртка"
    ],
    [
     "scarf",
     "шарф"
    ],
    [
     "gloves",
     "перчатки"
    ],
    [
     "boots",
     "сапоги"
    ],
    [
     "jumper",
     "свитер"
    ],
    [
     "hat",
     "шапка"
    ]
   ]
  },
  {
   "k": "s",
   "name": "Лёгкая одежда",
   "c": "orange",
   "words": [
    [
     "T-shirt",
     "футболка"
    ],
    [
     "shorts",
     "шорты"
    ],
    [
     "skirt",
     "юбка"
    ],
    [
     "dress",
     "платье"
    ],
    [
     "sandals",
     "сандалии"
    ],
    [
     "swimsuit",
     "купальник"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "В жару надеваем…",
   "pre": "",
   "right": "shorts",
   "wrong": [
    "coat",
    "gloves"
   ],
   "post": ".",
   "ru": "Шорты.",
   "hint": "Shorts — шорты."
  },
  {
   "lv": 1,
   "q": "Зимой надеваем…",
   "pre": "",
   "right": "boots",
   "wrong": [
    "sandals",
    "swimsuit"
   ],
   "post": ".",
   "ru": "Сапоги.",
   "hint": "Boots — сапоги."
  },
  {
   "lv": 1,
   "q": "Девочка надела платье.",
   "pre": "She's wearing a ",
   "right": "dress",
   "wrong": [
    "scarf",
    "jumper"
   ],
   "post": ".",
   "ru": "Она в платье.",
   "hint": "Dress — платье."
  },
  {
   "lv": 2,
   "q": "На нём красная футболка.",
   "pre": "He's wearing a red ",
   "right": "T-shirt",
   "wrong": [
    "skirt",
    "dress"
   ],
   "post": ".",
   "ru": "Он в красной футболке.",
   "hint": "T-shirt — футболка."
  },
  {
   "lv": 2,
   "q": "На нём зелёная шапка.",
   "pre": "He's ",
   "right": "wearing",
   "wrong": [
    "wear",
    "wears"
   ],
   "post": " a green hat.",
   "ru": "Он в зелёной шапке.",
   "hint": "He's wearing — он носит, на нём."
  },
  {
   "lv": 3,
   "q": "На ней синие джинсы.",
   "pre": "She's wearing blue ",
   "right": "jeans",
   "wrong": [
    "jean",
    "jeanes"
   ],
   "post": ".",
   "ru": "На ней синие джинсы.",
   "hint": "Jeans — всегда во множественном числе."
  },
  {
   "lv": 3,
   "q": "Идёт дождь. Надень…",
   "pre": "It's raining. Wear a ",
   "right": "raincoat",
   "wrong": [
    "swimsuit",
    "scarf"
   ],
   "post": ".",
   "ru": "Надень плащ.",
   "hint": "Raincoat — плащ от дождя."
  }
 ],
 "sound": [
  [
   "dress",
   "платье",
   "e",
   [
    "a",
    "o"
   ],
   2,
   1
  ],
  [
   "skirt",
   "юбка",
   "i",
   [
    "a",
    "o"
   ],
   2,
   1
  ],
  [
   "jacket",
   "куртка",
   "a",
   [
    "o",
    "e"
   ],
   1,
   2
  ],
  [
   "scarf",
   "шарф",
   "a",
   [
    "o",
    "e"
   ],
   2,
   2
  ]
 ],
 "order": [
  [
   "He's wearing a red hat.",
   [
    "He's a wearing red hat.",
    "Wearing he's a red hat."
   ],
   "На нём красная шапка.",
   "Сначала He's wearing, потом a и цвет."
  ],
  [
   "She's wearing a green dress.",
   [
    "She's green wearing a dress.",
    "A she's wearing green dress."
   ],
   "На ней зелёное платье.",
   "Сначала She's wearing a, потом цвет и платье."
  ]
 ],
 "tf": [
  [
   "«{dress}» значит «платье».",
   true,
   "Dress — платье."
  ],
  [
   "«{boots}» значит «шорты».",
   false,
   "Boots — сапоги, а шорты — shorts."
  ],
  [
   "«{He's wearing a hat}» значит «На нём шапка».",
   true,
   "Wearing — носит."
  ],
  [
   "«{scarf}» значит «шарф».",
   true,
   "Scarf — шарф."
  ]
 ]
});
