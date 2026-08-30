/* ===== Білім Аралы — игра "Әріпті тап" (2-топ) =====
   Әліппе, 1 класс, қазақ тілінде оқытатын мектептер (приложение 1).
   1-тоқсанның екінші бөлігі: с, о, т, қ, ы, з, м, е, д, ш, ұ.
   "з" дыбысы бұл ойында қалдырылды — бала түсінетін нақты зат
   атауын таба алмадық (з-мен басталатын сөздер негізінен дерексіз:
   зауыт, зерде, т.б.).
   Кейбір әріптерде бірнеше сөз-мысал бар — әртүрлілік үшін.
   Сессия = бірнеше топтама (қайта араластырылып), кемінде 15
   сұрақ болғанша.
   Қолдану: initAlippeLetters2Game('game-root') DOM жүктелгеннен кейін.
*/
function initAlippeLetters2Game(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  // [әріп, [эмодзи нұсқалары]]
  var LETTERS = [
    ['С', ['🐄','⌚']],  // сиыр, сағат
    ['О', ['🧸']],       // ойыншық
    ['Т', ['⛰️','🐔']],  // тау, тауық
    ['Қ', ['🐰','❄️']],  // қоян, қар
    ['Ы', ['🥣']],       // ыдыс
    ['М', ['🐱','👃']],  // мысық, мұрын
    ['Е', ['🐐']],       // ешкі
    ['Д', ['⚽','📓']],  // доп, дәптер
    ['Ш', ['🍒']],       // шие
    ['Ұ', ['✈️']]        // ұшақ
  ];

  function pickEmoji(letterEntry){
    var pool = letterEntry[1];
    return pool[Math.floor(Math.random()*pool.length)];
  }

  var ROUND_SIZE = LETTERS.length;
  var ROUNDS = Math.ceil(15 / ROUND_SIZE);
  var TOTAL = ROUND_SIZE * ROUNDS;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = null;

  var queue = [];
  function buildQueue(){
    queue = [];
    for(var r=0; r<ROUNDS; r++){
      var pass = LETTERS.slice();
      for(var i=pass.length-1; i>0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var tmp = pass[i]; pass[i]=pass[j]; pass[j]=tmp;
      }
      queue = queue.concat(pass);
    }
  }
  function nextLetter(){ return queue.pop(); }

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

    currentAnswer = nextLetter();

    var options = [currentAnswer];
    var pool = LETTERS.filter(function(l){ return l[0] !== currentAnswer[0]; });
    while(options.length < 4 && pool.length > 0){
      var idx = Math.floor(Math.random()*pool.length);
      options.push(pool[idx]);
      pool.splice(idx, 1);
    }
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(l){
      return '<button class="count-btn" data-key="' + l[0] + '" style="font-size:2rem;">' + pickEmoji(l) + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="letter-target">' + currentAnswer[0] + '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-key'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('alippe_letters2', score, TOTAL);
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

  function checkAnswer(key, btn){
    var feedback = document.getElementById('count-feedback');
    var m = msgs();

    if(key === currentAnswer[0]){
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
