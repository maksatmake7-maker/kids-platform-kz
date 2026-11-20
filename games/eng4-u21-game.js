/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «My family and friends — моя семья и друзья». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u21",
 "theme": "garden",
 "groups": [
  {
   "k": "fam",
   "name": "Семья",
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
    ],
    [
     "cousin",
     "двоюродный брат, сестра"
    ],
    [
     "brother",
     "брат"
    ],
    [
     "sister",
     "сестра"
    ],
    [
     "parents",
     "родители"
    ],
    [
     "grandparents",
     "бабушка и дедушка"
    ]
   ]
  },
  {
   "k": "chore",
   "name": "Дела по дому",
   "c": "orange",
   "words": [
    [
     "do the dishes",
     "мыть посуду"
    ],
    [
     "do the shopping",
     "ходить за покупками"
    ],
    [
     "feed the fish",
     "кормить рыбок"
    ],
    [
     "make the beds",
     "заправлять кровати"
    ],
    [
     "take out the rubbish",
     "выносить мусор"
    ],
    [
     "tidy the room",
     "убирать комнату"
    ],
    [
     "walk the dog",
     "выгуливать собаку"
    ],
    [
     "water the plants",
     "поливать цветы"
    ]
   ]
  },
  {
   "k": "plur",
   "name": "Много: -s, -es, -ies, -ves",
   "c": "blue",
   "words": [
    [
     "beds",
     "кровати"
    ],
    [
     "boxes",
     "коробки"
    ],
    [
     "dishes",
     "тарелки"
    ],
    [
     "watches",
     "часы"
    ],
    [
     "potatoes",
     "картофелины"
    ],
    [
     "babies",
     "малыши"
    ],
    [
     "scarves",
     "шарфы"
    ],
    [
     "knives",
     "ножи"
    ]
   ]
  },
  {
   "k": "irr",
   "name": "Особые формы",
   "c": "green",
   "words": [
    [
     "children",
     "дети"
    ],
    [
     "men",
     "мужчины"
    ],
    [
     "women",
     "женщины"
    ],
    [
     "feet",
     "ступни"
    ],
    [
     "teeth",
     "зубы"
    ],
    [
     "mice",
     "мыши"
    ],
    [
     "fish",
     "рыбы"
    ],
    [
     "sheep",
     "овцы"
    ]
   ]
  },
  {
   "k": "help",
   "name": "Предлагаем помощь",
   "c": "orange",
   "words": [
    [
     "Can I help you?",
     "Можно тебе помочь?"
    ],
    [
     "It's OK.",
     "Всё хорошо, не надо."
    ],
    [
     "Yes, of course.",
     "Да, конечно."
    ],
    [
     "Thank you!",
     "Спасибо!"
    ],
    [
     "You're welcome!",
     "Пожалуйста!"
    ],
    [
     "I do it every day.",
     "Я делаю это каждый день."
    ]
   ]
  }
 ],
 "pairs": [
  [
   "brother",
   "брат",
   "sister",
   "сестра"
  ],
  [
   "aunt",
   "тётя",
   "uncle",
   "дядя"
  ],
  [
   "grandmother",
   "бабушка",
   "grandfather",
   "дедушка"
  ],
  [
   "mother",
   "мама",
   "father",
   "папа"
  ],
  [
   "man",
   "мужчина",
   "woman",
   "женщина"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Имя моего папы — Нурлан.",
   "pre": "My dad",
   "right": "'s",
   "wrong": [
    "s",
    "s'"
   ],
   "post": " name is Nurlan.",
   "ru": "Имя моего папы — Нурлан",
   "hint": "Один владелец: добавляем 's."
  },
  {
   "lv": 1,
   "q": "Имена моих братьев — Берик и Улан.",
   "pre": "My ",
   "right": "brothers'",
   "wrong": [
    "brother's",
    "brothers"
   ],
   "post": " names are Berik and Ulan.",
   "ru": "Имена моих братьев — Берик и Улан",
   "hint": "Владельцев много: s' в конце."
  },
  {
   "lv": 1,
   "q": "Это велосипед Айдара.",
   "pre": "This is ",
   "right": "Aidar's",
   "wrong": [
    "Aidars",
    "Aidar"
   ],
   "post": " bike.",
   "ru": "Это велосипед Айдара",
   "hint": "Чей? Имя + 's."
  },
  {
   "lv": 1,
   "q": "Мы моем посуду.",
   "pre": "We do the ",
   "right": "dishes",
   "wrong": [
    "dish",
    "dishs"
   ],
   "post": ".",
   "ru": "Мы моем посуду",
   "hint": "Слово на -sh: во множественном числе -es."
  },
  {
   "lv": 1,
   "q": "Я выгуливаю собаку каждый день.",
   "pre": "I ",
   "right": "walk",
   "wrong": [
    "walks",
    "walking"
   ],
   "post": " the dog every day.",
   "ru": "Я выгуливаю собаку каждый день",
   "hint": "С I глагол без -s."
  },
  {
   "lv": 1,
   "q": "Она поливает цветы.",
   "pre": "She ",
   "right": "waters",
   "wrong": [
    "water",
    "watering"
   ],
   "post": " the plants.",
   "ru": "Она поливает цветы",
   "hint": "С she к глаголу добавляем -s."
  },
  {
   "lv": 1,
   "q": "Две коробки на столе.",
   "pre": "Two ",
   "right": "boxes",
   "wrong": [
    "boxs",
    "boxies"
   ],
   "post": " are on the table.",
   "ru": "Две коробки на столе",
   "hint": "После x добавляем -es."
  },
  {
   "lv": 2,
   "q": "Три малыша спят.",
   "pre": "Three ",
   "right": "babies",
   "wrong": [
    "babys",
    "babyes"
   ],
   "post": " are sleeping.",
   "ru": "Три малыша спят",
   "hint": "Baby: y меняем на -ies."
  },
  {
   "lv": 2,
   "q": "У мамы два ножа на кухне.",
   "pre": "Mum has two ",
   "right": "knives",
   "wrong": [
    "knifes",
    "knifs"
   ],
   "post": " in the kitchen.",
   "ru": "У мамы два ножа на кухне",
   "hint": "Knife: f меняем на -ves."
  },
  {
   "lv": 2,
   "q": "Двое детей играют во дворе.",
   "pre": "Two ",
   "right": "children",
   "wrong": [
    "childs",
    "childrens"
   ],
   "post": " play in the yard.",
   "ru": "Двое детей играют во дворе",
   "hint": "Child — особая форма: children."
  },
  {
   "lv": 2,
   "q": "Можно я тебе помогу?",
   "pre": "Can I ",
   "right": "help",
   "wrong": [
    "helps",
    "helping"
   ],
   "post": " you?",
   "ru": "Можно я тебе помогу?",
   "hint": "После can глагол не меняется."
  },
  {
   "lv": 2,
   "q": "Мой брат кормит рыбок каждый день.",
   "pre": "My brother ",
   "right": "feeds",
   "wrong": [
    "feed",
    "feeding"
   ],
   "post": " the fish every day.",
   "ru": "Мой брат кормит рыбок каждый день",
   "hint": "С he, she, my brother — глагол с -s."
  },
  {
   "lv": 2,
   "q": "Мама заправляет кровати.",
   "pre": "Mum ",
   "right": "makes",
   "wrong": [
    "make",
    "making"
   ],
   "post": " the beds.",
   "ru": "Мама заправляет кровати",
   "hint": "С mum (она) — makes."
  },
  {
   "lv": 2,
   "q": "Ответ: «Всё хорошо, бабушка. Я делаю это каждый день».",
   "pre": "",
   "right": "It's OK",
   "wrong": [
    "It's do",
    "It's can"
   ],
   "post": ", Grandma. I do it every day.",
   "ru": "Всё хорошо, бабушка. Я делаю это каждый день",
   "hint": "It's OK — вежливо отказываемся: помощь не нужна."
  },
  {
   "lv": 3,
   "q": "Под столом две мыши.",
   "pre": "There are two ",
   "right": "mice",
   "wrong": [
    "mouses",
    "mices"
   ],
   "post": " under the table.",
   "ru": "Под столом две мыши",
   "hint": "Mouse — особая форма: mice."
  },
  {
   "lv": 3,
   "q": "Мои зубы чистые.",
   "pre": "My ",
   "right": "teeth",
   "wrong": [
    "tooths",
    "teeths"
   ],
   "post": " are clean.",
   "ru": "Мои зубы чистые",
   "hint": "Tooth — особая форма: teeth."
  },
  {
   "lv": 3,
   "q": "В поле пять овец.",
   "pre": "There are five ",
   "right": "sheep",
   "wrong": [
    "sheeps",
    "sheepes"
   ],
   "post": " in the field.",
   "ru": "В поле пять овец",
   "hint": "Sheep не меняется."
  },
  {
   "lv": 3,
   "q": "Я убираю свою комнату в субботу.",
   "pre": "I ",
   "right": "tidy",
   "wrong": [
    "tidies",
    "tidying"
   ],
   "post": " my room on Saturday.",
   "ru": "Я убираю свою комнату в субботу",
   "hint": "С I глагол без -s."
  },
  {
   "lv": 3,
   "q": "Это сестра моей мамы. Она моя тётя.",
   "pre": "She is my mum's sister. She is my ",
   "right": "aunt",
   "wrong": [
    "uncle",
    "cousin"
   ],
   "post": ".",
   "ru": "Она моя тётя",
   "hint": "Сестра мамы — aunt, брат мамы — uncle."
  },
  {
   "lv": 3,
   "q": "Бабушка Дины живёт в Алматы.",
   "pre": "Dina",
   "right": "'s",
   "wrong": [
    "s",
    "s'"
   ],
   "post": " grandmother lives in Almaty.",
   "ru": "Бабушка Дины живёт в Алматы",
   "hint": "Одна Дина — 's."
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
    "c",
    "z"
   ],
   0,
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
   1
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
   2
  ],
  [
   "cousin",
   "двоюродный брат",
   "s",
   [
    "c",
    "z"
   ],
   3,
   2
  ],
  [
   "family",
   "семья",
   "m",
   [
    "n",
    "w"
   ],
   2,
   2
  ],
  [
   "friend",
   "друг",
   "r",
   [
    "l",
    "w"
   ],
   1,
   2
  ],
  [
   "grandma",
   "бабушка",
   "g",
   [
    "j",
    "q"
   ],
   0,
   3
  ],
  [
   "children",
   "дети",
   "h",
   [
    "k",
    "n"
   ],
   1,
   3
  ]
 ],
 "order": [
  [
   "My dad's name is Nurlan.",
   [
    "My dad name's is Nurlan.",
    "Name my dad's is Nurlan."
   ],
   "Имя моего папы — Нурлан",
   "Чьё имя? Сначала my dad's, потом name."
  ],
  [
   "My brothers' names are Berik and Ulan.",
   [
    "My names brothers' are Berik and Ulan.",
    "My brothers' are names Berik and Ulan."
   ],
   "Имена моих братьев — Берик и Улан",
   "Владелец (brothers') стоит перед именем (names)."
  ],
  [
   "Can I walk the dog?",
   [
    "Can walk I the dog?",
    "Can I walks the dog?"
   ],
   "Можно я выгуляю собаку?",
   "Can + I + глагол без -s."
  ],
  [
   "It's OK. I do it every day.",
   [
    "It's OK. I does it every day.",
    "It's OK. I do every day it."
   ],
   "Всё хорошо. Я делаю это каждый день",
   "С I глагол do без -es."
  ],
  [
   "She waters the plants.",
   [
    "She water the plants.",
    "She waters plants the."
   ],
   "Она поливает цветы",
   "С she к глаголу добавляем -s."
  ],
  [
   "Let's do the dishes!",
   [
    "Let's does the dishes!",
    "Let's the dishes do!"
   ],
   "Давай помоем посуду!",
   "Let's + глагол без изменений."
  ],
  [
   "He takes out the rubbish.",
   [
    "He take out the rubbish.",
    "He takes the out rubbish."
   ],
   "Он выносит мусор",
   "С he — takes out."
  ],
  [
   "Please feed the fish.",
   [
    "Please feeds the fish.",
    "Please the feed fish."
   ],
   "Пожалуйста, покорми рыбок",
   "Просьба: Please + глагол."
  ],
  [
   "Two boxes are on the table.",
   [
    "Two boxs are on the table.",
    "Two boxes is on the table."
   ],
   "Две коробки на столе",
   "После x — -es; много предметов — are."
  ],
  [
   "The children help at home.",
   [
    "The childs help at home.",
    "The children helps at home."
   ],
   "Дети помогают дома",
   "Children — много, поэтому help без -s."
  ]
 ],
 "tf": [
  [
   "«{aunt}» значит «тётя».",
   true,
   "Aunt — тётя, uncle — дядя."
  ],
  [
   "«{uncle}» значит «бабушка».",
   false,
   "Uncle — дядя; бабушка — grandmother."
  ],
  [
   "«{grandparents}» — это бабушка и дедушка.",
   true,
   "Grandparents — бабушка и дедушка."
  ],
  [
   "«{walk the dog}» значит «кормить рыбок».",
   false,
   "Walk the dog — выгуливать собаку; feed the fish — кормить рыбок."
  ],
  [
   "Имя папы по-английски: «My {dad's} name».",
   true,
   "Один владелец — 's."
  ],
  [
   "Имена нескольких братьев: «my {brothers'} names».",
   true,
   "Владельцев много — s' в конце."
  ],
  [
   "Множественное число от «{child}» — «{childs}».",
   false,
   "Правильно: children."
  ],
  [
   "Множественное число от «{box}» — «{boxes}».",
   true,
   "После x добавляем -es."
  ],
  [
   "Множественное число от «{baby}» — «{babys}».",
   false,
   "Правильно: babies (y меняем на -ies)."
  ],
  [
   "Множественное число от «{knife}» — «{knives}».",
   true,
   "Knife — knives: f меняем на -ves."
  ],
  [
   "«{sheep}» во множественном числе не меняется.",
   true,
   "One sheep, two sheep."
  ],
  [
   "Множественное число от «{foot}» — «{foots}».",
   false,
   "Правильно: feet."
  ],
  [
   "Ответ «{It's OK}» значит, что помощь не нужна.",
   true,
   "It's OK — вежливо говорим: всё хорошо."
  ],
  [
   "С «{she}» говорим: «She {water} the plants».",
   false,
   "С she нужно -s: She waters the plants."
  ]
 ]
});
