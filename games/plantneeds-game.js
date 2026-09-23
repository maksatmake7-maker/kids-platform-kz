/* ===== Білім Аралы — игра "Что нужно растению?" (v2 — режим освоения) =====
   Естествознание, 1 класс, по программе (приложение 28, цель 1.2.1.4):
   "исследовать условия для жизни растений" — вода, свет, тепло.
   Показываем предмет/условие, ребёнок определяет — нужно это
   растению для жизни или нет. Предметов всего 10 — они не
   заканчиваются, а случайно повторяются (без повтора одного и того
   же предмета два раза подряд); чтобы "освоить" тему, нужно ответить
   верно 10 раз ПОДРЯД. Ошибка сбрасывает серию, но не прерывает игру.
   Использование: initPlantNeedsGame('game-root') — plantneeds.html не трогать.
*/
function initPlantNeedsGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [эмодзи, 'needed' | 'not_needed']
  var ITEMS = [
    ['💧','needed'],
    ['☀️','needed'],
    ['🌡️','needed'],
    ['🍬','not_needed'],
    ['🧸','not_needed'],
    ['📱','not_needed'],
    ['🎮','not_needed'],
    ['👟','not_needed'],
    ['⚽','not_needed'],
    ['🚗','not_needed']
  ];

  var STREAK_NEEDED = 10;
  var streak = 0;
  var totalCorrect = 0;
  var totalAnswered = 0;
  var currentAnswer = '';
  var lastEmoji = null;
  var busy = false;

  function msgs(){
    var lang = document.documentElement.getAttribute('data-current') || 'ru';
    return (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};
  }
  function updateProgress(){
    var el = document.getElementById('count-progress-value');
    if(el) el.textContent = streak + ' / ' + STREAK_NEEDED;
  }
  function updateScore(){
    var el = document.getElementById('count-score-value');
    if(el) el.textContent = totalCorrect;
  }

  function pickItem(){
    var candidate;
    var attempts = 0;
    do {
      candidate = ITEMS[Math.floor(Math.random()*ITEMS.length)];
      attempts++;
    } while (candidate[0] === lastEmoji && attempts < 10);
    lastEmoji = candidate[0];
    return candidate;
  }

  function render(){
    updateProgress();
    var m = msgs();
    var item = pickItem();
    currentAnswer = item[1];

    root.innerHTML =
      '<div class="word-emoji">' + item[0] + '</div>' +
      '<div class="vowel-options">' +
        '<button class="count-btn" data-value="needed">' + (m.btn_needed || 'Needed') + '</button>' +
        '<button class="count-btn" data-value="not_needed">' + (m.btn_not_needed || 'Not needed') + '</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        if(busy) return;
        checkAnswer(btn.getAttribute('data-value'), btn);
      });
    });
    busy = false;
  }

  function renderFinish(){
    recordGameResult('plantneeds', STREAK_NEEDED, STREAK_NEEDED);
    var m = msgs();
    root.innerHTML =
      '<div class="finish-screen">' +
        '<div class="finish-emoji">🏆</div>' +
        '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
        '<p class="finish-score">' + (m.score_label || 'Score:') + ' ' + totalCorrect + ' / ' + totalAnswered + '</p>' +
        '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
      '</div>';
    document.getElementById('play-again-btn').addEventListener('click', function(){
      streak = 0; totalCorrect = 0; totalAnswered = 0; lastEmoji = null;
      updateScore();
      render();
    });
  }

  function checkAnswer(value, btn){
    busy = true;
    totalAnswered++;
    var feedback = document.getElementById('count-feedback');
    var m = msgs();
    root.querySelectorAll('.count-btn').forEach(function(b){ b.disabled = true; });

    if(value === currentAnswer){
      totalCorrect++;
      streak++;
      updateScore();
      updateProgress();
      btn.classList.add('correct');
      feedback.textContent = m.correct_msg || 'Great job! 🎉';
      feedback.className = 'count-feedback show correct';
      if(streak >= STREAK_NEEDED){
        setTimeout(renderFinish, 900);
      } else {
        setTimeout(render, 900);
      }
    } else {
      streak = 0;
      updateProgress();
      btn.classList.add('wrong');
      feedback.textContent = m.wrong_msg || 'Try again';
      feedback.className = 'count-feedback show wrong';
      setTimeout(render, 1200);
    }
  }

  render();
}
