/* ===== Білім Аралы — игра "Собери слово" =====
   Ребёнку показывают картинку, он собирает слово, нажимая буквы
   по порядку из перемешанного набора.
   Сессия = ровно один проход по всем словам (без повторов).
   Использование: initWordGame('game-root') после загрузки DOM.
*/
function initWordGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [слово, эмодзи] — короткие слова из 3 букв
  var WORDS = [
    ['КОТ','🐱'],
    ['ДОМ','🏠'],
    ['ЛЕВ','🦁'],
    ['СОК','🧃'],
    ['МЯЧ','⚽'],
    ['ЖУК','🐞'],
    ['ЛУК','🧅'],
    ['СЫР','🧀'],
    ['ЧАЙ','🍵'],
    ['КУБ','🧊']
  ];

  var TOTAL = WORDS.length;
  var score = 0;
  var questionIndex = 0;
  var currentWord = '';
  var currentEmoji = '';
  var filled = [];
  var tiles = [];

  var queue = [];
  function buildQueue(){
    queue = WORDS.slice();
    for(var i=queue.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = queue[i]; queue[i]=queue[j]; queue[j]=tmp;
    }
  }
  function nextEntry(){ return queue.pop(); }

  function shuffleLetters(word){
    var arr = word.split('');
    for(var i=arr.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = arr[i]; arr[i]=arr[j]; arr[j]=tmp;
    }
    return arr;
  }

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

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var entry = nextEntry();
    currentWord = entry[0];
    currentEmoji = entry[1];
    filled = [];

    var shuffled = shuffleLetters(currentWord);
    tiles = shuffled.map(function(ch, idx){ return { char: ch, id: idx, used: false }; });

    renderBoard();
  }

  function renderBoard(){
    var slotsHtml = currentWord.split('').map(function(ch, idx){
      var val = filled[idx] || '';
      return '<div class="word-slot' + (val ? ' filled' : '') + '">' + val + '</div>';
    }).join('');

    var tilesHtml = tiles.map(function(t){
      return '<button class="word-tile" data-id="' + t.id + '"' + (t.used ? ' disabled' : '') + '>' + t.char + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="word-emoji">' + currentEmoji + '</div>' +
      '<div class="word-slots">' + slotsHtml + '</div>' +
      '<div class="word-tiles">' + tilesHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.word-tile:not(:disabled)').forEach(function(btn){
      btn.addEventListener('click', function(){ handleTileClick(btn); });
    });
  }

  function handleTileClick(btn){
    var id = parseInt(btn.getAttribute('data-id'), 10);
    var tile = tiles[id];
    var neededChar = currentWord[filled.length];
    var feedback = document.getElementById('count-feedback');
    var m = msgs();

    if(tile.char === neededChar){
      tile.used = true;
      filled.push(tile.char);

      if(filled.length === currentWord.length){
        score++;
        updateScore();
        renderBoard();
        var fb = document.getElementById('count-feedback');
        fb.textContent = m.correct_msg || 'Great job! 🎉';
        fb.className = 'count-feedback show correct';
        setTimeout(render, 1000);
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
    recordGameResult('word', score, TOTAL);
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
      buildQueue();
      render();
    });
  }

  buildQueue();
  render();
}
