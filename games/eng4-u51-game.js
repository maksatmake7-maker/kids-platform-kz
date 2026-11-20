/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Traditional food — традиционная еда». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u51",
 "theme": "autumn",
 "groups": [
  {
   "k": "dish",
   "name": "Блюда и еда",
   "c": "green",
   "words": [
    [
     "paella",
     "паэлья"
    ],
    [
     "beshbarmak",
     "бешбармак"
    ],
    [
     "plov",
     "плов"
    ],
    [
     "baursak",
     "баурсак"
    ],
    [
     "kazy",
     "казы"
    ],
    [
     "popcorn",
     "попкорн"
    ],
    [
     "sausage",
     "колбаса"
    ]
   ]
  },
  {
   "k": "prod",
   "name": "Продукты",
   "c": "orange",
   "words": [
    [
     "rice",
     "рис"
    ],
    [
     "noodles",
     "лапша"
    ],
    [
     "bread",
     "хлеб"
    ],
    [
     "cheese",
     "сыр"
    ],
    [
     "meat",
     "мясо"
    ],
    [
     "vegetables",
     "овощи"
    ],
    [
     "fruit",
     "фрукты"
    ],
    [
     "vinegar",
     "уксус"
    ],
    [
     "sauce",
     "соус"
    ]
   ]
  },
  {
   "k": "drink",
   "name": "Напитки",
   "c": "blue",
   "words": [
    [
     "tea",
     "чай"
    ],
    [
     "kymyz",
     "кымыз"
    ],
    [
     "juice",
     "сок"
    ],
    [
     "cola",
     "кола"
    ],
    [
     "milk",
     "молоко"
    ]
   ]
  },
  {
   "k": "taste",
   "name": "Вкусы",
   "c": "green",
   "words": [
    [
     "sweet",
     "сладкий"
    ],
    [
     "salty",
     "солёный"
    ],
    [
     "sour",
     "кислый"
    ],
    [
     "bitter",
     "горький"
    ],
    [
     "spicy",
     "острый"
    ]
   ]
  },
  {
   "k": "cmp",
   "name": "Сравнения",
   "c": "orange",
   "words": [
    [
     "sweeter",
     "слаще"
    ],
    [
     "bigger",
     "больше"
    ],
    [
     "better",
     "лучше"
    ],
    [
     "worse",
     "хуже"
    ],
    [
     "healthier",
     "полезнее"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "good",
   "хороший",
   "bad",
   "плохой"
  ],
  [
   "big",
   "большой",
   "small",
   "маленький"
  ],
  [
   "healthy",
   "полезный",
   "unhealthy",
   "вредный"
  ],
  [
   "hot",
   "горячий",
   "cold",
   "холодный"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Я люблю сладкий попкорн.",
   "pre": "I like ",
   "right": "sweet",
   "wrong": [
    "sweeter",
    "sweets"
   ],
   "post": " popcorn.",
   "ru": "Я люблю сладкий попкорн",
   "hint": "Sweet — сладкий."
  },
  {
   "lv": 1,
   "q": "Эти баурсаки (рядом) вкусные.",
   "pre": "",
   "right": "These",
   "wrong": [
    "This",
    "Those"
   ],
   "post": " baursaks are tasty.",
   "ru": "Эти баурсаки вкусные",
   "hint": "These — эти, когда предметы рядом."
  },
  {
   "lv": 1,
   "q": "Тот сыр (вдали) солёный.",
   "pre": "",
   "right": "That",
   "wrong": [
    "This",
    "These"
   ],
   "post": " cheese is salty.",
   "ru": "Тот сыр солёный",
   "hint": "That — тот, один предмет вдали."
  },
  {
   "lv": 1,
   "q": "Те яблоки (вдали) сладкие.",
   "pre": "",
   "right": "Those",
   "wrong": [
    "That",
    "This"
   ],
   "post": " apples are sweet.",
   "ru": "Те яблоки сладкие",
   "hint": "Those — те, много предметов вдали."
  },
  {
   "lv": 1,
   "q": "Лимон кислый.",
   "pre": "A lemon is ",
   "right": "sour",
   "wrong": [
    "sweet",
    "salty"
   ],
   "post": ".",
   "ru": "Лимон кислый",
   "hint": "Sour — кислый."
  },
  {
   "lv": 1,
   "q": "В бешбармаке есть мясо и лапша.",
   "pre": "Beshbarmak has got meat and ",
   "right": "noodles",
   "wrong": [
    "vinegar",
    "juice"
   ],
   "post": ".",
   "ru": "В бешбармаке есть мясо и лапша",
   "hint": "Noodles — лапша."
  },
  {
   "lv": 2,
   "q": "Фрукты полезнее, чем шоколад.",
   "pre": "Fruit is ",
   "right": "healthier",
   "wrong": [
    "healthyer",
    "healthy"
   ],
   "post": " than chocolate.",
   "ru": "Фрукты полезнее, чем шоколад",
   "hint": "Healthy: y меняем на i и добавляем -er."
  },
  {
   "lv": 2,
   "q": "Арбуз больше, чем яблоко.",
   "pre": "A watermelon is ",
   "right": "bigger",
   "wrong": [
    "biger",
    "bigest"
   ],
   "post": " than an apple.",
   "ru": "Арбуз больше, чем яблоко",
   "hint": "Big: удваиваем g и добавляем -er."
  },
  {
   "lv": 2,
   "q": "Этот чай лучше, чем тот.",
   "pre": "This tea is ",
   "right": "better",
   "wrong": [
    "gooder",
    "best"
   ],
   "post": " than that tea.",
   "ru": "Этот чай лучше, чем тот",
   "hint": "Good — better, особая форма."
  },
  {
   "lv": 2,
   "q": "Чипсы солонее, чем сыр.",
   "pre": "Crisps are ",
   "right": "saltier",
   "wrong": [
    "salter",
    "saltyer"
   ],
   "post": " than cheese.",
   "ru": "Чипсы солонее, чем сыр",
   "hint": "Salty: y меняем на i и добавляем -er."
  },
  {
   "lv": 2,
   "q": "Мороженое слаще, чем хлеб.",
   "pre": "Ice cream is ",
   "right": "sweeter",
   "wrong": [
    "sweetter",
    "sweet"
   ],
   "post": " than bread.",
   "ru": "Мороженое слаще, чем хлеб",
   "hint": "Sweet: просто добавляем -er."
  },
  {
   "lv": 2,
   "q": "Этот чай плохой, а тот ещё хуже.",
   "pre": "This tea is bad, but that tea is ",
   "right": "worse",
   "wrong": [
    "badder",
    "bader"
   ],
   "post": ".",
   "ru": "Этот чай плохой, а тот ещё хуже",
   "hint": "Bad — worse, особая форма."
  },
  {
   "lv": 3,
   "q": "Ты любишь сладкий или солёный попкорн?",
   "pre": "Do you like sweet ",
   "right": "or",
   "wrong": [
    "and",
    "but"
   ],
   "post": " salty popcorn?",
   "ru": "Ты любишь сладкий или солёный попкорн?",
   "hint": "В вопросе о выборе между двумя вариантами — or."
  },
  {
   "lv": 3,
   "q": "Я не люблю горький чай.",
   "pre": "I ",
   "right": "don't like",
   "wrong": [
    "doesn't like",
    "not like"
   ],
   "post": " bitter tea.",
   "ru": "Я не люблю горький чай",
   "hint": "С I — don't like."
  },
  {
   "lv": 3,
   "q": "Дана не любит острую еду.",
   "pre": "Dana ",
   "right": "doesn't like",
   "wrong": [
    "don't like",
    "not like"
   ],
   "post": " spicy food.",
   "ru": "Дана не любит острую еду",
   "hint": "С she, he, Dana — doesn't like."
  },
  {
   "lv": 3,
   "q": "Мне нравятся эти яблоки (рядом).",
   "pre": "I like ",
   "right": "these",
   "wrong": [
    "this",
    "that"
   ],
   "post": " apples.",
   "ru": "Мне нравятся эти яблоки",
   "hint": "These — эти, предметы рядом."
  },
  {
   "lv": 3,
   "q": "Кымыз полезнее, чем кола.",
   "pre": "Kymyz is healthier ",
   "right": "than",
   "wrong": [
    "then",
    "that"
   ],
   "post": " cola.",
   "ru": "Кымыз полезнее, чем кола",
   "hint": "После сравнения — than (чем)."
  }
 ],
 "sound": [
  [
   "bread",
   "хлеб",
   "e",
   [
    "a",
    "i"
   ],
   2,
   1
  ],
  [
   "cheese",
   "сыр",
   "h",
   [
    "k",
    "s"
   ],
   1,
   1
  ],
  [
   "juice",
   "сок",
   "u",
   [
    "o",
    "a"
   ],
   1,
   1
  ],
  [
   "sauce",
   "соус",
   "a",
   [
    "o",
    "e"
   ],
   1,
   2
  ],
  [
   "sweet",
   "сладкий",
   "w",
   [
    "v",
    "u"
   ],
   1,
   1
  ],
  [
   "spicy",
   "острый",
   "p",
   [
    "b",
    "d"
   ],
   1,
   2
  ],
  [
   "salty",
   "солёный",
   "l",
   [
    "r",
    "n"
   ],
   2,
   2
  ],
  [
   "noodles",
   "лапша",
   "d",
   [
    "t",
    "b"
   ],
   3,
   3
  ],
  [
   "fruit",
   "фрукты",
   "r",
   [
    "l",
    "n"
   ],
   1,
   2
  ],
  [
   "vinegar",
   "уксус",
   "g",
   [
    "j",
    "k"
   ],
   4,
   3
  ]
 ],
 "order": [
  [
   "I like sweet popcorn.",
   [
    "I like popcorn sweet.",
    "Like I sweet popcorn."
   ],
   "Я люблю сладкий попкорн",
   "Сначала I like, потом прилагательное, потом существительное."
  ],
  [
   "Do you like tea or juice?",
   [
    "You do like tea or juice?",
    "Do like you tea or juice?"
   ],
   "Ты любишь чай или сок?",
   "Вопрос начинается с Do you like."
  ],
  [
   "An apple is healthier than chocolate.",
   [
    "An apple is healthy than chocolate.",
    "An apple healthier is than chocolate."
   ],
   "Яблоко полезнее, чем шоколад",
   "Сравнение: прилагательное с -er + than."
  ],
  [
   "Ice cream is sweeter than bread.",
   [
    "Ice cream is sweetter than bread.",
    "Ice cream sweeter is than bread."
   ],
   "Мороженое слаще, чем хлеб",
   "Sweet + er = sweeter, без удвоения."
  ],
  [
   "This tea is better than that tea.",
   [
    "This tea is gooder than that tea.",
    "This tea better is than that tea."
   ],
   "Этот чай лучше, чем тот",
   "Good — better."
  ],
  [
   "Those baursaks are tasty.",
   [
    "Those baursaks is tasty.",
    "That baursaks are tasty."
   ],
   "Те баурсаки вкусные",
   "Those + are: много предметов вдали."
  ],
  [
   "I don't like bitter tea.",
   [
    "I no like bitter tea.",
    "I doesn't like bitter tea."
   ],
   "Я не люблю горький чай",
   "С I — don't like."
  ],
  [
   "Dana doesn't like spicy food.",
   [
    "Dana don't like spicy food.",
    "Dana doesn't likes spicy food."
   ],
   "Дана не любит острую еду",
   "С Dana (she) — doesn't like, без -s у like."
  ],
  [
   "That cheese is saltier than this cheese.",
   [
    "That cheese is salter than this cheese.",
    "That cheese saltier is than this cheese."
   ],
   "Тот сыр солонее, чем этот",
   "Salty — saltier: y меняем на i."
  ],
  [
   "Beshbarmak has got meat and noodles.",
   [
    "Beshbarmak have got meat and noodles.",
    "Beshbarmak has got meat and noodle."
   ],
   "В бешбармаке есть мясо и лапша",
   "С it — has got."
  ]
 ],
 "tf": [
  [
   "«{sweet}» значит «сладкий».",
   true,
   "Sweet — сладкий."
  ],
  [
   "«{salty}» значит «кислый».",
   false,
   "Salty — солёный; кислый — sour."
  ],
  [
   "От слова «{big}» сравнительная форма — «{bigger}»: g удваиваем.",
   true,
   "Big — bigger."
  ],
  [
   "Сравнительная форма от «{good}» — «{gooder}».",
   false,
   "Good — better."
  ],
  [
   "«{healthy}» — «{healthier}»: y меняем на i и добавляем -er.",
   true,
   "Healthy — healthier."
  ],
  [
   "Сравнительная форма от «{bad}» — «{worse}».",
   true,
   "Bad — worse."
  ],
  [
   "«{These}» говорим про предметы, которые далеко.",
   false,
   "These — про предметы рядом; для далёких — those."
  ],
  [
   "«{That} cheese is salty» — про один сыр вдали.",
   true,
   "That — тот, один предмет вдали."
  ],
  [
   "«{kymyz}» — это напиток.",
   true,
   "Кымыз — напиток из молока."
  ],
  [
   "«{baursak}» — это напиток.",
   false,
   "Baursak — это жареный хлебец, а не напиток."
  ],
  [
   "В вопросе «Do you like {sweet} {or} {salty} popcorn?» мы выбираем из двух вариантов.",
   true,
   "Or — или."
  ],
  [
   "«{sweet}» — «{sweetter}»: нужно удвоить t.",
   false,
   "Sweet — sweeter, удвоения нет."
  ],
  [
   "«{Beshbarmak}» — блюдо с мясом и лапшой.",
   true,
   "Бешбармак готовят из мяса и лапши."
  ]
 ]
});
