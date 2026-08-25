/* ===== Білім Аралы — игра "Найди пару" =====
   Классическая игра на память: 16 карточек (8 пар), переворачиваем
   по две, ищем совпадения. Не привязана к конкретному предмету —
   бонусная головоломка для Игровой комнаты.
   Использование: initMemoryGame('game-root') после загрузки DOM.
*/
function initMemoryGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var EMOJIS = ['🦋','🌸','⭐','🍎','🐠','🎈','🌈','🍓'];

  var cards = [];
  var flipped = [];
  var matchedCount = 0;
  var moves = 0;
  var locked = false;

  function msgs(){
    var lang = document.documentElement.getAttribute('data-current') || 'ru';
    return (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};
  }
  function updateMoves(){
    var el = document.getElementById('count-progress-value');
    if(el) el.textContent = moves;
  }

  function buildCards(){
    var pairs = EMOJIS.concat(EMOJIS);
    for(var i=pairs.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = pairs[i]; pairs[i]=pairs[j]; pairs[j]=tmp;
    }
    cards = pairs.map(function(emoji, idx){
      return { id: idx, emoji: emoji, matched: false };
    });
  }

  function render(){
    var html = cards.map(function(c){
      var isFlipped = flipped.indexOf(c.id) !== -1;
      var cls = 'memory-card' + (isFlipped ? ' flipped' : '') + (c.matched ? ' matched' : '');
      return '<button class="' + cls + '" data-id="' + c.id + '"' + (c.matched ? ' disabled' : '') + '>' +
               (isFlipped || c.matched ? c.emoji : '') +
             '</button>';
    }).join('');
    root.innerHTML = '<div class="memory-grid">' + html + '</div><div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.memory-card:not(:disabled)').forEach(function(btn){
      btn.addEventListener('click', function(){ handleFlip(parseInt(btn.getAttribute('data-id'), 10)); });
    });
  }

  function handleFlip(id){
    if(locked) return;
    if(flipped.indexOf(id) !== -1) return;
    if(cards[id].matched) return;

    flipped.push(id);
    render();

    if(flipped.length === 2){
      moves++;
      updateMoves();
      locked = true;
      var a = cards[flipped[0]], b = cards[flipped[1]];
      if(a.emoji === b.emoji){
        a.matched = true;
        b.matched = true;
        matchedCount++;
        flipped = [];
        locked = false;
        render();
        if(matchedCount === EMOJIS.length){
          setTimeout(renderFinish, 500);
        }
      } else {
        setTimeout(function(){
          flipped = [];
          locked = false;
          render();
        }, 800);
      }
    }
  }

  function renderFinish(){
    var m = msgs();
    root.innerHTML =
      '<div class="finish-screen">' +
        '<div class="finish-emoji">🏆</div>' +
        '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
        '<p class="finish-score">' + (m.moves_label || 'Moves:') + ' ' + moves + '</p>' +
        '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
      '</div>';
    document.getElementById('play-again-btn').addEventListener('click', function(){
      moves = 0;
      matchedCount = 0;
      flipped = [];
      locked = false;
      updateMoves();
      buildCards();
      render();
    });
  }

  buildCards();
  updateMoves();
  render();
}
