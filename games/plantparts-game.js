/* ===== Білім Аралы — игра "Части растения" =====
   Естествознание, 1 класс, по программе (приложение 28, цель 1.2.1.2):
   "различать основные части растений: корень, стебель, лист,
   цветок, плод, семена".
   Показываем название части, ребёнок находит подходящую SVG-иконку
   среди 4.
   Сессия = ровно один проход по всем частям (без повторов).
   Использование: initPlantPartsGame('game-root') после загрузки DOM.
*/
function initPlantPartsGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var GREEN = '#3FB088';
  var BROWN = '#B08050';
  var CORAL = '#FF6B5B';

  var PARTS = [
    ['part_root', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<line x1="50" y1="5" x2="50" y2="25" stroke="' + GREEN + '" stroke-width="4"/>' +
        '<path d="M50 25 Q40 35 32 50 M50 25 Q50 40 50 55 M50 25 Q60 35 68 50 M50 25 Q45 38 38 55 M50 25 Q55 38 62 55" ' +
          'fill="none" stroke="' + BROWN + '" stroke-width="3" stroke-linecap="round"/>' +
        '</svg>';
    }],
    ['part_stem', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<line x1="50" y1="5" x2="50" y2="55" stroke="' + GREEN + '" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M50 20 Q30 15 25 25 Q35 30 50 25" fill="' + GREEN + '"/>' +
        '<path d="M50 35 Q70 30 75 40 Q65 45 50 40" fill="' + GREEN + '"/>' +
        '</svg>';
    }],
    ['part_leaf', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<path d="M50 8 Q78 20 50 52 Q22 20 50 8 Z" fill="' + GREEN + '"/>' +
        '<line x1="50" y1="12" x2="50" y2="48" stroke="#2E8F6B" stroke-width="2"/>' +
        '</svg>';
    }],
    ['part_flower', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<circle cx="50" cy="15" r="9" fill="' + CORAL + '"/>' +
        '<circle cx="35" cy="24" r="9" fill="' + CORAL + '"/>' +
        '<circle cx="65" cy="24" r="9" fill="' + CORAL + '"/>' +
        '<circle cx="40" cy="38" r="9" fill="' + CORAL + '"/>' +
        '<circle cx="60" cy="38" r="9" fill="' + CORAL + '"/>' +
        '<circle cx="50" cy="27" r="8" fill="#FFC93C"/>' +
        '</svg>';
    }],
    ['part_fruit', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<circle cx="50" cy="35" r="18" fill="' + CORAL + '"/>' +
        '<path d="M50 17 Q52 10 58 8" fill="none" stroke="' + BROWN + '" stroke-width="3" stroke-linecap="round"/>' +
        '<ellipse cx="60" cy="9" rx="7" ry="4" fill="' + GREEN + '" transform="rotate(30 60 9)"/>' +
        '</svg>';
    }],
    ['part_seed', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<ellipse cx="50" cy="30" rx="12" ry="20" fill="' + BROWN + '" transform="rotate(20 50 30)"/>' +
        '<line x1="50" y1="16" x2="50" y2="44" stroke="#7A5230" stroke-width="1.5" transform="rotate(20 50 30)"/>' +
        '</svg>';
    }]
  ];

  var TOTAL = PARTS.length;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = null;

  var queue = [];
  function buildQueue(){
    queue = PARTS.slice();
    for(var i=queue.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = queue[i]; queue[i]=queue[j]; queue[j]=tmp;
    }
  }
  function nextPart(){ return queue.pop(); }

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

    var m = msgs();
    currentAnswer = nextPart();

    var options = [currentAnswer];
    var pool = PARTS.filter(function(p){ return p[0] !== currentAnswer[0]; });
    while(options.length < 4 && pool.length > 0){
      var idx = Math.floor(Math.random()*pool.length);
      options.push(pool[idx]);
      pool.splice(idx, 1);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(p){
      return '<button class="shape-btn" data-key="' + p[0] + '">' + p[1]() + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="shape-target-text">' + (m[currentAnswer[0]] || currentAnswer[0]) + '</div>' +
      '<div class="shape-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.shape-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-key'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('plantparts', score, TOTAL);
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

  function checkAnswer(key, btn){
    var feedback = document.getElementById('count-feedback');
    var m = msgs();

    if(key === currentAnswer[0]){
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
