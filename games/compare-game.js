/* ===== Білім Аралы — игра "Сравни числа" (v2 — бесконечный режим) =====
   Математика, 1 класс, тема "Сравнение".
   Показываем две группы предметов, ребёнок выбирает знак: >, < или =.
   Числа никогда не заканчиваются; чтобы "освоить" тему — нужно ответить
   верно 10 раз ПОДРЯД. Ошибка сбрасывает серию, но не прерывает игру.
   Использование: initCompareGame('game-root') — compare.html не трогать.
*/
function initCompareGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var EMOJIS = ['🍎','⭐','🐻','🎈','🐟','🌸','🦋','🍓'];
  var STREAK_NEEDED = 10;
  var streak = 0;
  var totalCorrect = 0;
  var totalAnswered = 0;
  var currentSign = '=';
  var busy = false;

  function msgs(){
    var lang = document.documentElement.getAttribute('data-current') || 'ru';
    return (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};
  }

  function objectsHtml(n, emoji){
    var h = '';
    for(var i=0; i<n; i++){
      h += '<span class="count-obj" style="animation-delay:' + (i*0.06) + 's">' + emoji + '</span>';
    }
    return h;
  }

  function updateProgress(){
    var el = document.getElementById('count-progress-value');
    if(el) el.textContent = streak + ' / ' + STREAK_NEEDED;
  }
  function updateScore(){
    var el = document.getElementById('count-score-value');
    if(el) el.textContent = totalCorrect;
  }

  function pickRange(){
    if (streak <= 1) return { min: 1, max: 4 };
    if (streak <= 4) return { min: 2, max: 6 };
    return { min: 3, max: 9 };
  }

  function render(){
    var range = pickRange();
    var a = range.min + Math.floor(Math.random()*(range.max - range.min + 1));
    var b;
    if (Math.random() < 0.3){
      b = a; // специально даём случай равенства, иначе он выпадал бы редко
    } else {
      b = range.min + Math.floor(Math.random()*(range.max - range.min + 1));
    }
    currentSign = a > b ? '>' : (a < b ? '<' : '=');
    updateProgress();

    var emojiA = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
    var emojiB = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];

    root.innerHTML =
      '<div class="add-row">' +
        '<div class="add-group">' + objectsHtml(a, emojiA) + '</div>' +
        '<span class="add-op">?</span>' +
        '<div class="add-group">' + objectsHtml(b, emojiB) + '</div>' +
      '</div>' +
      '<div class="count-options">' +
        '<button class="count-btn" data-value="&gt;">&gt;</button>' +
        '<button class="count-btn" data-value="&lt;">&lt;</button>' +
        '<button class="count-btn" data-value="=">=</button>' +
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
    recordGameResult('compare', STREAK_NEEDED, STREAK_NEEDED);
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

    if(value === currentSign){
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
