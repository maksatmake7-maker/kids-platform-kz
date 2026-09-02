/* ===== Білім Аралы — игра "Сравни множества" =====
   Математика, 1 класс, по программе (приложение 26, 4-я четверть):
   1.4.1.x — сравнение множеств предметов (больше, меньше, поровну),
   в том числе понятие "пустое множество".
   Показываем две группы предметов, ребёнок определяет: в какой
   группе больше, в какой меньше, или предметов поровну.
   Процедурная генерация — вопросов практически бесконечно, как
   в счёте/сложении.
   Сессия = 20 вопросов подряд.
   Использование: initSetsGame('game-root') после загрузки DOM.
*/
function initSetsGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var EMOJIS = ['🍎','⭐','🎈','🐟','🌸','🦋','🍓','🌟','🐝','🍒'];
  var TOTAL = 20;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

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

  function groupHtml(n, emoji){
    var items = '';
    for(var i=0; i<n; i++){ items += '<span class="sets-item">' + emoji + '</span>'; }
    return '<div class="sets-group">' + items + '</div>';
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var a = 1 + Math.floor(Math.random()*7); // 1..7
    var b;
    // примерно в трети случаев делаем равные множества
    if(Math.random() < 0.3){
      b = a;
    } else {
      do { b = 1 + Math.floor(Math.random()*7); } while(b === a);
    }
    var emojiA = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];
    var emojiB = EMOJIS[Math.floor(Math.random()*EMOJIS.length)];

    if(a > b) currentAnswer = 'a';
    else if(b > a) currentAnswer = 'b';
    else currentAnswer = 'equal';

    var m = msgs();

    root.innerHTML =
      '<div class="sets-wrap">' +
        groupHtml(a, emojiA) +
        '<div class="sets-vs">?</div>' +
        groupHtml(b, emojiB) +
      '</div>' +
      '<div class="count-options sets-options">' +
        '<button class="count-btn" data-value="a">' + (m.sets_a_more || 'Left has more') + '</button>' +
        '<button class="count-btn" data-value="equal">' + (m.sets_equal || 'Equal') + '</button>' +
        '<button class="count-btn" data-value="b">' + (m.sets_b_more || 'Right has more') + '</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('sets', score, TOTAL);
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
