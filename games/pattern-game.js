/* ===== Білім Аралы — игра "Найди закономерность" (v2 — режим освоения) =====
   Математика, 1 класс, по программе (приложение 26, цель 1.4.3.1):
   "составлять последовательность чисел... определять закономерность
   в последовательности... чисел в пределах 100".
   Показываем 4 числа по порядку (шаг +1, +2 или +3), ребёнок находит
   следующее число. Числа генерируются заново каждый раз — никогда не
   заканчиваются; чтобы "освоить" тему, нужно ответить верно 10 раз
   ПОДРЯД. Ошибка сбрасывает серию, но не прерывает игру.
   Использование: initPatternGame('game-root') — pattern.html не трогать.
*/
function initPatternGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var STREAK_NEEDED = 10;
  var streak = 0;
  var totalCorrect = 0;
  var totalAnswered = 0;
  var currentAnswer = 0;
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

  function pickStepRange(){
    // Шаг растёт вместе со «стриком»: сначала только +1, потом до +2, потом до +3
    if (streak <= 2) return 1;
    if (streak <= 5) return 2;
    return 3;
  }

  function render(){
    updateProgress();

    var maxStep = pickStepRange();
    var start = 1 + Math.floor(Math.random()*10); // 1..10
    var step = 1 + Math.floor(Math.random()*maxStep);
    var terms = [];
    for(var i=0; i<4; i++){ terms.push(start + step*i); }
    currentAnswer = start + step*4;

    var sequenceText = terms.join(', ') + ', ?';

    var options = [currentAnswer];
    var pool = [];
    for(var d=-6; d<=6; d++){
      if(d===0) continue;
      var v = currentAnswer + d;
      if(v >= 1 && v !== currentAnswer) pool.push(v);
    }
    for(var p=pool.length-1; p>0; p--){
      var q = Math.floor(Math.random()*(p+1));
      var tp = pool[p]; pool[p]=pool[q]; pool[q]=tp;
    }
    options = options.concat(pool.slice(0,3));
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(n){
      return '<button class="count-btn" data-value="' + n + '">' + n + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="shape-target-text equation-text">' + sequenceText + '</div>' +
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
    recordGameResult('pattern', STREAK_NEEDED, STREAK_NEEDED);
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
