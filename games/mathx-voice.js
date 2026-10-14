/* ===== Білім Аралы — голос Барсика для игр (клипы + запасной синтез) =====
   Игры генерируют задания случайно, поэтому озвучка собирается из КОРОТКИХ клипов:
   числа 0–20 и несколько десятков фраз. Один раз записали (мужской голос ElevenLabs) — работает для любых заданий.
   mp3 лежат в assets/audio/barsik/<язык>/<id>.mp3 (ru, kz, en). Нет mp3 → говорит браузер (голос выбираем мужской).
   Другие языки сайта пока озвучиваются по-русски (см. lang()).
*/
(function(){
  var NUM = {
    ru: ['ноль','один','два','три','четыре','пять','шесть','семь','восемь','девять','десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать','двадцать'],
    kz: ['нөл','бір','екі','үш','төрт','бес','алты','жеті','сегіз','тоғыз','он','он бір','он екі','он үш','он төрт','он бес','он алты','он жеті','он сегіз','он тоғыз','жиырма'],
    en: ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty']
  };
  var F = {
    ru: {
      howmuch:'Сколько будет', plus:'плюс', minus:'минус', eq:'равно', ne:'не равно', gt:'больше, чем', lt:'меньше, чем',
      howmany:'Сколько всего?', left:'Сколько осталось?', count:'Посчитай!', put:'Положи в корзину столько:',
      inbasket:'В корзине', needbe:'Нужно, чтобы стало', addmiss:'Добавь, сколько не хватает.',
      missing:'Какое число спряталось?', pickSign:'Выбери знак.', pop:'Лопни столько шаров:', blank:'сколько',
      look:'Смотри!', tapall:'Нажми на каждый предмет.', fly:'Улетают шарики!', which:'Что больше?', ready:'Нажми на галочку, когда будет готово.'
    },
    kz: {
      howmuch:'неше болады?', plus:'плюс', minus:'минус', eq:'тең', ne:'тең емес', gt:'артық', lt:'кем',
      howmany:'Барлығы неше?', left:'Неше қалды?', count:'Санап көр!', put:'Себетке мынаны сал:',
      inbasket:'Себетте', needbe:'болуы керек', addmiss:'Жетпегенін қос.',
      missing:'Қай сан жасырынды?', pickSign:'Белгіні таңда.', pop:'Мына санша шарды жар:', blank:'қанша',
      look:'Қарашы!', tapall:'Әр затқа бас.', fly:'Шарлар ұшып барады!', which:'Қайсысы көп?', ready:'Дайын болғанда құсбелгіні бас.'
    },
    en: {
      howmuch:'How much is', plus:'plus', minus:'minus', eq:'equals', ne:'is not equal to', gt:'is greater than', lt:'is less than',
      howmany:'How many in all?', left:'How many are left?', count:'Count them!', put:'Put this many in the basket:',
      inbasket:'In the basket there are', needbe:'We need', addmiss:'Add what is missing.',
      missing:'Which number is hiding?', pickSign:'Pick the sign.', pop:'Pop this many balloons:', blank:'how many',
      look:'Look!', tapall:'Tap every item.', fly:'The balloons fly away!', which:'Which is more?', ready:'Press the check mark when ready.'
    }
  };
  var PRAISE = {
    ru: ['Молодец!','Отлично!','Ура, правильно!','Супер!','Так держать!'],
    kz: ['Жарайсың!','Керемет!','Ура, дұрыс!','Тамаша!','Өте жақсы!'],
    en: ['Well done!','Great job!','Hooray, correct!','Super!','Keep it up!']
  };
  var OOPS = {
    ru: ['Ой! Не страшно, давай разберёмся.','Почти! Смотри, как надо.','Ничего, ошибаться полезно. Смотри!'],
    kz: ['Ой! Қорықпа, бірге қарайық.','Сәл қалды! Қара, былай.','Ештеңе етпейді, қателесу пайдалы. Қарашы!'],
    en: ['Oops! No worries, let us see.','Almost! Look how it works.','It is fine to make mistakes. Look!']
  };
  var MISC = {
    ru: { intro:'Привет! Я Барсик. Давай играть!', level:'Новый уровень! Ты молодец!', win:'Ура! Ты справился! Вот твоё сокровище!', sticker:'Тебе новый стикер!' },
    kz: { intro:'Сәлем! Мен Барсикпін. Ойнайық!', level:'Жаңа деңгей! Жарайсың!', win:'Ура! Сен жасадың! Міне, қазына!', sticker:'Саған жаңа стикер!' },
    en: { intro:'Hi! I am Barsik. Let us play!', level:'New level! Well done!', win:'Hooray! You did it! Here is your treasure!', sticker:'A new sticker for you!' }
  };

  /* Шаблоны фраз. Элементы массива: число (0–20) | '+' '−' '=' '≠' '<' '>' | '?' (пропуск) | 'f:ключ' (фрагмент).
     Порядок слов в казахском другой — поэтому шаблоны свои для каждого языка. */
  var TPL = {
    ru: {
      sum:   function(v){ return ['f:howmuch', v.a, '+', v.b]; },
      expr:  function(v){ return v.tokens.concat(v.q ? ['f:'+v.q] : []); },
      put:   function(v){ return ['f:put', v.n]; },
      putsum:function(v){ return ['f:put', v.a, '+', v.b]; },
      addmiss:function(v){ return ['f:inbasket', v.a, 'f:needbe', v.c, 'f:addmiss']; },
      pop:   function(v){ return ['f:pop', v.n]; },
      q:     function(v){ return ['f:'+v.k]; }
    },
    kz: {
      sum:   function(v){ return [v.a, '+', v.b, 'f:howmuch']; },
      expr:  function(v){ return v.tokens.concat(v.q ? ['f:'+v.q] : []); },
      put:   function(v){ return ['f:put', v.n]; },
      putsum:function(v){ return ['f:put', v.a, '+', v.b]; },
      addmiss:function(v){ return ['f:inbasket', v.a, '.', v.c, 'f:needbe', 'f:addmiss']; },
      pop:   function(v){ return ['f:pop', v.n]; },
      q:     function(v){ return ['f:'+v.k]; }
    },
    en: {
      sum:   function(v){ return ['f:howmuch', v.a, '+', v.b]; },
      expr:  function(v){ return v.tokens.concat(v.q ? ['f:'+v.q] : []); },
      put:   function(v){ return ['f:put', v.n]; },
      putsum:function(v){ return ['f:put', v.a, '+', v.b]; },
      addmiss:function(v){ return ['f:inbasket', v.a, '.', 'f:needbe', v.c, 'f:addmiss']; },
      pop:   function(v){ return ['f:pop', v.n]; },
      q:     function(v){ return ['f:'+v.k]; }
    }
  };
  var SYM = { '+':'plus', '−':'minus', '-':'minus', '=':'eq', '≠':'ne', '<':'lt', '>':'gt', '?':'blank', '☐':'blank' };

  function lang(){
    var l = document.documentElement.getAttribute('data-current') || 'ru';
    return (l === 'kz' || l === 'en') ? l : 'ru';
  }
  // список всех клипов языка: [{id,text}]
  function allClips(L){
    var out = [];
    NUM[L].forEach(function(t,i){ out.push({id:'n'+i, text:t, group:'числа'}); });
    Object.keys(F[L]).forEach(function(k){ out.push({id:'f_'+k, text:F[L][k], group:'фразы'}); });
    PRAISE[L].forEach(function(t,i){ out.push({id:'praise'+i, text:t, group:'похвала'}); });
    OOPS[L].forEach(function(t,i){ out.push({id:'oops'+i, text:t, group:'ошибка'}); });
    Object.keys(MISC[L]).forEach(function(k){ out.push({id:'m_'+k, text:MISC[L][k], group:'события'}); });
    return out;
  }
  // токены → клипы [{id,text}]
  function clips(tokens, L){
    L = L || lang(); var r = [];
    tokens.forEach(function(t){
      if(typeof t === 'number'){ r.push({id:'n'+t, text:NUM[L][t]}); return; }
      if(t === '.'){ return; }
      if(typeof t === 'string' && t.indexOf('f:') === 0){ var k = t.slice(2); if(F[L][k]) r.push({id:'f_'+k, text:F[L][k]}); return; }
      if(SYM[t]){ var key = SYM[t]; if(F[L][key]) r.push({id:'f_'+key, text:F[L][key]}); return; }
      if(typeof t === 'string' && /^\d+$/.test(t)){ r.push({id:'n'+t, text:NUM[L][+t]}); return; }
      if(t && t.id) r.push(t);
    });
    return r;
  }
  function tpl(name, vars){ var L = lang(); return TPL[L][name](vars || {}); }
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function praise(){ var L = lang(), i = Math.floor(Math.random()*PRAISE[L].length); return [{id:'praise'+i, text:PRAISE[L][i]}]; }
  function oops(){ var L = lang(), i = Math.floor(Math.random()*OOPS[L].length); return [{id:'oops'+i, text:OOPS[L][i]}]; }
  function misc(k){ var L = lang(); return [{id:'m_'+k, text:MISC[L][k]}]; }

  /* ----- воспроизведение ----- */
  var base = (window.__mxBase || '../../../games/') + '../assets/audio/barsik/';
  var token = 0, curAudio = null, enabled = true;
  try { enabled = localStorage.getItem('bilim_mx_snd') !== '0'; } catch(e){}

  var MALE_RE = /pavel|dmitri|dmitry|dmitriy|yuri|yury|maxim|ivan|aleksandr|alexander|mikhail|boris|павел|дмитр|юри|максим|иван|александр|михаил|борис|male|мужск|daniel|david|james|google uk english male/i;
  var FEMALE_RE = /milena|alena|katya|svetlana|dariya|daria|irina|tatyana|elena|anna|female|женск|милена|алён|алена|катя|светлан|дарь|ирин|татьян|елен|анна|samantha|zira|susan/i;
  function bestVoice(L){
    if(!window.speechSynthesis) return null;
    var code = L === 'en' ? 'en' : (L === 'kz' ? 'kk' : 'ru');
    var vs = speechSynthesis.getVoices().filter(function(v){ return (v.lang||'').toLowerCase().indexOf(code) === 0; });
    if(!vs.length && L === 'kz') vs = speechSynthesis.getVoices().filter(function(v){ return (v.lang||'').toLowerCase().indexOf('ru') === 0; });
    var best = null, bs = -99;
    vs.forEach(function(v){
      var s = (MALE_RE.test(v.name)?20:0) - (FEMALE_RE.test(v.name)?8:0) + (/natural|online|neural/i.test(v.name)?4:0) + (!v.localService?1:0);
      if(s > bs){ bs = s; best = v; }
    });
    return best;
  }
  if(window.speechSynthesis && speechSynthesis.addEventListener){ try { speechSynthesis.addEventListener('voiceschanged', function(){}); speechSynthesis.getVoices(); } catch(e){} }

  function stop(){
    token++;
    if(curAudio){ try { curAudio.pause(); } catch(e){} curAudio = null; }
    if(window.speechSynthesis){ try { speechSynthesis.cancel(); } catch(e){} }
  }
  // say(clips, {onstart,onend}) → вернёт Promise
  function say(cl, o){
    o = o || {};
    stop();
    var tok = token, L = lang();
    return new Promise(function(resolve){
      if(!enabled || !cl.length){ resolve(); return; }
      if(o.onstart) o.onstart();
      var finished = false;
      var done = function(){ if(finished) return; finished = true; if(tok === token && o.onend) o.onend(); resolve(); };
      setTimeout(function(){ if(!finished && tok === token){ try { if(curAudio) curAudio.pause(); if(window.speechSynthesis) speechSynthesis.cancel(); } catch(e){} done(); } }, 1600*cl.length + 2500);   // страховка: озвучка не должна подвешивать игру
      var i = 0, fellBack = false;
      var tts = function(from){
        if(fellBack) return; fellBack = true;
        if(tok !== token || !window.speechSynthesis) return done();
        var text = cl.slice(from).map(function(c){ return c.text; }).join(', ');
        var u = new SpeechSynthesisUtterance(text);
        u.lang = L === 'en' ? 'en-US' : (L === 'kz' ? 'kk-KZ' : 'ru-RU'); u.rate = .9; u.pitch = 1;
        var v = bestVoice(L); if(v){ u.voice = v; u.lang = v.lang; }
        if(!v || !MALE_RE.test(v.name)) u.pitch = .85;   // нет мужского голоса → чуть ниже тон (сильнее нельзя: звучит жутко)
        u.onend = done; u.onerror = done;
        speechSynthesis.speak(u);
      };
      (function next(){
        if(tok !== token) return resolve();
        if(i >= cl.length) return done();
        var a = new Audio(base + L + '/' + cl[i].id + '.mp3');
        curAudio = a;
        var from = i;
        a.onended = function(){ i++; next(); };
        a.onerror = function(){ tts(from); };
        var p; try { p = a.play(); } catch(e){ tts(from); return; }
        if(p && p.catch) p.catch(function(){ tts(from); });
      })();
    });
  }
  function setEnabled(v){ enabled = !!v; try { localStorage.setItem('bilim_mx_snd', v ? '1' : '0'); } catch(e){} if(!v) stop(); }

  window.MXV = {
    lang:lang, tpl:tpl, clips:clips, say:say, stop:stop, praise:praise, oops:oops, misc:misc, allClips:allClips,
    enabled:function(){ return enabled; }, setEnabled:setEnabled, NUM:NUM, F:F
  };
})();
