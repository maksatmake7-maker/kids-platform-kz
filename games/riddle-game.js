/* ===== Білім Аралы — игра "Отгадай загадку" =====
   Обучение грамоте, 1 класс, по программе (приложение 4, базовое
   содержание, раздел "Аудирование и говорение", пункт 3:
   "развитие артикуляционного аппарата через заучивание...
   загадок").
   Используются настоящие традиционные русские народные загадки
   (не выдуманные) — ребёнок читает загадку и выбирает отгадку
   среди 4 картинок.
   Сессия = ровно один проход по всем загадкам (без повторов).
   Использование: initRiddleGame('game-root') после загрузки DOM.
*/
function initRiddleGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [текст загадки, отгадка-эмодзи] — традиционные русские народные загадки
  var RIDDLES = [
    ['Зимой и летом одним цветом.', '🌲'],
    ['Красная девица сидит в темнице, а коса на улице.', '🥕'],
    ['Сидит дед, во сто шуб одет. Кто его раздевает, тот слёзы проливает.', '🧅'],
    ['Само с кулачок, красный бочок, потрогаешь — гладко, а откусишь — сладко.', '🍎'],
    ['Не лает, не кусает, а в дом не пускает.', '🔒'],
    ['Висит груша — нельзя скушать.', '💡'],
    ['Тикают, ходят, а с места не сходят.', '⏰'],
    ['Разноцветное коромысло над рекой повисло.', '🌈']
  ];

  var TOTAL = RIDDLES.length;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = null;

  var queue = [];
  function buildQueue(){
    queue = RIDDLES.slice();
    for(var i=queue.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = queue[i]; queue[i]=queue[j]; queue[j]=tmp;
    }
  }
  function nextRiddle(){ return queue.pop(); }

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

    currentAnswer = nextRiddle();

    var options = [currentAnswer[1]];
    var pool = RIDDLES.filter(function(r){ return r[1] !== currentAnswer[1]; }).map(function(r){ return r[1]; });
    while(options.length < 4 && pool.length > 0){
      var idx = Math.floor(Math.random()*pool.length);
      options.push(pool[idx]);
      pool.splice(idx, 1);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(emoji){
      return '<button class="count-btn riddle-btn" data-value="' + emoji + '">' + emoji + '</button>';
    }).join('');

    root.innerHTML =
      '<p class="problem-text">' + currentAnswer[0] + '</p>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.riddle-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('riddle', score, TOTAL);
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

  function checkAnswer(emoji, btn){
    var feedback = document.getElementById('count-feedback');
    var m = msgs();

    if(emoji === currentAnswer[1]){
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
