/* ===== Білім Аралы — игра "Сложение и вычитание двузначных чисел" =====
   Математика, 2 класс, по программе (приложение 26, 2-я четверть):
   2.1.2.8 "применять алгоритмы сложения и вычитания двузначных чисел
   в таких случаях, как: 34+23, 57-23, 45±19, 47+33, 80-47, 100-35";
   2.1.2.7 "выполнять устно сложение и вычитание чисел с переходом
   через десяток в случаях вида: 45±9, 40-14".
   В отличие от игры "Сложение с переходом" в 1-й четверти (только
   однозначные числа), здесь оба слагаемых/уменьшаемое — двузначные.
   30 вопросов, процедурная генерация с гарантией результата 0..100.
   Использование: initTwoDigitOpsGame('game-root') после загрузки DOM.
*/
function initTwoDigitOpsGame(containerId){
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

  function generateQuestion(){
    var isAddition = Math.random() < 0.5;
    var a, b, text, value;
    if(isAddition){
      a = Math.floor(Math.random()*80)+10; // 10..89
      b = Math.floor(Math.random()*(100-a-1))+1; // так, чтобы a+b <= 99... но допускаем и 100
      b = Math.min(b, 99);
      value = a+b;
      if(value > 100) value = 100;
      text = a + ' + ' + b;
    } else {
      a = Math.floor(Math.random()*89)+11; // 11..99
      b = Math.floor(Math.random()*a)+1; // 1..a, гарантирует неотрицательный результат
      value = a-b;
      text = a + ' − ' + b;
    }
    return { text: text, value: value };
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var q = generateQuestion();
    currentAnswer = q.value;
    var m = msgs();

    var options = [currentAnswer];
    while(options.length < 4){
      var delta = [-10,-9,-1,1,9,10][Math.floor(Math.random()*6)];
      var candidate = currentAnswer + delta;
      if(candidate >= 0 && candidate <= 100 && options.indexOf(candidate) === -1){
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
      '<div class="alphabet-pair"><span class="alphabet-letter">' + q.text + ' =</span></div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'),10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('twodigitops', score, TOTAL);
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
