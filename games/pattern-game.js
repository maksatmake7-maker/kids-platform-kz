/* ===== Білім Аралы — игра "Найди закономерность" =====
   Математика, 1 класс, по программе (приложение 26, цель 1.4.3.1):
   "составлять последовательность чисел... определять закономерность
   в последовательности... чисел в пределах 100".
   Показываем 4 числа по порядку (шаг +1, +2 или +3), ребёнок находит
   следующее число.
   Сессия = 10 вопросов, генерируются процедурно.
   Использование: initPatternGame('game-root') после загрузки DOM.
*/
function initPatternGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

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

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var start = 1 + Math.floor(Math.random()*10); // 1..10
    var step = 1 + Math.floor(Math.random()*3); // 1..3
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
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'), 10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('pattern', score, TOTAL);
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
