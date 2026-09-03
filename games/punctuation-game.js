/* ===== Білім Аралы — игра "Какой знак?" =====
   Обучение грамоте, 1 класс, по программе (приложение 4, 4-я четверть):
   1.3.9.1 "ставить знаки препинания в конце предложения: точка,
   вопросительный, восклицательный знаки".
   Показываем предложение без знака препинания, ребёнок выбирает
   подходящий знак: точка (рассказ), вопросительный (вопрос) или
   восклицательный (восклицание).
   9 предложений (собственного сочинения, простые и понятные для
   1 класса) — минимум 15 вопросов через повтор кругов.
   Использование: initPunctuationGame('game-root') после загрузки DOM.
*/
function initPunctuationGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [предложение без знака, 'period' | 'question' | 'exclaim']
  var SENTENCES = [
    ['Это кот','period'],
    ['На улице снег','period'],
    ['Мама варит суп','period'],
    ['Как тебя зовут','question'],
    ['Где мой мяч','question'],
    ['Сколько тебе лет','question'],
    ['Как красиво','exclaim'],
    ['Ура, каникулы','exclaim'],
    ['Осторожно, машина','exclaim']
  ];

  var MARKS = { period: '.', question: '?', exclaim: '!' };

  var ROUND_SIZE = SENTENCES.length;
  var ROUNDS = Math.ceil(15 / ROUND_SIZE);
  var TOTAL = ROUND_SIZE * ROUNDS;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

  var queue = [];
  function buildQueue(){
    queue = [];
    for(var r=0; r<ROUNDS; r++){
      var pass = SENTENCES.slice();
      for(var i=pass.length-1; i>0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var tmp = pass[i]; pass[i]=pass[j]; pass[j]=tmp;
      }
      queue = queue.concat(pass);
    }
  }
  function nextSentence(){ return queue.pop(); }

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

    var pair = nextSentence();
    currentAnswer = pair[1];
    var m = msgs();

    root.innerHTML =
      '<div class="punct-sentence">' + pair[0] + ' <span class="punct-blank">?</span></div>' +
      '<div class="count-options measure-options">' +
        '<button class="count-btn punct-btn" data-value="period">' + MARKS.period + '</button>' +
        '<button class="count-btn punct-btn" data-value="question">' + MARKS.question + '</button>' +
        '<button class="count-btn punct-btn" data-value="exclaim">' + MARKS.exclaim + '</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('punctuation', score, TOTAL);
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
