/* ===== Білім Аралы — игра "Сөз жуан ба, жіңішке ме?" =====
   Ана тілі, 1 класс, по программе (приложение 2, 4-я четверть):
   1.1.8.1 "правильно произносить слова в соответствии с законом
   сингармонизма" — закон сингармонизма: все гласные в казахском
   слове либо все твёрдые (жуан), либо все мягкие (жіңішке).
   Естественное продолжение игры "Жуан ба, жіңішке ме?" (там
   отдельные буквы, здесь целые слова).
   Слова проверены на однородность гласных:
   жуан: бала, ана, қала, ата (все гласные — а)
   жіңішке: үй, күн, тіл, әже (все гласные — ү/і/ә/е)
   8 слов — минимум 15 вопросов через повтор кругов.
   Использование: initWordHarmonyGame('game-root') после загрузки DOM.
*/
function initWordHarmonyGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [слово, 'zhuan' | 'zhinishke']
  var WORDS = [
    ['бала','zhuan'],
    ['ана','zhuan'],
    ['қала','zhuan'],
    ['ата','zhuan'],
    ['үй','zhinishke'],
    ['күн','zhinishke'],
    ['тіл','zhinishke'],
    ['әже','zhinishke']
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
    currentAnswer = pair[1];
    var m = msgs();

    root.innerHTML =
      '<div class="alphabet-pair"><span class="alphabet-letter">' + pair[0] + '</span></div>' +
      '<div class="count-options">' +
        '<button class="count-btn" data-value="zhuan">' + (m.vowel_zhuan || 'Жуан') + '</button>' +
        '<button class="count-btn" data-value="zhinishke">' + (m.vowel_zhinishke || 'Жіңішке') + '</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('wordharmony', score, TOTAL);
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
