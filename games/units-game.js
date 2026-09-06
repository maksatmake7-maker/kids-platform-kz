/* ===== Білім Аралы — игра "Единицы измерения" =====
   Математика, 2 класс, по программе (приложение 26, 1-я четверть):
   2.1.3.3 "сравнивать значения величин длины см, дм, м... и выполнять
   действия сложения/вычитания";
   2.1.3.4 "преобразовывать единицы измерения длины см, дм, м на
   основе соотношений между ними".
   Соотношения: 1 м = 10 дм, 1 дм = 10 см, 1 м = 100 см.
   Показываем значение в одной единице, просим перевести в другую.
   24 вопроса, процедурная генерация с гарантией целых чисел.
   Использование: initUnitsGame('game-root') после загрузки DOM.
*/
function initUnitsGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var TOTAL = 24;
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

  function generateQuestion(m){
    var patterns = [
      // м -> дм (умножение на 10)
      function(){
        var n = Math.floor(Math.random()*8)+1; // 1..8
        return { text: n + ' ' + m.unit_m + ' = ? ' + m.unit_dm, answer: n*10 };
      },
      // дм -> м (деление на 10, только кратные)
      function(){
        var n = (Math.floor(Math.random()*8)+1)*10; // 10,20..80
        return { text: n + ' ' + m.unit_dm + ' = ? ' + m.unit_m, answer: n/10 };
      },
      // дм -> см (умножение на 10)
      function(){
        var n = Math.floor(Math.random()*9)+1; // 1..9
        return { text: n + ' ' + m.unit_dm + ' = ? ' + m.unit_cm, answer: n*10 };
      },
      // см -> дм (деление на 10, только кратные)
      function(){
        var n = (Math.floor(Math.random()*9)+1)*10; // 10..90
        return { text: n + ' ' + m.unit_cm + ' = ? ' + m.unit_dm, answer: n/10 };
      },
      // м -> см (умножение на 100)
      function(){
        var n = Math.floor(Math.random()*5)+1; // 1..5
        return { text: n + ' ' + m.unit_m + ' = ? ' + m.unit_cm, answer: n*100 };
      }
    ];
    var pattern = patterns[Math.floor(Math.random()*patterns.length)];
    return pattern();
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var m = msgs();
    var q = generateQuestion(m);
    currentAnswer = q.answer;

    var options = [currentAnswer];
    while(options.length < 4){
      var delta = Math.max(1, Math.round(currentAnswer * 0.2)) * (Math.random() < 0.5 ? 1 : -1);
      var candidate = currentAnswer + delta * (Math.floor(Math.random()*3)+1);
      if(candidate > 0 && options.indexOf(candidate) === -1){
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
      '<div class="alphabet-pair"><span class="alphabet-letter" style="font-size:1.6rem;">' + q.text + '</span></div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'),10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('units', score, TOTAL);
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
