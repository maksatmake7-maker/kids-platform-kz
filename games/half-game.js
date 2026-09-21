/* ===== Білім Аралы — игра "Половина числа" (v2 — режим освоения) =====
   Математика, 1 класс, по программе (приложение 26, 2-я четверть):
   1.1.1.5 "находить половину числа 2, 4, 6, 8, 10 предметов путем
   практического действия" — в документе названы РОВНО эти 5 чисел,
   поэтому в базе ровно 5 вопросов (не больше и не меньше — не
   выдумываем других чисел). Они не заканчиваются, а случайно
   повторяются (без повтора одного и того же числа два раза подряд);
   чтобы "освоить" тему, нужно ответить верно 10 раз ПОДРЯД. Ошибка
   сбрасывает серию, но не прерывает игру.
   Использование: initHalfGame('game-root') — half.html не трогать.
*/
function initHalfGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var NUMBERS = [2, 4, 6, 8, 10]; // ровно из документа
  var EMOJIS = ['🍎','⭐','🎈','🐟','🌸','🦋','🍓','🌟'];

  var STREAK_NEEDED = 10;
  var streak = 0;
  var totalCorrect = 0;
  var totalAnswered = 0;
  var currentAnswer = 0;
  var lastN = null;
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

  function pickNumber(){
    var candidate;
    var attempts = 0;
    do {
      candidate = NUMBERS[Math.floor(Math.random()*NUMBERS.length)];
      attempts++;
    } while (candidate === lastN && attempts < 10);
    lastN = candidate;
    return candidate;
  }

  function render(){
    updateProgress();

    var n = pickNumber();
    currentAnswer = n / 2;
    var emoji = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];

    var objectsHtml = '';
    for(var i=0; i<n; i++){
      objectsHtml += '<span class="half-item">' + emoji + '</span>';
    }

    var options = [currentAnswer];
    var pool = NUMBERS.map(function(x){ return x/2; }).filter(function(x){ return x !== currentAnswer; });
    while(options.length < 4 && pool.length > 0){
      var idx = Math.floor(Math.random()*pool.length);
      options.push(pool[idx]);
      pool.splice(idx, 1);
    }
    while(options.length < 4){
      var extra = 1 + Math.floor(Math.random()*5);
      if(options.indexOf(extra) === -1) options.push(extra);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(v){
      return '<button class="count-btn" data-value="' + v + '">' + v + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="half-objects">' + objectsHtml + '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        if(busy) return;
        checkAnswer(parseInt(btn.getAttribute('data-value'), 10), btn);
      });
    });
    busy = false;
  }

  function renderFinish(){
    recordGameResult('half', STREAK_NEEDED, STREAK_NEEDED);
    var m = msgs();
    root.innerHTML =
      '<div class="finish-screen">' +
        '<div class="finish-emoji">🏆</div>' +
        '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
        '<p class="finish-score">' + (m.score_label || 'Score:') + ' ' + totalCorrect + ' / ' + totalAnswered + '</p>' +
        '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
      '</div>';
    document.getElementById('play-again-btn').addEventListener('click', function(){
      streak = 0; totalCorrect = 0; totalAnswered = 0; lastN = null;
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
