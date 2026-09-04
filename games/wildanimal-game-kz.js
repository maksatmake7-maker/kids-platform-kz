/* ===== Білім Аралы — игра "Дикое или домашнее животное?" =====
   Естествознание, 1 класс, по программе (приложение 28, цель 1.2.2.2):
   "различать диких и домашних животных".
   Показываем животное, ребёнок определяет — дикое оно или домашнее.
   Сессия = ровно один проход по всем животным (без повторов).
   Использование: initWildAnimalGame('game-root') после загрузки DOM.
*/
function initWildAnimalGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [эмодзи, 'wild' | 'domestic']
  var ANIMALS = [
    ['🦁','wild'],
    ['🐺','wild'],
    ['🦊','wild'],
    ['🐻','wild'],
    ['🦌','wild'],
    ['🐄','domestic'],
    ['🐑','domestic'],
    ['🐔','domestic'],
    ['🐕','domestic'],
    ['🐈','domestic']
  ];

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

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var m = msgs();
    var item = nextItem();
    currentAnswer = item[1];

    root.innerHTML =
      '<div class="word-emoji">' + item[0] + '</div>' +
      '<div class="vowel-options">' +
        '<button class="count-btn" data-value="wild">' + (m.btn_wildanimal || 'Wild') + '</button>' +
        '<button class="count-btn" data-value="domestic">' + (m.btn_domestic || 'Domestic') + '</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('wildanimal_kz', score, TOTAL);
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
