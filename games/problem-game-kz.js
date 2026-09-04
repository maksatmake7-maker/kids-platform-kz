/* ===== Білім Аралы — игра "Реши задачу" =====
   Математика, 1 класс, по программе (приложение 26, цели 1.5.1.3/1.5.1.4):
   "анализировать и решать задачи на нахождение суммы и остатка",
   "на увеличение, уменьшение числа на несколько единиц".
   Показываем текстовую задачу (нейтральную, без имён — чтобы не
   зависеть от грамматического рода на разных языках), ребёнок
   считает и выбирает верный ответ.
   Сессия = 10 вопросов, генерируются процедурно.
   Использование: initProblemGame('game-root') после загрузки DOM.
*/
function initProblemGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var EMOJIS = ['🍎','⭐','🎈','🐟','🍓','🧸','🌸','🐧'];
  var TOTAL = 10;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = 0;

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
  function fillTemplate(tpl, a, b, emoji){
    return tpl.replace(/{a}/g, a).replace(/{b}/g, b).replace(/{emoji}/g, emoji);
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var m = msgs();
    var emoji = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
    var isAddition = Math.random() < 0.5;
    var a, b, tpl;

    if(isAddition){
      a = 3 + Math.floor(Math.random()*6); // 3..8
      b = 1 + Math.floor(Math.random()*5); // 1..5
      currentAnswer = a + b;
      tpl = m.problem_add_template || 'There were {a} {emoji}. {b} more {emoji} were added. How many {emoji} are there now?';
    } else {
      a = 5 + Math.floor(Math.random()*5); // 5..9
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
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'), 10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('problem_kz', score, TOTAL);
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
