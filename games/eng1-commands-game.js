/* Английский язык, 1 класс (пререквизит A1: слова и фразы по темам программы). Барсик объясняет по-русски, английские слова звучат английским голосом (в казахском отделении звук выключен). Тексты проверяет Максат. */
ENG3.define({
 "key": "eng1commands",
 "theme": "garden",
 "groups": [
  {
   "k": "move",
   "name": "Команды",
   "c": "orange",
   "words": [
    [
     "stand up",
     "встать"
    ],
    [
     "sit down",
     "сесть"
    ],
    [
     "jump",
     "прыгать"
    ],
    [
     "dance",
     "танцевать"
    ],
    [
     "clap your hands",
     "хлопать в ладоши"
    ],
    [
     "stamp your feet",
     "топать ногами"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "stand up",
   "встать",
   "sit down",
   "сесть"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Встань!",
   "pre": "",
   "right": "Stand up",
   "wrong": [
    "Sit down",
    "Jump"
   ],
   "post": "!",
   "ru": "Встань!",
   "hint": "Stand up — встать."
  },
  {
   "lv": 1,
   "q": "Сядь!",
   "pre": "",
   "right": "Sit down",
   "wrong": [
    "Stand up",
    "Dance"
   ],
   "post": "!",
   "ru": "Сядь!",
   "hint": "Sit down — сесть."
  },
  {
   "lv": 1,
   "q": "Прыгай!",
   "pre": "",
   "right": "Jump",
   "wrong": [
    "Dance",
    "Sit down"
   ],
   "post": "!",
   "ru": "Прыгай!",
   "hint": "Jump — прыгать."
  },
  {
   "lv": 1,
   "q": "Танцуй!",
   "pre": "",
   "right": "Dance",
   "wrong": [
    "Jump",
    "Stand up"
   ],
   "post": "!",
   "ru": "Танцуй!",
   "hint": "Dance — танцевать."
  },
  {
   "lv": 2,
   "q": "Хлопни в ладоши!",
   "pre": "Clap your ",
   "right": "hands",
   "wrong": [
    "feet",
    "ears"
   ],
   "post": "!",
   "ru": "Хлопни в ладоши!",
   "hint": "Hands — руки, ладони."
  },
  {
   "lv": 2,
   "q": "Топни ногами!",
   "pre": "Stamp your ",
   "right": "feet",
   "wrong": [
    "hands",
    "ears"
   ],
   "post": "!",
   "ru": "Топни ногами!",
   "hint": "Feet — ноги, стопы."
  }
 ],
 "sound": [
  [
   "jump",
   "прыгать",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "dance",
   "танцевать",
   "a",
   [
    "o",
    "e"
   ],
   1,
   2
  ]
 ],
 "order": [
  [
   "Clap your hands!",
   [
    "Hands clap your!",
    "Your clap hands!"
   ],
   "Хлопни в ладоши!",
   "Сначала команда clap, потом your hands."
  ],
  [
   "Stamp your feet!",
   [
    "Feet stamp your!",
    "Your stamp feet!"
   ],
   "Топни ногами!",
   "Сначала команда stamp, потом your feet."
  ]
 ],
 "tf": [
  [
   "«{Jump}» значит «прыгать».",
   true,
   "Jump — прыгать."
  ],
  [
   "«{Sit down}» значит «встать».",
   false,
   "Sit down — сесть, stand up — встать."
  ],
  [
   "«{Clap your hands}» значит «хлопать в ладоши».",
   true,
   "Clap — хлопать, hands — ладони."
  ],
  [
   "«{Dance}» значит «танцевать».",
   true,
   "Dance — танцевать."
  ]
 ]
});
