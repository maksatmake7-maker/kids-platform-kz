/* ===== Білім Аралы — игра "Чем измеряем?" (v2 — режим освоения) =====
   Математика, 1 класс, по программе (приложение 26, 2-я четверть):
   1.1.3.1 "различать величины: длина/масса/объем (емкость)/время,
   выбирать меры и инструменты для их измерения" +
   1.1.3.2 "производить измерения величин, используя единицы
   измерения: длины (см, дм), массы (кг), объема емкости (л)".
   Время не включено сюда — оно отдельная игра "Который час?".
   Показываем предмет, ребёнок выбирает — в чём его измеряют:
   длина (см/дм), масса (кг) или объём (л). Ровно 6 предметов из
   документа (по 2 на категорию) — не выдумываем других. Они не
   заканчиваются, а случайно повторяются (без повтора одного и того
   же предмета два раза подряд); чтобы "освоить" тему, нужно ответить
   верно 10 раз ПОДРЯД. Ошибка сбрасывает серию, но не прерывает игру.
   Использование: initMeasureGame('game-root') — measure.html не трогать.
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

  var STREAK_NEEDED = 10;
  var streak = 0;
  var totalCorrect = 0;
  var totalAnswered = 0;
  var currentAnswer = '';
  var lastEmoji = null;
  var busy = false;

  function msgs(){
    var lang = document.documentElement.getAttribute('data-current') || 'ru';
    return (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};
  }
  function updateProgress(){
    var el = document.getElementById('count-progress-value');
    if(el) el.textContent = streak + ' / ' + STREAK_NEEDED;
  }
  function updateScore(){
    var el = document.getElementById('count-score-value');
    if(el) el.textContent = totalCorrect;
  }

  function pickItem(){
    var candidate;
    var attempts = 0;
    do {
      candidate = ITEMS[Math.floor(Math.random()*ITEMS.length)];
      attempts++;
    } while (candidate[0] === lastEmoji && attempts < 10);
    lastEmoji = candidate[0];
    return candidate;
  }

  function render(){
    updateProgress();

    var item = pickItem();
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
      btn.addEventListener('click', function(){
        if(busy) return;
        checkAnswer(btn.getAttribute('data-value'), btn);
      });
    });
    busy = false;
  }

  function renderFinish(){
    recordGameResult('measure', STREAK_NEEDED, STREAK_NEEDED);
    var m = msgs();
    root.innerHTML =
      '<div class="finish-screen">' +
        '<div class="finish-emoji">🏆</div>' +
        '<h2 class="finish-msg">' + (m.finish_msg || 'Game complete! 🎉') + '</h2>' +
        '<p class="finish-score">' + (m.score_label || 'Score:') + ' ' + totalCorrect + ' / ' + totalAnswered + '</p>' +
        '<button class="cta" id="play-again-btn">' + (m.play_again || 'Play again') + '</button>' +
      '</div>';
    document.getElementById('play-again-btn').addEventListener('click', function(){
      streak = 0; totalCorrect = 0; totalAnswered = 0; lastEmoji = null;
      updateScore();
      render();
    });
  }

  function checkAnswer(value, btn){
    busy = true;
    totalAnswered++;
    var feedback = document.getElementById('count-feedback');
    var m = msgs();
    root.querySelectorAll('.count-btn').forEach(function(b){ b.disabled = true; });

    if(value === currentAnswer){
      totalCorrect++;
      streak++;
      updateScore();
      updateProgress();
      btn.classList.add('correct');
      feedback.textContent = m.correct_msg || 'Great job! 🎉';
      feedback.className = 'count-feedback show correct';
      if(streak >= STREAK_NEEDED){
        setTimeout(renderFinish, 900);
      } else {
        setTimeout(render, 900);
      }
    } else {
      streak = 0;
      updateProgress();
      btn.classList.add('wrong');
      feedback.textContent = m.wrong_msg || 'Try again';
      feedback.className = 'count-feedback show wrong';
      setTimeout(render, 1200);
    }
  }

  render();
}
