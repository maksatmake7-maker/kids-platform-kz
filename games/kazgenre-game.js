/* ===== Білім Аралы — игра "Бұл қандай жанр?" =====
   Казахский язык (как второй), 1 класс, по программе (приложение 11,
   3-я четверть, раздел "Чтение"):
   1.3.3.1 "различать тексты разных жанров (стихотворение, сказка,
   загадка)".
   Показываем описание отличительного признака жанра (собственного
   сочинения на казахском, не отрывок из настоящего текста), ребёнок
   определяет, какой это жанр.
   3 жанра — минимум 15 вопросов через повтор кругов.
   Использование: initKazGenreGame('game-root') после загрузки DOM.
*/
function initKazGenreGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [ключ описания, ключ правильного жанра]
  var ITEMS = [
    ['kazgenre_desc_poem','poem'],
    ['kazgenre_desc_tale','tale'],
    ['kazgenre_desc_riddle','riddle']
  ];

  var ROUND_SIZE = ITEMS.length;
  var ROUNDS = Math.ceil(15 / ROUND_SIZE);
  var TOTAL = ROUND_SIZE * ROUNDS;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

  var queue = [];
  function buildQueue(){
    queue = [];
    for(var r=0; r<ROUNDS; r++){
      var pass = ITEMS.slice();
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

    var item = nextItem();
    currentAnswer = item[1];
    var m = msgs();

    var options = [
      ['poem', m.kazgenre_poem || 'Өлең'],
      ['tale', m.kazgenre_tale || 'Ертегі'],
      ['riddle', m.kazgenre_riddle || 'Жұмбақ']
    ];
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(o){
      return '<button class="count-btn" data-value="' + o[0] + '">' + o[1] + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="punct-sentence">' + (m[item[0]] || item[0]) + '</div>' +
      '<div class="count-options measure-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('kazgenre', score, TOTAL);
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
