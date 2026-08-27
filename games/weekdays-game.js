/* ===== Білім Аралы — игра "Дни недели" =====
   Познание мира, 1 класс, по программе (приложение 29, цель 1.1.2.5):
   "применять названия времени суток и дней недели".
   У недели один правильный порядок — ребёнок нажимает названия дней
   по порядку, начиная с понедельника. Дни недели невозможно
   изобразить иконкой, поэтому плитки текстовые (не эмодзи).
   Использование: initWeekdaysGame('game-root') после загрузки DOM.
*/
function initWeekdaysGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var DAY_KEYS = ['day_mon','day_tue','day_wed','day_thu','day_fri','day_sat','day_sun'];
  var TOTAL = DAY_KEYS.length;
  var filled = [];
  var tiles = [];
  var completed = false;

  function shuffleArr(arr){
    var a = arr.slice();
    for(var i=a.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = a[i]; a[i]=a[j]; a[j]=tmp;
    }
    return a;
  }

  function msgs(){
    var lang = document.documentElement.getAttribute('data-current') || 'ru';
    return (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};
  }
  function updateProgress(){
    var el = document.getElementById('count-progress-value');
    if(el) el.textContent = (completed ? TOTAL : filled.length) + ' / ' + TOTAL;
  }

  function start(){
    filled = [];
    completed = false;
    var shuffledKeys = shuffleArr(DAY_KEYS);
    tiles = shuffledKeys.map(function(key, idx){ return { key: key, id: idx, used: false }; });
    updateProgress();
    renderBoard();
  }

  function renderBoard(){
    var m = msgs();
    var progressText = filled.length > 0
      ? filled.map(function(k){ return m[k] || k; }).join(', ')
      : (m.hub_weekdays_desc || '');

    var tilesHtml = tiles.map(function(t){
      return '<button class="count-btn weekday-tile" data-id="' + t.id + '"' + (t.used ? ' disabled' : '') + '>' + (m[t.key] || t.key) + '</button>';
    }).join('');

    root.innerHTML =
      '<p class="problem-text">' + progressText + '</p>' +
      '<div class="weekday-tiles">' + tilesHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.weekday-tile:not(:disabled)').forEach(function(btn){
      btn.addEventListener('click', function(){ handleTileClick(btn); });
    });
  }

  function handleTileClick(btn){
    var id = parseInt(btn.getAttribute('data-id'), 10);
    var tile = tiles[id];
    var neededKey = DAY_KEYS[filled.length];
    var feedback = document.getElementById('count-feedback');
    var m = msgs();

    if(tile.key === neededKey){
      tile.used = true;
      filled.push(tile.key);
      updateProgress();

      if(filled.length === DAY_KEYS.length){
        completed = true;
        renderBoard();
        var fb = document.getElementById('count-feedback');
        fb.textContent = m.correct_msg || 'Great job! 🎉';
        fb.className = 'count-feedback show correct';
        setTimeout(renderFinish, 1200);
      } else {
        renderBoard();
      }
    } else {
      btn.classList.add('wrong');
      feedback.textContent = m.wrong_msg || 'Try again';
      feedback.className = 'count-feedback show wrong';
      setTimeout(function(){ btn.classList.remove('wrong'); }, 500);
    }
  }

  function renderFinish(){
    recordGameResult('weekdays', TOTAL, TOTAL);
    var m = msgs();
    root.innerHTML =
      '<div class="finish-screen">' +
        '<div class="finish-emoji">🏆</div>' +
        '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
        '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
      '</div>';
    document.getElementById('play-again-btn').addEventListener('click', start);
  }

  start();
}
