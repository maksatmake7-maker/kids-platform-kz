/* ===== Білім Аралы — игра "Виды углов" =====
   Математика, 2 класс, по программе (приложение 26, 3-я четверть):
   2.3.1.1 "распознавать и называть виды углов (прямой, острый,
   тупой)".
   Рисуем SVG-угол случайной величины и просим определить его вид:
   острый (<90°), прямой (=90°), тупой (>90°, <180°).
   24 вопроса, три кнопки-варианта.
   Использование: initAngleTypeGame('game-root') после загрузки DOM.
*/
function initAngleTypeGame(containerId){
  var root = document.getElementById(containerId);
  if(!root) return;

  var TOTAL = 24;
  var score = 0;
  var questionIndex = 0;
  var currentAnswer = '';

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

  function drawAngle(thetaDeg){
    var vx=30, vy=170, rayLen=130;
    var x1 = vx + rayLen, y1 = vy;
    var rad = thetaDeg * Math.PI/180;
    var x2 = vx + rayLen*Math.cos(rad);
    var y2 = vy - rayLen*Math.sin(rad);
    var arcR = 30;
    var ax1 = vx+arcR, ay1 = vy;
    var ax2 = vx + arcR*Math.cos(rad);
    var ay2 = vy - arcR*Math.sin(rad);

    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width:180px;height:180px;">' +
      '<line x1="'+vx+'" y1="'+vy+'" x2="'+x1+'" y2="'+y1+'" stroke="#1D3557" stroke-width="4" stroke-linecap="round"/>' +
      '<line x1="'+vx+'" y1="'+vy+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="#1D3557" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M '+ax1+' '+ay1+' A '+arcR+' '+arcR+' 0 0 0 '+ax2.toFixed(1)+' '+ay2.toFixed(1)+'" fill="none" stroke="#FF6B5B" stroke-width="3"/>' +
      '<circle cx="'+vx+'" cy="'+vy+'" r="5" fill="#1D3557"/>' +
      '</svg>';
  }

  function pickAngle(){
    var type = Math.floor(Math.random()*3);
    var theta;
    if(type === 0){ theta = Math.floor(Math.random()*60)+20; return {theta: theta, type: 'acute'}; }        // 20-79° острый
    if(type === 1){ return {theta: 90, type: 'right'}; }                                                     // прямой
    theta = Math.floor(Math.random()*60)+100; return {theta: theta, type: 'obtuse'};                         // 100-159° тупой
  }

  function render(){
    questionIndex++;
    if(questionIndex > TOTAL){ renderFinish(); return; }
    updateProgress();

    var angleInfo = pickAngle();
    currentAnswer = angleInfo.type;
    var m = msgs();

    root.innerHTML =
      '<div style="display:flex; justify-content:center; margin-bottom:16px;">' + drawAngle(angleInfo.theta) + '</div>' +
      '<div class="count-options" style="flex-direction:column; align-items:center;">' +
        '<button class="count-btn" data-value="acute">' + (m.angle_acute || 'Acute') + '</button>' +
        '<button class="count-btn" data-value="right">' + (m.angle_right || 'Right') + '</button>' +
        '<button class="count-btn" data-value="obtuse">' + (m.angle_obtuse || 'Obtuse') + '</button>' +
      '</div>' +
      '<div class="count-feedback" id="count-feedback"></div>';

    root.querySelectorAll('.count-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ checkAnswer(btn.getAttribute('data-value'), btn); });
    });
  }

  function renderFinish(){
    recordGameResult('angletype', score, TOTAL);
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

  render();
}
