/* ===== Білім Аралы — игра "Порядок действий" =====
   Математика, 2 класс, по программе (приложение 26, 1-я четверть):
   2.2.1.6 "находить значения выражений со скобками и без скобок,
   содержащих два, три арифметических действия, и определять порядок
   действий".
   Показываем выражение вида (a+b)-c или a-(b+c) и т.п. — скобки
   меняют порядок действий, это ключевая идея цели обучения.
   Процедурная генерация с проверкой, что все промежуточные и итоговые
   значения неотрицательны. 24 вопроса.
   Использование: initOrderOpsGame('game-root') после загрузки DOM.
*/
function initOrderOpsGame(containerId){
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

  function generateExpression(){
    var attempts = 0;
    while(attempts < 200){
      attempts++;
      var a = Math.floor(Math.random()*15)+2;
      var b = Math.floor(Math.random()*15)+2;
      var c = Math.floor(Math.random()*15)+2;
      var pattern = Math.floor(Math.random()*4);
      var text, value;

      if(pattern === 0){ // (a+b)-c
        value = (a+b)-c;
        if(value < 0 || value > 60) continue;
        text = '(' + a + ' + ' + b + ') − ' + c;
      } else if(pattern === 1){ // (a-b)+c, требует a>=b
        if(a < b) continue;
        value = (a-b)+c;
        if(value < 0 || value > 60) continue;
        text = '(' + a + ' − ' + b + ') + ' + c;
      } else if(pattern === 2){ // a-(b+c)
        value = a-(b+c);
        if(value < 0 || value > 60) continue;
        text = a + ' − (' + b + ' + ' + c + ')';
      } else { // a+(b-c), требует b>=c
        if(b < c) continue;
        value = a+(b-c);
        if(value < 0 || value > 60) continue;
        text = a + ' + (' + b + ' − ' + c + ')';
      }
      return { text: text, value: value };
    }
    // запасной вариант, если за 200 попыток не подобрали (крайне маловероятно)
    return { text: '(10 + 5) − 3', value: 12 };
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var expr = generateExpression();
    currentAnswer = expr.value;
    var m = msgs();

    var options = [currentAnswer];
    while(options.length < 4){
      var delta = [-3,-2,-1,1,2,3][Math.floor(Math.random()*6)];
      var candidate = currentAnswer + delta;
      if(candidate >= 0 && options.indexOf(candidate) === -1){
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
      '<div class="alphabet-pair"><span class="alphabet-letter" style="font-size:1.6rem;">' + expr.text + ' =</span></div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'),10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('orderops', score, TOTAL);
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
