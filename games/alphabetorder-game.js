/* ===== Білім Аралы — игра "Что раньше в алфавите?" =====
   Обучение грамоте, 1 класс, по программе (приложение 4, 4-я четверть):
   1.2.7.1 "находить информацию в источниках, используя алфавитный
   порядок расположения текстов (словари, справочники, детские
   энциклопедии)".
   Базовый навык для этого — знание последовательности букв
   алфавита (п.16 базового содержания: "знакомство с русским
   алфавитом как определённой последовательностью букв").
   Показываем две буквы, ребёнок определяет, какая идёт раньше
   в алфавите — как в словаре.
   Процедурная генерация — вопросов практически бесконечно.
   Сессия = 20 вопросов подряд.
   Использование: initAlphabetOrderGame('game-root') после загрузки DOM.
*/
function initAlphabetOrderGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var ALPHABET = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Э','Ю','Я'];

  var TOTAL = 20;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

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

    var i1 = Math.floor(Math.random()*ALPHABET.length);
    var i2;
    do { i2 = Math.floor(Math.random()*ALPHABET.length); } while(i2 === i1);

    var letterA = ALPHABET[i1];
    var letterB = ALPHABET[i2];
    currentAnswer = (i1 < i2) ? letterA : letterB;

    var m = msgs();

    root.innerHTML =
      '<div class="alphabet-pair">' +
        '<span class="alphabet-letter">' + letterA + '</span>' +
        '<span class="alphabet-vs">' + (m.alphabet_or || 'or') + '</span>' +
        '<span class="alphabet-letter">' + letterB + '</span>' +
      '</div>' +
      '<div class="count-options spelling-options">' +
        '<button class="count-btn spelling-btn" data-value="' + letterA + '">' + letterA + '</button>' +
        '<button class="count-btn spelling-btn" data-value="' + letterB + '">' + letterB + '</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('alphabetorder', score, TOTAL);
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

  render();
}
