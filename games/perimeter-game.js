/* ===== Білім Аралы — игра "Периметр" =====
   Математика, 2 класс, по программе (приложение 26, 4-я четверть):
   2.3.1.3 "измерять длины сторон многоугольников... составлять,
   применять формулы нахождения периметра Р=(а+b)·2, Р=а·4, Р=а+b+с".
   Рисуем SVG-фигуру (прямоугольник/квадрат/треугольник) с
   подписанными сторонами, просим посчитать периметр.
   24 вопроса, три вида фигур вперемешку.
   Использование: initPerimeterGame('game-root') после загрузки DOM.
*/
function initPerimeterGame(containerId){
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

  function rectSvg(a,b){
    var w=160, h=90;
    return '<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" style="width:200px;height:140px;">' +
      '<rect x="30" y="20" width="'+w+'" height="'+h+'" fill="#FFF9EE" stroke="#1D3557" stroke-width="4"/>' +
      '<text x="'+(30+w/2)+'" y="14" text-anchor="middle" font-size="16" fill="#1D3557" font-weight="bold">'+a+'</text>' +
      '<text x="'+(30+w/2)+'" y="'+(20+h+18)+'" text-anchor="middle" font-size="16" fill="#1D3557" font-weight="bold">'+a+'</text>' +
      '<text x="20" y="'+(20+h/2+5)+'" text-anchor="middle" font-size="16" fill="#1D3557" font-weight="bold">'+b+'</text>' +
      '<text x="'+(30+w+15)+'" y="'+(20+h/2+5)+'" text-anchor="middle" font-size="16" fill="#1D3557" font-weight="bold">'+b+'</text>' +
      '</svg>';
  }
  function squareSvg(a){
    var s=100;
    return '<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" style="width:180px;height:140px;">' +
      '<rect x="50" y="20" width="'+s+'" height="'+s+'" fill="#FFF9EE" stroke="#1D3557" stroke-width="4"/>' +
      '<text x="'+(50+s/2)+'" y="14" text-anchor="middle" font-size="16" fill="#1D3557" font-weight="bold">'+a+'</text>' +
      '<text x="40" y="'+(20+s/2+5)+'" text-anchor="middle" font-size="16" fill="#1D3557" font-weight="bold">'+a+'</text>' +
      '</svg>';
  }
  function triangleSvg(a,b,c){
    return '<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" style="width:180px;height:140px;">' +
      '<polygon points="100,20 30,120 170,120" fill="#FFF9EE" stroke="#1D3557" stroke-width="4"/>' +
      '<text x="60" y="65" text-anchor="middle" font-size="15" fill="#1D3557" font-weight="bold">'+a+'</text>' +
      '<text x="140" y="65" text-anchor="middle" font-size="15" fill="#1D3557" font-weight="bold">'+b+'</text>' +
      '<text x="100" y="135" text-anchor="middle" font-size="15" fill="#1D3557" font-weight="bold">'+c+'</text>' +
      '</svg>';
  }

  function pickShape(){
    var type = Math.floor(Math.random()*3);
    if(type === 0){
      var a = Math.floor(Math.random()*10)+3, b = Math.floor(Math.random()*10)+3;
      return { svg: rectSvg(a,b), perimeter: (a+b)*2 };
    } else if(type === 1){
      var s = Math.floor(Math.random()*10)+3;
      return { svg: squareSvg(s), perimeter: s*4 };
    } else {
      var x = Math.floor(Math.random()*8)+3, y = Math.floor(Math.random()*8)+3, z = Math.floor(Math.random()*8)+3;
      return { svg: triangleSvg(x,y,z), perimeter: x+y+z };
    }
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var shape = pickShape();
    currentAnswer = shape.perimeter;
    var m = msgs();

    var options = [currentAnswer];
    while(options.length < 4){
      var delta = [-4,-3,-2,2,3,4][Math.floor(Math.random()*6)];
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
      '<div style="display:flex; justify-content:center; margin-bottom:16px;">' + shape.svg + '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'),10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('perimeter', score, TOTAL);
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
