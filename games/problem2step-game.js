/* ===== Білім Аралы — игра "Задачи в два действия" =====
   Математика, 2 класс, по программе (приложение 26, 1-я четверть):
   2.5.1.1 "моделировать в виде таблицы, схемы, краткой записи задачи
   в одно действие, в два действия";
   2.5.1.7 "моделировать и решать задачи в 2 действия";
   2.5.1.8 "моделировать решение составных задач в виде числового
   выражения".
   В отличие от игры "Реши задачу" в 1 классе (одно действие), здесь
   каждая задача требует ДВУХ последовательных арифметических действий.
   10 заранее составленных задач (не процедурная генерация — качество
   текста важнее для настоящих задач), показываются в случайном порядке.
   Использование: initProblem2StepGame('game-root') после загрузки DOM.
*/
function initProblem2StepGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var PROBLEMS = [
    { textKey: 'p2_problem_1', answer: 17 },
    { textKey: 'p2_problem_2', answer: 20 },
    { textKey: 'p2_problem_3', answer: 37 },
    { textKey: 'p2_problem_4', answer: 17 },
    { textKey: 'p2_problem_5', answer: 48 },
    { textKey: 'p2_problem_6', answer: 9 },
    { textKey: 'p2_problem_7', answer: 53 },
    { textKey: 'p2_problem_8', answer: 25 },
    { textKey: 'p2_problem_9', answer: 45 },
    { textKey: 'p2_problem_10', answer: 32 }
  ];

  var TOTAL = PROBLEMS.length;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = 0;
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
      order = shuffle(PROBLEMS.map(function(_,i){ return i; }));
    }
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var problem = PROBLEMS[order[questionIndex-1]];
    currentAnswer = problem.answer;
    var m = msgs();
    var problemText = m[problem.textKey] || problem.textKey;

    var options = [currentAnswer];
    while(options.length < 4){
      var delta = [-5,-3,-2,3,5,7][Math.floor(Math.random()*6)];
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
      '<p style="font-family:\'Nunito\',sans-serif; font-size:1.1rem; font-weight:700; color:var(--ink); max-width:480px; margin:0 auto 20px;">' + problemText + '</p>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'),10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('problem2step', score, TOTAL);
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
      setTimeout(render, 1200);
    } else {
      btn.classList.add('wrong');
      feedback.textContent = m.wrong_msg || 'Try again';
      feedback.className = 'count-feedback show wrong';
      setTimeout(function(){ btn.classList.remove('wrong'); }, 500);
    }
  }

  render();
}
