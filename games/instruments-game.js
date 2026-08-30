/* ===== Білім Аралы — игра "Музыкальные инструменты" =====
   Музыка, 1 класс, по программе (приложение 33, базовое содержание,
   раздел "Слушание, анализ и исполнение музыки"): "названия
   инструментов: фортепиано, скрипка, домбра... барабан... бубен".
   Домбра — казахский народный инструмент, эмодзи для неё не
   существует, поэтому нарисована собственная SVG-иконка.
   Сессия = ровно один проход по всем инструментам (без повторов).
   Использование: initInstrumentsGame('game-root') после загрузки DOM.
*/
function initInstrumentsGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var BROWN = '#B08050';
  var INK = '#1D3557';

  var INSTRUMENTS = [
    ['item_piano', function(){ return '🎹'; }],
    ['item_violin', function(){ return '🎻'; }],
    ['item_dombra', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<line x1="50" y1="2" x2="50" y2="30" stroke="' + BROWN + '" stroke-width="4"/>' +
        '<line x1="46" y1="2" x2="46" y2="30" stroke="' + INK + '" stroke-width="1.5"/>' +
        '<line x1="54" y1="2" x2="54" y2="30" stroke="' + INK + '" stroke-width="1.5"/>' +
        '<ellipse cx="50" cy="45" rx="22" ry="14" fill="' + BROWN + '"/>' +
        '<circle cx="50" cy="45" r="4" fill="' + INK + '"/>' +
        '</svg>';
    }],
    ['item_drum', function(){ return '🥁'; }],
    ['item_tambourine', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<circle cx="50" cy="30" r="24" fill="none" stroke="' + BROWN + '" stroke-width="5"/>' +
        '<circle cx="50" cy="6" r="3" fill="#FFC93C"/>' +
        '<circle cx="74" cy="30" r="3" fill="#FFC93C"/>' +
        '<circle cx="50" cy="54" r="3" fill="#FFC93C"/>' +
        '<circle cx="26" cy="30" r="3" fill="#FFC93C"/>' +
        '</svg>';
    }]
  ];

  var ROUND_SIZE = INSTRUMENTS.length;
  var ROUNDS = Math.ceil(15 / ROUND_SIZE);
  var TOTAL = ROUND_SIZE * ROUNDS;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = null;

  var queue = [];
  function buildQueue(){
    queue = [];
    for(var r=0; r<ROUNDS; r++){
      var pass = INSTRUMENTS.slice();
      for(var i=pass.length-1; i>0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var tmp = pass[i]; pass[i]=pass[j]; pass[j]=tmp;
      }
      queue = queue.concat(pass);
    }
  }
  function nextItem(){ return queue.pop(); }

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
    currentAnswer = nextItem();

    var options = [currentAnswer];
    var pool = INSTRUMENTS.filter(function(it){ return it[0] !== currentAnswer[0]; });
    while(options.length < 4 && pool.length > 0){
      var idx = Math.floor(Math.random()*pool.length);
      options.push(pool[idx]);
      pool.splice(idx, 1);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(it){
      var content = it[1]();
      var isSvg = content.indexOf('<svg') === 0;
      return '<button class="' + (isSvg ? 'shape-btn' : 'count-btn') + '" data-key="' + it[0] + '"' +
        (isSvg ? '' : ' style="font-size:2rem;"') + '>' + content + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="shape-target-text">' + (m[currentAnswer[0]] || currentAnswer[0]) + '</div>' +
      '<div class="shape-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('[data-key]').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-key'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('instruments', score, TOTAL);
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
