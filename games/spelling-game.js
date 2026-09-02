/* ===== Білім Аралы — игра "Как правильно?" =====
   Обучение грамоте, 1 класс, по программе (приложение 4, 4-я четверть):
   1.3.7.2 "применять правила правописания: жи-ши/ча-ща/чу-щу/-чк-,
   -чн-/-нщ-, -шн-".
   Честная оговорка: чу-щу и -чк-/-чн- пока не включены — не нашлось
   достаточно простых, однозначно понятных ребёнку слов для этих
   сочетаний. Взяты только жи-ши (всегда И) и ча-ща (всегда А) —
   с простыми, конкретными словами.
   Показываем слово с выбором буквы, ребёнок выбирает правильное
   написание.
   7 слов — минимум 15 вопросов через повтор кругов.
   Использование: initSpellingGame('game-root') после загрузки DOM.
*/
function initSpellingGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [правильное написание, неправильное написание]
  var WORDS = [
    ['лыжи','лыжы'],
    ['уши','ушы'],
    ['мыши','мышы'],
    ['ежи','ежы'],
    ['чашка','чяшка'],
    ['туча','тюча'],
    ['свеча','свечя']
  ];

  var ROUND_SIZE = WORDS.length;
  var ROUNDS = Math.ceil(15 / ROUND_SIZE);
  var TOTAL = ROUND_SIZE * ROUNDS;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

  var queue = [];
  function buildQueue(){
    queue = [];
    for(var r=0; r<ROUNDS; r++){
      var pass = WORDS.slice();
      for(var i=pass.length-1; i>0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var tmp = pass[i]; pass[i]=pass[j]; pass[j]=tmp;
      }
      queue = queue.concat(pass);
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

    var pair = nextWord();
    currentAnswer = pair[0];
    var options = Math.random() < 0.5 ? [pair[0], pair[1]] : [pair[1], pair[0]];

    var optionsHtml = options.map(function(w){
      return '<button class="count-btn spelling-btn" data-value="' + w + '">' + w + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="count-options spelling-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('spelling', score, TOTAL);
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
