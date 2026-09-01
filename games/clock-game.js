/* ===== Білім Аралы — игра "Который час?" =====
   Математика, 1 класс, по программе (приложение 26, 2-я четверть):
   1.1.3.5 "определять время в часах по циферблату в 12 часовом
   формате" — в 1 классе только целые часы (без минут), это
   соответствует базовому уровню цели.
   Циферблат рисуется как SVG, минутная стрелка всегда на 12
   (ровно час), часовая стрелка поворачивается на случайный час.
   Процедурная генерация — 12 вариантов часа, вопросов практически
   бесконечно (как в счёте/сложении).
   Сессия = 24 вопроса подряд.
   Использование: initClockGame('game-root') после загрузки DOM.
*/
function initClockGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

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

  function clockSvg(hour){
    var hourAngle = (hour % 12) * 30; // 0..330, 12 часов = 0 градусов
    return '<svg viewBox="0 0 200 200" class="clock-face">' +
      '<circle cx="100" cy="100" r="90" fill="#F5F8FA" stroke="#1D3557" stroke-width="5"/>' +
      [1,2,3,4,5,6,7,8,9,10,11,12].map(function(h){
        var a = (h * 30 - 90) * Math.PI/180;
        var x1 = 100 + 76*Math.cos(a), y1 = 100 + 76*Math.sin(a);
        var x2 = 100 + 86*Math.cos(a), y2 = 100 + 86*Math.sin(a);
        return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="#1D3557" stroke-width="4"/>';
      }).join('') +
      '<line x1="100" y1="100" x2="100" y2="55" stroke="#1D3557" stroke-width="8" stroke-linecap="round" transform="rotate(' + hourAngle + ' 100 100)"/>' +
      '<line x1="100" y1="100" x2="100" y2="32" stroke="#FF6B5B" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="100" cy="100" r="8" fill="#1D3557"/>' +
      '</svg>';
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var hour = 1 + Math.floor(Math.random()*12); // 1..12
    currentAnswer = hour;

    var options = [hour];
    while(options.length < 4){
      var candidate = 1 + Math.floor(Math.random()*12);
      if(options.indexOf(candidate) === -1) options.push(candidate);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var m = msgs();
    var optionsHtml = options.map(function(h){
      return '<button class="count-btn" data-value="' + h + '">' + h + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="clock-wrap">' + clockSvg(hour) + '</div>' +
      '<div class="count-options clock-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'), 10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('clock', score, TOTAL);
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
