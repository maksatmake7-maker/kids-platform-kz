/* ===== Білім Аралы — общий «мир» (подключать после i18n.js) =====
   Что делает:
   • время суток по часам посетителя (рассвет / день / закат / ночь) → <html data-tod="…">; для проверки: ?tod=night
   • общий фон для страниц с <body class="w-page">: небо, солнце/луна, облака, звёзды, море
   • собирает шапку: мордочка Барсика вместо эмодзи, язык одним выпадающим списком, кнопка музыки
   • фоновая музыка (синтез в браузере, без файлов), выключена по умолчанию, выбор запоминается
   API: World.tod(), World.onTod(fn), World.stars(el,n), World.glints(el,n), World.music
*/
(function(){
  'use strict';
  var W = window.World = {};
  var $q = function(s,r){ return (r||document).querySelector(s); };

  /* ---------- время суток ---------- */
  var SUNRISE=[8,7.5,7,6,5.5,5,5.5,6,6.5,7,7.5,8], SUNSET=[17,18,19,20,20.5,21,21,20,19,18,17,16.5];
  var cur='day', subs=[];
  function calc(){
    var m=/[?&]tod=(dawn|day|sunset|night)/.exec(location.search); if(m) return m[1];
    var d=new Date(), h=d.getHours()+d.getMinutes()/60, mo=d.getMonth(), sr=SUNRISE[mo], ss=SUNSET[mo];
    if (h>=sr-1 && h<sr+1.5) return 'dawn';
    if (h>=sr+1.5 && h<ss-1.5) return 'day';
    if (h>=ss-1.5 && h<ss+1) return 'sunset';
    return 'night';
  }
  function applyTod(){
    var t=calc(); if (t===cur && document.documentElement.getAttribute('data-tod')) return;
    cur=t; document.documentElement.setAttribute('data-tod',cur);
    subs.forEach(function(f){ try{ f(cur); }catch(e){} });
  }
  W.tod=function(){ return cur; };
  W.onTod=function(f){ subs.push(f); f(cur); };
  applyTod(); setInterval(applyTod,300000);

  /* ---------- звёзды и блики ---------- */
  W.stars=function(el,n){
    if (!el || el.getAttribute('data-filled')) return; el.setAttribute('data-filled','1');
    for (var i=0;i<(n||46);i++){ var s=document.createElement('i'); s.className='star'; s.style.left=(Math.random()*100)+'%'; s.style.top=(Math.random()*52)+'%';
      var z=1.5+Math.random()*2.5; s.style.width=s.style.height=z+'px'; s.style.animationDelay=(-Math.random()*3)+'s'; s.style.animationDuration=(2+Math.random()*3)+'s'; el.appendChild(s); }
  };
  W.glints=function(el,n){
    if (!el) return;
    for (var g=0; g<(n||16); g++){ var d=document.createElement('i'); d.className='glint';
      d.style.left=(Math.random()*96)+'%'; d.style.top=(18+Math.random()*74)+'%'; d.style.animationDelay=(-Math.random()*4)+'s'; d.style.animationDuration=(3+Math.random()*3)+'s'; el.appendChild(d); }
  };

  /* ---------- общий фон ---------- */
  var CLOUD='<svg viewBox="0 0 150 60"><path d="M22 52 C6 52 4 34 20 32 C20 18 38 12 50 22 C56 6 84 4 92 22 C108 14 128 24 124 40 C140 40 146 52 130 52 Z" fill="#fff"/></svg>';
  function buildBackdrop(){
    if (!document.body.classList.contains('w-page') || $q('.w-bg')) return;
    var bg=document.createElement('div'); bg.className='w-bg'; bg.setAttribute('aria-hidden','true');
    bg.innerHTML='<div class="w-sun"></div><div class="w-moon"></div><div class="w-stars"></div>'+
      '<div class="cl c1">'+CLOUD+'</div><div class="cl c2" style="animation-delay:-60s">'+CLOUD+'</div><div class="cl c3" style="animation-delay:-130s">'+CLOUD+'</div><div class="cl c4" style="animation-delay:-20s">'+CLOUD+'</div>'+
      '<div class="w-sea"><div class="waves"></div></div>';
    document.body.insertBefore(bg, document.body.firstChild);
    W.glints($q('.w-sea',bg),14);
    W.onTod(function(t){ if (t==='night') W.stars($q('.w-stars',bg),60); });
  }

  /* ---------- шапка ---------- */
  var FACE='<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#FFC93C"/><circle cx="9" cy="10" r="6" fill="#F8AE3F"/><circle cx="31" cy="10" r="6" fill="#F8AE3F"/><circle cx="9.5" cy="11" r="3" fill="#FFB4A8"/><circle cx="30.5" cy="11" r="3" fill="#FFB4A8"/><ellipse cx="20" cy="22" rx="14" ry="13" fill="#F8AE3F"/><ellipse cx="20" cy="27" rx="8" ry="6" fill="#FFF7E3"/><ellipse cx="13.5" cy="20" rx="3.6" ry="4.2" fill="#fff" stroke="#3B2A1A" stroke-width="1"/><ellipse cx="26.5" cy="20" rx="3.6" ry="4.2" fill="#fff" stroke="#3B2A1A" stroke-width="1"/><circle cx="14" cy="20.6" r="2.3" fill="#3B2A1A"/><circle cx="26" cy="20.6" r="2.3" fill="#3B2A1A"/><path d="M17.5 24.5 Q20 23 22.5 24.5 Q21 27 20 27 Q19 27 17.5 24.5Z" fill="#E5707F"/></svg>';
  var NAMES={ru:'Русский',kz:'Қазақша',en:'English',zh:'中文',uz:'Oʻzbekcha',tg:'Тоҷикӣ',ug:'ئۇيغۇرچە'};
  var CODES={ru:'RU',kz:'ҚАЗ',en:'EN',zh:'中文',uz:"O'ZB",tg:'ТҶК',ug:'ئۇيغۇر'};
  var GLOBE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19"/></svg>';
  var CARET='<svg class="car" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 3.5 5 7l3.5-3.5"/></svg>';
  var NOTE='<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>';
  var codeEl=null;
  function syncCode(){ if(!codeEl) return; var l=document.documentElement.getAttribute('data-current')||'ru'; codeEl.textContent=CODES[l]||'RU'; }
  function upgradeHeader(){
    var h=$q('header'); if(!h || h.classList.contains('w-top')) return;
    h.classList.add('w-top');
    var dot=$q('.logo-dot',h); if (dot) dot.outerHTML=FACE;
    var lt=$q('.lang-toggle',h);
    if (lt && !$q('.lang-menu',lt)){
      var btns=[].slice.call(lt.querySelectorAll('button[data-lang]'));
      var cur=document.createElement('button'); cur.type='button'; cur.className='lang-cur'; cur.setAttribute('aria-haspopup','true'); cur.setAttribute('aria-expanded','false'); cur.setAttribute('aria-label','Язык / Language');
      cur.innerHTML=GLOBE+'<span id="langcode">RU</span>'+CARET;
      var menu=document.createElement('div'); menu.className='lang-menu';
      btns.forEach(function(b){ var l=b.getAttribute('data-lang'); b.textContent=NAMES[l]||b.textContent; menu.appendChild(b); b.addEventListener('click',function(){ lt.classList.remove('open'); cur.setAttribute('aria-expanded','false'); }); });
      lt.innerHTML=''; lt.appendChild(cur); lt.appendChild(menu);
      codeEl=$q('#langcode',cur);
      cur.addEventListener('click',function(e){ e.stopPropagation(); var o=lt.classList.toggle('open'); cur.setAttribute('aria-expanded',o?'true':'false'); });
      document.addEventListener('click',function(e){ if(!lt.contains(e.target)){ lt.classList.remove('open'); cur.setAttribute('aria-expanded','false'); } });
      document.addEventListener('keydown',function(e){ if(e.key==='Escape') lt.classList.remove('open'); });
    }
    if (!$q('#musicbtn',h)){
      var mb=document.createElement('button'); mb.type='button'; mb.className='mbtn'; mb.id='musicbtn'; mb.setAttribute('aria-pressed','false'); mb.setAttribute('aria-label','Музыка'); mb.title='Музыка';
      mb.innerHTML='<svg class="off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+NOTE+'<path d="M3 3l18 18" stroke="#FF6B5B"/></svg><svg class="on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+NOTE+'</svg>';
      if (lt && lt.parentNode===h) h.insertBefore(mb,lt); else h.appendChild(mb);
      initMusic(mb);
    }
    // язык может переключаться снаружи (applyLang) — держим подпись в актуальном виде
    var _al=window.applyLang;
    if (typeof _al==='function'){ window.applyLang=function(){ var r=_al.apply(this,arguments); syncCode(); return r; }; }
    syncCode();
  }

  /* ---------- фоновая музыка ---------- */
  function initMusic(btn){
    var AC=window.AudioContext||window.webkitAudioContext; if(!AC){ btn.style.display='none'; return; }
    var ctx=null, master=null, timer=null, nextT=0, step=0, on=false, pending=false;
    var CH=[[48,55,64],[45,52,60],[41,48,57],[43,50,59]];                 // До, ля минор, фа, соль
    var MEL=[[76,0,79,0,76,0,74,72],[72,0,76,0,81,0,79,0],[81,0,79,0,76,0,74,0],[74,0,76,0,79,0,0,0],
             [79,0,81,0,79,76,0,74],[76,0,72,0,74,0,76,0],[72,74,76,0,79,0,76,0],[74,0,72,0,0,0,0,0]];
    var EIGHTH=.4;
    function hz(m){ return 440*Math.pow(2,(m-69)/12); }
    function tone(m,t,dur,vol,type){
      var o=ctx.createOscillator(), g=ctx.createGain(); o.type=type||'sine'; o.frequency.value=hz(m);
      g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+.012); g.gain.exponentialRampToValueAtTime(.0001,t+dur);
      o.connect(g); g.connect(master); o.start(t); o.stop(t+dur+.05);
    }
    function bell(m,t,vol){ tone(m,t,1.4,vol,'sine'); tone(m+12,t,.5,vol*.22,'sine'); }
    function schedule(){
      while (nextT < ctx.currentTime+1.2){
        var bar=Math.floor(step/8)%8, k=step%8, chord=CH[bar%4];
        if (k===0){ chord.forEach(function(m){ tone(m,nextT,EIGHTH*8*.98,.05,'sine'); }); }
        var arp=[0,1,2,1,2,1,2,1][k]; tone(chord[arp]+12,nextT,.5,.075,'triangle');
        var mm=MEL[bar][k]; if (mm) bell(mm,nextT,.1);
        nextT+=EIGHTH; step++;
      }
    }
    function start(){
      if (on) return; on=true; pending=false; btn.setAttribute('aria-pressed','true');
      try{ localStorage.setItem('bilim_music','1'); }catch(e){}
      if(!ctx){ ctx=new AC(); master=ctx.createGain(); master.gain.value=0; master.connect(ctx.destination); }
      ctx.resume(); master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value,ctx.currentTime);
      master.gain.linearRampToValueAtTime(.55,ctx.currentTime+2); nextT=ctx.currentTime+.1; schedule(); timer=setInterval(schedule,300);
    }
    function stop(){
      if (!on) return; on=false; btn.setAttribute('aria-pressed','false');
      try{ localStorage.setItem('bilim_music','0'); }catch(e){}
      clearInterval(timer); timer=null;
      master.gain.cancelScheduledValues(ctx.currentTime); master.gain.setValueAtTime(master.gain.value,ctx.currentTime); master.gain.linearRampToValueAtTime(0,ctx.currentTime+.6);
    }
    btn.addEventListener('click',function(e){ e.stopPropagation(); pending=false; on?stop():start(); });
    document.addEventListener('visibilitychange',function(){ if(!ctx) return; if(document.hidden){ ctx.suspend(); } else if(on){ ctx.resume(); } });
    // если музыка была включена раньше — браузер разрешит звук только после первого касания
    var was=false; try{ was=localStorage.getItem('bilim_music')==='1'; }catch(e){}
    if (was){ btn.setAttribute('aria-pressed','true'); pending=true;
      var kick=function(){ document.removeEventListener('pointerdown',kick,true); document.removeEventListener('keydown',kick,true);
        if(pending){ btn.setAttribute('aria-pressed','false'); start(); } };
      document.addEventListener('pointerdown',kick,true); document.addEventListener('keydown',kick,true);
    }
    W.music={start:start,stop:stop,state:function(){ return {on:on, ctx:ctx&&ctx.state}; }};
  }

  buildBackdrop(); upgradeHeader();
})();
