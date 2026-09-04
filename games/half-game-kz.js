/* ===== Білім Аралы — игра "Половина числа" =====
   Математика, 1 класс, по программе (приложение 26, 2-я четверть):
   1.1.1.5 "находить половину числа 2, 4, 6, 8, 10 предметов путем
   практического действия" — в документе названы РОВНО эти 5 чисел,
   поэтому ровно 5 вопросов в базовом наборе (не больше и не
   меньше — не выдумываем других чисел).
   Сессия = несколько кругов подряд, минимум 15 вопросов.
   Использование: initHalfGame('game-root') после загрузки DOM.
*/
function initHalfGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var NUMBERS = [2, 4, 6, 8, 10]; // ровно из документа
  var EMOJIS = ['🍎','⭐','🎈','🐟','🌸','🦋','🍓','🌟'];

  var ROUND_SIZE = NUMBERS.length;
  var ROUNDS = Math.ceil(15 / ROUND_SIZE);
  var TOTAL = ROUND_SIZE * ROUNDS;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = 0;

  var queue = [];
  function buildQueue(){
    queue = [];
    for(var r=0; r<ROUNDS; r++){
      var pass = NUMBERS.slice();
      for(var i=pass.length-1; i>0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var tmp = pass[i]; pass[i]=pass[j]; pass[j]=tmp;
      }
      queue = queue.concat(pass);
    }
  }
  function nextNumber(){ return queue.pop(); }

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

    var n = nextNumber();
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
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'), 10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('half_kz', score, TOTAL);
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
      buildQueue();
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

  buildQueue();
  render();
}
