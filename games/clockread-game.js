/* ===== Білім Аралы — игра "Который час?" =====
   Математика, 2 класс, по программе (приложение 26, 2-я четверть):
   2.1.3.5 "определять время по циферблату: часы и минуты".
   Рисуем SVG-циферблат со стрелками на конкретное время (с точностью
   до четверти часа: :00, :15, :30, :45 — подходящий уровень для 2
   класса) и просим выбрать верное время среди 4 текстовых вариантов
   вида "3:15".
   24 вопроса, процедурная генерация.
   Использование: initClockReadGame('game-root') после загрузки DOM.
*/
function initClockReadGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var TOTAL = 24;
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

  function pad(n){ return n < 10 ? '0'+n : String(n); }

  function drawClock(hour, minute){
    var cx=100, cy=100, r=90;
    var hourAngle = (hour % 12) * 30 + minute * 0.5 - 90;
    var minuteAngle = minute * 6 - 90;
    var hourLen = 50, minuteLen = 75;
    var hx = cx + hourLen * Math.cos(hourAngle * Math.PI/180);
    var hy = cy + hourLen * Math.sin(hourAngle * Math.PI/180);
    var mx = cx + minuteLen * Math.cos(minuteAngle * Math.PI/180);
    var my = cy + minuteLen * Math.sin(minuteAngle * Math.PI/180);

    var marks = '';
    for(var i=0;i<12;i++){
      var angle = i*30 - 90;
      var x1 = cx + 80*Math.cos(angle*Math.PI/180), y1 = cy + 80*Math.sin(angle*Math.PI/180);
      var x2 = cx + 88*Math.cos(angle*Math.PI/180), y2 = cy + 88*Math.sin(angle*Math.PI/180);
      marks += '<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="#1D3557" stroke-width="3"/>';
    }

    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:180px;height:180px;">' +
      '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="#FFF9EE" stroke="#1D3557" stroke-width="4"/>' +
      marks +
      '<line x1="'+cx+'" y1="'+cy+'" x2="'+hx.toFixed(1)+'" y2="'+hy.toFixed(1)+'" stroke="#1D3557" stroke-width="6" stroke-linecap="round"/>' +
      '<line x1="'+cx+'" y1="'+cy+'" x2="'+mx.toFixed(1)+'" y2="'+my.toFixed(1)+'" stroke="#FF6B5B" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="'+cx+'" cy="'+cy+'" r="6" fill="#1D3557"/>' +
      '</svg>';
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var hour = Math.floor(Math.random()*12)+1;
    var minute = [0,15,30,45][Math.floor(Math.random()*4)];
    currentAnswer = hour + ':' + pad(minute);
    var m = msgs();

    var options = [currentAnswer];
    while(options.length < 4){
      var dh = Math.floor(Math.random()*3)-1;
      var dm = [0,15,30,45][Math.floor(Math.random()*4)];
      var candHour = ((hour-1+dh+12)%12)+1;
      var cand = candHour + ':' + pad(dm);
      if(options.indexOf(cand) === -1) options.push(cand);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(o){
      return '<button class="count-btn" data-value="' + o + '">' + o + '</button>';
    }).join('');

    root.innerHTML =
      '<div style="display:flex; justify-content:center; margin-bottom:16px;">' + drawClock(hour, minute) + '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('clockread', score, TOTAL);
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
