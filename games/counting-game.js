/* ===== Білім Аралы — игра "Посчитай и узнай" =====
   Простая переиспользуемая игра на счёт предметов.
   Использование: initCountingGame('game-root') после загрузки DOM.
*/
function initCountingGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var EMOJIS = ['🍎','⭐','🐻','🎈','🐟','🌸','🦋','🍓'];
  var score = 0;
  var currentAnswer = 0;

  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

  function render(){
    var count = 1 + Math.floor(Math.random()*9); // 1..9
    currentAnswer = count;
    var emoji = pick(EMOJIS);

    var objectsHtml = '';
    for(var i=0; i<count; i++){
      objectsHtml += '<span class="count-obj" style="animation-delay:' + (i*0.06) + 's">' + emoji + '</span>';
    }

    var options = [count];
    while(options.length < 4){
      var candidate = Math.max(1, count + (Math.floor(Math.random()*7) - 3));
      if(options.indexOf(candidate) === -1) options.push(candidate);
    }
    // shuffle
    for(var j=options.length-1; j>0; j--){
      var k = Math.floor(Math.random()*(j+1));
      var tmp = options[j]; options[j]=options[k]; options[k]=tmp;
    }

    var optionsHtml = options.map(function(n){
      return '<button class="count-btn" data-value="' + n + '">' + n + '</button>';
    }).join('');

    root.innerHTML =
      '<div class="count-objects">' + objectsHtml + '</div>' +
      '<div class="count-options">' + optionsHtml + '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(parseInt(btn.getAttribute('data-value'), 10), btn); });
    });
  }

  function checkAnswer(value, btn){
    var feedback = document.getElementById('count-feedback');
    var lang = document.documentElement.getAttribute('data-current') || 'ru';
    var msgs = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};

    if(value === currentAnswer){
      score++;
      updateScore();
      btn.classList.add('correct');
      feedback.textContent = msgs.correct_msg || 'Great job! 🎉';
      feedback.className = 'count-feedback show correct';
      setTimeout(render, 900);
    } else {
      btn.classList.add('wrong');
      feedback.textContent = msgs.wrong_msg || 'Try again';
      feedback.className = 'count-feedback show wrong';
      setTimeout(function(){ btn.classList.remove('wrong'); }, 500);
    }
  }

  function updateScore(){
    var el = document.getElementById('count-score-value');
    if(el) el.textContent = score;
  }

  render();
}
