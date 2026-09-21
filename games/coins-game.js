/* ===== Білім Аралы — игра "Монеты Казахстана" (v2 — режим освоения) =====
   Математика, 1 класс, по программе (приложение 26, 4-я четверть):
   1.1.3.6 "производить различные операции с монетами 1 тг, 2 тг,
   5 тг, 10 тг, 20 тг" — в документе названы РОВНО эти 5 монет.
   Показываем монету, ребёнок определяет номинал. Материалы и цвета
   монет сохранены как были (золотистые 1-10 тг, серебристая 20 тг).
   Монеты не заканчиваются, а случайно повторяются (без повтора
   одной и той же монеты два раза подряд); чтобы "освоить" тему,
   нужно ответить верно 10 раз ПОДРЯД. Ошибка сбрасывает серию, но
   не прерывает игру.
   Использование: initCoinsGame('game-root') — coins.html не трогать.
*/
function initCoinsGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var GOLD = '#D4AF37';
  var SILVER = '#C0C0C0';

  function coinSvg(value, color, textColor){
    return '<svg viewBox="0 0 120 120" class="coin-svg">' +
      '<circle cx="60" cy="60" r="52" fill="' + color + '" stroke="rgba(0,0,0,0.2)" stroke-width="2"/>' +
      '<circle cx="60" cy="60" r="44" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>' +
      '<text x="60" y="76" font-family="Baloo 2, sans-serif" font-weight="800" font-size="42" fill="' + textColor + '" text-anchor="middle">' + value + '</text>' +
      '</svg>';
  }

  // [номинал, цвет, цвет текста]
  var COINS = [
    [1, GOLD, '#5a4a1a'],
    [2, GOLD, '#5a4a1a'],
    [5, GOLD, '#5a4a1a'],
    [10, GOLD, '#5a4a1a'],
    [20, SILVER, '#4a4a4a']
  ];

  var STREAK_NEEDED = 10;
  var streak = 0;
  var totalCorrect = 0;
  var totalAnswered = 0;
  var currentAnswer = 0;
  var lastValue = null;
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

  function pickCoin(){
    var candidate;
    var attempts = 0;
    do {
      candidate = COINS[Math.floor(Math.random()*COINS.length)];
      attempts++;
    } while (candidate[0] === lastValue && attempts < 10);
    lastValue = candidate[0];
    return candidate;
  }

  function render(){
    updateProgress();

    var coin = pickCoin();
    currentAnswer = coin[0];

    var options = [currentAnswer];
    var pool = COINS.map(function(c){ return c[0]; }).filter(function(v){ return v !== currentAnswer; });
    while(options.length < 4 && pool.length > 0){
      var idx = Math.floor(Math.random()*pool.length);
      options.push(pool[idx]);
      pool.splice(idx, 1);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(v){
      return '<button class="count-btn" data-value="' + v + '">' + v + ' ₸</button>';
    }).join('');

    root.innerHTML =
      '<div class="coin-wrap">' + coinSvg(coin[0], coin[1], coin[2]) + '</div>' +
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
    recordGameResult('coins', STREAK_NEEDED, STREAK_NEEDED);
    var m = msgs();
    root.innerHTML =
      '<div class="finish-screen">' +
        '<div class="finish-emoji">🏆</div>' +
        '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
        '<p class="finish-score">' + (m.score_label || 'Score:') + ' ' + totalCorrect + ' / ' + totalAnswered + '</p>' +
        '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
      '</div>';
    document.getElementById('play-again-btn').addEventListener('click', function(){
      streak = 0; totalCorrect = 0; totalAnswered = 0; lastValue = null;
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
