/* Английский язык, 4 класс (A1.2) — «Arts and music — искусство и музыка». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u32",
 "theme": "autumn",
 "groups": [
  {
   "k": "perc",
   "name": "Ударные",
   "c": "orange",
   "words": [
    [
     "drum",
     "барабан"
    ],
    [
     "tambourine",
     "тамбурин"
    ],
    [
     "triangle",
     "треугольник"
    ],
    [
     "cymbals",
     "тарелки"
    ],
    [
     "xylophone",
     "ксилофон"
    ]
   ]
  },
  {
   "k": "wind",
   "name": "Духовые",
   "c": "green",
   "words": [
    [
     "flute",
     "флейта"
    ],
    [
     "recorder",
     "блокфлейта"
    ],
    [
     "clarinet",
     "кларнет"
    ],
    [
     "saxophone",
     "саксофон"
    ],
    [
     "piccolo",
     "малая флейта"
    ]
   ]
  },
  {
   "k": "str",
   "name": "Струнные",
   "c": "blue",
   "words": [
    [
     "violin",
     "скрипка"
    ],
    [
     "guitar",
     "гитара"
    ],
    [
     "dombyra",
     "домбра"
    ],
    [
     "kobyz",
     "кобыз"
    ],
    [
     "cello",
     "виолончель"
    ],
    [
     "harp",
     "арфа"
    ]
   ]
  },
  {
   "k": "key",
   "name": "Клавишные",
   "c": "purple",
   "words": [
    [
     "piano",
     "пианино"
    ],
    [
     "keyboard",
     "электронное пианино"
    ],
    [
     "accordion",
     "аккордеон"
    ],
    [
     "organ",
     "орган"
    ],
    [
     "synthesizer",
     "синтезатор"
    ]
   ]
  },
  {
   "k": "art",
   "name": "Искусство",
   "c": "pink",
   "words": [
    [
     "drawing",
     "рисование"
    ],
    [
     "painting",
     "живопись"
    ],
    [
     "paint",
     "краска"
    ],
    [
     "brush",
     "кисть"
    ],
    [
     "picture",
     "картина"
    ],
    [
     "pencil",
     "карандаш"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "yes",
   "да",
   "no",
   "нет"
  ],
  [
   "quiet",
   "тихий",
   "loud",
   "громкий"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я не играю на барабане.",
   "pre": "I'm not ",
   "right": "playing",
   "wrong": [
    "play",
    "plays"
   ],
   "post": " the drum.",
   "ru": "Я не играю на барабане",
   "hint": "I'm not + глагол с -ing."
  },
  {
   "lv": 1,
   "q": "Он играет на пианино?",
   "pre": "",
   "right": "Is",
   "wrong": [
    "Are",
    "Am"
   ],
   "post": " he playing the piano?",
   "ru": "Он играет на пианино?",
   "hint": "С he в вопросе — Is."
  },
  {
   "lv": 1,
   "q": "Ты играешь на гитаре?",
   "pre": "",
   "right": "Are",
   "wrong": [
    "Is",
    "Am"
   ],
   "post": " you playing the guitar?",
   "ru": "Ты играешь на гитаре?",
   "hint": "С you в вопросе — Are."
  },
  {
   "lv": 1,
   "q": "Дана играет на скрипке? Да.",
   "pre": "Is Dana playing the violin? Yes, she ",
   "right": "is",
   "wrong": [
    "are",
    "does"
   ],
   "post": ".",
   "ru": "Да, играет",
   "hint": "Короткий ответ: Yes, she is."
  },
  {
   "lv": 1,
   "q": "Давай рисовать!",
   "pre": "Let's ",
   "right": "draw",
   "wrong": [
    "drawing",
    "draws"
   ],
   "post": " a picture!",
   "ru": "Давай нарисуем картину",
   "hint": "После Let's — глагол без изменений."
  },
  {
   "lv": 1,
   "q": "Она не рисует.",
   "pre": "She ",
   "right": "isn't",
   "wrong": [
    "aren't",
    "don't"
   ],
   "post": " drawing.",
   "ru": "Она не рисует",
   "hint": "С she — isn't."
  },
  {
   "lv": 2,
   "q": "Мы не играем на флейте.",
   "pre": "We ",
   "right": "aren't",
   "wrong": [
    "isn't",
    "don't"
   ],
   "post": " playing the flute.",
   "ru": "Мы не играем на флейте",
   "hint": "С we — aren't."
  },
  {
   "lv": 2,
   "q": "Зачем тебе флейта? Чтобы играть песню.",
   "pre": "Why have you got a flute? ",
   "right": "To",
   "wrong": [
    "For",
    "At"
   ],
   "post": " play a song.",
   "ru": "Чтобы сыграть песню",
   "hint": "Цель — to + глагол."
  },
  {
   "lv": 2,
   "q": "Давай играть на домбре!",
   "pre": "Let's ",
   "right": "play",
   "wrong": [
    "playing",
    "plays"
   ],
   "post": " the dombyra!",
   "ru": "Давай играть на домбре",
   "hint": "После Let's — глагол без -ing."
  },
  {
   "lv": 2,
   "q": "Айдар сейчас играет на скрипке.",
   "pre": "Aidar ",
   "right": "is playing",
   "wrong": [
    "plays",
    "playing"
   ],
   "post": " the violin now.",
   "ru": "Айдар сейчас играет на скрипке",
   "hint": "Сейчас: is + глагол с -ing."
  },
  {
   "lv": 2,
   "q": "Она играет на тамбурине?",
   "pre": "Is she ",
   "right": "playing",
   "wrong": [
    "play",
    "plays"
   ],
   "post": " the tambourine?",
   "ru": "Она играет на тамбурине?",
   "hint": "После is she — глагол с -ing."
  },
  {
   "lv": 2,
   "q": "Берик играет на барабане? Нет.",
   "pre": "Is Berik playing the drum? No, he ",
   "right": "isn't",
   "wrong": [
    "aren't",
    "doesn't"
   ],
   "post": ".",
   "ru": "Нет, не играет",
   "hint": "Короткий ответ: No, he isn't."
  },
  {
   "lv": 3,
   "q": "Я рисую картину, чтобы показать маме.",
   "pre": "I'm drawing a picture ",
   "right": "to",
   "wrong": [
    "for",
    "at"
   ],
   "post": " show it to Mum.",
   "ru": "Я рисую картину, чтобы показать маме",
   "hint": "Цель — to + глагол."
  },
  {
   "lv": 3,
   "q": "Дети играют на кобызе?",
   "pre": "",
   "right": "Are",
   "wrong": [
    "Is",
    "Do"
   ],
   "post": " the children playing the kobyz?",
   "ru": "Дети играют на кобызе?",
   "hint": "Children — много, поэтому Are."
  },
  {
   "lv": 3,
   "q": "Они не слушают музыку.",
   "pre": "They ",
   "right": "aren't",
   "wrong": [
    "isn't",
    "don't"
   ],
   "post": " listening to music.",
   "ru": "Они не слушают музыку",
   "hint": "С they — aren't."
  },
  {
   "lv": 3,
   "q": "Мы сейчас рисуем.",
   "pre": "We ",
   "right": "are drawing",
   "wrong": [
    "draw",
    "is drawing"
   ],
   "post": " now.",
   "ru": "Мы сейчас рисуем",
   "hint": "С we — are + глагол с -ing."
  },
  {
   "lv": 3,
   "q": "Зачем Дана взяла кисть? Чтобы рисовать красками.",
   "pre": "Why is Dana holding a brush? ",
   "right": "To",
   "wrong": [
    "For",
    "By"
   ],
   "post": " paint a picture.",
   "ru": "Чтобы нарисовать картину красками",
   "hint": "Цель — to + глагол."
  },
  {
   "lv": 3,
   "q": "Давай послушаем музыку!",
   "pre": "Let's ",
   "right": "listen",
   "wrong": [
    "listening",
    "listens"
   ],
   "post": " to music!",
   "ru": "Давай послушаем музыку",
   "hint": "После Let's — глагол без изменений."
  }
 ],
 "sound": [
  [
   "drum",
   "барабан",
   "u",
   [
    "a",
    "o"
   ],
   2,
   1
  ],
  [
   "violin",
   "скрипка",
   "o",
   [
    "a",
    "u"
   ],
   2,
   1
  ],
  [
   "guitar",
   "гитара",
   "u",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "flute",
   "флейта",
   "l",
   [
    "r",
    "n"
   ],
   1,
   1
  ],
  [
   "piano",
   "пианино",
   "a",
   [
    "e",
    "o"
   ],
   2,
   2
  ],
  [
   "tambourine",
   "тамбурин",
   "o",
   [
    "a",
    "e"
   ],
   4,
   2
  ],
  [
   "dombyra",
   "домбра",
   "y",
   [
    "i",
    "e"
   ],
   4,
   2
  ],
  [
   "kobyz",
   "кобыз",
   "z",
   [
    "s",
    "x"
   ],
   4,
   3
  ],
  [
   "painting",
   "живопись",
   "n",
   [
    "m",
    "l"
   ],
   3,
   3
  ]
 ],
 "order": [
  [
   "I'm not playing the drum.",
   [
    "I not playing the drum.",
    "I'm playing not the drum."
   ],
   "Я не играю на барабане",
   "I'm not + глагол с -ing."
  ],
  [
   "Is he playing the piano?",
   [
    "He is playing the piano?",
    "Is playing he the piano?"
   ],
   "Он играет на пианино?",
   "В вопросе Is стоит перед he."
  ],
  [
   "Are you playing the guitar?",
   [
    "You are playing the guitar?",
    "Are playing you the guitar?"
   ],
   "Ты играешь на гитаре?",
   "В вопросе Are стоит перед you."
  ],
  [
   "She isn't drawing a picture.",
   [
    "She not is drawing a picture.",
    "She isn't draw a picture."
   ],
   "Она не рисует картину",
   "isn't + глагол с -ing."
  ],
  [
   "Why have you got a flute?",
   [
    "Why you have got a flute?",
    "Why have got you a flute?"
   ],
   "Зачем у тебя флейта?",
   "Why + have you got...?"
  ],
  [
   "To play a song.",
   [
    "To playing a song.",
    "For play a song."
   ],
   "Чтобы сыграть песню",
   "Цель — to + глагол."
  ],
  [
   "Let's play the dombyra!",
   [
    "Let's playing the dombyra!",
    "Let play the dombyra!"
   ],
   "Давай играть на домбре",
   "Let's + глагол."
  ],
  [
   "They aren't playing the violin.",
   [
    "They isn't playing the violin.",
    "They aren't play the violin."
   ],
   "Они не играют на скрипке",
   "С they — aren't + глагол с -ing."
  ],
  [
   "Yes, he is.",
   [
    "Yes, he does.",
    "Yes, he are."
   ],
   "Да, он играет",
   "Короткий ответ: Yes, he is."
  ],
  [
   "Is Dana painting a picture?",
   [
    "Dana is painting a picture?",
    "Is Dana paint a picture?"
   ],
   "Дана рисует картину красками?",
   "Is + имя + глагол с -ing."
  ]
 ],
 "tf": [
  [
   "Фраза «{I'm not playing}» значит «Я не играю».",
   true,
   "I'm not playing — я не играю."
  ],
  [
   "Правильно сказать: «{Are he playing the piano?}»",
   false,
   "С he нужно Is: Is he playing the piano?"
  ],
  [
   "На вопрос «{Is she drawing?}» можно ответить «{Yes, she is.}»",
   true,
   "Короткий ответ повторяет is."
  ],
  [
   "На вопрос «{Are you playing?}» можно ответить «{No, I isn't.}»",
   false,
   "С I говорим: No, I'm not."
  ],
  [
   "«{drum}» — ударный инструмент.",
   true,
   "Drum — барабан, ударный."
  ],
  [
   "«{flute}» — струнный инструмент.",
   false,
   "Flute — флейта, духовой инструмент."
  ],
  [
   "«{dombyra}» и «{kobyz}» — национальные струнные инструменты Казахстана.",
   true,
   "Обе — струнные."
  ],
  [
   "Фраза «{To play a song}» отвечает на вопрос «{Why?}» — «Зачем?».",
   true,
   "Цель — to + глагол."
  ],
  [
   "После «{Let's}» глагол ставим с -ing: «{Let's playing}».",
   false,
   "Правильно: Let's play."
  ],
  [
   "«{Let's draw!}» значит «Давай рисовать!».",
   true,
   "Let's — давай."
  ],
  [
   "«{piano}» — это духовой инструмент.",
   false,
   "Piano — клавишный инструмент."
  ],
  [
   "«{She isn't dancing}» значит «Она танцует».",
   false,
   "Isn't — не; она не танцует."
  ],
  [
   "День домбры отмечают в первое воскресенье июля.",
   true,
   "Dombyra Day — летом, в июле."
  ],
  [
   "«{painting}» значит «рисование красками, живопись».",
   true,
   "Painting — живопись."
  ]
 ]
});
