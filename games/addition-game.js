/* ===== Білім Аралы — игра "Сложи и узнай" =====
   Фиксированная сессия из 30 вопросов, затем финальный экран.
   Использование: initAdditionGame('game-root') после загрузки DOM.
*/
function initAdditionGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var EMOJIS = ['🍎','⭐','🐻','🎈','🐟','🌸','🦋','🍓'];
  var TOTAL = 30;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = 0;

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

    var a = 1 + Math.floor(Math.random()*5); // 1..5
    var b = 1 + Math.floor(Math.random()*5); // 1..5
    currentAnswer = a + b;
    var emoji = pick(EMOJIS);

    var options = [currentAnswer];
    var poolA = [1,2,3,4,5,6,7,8,9,10,11,12,13].filter(function(n){ return n !== currentAnswer; });
    for(var p=poolA.length-1; p>0; p--){
      var q = Math.floor(Math.random()*(p+1));
      var tp = poolA[p]; poolA[p]=poolA[q]; poolA[q]=tp;
    }
    options = options.concat(poolA.slice(0,3));
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(n){
      return '<button class="count-btn" data-value="' + n + '">' + n + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="add-row">' +
        '<div class="add-group">' + objectsHtml(a, emoji) + '</div>' +
        '<span class="add-op">+</span>' +
        '<div class="add-group">' + objectsHtml(b, emoji) + '</div>' +
        '<span class="add-op">=</span>' +
        '<span class="add-op">?</span>' +
      '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'), 10), btn); });
    });
  }

  function renderFinish(){
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
