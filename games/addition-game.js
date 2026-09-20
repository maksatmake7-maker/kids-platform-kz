/* ===== Білім Аралы — игра "Сложи и узнай" (v2 — бесконечный режим) =====
   Математика, 1 класс, тема "Сложение".
   Новая механика вместо фиксированного числа вопросов:
   — числа генерируются заново каждый раз (никогда не заканчиваются);
   — чтобы "освоить" тему, нужно ответить верно 10 раз ПОДРЯД;
   — ошибка сбрасывает серию, но НЕ прерывает игру — сразу следующий пример;
   — сложность растёт вместе с серией (числа крупнее).
   Использование: initAdditionGame('game-root') после загрузки DOM —
   вызывается так же, как и раньше, страницу addition.html трогать не нужно.
*/
function initAdditionGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var EMOJIS = ['🍎','⭐','🐻','🎈','🐟','🌸','🦋','🍓'];
  var STREAK_NEEDED = 10;
  var streak = 0;
  var totalCorrect = 0;
  var totalAnswered = 0;
  var currentAnswer = 0;
  var busy = false;
  var sessionEmoji = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];

  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
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

  // Прогресс теперь показывает серию верных ответов подряд, а не номер вопроса из фиксированного набора
  function updateProgress(){
    var el = document.getElementById('count-progress-value');
    if(el) el.textContent = streak + ' / ' + STREAK_NEEDED;
  }
  function updateScore(){
    var el = document.getElementById('count-score-value');
    if(el) el.textContent = totalCorrect;
  }

  function pickRange(){
    if (streak <= 1) return { min: 1, max: 3 };
    if (streak <= 4) return { min: 1, max: 5 };
    return { min: 1, max: 6 };
  }

  function render(){
    var range = pickRange();
    var a = range.min + Math.floor(Math.random()*(range.max - range.min + 1));
    var b = range.min + Math.floor(Math.random()*(range.max - range.min + 1));
    currentAnswer = a + b;
    updateProgress();

    var m = msgs();
    var options = [currentAnswer];
    var attempts = 0;
    while(options.length < 4 && attempts < 30){
      attempts++;
      var delta = [1,-1,2,-2,3,-3][Math.floor(Math.random()*6)];
      var candidate = currentAnswer + delta;
      if(candidate > 0 && options.indexOf(candidate) === -1){
        options.push(candidate);
      }
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(o){
      return '<button class="count-btn" data-value="' + o + '">' + o + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="add-row">' +
        '<div class="add-group">' + objectsHtml(a, sessionEmoji) + '</div>' +
        '<span class="add-op">+</span>' +
        '<div class="add-group">' + objectsHtml(b, sessionEmoji) + '</div>' +
        '<span class="add-op">=</span>' +
        '<span class="add-op">?</span>' +
      '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        if(busy) return;
        checkAnswer(parseInt(btn.getAttribute('data-value'),10), btn);
      });
    });
    busy = false;
  }

  function renderFinish(){
    recordGameResult('addition', STREAK_NEEDED, STREAK_NEEDED);
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
      sessionEmoji = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
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
