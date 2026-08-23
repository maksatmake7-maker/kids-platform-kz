/* ===== Білім Аралы — переводы (RU / KZ / EN / ZH) =====
   Использование в HTML: <span data-i18n="hero_title"></span>
   Добавляя новую страницу — просто добавляй новые ключи в каждый язык ниже.
*/
const translations = {
  ru: {
    speech: "Привет! Я Біл — твой проводник!",
    hero_title: "Учись играя на острове знаний",
    hero_sub: "Яркие игры и видео для 1 класса — учись и играй",
    cta: "Начать приключение 🚀",
    grade_tag: "1 класс",
    subjects_h2: "Выбери свой остров",
    subjects_lead: "Каждый остров — это новый предмет, полный игр и открытий",
    math_title: "Математика",
    math_desc: "Счёт, цифры, весёлые задачки",
    read_title: "Грамота",
    read_desc: "Буквы, слова и первые сказки",
    kaz_title: "Казахский язык",
    kaz_desc: "Родная речь в песнях и играх",
    game_title: "Игровая комната",
    game_desc: "Головоломки и видео-задания",
    badge_soon: "Скоро",
    footer: "Білім Аралы — растём и учимся вместе 🌤️"
  },
  kz: {
    speech: "Сәлем! Мен Біл — сенің серігің!",
    hero_title: "Білім аралында ойнай отырып үйрен",
    hero_sub: "1 сынып үшін түрлі-түсті ойындар мен бейнелер — ойна әрі үйрен",
    cta: "Саяхатты бастау 🚀",
    grade_tag: "1 сынып",
    subjects_h2: "Өз аралыңды таңда",
    subjects_lead: "Әр арал — ойындар мен жаңалыққа толы жаңа пән",
    math_title: "Математика",
    math_desc: "Санау, цифрлар, қызықты есептер",
    read_title: "Сауат ашу",
    read_desc: "Әріптер, сөздер және алғашқы ертегілер",
    kaz_title: "Қазақ тілі",
    kaz_desc: "Ойындар мен әндердегі ана тілі",
    game_title: "Ойын бөлмесі",
    game_desc: "Жұмбақтар мен бейне-тапсырмалар",
    badge_soon: "Жақында",
    footer: "Білім Аралы — бірге өсіп, бірге үйренейік 🌤️"
  },
  en: {
    speech: "Hi! I'm Bil — your guide!",
    hero_title: "Learn by playing on the Island of Knowledge",
    hero_sub: "Colorful games and videos for 1st grade — play and learn",
    cta: "Start the adventure 🚀",
    grade_tag: "Grade 1",
    subjects_h2: "Choose your island",
    subjects_lead: "Each island is a new subject full of games and discoveries",
    math_title: "Math",
    math_desc: "Counting, numbers, fun puzzles",
    read_title: "Literacy",
    read_desc: "Letters, words and first stories",
    kaz_title: "Kazakh Language",
    kaz_desc: "Native language in songs and games",
    game_title: "Game Room",
    game_desc: "Puzzles and video tasks",
    badge_soon: "Coming soon",
    footer: "Bilim Araly — growing and learning together 🌤️"
  },
  zh: {
    speech: "你好！我是比尔——你的向导！",
    hero_title: "在知识岛上边玩边学",
    hero_sub: "为一年级准备的多彩游戏和视频——边玩边学",
    cta: "开始冒险 🚀",
    grade_tag: "一年级",
    subjects_h2: "选择你的小岛",
    subjects_lead: "每个小岛都是一个充满游戏和发现的新学科",
    math_title: "数学",
    math_desc: "数数、数字、趣味题目",
    read_title: "识字",
    read_desc: "字母、单词和最初的故事",
    kaz_title: "哈萨克语",
    kaz_desc: "在歌曲与游戏中学习本土语言",
    game_title: "游戏室",
    game_desc: "谜题与视频任务",
    badge_soon: "即将上线",
    footer: "Bilim Araly——一起成长，一起学习 🌤️"
  }
};

function applyLang(lang){
  if(!translations[lang]) lang = 'ru';
  document.documentElement.setAttribute('data-current', lang);
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var key = el.getAttribute('data-i18n');
    if(translations[lang][key] !== undefined){
      el.textContent = translations[lang][key];
    }
  });
  document.querySelectorAll('.lang-toggle button').forEach(function(btn){
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

document.addEventListener('DOMContentLoaded', function(){
  applyLang('ru');
});
