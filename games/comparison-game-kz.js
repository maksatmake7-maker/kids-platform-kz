/* ===== Білім Аралы — игра "Сравни числа" =====
   Фиксированная сессия из 30 вопросов, затем финальный экран.
   Использование: initComparisonGame('game-root') после загрузки DOM.
*/
function initComparisonGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var EMOJIS = ['🍎','⭐','🐻','🎈','🐟','🌸','🦋','🍓'];
  var TOTAL = 30;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

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

    var a = 1 + Math.floor(Math.random()*9); // 1..9
    var b = 1 + Math.floor(Math.random()*9); // 1..9
    currentAnswer = a > b ? '>' : (a < b ? '<' : '=');

    var emojiA = pick(EMOJIS);
    var restEmojis = EMOJIS.filter(function(e){ return e !== emojiA; });
    var emojiB = pick(restEmojis);

    var optionsHtml = ['<','=','>'].map(function(sym){
      return '<button class="count-btn compare-btn" data-value="' + sym + '">' + sym + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="add-row">' +
        '<div class="add-group">' + objectsHtml(a, emojiA) + '</div>' +
        '<span class="add-op">?</span>' +
        '<div class="add-group">' + objectsHtml(b, emojiB) + '</div>' +
      '</div>' +
      '<div class="count-options compare-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.compare-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('compare_kz', score, TOTAL);
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
