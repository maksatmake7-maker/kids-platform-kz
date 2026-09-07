/* ===== Білім Аралы — игра "Повороты" =====
   Математика, 2 класс, по программе (приложение 26, 4-я четверть):
   2.3.2.4 "выполнять действия по инструкции и определять исходную
   позицию, направление и движение (направо, налево, прямо, полный
   поворот, половина и четверть поворота по часовой и против часовой
   стрелки)".
   Барыс всегда начинает смотреть вверх (↑). Показываем инструкцию
   поворота, просим выбрать, куда он будет смотреть после поворота.
   24 вопроса, 4 типа поворотов вперемешку.
   Использование: initTurnsGame('game-root') после загрузки DOM.
*/
function initTurnsGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var TOTAL = 24;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

  // порядок по часовой стрелке от "вверх"
  var CLOCKWISE = ['up','right','down','left'];

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
  function arrowFor(dir){
    if(dir === 'up') return '↑';
    if(dir === 'down') return '↓';
    if(dir === 'left') return '←';
    return '→';
  }
  function rotate(steps){
    // steps: количество четвертей по часовой стрелке (может быть отрицательным)
    var idx = ((CLOCKWISE.indexOf('up') + steps) % 4 + 4) % 4;
    return CLOCKWISE[idx];
  }

  var TURN_TYPES = [
    { key: 'turn_quarter_cw', steps: 1 },
    { key: 'turn_quarter_ccw', steps: -1 },
    { key: 'turn_half', steps: 2 },
    { key: 'turn_full', steps: 4 }
  ];

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var m = msgs();
    var turn = TURN_TYPES[Math.floor(Math.random()*TURN_TYPES.length)];
    var resultDir = rotate(turn.steps);
    currentAnswer = resultDir;

    var allDirs = ['up','down','left','right'];
    var optionsHtml = allDirs.map(function(d){
      return '<button class="count-btn" data-value="' + d + '" style="font-size:2rem;">' + arrowFor(d) + '</button>';
    }).join('');

    root.innerHTML =
      '<div style="font-size:3rem; margin-bottom:8px;">↑</div>' +
      '<div style="font-family:\'Nunito\',sans-serif; font-weight:700; font-size:1.1rem; color:var(--ink); margin-bottom:20px;">' + (m[turn.key] || turn.key) + '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('turns', score, TOTAL);
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
