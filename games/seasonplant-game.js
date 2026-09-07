/* ===== Білім Аралы — игра "Сезонные изменения растений" =====
   Естествознание, 2 класс, по программе (приложение 28, 1-я четверть):
   2.2.1.2 "описывать сезонные изменения у растений".
   Показываем время года, просим выбрать, что происходит с
   растениями в этот сезон, среди 4 вариантов.
   4 сезона × 6 повторов = 24 вопроса.
   Использование: initSeasonPlantGame('game-root') после загрузки DOM.
*/
function initSeasonPlantGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var SEASONS = [
    { emoji: '🌸', key: 'spring' },
    { emoji: '☀️', key: 'summer' },
    { emoji: '🍂', key: 'autumn' },
    { emoji: '❄️', key: 'winter' }
  ];

  var TOTAL = 24;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';
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
  function seasonName(m, key){
    return m['season_' + key] || key;
  }
  function seasonDesc(m, key){
    return m['seasonplant_' + key] || key;
  }

  function render(){
    if(questionIndex === 0){
      var pool = [];
      for(var r=0; r<6; r++){ pool = pool.concat(SEASONS); }
      order = shuffle(pool);
    }
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var season = order[questionIndex-1];
    currentAnswer = season.key;
    var m = msgs();

    var options = [currentAnswer];
    while(options.length < 4){
      var candidate = SEASONS[Math.floor(Math.random()*SEASONS.length)].key;
      if(options.indexOf(candidate) === -1) options.push(candidate);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(k){
      return '<button class="count-btn" data-value="' + k + '">' + seasonDesc(m, k) + '</button>';
    }).join('');

    root.innerHTML =
      '<div style="font-size:3rem; margin-bottom:6px;">' + season.emoji + '</div>' +
      '<div style="font-family:\'Baloo 2\',sans-serif; font-weight:700; font-size:1.3rem; color:var(--ink); margin-bottom:20px;">' + seasonName(m, season.key) + '</div>' +
      '<div class="count-options" style="flex-direction:column; align-items:center;">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('seasonplant', score, TOTAL);
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
