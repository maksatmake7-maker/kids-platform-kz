/* «Магнат: Путешествие по Казахстану» — настольная игра с кубиками на одном устройстве (2–4 игрока, можно с компьютером). */
(function(){
var L = {
ru:{h2:'Магнат: Путешествие по Казахстану',lead:'Бросай кубики, путешествуй по городам Казахстана, покупай их и собирай плату с гостей. Отвечай на вопросы и стань главным магнатом!',
 players:'Игроки',name:'Имя',human:'Человек',bot:'Компьютер',len:'Длина игры',l1:'Короткая (10 кругов)',l2:'Средняя (18 кругов)',l3:'Долгая (28 кругов)',start:'Начать игру!',
 roll:'Бросить кубики',turn:'Ходит',round:'Круг {0} из {1}',buy:'Купить за {0}',skip:'Не покупать',upg:'Улучшить за {0}',buyq:'Купить «{0}» за {1} монет?',upgq:'Построить гостиницу в «{0}» за {1}? Плата вырастет.',
 rolled:'{0} выбросил {1} и {2} = {3}',dbl:'Дубль! Ходи ещё раз',bought:'{0} купил «{1}»',upgd:'{0} построил гостиницу в «{1}»',rent:'{0} платит {1} монет игроку {2}',pass:'{0} прошёл Старт: +100',
 rest:'{0} отдыхает и пропустит ход',restmsg:'Отдых на пляже: пропусти следующий ход',nau:'{0} на празднике Наурыз: подарок +50',tax:'{0} платит налог 50',bai:'{0} летит на Байконур вперёд на 3 клетки!',
 qt:'Вопрос о Казахстане',right:'Верно! +80 монет',wrong:'Не угадал. Правильный ответ: {0}',bank:'{0} разорился и выбывает',won:'Победитель: {0}!',again:'Играть снова',ok:'Хорошо',
 coins:'монет',station:'Ж/Д станция',stq:'Купить станцию за {0} монет?',stn:'Станция',cStart:'Старт',cRest:'Отдых',cQ:'Вопрос',cTax:'Налог',cBai:'Байконур',cNau:'Наурыз',
 info:'Цена {0}, плата {1}',owner:'Хозяин: {0}',free:'Свободно',net:'Итог',sound:'Звук',more:'Ещё'},
kz:{h2:'Магнат: Қазақстан бойынша саяхат',lead:'Сүйек тастап, Қазақстан қалаларын аралап, оларды сатып ал. Сұрақтарға жауап беріп, басты магнат бол!',
 players:'Ойыншылар',name:'Аты',human:'Адам',bot:'Компьютер',len:'Ойын ұзақтығы',l1:'Қысқа (10 айналым)',l2:'Орташа (18 айналым)',l3:'Ұзақ (28 айналым)',start:'Ойынды бастау!',
 roll:'Сүйек тастау',turn:'Жүріс',round:'{0}-айналым / {1}',buy:'{0} теңгеге сатып алу',skip:'Алмау',upg:'{0} теңгеге жақсарту',buyq:'«{0}» қаласын {1} монетаға сатып аласың ба?',upgq:'«{0}» қаласына {1} монетаға қонақүй саласың ба? Төлем өседі.',
 rolled:'{0}: {1} және {2} = {3}',dbl:'Дубль! Тағы бір рет таста',bought:'{0} «{1}» қаласын сатып алды',upgd:'{0} «{1}» қаласында қонақүй салды',rent:'{0} {2} ойыншыға {1} монета төлейді',pass:'{0} Стартты өтті: +100',
 rest:'{0} демалады, келесі жүрісті өткізеді',restmsg:'Жағажайда демалыс: келесі жүрісті өткіз',nau:'{0} Наурыз мерекесінде: сыйлық +50',tax:'{0} 50 салық төлейді',bai:'{0} Байқоңырға 3 торап алға ұшады!',
 qt:'Қазақстан туралы сұрақ',right:'Дұрыс! +80 монета',wrong:'Қате. Дұрыс жауап: {0}',bank:'{0} банкрот болып, ойыннан шықты',won:'Жеңімпаз: {0}!',again:'Қайта ойнау',ok:'Жақсы',
 coins:'монета',station:'Темір жол стансасы',stq:'Стансаны {0} монетаға сатып аласың ба?',stn:'Станса',cStart:'Старт',cRest:'Демалыс',cQ:'Сұрақ',cTax:'Салық',cBai:'Байқоңыр',cNau:'Наурыз',
 info:'Бағасы {0}, төлем {1}',owner:'Иесі: {0}',free:'Бос',net:'Нәтиже',sound:'Дыбыс',more:'Тағы'},
en:{h2:'Tycoon: Journey across Kazakhstan',lead:'Roll the dice, travel across the cities of Kazakhstan, buy them and collect rent. Answer questions and become the top tycoon!',
 players:'Players',name:'Name',human:'Human',bot:'Computer',len:'Game length',l1:'Short (10 rounds)',l2:'Medium (18 rounds)',l3:'Long (28 rounds)',start:'Start the game!',
 roll:'Roll the dice',turn:'Turn',round:'Round {0} of {1}',buy:'Buy for {0}',skip:'Skip',upg:'Upgrade for {0}',buyq:'Buy {0} for {1} coins?',upgq:'Build a hotel in {0} for {1}? Rent will grow.',
 rolled:'{0} rolled {1} and {2} = {3}',dbl:'Doubles! Roll again',bought:'{0} bought {1}',upgd:'{0} built a hotel in {1}',rent:'{0} pays {1} coins to {2}',pass:'{0} passed Start: +100',
 rest:'{0} rests and skips a turn',restmsg:'Rest on the beach: skip your next turn',nau:'{0} at the Nauryz holiday: gift +50',tax:'{0} pays tax 50',bai:'{0} flies from Baikonur forward 3 spaces!',
 qt:'A question about Kazakhstan',right:'Correct! +80 coins',wrong:'Not quite. The right answer: {0}',bank:'{0} went bankrupt and is out',won:'Winner: {0}!',again:'Play again',ok:'OK',
 coins:'coins',station:'Railway station',stq:'Buy the station for {0} coins?',stn:'Station',cStart:'Start',cRest:'Rest',cQ:'Question',cTax:'Tax',cBai:'Baikonur',cNau:'Nauryz',
 info:'Price {0}, rent {1}',owner:'Owner: {0}',free:'Available',net:'Total',sound:'Sound',more:'More'}
};
function lang(){ var c = document.documentElement.getAttribute('data-current'); if(!c){ try{ c = localStorage.getItem('bilim_lang_v1'); }catch(e){} }
  if(c==='kz') return 'kz'; if(c==='en'||c==='de'||c==='fr'||c==='zh') return 'en'; return 'ru'; }
function t(k,a){ var d = L[lang()], s = (d && d[k]!==undefined) ? d[k] : (L.ru[k]!==undefined ? L.ru[k] : k); (a||[]).forEach(function(v,i){ s = s.split('{'+i+'}').join(v); }); return s; }
function nm(o){ return o[lang()] || o.ru; }

/* ---------- поле ---------- */
var COL = {n:'#4CAF50',e:'#42A5F5',c:'#AB47BC',s:'#FF9800',w:'#EF5350',p:'#FFC107'};
function C(g,price,ico,ru,kz,en){ return {k:'city',g:g,price:price,ico:ico,n:{ru:ru,kz:kz,en:en}}; }
function Sp(k,ico,tk){ return {k:k,ico:ico,tk:tk}; }
var CELLS = [
 Sp('start','🏁','cStart'),
 C('n',60,'🏞️','Кокшетау','Көкшетау','Kokshetau'), C('n',60,'🌾','Петропавловск','Петропавл','Petropavl'), Sp('q','❓','cQ'), C('n',80,'🌻','Костанай','Қостанай','Kostanay'), Sp('st','🚂','stn'),
 Sp('rest','🏖️','cRest'),
 C('e',100,'✒️','Семей','Семей','Semey'), C('e',100,'⛰️','Усть-Каменогорск','Өскемен','Oskemen'), Sp('q','❓','cQ'), C('c',120,'⛏️','Караганда','Қарағанды','Karaganda'), C('s',140,'🏛️','Тараз','Тараз','Taraz'),
 Sp('bai','🚀','cBai'),
 C('s',160,'🌳','Шымкент','Шымкент','Shymkent'), Sp('tax','💰','cTax'), C('s',180,'🕌','Туркестан','Түркістан','Turkistan'), Sp('q','❓','cQ'), Sp('st','🚂','stn'),
 Sp('nau','🎉','cNau'),
 C('w',200,'🐟','Уральск','Орал','Oral'), C('w',220,'🛢️','Атырау','Атырау','Atyrau'), C('w',240,'🌊','Актау','Ақтау','Aktau'), C('p',300,'🍎','Алматы','Алматы','Almaty'), C('p',350,'🏙️','Астана','Астана','Astana')
];
var SIZE = 24;
function posXY(i){ if(i<=6) return [6,6-i]; if(i<=12) return [6-(i-6),0]; if(i<=18) return [0,i-12]; return [i-18,6]; }
function rent(i){ var c = CELLS[i]; if(c.k==='st'){ var n = 0; CELLS.forEach(function(x,j){ if(x.k==='st' && OWN[j] && OWN[j].o===OWN[i].o) n++; }); return 40*n; }
  var r = Math.round(c.price/5), o = OWN[i]; if(o && fullGroup(i,o.o)) r *= 2; if(o && o.lv) r *= 2; return r; }
function fullGroup(i,o){ var g = CELLS[i].g, ok = true; CELLS.forEach(function(x,j){ if(x.k==='city' && x.g===g && (!OWN[j] || OWN[j].o!==o)) ok = false; }); return ok; }

/* ---------- вопросы: [вопрос ru,kz,en, верный ru,kz,en, неверный1 ..., неверный2 ...] ---------- */
var Q = [
 ['Столица Казахстана?','Қазақстанның астанасы қай қала?','What is the capital of Kazakhstan?',['Астана','Астана','Astana'],['Алматы','Алматы','Almaty'],['Шымкент','Шымкент','Shymkent']],
 ['Какая валюта в Казахстане?','Қазақстанның валютасы қандай?','What is the currency of Kazakhstan?',['Тенге','Теңге','Tenge'],['Рубль','Рубль','Ruble'],['Доллар','Доллар','Dollar']],
 ['Как называется двухструнный музыкальный инструмент?','Екі шекті аспап қалай аталады?','What is the two-stringed instrument called?',['Домбра','Домбыра','Dombra'],['Скрипка','Скрипка','Violin'],['Гитара','Гитара','Guitar']],
 ['Как называется традиционное жилище кочевников?','Көшпенділердің дәстүрлі баспанасы қалай аталады?','What is the traditional home of nomads?',['Юрта','Киіз үй','Yurt'],['Дворец','Сарай','Palace'],['Башня','Мұнара','Tower']],
 ['Какой космодром находится в Казахстане?','Қазақстанда қай ғарыш айлағы бар?','Which spaceport is in Kazakhstan?',['Байконур','Байқоңыр','Baikonur'],['Кейп-Канаверал','Кейп-Канаверал','Cape Canaveral'],['Плесецк','Плесецк','Plesetsk']],
 ['Какой весенний праздник отмечают 22 марта?','22 наурызда қандай көктем мерекесі тойланады?','Which spring holiday is celebrated on 22 March?',['Наурыз','Наурыз','Nauryz'],['Новый год','Жаңа жыл','New Year'],['День знаний','Білім күні','Day of Knowledge']],
 ['Какое море омывает запад Казахстана?','Қазақстанның батысын қай теңіз шайып жатыр?','Which sea is on the west of Kazakhstan?',['Каспийское','Каспий теңізі','Caspian Sea'],['Чёрное','Қара теңіз','Black Sea'],['Средиземное','Жерорта теңізі','Mediterranean Sea']],
 ['Какая птица изображена на флаге Казахстана?','Қазақстан туында қай құс бейнеленген?','Which bird is on the flag of Kazakhstan?',['Степной орёл','Дала қыраны','Steppe eagle'],['Журавль','Тырна','Crane'],['Сова','Үкі','Owl']],
 ['Кого называют «кораблём пустыни»?','«Шөл кемесі» кім?','Which animal is the “ship of the desert”?',['Верблюд','Түйе','Camel'],['Конь','Жылқы','Horse'],['Слон','Піл','Elephant']],
 ['Как называется национальная конная игра за тушей козла?','Серкенің мәйітін алып жарысатын ұлттық ат ойыны қалай аталады?','What is the national horseback game called?',['Кокпар','Көкпар','Kokpar'],['Футбол','Футбол','Football'],['Регби','Регби','Rugby']],
 ['Как называется казахский национальный халат?','Қазақтың ұлттық шапаны қалай аталады?','What is the Kazakh national robe called?',['Чапан','Шапан','Chapan'],['Сарафан','Сарафан','Sarafan'],['Кимоно','Кимоно','Kimono']],
 ['В каком городе находится мавзолей Ходжи Ахмеда Ясави?','Қожа Ахмет Ясауи кесенесі қай қалада?','In which city is the mausoleum of Khoja Ahmed Yasawi?',['Туркестан','Түркістан','Turkistan'],['Атырау','Атырау','Atyrau'],['Костанай','Қостанай','Kostanay']],
 ['Какой город называют южной столицей?','Қай қаланы оңтүстік астана дейді?','Which city is called the southern capital?',['Алматы','Алматы','Almaty'],['Актау','Ақтау','Aktau'],['Семей','Семей','Semey']],
 ['Казахстан — самая большая в мире страна без…','Қазақстан — әлемдегі ең үлкен ел, онда жоқ…','Kazakhstan is the largest country in the world without…',['выхода к океану','мұхитқа шығатын жол','access to the ocean'],['гор','тау','mountains'],['рек','өзен','rivers']],
 ['Какой праздник отмечают 16 декабря?','16 желтоқсанда қандай мереке тойланады?','Which holiday is on 16 December?',['День Независимости','Тәуелсіздік күні','Independence Day'],['Новый год','Жаңа жыл','New Year'],['День знаний','Білім күні','Day of Knowledge']],
 ['Кто такой Абай?','Абай кім?','Who was Abai?',['Великий казахский поэт и мыслитель','Ұлы қазақ ақыны әрі ойшылы','A great Kazakh poet and thinker'],['Космонавт','Ғарышкер','An astronaut'],['Футболист','Футболшы','A football player']],
 ['Как называется верхний круглый купол юрты?','Киіз үйдің жоғарғы дөңгелек күмбезі қалай аталады?','What is the round top of a yurt called?',['Шанырак','Шаңырақ','Shanyrak'],['Кошма','Киіз','Felt'],['Курпе','Көрпе','Blanket']],
 ['Как зовут крылатого коня из тюркских сказаний?','Түркі аңыздарындағы қанатты ат кім?','What is the winged horse of Turkic legends called?',['Тулпар','Тұлпар','Tulpar'],['Пегас','Пегас','Pegasus'],['Единорог','Бірмүйізді','Unicorn']],
 ['С какой птицей охотятся казахские охотники?','Қазақ аңшылары қандай құспен аңға шығады?','Which bird do Kazakh hunters use?',['С беркутом','Бүркітпен','A golden eagle'],['С попугаем','Тотықұспен','A parrot'],['С совой','Үкімен','An owl']],
 ['Какое озеро одной частью пресное, а другой солёное?','Қай көлдің бір жағы тұщы, бір жағы тұзды?','Which lake is fresh in one part and salty in another?',['Балхаш','Балқаш','Balkhash'],['Байкал','Байкал','Baikal'],['Ладога','Ладога','Ladoga']],
 ['Какая страна граничит с Казахстаном на севере?','Қазақстанмен солтүстігінде қай ел шектеседі?','Which country borders Kazakhstan on the north?',['Россия','Ресей','Russia'],['Индия','Үндістан','India'],['Турция','Түркия','Turkey']],
 ['Какое блюдо называют «пять пальцев»?','Қай тағамды «бес саусақ» дейді?','Which dish is called “five fingers”?',['Бешбармак','Бешбармақ','Beshbarmak'],['Борщ','Борщ','Borscht'],['Плов','Палау','Pilaf']],
 ['Какая река течёт на востоке Казахстана?','Қазақстанның шығысында қай өзен ағады?','Which river flows in the east of Kazakhstan?',['Иртыш','Ертіс','Irtysh'],['Нева','Нева','Neva'],['Амазонка','Амазонка','Amazon']],
 ['Какой город был столицей до Астаны?','Астанаға дейін қай қала астана болған?','Which city was the capital before Astana?',['Алматы','Алматы','Almaty'],['Шымкент','Шымкент','Shymkent'],['Караганда','Қарағанды','Karaganda']]
];

/* ---------- состояние ---------- */
var CHARS = ['leopard','fox','bear','rabbit','boy','girl','kzboy','kzgirl','cat','horse','astronaut','robot'];
var PCOL = ['#e53935','#1e88e5','#43a047','#fb8c00'];
var ROUNDS = {1:10,2:18,3:28};
var SET = {pl:[{n:'',human:true,tk:'leopard'},{n:'',human:false,tk:'fox'}],len:2};
var P = [], OWN = {}, cur = 0, round = 1, maxR = 18, over = false, gameId = 0, dbl = 0, logL = [];
var root, boardEl, midEl, sideEl, muted = false, AC = null;

function h(tag,at,kids){ var e = document.createElement(tag); at = at||{}; Object.keys(at).forEach(function(k){ if(k==='class') e.className = at[k]; else if(k.indexOf('on')===0) e[k] = at[k]; else if(k==='style') e.style.cssText = at[k]; else e.setAttribute(k,at[k]); }); (kids||[]).forEach(function(c){ e.appendChild(typeof c==='string' ? document.createTextNode(c) : c); }); return e; }
function sleep(ms){ return new Promise(function(r){ setTimeout(r,ms); }); }
function tokCanvas(id,px){ var c = h('canvas',{width:112,height:112}), k = c.getContext('2d'); k.translate(56,60); if(window.RZC && RZC.has(id)) RZC.draw(k,id,68,1.3,'stand'); return c; }
function defName(i){ return ({ru:'Игрок ',kz:'Ойыншы ',en:'Player '})[lang()]+(i+1); }

/* ---------- звук ---------- */
function ac(){ if(muted) return null; if(!AC){ var C2 = window.AudioContext||window.webkitAudioContext; if(!C2) return null; AC = new C2(); } if(AC.state==='suspended') AC.resume(); return AC; }
function tone(f0,f1,d,type,v){ var a = ac(); if(!a) return; var o = a.createOscillator(), g = a.createGain(), n = a.currentTime; o.type = type||'sine'; o.frequency.setValueAtTime(f0,n); o.frequency.exponentialRampToValueAtTime(f1,n+d); g.gain.setValueAtTime(v||0.2,n); g.gain.exponentialRampToValueAtTime(0.0001,n+d); o.connect(g); g.connect(a.destination); o.start(n); o.stop(n+d+0.02); }
function sfx(k){ if(k==='tick') tone(500,380,0.06,'triangle',0.15); else if(k==='roll'){ for(var i=0;i<6;i++) setTimeout(function(){ tone(200+Math.random()*300,120,0.05,'square',0.08); },i*90); } else if(k==='coin'){ tone(880,1320,0.12,'sine',0.2); setTimeout(function(){ tone(1320,1760,0.15,'sine',0.15); },90); } else if(k==='no') tone(220,110,0.3,'sawtooth',0.15); else if(k==='win'){ [523,659,784,1047].forEach(function(f,i){ setTimeout(function(){ tone(f,f,0.25,'triangle',0.2); },i*140); }); } }

/* ---------- экран настройки ---------- */
function renderSetup(){
  over = true; gameId++; root.innerHTML = '';
  var card = h('div',{class:'mg-card mg-set'});
  card.appendChild(h('h3',{},['👥 '+t('players')]));
  SET.pl.forEach(function(p,i){
    var row = h('div',{class:'mg-pl'});
    var tk = h('button',{type:'button',class:'mg-tk',style:'border-color:'+PCOL[i],onclick:function(){ var used = SET.pl.map(function(x){ return x.tk; }), k = CHARS.indexOf(p.tk); do { k = (k+1)%CHARS.length; } while(used.indexOf(CHARS[k])>=0); p.tk = CHARS[k]; renderSetup(); }},[tokCanvas(p.tk)]);
    var inp = h('input',{type:'text',maxlength:14,placeholder:defName(i),value:p.n,oninput:function(e){ p.n = e.target.value; }});
    row.appendChild(tk); row.appendChild(inp);
    row.appendChild(h('button',{type:'button',class:'mg-btn sm'+(p.human?' on':''),onclick:function(){ p.human = true; renderSetup(); }},['🧒 '+t('human')]));
    row.appendChild(h('button',{type:'button',class:'mg-btn sm'+(!p.human?' on':''),onclick:function(){ p.human = false; renderSetup(); }},['🤖 '+t('bot')]));
    if(SET.pl.length>2 && i===SET.pl.length-1) row.appendChild(h('button',{type:'button',class:'mg-btn sm',onclick:function(){ SET.pl.pop(); renderSetup(); }},['✖']));
    card.appendChild(row);
  });
  if(SET.pl.length<4) card.appendChild(h('button',{type:'button',class:'mg-btn',onclick:function(){ var used = SET.pl.map(function(x){ return x.tk; }), id = CHARS.filter(function(c){ return used.indexOf(c)<0; })[0]; SET.pl.push({n:'',human:false,tk:id}); renderSetup(); }},['➕ '+t('more')]));
  card.appendChild(h('h3',{style:'margin-top:16px'},['⏱ '+t('len')]));
  var lr = h('div',{class:'mg-row'});
  [1,2,3].forEach(function(k){ lr.appendChild(h('button',{type:'button',class:'mg-btn'+(SET.len===k?' on':''),onclick:function(){ SET.len = k; renderSetup(); }},[t('l'+k)])); });
  card.appendChild(lr);
  card.appendChild(h('div',{class:'mg-row',style:'margin-top:16px'},[h('button',{type:'button',class:'mg-btn go',onclick:startGame},['🎲 '+t('start')])]));
  root.appendChild(card);
}

/* ---------- игра ---------- */
function startGame(){
  ac();
  P = SET.pl.map(function(p,i){ return {n:(p.n||'').trim()||defName(i),human:p.human,tk:p.tk,col:PCOL[i],pos:0,coins:1000,alive:true,skip:false}; });
  OWN = {}; cur = 0; round = 1; maxR = ROUNDS[SET.len]; over = false; dbl = 0; logL = []; var gid = ++gameId;
  buildBoard(); renderAll(); say(t('turn')+': '+P[0].n);
  loop(gid);
}
function buildBoard(){
  root.innerHTML = '';
  var top = h('div',{class:'mg-top'},[h('b',{id:'mg-rd'},['']),h('div',{},[h('button',{type:'button',class:'mg-btn sm',onclick:function(){ muted = !muted; this.textContent = (muted?'🔇 ':'🔊 ')+t('sound'); }},['🔊 '+t('sound')]),' ',h('button',{type:'button',class:'mg-btn sm',onclick:function(){ renderSetup(); }},['⟲'])])]);
  root.appendChild(top);
  var play = h('div',{class:'mg-play'});
  boardEl = h('div',{class:'mg-board'});
  CELLS.forEach(function(c,i){
    var xy = posXY(i), el = h('div',{class:'mg-cell',id:'mg-c'+i,style:'grid-row:'+(xy[0]+1)+';grid-column:'+(xy[1]+1),onclick:function(){ cellInfo(i); }});
    el.appendChild(h('div',{class:'st',style:'background:'+(c.k==='city'?COL[c.g]:'#cfd8e3')}));
    el.appendChild(h('div',{class:'ic'},[c.ico]));
    el.appendChild(h('div',{class:'nm'},[c.k==='city' ? nm(c.n) : (c.k==='st' ? t('stn') : t(c.tk))]));
    if(c.k==='city') el.appendChild(h('div',{class:'pr'},[String(c.price)])); else if(c.k==='st') el.appendChild(h('div',{class:'pr'},['150']));
    el.appendChild(h('div',{class:'own'})); el.appendChild(h('div',{class:'tks'}));
    boardEl.appendChild(el);
  });
  midEl = h('div',{class:'mg-mid'},[h('div',{class:'ttl'},['🎲 '+t('h2')]),h('div',{class:'who',id:'mg-who'},['']),h('div',{class:'mg-dice'},[dieEl('d1'),dieEl('d2')]),h('div',{class:'msg',id:'mg-msg'},['']),h('button',{type:'button',class:'mg-btn go',id:'mg-roll',style:'display:none'},['🎲 '+t('roll')])]);
  boardEl.appendChild(midEl);
  sideEl = h('div',{class:'mg-side'},[h('div',{class:'mg-pls',id:'mg-pls'}),h('div',{class:'mg-log',id:'mg-log'})]);
  play.appendChild(boardEl); play.appendChild(sideEl); root.appendChild(play);
  var fit = function(){ boardEl.style.setProperty('--u',(boardEl.clientWidth/7)+'px'); }; fit();
  if(window.ResizeObserver) new ResizeObserver(fit).observe(boardEl); else window.addEventListener('resize',fit);
  setDice(1,1);
}
function dieEl(id){ var d = h('div',{class:'mg-die',id:'mg-'+id}); for(var i=0;i<9;i++) d.appendChild(h('i')); return d; }
var PIPS = {1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
function setDice(a,b){ [['d1',a],['d2',b]].forEach(function(x){ var d = document.getElementById('mg-'+x[0]); if(!d) return; d.querySelectorAll('i').forEach(function(i,k){ i.className = PIPS[x[1]].indexOf(k)>=0 ? 'p' : ''; }); }); }
function renderAll(){ renderTokens(); renderOwn(); renderPlayers(); renderLog(); var r = document.getElementById('mg-rd'); if(r) r.textContent = t('round',[Math.min(round,maxR),maxR]); var w = document.getElementById('mg-who'); if(w && P[cur]){ w.textContent = P[cur].n; w.style.background = P[cur].col; }
  document.querySelectorAll('.mg-cell').forEach(function(e){ e.classList.remove('cur'); }); if(P[cur] && P[cur].alive){ var ce = document.getElementById('mg-c'+P[cur].pos); if(ce) ce.classList.add('cur'); } }
function renderTokens(){ CELLS.forEach(function(c,i){ var tk = document.querySelector('#mg-c'+i+' .tks'); if(tk) tk.innerHTML = ''; }); P.forEach(function(p){ if(!p.alive) return; var tk = document.querySelector('#mg-c'+p.pos+' .tks'); if(tk){ var cv = tokCanvas(p.tk); cv.style.filter = 'drop-shadow(0 0 2px '+p.col+') drop-shadow(0 0 2px '+p.col+')'; tk.appendChild(cv); } }); }
function renderOwn(){ CELLS.forEach(function(c,i){ var el = document.querySelector('#mg-c'+i); if(!el) return; var o = OWN[i], ow = el.querySelector('.own'); ow.style.background = o ? P[o.o].col : 'transparent'; var lv = el.querySelector('.lv'); if(lv) lv.remove(); if(o && o.lv) el.appendChild(h('div',{class:'lv'},['🏨'])); }); }
function worth(p){ var s = p.coins; Object.keys(OWN).forEach(function(i){ if(P[OWN[i].o]===p){ var c = CELLS[i]; s += (c.price||150)+(OWN[i].lv?Math.round((c.price||0)/2):0); } }); return s; }
function renderPlayers(){ var box = document.getElementById('mg-pls'); if(!box) return; box.innerHTML = ''; P.forEach(function(p,i){ var dots = h('div',{class:'dots'}); Object.keys(OWN).forEach(function(k){ if(P[OWN[k].o]===p) dots.appendChild(h('i',{style:'background:'+(CELLS[k].k==='city'?COL[CELLS[k].g]:'#78909c')})); });
  box.appendChild(h('div',{class:'mg-p'+(p.alive?'':' off')+(i===cur?' cur':''),style:'border-color:'+p.col},[tokCanvas(p.tk),h('div',{},[h('b',{},[p.n]),h('span',{},['💰 '+p.coins]),dots])])); }); }
function say(s){ var m = document.getElementById('mg-msg'); if(m) m.textContent = s; }
function log(s){ logL.unshift(s); if(logL.length>40) logL.pop(); renderLog(); say(s); }
function renderLog(){ var l = document.getElementById('mg-log'); if(!l) return; l.innerHTML = ''; logL.slice(0,8).forEach(function(s){ l.appendChild(h('div',{},[s])); }); }

/* ---------- диалоги ---------- */
function dialog(ico,title,text,btns){
  return new Promise(function(res){
    var ov = h('div',{class:'mg-ov'}), d = h('div',{class:'mg-dlg'});
    d.appendChild(h('div',{class:'big'},[ico])); if(title) d.appendChild(h('h4',{},[title])); if(text) d.appendChild(h('p',{},[text]));
    btns.forEach(function(b){ d.appendChild(h('button',{type:'button',class:'mg-btn '+(b.cls||''),onclick:function(){ ov.remove(); res(b.v); }},[b.l])); });
    ov.appendChild(d); document.body.appendChild(ov);
  });
}
function cellInfo(i){ if(over) return; var c = CELLS[i]; if(document.querySelector('.mg-ov')) return;
  var nme = c.k==='city' ? nm(c.n) : (c.k==='st' ? t('station') : t(c.tk)), txt = '';
  if(c.k==='city'||c.k==='st'){ txt = t('info',[c.price||150, c.k==='city' ? Math.round(c.price/5) : 40])+'. '+(OWN[i] ? t('owner',[P[OWN[i].o].n]) : t('free')); }
  dialog(c.ico,nme,txt,[{l:t('ok'),v:1}]);
}

/* ---------- ход ---------- */
function next(){ var n = P.length, k = cur; do { k = (k+1)%n; if(k===0) round++; } while(!P[k].alive); cur = k; dbl = 0; }
function alive(){ return P.filter(function(p){ return p.alive; }); }
async function loop(gid){
  while(!over && gid===gameId){
    var p = P[cur]; renderAll();
    if(round>maxR){ await finish(); return; }
    if(p.skip){ p.skip = false; log(t('rest',[p.n])); await sleep(1100); if(gid!==gameId) return; next(); continue; }
    var res = await playTurn(p,gid); if(gid!==gameId) return;
    if(over) return;
    if(res==='again' && p.alive){ continue; }
    if(alive().length<=1){ await finish(); return; }
    next();
  }
}
function waitRoll(p){ return new Promise(function(res){ var b = document.getElementById('mg-roll'); if(!p.human){ setTimeout(res,900); return; } b.style.display = ''; b.textContent = '🎲 '+t('roll'); b.onclick = function(){ b.style.display = 'none'; res(); }; }); }
async function playTurn(p,gid){
  say(t('turn')+': '+p.n); await waitRoll(p); if(gid!==gameId) return;
  var a = 1+Math.floor(Math.random()*6), b = 1+Math.floor(Math.random()*6);
  var d1 = document.getElementById('mg-d1'), d2 = document.getElementById('mg-d2'); d1.classList.add('roll'); d2.classList.add('roll'); sfx('roll');
  for(var i=0;i<8;i++){ setDice(1+Math.floor(Math.random()*6),1+Math.floor(Math.random()*6)); await sleep(90); }
  d1.classList.remove('roll'); d2.classList.remove('roll'); setDice(a,b);
  log(t('rolled',[p.n,a,b,a+b])); await sleep(500); if(gid!==gameId) return;
  var isD = a===b; if(isD) dbl++;
  await moveBy(p,a+b,gid); if(gid!==gameId) return;
  await land(p,gid); if(gid!==gameId) return;
  if(isD && dbl<3 && p.alive && !p.skip){ log(t('dbl')); await sleep(700); return 'again'; }
  return 'next';
}
async function moveBy(p,n,gid){ for(var i=0;i<n;i++){ p.pos = (p.pos+1)%SIZE; if(p.pos===0){ p.coins += 100; sfx('coin'); log(t('pass',[p.n])); } sfx('tick'); renderAll(); await sleep(260); if(gid!==gameId) return; } }
function pay(from,to,amt){ var a = Math.min(Math.max(from.coins,0),amt); from.coins -= amt; if(to) to.coins += a; sfx('coin'); if(from.coins<0) return true; return false; }
async function bankrupt(p){ p.alive = false; p.coins = 0; Object.keys(OWN).forEach(function(k){ if(P[OWN[k].o]===p) delete OWN[k]; }); sfx('no'); log(t('bank',[p.n])); renderAll(); await sleep(900); }
async function land(p,gid){
  var i = p.pos, c = CELLS[i], idx = P.indexOf(p);
  if(c.k==='city' || c.k==='st'){
    var o = OWN[i], price = c.price||150, name = c.k==='city' ? nm(c.n) : t('station');
    if(!o){
      var ch;
      if(p.human) ch = await dialog(c.ico,name,t(c.k==='city'?'buyq':'stq',c.k==='city'?[name,price]:[price]),[{l:'✅ '+t('buy',[price]),v:1,cls:'ok',},{l:t('skip'),v:0}]);
      else { await sleep(700); ch = (p.coins-price>=200) ? 1 : 0; }
      if(gid!==gameId) return;
      if(ch && p.coins>=price){ p.coins -= price; OWN[i] = {o:idx,lv:0}; sfx('coin'); log(t('bought',[p.n,name])); renderAll(); await sleep(500); }
      else if(ch){ log(p.n+': 💸'); }
    } else if(o.o!==idx){
      var r = rent(i), owner = P[o.o]; log(t('rent',[p.n,r,owner.n])); var broke = pay(p,owner,r); renderAll(); await sleep(900);
      if(broke) await bankrupt(p);
    } else if(c.k==='city' && !o.lv && fullGroup(i,idx)){
      var cost = Math.round(price/2), up;
      if(p.human){ if(p.coins>=cost) up = await dialog('🏨',name,t('upgq',[name,cost]),[{l:'🏨 '+t('upg',[cost]),v:1,cls:'ok'},{l:t('skip'),v:0}]); else up = 0; }
      else { await sleep(600); up = (p.coins-cost>=300) ? 1 : 0; }
      if(up && p.coins>=cost){ p.coins -= cost; o.lv = 1; sfx('coin'); log(t('upgd',[p.n,name])); renderAll(); await sleep(500); }
    }
  } else if(c.k==='tax'){ log(t('tax',[p.n])); var br = pay(p,null,50); renderAll(); await sleep(800); if(br) await bankrupt(p); }
  else if(c.k==='nau'){ p.coins += 50; sfx('coin'); log(t('nau',[p.n])); renderAll(); await sleep(900); }
  else if(c.k==='rest'){ p.skip = true; log(t('restmsg')); await sleep(900); }
  else if(c.k==='bai'){ log(t('bai',[p.n])); await sleep(800); await moveBy(p,3,gid); if(gid!==gameId) return; await sleep(300); if(CELLS[p.pos].k!=='bai') await land(p,gid); }
  else if(c.k==='q'){ await askQ(p,gid); }
  renderAll();
}
async function askQ(p,gid){
  var q = Q[Math.floor(Math.random()*Q.length)], li = {ru:0,kz:1,en:2}[lang()];
  var opts = [{a:q[3][li],ok:true},{a:q[4][li]},{a:q[5][li]}].sort(function(){ return Math.random()-0.5; });
  var correct;
  if(p.human){
    var pick = await new Promise(function(res){ var ov = h('div',{class:'mg-ov'}), d = h('div',{class:'mg-dlg'}); d.appendChild(h('div',{class:'big'},['❓'])); d.appendChild(h('h4',{},[t('qt')])); d.appendChild(h('p',{},[q[li]]));
      opts.forEach(function(o){ d.appendChild(h('button',{type:'button',class:'mg-btn',onclick:function(){ ov.remove(); res(o); }},[o.a])); }); ov.appendChild(d); document.body.appendChild(ov); });
    correct = !!pick.ok;
  } else { await sleep(900); correct = Math.random()<0.6; }
  if(gid!==gameId) return;
  var ans = q[3][li];
  if(correct){ p.coins += 80; sfx('win'); log(p.n+': '+t('right')); if(p.human) await dialog('🎉',t('right'),'',[{l:t('ok'),v:1,cls:'ok'}]); else await sleep(700); }
  else { sfx('no'); log(p.n+': '+t('wrong',[ans])); if(p.human) await dialog('🤔','',t('wrong',[ans]),[{l:t('ok'),v:1}]); else await sleep(700); }
}
async function finish(){
  over = true; var best = P.filter(function(p){ return p.alive; }).sort(function(a,b){ return worth(b)-worth(a); }), w = best[0];
  sfx('win'); renderAll();
  var rank = P.slice().sort(function(a,b){ return (b.alive?worth(b):-1)-(a.alive?worth(a):-1); }).map(function(p,i){ return (i+1)+'. '+p.n+' — '+(p.alive?worth(p):'✖'); }).join('\n');
  var again = await dialog('🏆',t('won',[w.n]),rank,[{l:'🎲 '+t('again'),v:1,cls:'ok'}]);
  renderSetup();
}

function init(){
  root = document.getElementById('mg-app'); if(!root) return;
  var hh = document.getElementById('mg-h2'), ld = document.getElementById('mg-lead');
  function titles(){ if(hh) hh.textContent = '🎲 '+t('h2'); if(ld) ld.textContent = t('lead'); }
  titles(); renderSetup();
  var lastL = lang(); setInterval(function(){ if(lang()!==lastL){ lastL = lang(); titles(); if(over) renderSetup(); } },700);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
