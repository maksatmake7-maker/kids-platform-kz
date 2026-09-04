/* ===== Білім Аралы — игра "Флаг Казахстана" =====
   Познание мира, 1 класс, по программе (приложение 29, цель 1.3.5.1):
   "отличать государственные символы Республики Казахстан от
   символов других стран".
   Флаги нарисованы собственными SVG (не эмодзи!) — на Windows
   флаги-эмодзи показываются как буквенный код (например, "KZ"),
   а не как картинка, это ограничение шрифтов Windows, а не наша
   ошибка. SVG выглядит одинаково на любом устройстве.
   8 стран: Казахстан + Россия, Франция, Япония, Германия, Турция,
   Китай, Узбекистан — для разнообразия при повторных кругах.
   Сессия = несколько кругов подряд, минимум 15 вопросов.
   Использование: initFlagGame('game-root') после загрузки DOM.
*/
function initFlagGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [SVG флага, 'kazakhstan' | 'other']
  var FLAG_KZ = '<svg viewBox="0 0 160 110"><rect width="160" height="110" fill="#00AFCA"/><rect width="14" height="110" fill="#FFD100"/>' +
    '<circle cx="7" cy="8" r="4" fill="#00AFCA"/><circle cx="7" cy="22" r="4" fill="#00AFCA"/><circle cx="7" cy="36" r="4" fill="#00AFCA"/>' +
    '<circle cx="7" cy="50" r="4" fill="#00AFCA"/><circle cx="7" cy="64" r="4" fill="#00AFCA"/><circle cx="7" cy="78" r="4" fill="#00AFCA"/><circle cx="7" cy="92" r="4" fill="#00AFCA"/>' +
    '<g stroke="#FFD100" stroke-width="2">' +
    '<line x1="85" y1="42" x2="85" y2="16"/><line x1="85" y1="42" x2="103" y2="24"/><line x1="85" y1="42" x2="111" y2="42"/><line x1="85" y1="42" x2="103" y2="60"/>' +
    '<line x1="85" y1="42" x2="85" y2="68"/><line x1="85" y1="42" x2="67" y2="60"/><line x1="85" y1="42" x2="59" y2="42"/><line x1="85" y1="42" x2="67" y2="24"/>' +
    '</g><circle cx="85" cy="42" r="16" fill="#FFD100"/>' +
    '<polygon points="60,75 85,62 110,75 95,70 85,80 75,70" fill="#FFD100"/></svg>';
  var FLAG_RU = '<svg viewBox="0 0 160 110"><rect width="160" height="37" fill="#FFFFFF"/><rect y="37" width="160" height="36" fill="#0039A6"/><rect y="73" width="160" height="37" fill="#D52B1E"/></svg>';
  var FLAG_FR = '<svg viewBox="0 0 160 110"><rect width="53" height="110" fill="#0055A4"/><rect x="53" width="54" height="110" fill="#FFFFFF"/><rect x="107" width="53" height="110" fill="#EF4135"/></svg>';
  var FLAG_JP = '<svg viewBox="0 0 160 110"><rect width="160" height="110" fill="#FFFFFF"/><circle cx="80" cy="55" r="25" fill="#BC002D"/></svg>';
  var FLAG_DE = '<svg viewBox="0 0 160 110"><rect width="160" height="37" fill="#000000"/><rect y="37" width="160" height="36" fill="#DD0000"/><rect y="73" width="160" height="37" fill="#FFCC00"/></svg>';
  var FLAG_TR = '<svg viewBox="0 0 160 110"><rect width="160" height="110" fill="#E30A17"/><circle cx="67" cy="47" r="19" fill="#FFFFFF"/><circle cx="77" cy="47" r="19" fill="#E30A17"/>' +
    starPath(108,47,11,4.3,'#FFFFFF') + '</svg>';
  var FLAG_CN = '<svg viewBox="0 0 160 110"><rect width="160" height="110" fill="#DE2910"/>' +
    starPath(30,28,15,6,'#FFDE00') + starPath(58,10,5.5,2.2,'#FFDE00',20) + starPath(64,24,5.5,2.2,'#FFDE00',0) +
    starPath(60,40,5.5,2.2,'#FFDE00',-20) + starPath(48,44,5.5,2.2,'#FFDE00',-40) + '</svg>';
  var FLAG_UZ = '<svg viewBox="0 0 160 110"><rect width="160" height="34" fill="#1EB53A"/><rect y="34" width="160" height="3" fill="#CE1126"/>' +
    '<rect y="37" width="160" height="36" fill="#FFFFFF"/><rect y="73" width="160" height="3" fill="#CE1126"/><rect y="76" width="160" height="34" fill="#0099B5"/>' +
    '<circle cx="27" cy="19" r="11" fill="#FFFFFF"/><circle cx="32" cy="19" r="11" fill="#0099B5"/>' +
    Array.from({length:12}, function(_,i){ var a=180+i*(180/11); var x=60+30*Math.cos(a*Math.PI/180); var y=19+12*Math.sin(a*Math.PI/180); return starPath(x,y,3.2,1.3,'#FFFFFF'); }).join('') +
    '</svg>';

  function starPath(cx, cy, rOut, rIn, fill, rot){
    rot = rot || -90;
    var pts = [];
    for(var i=0; i<10; i++){
      var r = (i % 2 === 0) ? rOut : rIn;
      var a = (rot + i*36) * Math.PI/180;
      pts.push((cx + r*Math.cos(a)) + ',' + (cy + r*Math.sin(a)));
    }
    return '<polygon points="' + pts.join(' ') + '" fill="' + fill + '"/>';
  }

  var FLAGS = [
    [FLAG_KZ,'kazakhstan'],
    [FLAG_RU,'other'],
    [FLAG_FR,'other'],
    [FLAG_JP,'other'],
    [FLAG_DE,'other'],
    [FLAG_TR,'other'],
    [FLAG_CN,'other'],
    [FLAG_UZ,'other']
  ];

  var ROUND_SIZE = FLAGS.length;
  var ROUNDS = Math.ceil(15 / ROUND_SIZE);
  var TOTAL = ROUND_SIZE * ROUNDS;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

  var queue = [];
  function buildQueue(){
    queue = [];
    for(var r=0; r<ROUNDS; r++){
      var pass = FLAGS.slice();
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
    var item = nextItem();
    currentAnswer = item[1];

    root.innerHTML =
      '<div class="word-emoji">' + item[0] + '</div>' +
      '<div class="count-options word-options">' +
        '<button class="count-btn" data-value="kazakhstan">' + (m.btn_kazakhstan || 'Kazakhstan') + '</button>' +
        '<button class="count-btn" data-value="other">' + (m.btn_other || 'Other country') + '</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('flag_kz', score, TOTAL);
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
