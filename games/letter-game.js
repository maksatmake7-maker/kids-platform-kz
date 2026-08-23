/* ===== Білім Аралы — игра "Найди букву" =====
   Ребёнку показывают букву, он выбирает картинку, название которой
   начинается с этой буквы, среди 4 вариантов.
   Фиксированная сессия из 30 вопросов, затем финальный экран.
   Использование: initLetterGame('game-root') после загрузки DOM.
*/
function initLetterGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // буква : [слово, эмодзи]
  var WORDS = [
    ['А','Апельсин','🍊'],
    ['Б','Банан','🍌'],
    ['В','Виноград','🍇'],
    ['Г','Гриб','🍄'],
    ['Д','Дом','🏠'],
    ['Ж','Жук','🐞'],
    ['З','Заяц','🐰'],
    ['К','Кот','🐱'],
    ['Л','Лев','🦁'],
    ['М','Мяч','⚽'],
    ['Н','Носорог','🦏'],
    ['О','Огурец','🥒'],
    ['П','Пингвин','🐧'],
    ['Р','Рыба','🐟'],
    ['С','Слон','🐘'],
    ['Т','Тигр','🐯'],
    ['У','Утка','🦆'],
    ['Ф','Флаг','🚩'],
    ['Х','Хомяк','🐹'],
    ['Ц','Цветок','🌸'],
    ['Ч','Черепаха','🐢'],
    ['Ш','Шар','🎈'],
    ['Я','Яблоко','🍎']
  ];

  var TOTAL = 30;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = null; // full word entry [letter, word, emoji]

  // "Колода без повторов": буквы раздаются перемешанными пачками,
  // так одна и та же буква не подряд и не кластерами.
  var bag = [];
  var lastLetter = null;

  function refillBag(){
    bag = WORDS.slice();
    for(var i=bag.length-1; i>0; i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = bag[i]; bag[i]=bag[j]; bag[j]=tmp;
    }
    // не даём новой пачке начаться с той же буквы, что была последней
    if(lastLetter && bag.length > 1 && bag[0][0] === lastLetter){
      var swapIdx = 1 + Math.floor(Math.random()*(bag.length-1));
      var t = bag[0]; bag[0] = bag[swapIdx]; bag[swapIdx] = t;
    }
  }
  function nextWord(){
    if(bag.length === 0) refillBag();
    var w = bag.pop();
    lastLetter = w[0];
    return w;
  }

  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
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

    currentAnswer = nextWord();

    var options = [currentAnswer];
    var pool = WORDS.filter(function(w){ return w[0] !== currentAnswer[0]; });
    while(options.length < 4 && pool.length > 0){
      var idx = Math.floor(Math.random()*pool.length);
      options.push(pool[idx]);
      pool.splice(idx, 1);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(w){
      return '<button class="letter-btn" data-letter="' + w[0] + '">' +
               '<span class="letter-btn-emoji">' + w[2] + '</span>' +
               '<span class="letter-btn-word">' + w[1] + '</span>' +
             '</button>';
    }).join('');

    root.innerHTML =
      '<div class="letter-target">' + currentAnswer[0] + '</div>' +
      '<div class="letter-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.letter-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-letter'), btn); });
    });
  }

  function renderFinish(){
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

  function checkAnswer(letter, btn){
    var feedback = document.getElementById('count-feedback');
    var m = msgs();

    if(letter === currentAnswer[0]){
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
