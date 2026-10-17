/* ===== Білім Аралы — движок «Приключения Барсика» (игры по математике, 1 класс) =====
   Цветная сцена + живой Барсик + озвучка + звуки. Задания разные по механике:
   «класть в корзину», «лопать шарики», «посчитать касанием», «ловить шарик с ответом», «качели-весы», «прыжки по числам».
   Режим освоения: нужно пройти 10 заданий ПОДРЯД без ошибки (ошибка — разбор и начинаем тропу заново).
   Три уровня (⭐ ⭐⭐ ⭐⭐⭐); за новый уровень — стикер, в конце — сундук с сокровищем.
   Задания без слов (цифры, знаки, картинки), слова говорит Барсик (mathx-voice.js).
*/
(function(){
  var EMOJIS = ['🍎','🍐','🍓','🍊','🍪','🐟','🦋','🚗','⚽','🐥'];
  var BALLOON_COLORS = ['#FF6B5B','#FFB400','#3FA7FF','#9B6BFF','#33C28A','#FF7EB6'];
  var STICKERS = ['🦁','🐘','🦒','🐼','🦊','🐸','🐙','🦄','🐢','🦋','🐬','🦉'];

  function rnd(a,b){ return a + Math.floor(Math.random()*(b-a+1)); }
  function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
  function shuffle(a){ a = a.slice(); for(var j=a.length-1;j>0;j--){ var k=Math.floor(Math.random()*(j+1)); var t=a[j]; a[j]=a[k]; a[k]=t; } return a; }
  function msgs(){ var l = document.documentElement.getAttribute('data-current') || 'ru'; return (typeof translations !== 'undefined' && translations[l]) ? translations[l] : {}; }

  /* ---------- звуки (синтез, без файлов) ---------- */
  var AC = null;
  function ac(){
    if(!AC){ try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){} }
    if(AC && AC.state === 'suspended'){ try { AC.resume(); } catch(e){} }
    return AC;
  }
  function tone(f, t0, dur, type, vol, slide){
    var c = ac(); if(!c || !(window.MXV && MXV.enabled())) return;
    var o = c.createOscillator(), g = c.createGain(), t = c.currentTime + (t0||0);
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
    if(slide) o.frequency.exponentialRampToValueAtTime(slide, t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || .18, t + .015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + .03);
  }
  var SFX = {
    tap: function(i){ tone(440 + (i||0)*38, 0, .13, 'triangle', .2); },
    drop: function(){ tone(420, 0, .16, 'sine', .22, 170); },
    pop: function(){ tone(900, 0, .09, 'square', .12, 200); tone(300, 0, .12, 'sawtooth', .06, 90); },
    ok: function(){ [523,659,784,1047].forEach(function(f,i){ tone(f, i*.09, .22, 'triangle', .2); }); },
    no: function(){ tone(230, 0, .22, 'sawtooth', .13, 150); tone(170, .2, .3, 'sawtooth', .12, 110); },
    up: function(){ [392,523,659,784,1047].forEach(function(f,i){ tone(f, i*.1, .28, 'square', .1); }); },
    win: function(){ [523,659,784,1047,784,1047,1319].forEach(function(f,i){ tone(f, i*.12, .3, 'triangle', .2); }); },
    hop: function(){ tone(300, 0, .14, 'sine', .2, 620); }
  };

  /* ---------- стили ---------- */
  var CSS = ''
  + '.game-card.mx-imm{background:none;box-shadow:none;border:none;padding:0;}'
  + '.mx-imm h1{color:#fff;text-shadow:0 3px 0 rgba(0,0,0,.25);text-align:center;margin-bottom:10px;}'
  + '.mx-imm .game-sub,.mx-imm .game-meta{display:none;}'
  + '.mxs{position:relative;overflow:hidden;contain:layout paint;max-width:560px;margin:0 auto;border-radius:30px;border:4px solid #fff;box-shadow:0 10px 0 rgba(0,0,0,.2),0 18px 40px rgba(0,0,0,.25);min-height:640px;display:flex;flex-direction:column;font-family:"Nunito",sans-serif;color:#25324A;user-select:none;-webkit-user-select:none;}'
  + '.mxs>*{position:relative;z-index:2;}'
  + '.mxs-decor,.mxs-ground{position:absolute !important;left:0;right:0;pointer-events:none;z-index:1 !important;}'
  + '.mxs-decor{top:0;bottom:0;}'
  + '.mxs-ground{bottom:0;height:64px;}'
  /* темы */
  + '.mxs-market{background:linear-gradient(#6FD0FF 0%,#C5EEFF 46%,#FFEBB0 100%);}'
  + '.mxs-market .mxs-ground{background:repeating-linear-gradient(90deg,#B9773A 0 70px,#A9682E 70px 72px),linear-gradient(#C98B4B,#A8692F);border-top:6px solid #8E5622;}'
  + '.mxs-market .mxs-decor:before{content:"";position:absolute;top:0;left:0;right:0;height:46px;background:repeating-linear-gradient(90deg,#FF5A4A 0 34px,#fff 34px 68px);-webkit-mask:radial-gradient(circle 17px at 17px 100%,transparent 96%,#000 100%) 0 0/34px 100% repeat-x;mask:radial-gradient(circle 17px at 17px 100%,transparent 96%,#000 100%) 0 0/34px 100% repeat-x;;}'
  + '.mxs-sky{background:linear-gradient(#4DB8FF 0%,#B7E8FF 70%,#E6F9FF 100%);}'
  + '.mxs-sky .mxs-ground{height:90px;background:radial-gradient(120% 100% at 20% 100%,#5BCB6E 58%,transparent 59%),radial-gradient(120% 100% at 85% 100%,#3FB45A 55%,transparent 56%);}'
  + '.mxs-night{background:linear-gradient(#141A5C 0%,#3B2C8F 60%,#7A4FB8 100%);}'
  + '.mxs-night .mxs-ground{height:80px;background:radial-gradient(130% 100% at 15% 100%,#241A5E 58%,transparent 59%),radial-gradient(130% 100% at 90% 100%,#2E2272 55%,transparent 56%);}'
  + '.mxs-play{background:linear-gradient(#FFD36B 0%,#FFB067 55%,#FF8E75 100%);}'
  + '.mxs-play .mxs-ground{height:80px;background:radial-gradient(130% 100% at 30% 100%,#6BD36E 58%,transparent 59%),radial-gradient(130% 100% at 95% 100%,#4DBE62 55%,transparent 56%);}'
  + '.mxs-cloud{position:absolute;width:90px;height:30px;border-radius:30px;background:#fff;opacity:.9;animation:mxDrift linear infinite;}'
  + '.mxs-cloud:before,.mxs-cloud:after{content:"";position:absolute;background:#fff;border-radius:50%;}'
  + '.mxs-cloud:before{width:38px;height:38px;left:12px;top:-18px;}.mxs-cloud:after{width:28px;height:28px;left:44px;top:-12px;}'
  + '.mxs-star{position:absolute;width:4px;height:4px;border-radius:50%;background:#fff;animation:mxTw 2.4s ease-in-out infinite;}'
  + '.mxs-sun{position:absolute;right:16px;top:58px;font-size:2.6rem;animation:mxSpin 30s linear infinite;}'
  + '@keyframes mxDrift{from{transform:translateX(-140px)}to{transform:translateX(640px)}}'
  + '@keyframes mxTw{0%,100%{opacity:.25;transform:scale(.7)}50%{opacity:1;transform:scale(1.5)}}'
  + '@keyframes mxSpin{to{transform:rotate(360deg)}}'
  /* верхняя панель */
  + '.mxs-top{display:flex;align-items:center;gap:8px;padding:56px 12px 6px;}'
  + '.mxs-garden{background:linear-gradient(#8EDDA0 0%,#C9F2B4 55%,#FFF2A8 100%);}'
  + '.mxs-garden .mxs-ground{height:84px;background:radial-gradient(120% 100% at 18% 100%,#3FB45A 58%,transparent 59%),radial-gradient(120% 100% at 88% 100%,#5BCB6E 55%,transparent 56%);}'
  + '.mxs-ocean{background:linear-gradient(#2FB7D6 0%,#86E0EC 62%,#F5E6B0 100%);}'
  + '.mxs-ocean .mxs-ground{height:70px;background:radial-gradient(120% 100% at 25% 100%,#F2D78A 58%,transparent 59%),radial-gradient(120% 100% at 92% 100%,#E9C872 55%,transparent 56%);}'
  + '.mxs-sunset{background:linear-gradient(#5B4FB8 0%,#E0607E 48%,#FFB46B 100%);}'
  + '.mxs-sunset .mxs-ground{height:76px;background:radial-gradient(130% 100% at 20% 100%,#3A2C77 58%,transparent 59%),radial-gradient(130% 100% at 90% 100%,#4A3688 55%,transparent 56%);}'
  + '.mxs-candy{background:linear-gradient(#FF9ED8 0%,#FFC8E8 55%,#FFE9F5 100%);}'
  + '.mxs-candy .mxs-ground{height:80px;background:radial-gradient(120% 100% at 22% 100%,#C78BFF 58%,transparent 59%),radial-gradient(120% 100% at 90% 100%,#A66BE0 55%,transparent 56%);}'
  + '.mxs-pond{background:linear-gradient(#58C6B5 0%,#A8E6CF 60%,#DDF6D2 100%);}'
  + '.mxs-pond .mxs-ground{height:74px;background:radial-gradient(120% 100% at 18% 100%,#2E9E7A 58%,transparent 59%),radial-gradient(120% 100% at 88% 100%,#3DB88C 55%,transparent 56%);}'
  + '.mxs-forest{background:linear-gradient(#5FBF7F 0%,#A5DE9B 55%,#F2F7B2 100%);}'
  + '.mxs-forest .mxs-ground{height:84px;background:radial-gradient(120% 100% at 15% 100%,#1F7A4D 58%,transparent 59%),radial-gradient(120% 100% at 85% 100%,#2A9060 55%,transparent 56%);}'
  + '.mxs-workshop{background:linear-gradient(#FBE3B5 0%,#F2C888 55%,#DDA766 100%);}'
  + '.mxs-workshop .mxs-ground{height:78px;background:radial-gradient(130% 100% at 20% 100%,#9A6330 58%,transparent 59%),radial-gradient(130% 100% at 92% 100%,#B07A3E 55%,transparent 56%);}'
  + '.mxs-snow{background:linear-gradient(#7FBCEB 0%,#BFE3FA 55%,#F4FBFF 100%);}'
  + '.mxs-snow .mxs-ground{height:80px;background:radial-gradient(130% 100% at 22% 100%,#FFFFFF 58%,transparent 59%),radial-gradient(130% 100% at 90% 100%,#DCEEFA 55%,transparent 56%);}'
  + '.mxs-space{background:linear-gradient(#070B2E 0%,#241A68 58%,#5A2E9C 100%);}'
  + '.mxs-space .mxs-ground{height:74px;background:radial-gradient(130% 100% at 18% 100%,#33246F 58%,transparent 59%),radial-gradient(130% 100% at 90% 100%,#41308A 55%,transparent 56%);}'
  + '.mxs-space .mxs-plus{color:#FFE27A;}'
  + '.mxs-flake{position:absolute;top:-20px;color:#fff;opacity:.9;font-size:1rem;animation:mxFall linear infinite;}'
  + '@keyframes mxFall{from{transform:translateY(0) rotate(0)}to{transform:translateY(640px) rotate(240deg)}}'
  + '.mxs-rainbow{background:linear-gradient(#FF9EC7 0%,#FFD98A 40%,#A5E9D8 75%,#8FD0FF 100%);}'
  + '.mxs-rainbow .mxs-ground{height:76px;background:radial-gradient(130% 100% at 20% 100%,#7E6BD6 58%,transparent 59%),radial-gradient(130% 100% at 90% 100%,#9A82E8 55%,transparent 56%);}'
  + '.mxs-meadow{background:linear-gradient(#8FD8F2 0%,#C9F0A8 52%,#FFF2A0 100%);}'
  + '.mxs-meadow .mxs-ground{height:80px;background:radial-gradient(130% 100% at 20% 100%,#4FB85A 58%,transparent 59%),radial-gradient(130% 100% at 92% 100%,#6CCB6C 55%,transparent 56%);}'
  + '.mxs-greenhouse{background:linear-gradient(#6FD3C2 0%,#BDEFE0 55%,#F2FFF0 100%);}'
  + '.mxs-greenhouse .mxs-ground{height:78px;background:radial-gradient(130% 100% at 22% 100%,#8A5A34 58%,transparent 59%),radial-gradient(130% 100% at 90% 100%,#A06C40 55%,transparent 56%);}'
  + '.mxs-farm{background:linear-gradient(#7FCBFF 0%,#CFEBFF 50%,#F5E2A8 100%);}'
  + '.mxs-farm .mxs-ground{height:80px;background:radial-gradient(130% 100% at 18% 100%,#E0B15A 58%,transparent 59%),radial-gradient(130% 100% at 90% 100%,#C9963F 55%,transparent 56%);}'
  + '.mxs-autumn{background:linear-gradient(#F59A4B 0%,#F8C979 55%,#FCEBC0 100%);}'
  + '.mxs-autumn .mxs-ground{height:78px;background:radial-gradient(130% 100% at 20% 100%,#B5652A 58%,transparent 59%),radial-gradient(130% 100% at 90% 100%,#9A4E1E 55%,transparent 56%);}'
  /* сортировка по корзинам */
  + '.mxs-sort{display:flex;flex-direction:column;align-items:center;gap:14px;width:min(100%,330px);}'
  + '.mxs-sits{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;min-height:70px;}'
  + '.mxs-sit{width:64px;height:64px;border-radius:18px;border:3px solid transparent;background:#fff;box-shadow:0 4px 0 rgba(0,0,0,.18);font-size:2.2rem;line-height:1;display:flex;align-items:center;justify-content:center;cursor:pointer;animation:mxIn .35s backwards;padding:0;}'
  + '.mxs-sit svg{width:46px;height:46px;}'
  + '.mxs-sit.sel{border-color:#FFB400;transform:translateY(-6px) scale(1.08);box-shadow:0 10px 0 rgba(0,0,0,.2);}'
  + '.mxs-bks{display:flex;gap:10px;width:100%;}'
  + '.mxs-bk{flex:1;min-height:108px;border-radius:20px;border:none;padding:6px 4px;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:3px;font:800 .95rem/1.1 "Baloo 2",sans-serif;color:#fff;box-shadow:inset 0 -6px 0 rgba(0,0,0,.16),0 5px 0 rgba(0,0,0,.2);text-shadow:0 2px 0 rgba(0,0,0,.18);}'
  + '.mxs-bk .t{font-size:1.5rem;line-height:1;}.mxs-bks.n3 .mxs-bk{font-size:.78rem;}'
  + '.mxs-bk .got{display:flex;flex-wrap:wrap;gap:2px;justify-content:center;}'
  + '.mxs-bk .got span{background:#fff;border-radius:10px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:1.25rem;animation:mxIn .3s;text-shadow:none;}'
  + '.mxs-bk .got span svg{width:24px;height:24px;}'
  + '.mxs-night .mxs-top,.mxs-sky .mxs-top,.mxs-play .mxs-top,.mxs-garden .mxs-top,.mxs-ocean .mxs-top,.mxs-sunset .mxs-top,.mxs-candy .mxs-top,.mxs-pond .mxs-top,.mxs-forest .mxs-top,.mxs-workshop .mxs-top,.mxs-snow .mxs-top,.mxs-space .mxs-top,.mxs-rainbow .mxs-top,.mxs-meadow .mxs-top,.mxs-greenhouse .mxs-top,.mxs-farm .mxs-top,.mxs-autumn .mxs-top{padding-top:14px;}'
  + '.mxs-trail{flex:1 1 0;min-width:0;display:flex;align-items:center;gap:4px;background:rgba(255,255,255,.75);border-radius:999px;padding:6px 10px;box-shadow:0 3px 0 rgba(0,0,0,.12);}'
  + '.mxs-step{flex:1 1 0;min-width:0;overflow:hidden;height:18px;border-radius:9px;background:#D7E3F1;display:flex;align-items:center;justify-content:center;font-size:.8rem;transition:background .3s,transform .3s;}'
  + '.mxs-step.on{background:linear-gradient(#5BE3A4,#2FBF80);transform:scale(1.08);}'
  + '.mxs-step.on:after{content:"🐾";}'
  + '.mxs-chest{font-size:1.5rem;line-height:1;margin-left:2px;}'
  + '.mxs-lv{flex:none;background:#fff;border-radius:999px;padding:4px 10px;font-size:1rem;box-shadow:0 3px 0 rgba(0,0,0,.12);white-space:nowrap;}'
  + '.mxs-snd{flex:none;width:38px;height:38px;border-radius:50%;border:none;background:#fff;font-size:1.1rem;box-shadow:0 3px 0 rgba(0,0,0,.12);cursor:pointer;}'
  /* Барсик и реплика */
  + '.mxs-speak{display:flex;align-items:flex-end;gap:6px;padding:4px 12px 0;}'
  + '.mxs-bs{width:104px;flex:none;margin-bottom:-6px;cursor:pointer;}'
  + '.mxs-bubble{position:relative;flex:1;min-width:0;background:#fff;border-radius:24px 24px 24px 6px;padding:8px 50px 8px 12px;min-height:62px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;box-shadow:0 5px 0 rgba(0,0,0,.12);}'
  + '.mxs-bubble:before{content:"";position:absolute;left:-9px;bottom:10px;border:9px solid transparent;border-right-color:#fff;border-left:0;}'
  + '.mxs-cap{font:800 1.1rem "Nunito",sans-serif;color:#2D3A55;text-align:center;line-height:1.15;}.mxs-cap:empty{display:none;}'
  + '.mxs-expr{font-family:"Baloo 2",sans-serif;font-weight:800;font-size:2.1rem;line-height:1.1;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:4px 10px;text-align:center;}'
  + '.mxs-expr .q{display:inline-flex;align-items:center;justify-content:center;min-width:44px;height:44px;border-radius:12px;background:#FF6B5B;color:#fff;font-size:1.7rem;padding:0 6px;box-shadow:0 3px 0 #D9483A;}'
  + '.mxs-expr .ok{color:#1FA672;}'
  + '.mxs-expr.s{font-size:1.5rem;}'
  + '.mxs-replay{position:absolute;right:8px;top:8px;width:34px;height:34px;border-radius:50%;border:none;background:#FFB400;color:#fff;font-size:1rem;box-shadow:0 3px 0 #D18F00;cursor:pointer;}'
  /* поле задания */
  + '.mxs-field{flex:1;min-height:210px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:10px 12px;}'
  + '.mxs-grp{display:flex;flex-wrap:wrap;gap:4px 6px;justify-content:center;max-width:300px;}'
  + '.mxs-o{font-size:2.3rem;line-height:1.05;text-shadow:0 3px 0 rgba(0,0,0,.16);animation:mxIn .4s cubic-bezier(.3,1.6,.5,1) backwards;}'
  + '.mxs-o.sm{font-size:1.7rem;}'
  + '@keyframes mxIn{0%{transform:scale(0) rotate(-30deg);opacity:0}100%{transform:scale(1) rotate(0);opacity:1}}'
  + '.mxs-row{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px 14px;}'
  + '.mxs-plus{font-family:"Baloo 2",sans-serif;font-weight:800;font-size:2.2rem;color:#fff;text-shadow:0 3px 0 rgba(0,0,0,.25);}'
  + '.mxs-night .mxs-plus{color:#FFE27A;}'
  /* корзина */
  + '.mxs-basketwrap{position:relative;width:min(100%,290px);margin-top:34px;}'
  + '.mxs-basketwrap:before{content:"";position:absolute;left:14%;right:14%;top:-34px;height:60px;border:9px solid #B9772F;border-bottom:none;border-radius:70px 70px 0 0;}'
  + '.mxs-basket{position:relative;min-height:104px;border-radius:14px 14px 70px 70px / 14px 14px 50px 50px;padding:10px 12px 22px;display:flex;flex-wrap:wrap;gap:2px 4px;justify-content:center;align-content:flex-start;background:linear-gradient(rgba(255,244,214,.82),rgba(255,244,214,.82)),repeating-linear-gradient(45deg,#D9A25B 0 8px,#C58B43 8px 16px);border:4px solid #B9772F;box-shadow:0 6px 0 #8E5622;}'
  + '.mxs-basket .mxs-o{font-size:1.9rem;}'
  + '.mxs-basket .mxs-o.pre{opacity:.6;}'
  + '.mxs-cnt{position:absolute;right:-10px;top:-14px;min-width:46px;height:46px;border-radius:50%;background:#FF6B5B;color:#fff;font:800 1.6rem "Baloo 2",sans-serif;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 4px 0 rgba(0,0,0,.2);z-index:3;}'
  + '.mxs-cnt.bump{animation:mxBump .3s ease;}'
  + '@keyframes mxBump{50%{transform:scale(1.35)}}'
  + '.mxs-shelf{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:320px;padding:8px 10px;border-radius:18px;background:rgba(255,255,255,.5);}'
  + '.mxs-item{border:none;background:none;padding:2px;font-size:2.1rem;line-height:1;cursor:pointer;text-shadow:0 3px 0 rgba(0,0,0,.18);transition:transform .12s;-webkit-tap-highlight-color:transparent;}'
  + '.mxs-item:active{transform:scale(.85);}'
  + '.mxs-item.gone{visibility:hidden;}'
  + '.mxs-go{margin-top:4px;border:none;border-radius:999px;padding:10px 26px;background:linear-gradient(#5BE3A4,#2FBF80);color:#fff;font:800 1.5rem "Baloo 2",sans-serif;box-shadow:0 5px 0 #1F8F5F;cursor:pointer;}'
  + '.mxs-go:active{transform:translateY(3px);box-shadow:0 2px 0 #1F8F5F;}'
  /* счёт касанием, шарики для лопанья */
  + '.mxs-scatter{position:relative;width:min(100%,320px);height:190px;}'
  + '.mxs-tapobj{position:absolute;border:none;background:none;font-size:2.2rem;line-height:1;padding:0;cursor:pointer;text-shadow:0 3px 0 rgba(0,0,0,.18);transition:transform .15s;-webkit-tap-highlight-color:transparent;}'
  + '.mxs-tapobj.on{transform:scale(1.25);text-shadow:0 0 10px #FFE27A,0 0 4px #FFE27A;}'
  + '.mxs-tapobj .no{position:absolute;left:50%;top:-12px;transform:translateX(-50%);background:#FF6B5B;color:#fff;border-radius:50%;min-width:22px;height:22px;font:800 .85rem "Baloo 2",sans-serif;display:flex;align-items:center;justify-content:center;animation:mxIn .25s backwards;}'
  + '.mxs-bigcount{font:800 2.6rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 3px 0 rgba(0,0,0,.3);min-height:1.2em;}'
  + '.mxs-pb{position:absolute;border:none;padding:0;background:none;cursor:pointer;width:54px;height:70px;animation:mxBob 3s ease-in-out infinite alternate;-webkit-tap-highlight-color:transparent;}'
  + '.mxs-pb:before{content:"";position:absolute;left:0;right:0;top:0;height:54px;border-radius:50% 50% 48% 48%/58% 58% 42% 42%;background:radial-gradient(circle at 32% 28%,rgba(255,255,255,.75) 0 12%,transparent 13%),var(--bc);box-shadow:inset -5px -6px 0 rgba(0,0,0,.14);}'
  + '.mxs-pb:after{content:"";position:absolute;left:50%;top:54px;width:2px;height:16px;background:rgba(255,255,255,.85);}'
  + '.mxs-pb.pop{animation:mxPop .3s forwards;}'
  + '.mxs-pb.fly{animation:mxFly 1.4s ease-in forwards;}'
  + '@keyframes mxFly{to{transform:translateY(-260px) rotate(8deg);opacity:0}}'
  /* прыжки по числам */
  + '.mxs-tiles{position:relative;display:flex;gap:3px;justify-content:center;padding-top:44px;}'
  + '.mxs-tile{width:27px;height:38px;border-radius:9px;background:#fff;font:800 1.05rem "Baloo 2",sans-serif;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 0 rgba(0,0,0,.18);transition:background .2s,transform .2s;}'
  + '.mxs-tile.hit{background:#FFE27A;transform:translateY(-4px);}'
  + '.mxs-tile.end{background:#5BE3A4;}'
  + '.mxs-hopper{position:absolute;top:0;left:0;font-size:1.9rem;line-height:1;transition:left .32s ease-in-out,top .16s;}'
  /* качели */
  + '.mxs-see{position:relative;width:min(100%,320px);height:190px;}'
  + '.mxs-plank{position:absolute;left:4%;right:4%;top:84px;height:12px;border-radius:7px;background:linear-gradient(#FFD36B,#E0A030);box-shadow:0 4px 0 #B8791A;transition:transform 1.1s cubic-bezier(.3,1.5,.5,1);transform-origin:50% 50%;}'
  + '.mxs-fulcrum{position:absolute;left:50%;top:92px;transform:translateX(-50%);width:0;height:0;border-left:34px solid transparent;border-right:34px solid transparent;border-bottom:70px solid #7A5AD6;}'
  + '.mxs-pan{position:absolute;bottom:104px;width:46%;min-height:60px;display:flex;flex-wrap:wrap;gap:2px;justify-content:center;align-items:flex-end;}'
  + '.mxs-pan.l{left:0;}.mxs-pan.r{right:0;}'
  + '.mxs-pan .mxs-o{font-size:1.35rem;animation:none;}'
  + '.mxs-wt{background:#fff;border-radius:12px;padding:4px 12px;font:800 1.7rem "Baloo 2",sans-serif;box-shadow:0 3px 0 rgba(0,0,0,.18);}'
  /* десятковые рамки */
  + '.mxs-frames{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;}'
  + '.mxs-frame{display:grid;grid-template-columns:repeat(5,34px);gap:4px;padding:6px;background:rgba(255,255,255,.7);border-radius:14px;box-shadow:0 4px 0 rgba(0,0,0,.14);}'
  + '.mxs-cell{width:34px;height:34px;border-radius:9px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:1.35rem;}'
  /* ответы-шарики */
  + '.mxs-ans{display:flex;flex-wrap:wrap;justify-content:center;gap:2px 12px;padding:12px 10px 74px;min-height:150px;}'
  + '.mxs-ans.sym{gap:2px 18px;}'
  + '.mxs-balloon{position:relative;width:84px;height:112px;border:none;background:none;padding:0;cursor:pointer;animation:mxBob 3s ease-in-out infinite alternate;animation-delay:var(--d,0s);-webkit-tap-highlight-color:transparent;}'
  + '.mxs-balloon .b{position:absolute;left:0;right:0;top:0;height:88px;border-radius:50% 50% 48% 48%/58% 58% 42% 42%;background:radial-gradient(circle at 32% 26%,rgba(255,255,255,.8) 0 10%,transparent 11%),var(--bc);box-shadow:inset -8px -10px 0 rgba(0,0,0,.14),0 6px 0 rgba(0,0,0,.08);display:flex;align-items:center;justify-content:center;font:800 2.1rem "Baloo 2",sans-serif;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.28);transition:transform .15s;}'
  + '.mxs-balloon:hover .b{transform:scale(1.06);}'
  + '.mxs-balloon:before{content:"";position:absolute;left:50%;top:86px;margin-left:-6px;border:6px solid transparent;border-bottom:8px solid var(--bc);border-top:0;}'
  + '.mxs-balloon:after{content:"";position:absolute;left:50%;top:92px;width:2px;height:22px;background:rgba(255,255,255,.85);}'
  + '.mxs-balloon.wide{width:116px;}'
  + '.mxs-balloon.wide .b{background:radial-gradient(circle at 11% 24%,rgba(255,255,255,.8) 0 4.5%,transparent 5.5%),var(--bc);}'
  + '.mxs-balloon.wide .b{font-size:1.5rem;border-radius:46px;height:70px;top:6px;}'
  + '.mxs-balloon.wide:before{top:74px;}.mxs-balloon.wide:after{top:80px;}'
  + '.mxs-balloon.pop{animation:mxPop .32s forwards;}'
  + '.mxs-balloon.bad{animation:mxShake .4s;filter:grayscale(1);opacity:.55;pointer-events:none;}'
  + '.mxs-balloon[disabled]{pointer-events:none;}'
  + '@keyframes mxBob{from{transform:translateY(0) rotate(-2deg)}to{transform:translateY(-9px) rotate(2deg)}}'
  + '@keyframes mxPop{0%{transform:scale(1)}40%{transform:scale(1.35)}100%{transform:scale(1.9);opacity:0}}'
  + '@keyframes mxShake{25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}'
  /* разбор после ошибки */
  + '.mxs-hintcard{width:100%;max-width:400px;background:#FFF8E1;border:3px dashed #F2C66B;border-radius:22px;padding:12px;display:flex;flex-direction:column;align-items:center;gap:10px;animation:mxIn .35s backwards;}'
  + '.mxs-next{border:none;border-radius:999px;padding:9px 24px;background:linear-gradient(#5BE3A4,#2FBF80);color:#fff;font:800 1.3rem "Baloo 2",sans-serif;box-shadow:0 4px 0 #1F8F5F;cursor:pointer;}'
  /* эффекты */
  + '.mxs-fx{position:absolute !important;inset:0;pointer-events:none;z-index:6 !important;overflow:hidden;}'
  + '.mxs-conf{position:absolute;font-size:1.4rem;will-change:transform,opacity;}'
  + '.mxs-banner{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);background:#fff;border-radius:28px;padding:16px 26px;text-align:center;font:800 1.5rem "Baloo 2",sans-serif;box-shadow:0 8px 0 rgba(0,0,0,.2);animation:mxBan 2.2s ease forwards;white-space:nowrap;}'
  + '.mxs-banner .big{font-size:3.2rem;display:block;line-height:1.1;}'
  + '@keyframes mxBan{0%{transform:translate(-50%,-50%) scale(0)}12%{transform:translate(-50%,-50%) scale(1.15)}20%{transform:translate(-50%,-50%) scale(1)}80%{opacity:1}100%{transform:translate(-50%,-70%) scale(1);opacity:0}}'
  /* финал */
  + '.mxs-win{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:20px;text-align:center;}'
  + '.mxs-chestbig{font-size:6rem;line-height:1;animation:mxShakeC .6s ease 3;}'
  + '@keyframes mxShakeC{0%,100%{transform:rotate(0)}25%{transform:rotate(-8deg)}75%{transform:rotate(8deg)}}'
  + '.mxs-stars{font-size:2.6rem;letter-spacing:6px;}'
  + '.mxs-title{font:800 1.7rem "Baloo 2",sans-serif;color:#25324A;background:#fff;border-radius:20px;padding:6px 18px;box-shadow:0 4px 0 rgba(0,0,0,.18);}'
  + '.mxs-stk{font-size:2.4rem;display:flex;gap:6px;flex-wrap:wrap;justify-content:center;max-width:300px;}'
  + '.mxs-again{border:none;border-radius:999px;padding:12px 30px;background:linear-gradient(#FFC93C,#FFA400);color:#fff;font:800 1.5rem "Baloo 2",sans-serif;box-shadow:0 5px 0 #C97C00;cursor:pointer;}'
  + '@media (max-width:480px){.mxs{min-height:620px;}.mxs-bs{width:92px;}.mxs-expr{font-size:1.8rem;}.mxs-expr .q{min-width:38px;height:38px;font-size:1.4rem;}.mxs-o{font-size:2rem;}.mxs-frame{grid-template-columns:repeat(5,30px)}.mxs-cell{width:30px;height:30px;font-size:1.15rem}.mxs-balloon{width:76px;height:104px}.mxs-balloon .b{height:80px;font-size:1.9rem}.mxs-tile{width:24px;height:34px;font-size:.95rem}}'
  + '@media (prefers-reduced-motion:reduce){.mxs *{animation-duration:.01s !important;}}'
  + 'body.mx-play .w-bg *,body.mx-play .w-bg{animation:none !important;}';
  function injectCss(){
    if(document.getElementById('mx-css')) return;
    var s = document.createElement('style'); s.id = 'mx-css'; s.textContent = CSS; document.head.appendChild(s);
    try{ document.body.classList.add('mx-play'); }catch(e){}
  }

  /* ---------- конфетти, баннеры ---------- */
  function confetti(fx, x, y, n){
    var set = ['🎉','⭐','✨','🎈','💛','🌟','🎊'];
    for(var i=0;i<(n||16);i++){
      var s = document.createElement('span'); s.className = 'mxs-conf'; s.textContent = pick(set);
      s.style.left = x + 'px'; s.style.top = y + 'px'; fx.appendChild(s);
      var ang = Math.random()*Math.PI*2, d = 60 + Math.random()*120;
      s.animate([{transform:'translate(0,0) scale(.4) rotate(0)',opacity:1},{transform:'translate(' + Math.cos(ang)*d + 'px,' + (Math.sin(ang)*d - 40) + 'px) scale(1.2) rotate(' + (Math.random()*360) + 'deg)',opacity:1,offset:.6},{transform:'translate(' + Math.cos(ang)*d*1.1 + 'px,' + (Math.sin(ang)*d + 60) + 'px) scale(.8)',opacity:0}],{duration:900 + Math.random()*500,easing:'cubic-bezier(.2,.7,.4,1)'}).onfinish = (function(el){ return function(){ el.remove(); }; })(s);
    }
  }
  function banner(fx, html){
    var b = document.createElement('div'); b.className = 'mxs-banner'; b.innerHTML = html; fx.appendChild(b);
    setTimeout(function(){ b.remove(); }, 2300);
  }

  /* ---------- стикеры ---------- */
  function ownStickers(){ try { return JSON.parse(localStorage.getItem('bilim_stickers') || '[]'); } catch(e){ return []; } }
  function giveSticker(){
    var have = ownStickers(), free = STICKERS.filter(function(s){ return have.indexOf(s) < 0; });
    var s = free.length ? pick(free) : pick(STICKERS);
    if(have.indexOf(s) < 0){ have.push(s); try { localStorage.setItem('bilim_stickers', JSON.stringify(have)); } catch(e){} }
    return s;
  }

  /* ---------- строительные блоки заданий ---------- */
  var _uid = 0;
  function o(em, i, cls){ return '<span class="mxs-o' + (cls ? ' ' + cls : '') + '" style="animation-delay:' + ((i||0)*0.05) + 's">' + em + '</span>'; }
  function grp(n, em, cls){ var h = '<div class="mxs-grp">'; for(var i=0;i<n;i++) h += o(em, i, cls); return h + '</div>'; }
  function exprHtml(parts, small){ return parts.map(function(p){ return (typeof p === 'string' && p.length > 1 && p.indexOf('<') === 0) ? p : '<span>' + (p === '<' ? '&lt;' : p) + '</span>'; }).join(''); }
  function Q(){ return '<span class="q">?</span>'; }
  function QB(){ return '<span class="q">☐</span>'; }
  function OKV(v){ return '<span class="ok">' + v + '</span>'; }
  function frames(n, em){
    var h = '<div class="mxs-frames">';
    function f(k){ var x = '<div class="mxs-frame">'; for(var i=0;i<10;i++) x += '<span class="mxs-cell">' + (i<k ? em : '') + '</span>'; return x + '</div>'; }
    h += f(Math.min(n,10)); if(n > 10) h += f(n-10);
    return h + '</div>';
  }
  // рамки с анимацией «убрать k последних предметов»
  function framesAnim(el, n, em){
    var wrap = document.createElement('div'); wrap.innerHTML = frames(n, em); var node = wrap.firstChild; el.appendChild(node);
    var cells = [].slice.call(node.querySelectorAll('.mxs-cell')).filter(function(c){ return c.textContent; });
    return {
      node:node,
      remove:function(k, X){
        return new Promise(function(resolve){
          var i = cells.length - 1, left = k;
          (function step(){
            if(left <= 0 || i < 0) return resolve();
            var c = cells[i]; c.style.transition = 'transform .25s, opacity .25s'; c.style.transform = 'scale(1.5)'; c.style.opacity = '.15'; SFX.pop();
            setTimeout(function(){ c.textContent = ''; c.style.transform = ''; c.style.opacity = ''; }, 260);
            i--; left--; X.sleep(380).then(function(ok){ if(ok) step(); });
          })();
        });
      }
    };
  }
  function numOpts(ans, lo, hi, extra){
    var set = [ans];
    (extra||[]).forEach(function(e){ if(e >= lo && e <= hi && set.indexOf(e) < 0 && set.length < 4) set.push(e); });
    var tries = 0;
    while(set.length < 4 && tries++ < 80){ var c = ans + pick([1,-1,2,-2,3,-3,10,-10]); if(c >= lo && c <= hi && set.indexOf(c) < 0) set.push(c); }
    for(var t = lo; set.length < 4 && t <= hi; t++) if(set.indexOf(t) < 0) set.push(t);
    return shuffle(set).map(function(v){ return {v:String(v), h:String(v)}; });
  }
  var SYM3 = [{v:'<',h:'<'},{v:'=',h:'='},{v:'>',h:'>'}];
  var NE = [{v:'=',h:'='},{v:'≠',h:'≠'}];
  function cmpSym(a,b){ return a>b ? '>' : (a<b ? '<' : '='); }

  // Задание-«цена» для игр: собирается из частей
  function T(t){ return t; }


  /* Сортировка по корзинам (2–3 корзины): нажми предмет, потом корзину. Неверная корзина — подсказка. */
  function sortTask(o){
    var items = o.items, buckets = o.buckets;
    return {
      sig:o.sig, expr:'', say:o.say, ans:'ok', gate:false, cap:o.cap,
      field:function(el, X, task){
        var left = items.length, sel = null, cards = [];
        el.innerHTML = '<div class="mxs-sort"><div class="mxs-sits"></div><div class="mxs-bks n' + buckets.length + '">'
          + buckets.map(function(b){ return '<button type="button" class="mxs-bk" data-k="' + b.k + '" style="background:linear-gradient(' + b.c1 + ',' + b.c2 + ')"><span class="t">' + b.icon + '</span><span>' + b.name + '</span><div class="got"></div></button>'; }).join('') + '</div></div>';
        var row = el.querySelector('.mxs-sits');
        items.forEach(function(it, i){
          var b = document.createElement('button'); b.type = 'button'; b.className = 'mxs-sit'; b.innerHTML = it.h; b.style.animationDelay = (i*.06) + 's'; b._it = it;
          b.addEventListener('click', function(){ if(task._done || b._placed) return; cards.forEach(function(c){ c.classList.remove('sel'); }); sel = b; b.classList.add('sel'); SFX.tap(i + 1); });
          row.appendChild(b); cards.push(b);
        });
        function drop(k, b){
          if(task._done || !b || b._placed) return;
          if(b._it.k !== k){ task._done = true; SFX.no(); task.submit('no', b); return; }
          b._placed = true; b.classList.remove('sel'); sel = null;
          var bk = el.querySelector('.mxs-bk[data-k="' + k + '"] .got'), sp = document.createElement('span'); sp.innerHTML = b._it.h; bk.appendChild(sp); b.style.visibility = 'hidden';
          SFX.drop(); left--;
          if(left === 0){ task._done = true; X.sleep(450).then(function(ok){ if(ok) task.submit('ok', bk); }); }
        }
        [].slice.call(el.querySelectorAll('.mxs-bk')).forEach(function(bk){ bk.addEventListener('click', function(){ if(sel) drop(bk.getAttribute('data-k'), sel); }); });
        task.auto = function(wrong){
          var rem = cards.filter(function(c){ return !c._placed; });
          if(wrong){ var c0 = rem[0], other = buckets.filter(function(b){ return b.k !== c0._it.k; })[0].k; drop(other, c0); return; }
          rem.forEach(function(c){ drop(c._it.k, c); });
        };
      },
      hintSay:o.hintSay || [], hintExpr:'',
      hint:function(el){
        el.innerHTML = '<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">' + buckets.map(function(b){
          return '<div class="mxs-hbk" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:#fff;border-radius:18px;padding:8px 10px;box-shadow:0 4px 0 rgba(0,0,0,.14);min-width:92px;"><b style="font:800 .95rem \'Baloo 2\',sans-serif;color:#25324A;">' + b.icon + ' ' + b.name + '</b><div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap;">'
            + items.filter(function(i){ return i.k === b.k; }).map(function(i){ return '<span style="font-size:1.8rem;display:inline-flex;width:38px;height:38px;align-items:center;justify-content:center;">' + i.h + '</span>'; }).join('') + '</div></div>';
        }).join('') + '</div>';
        [].slice.call(el.querySelectorAll('.mxs-hbk svg')).forEach(function(sv){ sv.style.width = '32px'; sv.style.height = '32px'; });
      }
    };
  }
  /* ---------- движок ---------- */
  function run(cfg){
    var root = document.getElementById(cfg.root);
    if(!root) return;
    injectCss();
    (window.MX.cfgs = window.MX.cfgs || {})[cfg.key] = cfg;
    var panel = root.closest ? root.closest('.game-card') : null;
    if(panel) panel.classList.add('mx-imm');

    var NEED = cfg.need || 10, streak = 0, mistakes = 0, totalAnswered = 0, totalCorrect = 0, level = 0, lastSig = '', cur = null, token = 0, busy = false, bs = null;
    var emoji = pick(EMOJIS);
    var st = {};            // ссылки на элементы сцены
    var introDone = false;

    function lvl(){ return streak < 4 ? 0 : (streak < 8 ? 1 : 2); }
    function alive(tk){ return tk === token; }
    function sleep(ms, tk){ return new Promise(function(r){ setTimeout(function(){ r(alive(tk)); }, ms); }); }

    function sceneDecor(){
      var th = cfg.theme || 'market', h = '';
      if(th === 'sky'){ for(var i=0;i<4;i++) h += '<span class="mxs-cloud" style="top:' + (50 + i*70) + 'px;animation-duration:' + (38 + i*13) + 's;animation-delay:-' + (i*11) + 's;transform:scale(' + (.7 + i*.15) + ')"></span>'; }
      if(th === 'sunset'){ for(var q=0;q<10;q++) h += '<span class="mxs-star" style="left:' + rnd(2,98) + '%;top:' + rnd(2,34) + '%;animation-delay:-' + (Math.random()*2.4).toFixed(2) + 's"></span>'; h += '<span class="mxs-sun">🌅</span>'; }
      if(th === 'candy'){ h += '<span class="mxs-sun">🍭</span>'; }
      if(th === 'forest'){ h += '<span class="mxs-sun">🌳</span>'; }
      if(th === 'garden'){ h += '<span class="mxs-sun">🌼</span>'; }
      if(th === 'ocean'){ for(var w=0;w<3;w++) h += '<span class="mxs-cloud" style="top:' + (60 + w*80) + 'px;animation-duration:' + (36 + w*14) + 's;animation-delay:-' + (w*13) + 's;transform:scale(' + (.7 + w*.15) + ')"></span>'; }
      if(th === 'workshop'){ h += '<span class="mxs-sun" style="animation:none">🔧</span>'; }
      if(th === 'snow'){ for(var f=0;f<9;f++) h += '<span class="mxs-flake" style="left:' + rnd(2,96) + '%;animation-duration:' + (9 + f*1.7) + 's;animation-delay:-' + (f*1.9) + 's">' + (f%3 ? '❄' : '❅') + '</span>'; h += '<span class="mxs-sun" style="animation:none">⛄</span>'; }
      if(th === 'space'){ for(var k=0;k<18;k++) h += '<span class="mxs-star" style="left:' + rnd(2,98) + '%;top:' + rnd(2,72) + '%;animation-delay:-' + (Math.random()*2.4).toFixed(2) + 's"></span>'; h += '<span class="mxs-sun">🪐</span>'; }
      if(th === 'rainbow'){ for(var rb=0;rb<3;rb++) h += '<span class="mxs-cloud" style="top:' + (60 + rb*80) + 'px;animation-duration:' + (34 + rb*15) + 's;animation-delay:-' + (rb*12) + 's;transform:scale(' + (.7 + rb*.15) + ')"></span>'; h += '<span class="mxs-sun" style="animation:none">🌈</span>'; }
      if(th === 'meadow'){ for(var mb=0;mb<3;mb++) h += '<span class="mxs-cloud" style="top:' + (60 + mb*80) + 'px;animation-duration:' + (34 + mb*15) + 's;animation-delay:-' + (mb*12) + 's;transform:scale(' + (.7 + mb*.15) + ')"></span>'; h += '<span class="mxs-sun" style="animation:none">☀️</span>'; }
      if(th === 'greenhouse'){ h += '<span class="mxs-sun" style="animation:none">🪴</span>'; }
      if(th === 'farm'){ for(var fb=0;fb<2;fb++) h += '<span class="mxs-cloud" style="top:' + (60 + fb*90) + 'px;animation-duration:' + (36 + fb*14) + 's;animation-delay:-' + (fb*14) + 's;transform:scale(' + (.75 + fb*.15) + ')"></span>'; h += '<span class="mxs-sun" style="animation:none">🏡</span>'; }
      if(th === 'autumn'){ for(var al=0;al<8;al++) h += '<span class="mxs-flake" style="left:' + rnd(2,96) + '%;animation-duration:' + (10 + al*1.6) + 's;animation-delay:-' + (al*2.1) + 's">🍂</span>'; h += '<span class="mxs-sun" style="animation:none">🍁</span>'; }
      if(th === 'night'){ for(var j=0;j<16;j++) h += '<span class="mxs-star" style="left:' + rnd(2,98) + '%;top:' + rnd(2,70) + '%;animation-delay:-' + (Math.random()*2.4).toFixed(2) + 's"></span>'; h += '<span class="mxs-sun">🌙</span>'; }
      
      
      return h;
    }

    function buildStage(){
      var seg = ''; for(var i=0;i<NEED;i++) seg += '<span class="mxs-step"></span>';
      root.innerHTML =
        '<div class="mxs mxs-' + (cfg.theme || 'market') + '" id="mxs">' +
          '<div class="mxs-decor">' + sceneDecor() + '</div>' +
          '<div class="mxs-ground"></div>' +
          '<div class="mxs-top"><div class="mxs-trail">' + seg + '<span class="mxs-chest">🎁</span></div><span class="mxs-lv"></span><button class="mxs-snd" type="button"></button></div>' +
          '<div class="mxs-speak"><div class="mxs-bs" id="mxs-bs"></div><div class="mxs-bubble"><div class="mxs-cap"></div><div class="mxs-expr"></div><button class="mxs-replay" type="button" aria-label="Повторить">🔊</button></div></div>' +
          '<div class="mxs-field"></div>' +
          '<div class="mxs-ans"></div>' +
          '<div class="mxs-fx"></div>' +
        '</div>';
      st.stage = root.querySelector('.mxs'); st.field = root.querySelector('.mxs-field'); st.ans = root.querySelector('.mxs-ans');
      st.expr = root.querySelector('.mxs-expr'); st.cap = root.querySelector('.mxs-cap'); st.fx = root.querySelector('.mxs-fx'); st.lv = root.querySelector('.mxs-lv');
      st.steps = [].slice.call(root.querySelectorAll('.mxs-step')); st.snd = root.querySelector('.mxs-snd');
      var bsEl = root.querySelector('#mxs-bs');
      bs = null;
      if(window.Barsik){ try { bs = Barsik.mount(bsEl, {state:'idle'}); } catch(e){ bs = null; } }
      if(!bs) bsEl.innerHTML = '<div style="font-size:4rem;text-align:center">🐯</div>';
      function sndIcon(){ st.snd.textContent = MXV.enabled() ? '🔊' : '🔇'; }
      sndIcon();
      st.snd.addEventListener('click', function(){ MXV.setEnabled(!MXV.enabled()); sndIcon(); });
      root.querySelector('.mxs-replay').addEventListener('click', function(){ if(cur) speak(cur.say); });
      bsEl.addEventListener('click', function(){ if(bs && bs.react) bs.react('happy', 900); SFX.tap(3); });
    }
    function react(state, ms){ if(bs && bs.react){ try { bs.react(state, ms); } catch(e){} } }
    function talk(on){ if(bs && bs.talk){ try { bs.talk(on); } catch(e){} } }
    function speak(tokens, isClips){
      var cl = isClips ? tokens : MXV.clips(tokens);
      return MXV.say(cl, { onstart:function(){ talk(true); }, onend:function(){ talk(false); } });
    }
    function paintProgress(){
      st.steps.forEach(function(s,i){ s.classList.toggle('on', i < streak); });
      var stars = ''; for(var j=0;j<=lvl();j++) stars += '⭐';
      st.lv.textContent = stars;
      var p = document.getElementById('count-progress-value'); if(p) p.textContent = streak + ' / ' + NEED;
      var sc = document.getElementById('count-score-value'); if(sc) sc.textContent = totalCorrect;
    }

    function make(){
      if(cfg.__force) return cfg.__force();
      var lv = lvl(), t, n = 0;
      do { t = cfg.levels[lv](emoji); n++; } while(t.sig && t.sig === lastSig && n < 25);
      lastSig = t.sig || '';
      return t;
    }

    /* ----- контекст для анимаций внутри задания ----- */
    function ctxFor(tk){
      return {
        tk:tk, alive:function(){ return alive(tk); }, sleep:function(ms){ return sleep(ms, tk); },
        sfx:SFX, say:function(tokens){ return alive(tk) ? speak(tokens) : Promise.resolve(); },
        field:st.field, fx:st.fx, em:emoji,
        pulse:function(el){ if(el && el.animate) el.animate([{transform:'scale(1)'},{transform:'scale(1.35)'},{transform:'scale(1)'}],{duration:260}); }
      };
    }

    function render(){
      token++; var tk = token; busy = false;
      MXV.stop(); talk(false);
      cur = make(); cfg._cur = cur;
      cur.submit = function(v, el){ if(busy && cur !== null && cur._locked) return; onAnswer(v, el); };
      cur.openAnswers = function(){ cur.gate = false; showAnswers(); };
      paintProgress();
      st.expr.className = 'mxs-expr' + (cur.small ? ' s' : '');
      st.expr.innerHTML = cur.expr || '';
      st.field.innerHTML = ''; st.ans.innerHTML = ''; st.ans.className = 'mxs-ans';
      react('think', 800);
      var X = ctxFor(tk);
      cur.X = X;
      if(typeof cur.field === 'function') cur.field(st.field, X, cur); else if(typeof cur.field === 'string') st.field.innerHTML = cur.field;
      if(!cur.gate) showAnswers();
      st.cap.textContent = (cur.cap != null) ? cur.cap : capFor(cur.say);
      var started = false;
      function start(){ if(started || !alive(tk)) return; started = true; if(cur.afterSay) cur.afterSay(X); }
      var first = !introDone && cfg.intro !== false;
      var p;
      if(first){ introDone = true; react('wave', 1600); p = speak(MXV.misc('intro'), true).then(function(){ return alive(tk) ? speak(cur.say || []) : null; }); }
      else p = speak(cur.say || []);
      Promise.resolve(p).then(start);
      setTimeout(start, first ? 3200 : 2300);      // анимация не ждёт озвучку дольше потолка
    }

    function capFor(tokens){
      var L = MXV.lang(), key = null;
      (tokens || []).forEach(function(t){ if(typeof t === 'string' && t.indexOf('f:') === 0) key = t.slice(2); });
      if(!key || key === 'look' || (L === 'kz' && key === 'howmuch')) return '';
      return MXV.F[L][key] || '';
    }

    function showAnswers(){
      st.ans.innerHTML = '';
      if(!cur.opts) return;
      st.ans.className = 'mxs-ans' + (cur.layout === 'sym' || cur.layout === 'sym2' ? ' sym' : '');
      var colors = shuffle(BALLOON_COLORS);
      cur.opts.forEach(function(op, i){
        var b = document.createElement('button'); b.type = 'button';
        b.className = 'mxs-balloon' + (cur.layout === 'wide' ? ' wide' : '');
        b.style.setProperty('--bc', colors[i % colors.length]); b.style.setProperty('--d', (-(Math.random()*3)).toFixed(2) + 's');
        b.setAttribute('data-value', op.v);
        b.innerHTML = '<span class="b">' + op.h + '</span>';
        b.addEventListener('click', function(){ if(busy) return; ac(); onAnswer(op.v, b); });
        st.ans.appendChild(b);
      });
    }

    function centerOf(el){
      var r = el.getBoundingClientRect(), s = st.stage.getBoundingClientRect();
      return { x: r.left - s.left + r.width/2, y: r.top - s.top + r.height/2 };
    }

    function onAnswer(v, el){
      if(!cur) return;
      busy = true; totalAnswered++;
      if(cur.reveal){ try { cur.reveal(); } catch(e){} }
      if(v === cur.ans) return correct(el);
      wrong(el);
    }

    function correct(el){
      var tk = token; totalCorrect++;
      var before = lvl(); streak++;
      var c = el ? centerOf(el) : {x:st.stage.clientWidth/2, y:st.stage.clientHeight/2};
      if(el){ el.classList.add('pop'); }
      SFX.pop(); setTimeout(SFX.ok, 120);
      confetti(st.fx, c.x, c.y, 18);
      react('happy', 1300);
      paintProgress();
      var up = streak < NEED && lvl() > before;
      var finish = streak >= NEED;
      MXV.stop();
      var line = MXV.praise();
      speak(line, true);
      setTimeout(function(){
        if(!alive(tk)) return;
        if(finish) return win();
        if(up) return levelUp();
        render();
      }, up || finish ? 1500 : 1250);
    }

    function levelUp(){
      var tk = token, s = giveSticker();
      SFX.up(); react('cheer', 2200);
      banner(st.fx, '<span class="big">' + s + '</span>' + (msgs().level_up || ({ru:'Новый уровень!',kz:'Жаңа деңгей!',en:'New level!'}[MXV.lang()])) + '<br>' + '⭐'.repeat(lvl()+1));
      confetti(st.fx, st.stage.clientWidth/2, 200, 30);
      speak(MXV.misc('level'), true);
      setTimeout(function(){ if(alive(tk)) render(); }, 2300);
    }

    function wrong(el){
      var tk = token; mistakes++;
      SFX.no();
      if(el){ el.classList.add('bad'); }
      react('oops', 1800);
      var hadStreak = streak > 0; streak = 0; paintProgress();
      MXV.stop();
      var tell = MXV.oops();
      speak(tell, true);
      setTimeout(function(){ if(alive(tk)) showHint(); }, 900);
    }

    function showHint(){
      var tk = token, X = cur.X;
      st.ans.innerHTML = ''; st.field.innerHTML = '';
      var card = document.createElement('div'); card.className = 'mxs-hintcard';
      var body = document.createElement('div'); body.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;';
      card.appendChild(body);
      var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'mxs-next'; btn.textContent = '▶';
      card.appendChild(btn); st.field.appendChild(card);
      st.cap.textContent = ''; st.expr.innerHTML = cur.hintExpr || st.expr.innerHTML;
      if(typeof cur.hint === 'function') cur.hint(body, X, cur); else body.innerHTML = cur.hint || '';
      var d = (cur.hintSay && cur.hintSay.length) ? speak(cur.hintSay) : null;
      btn.addEventListener('click', function(){ if(alive(tk)) render(); });
    }

    function win(){
      token++; MXV.stop();
      SFX.win(); react('cheer', 5000);
      var stars = mistakes <= 1 ? 3 : (mistakes <= 4 ? 2 : 1);
      var s1 = giveSticker();
      if(typeof recordGameResult === 'function') recordGameResult(cfg.key, NEED, NEED);
      var m = msgs();
      var starsH = '⭐'.repeat(stars) + '<span style="opacity:.3">' + '⭐'.repeat(3-stars) + '</span>';
      st.field.innerHTML = ''; st.ans.innerHTML = '';
      st.expr.className = 'mxs-expr'; st.expr.innerHTML = '🎉';
      var box = document.createElement('div'); box.className = 'mxs-win';
      box.innerHTML = '<div class="mxs-chestbig" id="mxs-chest">🎁</div><div class="mxs-title">' + (m.finish_msg || 'Победа! 🎉') + '</div><div class="mxs-stars">' + starsH + '</div>' +
        '<div class="mxs-stk" id="mxs-stk"></div><button class="mxs-again" type="button">' + (m.play_again || 'Play again') + '</button>';
      st.field.style.flex = '1'; st.field.appendChild(box);
      speak(MXV.misc('win'), true);
      setTimeout(function(){
        var ch = document.getElementById('mxs-chest'); if(ch) ch.textContent = '🏆';
        var stk = document.getElementById('mxs-stk'); if(stk) stk.innerHTML = '<span class="mxs-o">' + s1 + '</span>';
        confetti(st.fx, st.stage.clientWidth/2, 260, 40); SFX.ok();
      }, 1900);
      box.querySelector('.mxs-again').addEventListener('click', function(){
        streak = 0; mistakes = 0; totalAnswered = 0; totalCorrect = 0; emoji = pick(EMOJIS); lastSig = ''; render();
      });
    }

    /* API, которое видят задания */
    cur = null;
    cfg.__render = function(){ render(); };
    buildStage();
    paintProgress();
    render();
    return { render:render };
  }

  /* ================= рецепты заданий (общие механики) ================= */

  // Корзина: «положи столько» — ребёнок нажимает на предметы на полке
  function buildBasket(p){
    // p: {target, start, em, shelf, expr, say, hint, hintExpr, sig, small}
    var t = {
      expr:p.expr, say:p.say, sig:p.sig, small:p.small, ans:String(p.target), gate:true, hintSay:p.hintSay,
      field:function(el, X, task){
        var placed = p.start || 0, wrap = document.createElement('div'); wrap.className = 'mxs-basketwrap';
        var basket = document.createElement('div'); basket.className = 'mxs-basket';
        var cnt = document.createElement('div'); cnt.className = 'mxs-cnt'; cnt.textContent = placed;
        wrap.appendChild(cnt); wrap.appendChild(basket);
        for(var i=0;i<(p.start||0);i++){ basket.insertAdjacentHTML('beforeend', o(p.em, i, 'pre')); }
        var shelf = document.createElement('div'); shelf.className = 'mxs-shelf';
        var n = p.shelf || (p.target + 3), items = [];
        for(var k=0;k<n;k++){
          var b = document.createElement('button'); b.type = 'button'; b.className = 'mxs-item'; b.textContent = p.em; shelf.appendChild(b); items.push(b);
        }
        var go = document.createElement('button'); go.type = 'button'; go.className = 'mxs-go'; go.textContent = '✔';
        el.appendChild(shelf); el.appendChild(wrap); el.appendChild(go);
        var added = [];  // элементы корзины, добавленные ребёнком
        function bump(){ cnt.textContent = placed; cnt.classList.remove('bump'); void cnt.offsetWidth; cnt.classList.add('bump'); }
        items.forEach(function(b){
          b.addEventListener('click', function(){
            if(task._done || b.classList.contains('gone')) return;
            if(placed >= 20) return;
            b.classList.add('gone'); placed++;
            var s = document.createElement('span'); s.className = 'mxs-o'; s.textContent = p.em; s.style.cursor = 'pointer';
            basket.appendChild(s); added.push({s:s, b:b});
            SFX.tap(placed); bump();
            X.say([placed]);
            s.addEventListener('click', function(){
              if(task._done) return;
              s.remove(); b.classList.remove('gone'); placed--; bump(); SFX.tap(placed);
              added = added.filter(function(a){ return a.s !== s; });
            });
          });
        });
        go.addEventListener('click', function(){
          if(task._done) return; task._done = true;
          task.submit(String(placed), go);
        });
      },
      hint:p.hint, hintExpr:p.hintExpr
    };
    return t;
  }

  // Посчитай касанием → ответ шариком
  function countTap(p){
    // p: {n, em, say, expr, hint, sig}
    return {
      expr:p.expr, say:p.say, sig:p.sig, ans:String(p.n), opts:p.opts, layout:p.layout, hint:p.hint, hintSay:p.hintSay, hintExpr:p.hintExpr,
      field:function(el, X){
        var sc = document.createElement('div'); sc.className = 'mxs-scatter';
        var big = document.createElement('div'); big.className = 'mxs-bigcount'; big.innerHTML = '&nbsp;';
        el.appendChild(sc); el.appendChild(big);
        var W = Math.min(el.clientWidth || 320, 320), H = 190, cols = p.n > 10 ? 6 : 5, rows = Math.ceil(p.n / cols);
        var cw = W / cols, ch = H / rows, counted = 0, pos = [];
        for(var i=0;i<p.n;i++){
          var c = i % cols, r = Math.floor(i / cols);
          var x = c*cw + cw/2 - 18 + rnd(-8,8), y = r*ch + ch/2 - 20 + rnd(-6,6);
          pos.push([x,y]);
        }
        shuffle(pos).forEach(function(pp, i){
          var b = document.createElement('button'); b.type = 'button'; b.className = 'mxs-tapobj'; b.textContent = p.em;
          b.style.left = pp[0] + 'px'; b.style.top = pp[1] + 'px'; b.style.animation = 'mxIn .4s ' + (i*0.05) + 's backwards';
          b.addEventListener('click', function(){
            if(b.classList.contains('on')) return;
            b.classList.add('on'); counted++;
            var tag = document.createElement('span'); tag.className = 'no'; tag.textContent = counted; b.appendChild(tag);
            big.textContent = counted; SFX.tap(counted); X.say([counted]);
          });
          sc.appendChild(b);
        });
      }
    };
  }

  // Лопни b шариков из a → потом ответ «сколько осталось»
  function popBalloons(p){
    // p: {a, b, say, expr, opts, ans, hint}
    return {
      expr:p.expr, say:p.say, sig:p.sig, ans:String(p.a - p.b), opts:p.opts, hint:p.hint, hintSay:p.hintSay, hintExpr:p.hintExpr, gate:true, layout:p.layout,
      field:function(el, X, task){
        var sc = document.createElement('div'); sc.className = 'mxs-scatter';
        var big = document.createElement('div'); big.className = 'mxs-bigcount'; big.innerHTML = '&nbsp;';
        el.appendChild(sc); el.appendChild(big);
        var W = Math.min(el.clientWidth || 320, 320), H = 150, cols = p.a > 10 ? 7 : 5, rows = Math.ceil(p.a / cols), cw = (W-30) / cols, ch = H / rows, popped = 0;
        var colors = shuffle(BALLOON_COLORS), pos = [];
        for(var i=0;i<p.a;i++){ var c = i % cols, r = Math.floor(i/cols); pos.push([c*cw + 6 + rnd(0,6), r*ch + rnd(0,6)]); }
        pos.forEach(function(pp, i){
          var b = document.createElement('button'); b.type = 'button'; b.className = 'mxs-pb';
          b.style.left = pp[0] + 'px'; b.style.top = pp[1] + 'px'; b.style.setProperty('--bc', colors[i % colors.length]); b.style.animationDelay = (-(Math.random()*3)).toFixed(2) + 's';
          b.addEventListener('click', function(){
            if(popped >= p.b || b.classList.contains('pop')) return;
            ac(); b.classList.add('pop'); popped++; SFX.pop(); X.say([popped]);
            big.textContent = '−' + popped;
            if(popped >= p.b){ setTimeout(function(){ big.innerHTML = '&nbsp;'; task.openAnswers(); X.say(['f:left']); }, 550); }
          });
          sc.appendChild(b);
        });
      }
    };
  }

  // Прыжки Барсика по числам 0..10
  function hops(el, X, from, to, N){
    var row = document.createElement('div'); row.className = 'mxs-tiles'; el.appendChild(row);
    var tiles = [];
    for(var i=0;i<=N;i++){ var t = document.createElement('span'); t.className = 'mxs-tile'; t.textContent = i; row.appendChild(t); tiles.push(t); }
    var hop = document.createElement('span'); hop.className = 'mxs-hopper'; hop.textContent = '🐯'; row.appendChild(hop);
    function place(i){ var r = tiles[i].getBoundingClientRect(), p = row.getBoundingClientRect(); hop.style.left = (r.left - p.left + r.width/2 - 16) + 'px'; }
    place(from); tiles[from].classList.add('hit');
    return {
      run:function(){
        var dir = to >= from ? 1 : -1, i = from;
        return (function step(){
          if(i === to){ tiles[to].classList.add('end'); return Promise.resolve(); }
          i += dir; place(i); hop.style.top = '-12px'; setTimeout(function(){ hop.style.top = '0px'; }, 160);
          tiles[i].classList.add('hit'); SFX.hop();
          return X.sleep(380).then(function(ok){ return ok ? step() : null; });
        })();
      }
    };
  }

  // Качели: две стороны; reveal() наклоняет в сторону большего
  function seesaw(el, left, right, X){
    var w = document.createElement('div'); w.className = 'mxs-see';
    w.innerHTML = '<div class="mxs-fulcrum"></div><div class="mxs-plank"></div><div class="mxs-pan l">' + left + '</div><div class="mxs-pan r">' + right + '</div>';
    el.appendChild(w);
    var plank = w.querySelector('.mxs-plank');
    return {
      reveal:function(sign){ var deg = sign === '>' ? -9 : (sign === '<' ? 9 : 0); plank.style.transform = 'rotate(' + deg + 'deg)'; var pl = w.querySelector('.mxs-pan.l'), pr = w.querySelector('.mxs-pan.r'); pl.style.transition = pr.style.transition = 'transform 1.1s cubic-bezier(.3,1.5,.5,1)'; pl.style.transform = 'translateY(' + (deg*-1.2) + 'px)'; pr.style.transform = 'translateY(' + (deg*1.2) + 'px)'; SFX.drop(); }
    };
  }

  // Корзина-экран «падают яблоки»: сначала a, потом b
  function dropSum(el, X, a, b, em){
    var wrap = document.createElement('div'); wrap.className = 'mxs-basketwrap';
    var basket = document.createElement('div'); basket.className = 'mxs-basket';
    var cnt = document.createElement('div'); cnt.className = 'mxs-cnt'; cnt.textContent = '0';
    wrap.appendChild(cnt); wrap.appendChild(basket); el.appendChild(wrap);
    var n = 0;
    function drop(i, cls){
      var s = document.createElement('span'); s.className = 'mxs-o'; s.textContent = em; s.style.animation = 'none'; basket.appendChild(s);
      if(s.animate) s.animate([{transform:'translateY(-190px) scale(.8)',opacity:0},{transform:'translateY(0) scale(1)',opacity:1,offset:.6},{transform:'translateY(-14px)',offset:.8},{transform:'translateY(0)'}],{duration:620,easing:'ease-in'});
      n++; cnt.textContent = n; cnt.classList.remove('bump'); void cnt.offsetWidth; cnt.classList.add('bump');
      SFX.drop();
    }
    return {
      run:function(afterA){
        var i = 0;
        function many(k, done){ if(k <= 0) return done(); drop(); X.say([n]); X.sleep(520).then(function(ok){ if(ok) many(k-1, done); }); }
        return new Promise(function(resolve){
          many(a, function(){
            X.sleep(500).then(function(ok){ if(!ok) return; many(b, resolve); });
          });
        });
      }
    };
  }

  window.MX = {
    run:run, rnd:rnd, pick:pick, shuffle:shuffle, o:o, grp:grp, frames:frames, framesAnim:framesAnim, numOpts:numOpts, SYM3:SYM3, NE:NE, cmpSym:cmpSym,
    Q:Q, QB:QB, OKV:OKV, exprHtml:exprHtml, buildBasket:buildBasket, countTap:countTap, popBalloons:popBalloons,
    hops:hops, sortTask:sortTask, seesaw:seesaw, dropSum:dropSum, EMOJIS:EMOJIS, T:T, BALLOON_COLORS:BALLOON_COLORS
  };
})();
