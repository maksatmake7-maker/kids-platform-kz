/* ===== Білім Аралы — игра "Этапы жизни" =====
   Естествознание, 1 класс, по программе (приложение 28, цель 1.2.3.2):
   "описывать этапы жизни человека".
   У человеческой жизни один правильный порядок этапов — младенец,
   ребёнок, взрослый, пожилой человек. Ребёнок нажимает картинки
   по порядку, чтобы восстановить правильную последовательность.
   Используются только давно поддерживаемые эмодзи (2010-2014).
   Использование: initLifeStagesGame('game-root') после загрузки DOM.
*/
function initLifeStagesGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var STAGE_ORDER = ['👶','👦','👨','👴'];
  var TOTAL = STAGE_ORDER.length;
  var filled = [];
  var tiles = [];
  var completed = false;

  function shuffleTiles(arr){
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
    var shuffled = shuffleTiles(STAGE_ORDER);
    tiles = shuffled.map(function(emoji, idx){ return { emoji: emoji, id: idx, used: false }; });
    updateProgress();
    renderBoard();
  }

  function renderBoard(){
    var slotsHtml = STAGE_ORDER.map(function(e, idx){
      var val = filled[idx] || '';
      return '<div class="word-slot story-slot' + (val ? ' filled' : '') + '">' + val + '</div>';
    }).join('');

    var tilesHtml = tiles.map(function(t){
      return '<button class="word-tile story-tile" data-id="' + t.id + '"' + (t.used ? ' disabled' : '') + '>' + t.emoji + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="word-slots">' + slotsHtml + '</div>' +
      '<div class="word-tiles">' + tilesHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.story-tile:not(:disabled)').forEach(function(btn){
      btn.addEventListener('click', function(){ handleTileClick(btn); });
    });
  }

  function handleTileClick(btn){
    var id = parseInt(btn.getAttribute('data-id'), 10);
    var tile = tiles[id];
    var neededEmoji = STAGE_ORDER[filled.length];
    var feedback = document.getElementById('count-feedback');
    var m = msgs();

    if(tile.emoji === neededEmoji){
      tile.used = true;
      filled.push(tile.emoji);
      updateProgress();

      if(filled.length === STAGE_ORDER.length){
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
    recordGameResult('lifestages_kz', TOTAL, TOTAL);
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
