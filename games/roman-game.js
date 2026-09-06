/* ===== Білім Аралы — игра "Римские цифры" =====
   Математика, 2 класс, по программе (приложение 26, 2-я четверть):
   2.1.1.3 "читать, записывать и использовать римскую нумерацию
   чисел до 12".
   Показываем либо арабское число (1-12) — выбери римское, либо
   римское число — выбери арабское (чередуется случайно).
   24 вопроса (по 2 раза на каждое число от 1 до 12).
   Использование: initRomanGame('game-root') после загрузки DOM.
*/
function initRomanGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'];
  var TOTAL = 24;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';
  var order = [];

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
  function shuffle(arr){
    for(var i=arr.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var t = arr[i]; arr[i]=arr[j]; arr[j]=t;
    }
    return arr;
  }

  function render(){
    if(questionIndex === 0){
      // 12 чисел × 2 направления = 24 вопроса, перемешанные
      var pairs = [];
      for(var n=1; n<=12; n++){
        pairs.push({ n: n, toRoman: true });
        pairs.push({ n: n, toRoman: false });
      }
      order = shuffle(pairs);
    }
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var q = order[questionIndex-1];
    var m = msgs();
    var displayText, options;

    if(q.toRoman){
      currentAnswer = ROMAN[q.n-1];
      displayText = String(q.n);
      var opts = [currentAnswer];
      while(opts.length < 4){
        var idx = Math.floor(Math.random()*12);
        if(ROMAN[idx] !== currentAnswer && opts.indexOf(ROMAN[idx]) === -1) opts.push(ROMAN[idx]);
      }
      options = opts;
    } else {
      currentAnswer = String(q.n);
      displayText = ROMAN[q.n-1];
      var opts2 = [currentAnswer];
      while(opts2.length < 4){
        var cand = Math.floor(Math.random()*12)+1;
        if(String(cand) !== currentAnswer && opts2.indexOf(String(cand)) === -1) opts2.push(String(cand));
      }
      options = opts2;
    }

    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(o){
      return '<button class="count-btn" data-value="' + o + '">' + o + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="alphabet-pair"><span class="alphabet-letter" style="font-size:2.4rem;">' + displayText + '</span></div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('roman', score, TOTAL);
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
