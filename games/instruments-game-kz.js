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
      return '<svg viewBox="0 0 100 60"><g transform="translate(5,5) rotate(19) scale(.93)"><g transform="scale(1,.88)"><path d="M52,-3.6 C62,-7 75,-16 88,-15.2 C98.5,-14.6 102,-6 101,0 C102,7 98.5,16 88,17 C75,18 62,8.5 52,5 Z" fill="#4A1C12"/><path d="M52,-4.5 C62,-8 75,-17 88,-16 C98,-15 101,-6 100,0 C101,6 98,15 88,16 C75,17 62,8 52,4.5 Z" fill="#E9C26E" stroke="#5B2415" stroke-width="1.6" stroke-linejoin="round"/><path d="M60,-9 C75,-12 90,-12 97,-7 M58,-5 C75,-8 92,-8 98,-3 M58,-1 L99,-1 M58,3 C75,5 92,5 98,3 M60,7 C75,9 90,10 96,7" fill="none" stroke="#C99A45" stroke-width=".45" opacity=".6"/><path d="M52,-4.5 C58,-6.5 66,-11 74,-14.2 C78,-11 77,-6 72,-3.5 C68,-1.5 66,3 69,6.5 C63,6 56,5.2 52,4.5 Z" fill="#5B2415"/><path d="M56,-3 C60,-6 63,-5.5 65,-9 M62,-1.5 C66,-3.5 70,-3 72,-8 M58,2.5 C62,3 64,2 65,4.5" fill="none" stroke="#F0C96A" stroke-width="1.1" stroke-linecap="round"/><ellipse cx="73.5" cy="1" rx="2.3" ry="1.7" fill="#2A1008"/><rect x="85" y="-2.2" width="2.6" height="4.4" rx=".6" fill="#FFF6DD" stroke="#D9C79A" stroke-width=".3"/><path d="M93.5,3 C93,0 96,-1.6 99,0.6 C100,3 98.4,5.6 95.5,5.6 C94,5.4 93.6,4.2 93.5,3 Z" fill="#5B2415" stroke="#F0C96A" stroke-width=".5"/><circle cx="100.2" cy="0.4" r="1.2" fill="#E96A8C"/></g><rect x="8" y="-2.3" width="52" height="4.6" rx="1" fill="#4A1C12"/><g stroke="#F4EBD6" stroke-width=".5"><line x1="15" y1="-2.3" x2="15" y2="2.3"/><line x1="20" y1="-2.3" x2="20" y2="2.3"/><line x1="25" y1="-2.3" x2="25" y2="2.3"/><line x1="29.6" y1="-2.3" x2="29.6" y2="2.3"/><line x1="34" y1="-2.3" x2="34" y2="2.3"/><line x1="38" y1="-2.3" x2="38" y2="2.3"/><line x1="42" y1="-2.3" x2="42" y2="2.3"/><line x1="45.7" y1="-2.3" x2="45.7" y2="2.3"/><line x1="49.2" y1="-2.3" x2="49.2" y2="2.3"/><line x1="52.5" y1="-2.3" x2="52.5" y2="2.3"/></g><path d="M0,-.8 C-.8,-2.6 1,-3.8 3,-3 C5,-2.5 7.5,-2.6 9.6,-2.3 L9.6,2.3 C7.5,2.6 5,2.5 3,3 C1,3.8 -.8,2.6 0,.8 Z" fill="#4A1C12"/><circle cx="2.6" cy="-3.9" r="1.1" fill="#E96A8C"/><circle cx="5.2" cy="4.0" r="1.1" fill="#E96A8C"/><line x1="9" y1="-.8" x2="86" y2="-.8" stroke="#F4EBD6" stroke-width=".42"/><line x1="9" y1=".8" x2="86" y2=".8" stroke="#F4EBD6" stroke-width=".42"/></g></svg>';
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
