/* ===== Білім Аралы — игра "Как звери готовятся к зиме?" =====
   Естествознание, 1 класс, по программе (приложение 28, цель 1.2.2.3):
   "объяснять адаптацию животных к смене времен года" — базовое
   содержание конкретно называет: перелёт птиц, запас корма на зиму,
   впадение в спячку.
   Показываем животное, ребёнок выбирает, как оно готовится к зиме,
   среди 3 фиксированных вариантов.
   Сессия = ровно один проход по всем животным (без повторов).
   Использование: initAdaptationGame('game-root') после загрузки DOM.
*/
function initAdaptationGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [эмодзи, 'migration' | 'foodstore' | 'hibernate']
  var ANIMALS = [
    ['🦢','migration'],
    ['🦆','migration'],
    ['🐦','migration'],
    ['🐿️','foodstore'],
    ['🐹','foodstore'],
    ['🐜','foodstore'],
    ['🐻','hibernate'],
    ['🦔','hibernate'],
    ['🦇','hibernate']
  ];

  var STRATEGIES = ['migration', 'foodstore', 'hibernate'];

  var TOTAL = ANIMALS.length;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

  var queue = [];
  function buildQueue(){
    queue = ANIMALS.slice();
    for(var i=queue.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = queue[i]; queue[i]=queue[j]; queue[j]=tmp;
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
  function labelFor(strategy, m){
    if(strategy === 'migration') return m.btn_migration || 'Migrates';
    if(strategy === 'foodstore') return m.btn_foodstore || 'Stores food';
    return m.btn_hibernate || 'Hibernates';
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var m = msgs();
    var item = nextItem();
    currentAnswer = item[1];

    // порядок вариантов перемешиваем каждый раз для разнообразия
    var options = STRATEGIES.slice();
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(s){
      return '<button class="count-btn" data-value="' + s + '">' + labelFor(s, m) + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="word-emoji">' + item[0] + '</div>' +
      '<div class="count-options word-options stack-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('adaptation', score, TOTAL);
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
