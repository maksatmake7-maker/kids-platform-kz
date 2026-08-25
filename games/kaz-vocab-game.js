/* ===== Білім Аралы — игра "Всё обо мне" =====
   Казахский язык, 1 класс, по программе (приложение 11, лексический
   минимум для темы "Все обо мне", параграф 5): ребёнку показывают
   картинку, он выбирает правильное казахское слово среди 4 вариантов.
   Сессия = ровно один проход по всем словам (без повторов).
   Использование: initKazVocabGame('game-root') после загрузки DOM.
*/
function initKazVocabGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [казахское слово, эмодзи]
  var WORDS = [
    ['ОҚУШЫ','🧑‍🎓'],
    ['КІТАП','📕'],
    ['ҚАЛАМ','✏️'],
    ['ОЙЫНШЫҚ','🧸'],
    ['ЖЕТІ','7️⃣'],
    ['ЕСІМ','🏷️'],
    ['ОТЫРУ','🪑']
  ];

  var TOTAL = WORDS.length;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = null;

  var queue = [];
  function buildQueue(){
    queue = WORDS.slice();
    for(var i=queue.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = queue[i]; queue[i]=queue[j]; queue[j]=tmp;
    }
  }
  function nextWord(){ return queue.pop(); }

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

    currentAnswer = nextWord();

    var options = [currentAnswer];
    var pool = WORDS.filter(function(w){ return w[0] !== currentAnswer[0]; });
    while(options.length < 4 && pool.length > 0){
      var idx = Math.floor(Math.random()*pool.length);
      options.push(pool[idx]);
      pool.splice(idx, 1);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(w){
      return '<button class="count-btn" data-word="' + w[0] + '">' + w[0] + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="word-emoji">' + currentAnswer[1] + '</div>' +
      '<div class="count-options word-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-word'), btn); });
    });
  }

  function renderFinish(){
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

    if(word === currentAnswer[0]){
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
