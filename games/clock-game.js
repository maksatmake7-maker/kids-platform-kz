/* ===== Білім Аралы — игра "Который час?" (v2 — режим освоения) =====
   Математика, 1 класс, по программе (приложение 26, 2-я четверть):
   1.1.3.5 "определять время в часах по циферблату в 12 часовом
   формате" — в 1 классе только целые часы (без минут), это
   соответствует базовому уровню цели.
   Циферблат рисуется как SVG, минутная стрелка всегда на 12
   (ровно час), часовая стрелка поворачивается на случайный час.
   Часы (1..12) генерируются заново каждый раз — никогда не
   заканчиваются; чтобы "освоить" тему, нужно ответить верно 10 раз
   ПОДРЯД. Ошибка сбрасывает серию, но не прерывает игру.
   Использование: initClockGame('game-root') — clock.html не трогать.
*/
function initClockGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var STREAK_NEEDED = 10;
  var streak = 0;
  var totalCorrect = 0;
  var totalAnswered = 0;
  var currentAnswer = 0;
  var busy = false;

  function msgs(){
    var lang = document.documentElement.getAttribute('data-current') || 'ru';
    return (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};
  }
  function updateProgress(){
    var el = document.getElementById('count-progress-value');
    if(el) el.textContent = streak + ' / ' + STREAK_NEEDED;
  }
  function updateScore(){
    var el = document.getElementById('count-score-value');
    if(el) el.textContent = totalCorrect;
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

    var optionsHtml = options.map(function(h){
      return '<button class="count-btn" data-value="' + h + '">' + h + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="clock-wrap">' + clockSvg(hour) + '</div>' +
      '<div class="count-options clock-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){
        if(busy) return;
        checkAnswer(parseInt(btn.getAttribute('data-value'), 10), btn);
      });
    });
    busy = false;
  }

  function renderFinish(){
    recordGameResult('clock', STREAK_NEEDED, STREAK_NEEDED);
    var m = msgs();
    root.innerHTML =
      '<div class="finish-screen">' +
        '<div class="finish-emoji">🏆</div>' +
        '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
        '<p class="finish-score">' + (m.score_label || 'Score:') + ' ' + totalCorrect + ' / ' + totalAnswered + '</p>' +
        '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
      '</div>';
    document.getElementById('play-again-btn').addEventListener('click', function(){
      streak = 0; totalCorrect = 0; totalAnswered = 0;
      updateScore();
      render();
    });
  }

  function checkAnswer(value, btn){
    busy = true;
    totalAnswered++;
    var feedback = document.getElementById('count-feedback');
    var m = msgs();
    root.querySelectorAll('.count-btn').forEach(function(b){ b.disabled = true; });

    if(value === currentAnswer){
      totalCorrect++;
      streak++;
      updateScore();
      updateProgress();
      btn.classList.add('correct');
      feedback.textContent = m.correct_msg || 'Great job! 🎉';
      feedback.className = 'count-feedback show correct';
      if(streak >= STREAK_NEEDED){
        setTimeout(renderFinish, 900);
      } else {
        setTimeout(render, 900);
      }
    } else {
      streak = 0;
      updateProgress();
      btn.classList.add('wrong');
      feedback.textContent = m.wrong_msg || 'Try again';
      feedback.className = 'count-feedback show wrong';
      setTimeout(render, 1200);
    }
  }

  render();
}
