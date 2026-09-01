/* ===== Білім Аралы — игра "Десятки" =====
   Математика, 1 класс, по программе (приложение 26, 2-я четверть):
   1.1.1.4 "образовывать укрупненную единицу счета десяток, считать
   десятками до 100, записывать, сравнивать" +
   1.4.3.1 "составлять последовательность десятков до 100, определять
   закономерность в последовательности... чисел в пределах 100".
   Показываем последовательность круглых десятков с пропуском,
   ребёнок находит недостающее число (10, 20, __, 40, 50).
   Процедурная генерация — вариантов практически бесконечно,
   как в счёте/сложении/вычитании/сравнении.
   Сессия = 30 вопросов подряд.
   Использование: initTensGame('game-root') после загрузки DOM.
*/
function initTensGame(containerId){
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

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    // последовательность из 4 круглых десятков подряд, начиная с 10..60
    var start = 10 * (1 + Math.floor(Math.random()*6)); // 10..60
    var seq = [start, start+10, start+20, start+30];
    var missingIdx = Math.floor(Math.random()*4);
    currentAnswer = seq[missingIdx];

    var seqHtml = seq.map(function(n, i){
      return i === missingIdx
        ? '<span class="seq-blank">?</span>'
        : '<span class="seq-num">' + n + '</span>';
    }).join('<span class="seq-arrow">→</span>');

    var options = [currentAnswer];
    while(options.length < 4){
      var offset = (Math.floor(Math.random()*7)-3) * 10; // -30..+30, кратно 10
      var candidate = currentAnswer + offset;
      if(offset !== 0 && candidate >= 10 && candidate <= 100 && options.indexOf(candidate) === -1){
        options.push(candidate);
      }
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(n){
      return '<button class="count-btn" data-value="' + n + '">' + n + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="tens-sequence">' + seqHtml + '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'), 10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('tens', score, TOTAL);
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
