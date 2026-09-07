/* ===== Білім Аралы — игра "Деление" =====
   Математика, 2 класс, по программе (приложение 26, 3-я четверть):
   2.1.2.4 "составлять, знать и применять таблицу умножения и деления
   на 2, 3, 4, 5";
   2.1.2.2 "понимать, что умножение и деление – взаимообратные
   действия".
   Делитель всегда 2, 3, 4 или 5; частное — от 1 до 10 (обратная
   операция к таблице умножения). 30 вопросов, без повторов.
   Использование: initDivideGame('game-root') после загрузки DOM.
*/
function initDivideGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var TOTAL = 30;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = 0;
  var usedPairs = [];

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

  function pickPair(){
    var attempts = 0;
    while(attempts < 200){
      attempts++;
      var divisor = [2,3,4,5][Math.floor(Math.random()*4)];
      var quotient = Math.floor(Math.random()*10)+1;
      var key = divisor+'/'+quotient;
      if(usedPairs.indexOf(key) === -1){
        usedPairs.push(key);
        return [divisor, quotient];
      }
    }
    return [2, Math.floor(Math.random()*10)+1];
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var pair = pickPair();
    var divisor = pair[0], quotient = pair[1];
    var dividend = divisor * quotient;
    currentAnswer = quotient;
    var m = msgs();

    var options = [currentAnswer];
    while(options.length < 4){
      var delta = [1,-1,2,-2][Math.floor(Math.random()*4)];
      var candidate = currentAnswer + delta;
      if(candidate > 0 && candidate <= 10 && options.indexOf(candidate) === -1){
        options.push(candidate);
      }
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(o){
      return '<button class="count-btn" data-value="' + o + '">' + o + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="alphabet-pair"><span class="alphabet-letter">' + dividend + ' ÷ ' + divisor + ' =</span></div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'),10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('divide', score, TOTAL);
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
      usedPairs = [];
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
