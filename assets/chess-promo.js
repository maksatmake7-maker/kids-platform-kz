/* Білім Аралы — заметная кнопка «Устал? Сыграй в шахматы» (assets/chess-promo.js)
   Подключается из assets/media-base.js на всех страницах (кроме самой игры chess.html):
   • большая карточка на главной, выборе класса и страницах классов (перед подвалом);
   • плавающая кнопка слева внизу на всех остальных страницах; раз в сессию, через несколько минут занятий,
     сама мягко предлагает отдохнуть и сыграть. Закрыть можно крестиком — до конца сессии не мешает. */
(function(){
  'use strict';
  if (window.__chessPromo) return; window.__chessPromo = 1;
  if (/\/chess\.html/.test(location.pathname)) return;
  var cs = document.currentScript, ROOT = (cs && cs.src ? cs.src : '').replace(/assets\/chess-promo\.js.*$/, '');
  var HREF = ROOT + 'chess.html';
  var T = {
    ru: { pill: 'Устал? Сыграй в шахматы!', pillS: 'Шахматы', title: 'Устал? Не хочешь сыграть в шахматы?', text: 'А ты знаешь, что шахматы развивают ребёнка в любом возрасте?', btn: 'Играть в шахматы', later: 'Потом', chip: '11 уровней · с 1 по 11 класс' },
    kz: { pill: 'Шаршадың ба? Шахмат ойна!', pillS: 'Шахмат', title: 'Шаршадың ба? Шахмат ойнағың келмей ме?', text: 'Шахмат баланы кез келген жаста дамытатынын білесің бе?', btn: 'Шахмат ойнау', later: 'Кейін', chip: '11 деңгей · 1-сыныптан 11-сыныпқа дейін' },
    en: { pill: 'Tired? Play chess!', pillS: 'Chess', title: 'Tired? Want to play chess?', text: 'Did you know chess helps a child grow and develop at any age?', btn: 'Play chess', later: 'Later', chip: '11 levels · grade 1 to grade 11' },
    zh: { pill: '累了？来下棋吧！', pillS: '国际象棋', title: '累了？想不想下一盘国际象棋？', text: '你知道吗？国际象棋在任何年龄都有助于孩子成长。', btn: '去下棋', later: '以后再说', chip: '11个难度 · 1至11年级' },
    uz: { pill: 'Charchadingmi? Shaxmat o‘yna!', pillS: 'Shaxmat', title: 'Charchadingmi? Shaxmat o‘ynashni xohlaysanmi?', text: 'Shaxmat bolani har qanday yoshda rivojlantirishini bilasanmi?', btn: 'Shaxmat o‘ynash', later: 'Keyinroq', chip: '11 daraja · 1-sinfdan 11-sinfgacha' },
    tg: { pill: 'Хаста шудӣ? Шоҳмот бозӣ кун!', pillS: 'Шоҳмот', title: 'Хаста шудӣ? Намехоҳӣ шоҳмот бозӣ кунӣ?', text: 'Оё медонӣ, ки шоҳмот кӯдакро дар ҳама синну сол инкишоф медиҳад?', btn: 'Бозии шоҳмот', later: 'Баъдтар', chip: '11 сатҳ · аз синфи 1 то синфи 11' },
    ug: { pill: 'Чарчидиңму? Шаһмат ойна!', pillS: 'Шаһмат', title: 'Чарчидиңму? Шаһмат ойниғуң кәлмәмду?', text: 'Шаһматниң баланиң һәр қандақ яшта риваҗлинишиға ярдәм беридиғанлиғини билемсән?', btn: 'Шаһмат ойнаш', later: 'Кейинрәк', chip: '11 дәриҗә · 1-синиптин 11-синипқичә' },
    fr: { pill: 'Fatigué ? Joue aux échecs !', pillS: 'Échecs', title: 'Fatigué ? Envie de jouer aux échecs ?', text: 'Sais-tu que les échecs font grandir et développent l’enfant à tout âge ?', btn: 'Jouer aux échecs', later: 'Plus tard', chip: '11 niveaux · de la 1re à la 11e année' },
    de: { pill: 'Müde? Spiel Schach!', pillS: 'Schach', title: 'Müde? Hast du Lust auf Schach?', text: 'Weißt du, dass Schach Kinder in jedem Alter fördert?', btn: 'Schach spielen', later: 'Später', chip: '11 Stufen · von Klasse 1 bis Klasse 11' }
  };
  function lang(){ try { var s = localStorage.getItem('bilim_lang_v1'); if (s && T[s]) return s; } catch(e){} return 'ru'; }
  function tx(k){ return (T[lang()] || T.ru)[k] || T.ru[k]; }

  var CSS = '' +
    '.chp-pill{position:fixed;left:12px;bottom:12px;z-index:9000;display:flex;align-items:center;gap:8px;max-width:calc(100vw - 24px);padding:8px 16px 8px 10px;border:0;border-radius:999px;background:linear-gradient(135deg,#FF8A5B,#FF5E7E);color:#fff;font:800 .92rem/1.15 Nunito,Arial,sans-serif;cursor:pointer;box-shadow:0 4px 0 rgba(29,53,87,.22),0 8px 20px rgba(29,53,87,.25);text-decoration:none;transition:transform .15s}' +
    '.chp-pill:hover{transform:translateY(-2px)}' +
    '.chp-pill .ic{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#fff;color:#1D3557;font-size:1.35rem;flex:none;animation:chpw 4s ease-in-out infinite}' +
    '@keyframes chpw{0%,86%,100%{transform:none}90%{transform:rotate(-14deg) scale(1.1)}95%{transform:rotate(12deg) scale(1.1)}}' +
    '.chp-pill .lb{white-space:nowrap}' +
    '.chp-pill.mini .lb{display:none}.chp-pill.mini{padding:6px;opacity:.92}' +
    '.chp-card{position:fixed;left:12px;bottom:70px;z-index:9001;width:min(340px,calc(100vw - 24px));background:#FFFDF4;border-radius:20px;padding:16px 16px 14px;box-shadow:0 10px 36px rgba(29,53,87,.35);font-family:Nunito,Arial,sans-serif;color:#1D3557;animation:chpin .3s ease}' +
    '@keyframes chpin{from{transform:translateY(14px);opacity:0}to{transform:none;opacity:1}}' +
    '.chp-card h4{margin:0 0 6px;font:800 1.15rem/1.2 "Baloo 2",Nunito,sans-serif}.chp-card p{margin:0 0 12px;font-weight:700;line-height:1.4;font-size:.95rem}' +
    '.chp-card .row{display:flex;gap:8px}.chp-card a.go,.chp-card button.later{font:800 .95rem Nunito,Arial,sans-serif;border-radius:12px;padding:10px 12px;cursor:pointer;text-align:center;text-decoration:none}' +
    '.chp-card a.go{flex:1;background:#FF6B5B;color:#fff;box-shadow:0 3px 0 rgba(29,53,87,.2)}.chp-card button.later{background:#fff;border:2px solid rgba(29,53,87,.2);color:#1D3557}' +
    '.chp-card .x{position:absolute;top:6px;right:10px;border:0;background:none;font-size:1.3rem;color:#1D3557;opacity:.5;cursor:pointer}' +
    '.chp-card .big{position:absolute;right:-6px;top:-22px;font-size:2.6rem;filter:drop-shadow(0 3px 0 rgba(29,53,87,.2))}' +
    /* большая карточка на главных страницах */
    '.chp-banner{max-width:920px;margin:26px auto 30px;padding:0 16px;font-family:Nunito,Arial,sans-serif}' +
    '.chp-banner a{display:flex;align-items:center;gap:18px;padding:18px 22px;border-radius:26px;text-decoration:none;color:#fff;background:linear-gradient(120deg,#1D3557 0%,#2A6F97 55%,#3FB088 100%);box-shadow:0 6px 0 rgba(29,53,87,.25),0 14px 30px rgba(29,53,87,.22);position:relative;overflow:hidden;transition:transform .15s}' +
    '.chp-banner a:hover{transform:translateY(-3px)}' +
    '.chp-board{flex:none;width:92px;height:92px;border-radius:14px;border:4px solid #8C5A2B;background:conic-gradient(#FDEFC8 25%,#6FBF8F 0 50%,#FDEFC8 0 75%,#6FBF8F 0) 0 0/46px 46px;position:relative;box-shadow:0 4px 0 #6C431D}' +
    '.chp-board b{position:absolute;font:400 2.1rem/1 "Segoe UI Symbol","Noto Sans Symbols 2","DejaVu Sans",sans-serif;color:#2B2B3A}' +
    '.chp-board b.a{left:7px;top:5px}.chp-board b.b{right:7px;bottom:3px;color:#fff;-webkit-text-stroke:1.2px #1D3557;paint-order:stroke fill}' +
    '.chp-banner h3{margin:0 0 4px;font:800 clamp(1.15rem,3.4vw,1.55rem)/1.2 "Baloo 2",Nunito,sans-serif;color:#fff}' +
    '.chp-banner p{margin:0 0 10px;font-weight:700;font-size:clamp(.92rem,2.4vw,1.02rem);line-height:1.4;opacity:.96}' +
    '.chp-banner .btn{display:inline-block;background:#FFD34D;color:#1D3557;font-weight:800;border-radius:14px;padding:9px 18px;box-shadow:0 3px 0 rgba(0,0,0,.2)}' +
    '.chp-banner .chip{display:inline-block;margin-left:8px;font-size:.8rem;font-weight:800;opacity:.9}' +
    '@media(max-width:560px){.chp-banner a{flex-direction:column;text-align:center;gap:10px}.chp-banner .chip{display:block;margin:8px 0 0}}';

  function injectCss(){ if (document.getElementById('chp-css')) return; var s = document.createElement('style'); s.id = 'chp-css'; s.textContent = CSS; document.head.appendChild(s); }

  var isHub = (function(){
    var here = location.href.split(/[?#]/)[0].replace(/index\.html$/, '');
    return here === ROOT || /grade-picker\.html$/.test(here) || /\/grades\/grade-[\w-]+\/$/.test(here);   // главная, выбор класса, страницы классов
  })();
  var pill, card, banner, popTimer, shortTimer;

  function mkBanner(){
    var ft = document.querySelector('footer'); if (!ft || !ft.parentNode) return;
    banner = document.createElement('div'); banner.className = 'chp-banner';
    banner.innerHTML = '<a href="' + HREF + '"><span class="chp-board" aria-hidden="true"><b class="a">♚︎</b><b class="b">♞︎</b></span><span><h3></h3><p></p><span class="btn"></span><span class="chip"></span></span></a>';
    ft.parentNode.insertBefore(banner, ft);
  }
  function mkPill(){
    pill = document.createElement('a'); pill.className = 'chp-pill'; pill.href = HREF; pill.setAttribute('role', 'button');
    pill.innerHTML = '<span class="ic" aria-hidden="true">♞︎</span><span class="lb"></span>';
    pill.addEventListener('click', function(e){ if (!isHub){ e.preventDefault(); toggleCard(); } });
    document.body.appendChild(pill);
  }
  function closeCard(){ if (card){ card.remove(); card = null; } try { sessionStorage.setItem('bilim_chess_pop', '1'); } catch(e){} }
  function toggleCard(auto){
    if (card){ closeCard(); return; }
    card = document.createElement('div'); card.className = 'chp-card'; card.setAttribute('role', 'dialog');
    card.innerHTML = '<span class="big" aria-hidden="true">♞︎</span><button class="x" aria-label="×">×</button><h4></h4><p></p><div class="row"><a class="go" href="' + HREF + '"></a><button class="later"></button></div>';
    card.querySelector('.x').onclick = closeCard; card.querySelector('.later').onclick = closeCard;
    document.body.appendChild(card); paint();
  }
  function paint(){
    if (pill){ pill.querySelector('.lb').textContent = (isHub ? tx('pill') : tx('pill')); pill.setAttribute('aria-label', tx('title')); }
    if (card){ card.querySelector('h4').textContent = tx('title'); card.querySelector('p').textContent = tx('text'); card.querySelector('.go').textContent = '♟ ' + tx('btn'); card.querySelector('.later').textContent = tx('later'); }
    if (banner){ banner.querySelector('h3').textContent = tx('title'); banner.querySelector('p').textContent = tx('text'); banner.querySelector('.btn').textContent = '♟ ' + tx('btn'); banner.querySelector('.chip').textContent = tx('chip'); }
  }
  function init(){
    injectCss();
    if (isHub) mkBanner();
    mkPill();
    paint();
    if (banner && 'IntersectionObserver' in window){   // пока видна большая карточка, плавающую кнопку прячем
      new IntersectionObserver(function(es){ pill.style.display = es[0].isIntersecting ? 'none' : ''; }, { threshold: 0.25 }).observe(banner);
    }
    // на узких экранах и на уроках кнопка сворачивается в значок, а раз в минуту ненадолго раскрывается
    var narrow = function(){ return window.innerWidth < 560; };
    if (!isHub || narrow()){
      setTimeout(function(){ if (!card) pill.classList.add('mini'); }, 7000);
      shortTimer = setInterval(function(){ if (card) return; pill.classList.remove('mini'); setTimeout(function(){ if (!card) pill.classList.add('mini'); }, 6000); }, 70000);
    }
    var shown = false; try { shown = sessionStorage.getItem('bilim_chess_pop') === '1'; } catch(e){}
    var isCourse = /-course\.html/.test(location.pathname);   // на уроках-курсах карточка сама не всплывает: не мешаем ответам
    if (!shown && !isHub && !isCourse) popTimer = setTimeout(function(){ if (!card && !document.hidden) { pill.classList.remove('mini'); toggleCard(true); } }, 4 * 60 * 1000);
    var cur = lang(); setInterval(function(){ var l = lang(); if (l !== cur){ cur = l; paint(); } }, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
