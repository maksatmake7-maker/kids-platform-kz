/* ===== Білім Аралы — игра "Музыкальные инструменты" =====
   Музыка, 1 класс, по программе (приложение 33, базовое содержание,
   раздел "Слушание, анализ и исполнение музыки"): "названия
   инструментов: фортепиано, скрипка, домбра, конырау, детские
   шумовые инструменты: ксилофон, барабан, треугольник, маракасы,
   бубен". 9 инструментов — почти весь список из документа
   (асатаяк, туяктас, дауылпаз, металлофон пропущены — не нашлось
   уверенного способа нарисовать их узнаваемо для ребёнка).
   Домбра, конырау, ксилофон, треугольник, маракасы, бубен —
   собственные SVG-иконки (эмодзи для них не существует или
   слишком новые/ненадёжные).
   Сессия = несколько кругов подряд, минимум 15 вопросов.
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
    }],
    ['item_xylophone', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<rect x="8" y="46" width="84" height="10" rx="3" fill="' + BROWN + '"/>' +
        '<rect x="10" y="6" width="66" height="7" rx="3" fill="#FF6B5B"/>' +
        '<rect x="10" y="15" width="57" height="7" rx="3" fill="#FFC93C"/>' +
        '<rect x="10" y="24" width="48" height="7" rx="3" fill="#3FB088"/>' +
        '<rect x="10" y="33" width="40" height="7" rx="3" fill="#5EC3F0"/>' +
        '</svg>';
    }],
    ['item_triangle_instr', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<polyline points="50,4 78,54 22,54 50,4" fill="none" stroke="#9AA5B3" stroke-width="4" stroke-linejoin="round"/>' +
        '<line x1="50" y1="0" x2="50" y2="4" stroke="#7E8998" stroke-width="2"/>' +
        '<line x1="62" y1="30" x2="82" y2="48" stroke="#C77D5A" stroke-width="4"/>' +
        '<circle cx="83" cy="49" r="4" fill="' + BROWN + '"/>' +
        '</svg>';
    }],
    ['item_konyrau', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<polygon points="50,10 32,52 68,52" fill="#FFC93C"/>' +
        '<ellipse cx="50" cy="52" rx="20" ry="6" fill="#F0954C"/>' +
        '<ellipse cx="50" cy="6" rx="5" ry="5" fill="' + BROWN + '"/>' +
        '<rect x="47" y="0" width="6" height="8" fill="' + INK + '"/>' +
        '<ellipse cx="50" cy="55" rx="4" ry="5" fill="' + INK + '"/>' +
        '</svg>';
    }],
    ['item_maracas', function(){
      return '<svg viewBox="0 0 100 60">' +
        '<ellipse cx="35" cy="20" rx="14" ry="16" fill="#FF6B5B"/>' +
        '<rect x="30" y="32" width="10" height="24" fill="' + BROWN + '"/>' +
        '<ellipse cx="65" cy="20" rx="14" ry="16" fill="#3FB088"/>' +
        '<rect x="60" y="32" width="10" height="24" fill="' + BROWN + '"/>' +
        '<circle cx="30" cy="14" r="2" fill="#FFF3D6"/>' +
        '<circle cx="40" cy="14" r="2" fill="#FFF3D6"/>' +
        '<circle cx="35" cy="24" r="2" fill="#FFF3D6"/>' +
        '<circle cx="60" cy="14" r="2" fill="#FFF3D6"/>' +
        '<circle cx="70" cy="14" r="2" fill="#FFF3D6"/>' +
        '<circle cx="65" cy="24" r="2" fill="#FFF3D6"/>' +
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
    recordGameResult('instruments_kz', score, TOTAL);
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
