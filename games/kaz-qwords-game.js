/* ===== Білім Аралы — игра "Вопросительные слова" =====
   Казахский язык, 1 класс, по программе (приложение 11, цель 1.3.4.1):
   задавать простые вопросы к иллюстрации (кто? что? какой? сколько?).
   Ребёнку показывают картинку-сценарий, он выбирает подходящее
   вопросительное слово из 4 фиксированных вариантов.
   Сессия = ровно один проход по всем сценариям (без повторов).
   Использование: initKazQwordsGame('game-root') после загрузки DOM.
*/
function initKazQwordsGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [эмодзи, количество (1 = один предмет), правильное вопросительное слово]
  var SCENARIOS = [
    ['🧒', 1, 'КІМ?'],
    ['👩‍🏫', 1, 'КІМ?'],
    ['📕', 1, 'НЕ?'],
    ['✏️', 1, 'НЕ?'],
    ['🧸', 1, 'НЕ?'],
    ['🔴', 1, 'ҚАНДАЙ?'],
    ['🐘', 1, 'ҚАНДАЙ?'],
    ['🍎', 3, 'НЕШЕ?'],
    ['⭐', 5, 'НЕШЕ?'],
    ['📕', 2, 'НЕШЕ?']
  ];

  var QWORDS = ['КІМ?','НЕ?','ҚАНДАЙ?','НЕШЕ?'];
  var TOTAL = SCENARIOS.length;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

  var queue = [];
  function buildQueue(){
    queue = SCENARIOS.slice();
    for(var i=queue.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = queue[i]; queue[i]=queue[j]; queue[j]=tmp;
    }
  }
  function nextScenario(){ return queue.pop(); }

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

    var scenario = nextScenario();
    var emoji = scenario[0], count = scenario[1];
    currentAnswer = scenario[2];

    var pictureHtml;
    if(count === 1){
      pictureHtml = '<div class="word-emoji">' + emoji + '</div>';
    } else {
      var objs = '';
      for(var i=0; i<count; i++){
        objs += '<span class="count-obj" style="animation-delay:' + (i*0.06) + 's">' + emoji + '</span>';
      }
      pictureHtml = '<div class="count-objects">' + objs + '</div>';
    }

    // порядок вопросительных слов перемешиваем каждый раз для разнообразия
    var options = QWORDS.slice();
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(w){
      return '<button class="count-btn" data-word="' + w + '">' + w + '</button>';
    }).join('');

    root.innerHTML =
      pictureHtml +
      '<div class="count-options word-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-word'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('kazqwords', score, TOTAL);
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

  function checkAnswer(word, btn){
    var feedback = document.getElementById('count-feedback');
    var m = msgs();

    if(word === currentAnswer){
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
