/* Английский язык, 1 класс (пререквизит A1: слова и фразы по темам программы). Барсик объясняет по-русски, английские слова звучат английским голосом (в казахском отделении звук выключен). Тексты проверяет Максат. */
ENG3.define({
 "key": "eng1face",
 "theme": "garden",
 "groups": [
  {
   "k": "face",
   "name": "Моё лицо",
   "c": "red",
   "words": [
    [
     "hair",
     "волосы"
    ],
    [
     "eyes",
     "глаза"
    ],
    [
     "nose",
     "нос"
    ],
    [
     "ears",
     "уши"
    ],
    [
     "mouth",
     "рот"
    ]
   ]
  }
 ],
 "pairs": [],
 "fills": [
  {
   "lv": 1,
   "q": "Потрогай свои уши!",
   "pre": "Touch your ",
   "right": "ears",
   "wrong": [
    "nose",
    "mouth"
   ],
   "post": "!",
   "ru": "Потрогай свои уши!",
   "hint": "Ears — уши."
  },
  {
   "lv": 1,
   "q": "Потрогай нос!",
   "pre": "Touch your ",
   "right": "nose",
   "wrong": [
    "ears",
    "eyes"
   ],
   "post": "!",
   "ru": "Потрогай нос!",
   "hint": "Nose — нос."
  },
  {
   "lv": 1,
   "q": "Потрогай рот!",
   "pre": "Touch your ",
   "right": "mouth",
   "wrong": [
    "nose",
    "hair"
   ],
   "post": "!",
   "ru": "Потрогай рот!",
   "hint": "Mouth — рот."
  },
  {
   "lv": 2,
   "q": "У меня зелёные волосы.",
   "pre": "I've got green ",
   "right": "hair",
   "wrong": [
    "eyes",
    "ears"
   ],
   "post": ".",
   "ru": "У меня зелёные волосы.",
   "hint": "Hair — волосы."
  },
  {
   "lv": 2,
   "q": "У меня голубые глаза.",
   "pre": "I've got blue ",
   "right": "eyes",
   "wrong": [
    "hair",
    "nose"
   ],
   "post": ".",
   "ru": "У меня голубые глаза.",
   "hint": "Eyes — глаза."
  },
  {
   "lv": 3,
   "q": "У меня зелёные волосы и голубые глаза.",
   "pre": "I've got green hair ",
   "right": "and",
   "wrong": [
    "or",
    "is"
   ],
   "post": " blue eyes.",
   "ru": "У меня зелёные волосы и голубые глаза.",
   "hint": "And — и."
  }
 ],
 "sound": [
  [
   "nose",
   "нос",
   "o",
   [
    "a",
    "e"
   ],
   1,
   1
  ],
  [
   "ears",
   "уши",
   "a",
   [
    "o",
    "e"
   ],
   1,
   2
  ],
  [
   "eyes",
   "глаза",
   "y",
   [
    "i",
    "e"
   ],
   1,
   3
  ],
  [
   "hair",
   "волосы",
   "i",
   [
    "a",
    "e"
   ],
   2,
   2
  ]
 ],
 "order": [
  [
   "Touch your ears!",
   [
    "Your touch ears!",
    "Ears touch your!"
   ],
   "Потрогай уши!",
   "Сначала команда touch, потом your ears."
  ],
  [
   "I've got blue eyes.",
   [
    "Got I've blue eyes.",
    "Blue I've got eyes."
   ],
   "У меня голубые глаза.",
   "Сначала I've got, потом цвет и eyes."
  ]
 ],
 "tf": [
  [
   "«{nose}» — это «нос».",
   true,
   "Nose — нос."
  ],
  [
   "«{eyes}» — это «уши».",
   false,
   "Eyes — глаза, ears — уши."
  ],
  [
   "«{hair}» — это «волосы».",
   true,
   "Hair — волосы."
  ],
  [
   "«{mouth}» — это «рот».",
   true,
   "Mouth — рот."
  ],
  [
   "«{I've got blue eyes}» значит «У меня голубые глаза».",
   true,
   "Blue — голубой, eyes — глаза."
  ]
 ]
});
