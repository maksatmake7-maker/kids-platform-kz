/* ===== Білім Аралы — игра "Сколько слогов?" =====
   Ребёнку показывают слово (разбитое дефисами на слоги) с картинкой,
   он выбирает правильное количество слогов среди 4 вариантов.
   Сессия = ровно один проход по набору слов (без повторов).
   Использование: initSyllableGame('game-root') после загрузки DOM.
*/
function initSyllableGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [слово с дефисами, число слогов, эмодзи]
  var WORDS = [
    ['ДОМ', 1, '🏠'],
    ['КОТ', 1, '🐱'],
    ['СЫР', 1, '🧀'],
    ['ЛЕВ', 1, '🦁'],
    ['РЫ-БА', 2, '🐟'],
    ['ЛИ-СА', 2, '🦊'],
    ['ПТИ-ЦА', 2, '🐦'],
    ['КНИ-ГА', 2, '📖'],
    ['МА-ШИ-НА', 3, '🚗'],
    ['СО-БА-КА', 3, '🐕'],
    ['ЯБ-ЛО-КО', 3, '🍎'],
    ['КО-РО-ВА', 3, '🐄'],
    ['КРО-КО-ДИЛ', 3, '🐊'],
    ['ВЕ-ЛО-СИ-ПЕД', 4, '🚲'],
    ['ПО-МИ-ДО-РЫ', 4, '🍅']
  ];

  var TOTAL = WORDS.length;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = 0;

  var queue = [];
  function buildQueue(){
    queue = WORDS.slice();
    for(var i=queue.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = queue[i]; queue[i]=queue[j]; queue[j]=tmp;
    }
  }
  function nextEntry(){ return queue.pop(); }

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

    var entry = nextEntry();
    var word = entry[0], count = entry[1], emoji = entry[2];
    currentAnswer = count;

    // Безопасная генерация вариантов без циклов и риска зависания:
    // берём все теоретически возможные соседние числа (1..5 слогов),
    // исключаем правильный ответ, перемешиваем, берём первые 3.
    var pool = [1,2,3,4,5].filter(function(n){ return n !== count; });
    for(var p=pool.length-1; p>0; p--){
      var q = Math.floor(Math.random()*(p+1));
      var tp = pool[p]; pool[p]=pool[q]; pool[q]=tp;
    }
    var options = [count].concat(pool.slice(0,3));
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(n){
      return '<button class="count-btn" data-value="' + n + '">' + n + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="word-emoji">' + emoji + '</div>' +
      '<div class="syllable-word">' + word + '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'), 10), btn); });
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

  function renderFinish(){
    recordGameResult('syllable', score, TOTAL);
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

  buildQueue();
  render();
}
