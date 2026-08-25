/* ===== Білім Аралы — игра "Особые буквы" =====
   Казахский язык, 1 класс, по программе (приложение 11, цель 1.2.6.1 / 1.4.5.1):
   ребёнку показывают одну из 8 специфических казахских букв
   (ә, ө, ү, ұ, і, ң, қ, ғ — отсутствуют в русском алфавите),
   он находит слово, где эта буква встречается, среди 4 картинок.
   Сессия = ровно один проход по всем буквам (без повторов).
   Использование: initKazLetterGame('game-root') после загрузки DOM.
*/
function initKazLetterGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [буква, слово, эмодзи]
  var WORDS = [
    ['Ә','ӘЖЕ','👵'],
    ['Ө','КӨЛ','🏞️'],
    ['Ү','КҮН','☀️'],
    ['Ұ','ҚҰС','🐦'],
    ['І','КІТАП','📕'],
    ['Ң','ТАҢ','🌅'],
    ['Қ','ҚЫЗ','👧'],
    ['Ғ','АҒАШ','🌳']
  ];

  var TOTAL = WORDS.length;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = null;

  var queue = [];
  function buildQueue(){
    queue = WORDS.slice();
    for(var i=queue.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = queue[i]; queue[i]=queue[j]; queue[j]=tmp;
    }
  }
  function nextWord(){ return queue.pop(); }

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

    currentAnswer = nextWord();

    var options = [currentAnswer];
    var pool = WORDS.filter(function(w){ return w[0] !== currentAnswer[0]; });
    while(options.length < 4 && pool.length > 0){
      var idx = Math.floor(Math.random()*pool.length);
      options.push(pool[idx]);
      pool.splice(idx, 1);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(w){
      return '<button class="letter-btn" data-letter="' + w[0] + '">' +
               '<span class="letter-btn-emoji">' + w[2] + '</span>' +
               '<span class="letter-btn-word">' + w[1] + '</span>' +
             '</button>';
    }).join('');

    root.innerHTML =
      '<div class="letter-target">' + currentAnswer[0] + '</div>' +
      '<div class="letter-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.letter-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-letter'), btn); });
    });
  }

  function renderFinish(){
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

  function checkAnswer(letter, btn){
    var feedback = document.getElementById('count-feedback');
    var m = msgs();

    if(letter === currentAnswer[0]){
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
