/* ===== Білім Аралы — игра "Найди пару" =====
   Классическая игра на память: 16 карточек (8 пар), переворачиваем
   по две, ищем совпадения. Не привязана к конкретному предмету —
   бонусная головоломка для Игровой комнаты.
   Использование: initMemoryGame('game-root') после загрузки DOM.
*/
function initMemoryGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  /* картинки нарисованы кодом (60×60), как и всё на сайте */
  var PICS = {
    butterfly: '<g stroke="#2B2F44" stroke-width="2" stroke-linejoin="round"><path d="M30 28 C20 10 6 12 8 24 C9 32 20 34 30 30Z" fill="#FF8A3D"/><path d="M30 28 C40 10 54 12 52 24 C51 32 40 34 30 30Z" fill="#FF8A3D"/><path d="M30 31 C22 34 12 38 16 48 C22 54 28 44 30 34Z" fill="#FFC93C"/><path d="M30 31 C38 34 48 38 44 48 C38 54 32 44 30 34Z" fill="#FFC93C"/></g><rect x="28" y="16" width="4" height="30" rx="2" fill="#2B2F44"/><path d="M29 17 Q24 8 19 9 M31 17 Q36 8 41 9" stroke="#2B2F44" stroke-width="2" fill="none" stroke-linecap="round"/>',
    flower: '<path d="M30 56 V34" stroke="#2F9B4A" stroke-width="4" stroke-linecap="round"/><path d="M30 46 Q18 44 16 34 Q28 36 30 46Z" fill="#4BB863" stroke="#2B2F44" stroke-width="1.8"/><g fill="#FF6B9A" stroke="#2B2F44" stroke-width="1.8">' + [0,1,2,3,4].map(function(i){ return '<ellipse cx="30" cy="12" rx="7" ry="10" transform="rotate(' + i*72 + ' 30 25)"/>'; }).join('') + '</g><circle cx="30" cy="25" r="7" fill="#FFC21F" stroke="#2B2F44" stroke-width="1.8"/>',
    star: '<path d="M30 5 L37 22 L55 23 L41 35 L46 53 L30 43 L14 53 L19 35 L5 23 L23 22Z" fill="#FFC21F" stroke="#2B2F44" stroke-width="2.4" stroke-linejoin="round"/><circle cx="24" cy="26" r="2" fill="#fff"/>',
    apple: '<path d="M30 18 C22 10 8 16 9 32 C10 46 20 56 30 52 C40 56 50 46 51 32 C52 16 38 10 30 18Z" fill="#E5392F" stroke="#2B2F44" stroke-width="2.4"/><path d="M30 18 Q30 10 34 6" stroke="#6B4226" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M33 12 Q42 4 50 10 Q42 18 33 12Z" fill="#4BB863" stroke="#2B2F44" stroke-width="1.8"/><path d="M16 28 Q15 36 19 42" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".5"/>',
    fish: '<path d="M44 30 L58 18 V42Z" fill="#FF8A3D" stroke="#2B2F44" stroke-width="2.2" stroke-linejoin="round"/><ellipse cx="28" cy="30" rx="19" ry="13" fill="#FFA64D" stroke="#2B2F44" stroke-width="2.4"/><path d="M26 18 Q32 8 38 18Z" fill="#FF8A3D" stroke="#2B2F44" stroke-width="2"/><circle cx="18" cy="26" r="4" fill="#fff" stroke="#2B2F44" stroke-width="1.6"/><circle cx="17" cy="26" r="1.8" fill="#2B2F44"/><path d="M28 22 Q32 30 28 38 M36 24 Q39 30 36 36" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>',
    balloon: '<path d="M30 4 C45 4 50 18 45 30 C41 40 34 43 30 43 C26 43 19 40 15 30 C10 18 15 4 30 4Z" fill="#4C90F0" stroke="#2B2F44" stroke-width="2.4"/><path d="M26 10 Q19 14 19 24" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".55"/><path d="M27 43 L30 48 L33 43Z" fill="#2F6FD0" stroke="#2B2F44" stroke-width="1.6"/><path d="M30 48 Q24 52 30 56" stroke="#6B7390" stroke-width="2" fill="none"/>',
    rainbow: '<g fill="none" stroke-width="6" stroke-linecap="round"><path d="M6 46 A24 24 0 0 1 54 46" stroke="#E5392F"/><path d="M12 46 A18 18 0 0 1 48 46" stroke="#FFC21F"/><path d="M18 46 A12 12 0 0 1 42 46" stroke="#4C90F0"/></g><g fill="#fff" stroke="#9BB0C6" stroke-width="1.6"><circle cx="9" cy="48" r="6"/><circle cx="17" cy="50" r="5"/><circle cx="51" cy="48" r="6"/><circle cx="43" cy="50" r="5"/></g>',
    strawberry: '<path d="M30 54 C14 46 8 32 12 22 C16 14 44 14 48 22 C52 32 46 46 30 54Z" fill="#E5392F" stroke="#2B2F44" stroke-width="2.4" stroke-linejoin="round"/><path d="M18 18 L30 10 L42 18 L36 20 L30 16 L24 20Z" fill="#4BB863" stroke="#2B2F44" stroke-width="1.8" stroke-linejoin="round"/><g fill="#FFE08A"><ellipse cx="22" cy="28" rx="1.6" ry="2.4"/><ellipse cx="32" cy="26" rx="1.6" ry="2.4"/><ellipse cx="40" cy="32" rx="1.6" ry="2.4"/><ellipse cx="26" cy="38" rx="1.6" ry="2.4"/><ellipse cx="35" cy="42" rx="1.6" ry="2.4"/></g>',
    bee: '<ellipse cx="22" cy="20" rx="9" ry="12" fill="#CFE9FF" stroke="#2B2F44" stroke-width="2" transform="rotate(-25 22 20)"/><ellipse cx="38" cy="20" rx="9" ry="12" fill="#CFE9FF" stroke="#2B2F44" stroke-width="2" transform="rotate(25 38 20)"/><ellipse cx="30" cy="36" rx="17" ry="13" fill="#FFC21F" stroke="#2B2F44" stroke-width="2.4"/><path d="M24 24 V48 M34 24 V48 M42 28 V44" stroke="#2B2F44" stroke-width="4.4" stroke-linecap="round"/><path d="M13 36 L6 36" stroke="#2B2F44" stroke-width="3" stroke-linecap="round"/><circle cx="43" cy="31" r="2" fill="#2B2F44"/>',
    melon: '<path d="M6 24 A24 24 0 0 0 54 24Z" fill="#4BB863" stroke="#2B2F44" stroke-width="2.4" stroke-linejoin="round"/><path d="M10 24 A20 20 0 0 0 50 24Z" fill="#E5392F"/><path d="M6 24 H54" stroke="#2B2F44" stroke-width="2.4"/><g fill="#2B2F44"><ellipse cx="22" cy="31" rx="1.8" ry="2.6"/><ellipse cx="30" cy="36" rx="1.8" ry="2.6"/><ellipse cx="38" cy="31" rx="1.8" ry="2.6"/></g>'
  };
  var EMOJIS = ['butterfly','flower','star','apple','fish','balloon','rainbow','strawberry','bee','melon'];
  var BACK = '<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="22" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2.4" stroke-dasharray="3 5"/><path d="M30 14 L34 25 L46 26 L37 33 L40 45 L30 38 L20 45 L23 33 L14 26 L26 25Z" fill="#FFC93C" stroke="rgba(0,0,0,.18)" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  (function(){
    if(document.getElementById('mem2-css')) return;
    var st = document.createElement('style'); st.id = 'mem2-css';
    st.textContent = ''
    + '.mem2 .memory-grid{gap:12px;max-width:420px;perspective:900px;}'
    + '.mem2 .memory-card{position:relative;padding:0;border:none;background:none;box-shadow:none;transform-style:preserve-3d;transition:transform .45s cubic-bezier(.3,1.3,.5,1);font-size:0;color:inherit;opacity:1;}'
    + '.mem2 .memory-card:hover:not(.flipped):not(.matched){transform:translateY(-3px) rotate(-1.5deg);}'
    + '.mem2 .memory-card.flipped,.mem2 .memory-card.matched{transform:rotateY(180deg);background:none;box-shadow:none;opacity:1;}'
    + '.mem2 .memory-card .f{position:absolute;inset:0;border-radius:16px;backface-visibility:hidden;display:flex;align-items:center;justify-content:center;}'
    + '.mem2 .memory-card .f.back{background:linear-gradient(145deg,#8FA8FF,#5E7FE0);box-shadow:0 5px 0 #4A63B8,inset 0 0 0 3px rgba(255,255,255,.35);}'
    + '.mem2 .memory-card .f.back svg{width:62%;height:62%;}'
    + '.mem2 .memory-card .f.front{transform:rotateY(180deg);background:#fff;box-shadow:0 5px 0 #E6D9BE,inset 0 0 0 3px #FFE9B8;}'
    + '.mem2 .memory-card .f.front svg{width:74%;height:74%;}'
    + '.mem2 .memory-card.matched .f.front{background:#EAFBF1;box-shadow:0 5px 0 #2E8F6B,inset 0 0 0 3px #6CC77A;}'
    + '.mem2 .memory-card.matched{animation:memHop .5s ease .35s;}'
    + '@keyframes memHop{0%,100%{translate:0 0;}40%{translate:0 -8px;}}'
    + '.mem-bs{display:flex;justify-content:center;margin:0 auto 6px;width:130px;}'
    + '@media (max-width:480px){.mem2 .memory-grid{gap:8px;}.mem2 .memory-card .f{border-radius:12px;}}'
    + '@media (prefers-reduced-motion:reduce){.mem2 .memory-card,.mem2 .memory-card.matched{transition:none;animation:none;}}';
    document.head.appendChild(st);
  })();

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
    var grid = root.querySelector('.memory-grid');
    if(grid && grid.children.length === cards.length){      /* обновляем на месте — иначе карточки не успеют красиво перевернуться */
      cards.forEach(function(c){
        var btn = grid.querySelector('[data-id="' + c.id + '"]'); if(!btn) return;
        btn.classList.toggle('flipped', flipped.indexOf(c.id) !== -1);
        btn.classList.toggle('matched', !!c.matched);
        btn.disabled = !!c.matched;
      });
      return;
    }
    var html = cards.map(function(c){
      var isFlipped = flipped.indexOf(c.id) !== -1;
      var cls = 'memory-card' + (isFlipped ? ' flipped' : '') + (c.matched ? ' matched' : '');
      return '<button class="' + cls + '" data-id="' + c.id + '"' + (c.matched ? ' disabled' : '') + ' aria-label="?">' +
               '<span class="f back">' + BACK + '</span>' +
               '<span class="f front"><svg viewBox="0 0 60 60" aria-hidden="true">' + PICS[c.emoji] + '</svg></span>' +
             '</button>';
    }).join('');
    root.innerHTML = '<div class="mem2"><div class="memory-grid">' + html + '</div></div><div class="count-feedback" id="count-feedback"></div>';

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
    recordGameResult('memory', EMOJIS.length, EMOJIS.length);
    var m = msgs();
    root.innerHTML =
      '<div class="finish-screen">' +
        '<div class="mem-bs" id="mem-bs"></div>' +
        '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
        '<p class="finish-score">' + (m.moves_label || 'Moves:') + ' ' + moves + '</p>' +
        '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
      '</div>';
    try { if(window.Barsik) Barsik.mount(document.getElementById('mem-bs')); } catch(e){}
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
