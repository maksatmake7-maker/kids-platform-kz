/* ===== Білім Аралы — игра "Свойства воды" =====
   Естествознание, 2 класс, по программе (приложение 28, 2-я четверть):
   2.3.3.1 "определять физические свойства воды (без вкуса, без
   запаха, без определенной формы, текучесть)";
   2.3.3.2 "исследовать процесс изменения агрегатного состояния воды";
   2.3.3.3 "определять природные источники воды".
   Верно/неверно об утверждениях про воду. 12 заранее составленных
   утверждений (6 верных + 6 неверных), показываются дважды в
   перемешанном порядке — 24 вопроса.
   Использование: initWaterPropsGame('game-root') после загрузки DOM.
*/
function initWaterPropsGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var STATEMENTS = [
    { key: 'water_st_1', answer: true },
    { key: 'water_st_2', answer: true },
    { key: 'water_st_3', answer: true },
    { key: 'water_st_4', answer: true },
    { key: 'water_st_5', answer: true },
    { key: 'water_st_6', answer: true },
    { key: 'water_st_7', answer: false },
    { key: 'water_st_8', answer: false },
    { key: 'water_st_9', answer: false },
    { key: 'water_st_10', answer: false },
    { key: 'water_st_11', answer: false },
    { key: 'water_st_12', answer: false }
  ];

  var TOTAL = 24;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = false;
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
      order = shuffle(STATEMENTS.concat(STATEMENTS));
    }
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var st = order[questionIndex-1];
    currentAnswer = st.answer;
    var m = msgs();
    var text = m[st.key] || st.key;

    root.innerHTML =
      '<div style="font-size:3rem; margin-bottom:12px;">💧</div>' +
      '<div style="font-family:\'Nunito\',sans-serif; font-size:1.2rem; font-weight:800; color:var(--ink); margin-bottom:24px; max-width:480px; margin-left:auto; margin-right:auto;">' + text + '</div>' +
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
    recordGameResult('waterprops', score, TOTAL);
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
