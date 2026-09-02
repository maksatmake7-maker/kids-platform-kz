/* ===== Білім Аралы — игра "Форма Земли" =====
   Естествознание, 1 класс, по программе (приложение 28, 3-я четверть,
   раздел "Земля и космос" → "Земля"):
   1.4.1.1 "определять форму Земли на основе её модели" — базовое
   содержание уточняет: "форма Земли, глобус – модель Земли".
   Земля круглая, как шар (сфера) — глобус её модель.
   Показываем предмет, ребёнок определяет — круглый он (как форма
   Земли), или нет.
   8 предметов — минимум 15 вопросов через повтор кругов.
   Использование: initEarthShapeGame('game-root') после загрузки DOM.
*/
function initEarthShapeGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [эмодзи, 'round' | 'not_round']
  var ITEMS = [
    ['🌍','round'],
    ['⚽','round'],
    ['🍊','round'],
    ['🎈','round'],
    ['📖','not_round'],
    ['🎲','not_round'],
    ['📏','not_round'],
    ['📐','not_round']
  ];

  var ROUND_SIZE = ITEMS.length;
  var ROUNDS = Math.ceil(15 / ROUND_SIZE);
  var TOTAL = ROUND_SIZE * ROUNDS;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

  var queue = [];
  function buildQueue(){
    queue = [];
    for(var r=0; r<ROUNDS; r++){
      var pass = ITEMS.slice();
      for(var i=pass.length-1; i>0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var tmp = pass[i]; pass[i]=pass[j]; pass[j]=tmp;
      }
      queue = queue.concat(pass);
    }
  }
  function nextItem(){ return queue.pop(); }

  function msgs(){
    var lang = document.documentElement.getAttribute('data-current') || 'ru';
    return (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};
  }
  function updateProgress(){
    var el = document.getElementById('count-progress-value');
    if(el) el.textContent = Math.min(questionIndex, TOTAL) + ' / ' + TOTAL;
  }
  function updateScore(){
    var el = document.getElementById('count-score-value');
    if(el) el.textContent = score;
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var item = nextItem();
    currentAnswer = item[1];
    var m = msgs();

    root.innerHTML =
      '<div class="word-emoji">' + item[0] + '</div>' +
      '<div class="count-options word-options">' +
        '<button class="count-btn" data-value="round">' + (m.btn_round || 'Round, like Earth') + '</button>' +
        '<button class="count-btn" data-value="not_round">' + (m.btn_not_round || 'Not round') + '</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('earthshape', score, TOTAL);
    var m = msgs();
    root.innerHTML =
      '<div class="finish-screen">' +
        '<div class="finish-emoji">🏆</div>' +
        '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
        '<p class="finish-score">' + (m.score_label || 'Score:') + ' ' + score + ' / ' + TOTAL + '</p>' +
        '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
      '</div>';
    document.getElementById('play-again-btn').addEventListener('click', function(){
      score = 0;
      questionIndex = 0;
      updateScore();
      buildQueue();
      render();
    });
  }

  function checkAnswer(value, btn){
    var feedback = document.getElementById('count-feedback');
    var m = msgs();

    if(value === currentAnswer){
      score++;
      updateScore();
      btn.classList.add('correct');
      feedback.textContent = m.correct_msg || 'Great job! 🎉';
      feedback.className = 'count-feedback show correct';
      setTimeout(render, 900);
    } else {
      btn.classList.add('wrong');
      feedback.textContent = m.wrong_msg || 'Try again';
      feedback.className = 'count-feedback show wrong';
      setTimeout(function(){ btn.classList.remove('wrong'); }, 500);
    }
  }

  buildQueue();
  render();
}
