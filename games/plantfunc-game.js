/* ===== Білім Аралы — игра "Функции частей растения" =====
   Естествознание, 2 класс, по программе (приложение 28, 1-я четверть):
   2.2.1.3 "описывать функции основных частей растений".
   В отличие от игры "Части растения" в 1 классе (просто назвать
   часть), здесь нужно понять её РОЛЬ — что именно она делает для
   растения. Показываем часть растения, просим выбрать её функцию
   среди 4 вариантов. 4 части × 6 повторов = 24 вопроса.
   Использование: initPlantFuncGame('game-root') после загрузки DOM.
*/
function initPlantFuncGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var PARTS = [
    { emoji: '🌱', key: 'root' },
    { emoji: '🌿', key: 'stem' },
    { emoji: '🍃', key: 'leaf' },
    { emoji: '🌸', key: 'flower' }
  ];

  var TOTAL = 24;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';
  var order = [];

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
  function shuffle(arr){
    for(var i=arr.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var t = arr[i]; arr[i]=arr[j]; arr[j]=t;
    }
    return arr;
  }
  function funcLabel(m, key){
    return m['plantfunc_' + key] || key;
  }

  function render(){
    if(questionIndex === 0){
      var pool = [];
      for(var r=0; r<6; r++){ pool = pool.concat(PARTS); }
      order = shuffle(pool);
    }
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var part = order[questionIndex-1];
    currentAnswer = part.key;
    var m = msgs();

    var options = [currentAnswer];
    while(options.length < 4){
      var candidate = PARTS[Math.floor(Math.random()*PARTS.length)].key;
      if(options.indexOf(candidate) === -1) options.push(candidate);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(k){
      return '<button class="count-btn" data-value="' + k + '">' + funcLabel(m, k) + '</button>';
    }).join('');

    root.innerHTML =
      '<div style="font-size:5rem; margin-bottom:20px;">' + part.emoji + '</div>' +
      '<div class="count-options" style="flex-direction:column; align-items:center;">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('plantfunc', score, TOTAL);
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
