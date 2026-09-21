/* ===== Білім Аралы — игра "Сравни множества" (v2 — режим освоения) =====
   Математика, 1 класс, по программе (приложение 26, 4-я четверть):
   1.4.1.x — сравнение множеств предметов (больше, меньше, поровну),
   в том числе понятие "пустое множество".
   Показываем две группы предметов, ребёнок определяет: в какой
   группе больше, в какой меньше, или предметов поровну. Числа
   генерируются заново каждый раз — никогда не заканчиваются; чтобы
   "освоить" тему, нужно ответить верно 10 раз ПОДРЯД. Ошибка
   сбрасывает серию, но не прерывает игру. Диапазон чисел растёт
   вместе со «стриком».
   Использование: initSetsGame('game-root') — sets.html не трогать.
*/
function initSetsGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var EMOJIS = ['🍎','⭐','🎈','🐟','🌸','🦋','🍓','🌟','🐝','🍒'];
  var STREAK_NEEDED = 10;
  var streak = 0;
  var totalCorrect = 0;
  var totalAnswered = 0;
  var currentAnswer = '';
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

  function groupHtml(n, emoji){
    var items = '';
    for(var i=0; i<n; i++){ items += '<span class="sets-item">' + emoji + '</span>'; }
    return '<div class="sets-group">' + items + '</div>';
  }

  function pickMax(){
    if (streak <= 1) return 4;
    if (streak <= 4) return 6;
    return 7;
  }

  function render(){
    updateProgress();

    var max = pickMax();
    var a = 1 + Math.floor(Math.random()*max);
    var b;
    // примерно в трети случаев делаем равные множества
    if(Math.random() < 0.3){
      b = a;
    } else {
      do { b = 1 + Math.floor(Math.random()*max); } while(b === a);
    }
    var emojiA = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
    var emojiB = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];

    if(a > b) currentAnswer = 'a';
    else if(b > a) currentAnswer = 'b';
    else currentAnswer = 'equal';

    var m = msgs();

    root.innerHTML =
      '<div class="sets-wrap">' +
        groupHtml(a, emojiA) +
        '<div class="sets-vs">?</div>' +
        groupHtml(b, emojiB) +
      '</div>' +
      '<div class="count-options sets-options">' +
        '<button class="count-btn" data-value="a">' + (m.sets_a_more || 'Left has more') + '</button>' +
        '<button class="count-btn" data-value="equal">' + (m.sets_equal || 'Equal') + '</button>' +
        '<button class="count-btn" data-value="b">' + (m.sets_b_more || 'Right has more') + '</button>' +
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
    recordGameResult('sets', STREAK_NEEDED, STREAK_NEEDED);
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
