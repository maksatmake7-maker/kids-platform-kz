/* ===== Білім Аралы — игра "Найди сторону" =====
   Математика, 2 класс, по программе (приложение 26, 4-я четверть):
   2.3.1.4 "находить неизвестную сторону фигуры по периметру и
   известным сторонам";
   2.5.1.5 "анализировать и решать задачи на нахождение стороны и
   периметра прямоугольника (квадрата)".
   Обратная задача к игре "Периметр": дан периметр и часть сторон,
   нужно найти недостающую сторону. Квадрат: сторона = Р÷4.
   Прямоугольник: неизвестная сторона = Р÷2 − известная сторона.
   24 вопроса.
   Использование: initFindSideGame('game-root') после загрузки DOM.
*/
function initFindSideGame(containerId){
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

  function squareSvg(p){
    return '<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" style="width:180px;height:140px;">' +
      '<rect x="50" y="20" width="100" height="100" fill="#FFF9EE" stroke="#1D3557" stroke-width="4"/>' +
      '<text x="100" y="75" text-anchor="middle" font-size="16" fill="#FF6B5B" font-weight="bold">?</text>' +
      '</svg>';
  }
  function rectSvg(known, isTop){
    var w=160, h=90;
    var knownLabel = isTop ?
      '<text x="'+(30+w/2)+'" y="14" text-anchor="middle" font-size="16" fill="#1D3557" font-weight="bold">'+known+'</text>' +
      '<text x="20" y="'+(20+h/2+5)+'" text-anchor="middle" font-size="18" fill="#FF6B5B" font-weight="bold">?</text>'
      :
      '<text x="'+(30+w/2)+'" y="14" text-anchor="middle" font-size="18" fill="#FF6B5B" font-weight="bold">?</text>' +
      '<text x="20" y="'+(20+h/2+5)+'" text-anchor="middle" font-size="16" fill="#1D3557" font-weight="bold">'+known+'</text>';
    return '<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" style="width:200px;height:140px;">' +
      '<rect x="30" y="20" width="'+w+'" height="'+h+'" fill="#FFF9EE" stroke="#1D3557" stroke-width="4"/>' +
      knownLabel +
      '</svg>';
  }

  function pickProblem(m){
    var type = Math.floor(Math.random()*2);
    if(type === 0){
      // квадрат: периметр кратен 4
      var side = Math.floor(Math.random()*10)+3;
      var p = side*4;
      return {
        svg: squareSvg(p),
        text: (m.findside_perimeter_label || 'Perimeter') + ' = ' + p,
        answer: side
      };
    } else {
      // прямоугольник: известна одна сторона, периметр чётный
      var known = Math.floor(Math.random()*8)+3;
      var unknown = Math.floor(Math.random()*8)+3;
      var p = (known+unknown)*2;
      var isTop = Math.random() < 0.5;
      return {
        svg: rectSvg(known, isTop),
        text: (m.findside_perimeter_label || 'Perimeter') + ' = ' + p,
        answer: unknown
      };
    }
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var m = msgs();
    var problem = pickProblem(m);
    currentAnswer = problem.answer;

    var options = [currentAnswer];
    while(options.length < 4){
      var delta = [-3,-2,-1,1,2,3][Math.floor(Math.random()*6)];
      var candidate = currentAnswer + delta;
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
      '<div style="font-family:\'Nunito\',sans-serif; font-weight:800; font-size:1.1rem; color:var(--ink); margin-bottom:10px;">' + problem.text + '</div>' +
      '<div style="display:flex; justify-content:center; margin-bottom:16px;">' + problem.svg + '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'),10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('findside', score, TOTAL);
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
