/* ===== Білім Аралы — игра "Гласная или согласная" =====
   Ребёнку показывают букву, он определяет её тип: гласная или согласная.
   Сессия = ровно один проход по набору букв (без повторов).
   Использование: initVowelGame('game-root') после загрузки DOM.
*/
function initVowelGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var VOWELS = ['А','Е','Ё','И','О','У','Ы','Э','Ю','Я'];
  var CONSONANTS = ['Б','В','Г','Д','К','Л','М','Н','Р','С'];
  var ITEMS = VOWELS.map(function(l){ return [l, true]; })
    .concat(CONSONANTS.map(function(l){ return [l, false]; }));

  var TOTAL = ITEMS.length;
  var score = 0;
  var questionIndex = 0;
  var currentIsVowel = false;

  var queue = [];
  function buildQueue(){
    queue = ITEMS.slice();
    for(var i=queue.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = queue[i]; queue[i]=queue[j]; queue[j]=tmp;
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
    var letter = item[0];
    currentIsVowel = item[1];
    var m = msgs();

    root.innerHTML =
      '<div class="letter-target">' + letter + '</div>' +
      '<div class="count-options vowel-options">' +
        '<button class="count-btn" data-value="vowel">' + (m.btn_vowel || 'Vowel') + '</button>' +
        '<button class="count-btn" data-value="consonant">' + (m.btn_consonant || 'Consonant') + '</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function checkAnswer(value, btn){
    var feedback = document.getElementById('count-feedback');
    var m = msgs();
    var correct = (value === 'vowel') === currentIsVowel;

    if(correct){
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
