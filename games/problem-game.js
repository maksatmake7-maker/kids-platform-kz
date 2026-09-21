/* ===== Білім Аралы — игра "Реши задачу" (v2 — режим освоения) =====
   Математика, 1 класс, по программе (приложение 26, цели 1.5.1.3/1.5.1.4):
   "анализировать и решать задачи на нахождение суммы и остатка",
   "на увеличение, уменьшение числа на несколько единиц".
   Показываем текстовую задачу (нейтральную, без имён), ребёнок
   считает и выбирает верный ответ. Задачи генерируются заново
   каждый раз — никогда не заканчиваются; чтобы "освоить" тему,
   нужно ответить верно 10 раз ПОДРЯД. Ошибка сбрасывает серию, но
   не прерывает игру. Диапазон чисел растёт вместе со «стриком».
   Использование: initProblemGame('game-root') — problem.html не трогать.
*/
function initProblemGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var EMOJIS = ['🍎','⭐','🎈','🐟','🍓','🧸','🌸','🐧'];
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
  function fillTemplate(tpl, a, b, emoji){
    return tpl.replace(/{a}/g, a).replace(/{b}/g, b).replace(/{emoji}/g, emoji);
  }

  function pickTier(){
    if (streak <= 1) return 1;
    if (streak <= 4) return 2;
    return 3;
  }

  function render(){
    updateProgress();

    var m = msgs();
    var emoji = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
    var isAddition = Math.random() < 0.5;
    var tier = pickTier();
    var a, b, tpl;

    if(isAddition){
      var addBase = [2,3,4][tier-1], addSpan = [3,5,7][tier-1];
      a = addBase + Math.floor(Math.random()*addSpan);
      b = 1 + Math.floor(Math.random()*[3,5,6][tier-1]);
      currentAnswer = a + b;
      tpl = m.problem_add_template || 'There were {a} {emoji}. {b} more {emoji} were added. How many {emoji} are there now?';
    } else {
      var subBase = [4,5,6][tier-1], subSpan = [4,5,5][tier-1];
      a = subBase + Math.floor(Math.random()*subSpan);
      b = 1 + Math.floor(Math.random()*(a-1)); // 1..a-1, гарантирует ответ >= 1
      currentAnswer = a - b;
      tpl = m.problem_subtract_template || 'There were {a} {emoji}. {b} {emoji} were taken away. How many {emoji} are left?';
    }

    var problemText = fillTemplate(tpl, a, b, emoji);

    var options = [currentAnswer];
    var pool = [];
    for(var d=-4; d<=4; d++){
      if(d===0) continue;
      var v = currentAnswer + d;
      if(v >= 0 && v !== currentAnswer) pool.push(v);
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
      '<p class="problem-text">' + problemText + '</p>' +
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
    recordGameResult('problem', STREAK_NEEDED, STREAK_NEEDED);
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
