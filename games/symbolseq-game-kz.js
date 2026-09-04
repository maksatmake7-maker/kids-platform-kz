/* ===== Білім Аралы — игра "Продолжи ряд" =====
   Математика, 1 класс, по программе (приложение 26, цель 1.4.3.1):
   "определять закономерность в последовательности рисунков, фигур,
   символов". Показываем чередующийся ряд из 2 картинок (АБАБАБ),
   ребёнок находит следующий элемент.
   Сессия = 10 вопросов, генерируются процедурно из пула эмодзи.
   Использование: initSymbolSeqGame('game-root') после загрузки DOM.
*/
function initSymbolSeqGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var EMOJIS = ['⭐','❤️','🔵','🟡','🌸','🍎','🦋','🎈','🍓','🌙'];
  var TOTAL = 10;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

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
  function pickTwoDistinct(){
    var pool = EMOJIS.slice();
    var i1 = Math.floor(Math.random()*pool.length);
    var a = pool.splice(i1, 1)[0];
    var i2 = Math.floor(Math.random()*pool.length);
    var b = pool.splice(i2, 1)[0];
    return [a, b];
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var pair = pickTwoDistinct();
    var A = pair[0], B = pair[1];
    // Ряд АБАБА — следующий элемент Б (5 элементов показываем, спрашиваем 6-й)
    var sequence = [A, B, A, B, A];
    currentAnswer = B;

    var sequenceHtml = sequence.map(function(e){
      return '<span class="count-obj">' + e + '</span>';
    }).join('') + '<span class="count-obj" style="opacity:0.35;">❓</span>';

    var options = [A, B];
    var restPool = EMOJIS.filter(function(e){ return e !== A && e !== B; });
    for(var p=restPool.length-1; p>0; p--){
      var q = Math.floor(Math.random()*(p+1));
      var tp = restPool[p]; restPool[p]=restPool[q]; restPool[q]=tp;
    }
    options = options.concat(restPool.slice(0,2));
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(e){
      return '<button class="count-btn" data-value="' + e + '">' + e + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="count-objects">' + sequenceHtml + '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('symbolseq_kz', score, TOTAL);
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
