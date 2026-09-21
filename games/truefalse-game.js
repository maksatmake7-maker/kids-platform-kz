/* ===== Білім Аралы — игра "Верно или неверно?" (v2 — режим освоения) =====
   Математика, 1 класс, по программе (приложение 26, цель 1.2.2.1):
   "распознавать равенство, неравенство, уравнение / различать
   верные и неверные равенства".
   Показываем пример вида "3 + 2 = 5", ребёнок определяет — верное
   это равенство или нет. Примеры генерируются заново каждый раз —
   никогда не заканчиваются; чтобы "освоить" тему, нужно ответить
   верно 10 раз ПОДРЯД. Ошибка сбрасывает серию, но не прерывает
   игру. Диапазон чисел растёт вместе со «стриком».
   Использование: initTrueFalseGame('game-root') — truefalse.html не трогать.
*/
function initTrueFalseGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var STREAK_NEEDED = 10;
  var streak = 0;
  var totalCorrect = 0;
  var totalAnswered = 0;
  var currentAnswer = false; // true = равенство верное
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

  function pickMax(){
    if (streak <= 1) return 4;
    if (streak <= 4) return 6;
    return 8;
  }

  function render(){
    updateProgress();

    var m = msgs();
    var max = pickMax();
    var a = 1 + Math.floor(Math.random()*max);
    var b = 1 + Math.floor(Math.random()*max);
    var correctSum = a + b;

    var showTrue = Math.random() < 0.5;
    var shownSum;
    if(showTrue){
      shownSum = correctSum;
    } else {
      var offset = (1 + Math.floor(Math.random()*3)) * (Math.random() < 0.5 ? -1 : 1);
      shownSum = correctSum + offset;
      if(shownSum < 0) shownSum = correctSum + Math.abs(offset);
      if(shownSum === correctSum) shownSum = correctSum + 1;
    }
    currentAnswer = (shownSum === correctSum);

    var equationText = a + ' + ' + b + ' = ' + shownSum;

    root.innerHTML =
      '<div class="shape-target-text equation-text">' + equationText + '</div>' +
      '<div class="vowel-options">' +
        '<button class="count-btn" data-value="true">' + (m.btn_true || 'True') + '</button>' +
        '<button class="count-btn" data-value="false">' + (m.btn_false || 'False') + '</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        if(busy) return;
        checkAnswer(btn.getAttribute('data-value') === 'true', btn);
      });
    });
    busy = false;
  }

  function renderFinish(){
    recordGameResult('truefalse', STREAK_NEEDED, STREAK_NEEDED);
    var m = msgs();
    root.innerHTML =
      '<div class="finish-screen">' +
        '<div class="finish-emoji">🏆</div>' +
        '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
        '<p class="finish-score">' + (m.score_label || 'Score:') + ' ' + totalCorrect + ' / ' + totalAnswered + '</p>' +
        '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
      '</div>';
    document.getElementById('play-again-btn').addEventListener('click', function(){
      streak = 0; totalCorrect = 0; totalAnswered = 0;
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
