/* ===== Білім Аралы — игра "Верно или неверно?" =====
   Математика, 1 класс, по программе (приложение 26, цель 1.2.2.1):
   "распознавать равенство, неравенство, уравнение / различать
   верные и неверные равенства".
   Показываем пример вида "3 + 2 = 5", ребёнок определяет —
   верное это равенство или нет.
   Сессия = 10 вопросов, примеры генерируются процедурно
   (как в играх на сложение/вычитание).
   Использование: initTrueFalseGame('game-root') после загрузки DOM.
*/
function initTrueFalseGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var TOTAL = 10;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = false; // true = равенство верное

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
    var a = 1 + Math.floor(Math.random()*8); // 1..8
    var b = 1 + Math.floor(Math.random()*8); // 1..8
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
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value') === 'true', btn); });
    });
  }

  function renderFinish(){
    recordGameResult('truefalse_kz', score, TOTAL);
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

  render();
}
