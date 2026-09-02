/* ===== Білім Аралы — игра "Монеты Казахстана" =====
   Математика, 1 класс, по программе (приложение 26, 4-я четверть):
   1.1.3.6 "производить различные операции с монетами 1 тг, 2 тг,
   5 тг, 10 тг, 20 тг" — в документе названы РОВНО эти 5 монет.
   Показываем монету, ребёнок определяет номинал.
   Материалы и цвета монет проверены (латунное покрытие 1-10 тенге
   — золотистые, никелевое покрытие 20 тенге — серебристая),
   орнамент упрощён — самое важное для распознавания ребёнком
   число на монете, а не точность декора.
   Сессия = несколько кругов подряд, минимум 15 вопросов.
   Использование: initCoinsGame('game-root') после загрузки DOM.
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

  // [номинал, cvet, цвет текста]
  var COINS = [
    [1, GOLD, '#5a4a1a'],
    [2, GOLD, '#5a4a1a'],
    [5, GOLD, '#5a4a1a'],
    [10, GOLD, '#5a4a1a'],
    [20, SILVER, '#4a4a4a']
  ];

  var ROUND_SIZE = COINS.length;
  var ROUNDS = Math.ceil(15 / ROUND_SIZE);
  var TOTAL = ROUND_SIZE * ROUNDS;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = 0;

  var queue = [];
  function buildQueue(){
    queue = [];
    for(var r=0; r<ROUNDS; r++){
      var pass = COINS.slice();
      for(var i=pass.length-1; i>0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var tmp = pass[i]; pass[i]=pass[j]; pass[j]=tmp;
      }
      queue = queue.concat(pass);
    }
  }
  function nextCoin(){ return queue.pop(); }

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

    var coin = nextCoin();
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
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'), 10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('coins', score, TOTAL);
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
