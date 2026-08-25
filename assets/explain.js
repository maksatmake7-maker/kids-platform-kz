/* ===== Білім Аралы — озвучка объяснений =====

   Два режима работы, автоматически:
   1) Если рядом лежит готовый mp3-файл озвучки — проигрывается он
      (например, сгенерированный через ElevenLabs — качество намного
      лучше встроенного голоса браузера).
   2) Если файла нет — используется встроенный в браузер синтезатор
      речи (Web Speech API). Работает без единого файла, но голос
      звучит более механически, особенно на казахском/узбекском/
      таджикском/уйгурском (для этих языков не всегда есть системный
      голос на устройстве пользователя).

   СОГЛАШЕНИЕ ОБ ИМЕНАХ ФАЙЛОВ (если будете добавлять mp3):
   assets/audio/<textKey>-<lang>.mp3
   Например: assets/audio/count_explain-ru.mp3
             assets/audio/count_explain-kz.mp3
             assets/audio/count_explain-uz.mp3
   textKey — это ключ из i18n.js (например "count_explain"),
   lang — код языка (ru, kz, en, zh, uz, tg, ug).
   Как только такой файл появляется в репозитории — сайт начинает
   использовать его автоматически, без изменений в коде.
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

function speakWithBrowserTTS(text, btn){
  if(!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

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

/**
 * buttonId — id кнопки озвучки
 * textKey — ключ из i18n.js с текстом для озвучки
 * audioBasePath — относительный путь к папке assets/audio/ от текущей
 *                  страницы (например '../../../assets/audio/').
 *                  Если не передать — сразу используется голос браузера.
 */
function initSpeakButton(buttonId, textKey, audioBasePath){
  var btn = document.getElementById(buttonId);
  if(!btn) return;

  btn.addEventListener('click', function(){
    var lang = document.documentElement.getAttribute('data-current') || 'ru';
    var text = (typeof translations !== 'undefined' && translations[lang] && translations[lang][textKey])
      ? translations[lang][textKey]
      : '';
    if(!text) return;

    if(!audioBasePath){
      speakWithBrowserTTS(text, btn);
      return;
    }

    var audio = new Audio(audioBasePath + textKey + '-' + lang + '.mp3');
    btn.classList.add('speaking');

    audio.addEventListener('ended', function(){ btn.classList.remove('speaking'); });
    audio.addEventListener('error', function(){
      // готового файла нет — переходим на встроенный синтезатор
      btn.classList.remove('speaking');
      speakWithBrowserTTS(text, btn);
    });

    var playPromise = audio.play();
    if(playPromise && playPromise.catch){
      playPromise.catch(function(){
        btn.classList.remove('speaking');
        speakWithBrowserTTS(text, btn);
      });
    }
  });
}

function initStartGameButton(startBtnId, explainPanelId, gamePanelId, gameInitFn){
  var startBtn = document.getElementById(startBtnId);
  if(!startBtn) return;
  startBtn.addEventListener('click', function(){
    document.getElementById(explainPanelId).style.display = 'none';
    document.getElementById(gamePanelId).style.display = 'block';
    if(typeof gameInitFn === 'function') gameInitFn();
  });
}
