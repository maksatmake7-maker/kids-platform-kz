/* Английский язык, 4 класс (A1.2, школы с русским языком обучения) — «Professions — профессии». Барсик объясняет по-русски, английские слова звучат английским голосом. Движок — games/eng3-kit.js. */
ENG3.define({
 "key": "eng4u41",
 "theme": "autumn",
 "groups": [
  {
   "k": "jobs",
   "name": "Профессии",
   "c": "green",
   "words": [
    [
     "police officer",
     "полицейский"
    ],
    [
     "firefighter",
     "пожарный"
    ],
    [
     "doctor",
     "врач"
    ],
    [
     "farmer",
     "фермер"
    ],
    [
     "greengrocer",
     "зеленщик"
    ],
    [
     "baker",
     "пекарь"
    ]
   ]
  },
  {
   "k": "jobs2",
   "name": "Ещё профессии",
   "c": "orange",
   "words": [
    [
     "postman",
     "почтальон"
    ],
    [
     "teacher",
     "учитель"
    ],
    [
     "vet",
     "ветеринар"
    ],
    [
     "driver",
     "водитель"
    ],
    [
     "builder",
     "строитель"
    ],
    [
     "nurse",
     "медсестра"
    ]
   ]
  },
  {
   "k": "things",
   "name": "Вещи и места",
   "c": "blue",
   "words": [
    [
     "helmet",
     "каска, шлем"
    ],
    [
     "van",
     "фургон"
    ],
    [
     "shop",
     "магазин"
    ],
    [
     "uniform",
     "форма"
    ],
    [
     "parcel",
     "посылка"
    ],
    [
     "bread",
     "хлеб"
    ]
   ]
  },
  {
   "k": "subj",
   "name": "Кто делает",
   "c": "green",
   "words": [
    [
     "I",
     "я"
    ],
    [
     "you",
     "ты, вы"
    ],
    [
     "he",
     "он"
    ],
    [
     "she",
     "она"
    ],
    [
     "we",
     "мы"
    ],
    [
     "they",
     "они"
    ]
   ]
  },
  {
   "k": "obj",
   "name": "Кого, кому",
   "c": "orange",
   "words": [
    [
     "me",
     "меня, мне"
    ],
    [
     "him",
     "его, ему"
    ],
    [
     "her",
     "её, ей"
    ],
    [
     "us",
     "нас, нам"
    ],
    [
     "them",
     "их, им"
    ],
    [
     "it",
     "его, её (о предмете)"
    ]
   ]
  },
  {
   "k": "poss",
   "name": "Чей",
   "c": "blue",
   "words": [
    [
     "my",
     "мой"
    ],
    [
     "your",
     "твой"
    ],
    [
     "his",
     "его"
    ],
    [
     "our",
     "наш"
    ],
    [
     "their",
     "их"
    ],
    [
     "mine",
     "мой (без слова после)"
    ]
   ]
  }
 ],
 "pairs": [
  [
   "he",
   "он",
   "she",
   "она"
  ],
  [
   "we",
   "мы",
   "they",
   "они"
  ],
  [
   "mine",
   "мой",
   "yours",
   "твой"
  ],
  [
   "I",
   "я",
   "you",
   "ты"
  ]
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Чья это форма? Это форма полицейского.",
   "pre": "Whose uniform is it? It's the ",
   "right": "police officer's",
   "wrong": [
    "police officer",
    "police officers"
   ],
   "post": ".",
   "ru": "Чья это форма? Это форма полицейского",
   "hint": "Чья вещь — имя + 's."
  },
  {
   "lv": 1,
   "q": "Я учитель.",
   "pre": "I am a ",
   "right": "teacher",
   "wrong": [
    "teach",
    "teaches"
   ],
   "post": ".",
   "ru": "Я учитель",
   "hint": "После a называем профессию."
  },
  {
   "lv": 1,
   "q": "Он пожарный.",
   "pre": "",
   "right": "He",
   "wrong": [
    "Him",
    "His"
   ],
   "post": " is a firefighter.",
   "ru": "Он пожарный",
   "hint": "Кто? — He (он)."
  },
  {
   "lv": 1,
   "q": "Мы строители.",
   "pre": "",
   "right": "We",
   "wrong": [
    "Us",
    "Our"
   ],
   "post": " are builders.",
   "ru": "Мы строители",
   "hint": "Кто? — We (мы)."
  },
  {
   "lv": 1,
   "q": "Мы любим нашего учителя.",
   "pre": "We love ",
   "right": "our",
   "wrong": [
    "us",
    "we"
   ],
   "post": " teacher.",
   "ru": "Мы любим нашего учителя",
   "hint": "Our — наш, ставим перед словом."
  },
  {
   "lv": 1,
   "q": "Это моя каска.",
   "pre": "This is ",
   "right": "my",
   "wrong": [
    "me",
    "mine"
   ],
   "post": " helmet.",
   "ru": "Это моя каска",
   "hint": "My — мой, перед словом."
  },
  {
   "lv": 2,
   "q": "Эта каска моя.",
   "pre": "This helmet is ",
   "right": "mine",
   "wrong": [
    "my",
    "me"
   ],
   "post": ".",
   "ru": "Эта каска моя",
   "hint": "Mine — мой, без слова после него."
  },
  {
   "lv": 2,
   "q": "Это твой фургон. Он твой.",
   "pre": "This is your van. It is ",
   "right": "yours",
   "wrong": [
    "your",
    "you"
   ],
   "post": ".",
   "ru": "Это твой фургон. Он твой",
   "hint": "Yours — твой, без слова после него."
  },
  {
   "lv": 2,
   "q": "Посмотри на него!",
   "pre": "Look at ",
   "right": "him",
   "wrong": [
    "he",
    "his"
   ],
   "post": "!",
   "ru": "Посмотри на него",
   "hint": "После слова at — him."
  },
  {
   "lv": 2,
   "q": "Дана и Айгерим — медсёстры. Мы любим их.",
   "pre": "Dana and Aigerim are nurses. We like ",
   "right": "them",
   "wrong": [
    "they",
    "their"
   ],
   "post": ".",
   "ru": "Дана и Айгерим — медсёстры. Мы любим их",
   "hint": "После глагола — them (их)."
  },
  {
   "lv": 2,
   "q": "Айдар — фермер. Его ферма большая.",
   "pre": "Aidar is a farmer. ",
   "right": "His",
   "wrong": [
    "He",
    "Him"
   ],
   "post": " farm is big.",
   "ru": "Айдар — фермер. Его ферма большая",
   "hint": "His — его, перед словом."
  },
  {
   "lv": 2,
   "q": "Это Дина. Её мама — пекарь.",
   "pre": "This is Dina. ",
   "right": "Her",
   "wrong": [
    "She",
    "Hers"
   ],
   "post": " mother is a baker.",
   "ru": "Это Дина. Её мама — пекарь",
   "hint": "Her — её, перед словом."
  },
  {
   "lv": 2,
   "q": "Почтальон приносит нам письмо.",
   "pre": "The postman brings ",
   "right": "us",
   "wrong": [
    "we",
    "our"
   ],
   "post": " a letter.",
   "ru": "Почтальон приносит нам письмо",
   "hint": "После глагола — us (нам)."
  },
  {
   "lv": 3,
   "q": "Пожалуйста, помоги мне.",
   "pre": "Please help ",
   "right": "me",
   "wrong": [
    "I",
    "my"
   ],
   "post": ".",
   "ru": "Пожалуйста, помоги мне",
   "hint": "После глагола — me (мне)."
  },
  {
   "lv": 3,
   "q": "Мой брат — водитель. Он водит фургон.",
   "pre": "My brother is a driver. ",
   "right": "He",
   "wrong": [
    "Him",
    "His"
   ],
   "post": " drives a van.",
   "ru": "Мой брат — водитель. Он водит фургон",
   "hint": "Вместо слов «мой брат» — he."
  },
  {
   "lv": 3,
   "q": "Эта сумка не твоя. Она моя.",
   "pre": "This bag is not yours. It is ",
   "right": "mine",
   "wrong": [
    "my",
    "me"
   ],
   "post": ".",
   "ru": "Эта сумка не твоя. Она моя",
   "hint": "Mine — без слова после него."
  },
  {
   "lv": 3,
   "q": "Пекари пекут хлеб. Они работают с утра.",
   "pre": "Bakers make bread. ",
   "right": "They",
   "wrong": [
    "Them",
    "Their"
   ],
   "post": " work in the morning.",
   "ru": "Пекари пекут хлеб. Они работают с утра",
   "hint": "Кто? — They (они)."
  },
  {
   "lv": 3,
   "q": "Это магазин зеленщика. Это его магазин.",
   "pre": "This is the greengrocer's shop. It is ",
   "right": "his",
   "wrong": [
    "he",
    "him"
   ],
   "post": " shop.",
   "ru": "Это магазин зеленщика. Это его магазин",
   "hint": "His — его, перед словом."
  },
  {
   "lv": 3,
   "q": "Сауле — ветеринар. Собака любит её.",
   "pre": "Saule is a vet. The dog likes ",
   "right": "her",
   "wrong": [
    "she",
    "hers"
   ],
   "post": ".",
   "ru": "Сауле — ветеринар. Собака любит её",
   "hint": "После глагола — her (её)."
  }
 ],
 "sound": [
  [
   "baker",
   "пекарь",
   "k",
   [
    "c",
    "g"
   ],
   2,
   1
  ],
  [
   "nurse",
   "медсестра",
   "u",
   [
    "o",
    "a"
   ],
   1,
   1
  ],
  [
   "doctor",
   "врач",
   "c",
   [
    "k",
    "s"
   ],
   2,
   1
  ],
  [
   "farmer",
   "фермер",
   "f",
   [
    "v",
    "p"
   ],
   0,
   1
  ],
  [
   "helmet",
   "каска",
   "h",
   [
    "n",
    "m"
   ],
   0,
   2
  ],
  [
   "teacher",
   "учитель",
   "c",
   [
    "k",
    "s"
   ],
   3,
   2
  ],
  [
   "builder",
   "строитель",
   "u",
   [
    "a",
    "o"
   ],
   1,
   2
  ],
  [
   "driver",
   "водитель",
   "v",
   [
    "w",
    "b"
   ],
   3,
   3
  ],
  [
   "postman",
   "почтальон",
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
   "Whose uniform is it?",
   [
    "Whose is uniform it?",
    "Who uniform is it?"
   ],
   "Чья это форма?",
   "Whose + вещь + is it?"
  ],
  [
   "It's the doctor's.",
   [
    "It's the doctors.",
    "It the doctor's."
   ],
   "Это вещь врача",
   "Чья вещь — имя + 's."
  ],
  [
   "He is a firefighter.",
   [
    "He a firefighter is.",
    "He are a firefighter."
   ],
   "Он пожарный",
   "He + is + профессия."
  ],
  [
   "She is a good teacher.",
   [
    "She is teacher good a.",
    "She are a good teacher."
   ],
   "Она хороший учитель",
   "She + is + a + какая + профессия."
  ],
  [
   "This helmet is mine.",
   [
    "This helmet is my.",
    "This is helmet mine."
   ],
   "Эта каска моя",
   "Mine ставим в конце, без слова после."
  ],
  [
   "We love our teacher.",
   [
    "We love we teacher.",
    "We love us teacher."
   ],
   "Мы любим нашего учителя",
   "Our + слово: наш учитель."
  ],
  [
   "Look at them!",
   [
    "Look at they!",
    "Look at their!"
   ],
   "Посмотри на них",
   "После at — them."
  ],
  [
   "The van is yours.",
   [
    "The van is your.",
    "The van yours is."
   ],
   "Фургон твой",
   "Yours — без слова после него."
  ],
  [
   "Her father is a farmer.",
   [
    "She father is a farmer.",
    "Her father are a farmer."
   ],
   "Её папа — фермер",
   "Her + слово: её папа."
  ],
  [
   "I am a builder.",
   [
    "I is a builder.",
    "I am builder a."
   ],
   "Я строитель",
   "С I говорим am."
  ],
  [
   "The nurse helps us.",
   [
    "The nurse helps we.",
    "The nurse help us."
   ],
   "Медсестра помогает нам",
   "После глагола — us; с nurse — helps."
  ]
 ],
 "tf": [
  [
   "«{nurse}» значит «медсестра».",
   true,
   "Верно. Nurse — медсестра."
  ],
  [
   "«{vet}» значит «учитель».",
   false,
   "Неверно. Vet — ветеринар, учитель — teacher."
  ],
  [
   "«{postman}» значит «почтальон».",
   true,
   "Верно. Postman — почтальон."
  ],
  [
   "«{helmet}» значит «фургон».",
   false,
   "Неверно. Helmet — каска, а фургон — van."
  ],
  [
   "Фраза «{Whose uniform is it?}» значит «Чья это форма?».",
   true,
   "Верно. Whose — чья, чей."
  ],
  [
   "Правильно говорить «Look at {he}!».",
   false,
   "Неверно. После at говорим him: Look at {him}!"
  ],
  [
   "Слово «{mine}» ставят перед существительным: «mine helmet».",
   false,
   "Неверно. Перед словом стоит my: {my} helmet. Mine стоит в конце: It is {mine}."
  ],
  [
   "«{It's the police officer's.}» отвечает на вопрос «Чья это форма?».",
   true,
   "Верно. 's показывает, чья вещь."
  ],
  [
   "Слово «{us}» значит «нас, нам».",
   true,
   "Верно. Us — нас, нам."
  ],
  [
   "Про одну девочку мы говорим «{he}».",
   false,
   "Неверно. Про девочку говорим {she}, про мальчика — {he}."
  ],
  [
   "«{They}» значит «они».",
   true,
   "Верно. They — они."
  ],
  [
   "«{The van is yours.}» значит «Фургон твой».",
   true,
   "Верно. Yours — твой."
  ],
  [
   "«{farmer}» — это человек, который продаёт овощи в магазине.",
   false,
   "Неверно. Продаёт овощи greengrocer. Farmer — фермер."
  ],
  [
   "Слово «{its}» значит «его, её» и говорится о предмете или животном.",
   true,
   "Верно. Its — его, её (не о человеке)."
  ],
  [
   "В предложении «{I am a builder}» всё правильно.",
   true,
   "Верно. С I говорим am."
  ]
 ]
});
