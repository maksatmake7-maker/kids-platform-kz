/* ===== Білім Аралы — игра "Чем измеряем?" =====
   Математика, 1 класс, по программе (приложение 26, 2-я четверть):
   1.1.3.1 "различать величины: длина/масса/объем (емкость)/время,
   выбирать меры и инструменты для их измерения" +
   1.1.3.2 "производить измерения величин, используя единицы
   измерения: длины (см, дм), массы (кг), объема емкости (л)".
   Время не включено сюда — оно уже отдельная игра "Который час?".
   Показываем предмет, ребёнок выбирает — в чём его измеряют:
   длина (см/дм), масса (кг) или объём (л).
   6 предметов (по 2 на категорию) — минимум 15 вопросов через
   повтор кругов.
   Использование: initMeasureGame('game-root') после загрузки DOM.
*/
function initMeasureGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [эмодзи, 'length' | 'mass' | 'volume']
  var ITEMS = [
    ['✏️','length'],
    ['📖','length'],
    ['🍎','mass'],
    ['🍉','mass'],
    ['🍾','volume'],
    ['🥤','volume']
  ];

  var ROUND_SIZE = ITEMS.length;
  var ROUNDS = Math.ceil(15 / ROUND_SIZE);
  var TOTAL = ROUND_SIZE * ROUNDS;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

  var queue = [];
  function buildQueue(){
    queue = [];
    for(var r=0; r<ROUNDS; r++){
      var pass = ITEMS.slice();
      for(var i=pass.length-1; i>0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var tmp = pass[i]; pass[i]=pass[j]; pass[j]=tmp;
      }
      queue = queue.concat(pass);
    }
  }
  function nextItem(){ return queue.pop(); }

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

    var item = nextItem();
    currentAnswer = item[1];
    var m = msgs();

    root.innerHTML =
      '<div class="word-emoji">' + item[0] + '</div>' +
      '<div class="count-options measure-options">' +
        '<button class="count-btn" data-value="length">' + (m.measure_length || 'Length (cm)') + '</button>' +
        '<button class="count-btn" data-value="mass">' + (m.measure_mass || 'Mass (kg)') + '</button>' +
        '<button class="count-btn" data-value="volume">' + (m.measure_volume || 'Volume (L)') + '</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('measure_kz', score, TOTAL);
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

  buildQueue();
  render();
}
