/* ===== Белый экран «Что мы будем делать?» → яркая заставка с Барсиком =====
   Не трогает страницы: при загрузке красит блок #explain-panel, прячет длинный текст и старый (женский) «Озвучить»,
   оставляет прежнюю кнопку «Играть» — она уже подключена страницей.
*/
(function(){
  var CSS = ''
  + '.game-card.mxh{position:relative;overflow:hidden;border:4px solid #fff;border-radius:30px;box-shadow:0 10px 0 rgba(0,0,0,.2),0 18px 40px rgba(0,0,0,.25);padding:18px 16px 24px;text-align:center;}'
  + '.mxh-market{background:linear-gradient(#6FD0FF 0%,#C5EEFF 55%,#FFEBB0 100%);}'
  + '.mxh-sky{background:linear-gradient(#4DB8FF 0%,#B7E8FF 70%,#E6F9FF 100%);}'
  + '.mxh-night{background:linear-gradient(#141A5C 0%,#3B2C8F 60%,#7A4FB8 100%);}'
  + '.mxh-garden{background:linear-gradient(#8EDDA0 0%,#C9F2B4 55%,#FFF2A8 100%);}'
  + '.mxh-ocean{background:linear-gradient(#2FB7D6 0%,#86E0EC 62%,#F5E6B0 100%);}'
  + '.mxh-sunset{background:linear-gradient(#5B4FB8 0%,#E0607E 48%,#FFB46B 100%);}'
  + '.mxh-candy{background:linear-gradient(#FF9ED8 0%,#FFC8E8 55%,#FFE9F5 100%);}'
  + '.mxh-pond{background:linear-gradient(#58C6B5 0%,#A8E6CF 60%,#DDF6D2 100%);}'
  + '.mxh-forest{background:linear-gradient(#5FBF7F 0%,#A5DE9B 55%,#F2F7B2 100%);}'
  + '.mxh-workshop{background:linear-gradient(#FBE3B5 0%,#F2C888 55%,#DDA766 100%);}'
  + '.mxh-snow{background:linear-gradient(#7FBCEB 0%,#BFE3FA 55%,#F4FBFF 100%);}'
  + '.mxh-space{background:linear-gradient(#070B2E 0%,#241A68 58%,#5A2E9C 100%);}'
  + '.mxh-rainbow{background:linear-gradient(#FF9EC7 0%,#FFD98A 40%,#A5E9D8 75%,#8FD0FF 100%);}'
  + '.mxh-play{background:linear-gradient(#FFD36B 0%,#FFB067 55%,#FF8E75 100%);}'
  + '.mxh .explain-heading,.mxh .explain-text,.mxh #speak-btn,.mxh .speak-btn{display:none !important;}'
  + '.mxh-bs{width:min(210px,60%);margin:0 auto -6px;}'
  + '.mxh-title{font:800 1.9rem "Baloo 2",sans-serif;color:#25324A;background:#fff;display:inline-block;border-radius:22px;padding:6px 20px;box-shadow:0 5px 0 rgba(0,0,0,.16);margin:4px 0 14px;}'
  + '.mxh-how{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:18px;}'
  + '.mxh-chip{width:64px;height:64px;border-radius:20px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:2.2rem;box-shadow:0 5px 0 rgba(0,0,0,.16);}'
  + '.mxh-arrow{font:800 1.6rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.3);}'
  + '.mxh .explain-actions{display:flex;justify-content:center;margin:0;}'
  + '.mxh #start-game-btn{font-size:1.7rem;padding:16px 46px;animation:mxhPulse 1.6s ease-in-out infinite;}'
  + '@keyframes mxhPulse{50%{transform:scale(1.07)}}'
  + '@media (prefers-reduced-motion:reduce){.mxh *{animation:none !important;}}';
  function init(){
    var cfg = window.__mxHeroCfg, p = document.getElementById('explain-panel');
    if(!cfg || !p || p.classList.contains('mxh')) return;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
    p.classList.add('mxh', 'mxh-' + cfg.theme);
    var h1 = document.querySelector('#game-panel h1'), key = h1 && h1.getAttribute('data-i18n');
    var L = document.documentElement.getAttribute('data-current') || 'ru';
    var tx = (key && typeof translations !== 'undefined' && translations[L] && translations[L][key]) || (h1 ? h1.textContent : '');
    var chips = cfg.icons.map(function(e){ return '<span class="mxh-chip">' + e + '</span>'; }).join('<span class="mxh-arrow">›</span>');
    var wrap = document.createElement('div');
    wrap.innerHTML = '<div class="mxh-bs"></div><div class="mxh-title"' + (key ? ' data-i18n="' + key + '"' : '') + '>' + tx + '</div><div class="mxh-how">' + chips + '</div>';
    var ref = p.firstChild;
    [].slice.call(wrap.children).forEach(function(e){ p.insertBefore(e, ref); });
    if(window.Barsik){ try { Barsik.mount(p.querySelector('.mxh-bs'), {state:'wave'}); } catch(e){} }
  }
  window.MXHero = { init:init };
})();
