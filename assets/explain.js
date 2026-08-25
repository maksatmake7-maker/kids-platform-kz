/* ===== Білім Аралы — озвучка объяснений (Web Speech API) =====
   Использует встроенный в браузер синтезатор речи. Не требует
   аудиофайлов. Качество зависит от языка и устройства пользователя —
   для русского обычно хорошее, для казахского/узбекского/таджикского/
   уйгурского может звучать слабее или быть недоступно на некоторых
   устройствах (нет специального голоса в системе).
*/
var LANG_TO_SPEECH_CODE = {
  ru: 'ru-RU',
  kz: 'kk-KZ',
  en: 'en-US',
  zh: 'zh-CN',
  uz: 'uz-UZ',
  tg: 'tg-TJ',
  ug: 'ug-CN'
};

function speakText(text, btn){
  if(!('speechSynthesis' in window)){
    return; // браузер не поддерживает озвучку — просто ничего не делаем
  }
  window.speechSynthesis.cancel(); // остановить предыдущую озвучку, если была

  var lang = document.documentElement.getAttribute('data-current') || 'ru';
  var utter = new SpeechSynthesisUtterance(text);
  utter.lang = LANG_TO_SPEECH_CODE[lang] || 'ru-RU';
  utter.rate = 0.95;

  if(btn){
    btn.classList.add('speaking');
    utter.onend = function(){ btn.classList.remove('speaking'); };
    utter.onerror = function(){ btn.classList.remove('speaking'); };
  }

  window.speechSynthesis.speak(utter);
}

function initSpeakButton(buttonId, textKey){
  var btn = document.getElementById(buttonId);
  if(!btn) return;
  btn.addEventListener('click', function(){
    var lang = document.documentElement.getAttribute('data-current') || 'ru';
    var text = (typeof translations !== 'undefined' && translations[lang] && translations[lang][textKey])
      ? translations[lang][textKey]
      : '';
    if(text) speakText(text, btn);
  });
}

function initStartGameButton(startBtnId, explainPanelId, gameRootId, gameInitFn){
  var startBtn = document.getElementById(startBtnId);
  if(!startBtn) return;
  startBtn.addEventListener('click', function(){
    document.getElementById(explainPanelId).style.display = 'none';
    document.getElementById(gameRootId).style.display = 'block';
    if(typeof gameInitFn === 'function') gameInitFn();
  });
}
