/* ===== Білім Аралы — игра "Разрядный состав" =====
   Математика, 2 класс, по программе (приложение 26, 1-я четверть):
   2.1.1.3 "определять разрядный состав двузначных чисел, раскладывать
   на сумму разрядных слагаемых".
   Показываем двузначное число, ребёнок выбирает верное разложение
   на десятки и единицы среди 4 вариантов.
   Процедурная генерация чисел от 10 до 99 — 30 вопросов.
   Использование: initPlaceValueGame('game-root') после загрузки DOM.
*/
function initPlaceValueGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var TOTAL = 30;
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

  function formatBreakdown(tens, ones, m){
    var tensLabel = m.pv_tens || 'tens';
    var onesLabel = m.pv_ones || 'ones';
    return tens + ' ' + tensLabel + ' ' + ones + ' ' + onesLabel;
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var num = Math.floor(Math.random() * 90) + 10; // 10..99
    var correctTens = Math.floor(num / 10);
    var correctOnes = num % 10;
    var m = msgs();

    currentAnswer = correctTens + '_' + correctOnes;

    var options = [{ tens: correctTens, ones: correctOnes }];
    while(options.length < 4){
      var distTens = correctTens, distOnes = correctOnes;
      var variant = Math.floor(Math.random() * 3);
      if(variant === 0){ distOnes = (correctOnes + 1 + Math.floor(Math.random()*3)) % 10; }
      else if(variant === 1){ distTens = Math.max(1, (correctTens + 1 + Math.floor(Math.random()*2)) % 10); }
      else { distTens = correctOnes; distOnes = correctTens; if(distTens===0){distTens=1;} }

      var dup = options.some(function(o){ return o.tens === distTens && o.ones === distOnes; });
      if(!dup && !(distTens === correctTens && distOnes === correctOnes)){
        options.push({ tens: distTens, ones: distOnes });
      }
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(o){
      return '<button class="count-btn" data-value="' + o.tens + '_' + o.ones + '">' + formatBreakdown(o.tens, o.ones, m) + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="alphabet-pair"><span class="alphabet-letter">' + num + '</span></div>' +
      '<div class="count-options" style="flex-direction:column; align-items:center;">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('placevalue', score, TOTAL);
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
