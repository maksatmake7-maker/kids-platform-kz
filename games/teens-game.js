/* ===== Білім Аралы — игра "Числа 11-20" (v2 — режим освоения) =====
   Математика, 1 класс, по программе (приложение 26, 4-я четверть):
   1.1.1.1 "считать... в пределах 20", 1.1.1.2 "читать, записывать
   и сравнивать числа" (11-20), 1.1.1.3 "объяснять и записывать
   разрядный состав двузначного числа (сколько десятков и единиц)".
   Показываем состав числа ("1 десяток и 3 единицы"), ребёнок
   находит, какое это число (13). Диапазон 11-20 задан программой —
   не выдумываем чисел за его пределами. Числа не заканчиваются, а
   случайно повторяются (без повтора одного и того же числа два раза
   подряд); чтобы "освоить" тему, нужно ответить верно 10 раз ПОДРЯД.
   Ошибка сбрасывает серию, но не прерывает игру.
   Использование: initTeensGame('game-root') — teens.html не трогать.
*/
function initTeensGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var STREAK_NEEDED = 10;
  var streak = 0;
  var totalCorrect = 0;
  var totalAnswered = 0;
  var currentAnswer = 0;
  var lastNumber = null;
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

  function tensBlock(){
    return '<div class="teens-ten">' +
      Array(10).fill('<span class="teens-dot"></span>').join('') +
      '</div>';
  }
  function onesBlock(n){
    return '<div class="teens-ones">' +
      Array(n).fill('<span class="teens-dot teens-dot-one"></span>').join('') +
      '</div>';
  }

  function pickNumber(){
    var candidate;
    var attempts = 0;
    do {
      candidate = 11 + Math.floor(Math.random()*10);
      attempts++;
    } while (candidate === lastNumber && attempts < 10);
    lastNumber = candidate;
    return candidate;
  }

  function render(){
    updateProgress();

    var number = pickNumber();
    currentAnswer = number;
    var tens = Math.floor(number/10);
    var ones = number % 10;

    var blocksHtml = '<div class="teens-blocks">';
    for(var t=0; t<tens; t++){ blocksHtml += tensBlock(); }
    if(ones > 0){ blocksHtml += onesBlock(ones); }
    blocksHtml += '</div>';

    var options = [number];
    while(options.length < 4){
      var candidate = 11 + Math.floor(Math.random()*10);
      if(options.indexOf(candidate) === -1) options.push(candidate);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(v){
      return '<button class="count-btn" data-value="' + v + '">' + v + '</button>';
    }).join('');

    root.innerHTML =
      blocksHtml +
      '<div class="count-options">' + optionsHtml + '</div>' +
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
    recordGameResult('teens', STREAK_NEEDED, STREAK_NEEDED);
    var m = msgs();
    root.innerHTML =
      '<div class="finish-screen">' +
        '<div class="finish-emoji">🏆</div>' +
        '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
        '<p class="finish-score">' + (m.score_label || 'Score:') + ' ' + totalCorrect + ' / ' + totalAnswered + '</p>' +
        '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
      '</div>';
    document.getElementById('play-again-btn').addEventListener('click', function(){
      streak = 0; totalCorrect = 0; totalAnswered = 0; lastNumber = null;
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
