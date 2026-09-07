/* ===== Білім Аралы — игра "Тенге" =====
   Математика, 2 класс, по программе (приложение 26, 3-я четверть):
   2.1.3.6 "различать монеты в 50 тг, 100 тг, купюры 200 тг, 500 тг
   и производить различные операции с ними".
   Показываем комбинацию монет/купюр (например, "2 × 100 тг + 1 × 50
   тг"), просим посчитать сумму. 24 вопроса, 2-3 номинала в
   комбинации.
   Использование: initTengeGame('game-root') после загрузки DOM.
*/
function initTengeGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var DENOMS = [50, 100, 200, 500];
  var TOTAL = 24;
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

  function generateCombo(m){
    var numTypes = Math.floor(Math.random()*2)+2; // 2 или 3 разных номинала
    var shuffledDenoms = DENOMS.slice().sort(function(){ return Math.random()-0.5; });
    var chosen = shuffledDenoms.slice(0, numTypes);
    var total = 0;
    var parts = [];
    chosen.forEach(function(d){
      var count = Math.floor(Math.random()*3)+1; // 1..3 штук
      total += d*count;
      parts.push(count + ' × ' + d + ' ' + (m.tenge_unit || 'тг'));
    });
    return { text: parts.join(' + '), total: total };
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var m = msgs();
    var combo = generateCombo(m);
    currentAnswer = combo.total;

    var options = [currentAnswer];
    while(options.length < 4){
      var delta = [50,-50,100,-100,150,-150][Math.floor(Math.random()*6)];
      var candidate = currentAnswer + delta;
      if(candidate > 0 && options.indexOf(candidate) === -1){
        options.push(candidate);
      }
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(o){
      return '<button class="count-btn" data-value="' + o + '">' + o + ' ' + (m.tenge_unit || 'тг') + '</button>';
    }).join('');

    root.innerHTML =
      '<div style="font-family:\'Nunito\',sans-serif; font-size:1.4rem; font-weight:800; color:var(--ink); margin-bottom:24px;">💰 ' + combo.text + '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'),10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('tenge', score, TOTAL);
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
