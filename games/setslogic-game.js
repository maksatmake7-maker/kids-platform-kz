/* ===== Білім Аралы — игра "Верно или неверно?" (множества, 2 класс) =====
   Математика, 2 класс, по программе (приложение 26, 2-я четверть):
   2.4.1.2 "составлять и классифицировать (разбивать) числовые
   множества по количеству цифр в записи чисел, делимости числа на 2,
   месту, занимаемому в числовой последовательности";
   2.4.2.1 "определять истинность и ложность утверждений, составлять
   истинные и ложные утверждения".
   Показываем утверждение о числе (делимость на 2, количество цифр,
   сравнение) — ребёнок отвечает "Верно" или "Неверно" (в отличие от
   игры "Дурыс па, бұрыс па?" 1 класса — здесь про множества/разряды,
   а не про равенства).
   24 вопроса, три вида утверждений вперемешку.
   Использование: initSetsLogicGame('game-root') после загрузки DOM.
*/
function initSetsLogicGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var TOTAL = 24;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = false;

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

  function generateStatement(m){
    var type = Math.floor(Math.random()*3);

    if(type === 0){
      // делимость на 2
      var n = Math.floor(Math.random()*90)+10;
      var isEven = (n % 2 === 0);
      var claimEven = Math.random() < 0.5;
      var text = n + ' ' + (claimEven ? m.setslogic_divisible2 : m.setslogic_not_divisible2);
      return { text: text, answer: claimEven ? isEven : !isEven };
    } else if(type === 1){
      // количество цифр (однозначное/двузначное/трёхзначное)
      var pool = [
        Math.floor(Math.random()*9)+1,      // 1..9 — однозначное
        Math.floor(Math.random()*90)+10,    // 10..99 — двузначное
        Math.floor(Math.random()*900)+100   // 100..999 — трёхзначное
      ];
      var n2 = pool[Math.floor(Math.random()*3)];
      var digitCount = String(n2).length;
      var claims = [
        { key: 'setslogic_onedigit', count: 1 },
        { key: 'setslogic_twodigit', count: 2 },
        { key: 'setslogic_threedigit', count: 3 }
      ];
      var claim = claims[Math.floor(Math.random()*3)];
      var text = n2 + ' — ' + m[claim.key];
      return { text: text, answer: digitCount === claim.count };
    } else {
      // сравнение
      var a = Math.floor(Math.random()*90)+10;
      var b = Math.floor(Math.random()*90)+10;
      var claimGreater = Math.random() < 0.5;
      var text = a + ' ' + (claimGreater ? m.setslogic_greater : m.setslogic_less) + ' ' + b;
      var actual = claimGreater ? (a > b) : (a < b);
      return { text: text, answer: actual };
    }
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var m = msgs();
    var st = generateStatement(m);
    currentAnswer = st.answer;

    root.innerHTML =
      '<div style="font-family:\'Nunito\',sans-serif; font-size:1.3rem; font-weight:800; color:var(--ink); margin-bottom:24px;">' + st.text + '</div>' +
      '<div class="count-options">' +
        '<button class="count-btn" data-value="true">' + (m.setslogic_true || 'True') + ' ✓</button>' +
        '<button class="count-btn" data-value="false">' + (m.setslogic_false || 'False') + ' ✗</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value') === 'true', btn); });
    });
  }

  function renderFinish(){
    recordGameResult('setslogic', score, TOTAL);
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
