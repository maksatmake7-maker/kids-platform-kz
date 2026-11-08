/* Английский язык, 2 класс — «Shapes — фигуры». Барсик объясняет по-русски, английские слова звучат английским голосом. Тексты проверяет Максат. */
ENG3.define({
 "key": "eng2shapes",
 "theme": "meadow",
 "groups": [
  {
   "k": "sh",
   "name": "Фигуры",
   "c": "blue",
   "words": [
    [
     "circle",
     "круг"
    ],
    [
     "square",
     "квадрат"
    ],
    [
     "triangle",
     "треугольник"
    ],
    [
     "rectangle",
     "прямоугольник"
    ]
   ]
  },
  {
   "k": "th",
   "name": "Предметы",
   "c": "orange",
   "words": [
    [
     "ball",
     "мяч"
    ],
    [
     "window",
     "окно"
    ],
    [
     "door",
     "дверь"
    ],
    [
     "clock",
     "часы"
    ]
   ]
  }
 ],
 "fills": [
  {
   "lv": 1,
   "q": "Круг",
   "pre": "a ",
   "right": "circle",
   "wrong": [
    "square",
    "triangle"
   ],
   "post": "",
   "ru": "круг",
   "hint": "Circle — круг."
  },
  {
   "lv": 1,
   "q": "Квадрат",
   "pre": "a ",
   "right": "square",
   "wrong": [
    "circle",
    "rectangle"
   ],
   "post": "",
   "ru": "квадрат",
   "hint": "Square — квадрат."
  },
  {
   "lv": 1,
   "q": "Треугольник",
   "pre": "a ",
   "right": "triangle",
   "wrong": [
    "square",
    "circle"
   ],
   "post": "",
   "ru": "треугольник",
   "hint": "Triangle — треугольник."
  },
  {
   "lv": 1,
   "q": "Прямоугольник",
   "pre": "a ",
   "right": "rectangle",
   "wrong": [
    "triangle",
    "square"
   ],
   "post": "",
   "ru": "прямоугольник",
   "hint": "Rectangle — прямоугольник."
  },
  {
   "lv": 2,
   "q": "Мяч — это круг.",
   "pre": "The ball is a ",
   "right": "circle",
   "wrong": [
    "square",
    "triangle"
   ],
   "post": ".",
   "ru": "Мяч — это круг.",
   "hint": "Мяч круглый: circle."
  },
  {
   "lv": 2,
   "q": "Окно — это прямоугольник.",
   "pre": "The window is a ",
   "right": "rectangle",
   "wrong": [
    "circle",
    "triangle"
   ],
   "post": ".",
   "ru": "Окно — это прямоугольник.",
   "hint": "У окна четыре стороны, две длиннее: rectangle."
  },
  {
   "lv": 3,
   "q": "Какую фигуру ты видишь?",
   "pre": "I can see a ",
   "right": "square",
   "wrong": [
    "squares",
    "circles"
   ],
   "post": ".",
   "ru": "Я вижу квадрат.",
   "hint": "Один предмет: a square."
  },
  {
   "lv": 3,
   "q": "Вот два круга.",
   "pre": "Here are two ",
   "right": "circles",
   "wrong": [
    "circle",
    "triangles"
   ],
   "post": ".",
   "ru": "Вот два круга.",
   "hint": "Если предметов два, добавляем s: circles."
  }
 ],
 "sound": [
  [
   "circle",
   "круг",
   "i",
   [
    "a",
    "o"
   ],
   1,
   1
  ],
  [
   "square",
   "квадрат",
   "u",
   [
    "a",
    "o"
   ],
   2,
   1
  ],
  [
   "triangle",
   "треугольник",
   "a",
   [
    "o",
    "e"
   ],
   3,
   2
  ],
  [
   "rectangle",
   "прямоугольник",
   "a",
   [
    "o",
    "e"
   ],
   4,
   2
  ]
 ],
 "order": [
  [
   "I can see a circle.",
   [
    "I see can a circle.",
    "Circle a can I see."
   ],
   "Я вижу круг.",
   "Сначала I can see, потом a и фигура."
  ],
  [
   "This is a square.",
   [
    "Is this a square.",
    "A this is square."
   ],
   "Это квадрат.",
   "Сначала This is, потом a и фигура."
  ]
 ],
 "tf": [
  [
   "«{circle}» значит «круг».",
   true,
   "Circle — круг."
  ],
  [
   "«{triangle}» значит «квадрат».",
   false,
   "Triangle — треугольник, а квадрат — square."
  ],
  [
   "Окно похоже на «{rectangle}».",
   true,
   "Rectangle — прямоугольник."
  ],
  [
   "«{square}» значит «квадрат».",
   true,
   "Square — квадрат."
  ]
 ]
});
