/* ===== Білім Аралы — игра "Сложение с переходом" =====
   Математика, 2 класс, по программе (приложение 26, 1-я четверть):
   2.1.2.4 "составлять, знать и применять таблицу сложения однозначных
   чисел с переходом через десяток";
   2.1.2.5 "выполнять устно сложение и вычитание однозначных чисел
   с переходом через десяток".
   Складываем только такие пары однозначных чисел, где сумма больше 10
   (значит, есть "переход через десяток") — это ключевое отличие от
   игры "Сложи и узнай" в 1 классе, где переход не требовался.
   30 вопросов, процедурная генерация.
   Использование: initCarryAddGame('game-root') после загрузки DOM.
*/
function initCarryAddGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var TOTAL = 30;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = 0;

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
    // ищем a,b от 2 до 9, где a+b > 10 (переход через десяток) и a+b <= 18
    var a, b;
    do {
      a = Math.floor(Math.random() * 8) + 2; // 2..9
      b = Math.floor(Math.random() * 8) + 2; // 2..9
    } while(a + b <= 10);
    return [a, b];
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var pair = pickPair();
    currentAnswer = pair[0] + pair[1];
    var m = msgs();

    var options = [currentAnswer];
    while(options.length < 4){
      var delta = [-2,-1,1,2][Math.floor(Math.random()*4)];
      var candidate = currentAnswer + delta;
      if(candidate > 3 && candidate < 19 && options.indexOf(candidate) === -1){
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
      '<div class="alphabet-pair"><span class="alphabet-letter">' + pair[0] + ' + ' + pair[1] + ' =</span></div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'),10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('carryadd', score, TOTAL);
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
