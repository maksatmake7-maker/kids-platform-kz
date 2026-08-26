/* ===== Білім Аралы — игра "Собери историю" =====
   Казахский язык, 1 класс, по программе (приложение 11, цель 1.2.4.1):
   "пересказывать короткие тексты, используя фото/картинки".
   Ребёнку показывают перемешанные картинки одной истории, он
   нажимает их по порядку, чтобы восстановить правильную
   последовательность событий.
   Сессия = ровно один проход по всем историям (без повторов).
   Использование: initStoryGame('game-root') после загрузки DOM.
*/
function initStoryGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // Каждая история — массив эмодзи в правильном хронологическом порядке
  var STORIES = [
    ['🛌','⏰','🪥','🎒'],
    ['🥚','🐣','🐥','🐔'],
    ['🌰','🌱','🌿','🌳'],
    ['🌅','☀️','🌇','🌙'],
    ['☁️','🌧️','💧','🌈'],
    ['🥚','🐛','🦋','🌸']
  ];

  var TOTAL = STORIES.length;
  var score = 0;
  var questionIndex = 0;
  var currentStory = [];
  var filled = [];
  var tiles = [];

  var queue = [];
  function buildQueue(){
    queue = STORIES.slice();
    for(var i=queue.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = queue[i]; queue[i]=queue[j]; queue[j]=tmp;
    }
  }
  function nextStory(){ return queue.pop(); }

  function shuffleTiles(story){
    var arr = story.slice();
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

    currentStory = nextStory();
    filled = [];

    var shuffled = shuffleTiles(currentStory);
    tiles = shuffled.map(function(emoji, idx){ return { emoji: emoji, id: idx, used: false }; });

    renderBoard();
  }

  function renderBoard(){
    var slotsHtml = currentStory.map(function(e, idx){
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
    var neededEmoji = currentStory[filled.length];
    var feedback = document.getElementById('count-feedback');
    var m = msgs();

    if(tile.emoji === neededEmoji){
      tile.used = true;
      filled.push(tile.emoji);

      if(filled.length === currentStory.length){
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
    recordGameResult('story', score, TOTAL);
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
