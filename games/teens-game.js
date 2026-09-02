/* ===== Білім Аралы — игра "Числа 11-20" =====
   Математика, 1 класс, по программе (приложение 26, 4-я четверть):
   1.1.1.1 "считать... в пределах 20", 1.1.1.2 "читать, записывать
   и сравнивать числа" (11-20), 1.1.1.3 "объяснять и записывать
   разрядный состав двузначного числа (сколько десятков и единиц)".
   Показываем состав числа ("1 десяток и 3 единицы"), ребёнок
   находит, какое это число (13).
   Процедурная генерация — 10 вариантов (11-20), вопросов
   практически бесконечно, как в счёте/сложении.
   Сессия = 20 вопросов подряд.
   Использование: initTeensGame('game-root') после загрузки DOM.
*/
function initTeensGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var TOTAL = 20;
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

  function tensBlock(){
    return '<div class="teens-ten">' +
      Array(10).fill('<span class="teens-dot"></span>').join('') +
      '</div>';
  }
  function onesBlock(n){
    return '<div class="teens-ones">' +
      Array(n).fill('<span class="teens-dot teens-dot-one"></span>').join('') +
      '</div>';
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var number = 11 + Math.floor(Math.random()*10); // 11..20
    currentAnswer = number;
    var tens = Math.floor(number/10);
    var ones = number % 10;

    var blocksHtml = '<div class="teens-blocks">';
    for(var t=0; t<tens; t++){ blocksHtml += tensBlock(); }
    if(ones > 0){ blocksHtml += onesBlock(ones); }
    blocksHtml += '</div>';

    var options = [number];
    while(options.length < 4){
      var candidate = 11 + Math.floor(Math.random()*10);
      if(options.indexOf(candidate) === -1) options.push(candidate);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(v){
      return '<button class="count-btn" data-value="' + v + '">' + v + '</button>';
    }).join('');

    root.innerHTML =
      blocksHtml +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'), 10), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('teens', score, TOTAL);
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
