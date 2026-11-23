/* Білім Аралы — «Стань режиссёром»: детский редактор видеороликов.
   Всё работает в браузере ребёнка: сцены, картинки, текст, музыка (синтезатор) → видеофайл. На сервер ничего не отправляется. */
(function(){
'use strict';
var W = 960, H = 540, TR = 0.6, MAXSC = 12;

/* ---------- тексты интерфейса ---------- */
var L = {
ru:{h2:'Стань режиссёром',face:'Куда смотрит',fc_l:'← Влево',fc_r:'Вправо →',act:'Что делает герой',st_stand:'Стоит',st_walk:'Идёт',st_wave:'Машет',st_jump:'Прыгает',st_talk:'Говорит',mv:'Куда идёт',mv_none:'На месте',mv_right:'Вправо',mv_left:'Влево',cam:'Камера',cam_none:'Нет',cam_zin:'Ближе',cam_zout:'Дальше',cam_panl:'Влево',cam_panr:'Вправо',tstyle:'Вид подписи',ts_box:'Плашка',ts_bub:'Облачко',c_beasts:'Звери',tpl:'Шаблоны',tplh:'Выбери готовый сценарий — потом поменяй картинки и слова на свои.',tplq:'Заменить твой ролик шаблоном?',voice:'Голос',vhint:'Нажми на микрофон и расскажи, что происходит в этой сцене. Запись идёт до 15 секунд.',vrec:'Записать',vstop:'Готово',vplay:'Послушать',vdel:'Удалить голос',mic_no:'Не удалось включить микрофон. Разреши доступ к микрофону в браузере.',vyes:'Голос записан',vrecnow:'Идёт запись… говори!',c_kz:'Казахстан',c_sport:'Спорт',title:'Мой ролик',scene:'Сцена',pics:'Картинки',text:'Текст',music:'Музыка',proj:'Проект',play:'Смотреть',stop:'Стоп',make:'Сделать видео',
 kid:'Малыш',pro:'Старший',bg:'Фон',dur:'Сколько секунд',trans:'Переход',t_none:'Нет',t_fade:'Плавно',t_slide:'Сдвиг',
 dup:'Копия',del:'Удалить',left:'←',right:'→',add:'+',sc:'Сцена',
 bigger:'Больше',smaller:'Меньше',flip:'Отразить',rot:'Повернуть',front:'Наверх',remove:'Убрать',
 appear:'Как появится',a_none:'Сразу',a_fade:'Проявится',a_slide:'Выедет',a_zoom:'Вырастет',a_bounce:'Подпрыгнет',
 idle:'Что делает',i_none:'Стоит',i_float:'Парит',i_wiggle:'Качается',i_spin:'Крутится',
 c_animals:'Животные',c_nature:'Природа',c_people:'Люди',c_things:'Вещи',c_food:'Еда',c_signs:'Знаки',
 own:'Своё фото',pichint:'Нажми на картинку — она появится в кадре. Двигай её пальцем или мышкой.',
 caption:'Подпись в кадре',tpos:'Где подпись',p_top:'Сверху',p_mid:'По центру',p_bot:'Снизу',tcol:'Цвет',tsize:'Размер букв',
 m_none:'Без музыки',m_merry:'Весёлая',m_calm:'Спокойная',m_adv:'Приключение',m_space:'Космос',vol:'Громкость',
 name:'Название ролика',save:'Сохранить',saved:'Сохранено на этом устройстве',load:'Открыть файл',dl:'Скачать проект',newp:'Новый ролик',
 newq:'Начать новый ролик? Несохранённое пропадёт.',
 rec:'Записываю ролик… Не закрывай страницу.',done:'Готово! Видео скачано.',noex:'В этом браузере нельзя записать видео. Попробуй Chrome, Edge или Firefox.',
 safe:'Всё делается на твоём устройстве. Ничего не отправляется в интернет.',empty:'Добавь картинки и подпись — и нажми «Смотреть».',
 lead:'Собери свой мультик: выбирай фон, добавляй героев, пиши подписи, включай музыку и скачивай видео!'},
kz:{h2:'Режиссёр бол',face:'Қайда қарайды',fc_l:'← Солға',fc_r:'Оңға →',act:'Кейіпкер не істейді',st_stand:'Тұр',st_walk:'Жүреді',st_wave:'Қол бұлғайды',st_jump:'Секіреді',st_talk:'Сөйлейді',mv:'Қайда барады',mv_none:'Орнында',mv_right:'Оңға',mv_left:'Солға',cam:'Камера',cam_none:'Жоқ',cam_zin:'Жақын',cam_zout:'Алыс',cam_panl:'Солға',cam_panr:'Оңға',tstyle:'Жазу түрі',ts_box:'Тақтайша',ts_bub:'Бұлтша',c_beasts:'Жануарлар',tpl:'Үлгілер',tplh:'Дайын сценарийді таңдаңыз — содан соң суреттер мен сөздерді өзіңдікіне ауыстырыңыз.',tplq:'Бейнеңізді үлгімен ауыстырамыз ба?',voice:'Дауыс',vhint:'Микрофонды басып, осы көріністе не болып жатқанын айтыңыз. Жазу 15 секундқа дейін.',vrec:'Жазу',vstop:'Дайын',vplay:'Тыңдау',vdel:'Дауысты жою',mic_no:'Микрофон қосылмады. Браузерде микрофонға рұқсат беріңіз.',vyes:'Дауыс жазылды',vrecnow:'Жазылып жатыр… сөйле!',c_kz:'Қазақстан',c_sport:'Спорт',title:'Менің бейнем',scene:'Көрініс',pics:'Суреттер',text:'Мәтін',music:'Музыка',proj:'Жоба',play:'Көру',stop:'Тоқта',make:'Бейне жасау',
 kid:'Кішкентай',pro:'Үлкен',bg:'Фон',dur:'Неше секунд',trans:'Ауысу',t_none:'Жоқ',t_fade:'Біртіндеп',t_slide:'Сырғу',
 dup:'Көшірме',del:'Жою',left:'←',right:'→',add:'+',sc:'Көрініс',
 bigger:'Үлкенірек',smaller:'Кішірек',flip:'Айналдыр',rot:'Бұр',front:'Үстіне',remove:'Алып тастау',
 appear:'Қалай шығады',a_none:'Бірден',a_fade:'Біртіндеп',a_slide:'Сырғып шығады',a_zoom:'Өседі',a_bounce:'Секіреді',
 idle:'Не істейді',i_none:'Тұр',i_float:'Қалықтайды',i_wiggle:'Тербеледі',i_spin:'Айналады',
 c_animals:'Жануарлар',c_nature:'Табиғат',c_people:'Адамдар',c_things:'Заттар',c_food:'Тағам',c_signs:'Белгілер',
 own:'Өз суретім',pichint:'Суретті басыңыз — ол кадрға түседі. Саусақпен немесе тінтуірмен жылжытыңыз.',
 caption:'Кадрдағы жазу',tpos:'Жазу орны',p_top:'Жоғарыда',p_mid:'Ортада',p_bot:'Төменде',tcol:'Түсі',tsize:'Әріп өлшемі',
 m_none:'Музыкасыз',m_merry:'Көңілді',m_calm:'Тыныш',m_adv:'Оқиға',m_space:'Ғарыш',vol:'Дыбыс деңгейі',
 name:'Бейне атауы',save:'Сақтау',saved:'Осы құрылғыда сақталды',load:'Файл ашу',dl:'Жобаны жүктеу',newp:'Жаңа бейне',
 newq:'Жаңа бейне бастаймыз ба? Сақталмағаны жоғалады.',
 rec:'Бейне жазылып жатыр… Бетті жаппаңыз.',done:'Дайын! Бейне жүктелді.',noex:'Бұл браузерде бейне жазу мүмкін емес. Chrome, Edge немесе Firefox қолданып көріңіз.',
 safe:'Бәрі сіздің құрылғыңызда жасалады. Интернетке ештеңе жіберілмейді.',empty:'Суреттер мен жазу қосыңыз да, «Көру» батырмасын басыңыз.',
 lead:'Өз мультфильміңді жина: фон таңда, кейіпкерлер қос, жазу жаз, музыка қос да бейнені жүктеп ал!'},
en:{h2:'Become a director',face:'Looks',fc_l:'← Left',fc_r:'Right →',act:'What the hero does',st_stand:'Stands',st_walk:'Walks',st_wave:'Waves',st_jump:'Jumps',st_talk:'Talks',mv:'Where to',mv_none:'Stays',mv_right:'Right',mv_left:'Left',cam:'Camera',cam_none:'None',cam_zin:'Closer',cam_zout:'Farther',cam_panl:'Left',cam_panr:'Right',tstyle:'Caption style',ts_box:'Plate',ts_bub:'Bubble',c_beasts:'Beasts',tpl:'Templates',tplh:'Pick a ready story, then change the pictures and words to your own.',tplq:'Replace your video with the template?',voice:'Voice',vhint:'Press the microphone and tell what happens in this scene. Up to 15 seconds.',vrec:'Record',vstop:'Done',vplay:'Listen',vdel:'Delete voice',mic_no:'Could not turn on the microphone. Allow microphone access in the browser.',vyes:'Voice recorded',vrecnow:'Recording… speak!',c_kz:'Kazakhstan',c_sport:'Sport',title:'My video',scene:'Scene',pics:'Pictures',text:'Text',music:'Music',proj:'Project',play:'Play',stop:'Stop',make:'Make video',
 kid:'Kid',pro:'Older',bg:'Background',dur:'Seconds',trans:'Transition',t_none:'None',t_fade:'Fade',t_slide:'Slide',
 dup:'Copy',del:'Delete',left:'←',right:'→',add:'+',sc:'Scene',
 bigger:'Bigger',smaller:'Smaller',flip:'Flip',rot:'Rotate',front:'To front',remove:'Remove',
 appear:'Appears',a_none:'At once',a_fade:'Fades in',a_slide:'Slides in',a_zoom:'Grows',a_bounce:'Bounces',
 idle:'Then',i_none:'Stands',i_float:'Floats',i_wiggle:'Wiggles',i_spin:'Spins',
 c_animals:'Animals',c_nature:'Nature',c_people:'People',c_things:'Things',c_food:'Food',c_signs:'Signs',
 own:'My photo',pichint:'Tap a picture to put it on the screen. Drag it with a finger or mouse.',
 caption:'Caption',tpos:'Caption place',p_top:'Top',p_mid:'Middle',p_bot:'Bottom',tcol:'Color',tsize:'Letter size',
 m_none:'No music',m_merry:'Merry',m_calm:'Calm',m_adv:'Adventure',m_space:'Space',vol:'Volume',
 name:'Video title',save:'Save',saved:'Saved on this device',load:'Open file',dl:'Download project',newp:'New video',
 newq:'Start a new video? Unsaved work will be lost.',
 rec:'Recording your video… Do not close the page.',done:'Done! Video downloaded.',noex:'This browser cannot record video. Try Chrome, Edge or Firefox.',
 safe:'Everything happens on your device. Nothing is sent to the internet.',empty:'Add pictures and a caption, then press Play.',
 lead:'Make your own cartoon: pick a background, add heroes, write captions, add music and download the video!'}
};
function lang(){
  var c = document.documentElement.getAttribute('data-current'); if(!c){ try{ c = localStorage.getItem('bilim_lang_v1'); }catch(e){} }
  if(c==='kz') return 'kz'; if(c==='en'||c==='de'||c==='fr'||c==='zh') return 'en'; return 'ru';
}
function t(k){ var d = L[lang()]; return (d && d[k]!==undefined) ? d[k] : (L.ru[k]!==undefined ? L.ru[k] : k); }

/* ---------- данные ---------- */
var BGS = [
 {a:'#8fd3ff',b:'#e6f7ff',g:'#7ccf6e'},{a:'#ff9a76',b:'#ffe0b0',g:'#7a5a4a',sun:1},{a:'#0b1d4a',b:'#3a2f7a',stars:1},
 {a:'#bfe6ff',b:'#fff3c4',g:'#d4be5c'},{a:'#4fc3f7',b:'#0277bd'},{a:'#a5d6a7',b:'#e8f5e9',g:'#388e3c'},
 {a:'#e3f2fd',b:'#ffffff',g:'#f4f9ff'},{a:'#0d0d2b',b:'#2b1055',stars:1,g:'#4a4a6a'},{a:'#ffe0b2',b:'#ffcc80',g:'#a1744a'},
 {a:'#ffd1e8',b:'#ffd1e8'},{a:'#fff59d',b:'#fff59d'},{a:'#263238',b:'#37474f'},
 {a:'#9fd8ff',b:'#e8f6ff',g:'#6fbf73',mount:'#8fa3b8'},{a:'#ff8a65',b:'#ffe0b2',g:'#5d4037',mount:'#6d4c41',sun:1},{a:'#ffd180',b:'#fff3e0',dunes:'#e0b060'},
 {a:'#1a237e',b:'#ff8a65',city:1},{a:'#81d4fa',b:'#e1f5fe',waves:1,g:'#f5deb3'},{a:'#00acc1',b:'#006064',bubbles:1},
 {a:'#05051a',b:'#1b1b4b',stars:1,planet:1},{a:'#f8bbd0',b:'#fff9c4',confetti:1}
];
var CATS = {
 beasts:[],people:[],
 kz:['⛺','🪕','🌷','🏔️','🥛','🍲','🍵','🎻','🌾','🏹','🎪','🏺'],
 nature:['🌳','🌲','🌴','🌵','🌻','🌷','🍄','⛰️','🌈','☀️','🌙','⭐','☁️','❄️','🔥','💧','🌊','🌾','🌸','🍁','⚡','🪐','🌍','☄️','🦋','🐝','🐟','🐢','🐧','🦉','🐸','🐬','🐙'],
 things:['🏠','🚗','🚌','🚂','✈️','🚀','🛶','⛵','🎈','🎁','⚽','🎸','🪕','📚','🔭','💡','🏆','🏰','⛺','🎪','🛸','🚁','🚒','🚑','🎨','🎬','📷','💻','⏰','🔑','🗺️','🧭'],
 food:['🍎','🍌','🍉','🍓','🍞','🧀','🍕','🍦','🥛','🍯','🍪','🎂'],
 signs:['❤️','✨','💬','❗','❓','🎵','👍','👏','😀','😮','😴','🎉','😂','😍','🤔','😎','💤','💥'],
 sport:['⚽','🏀','🏐','🎾','🥇','🏆','🛹','🚴','🏊','🥋','♟️','🎯','⛸️','🏂','🎿','🤸']
};
var CAM = ['none','zin','zout','panl','panr'], ACTS = ['stand','walk','wave','jump','talk'];
var COLORS = ['#ffffff','#ffeb3b','#ff6b6b','#4c8dff','#2ec27e','#111111'];

/* ---------- состояние ---------- */
var S = { title:'', scenes:[], cur:0, sel:-1, music:'none', vol:0.6 };
var UI = { tab:'scene', cat:'beasts', adv:false, playing:false, exporting:false, T:0 };
var imgCache = {}, CURDUR = 4;
function newScene(){ return {bg:0,stk:[],text:'',tpos:'bot',tstyle:'box',tcol:'#ffffff',tsize:44,dur:4,trans:'fade',cam:'none'}; }
function reset(){ S = {title:t('title'),scenes:[newScene()],cur:0,sel:-1,music:'none',vol:0.6}; }
function clone(o){ return JSON.parse(JSON.stringify(o)); }

/* ---------- рисование ---------- */
function ease(p){ return p<0?0:p>1?1:1-Math.pow(1-p,3); }
function backOut(p){ if(p<=0) return 0; if(p>=1) return 1; var c=1.70158; return 1+(c+1)*Math.pow(p-1,3)+c*Math.pow(p-1,2); }
function getImg(src){ var im = imgCache[src]; if(!im){ im = new Image(); im.onload = function(){ redraw(); }; im.src = src; imgCache[src] = im; } return im; }
function rr(c,x,y,w,h,r){ c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath(); }
function wrap(c,txt,maxW){
  var out=[]; String(txt).split('\n').forEach(function(par){
    var words = par.split(' '), line='';
    words.forEach(function(w){ var tst = line ? line+' '+w : w; if(c.measureText(tst).width>maxW && line){ out.push(line); line=w; } else line=tst; });
    out.push(line);
  }); return out;
}
function drawBg(c,bg){
  var d = BGS[bg] || BGS[0], g = c.createLinearGradient(0,0,0,H); g.addColorStop(0,d.a); g.addColorStop(1,d.b);
  c.fillStyle=g; c.fillRect(0,0,W,H);
  if(d.stars){ c.fillStyle='rgba(255,255,255,.85)'; for(var i=0;i<60;i++){ var x=(i*137)%W, y=(i*89)%(H*0.7), r=1+(i%3); c.beginPath(); c.arc(x,y,r,0,7); c.fill(); } }
  if(d.sun){ c.fillStyle='rgba(255,240,170,.9)'; c.beginPath(); c.arc(W*0.8,H*0.55,60,0,7); c.fill(); }
  if(d.planet){ c.fillStyle='#ff9800'; c.beginPath(); c.arc(W*0.78,H*0.34,72,0,7); c.fill(); c.strokeStyle='rgba(255,224,178,.9)'; c.lineWidth=9; c.beginPath(); c.ellipse(W*0.78,H*0.34,115,26,-0.35,0,7); c.stroke(); }
  if(d.mount){ c.fillStyle=d.mount; [[-50,200,400],[250,140,800],[620,220,1010]].forEach(function(m,i){ var pk = [0.35,0.24,0.4][i]; c.beginPath(); c.moveTo(m[0],H*0.76); c.lineTo((m[0]+m[2])/2,H*pk); c.lineTo(m[2],H*0.76); c.closePath(); c.fill(); }); }
  if(d.dunes){ c.fillStyle=d.dunes; c.beginPath(); c.moveTo(0,H); for(var x=0;x<=W;x+=20) c.lineTo(x,H*0.7+Math.sin(x/140)*28+Math.sin(x/53)*8); c.lineTo(W,H); c.closePath(); c.fill(); }
  if(d.city){ for(var b=0;b<12;b++){ var bh = 130+((b*53)%150), bx = b*84; c.fillStyle='#1b1f3b'; c.fillRect(bx,H-bh-40,70,bh+40); c.fillStyle='rgba(255,235,120,.85)'; for(var wy=H-bh-24;wy<H-50;wy+=26) for(var wx=bx+10;wx<bx+60;wx+=20) if(((wx+wy)*7)%5<3) c.fillRect(wx,wy,9,12); } }
  if(d.waves){ c.fillStyle='#29b6f6'; c.fillRect(0,H*0.52,W,H*0.24); c.strokeStyle='rgba(255,255,255,.8)'; c.lineWidth=4; for(var r=0;r<3;r++){ c.beginPath(); for(var wx2=0;wx2<=W;wx2+=16) c.lineTo(wx2,H*(0.58+r*0.06)+Math.sin(wx2/30+r)*5); c.stroke(); } }
  if(d.g){ c.fillStyle=d.g; c.fillRect(0,H*0.76,W,H*0.24); }
  if(d.bubbles){ c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=3; for(var q=0;q<18;q++){ c.beginPath(); c.arc((q*173)%W,(q*97)%H,8+(q%4)*6,0,7); c.stroke(); } }
  if(d.confetti){ var cols = ['#ff6b6b','#4c8dff','#2ec27e','#ffeb3b','#b79cff']; for(var f=0;f<70;f++){ c.fillStyle = cols[f%5]; c.save(); c.translate((f*131)%W,(f*71)%H); c.rotate(f); c.fillRect(-6,-3,12,6); c.restore(); } }
}
function stkAt(s,i,t){
  var p, a = 1, dx = 0, dy = 0, sc = 1, rot = s.rot||0;
  p = (t - i*0.25)/0.7;
  var v = 0;
  if(UI.playing && s.mv && s.mv!=='none'){ var q = Math.max(0,Math.min(1,t/(CURDUR||4))), sm = q*q*(3-2*q); dx += (s.mv==='right' ? 1 : -1)*(sm-0.5)*520; v = 4*q*(1-q); }
  if(s.anim==='fade') a = ease(p);
  else if(s.anim==='slide'){ dx = -(1-ease(p))*420; a = Math.min(1,p*3); }
  else if(s.anim==='zoom') sc = ease(p);
  else if(s.anim==='bounce'){ sc = backOut(p); dy = -(1-ease(p))*140; a = Math.min(1,p*4); }
  if(s.idle==='float') dy += Math.sin(t*2+i)*10;
  else if(s.idle==='wiggle') rot += Math.sin(t*6+i)*7;
  else if(s.idle==='spin') rot += (t*90)%360;
  if(s.c){ var d = Math.max(0,Math.min(1,(s.y-200)/140)); sc *= 0.8+0.2*d; a *= 0.82+0.18*d; }
  return {a:a,dx:dx,dy:dy,sc:sc,rot:rot,v:v};
}
function drawStk(c,s,i,t,sel){
  var st = stkAt(s,i,t); if(st.a<=0 || st.sc<=0) return;
  var act = s.act||'stand', te = t, bob = 0, lean = 0;
  if(s.c && UI.playing && s.mv && s.mv!=='none'){ if(st.v<0.06) act = 'stand'; else { te = t*(0.55+0.45*st.v); lean = (s.mv==='right'?1:-1)*st.v*5; } }
  if(s.c && act==='walk') bob = -Math.abs(Math.sin(te*9))*s.s*st.sc*0.022;
  if(s.c){ var fy = s.y+st.dy+0.45*s.s*st.sc, k2 = 1-Math.min(0.5,Math.abs(st.dy)/300);
    c.save(); c.globalAlpha = st.a*0.28*k2; c.fillStyle = '#1b2a3a'; c.beginPath(); c.ellipse(s.x+st.dx,fy,s.s*st.sc*0.3*k2,s.s*st.sc*0.05*k2,0,0,Math.PI*2); c.fill(); c.restore(); }
  c.save(); c.globalAlpha = st.a; c.translate(s.x+st.dx, s.y+st.dy+bob); c.rotate((st.rot+lean)*Math.PI/180); c.scale(st.sc*(s.flip?-1:1), st.sc);
  if(s.c && window.RZC){ RZC.draw(c,s.c,s.s,te,act); }
  else if(s.img){ var im = getImg(s.img); if(im.complete && im.naturalWidth){ var k = s.s/Math.max(im.naturalWidth,im.naturalHeight); c.drawImage(im,-im.naturalWidth*k/2,-im.naturalHeight*k/2,im.naturalWidth*k,im.naturalHeight*k); } }
  else { c.font = s.s+'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(s.e,0,0); }
  c.restore();
  if(sel){ var h = s.s*0.62+4; c.save(); c.strokeStyle='#4C8DFF'; c.lineWidth=3; c.setLineDash([8,6]); c.strokeRect(s.x-h,s.y-h,h*2,h*2); c.restore(); }
}
function drawText(c,sc,t){
  if(!sc.text) return; var fs = sc.tsize, pad = 14;
  c.save(); c.font = '800 '+fs+'px "Baloo 2","Nunito",sans-serif'; c.textAlign='center'; c.textBaseline='middle';
  var lines = wrap(c,sc.text,W-120), lh = fs*1.22, bh = lines.length*lh+pad*2, bw = 0;
  lines.forEach(function(l){ bw = Math.max(bw,c.measureText(l).width); }); bw += pad*2+10;
  var y = sc.tpos==='top' ? 24 : sc.tpos==='mid' ? (H-bh)/2 : H-bh-24, a = Math.min(1,t/0.4), x0 = (W-bw)/2, tail = null;
  if(sc.tstyle==='bubble'){
    var who = null; sc.stk.forEach(function(s){ if(s.c && !who) who = s; }); if(!who) sc.stk.forEach(function(s){ who = who || s; });
    if(who){ var cx2 = Math.max(bw/2+20,Math.min(W-bw/2-20,who.x)); x0 = cx2-bw/2; y = Math.max(12,who.y-who.s*0.55-bh-30); tail = {x:Math.max(x0+30,Math.min(x0+bw-30,who.x)),y:y+bh,ty:Math.min(H-10,who.y-who.s*0.5)}; }
    c.globalAlpha = a; c.fillStyle = '#ffffff'; c.strokeStyle = '#1d3557'; c.lineWidth = 4; rr(c,x0,y,bw,bh,28); c.fill(); c.stroke();
    if(tail){ c.beginPath(); c.moveTo(tail.x-16,tail.y-2); c.lineTo(tail.x,tail.ty); c.lineTo(tail.x+16,tail.y-2); c.closePath(); c.fill(); c.beginPath(); c.moveTo(tail.x-16,tail.y); c.lineTo(tail.x,tail.ty); c.lineTo(tail.x+16,tail.y); c.stroke(); c.fillStyle = '#fff'; c.fillRect(tail.x-14,tail.y-4,28,6); }
    c.fillStyle = (sc.tcol==='#ffffff') ? '#1d3557' : sc.tcol; lines.forEach(function(l,i){ c.fillText(l,x0+bw/2,y+pad+lh*i+lh/2); }); c.restore(); return;
  }
  c.globalAlpha = a; c.fillStyle='rgba(10,18,40,.55)'; rr(c,(W-bw)/2,y,bw,bh,22); c.fill();
  c.fillStyle = sc.tcol; lines.forEach(function(l,i){ c.fillText(l,W/2,y+pad+lh*i+lh/2); }); c.restore();
}
function drawScene(c,sc,t,sel){
  CURDUR = sc.dur;
  var cam = (UI.playing && sc.cam && sc.cam!=='none'), q = Math.max(0,Math.min(1,t/sc.dur));
  c.save();
  if(cam){
    var z = sc.cam==='zin' ? 1+0.2*q : sc.cam==='zout' ? 1.2-0.2*q : 1.14, px = sc.cam==='panl' ? (0.5-q)*90 : sc.cam==='panr' ? (q-0.5)*90 : 0;
    c.translate(W/2,H/2); c.scale(z,z); c.translate(-W/2+px,-H/2);
  }
  drawBg(c,sc.bg); sc.stk.forEach(function(s,i){ drawStk(c,s,i,t,sel===i); });
  c.restore(); drawText(c,sc,t);
}
function total(){ return S.scenes.reduce(function(a,s){ return a+s.dur; },0); }
function renderAt(c,T,sel){
  var acc=0, i;
  for(i=0;i<S.scenes.length;i++){ if(T < acc+S.scenes[i].dur || i===S.scenes.length-1) break; acc += S.scenes[i].dur; }
  var sc = S.scenes[i], lt = Math.max(0,Math.min(sc.dur,T-acc));
  if(i>0 && lt<TR && sc.trans!=='none'){
    var p = ease(lt/TR), prev = S.scenes[i-1];
    if(sc.trans==='slide'){
      c.save(); c.translate(-W*p,0); drawScene(c,prev,prev.dur,-1); c.restore();
      c.save(); c.translate(W*(1-p),0); drawScene(c,sc,lt,sel); c.restore();
    } else { drawScene(c,prev,prev.dur,-1); c.save(); c.globalAlpha=p; drawScene(c,sc,lt,sel); c.restore(); }
  } else drawScene(c,sc,lt,sel);
}

/* ---------- музыка (синтезатор, без чужих записей) ---------- */
var MUS = {
 merry:{bpm:132,wave:'triangle',lead:[[72,1],[76,1],[79,1],[76,1],[74,1],[77,1],[81,1],[77,1],[72,1],[76,1],[79,1],[84,1],[83,1],[79,1],[74,1],[67,1]],bass:[[48,4],[53,4],[55,4],[48,4]]},
 calm:{bpm:76,wave:'sine',lead:[[69,1],[72,1],[76,1],[72,1],[67,1],[71,1],[74,1],[71,1],[65,1],[69,1],[72,1],[69,1],[64,1],[68,1],[71,1],[76,1]],bass:[[45,4],[43,4],[41,4],[40,4]]},
 adv:{bpm:140,wave:'sawtooth',lead:[[69,1],[0,.5],[69,.5],[72,1],[69,1],[76,1],[74,1],[72,1],[0,1],[67,1],[0,.5],[67,.5],[71,1],[67,1],[74,1],[72,1],[71,1],[0,1]],bass:[[45,2],[45,2],[43,2],[43,2],[41,2],[41,2],[40,2],[40,2]]},
 space:{bpm:84,wave:'sine',lead:[[81,2],[0,1],[84,1],[88,2],[0,1],[86,1],[83,2],[0,1],[79,1],[81,3],[0,1]],bass:[[40,8],[43,8]]}
};
var AC=null, musicGain=null, musicDest=null, musicTimer=null, musicNext=0, musicState=null;
function audioCtx(){ if(!AC){ var C = window.AudioContext||window.webkitAudioContext; if(!C) return null; AC = new C(); } if(AC.state==='suspended') AC.resume(); return AC; }
function hz(m){ return 440*Math.pow(2,(m-69)/12); }
function note(m,when,dur,wave,vol){
  var o = AC.createOscillator(), g = AC.createGain(); o.type = wave; o.frequency.value = hz(m);
  g.gain.setValueAtTime(0.0001,when); g.gain.exponentialRampToValueAtTime(vol,when+0.02); g.gain.exponentialRampToValueAtTime(0.0001,when+Math.max(0.05,dur*0.95));
  o.connect(g); g.connect(musicGain); o.start(when); o.stop(when+dur+0.05);
}
function musicStart(dest){
  musicStop(); var m = MUS[S.music]; if(!m) return; var ac = audioCtx(); if(!ac) return;
  musicGain = ac.createGain(); musicGain.gain.value = S.vol*0.5; musicGain.connect(ac.destination);
  if(dest) musicGain.connect(dest);
  var beat = 60/m.bpm, li=0, bi=0, lt0 = ac.currentTime+0.08, bt0 = lt0;
  musicState = {lt:lt0,bt:bt0};
  function pump(){
    if(!musicState) return; var horizon = ac.currentTime+0.6;
    while(musicState.lt < horizon){ var n = m.lead[li%m.lead.length], d = n[1]*beat; if(n[0]) note(n[0],musicState.lt,d,m.wave,0.5); musicState.lt += d; li++; }
    while(musicState.bt < horizon){ var b = m.bass[bi%m.bass.length], bd = b[1]*beat; note(b[0],musicState.bt,bd,'sine',0.7); musicState.bt += bd; bi++; }
  }
  pump(); musicTimer = setInterval(pump,150);
}
function musicStop(){
  if(musicTimer){ clearInterval(musicTimer); musicTimer=null; }
  musicState = null;
  if(musicGain){ try{ musicGain.gain.cancelScheduledValues(0); musicGain.gain.value = 0; musicGain.disconnect(); }catch(e){} musicGain = null; }
}

/* ---------- воспроизведение и запись ---------- */
var cv, cx, raf = 0, t0 = 0, rec = null, recChunks = [];
var thumbTimer = 0;
function redraw(){ if(!cx) return; if(!UI.playing && !UI.exporting){ clearTimeout(thumbTimer); thumbTimer = setTimeout(drawThumbs,30); } }
var liveRaf = 0;
function live(){ liveRaf = requestAnimationFrame(live); if(UI.playing || UI.exporting || !cx || !S.scenes[S.cur]) return; drawScene(cx,S.scenes[S.cur],10+performance.now()/1000,S.sel); }
function staticT(){ return 20; }  /* в редакторе показываем кадр «после появления» */
function drawThumbs(){
  var strip = document.getElementById('rz-strip'); if(!strip) return;
  strip.querySelectorAll('canvas').forEach(function(c,i){ var sc = S.scenes[i]; if(!sc) return; var k = c.getContext('2d'); k.setTransform(c.width/W,0,0,c.height/H,0,0); drawScene(k,sc,20,-1); });
}
function fmt(s){ s = Math.max(0,Math.round(s)); return Math.floor(s/60)+':'+('0'+(s%60)).slice(-2); }
function setTime(T){ var el = document.getElementById('rz-time'); if(el) el.textContent = fmt(T)+' / '+fmt(total()); }
var BUFS = {}, voiceSrc = [], voiceGain = null, playTok = 0;
function getBuf(u){
  if(BUFS[u]) return BUFS[u]; var ac = audioCtx(); if(!ac) return Promise.resolve(null);
  BUFS[u] = fetch(u).then(function(r){ return r.arrayBuffer(); }).then(function(b){ return new Promise(function(res,rej){ ac.decodeAudioData(b,res,rej); }); }).catch(function(){ return null; });
  return BUFS[u];
}
function play(exportMode){
  if(UI.playing) return; UI.playing = true; UI.exporting = !!exportMode; S.sel = -1; refreshBar();
  var tok = ++playTok, hasV = S.scenes.some(function(x){ return x.voice; });
  var pr = hasV ? (audioCtx(), Promise.all(S.scenes.map(function(x){ return x.voice ? getBuf(x.voice) : null; }))) : Promise.resolve([]);
  pr.then(function(bufs){ if(tok!==playTok || !UI.playing) return; run(bufs,exportMode); });
}
function run(bufs,exportMode){
  var tot = total(); t0 = performance.now();
  if(S.music!=='none'){ var ac = audioCtx(); if(ac){ if(exportMode) musicStart(musicDest); else musicStart(null); } }
  if(bufs.some(Boolean) && AC){
    voiceGain = AC.createGain(); voiceGain.gain.value = 1; voiceGain.connect(AC.destination); if(exportMode && musicDest) voiceGain.connect(musicDest);
    var acc = 0, base = AC.currentTime+0.05;
    S.scenes.forEach(function(sc,i){ var b = bufs[i]; if(b){ var src = AC.createBufferSource(); src.buffer = b; src.connect(voiceGain); src.start(base+acc); voiceSrc.push(src); } acc += sc.dur; });
  }
  (function loop(){
    if(!UI.playing) return;
    var T = (performance.now()-t0)/1000;
    if(T >= tot){ renderAt(cx,tot-0.001,-1); setTime(tot); finish(); return; }
    renderAt(cx,T,-1); setTime(T); raf = requestAnimationFrame(loop);
  })();
}
function finish(){
  var wasExport = UI.exporting; playTok++; cancelAnimationFrame(raf); musicStop(); voiceSrc.forEach(function(x){ try{ x.stop(); }catch(e){} }); voiceSrc = []; if(voiceGain){ try{ voiceGain.disconnect(); }catch(e){} voiceGain = null; } UI.playing = false; UI.exporting = false;
  if(wasExport && rec){ try{ rec.stop(); }catch(e){} }
  refreshBar(); redraw(); setTime(0);
}
function stopPlay(){ if(!UI.playing) return; if(UI.exporting){ rec = null; } finish(); }
function over(msg,on){ var o = document.getElementById('rz-over'); if(!o) return; o.textContent = msg||''; o.classList.toggle('on',!!on); }
function exportVideo(){
  if(UI.playing) return;
  if(!window.MediaRecorder || !cv.captureStream){ alert(t('noex')); return; }
  var types = ['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm','video/mp4'], mt = '';
  for(var i=0;i<types.length;i++){ if(MediaRecorder.isTypeSupported(types[i])){ mt = types[i]; break; } }
  musicDest = null; var stream = cv.captureStream(30), usedMusic = S.music!=='none';
  var hasVoice = S.scenes.some(function(x){ return x.voice; }), ac = (usedMusic||hasVoice) ? audioCtx() : null;
  if(ac){ musicDest = ac.createMediaStreamDestination(); musicDest.stream.getAudioTracks().forEach(function(tr){ stream.addTrack(tr); }); }
  try { rec = new MediaRecorder(stream, mt ? {mimeType:mt, videoBitsPerSecond:4000000} : {}); } catch(e){ alert(t('noex')); return; }
  recChunks = []; var ext = (rec.mimeType||mt||'video/webm').indexOf('mp4')>=0 ? 'mp4' : 'webm';
  rec.ondataavailable = function(e){ if(e.data && e.data.size) recChunks.push(e.data); };
  rec.onstop = function(){
    over('',false);
    if(!rec) { recChunks = []; return; }
    var blob = new Blob(recChunks,{type:(rec.mimeType||'video/webm')}); rec = null;
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = (S.title||'video').replace(/[^\wа-яёәіңғүұқөһ\- ]/gi,'').trim().replace(/\s+/g,'_')+'.'+ext;
    document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },4000);
    window.__rzLastBlob = blob.size; over(t('done'),true); setTimeout(function(){ over('',false); },2500);
  };
  over(t('rec'),true); rec.start(250); play(true);
}

/* ---------- сохранение ---------- */
var saveTimer = 0;
function autosave(){ clearTimeout(saveTimer); saveTimer = setTimeout(function(){ try{ localStorage.setItem('rezh_project_v1',JSON.stringify(S)); }catch(e){ try{ var c = clone(S); c.scenes.forEach(function(sc){ sc.stk = sc.stk.filter(function(s){ return !s.img; }); delete sc.voice; }); localStorage.setItem('rezh_project_v1',JSON.stringify(c)); }catch(e2){} } },400); }
function loadSaved(){ try{ var j = localStorage.getItem('rezh_project_v1'); if(j){ var o = JSON.parse(j); if(o && o.scenes && o.scenes.length){ S = o; S.cur = 0; S.sel = -1; return true; } } }catch(e){} return false; }
function changed(){ autosave(); redraw(); }

/* ---------- интерфейс ---------- */
function h(tag,attrs,kids){
  var e = document.createElement(tag); attrs = attrs||{};
  Object.keys(attrs).forEach(function(k){ var v = attrs[k]; if(k==='class') e.className = v; else if(k.slice(0,2)==='on') e.addEventListener(k.slice(2),v); else if(k==='html') e.innerHTML = v; else if(v!==false && v!==null && v!==undefined) e.setAttribute(k,v===true?'':v); });
  (kids||[]).forEach(function(c){ if(c==null) return; e.appendChild(typeof c==='string' ? document.createTextNode(c) : c); });
  return e;
}
function btn(label,cls,fn,extra){ var a = {class:'rz-btn '+(cls||''),type:'button',onclick:fn}; if(extra) Object.keys(extra).forEach(function(k){ a[k]=extra[k]; }); return h('button',a,[label]); }
function cur(){ return S.scenes[S.cur]; }
function selStk(){ var s = cur().stk[S.sel]; return s || null; }

function refreshBar(){
  var p = document.getElementById('rz-play'); if(!p) return;
  p.textContent = UI.playing ? '■ '+t('stop') : '▶ '+t('play');
  p.className = 'rz-btn '+(UI.playing?'red':'go');
  var m = document.getElementById('rz-make'); if(m) m.disabled = UI.playing;
}
function renderStrip(){
  var strip = document.getElementById('rz-strip'); if(!strip) return; strip.innerHTML = '';
  S.scenes.forEach(function(sc,i){
    var c = h('canvas',{width:264,height:149});
    var th = h('div',{class:'rz-th'+(i===S.cur?' cur':''),onclick:function(){ if(UI.playing) return; S.cur = i; S.sel = -1; renderAll(); }},[c,h('small',{},[t('sc')+' '+(i+1)+' · '+sc.dur+'с'+(sc.voice?' 🎙':'')])]);
    strip.appendChild(th);
  });
  if(S.scenes.length<MAXSC) strip.appendChild(h('button',{class:'rz-add',type:'button',title:t('sc'),onclick:function(){ if(UI.playing) return; S.scenes.push(newScene()); S.cur = S.scenes.length-1; S.sel = -1; changed(); renderAll(); }},['+']));
  drawThumbs();
}
function sceneTab(p){
  var sc = cur();
  p.appendChild(h('h4',{},[t('bg')]));
  var sw = h('div',{class:'rz-sw'});
  BGS.forEach(function(b,i){ sw.appendChild(h('button',{type:'button',class:sc.bg===i?'on':'',style:'background:linear-gradient('+b.a+','+b.b+')',onclick:function(){ sc.bg = i; changed(); renderPanel(); }})); });
  p.appendChild(sw);
  p.appendChild(h('h4',{},[t('dur')+': '+sc.dur]));
  p.appendChild(h('input',{type:'range',min:2,max:15,step:1,value:sc.dur,oninput:function(e){ sc.dur = +e.target.value; p.querySelector('h4:nth-of-type(2)').textContent = t('dur')+': '+sc.dur; autosave(); renderStrip(); setTime(0); }}));
  if(S.cur>0){
    var wr = h('div',{class:'adv-only'},[h('h4',{},[t('trans')])]), row = h('div',{class:'rz-row'});
    [['none','t_none'],['fade','t_fade'],['slide','t_slide']].forEach(function(o){ row.appendChild(btn(t(o[1]),'sm'+(sc.trans===o[0]?' on':''),function(){ sc.trans = o[0]; changed(); renderPanel(); })); });
    wr.appendChild(row); p.appendChild(wr);
  }
  p.appendChild(h('h4',{},['🎥 '+t('cam')]));
  var rc = h('div',{class:'rz-row'});
  CAM.forEach(function(k){ rc.appendChild(btn(t('cam_'+k),'sm'+((sc.cam||'none')===k?' on':''),function(){ sc.cam = k; changed(); renderPanel(); })); });
  p.appendChild(rc);
  var r2 = h('div',{class:'rz-row'});
  r2.appendChild(btn(t('left'),'sm',function(){ if(S.cur>0){ var a = S.scenes; var x = a[S.cur]; a[S.cur] = a[S.cur-1]; a[S.cur-1] = x; S.cur--; changed(); renderAll(); } }));
  r2.appendChild(btn(t('right'),'sm',function(){ var a = S.scenes; if(S.cur<a.length-1){ var x = a[S.cur]; a[S.cur] = a[S.cur+1]; a[S.cur+1] = x; S.cur++; changed(); renderAll(); } }));
  r2.appendChild(btn('⧉ '+t('dup'),'sm',function(){ if(S.scenes.length<MAXSC){ S.scenes.splice(S.cur+1,0,clone(sc)); S.cur++; changed(); renderAll(); } }));
  r2.appendChild(btn('🗑 '+t('del'),'sm red',function(){ if(S.scenes.length>1){ S.scenes.splice(S.cur,1); S.cur = Math.min(S.cur,S.scenes.length-1); S.sel = -1; changed(); renderAll(); } else { S.scenes[0] = newScene(); changed(); renderAll(); } }));
  p.appendChild(r2);
}
function addSticker(e,img){
  var sc = cur(); if(sc.stk.length>=30) return;
  var n = sc.stk.length, s = {e:e,x:W/2+((n%5)-2)*70,y:H/2-20+(Math.floor(n/5)%3)*40,s:150,flip:false,rot:0,anim:'none',idle:'none'};
  if(img){ s.img = img; s.e = ''; }
  sc.stk.push(s); S.sel = sc.stk.length-1; changed(); renderPanel();
}
function addChar(id){
  var sc = cur(); if(sc.stk.length>=30) return; var n = sc.stk.length, s = {c:id,e:'',x:W/2+((n%4)-1.5)*170,y:300,s:230,flip:false,rot:0,anim:'bounce',idle:'none',act:'stand',mv:'none'};
  sc.stk.push(s); S.sel = sc.stk.length-1; changed(); renderPanel();
}
function ownPhoto(file){
  var fr = new FileReader(); fr.onload = function(){
    var im = new Image(); im.onload = function(){
      var k = Math.min(1,640/Math.max(im.width,im.height)), c = document.createElement('canvas'); c.width = Math.round(im.width*k); c.height = Math.round(im.height*k);
      c.getContext('2d').drawImage(im,0,0,c.width,c.height); addSticker('',c.toDataURL('image/jpeg',0.85));
    }; im.src = fr.result;
  }; fr.readAsDataURL(file);
}
function picsTab(p){
  var tabs = h('div',{class:'rz-tabs'});
  Object.keys(CATS).forEach(function(k){ tabs.appendChild(h('button',{type:'button',class:'rz-tab'+(UI.cat===k?' on':''),onclick:function(){ UI.cat = k; renderPanel(); }},[t('c_'+k)])); });
  p.appendChild(tabs);
  var g = h('div',{class:'rz-emo'+((UI.cat==='beasts'||UI.cat==='people')?' rz-chars':'')});
  if(UI.cat==='beasts' || UI.cat==='people'){
    (window.RZC ? RZC.list : []).filter(function(it){ return it.cat===UI.cat; }).forEach(function(it){
      var cv2 = h('canvas',{width:112,height:112}), k = cv2.getContext('2d'); k.translate(56,58); RZC.draw(k,it.id,68,1.3,'stand');
      g.appendChild(h('button',{type:'button',title:(it.n[lang()]||it.n.ru),onclick:function(){ addChar(it.id); }},[cv2]));
    });
  } else CATS[UI.cat].forEach(function(e){ g.appendChild(h('button',{type:'button',onclick:function(){ addSticker(e); }},[e])); });
  p.appendChild(g);
  var own = h('div',{class:'adv-only rz-row'}), inp = h('input',{type:'file',accept:'image/*',style:'display:none',onchange:function(e){ if(e.target.files[0]) ownPhoto(e.target.files[0]); }});
  own.appendChild(inp); own.appendChild(btn('🖼 '+t('own'),'sm',function(){ inp.click(); })); p.appendChild(own);
  p.appendChild(h('div',{class:'rz-hint'},[t('pichint')]));
  var s = selStk(); if(!s) return;
  p.appendChild(h('h4',{},['✏️ '+(s.c ? (RZC.list.filter(function(it){ return it.id===s.c; })[0]||{n:{ru:s.c}}).n[lang()] || s.c : (s.img?'🖼':s.e))]));
  var r = h('div',{class:'rz-row'});
  r.appendChild(btn('➕ '+t('bigger'),'sm',function(){ s.s = Math.min(420,s.s+25); changed(); }));
  r.appendChild(btn('➖ '+t('smaller'),'sm',function(){ s.s = Math.max(40,s.s-25); changed(); }));
  r.appendChild(btn('↔ '+t('flip'),'sm',function(){ s.flip = !s.flip; changed(); }));
  r.appendChild(btn('⬆ '+t('front'),'sm',function(){ var a = cur().stk; a.push(a.splice(S.sel,1)[0]); S.sel = a.length-1; changed(); }));
  var rt = btn('⟳ '+t('rot'),'sm adv-only',function(){ s.rot = ((s.rot||0)+15)%360; changed(); }); r.appendChild(rt);
  r.appendChild(btn('🗑 '+t('remove'),'sm red',function(){ cur().stk.splice(S.sel,1); S.sel = -1; changed(); renderPanel(); }));
  p.appendChild(r);
  p.appendChild(h('h4',{},[t('appear')]));
  var r2 = h('div',{class:'rz-row'});
  [['none','a_none'],['fade','a_fade'],['slide','a_slide'],['zoom','a_zoom'],['bounce','a_bounce']].forEach(function(o){ r2.appendChild(btn(t(o[1]),'sm'+(s.anim===o[0]?' on':''),function(){ s.anim = o[0]; changed(); renderPanel(); })); });
  p.appendChild(r2);
  if(s.c){
    p.appendChild(h('h4',{},['↔ '+t('face')]));
    var rf = h('div',{class:'rz-row'});
    rf.appendChild(btn(t('fc_l'),'sm'+(s.flip?' on':''),function(){ s.flip = true; changed(); renderPanel(); }));
    rf.appendChild(btn(t('fc_r'),'sm'+(!s.flip?' on':''),function(){ s.flip = false; changed(); renderPanel(); }));
    p.appendChild(rf);
    p.appendChild(h('h4',{},[t('act')]));
    var ra = h('div',{class:'rz-row'});
    ACTS.forEach(function(a){ ra.appendChild(btn(t('st_'+a),'sm'+((s.act||'stand')===a?' on':''),function(){ s.act = a; changed(); renderPanel(); })); });
    p.appendChild(ra);
    p.appendChild(h('h4',{},[t('mv')]));
    var rm = h('div',{class:'rz-row'});
    [['none','mv_none'],['right','mv_right'],['left','mv_left']].forEach(function(o){ rm.appendChild(btn(t(o[1]),'sm'+((s.mv||'none')===o[0]?' on':''),function(){ s.mv = o[0]; if(o[0]!=='none'){ s.act = 'walk'; s.flip = (o[0]==='left'); } changed(); renderPanel(); })); });
    p.appendChild(rm);
  }
  var w = h('div',{class:'adv-only'},[h('h4',{},[t('idle')])]), r3 = h('div',{class:'rz-row'});
  [['none','i_none'],['float','i_float'],['wiggle','i_wiggle'],['spin','i_spin']].forEach(function(o){ r3.appendChild(btn(t(o[1]),'sm'+(s.idle===o[0]?' on':''),function(){ s.idle = o[0]; changed(); renderPanel(); })); });
  w.appendChild(r3); p.appendChild(w);
}
function textTab(p){
  var sc = cur();
  p.appendChild(h('h4',{},[t('caption')]));
  p.appendChild(h('textarea',{maxlength:200,oninput:function(e){ sc.text = e.target.value; changed(); }},[sc.text]));
  p.appendChild(h('h4',{},[t('tstyle')]));
  var rs = h('div',{class:'rz-row'});
  [['box','ts_box'],['bubble','ts_bub']].forEach(function(o){ rs.appendChild(btn(t(o[1]),'sm'+(((sc.tstyle)||'box')===o[0]?' on':''),function(){ sc.tstyle = o[0]; changed(); renderPanel(); })); });
  p.appendChild(rs);
  p.appendChild(h('h4',{},[t('tpos')]));
  var r = h('div',{class:'rz-row'});
  [['top','p_top'],['mid','p_mid'],['bot','p_bot']].forEach(function(o){ r.appendChild(btn(t(o[1]),'sm'+(sc.tpos===o[0]?' on':''),function(){ sc.tpos = o[0]; changed(); renderPanel(); })); });
  p.appendChild(r);
  p.appendChild(h('h4',{},[t('tcol')]));
  var sw = h('div',{class:'rz-sw'});
  COLORS.forEach(function(c){ sw.appendChild(h('button',{type:'button',class:sc.tcol===c?'on':'',style:'background:'+c,onclick:function(){ sc.tcol = c; changed(); renderPanel(); }})); });
  p.appendChild(sw);
  var w = h('div',{class:'adv-only'},[h('h4',{},[t('tsize')])]);
  w.appendChild(h('input',{type:'range',min:28,max:72,step:2,value:sc.tsize,oninput:function(e){ sc.tsize = +e.target.value; changed(); }})); p.appendChild(w);
}

/* ---------- голос ---------- */
var vrec = null;
function startRec(){
  if(UI.playing) stopPlay();
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder){ alert(t('mic_no')); return; }
  navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
    var chunks = [], sc = cur(), tmr; vrec = new MediaRecorder(stream);
    vrec.ondataavailable = function(e){ if(e.data && e.data.size) chunks.push(e.data); };
    vrec.onstop = function(){
      clearTimeout(tmr); stream.getTracks().forEach(function(x){ x.stop(); }); UI.recording = false; vrec = null;
      var blob = new Blob(chunks,{type:chunks[0] ? chunks[0].type : 'audio/webm'}), fr = new FileReader();
      fr.onload = function(){
        sc.voice = fr.result;
        getBuf(sc.voice).then(function(b){ if(b){ sc.dur = Math.max(sc.dur,Math.min(15,Math.ceil(b.duration))); } changed(); renderAll(); });
      }; fr.readAsDataURL(blob);
    };
    vrec.start(); UI.recording = true; tmr = setTimeout(function(){ if(vrec && vrec.state==='recording') vrec.stop(); },15000); renderPanel();
  }).catch(function(){ alert(t('mic_no')); });
}
function stopRec(){ if(vrec && vrec.state==='recording') vrec.stop(); }
function voiceTab(p){
  var sc = cur(); p.appendChild(h('div',{class:'rz-hint'},[t('vhint')]));
  var r = h('div',{class:'rz-row'});
  if(UI.recording){ r.appendChild(btn('⏹ '+t('vstop'),'red',stopRec)); p.appendChild(r); p.appendChild(h('div',{class:'rz-hint'},['🔴 '+t('vrecnow')])); return; }
  r.appendChild(btn('🎙 '+t('vrec'),'go',startRec));
  if(sc.voice){
    r.appendChild(btn('▶ '+t('vplay'),'',function(){ try{ new Audio(sc.voice).play(); }catch(e){} }));
    r.appendChild(btn('🗑 '+t('vdel'),'sm red',function(){ delete sc.voice; changed(); renderAll(); }));
  }
  p.appendChild(r);
  if(sc.voice) p.appendChild(h('div',{class:'rz-hint'},['✅ '+t('vyes')]));
}

/* ---------- шаблоны ---------- */
var TPLS = [
 {id:'hello',music:'merry',n:{ru:'Знакомство',kz:'Танысу',en:'Meet me'},sc:[
  {bg:0,tp:'top',tsty:'bubble',st:[['c:leopard',480,326,240,'bounce','none','wave'],['☀️',860,90,110,'fade','spin'],['🌳',140,330,200,'zoom']],tx:{ru:'Привет! Я Барсик!',kz:'Сәлем! Мен Барсикпін!',en:"Hi! I'm Barsik!"}},
  {bg:5,st:[['🌳',160,330,220,'zoom'],['c:fox',420,326,230,'slide','none','walk','right'],['🌻',800,390,130,'fade'],['c:rabbit',700,332,190,'bounce','none','jump']],tx:{ru:'Я живу на Острове знаний',kz:'Мен Білім аралында тұрамын',en:'I live on the Island of Knowledge'}},
  {bg:3,tsty:'bubble',st:[['c:leopard',360,326,230,'zoom','none','stand'],['c:girl',590,320,240,'zoom','none','wave'],['❤️',470,110,100,'bounce','float']],tx:{ru:'Давай дружить!',kz:'Дос болайық!',en:"Let's be friends!"}}]},
 {id:'space',music:'space',n:{ru:'Полёт в космос',kz:'Ғарышқа сапар',en:'Space trip'},sc:[
  {bg:7,cam:'zin',st:[['🚀',560,250,230,'slide','float'],['⭐',700,100,90,'fade','spin'],['✨',840,260,100,'fade'],['🪐',200,130,150,'zoom'],['c:astronaut',260,330,240,'bounce','float','wave']],tx:{ru:'Летим к звёздам!',kz:'Жұлдыздарға ұшамыз!',en:'Flying to the stars!'}},
  {bg:18,tsty:'bubble',st:[['🛸',640,200,170,'slide','float'],['👽',720,350,190,'bounce','wiggle'],['c:astronaut',300,326,240,'zoom','none','talk']],tx:{ru:'Привет, друг с другой планеты!',kz:'Сәлем, басқа планетадан келген дос!',en:'Hello, friend from another planet!'}},
  {bg:0,cam:'zout',st:[['c:astronaut',480,326,250,'bounce','none','jump'],['🌍',820,110,110,'zoom','spin']],tx:{ru:'Мы вернулись домой!',kz:'Біз үйге оралдық!',en:'We are back home!'}}]},
 {id:'nauryz',music:'merry',n:{ru:'Наурыз',kz:'Наурыз',en:'Nauryz'},sc:[
  {bg:3,tp:'top',cam:'panr',st:[['⛺',250,330,240,'zoom'],['c:camel',640,326,250,'slide','none','walk','left'],['🌷',110,400,100,'fade'],['☀️',860,90,110,'fade','spin']],tx:{ru:'Пришёл праздник Наурыз!',kz:'Наурыз мейрамы келді!',en:'Nauryz has come!'}},
  {bg:0,st:[['c:kzgirl',340,324,240,'bounce','none','wave'],['c:kzboy',600,324,240,'bounce','none','jump'],['🪕',480,130,110,'zoom','wiggle'],['🎵',800,150,100,'fade','float']],tx:{ru:'Поём и танцуем',kz:'Ән айтып, би билейміз',en:'We sing and dance'}},
  {bg:19,tsty:'bubble',st:[['c:kzgirl',330,324,240,'zoom','none','talk'],['🍲',620,380,150,'zoom'],['🥛',760,390,120,'zoom'],['🎉',480,100,110,'bounce','float']],tx:{ru:'Угощайтесь, дорогие гости!',kz:'Қонақтар, дәм татыңыздар!',en:'Please, dear guests, help yourselves!'}}]},
 {id:'animals',music:'calm',n:{ru:'Кто где живёт',kz:'Кім қайда тұрады',en:'Who lives where'},sc:[
  {bg:5,st:[['🌲',130,320,200,'zoom'],['c:fox',360,326,230,'slide','none','walk','right'],['c:bear',700,326,250,'slide','none','wave'],['🌲',850,330,190,'zoom']],tx:{ru:'В лесу живут лиса и медведь',kz:'Орманда түлкі мен аю тұрады',en:'A fox and a bear live in the forest'}},
  {bg:17,st:[['🐟',300,250,130,'slide','float'],['🐢',620,340,150,'bounce','float'],['🐙',500,150,140,'fade','wiggle']],tx:{ru:'В море плавают рыбы и черепахи',kz:'Теңізде балықтар мен тасбақалар жүзеді',en:'Fish and turtles swim in the sea'}},
  {bg:3,st:[['c:camel',300,326,250,'slide','none','walk','right'],['c:horse',640,326,250,'slide','none','walk','right'],['🌾',830,400,110,'fade']],tx:{ru:'В степи идут верблюд и конь',kz:'Далада түйе мен жылқы келе жатыр',en:'A camel and a horse walk in the steppe'}}]},
 {id:'trip',music:'adv',n:{ru:'Приключение в горах',kz:'Таудағы оқиға',en:'Mountain adventure'},sc:[
  {bg:12,tp:'top',cam:'zin',st:[['🏔️',700,300,260,'zoom'],['c:boy',300,326,240,'bounce','none','walk','right'],['☁️',200,100,120,'fade','float']],tx:{ru:'Мы идём в горы!',kz:'Біз тауға шықтық!',en:'We are going to the mountains!'}},
  {bg:13,tsty:'bubble',st:[['⛺',620,350,240,'zoom'],['🔥',830,400,120,'bounce','wiggle'],['🌙',840,90,100,'fade'],['c:boy',300,326,240,'zoom','none','talk']],tx:{ru:'Ставим палатку на ночь!',kz:'Түнеуге шатыр тігеміз!',en:'We pitch a tent for the night!'}},
  {bg:0,cam:'zout',st:[['🌈',480,150,280,'zoom'],['c:boy',480,326,250,'bounce','none','jump'],['👍',780,300,120,'bounce']],tx:{ru:'Какое классное путешествие!',kz:'Қандай керемет саяхат!',en:'What a great trip!'}}]}
];
function buildTpl(tp){
  var lg = lang();
  return tp.sc.map(function(d){ var o = newScene(); o.bg = d.bg; o.dur = 4; o.tpos = d.tp||'bot'; o.tstyle = d.tsty||'box'; o.cam = d.cam||'none'; o.text = d.tx[lg]||d.tx.ru;
    o.stk = d.st.map(function(a){ var isC = String(a[0]).indexOf('c:')===0, st = {x:a[1],y:a[2],s:a[3],flip:false,rot:0,anim:a[4]||'none',idle:a[5]||'none'};
      if(isC){ st.c = a[0].slice(2); st.e = ''; st.act = a[6]||'stand'; st.mv = a[7]||'none'; st.flip = (st.mv==='left') && RZC.isBeast(st.c); } else st.e = a[0]; return st; }); return o; });
}
function applyTpl(tp){
  var nonEmpty = S.scenes.length>1 || S.scenes[0].stk.length || S.scenes[0].text;
  if(nonEmpty && !confirm(t('tplq'))) return;
  var lg = lang(); S.scenes = buildTpl(tp); S.music = tp.music; S.cur = 0; S.sel = -1; S.title = tp.n[lg]||tp.n.ru; UI.tab = 'scene'; changed(); renderAll();
}
function tplTab(p){
  p.appendChild(h('div',{class:'rz-hint'},[t('tplh')]));
  TPLS.forEach(function(tp){
    var c = h('canvas',{width:240,height:135,style:'width:120px;border-radius:8px;background:#000;flex:none'});
    var row = h('button',{type:'button',class:'rz-btn',style:'display:flex;gap:10px;align-items:center;width:100%;margin:6px 0;text-align:start',onclick:function(){ applyTpl(tp); }},[c,h('span',{},[(tp.n[lang()]||tp.n.ru)])]);
    p.appendChild(row);
    var k = c.getContext('2d'); k.setTransform(c.width/W,0,0,c.height/H,0,0); drawScene(k,buildTpl(tp)[0],20,-1);
  });
}

function musicTab(p){
  var r = h('div',{class:'rz-row'});
  [['none','m_none'],['merry','m_merry'],['calm','m_calm'],['adv','m_adv'],['space','m_space']].forEach(function(o){
    r.appendChild(btn((o[0]==='none'?'🔇 ':'🎵 ')+t(o[1]),'sm'+(S.music===o[0]?' on':''),function(){ S.music = o[0]; autosave(); renderPanel(); if(!UI.playing){ musicStop(); if(o[0]!=='none'){ musicStart(null); setTimeout(function(){ if(!UI.playing) musicStop(); },3500); } } }));
  });
  p.appendChild(r);
  p.appendChild(h('h4',{},[t('vol')]));
  p.appendChild(h('input',{type:'range',min:0.1,max:1,step:0.05,value:S.vol,oninput:function(e){ S.vol = +e.target.value; if(musicGain) musicGain.gain.value = S.vol*0.5; autosave(); }}));
}
function projTab(p){
  p.appendChild(h('h4',{},[t('name')]));
  p.appendChild(h('input',{type:'text',maxlength:60,value:S.title,oninput:function(e){ S.title = e.target.value; autosave(); }}));
  var r = h('div',{class:'rz-row'});
  r.appendChild(btn('💾 '+t('save'),'sm',function(){ try{ localStorage.setItem('rezh_project_v1',JSON.stringify(S)); alert(t('saved')); }catch(e){ autosave(); alert(t('saved')); } }));
  r.appendChild(btn('⬇ '+t('dl'),'sm',function(){ var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'})); a.download = ((S.title||'rolik').replace(/\s+/g,'_'))+'.rezh.json'; document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },3000); }));
  var inp = h('input',{type:'file',accept:'.json,application/json',style:'display:none',onchange:function(e){ var f = e.target.files[0]; if(!f) return; var fr = new FileReader(); fr.onload = function(){ try{ var o = JSON.parse(fr.result); if(o && o.scenes && o.scenes.length){ S = o; S.cur = 0; S.sel = -1; changed(); renderAll(); } }catch(x){} }; fr.readAsText(f); }});
  r.appendChild(inp); r.appendChild(btn('📂 '+t('load'),'sm',function(){ inp.click(); }));
  r.appendChild(btn('🆕 '+t('newp'),'sm red',function(){ if(confirm(t('newq'))){ reset(); changed(); renderAll(); } }));
  p.appendChild(r);
  p.appendChild(h('div',{class:'rz-hint'},['🔒 '+t('safe')]));
}
function renderPanel(){
  var p = document.getElementById('rz-panel'); if(!p) return; p.innerHTML = '';
  var tabs = h('div',{class:'rz-tabs'});
  [['tpl','🧩 '+t('tpl')],['scene','🎞 '+t('scene')],['pics','🐆 '+t('pics')],['text','💬 '+t('text')],['voice','🎙 '+t('voice')],['music','🎵 '+t('music')],['proj','📁 '+t('proj')]].forEach(function(o){
    tabs.appendChild(h('button',{type:'button',class:'rz-tab'+(UI.tab===o[0]?' on':''),onclick:function(){ UI.tab = o[0]; renderPanel(); }},[o[1]]));
  });
  p.appendChild(tabs);
  var body = h('div'); p.appendChild(body);
  ({tpl:tplTab,scene:sceneTab,pics:picsTab,text:textTab,voice:voiceTab,music:musicTab,proj:projTab})[UI.tab](body);
  redraw();
}
function renderAll(){ renderStrip(); renderPanel(); refreshBar(); setTime(0); redraw(); }

/* перетаскивание картинок на сцене */
function bindCanvas(){
  var drag = null;
  function pos(e){ var r = cv.getBoundingClientRect(); return {x:(e.clientX-r.left)*W/r.width, y:(e.clientY-r.top)*H/r.height}; }
  cv.addEventListener('pointerdown',function(e){
    if(UI.playing) return; var p = pos(e), a = cur().stk, hit = -1;
    for(var i=a.length-1;i>=0;i--){ var s = a[i], r = s.s*0.62; if(Math.abs(p.x-s.x)<=r && Math.abs(p.y-s.y)<=r){ hit = i; break; } }
    var was = S.sel; S.sel = hit;
    if(hit>=0){ drag = {i:hit,dx:p.x-a[hit].x,dy:p.y-a[hit].y}; try{ cv.setPointerCapture(e.pointerId); }catch(x){} UI.tab = 'pics'; }
    if(was!==hit || hit>=0) renderPanel(); redraw();
  });
  cv.addEventListener('pointermove',function(e){ if(!drag) return; var p = pos(e), s = cur().stk[drag.i]; if(!s) return; s.x = Math.max(0,Math.min(W,p.x-drag.dx)); s.y = Math.max(0,Math.min(H,p.y-drag.dy)); redraw(); });
  function up(){ if(drag){ drag = null; autosave(); } }
  cv.addEventListener('pointerup',up); cv.addEventListener('pointercancel',up);
}

function build(root){
  root.innerHTML = '';
  cv = h('canvas',{width:W,height:H}); cx = cv.getContext('2d');
  var wrap = h('div',{class:'rz-card'},[
    h('div',{class:'rz-stagewrap'},[cv,h('div',{class:'rz-over',id:'rz-over'})]),
    h('div',{class:'rz-bar'},[
      h('button',{id:'rz-play',type:'button',class:'rz-btn go',onclick:function(){ if(UI.playing) stopPlay(); else play(false); }},['▶ '+t('play')]),
      h('button',{id:'rz-make',type:'button',class:'rz-btn pri',onclick:exportVideo},['🎬 '+t('make')]),
      h('div',{class:'rz-modes'},[
        h('button',{type:'button',class:UI.adv?'':'on',onclick:function(){ setMode(false); }},['🧒 '+t('kid')]),
        h('button',{type:'button',class:UI.adv?'on':'',onclick:function(){ setMode(true); }},['🎓 '+t('pro')])]),
      h('span',{class:'rz-time',id:'rz-time'},['0:00'])
    ]),
    h('div',{class:'rz-strip',id:'rz-strip'})
  ]);
  var side = h('div',{class:'rz-card rz-side',id:'rz-panel'});
  root.appendChild(wrap); root.appendChild(side);
  bindCanvas(); renderAll(); if(!liveRaf) live();
}
function setMode(a){ UI.adv = !!a; document.body.classList.toggle('rz-adv',UI.adv); try{ localStorage.setItem('rezh_mode',a?'adv':'kid'); }catch(e){} var root = document.getElementById('rz-app'); if(root){ var keep = {cur:S.cur}; build(root); } }

function heads(){ var l = document.getElementById('rz-lead'); if(l) l.textContent = t('lead'); var h2 = document.getElementById('rz-h2'); if(h2) h2.textContent = '🎬 '+t('h2'); }
function init(){
  var root = document.getElementById('rz-app'); if(!root) return;
  try{ UI.adv = localStorage.getItem('rezh_mode')==='adv'; }catch(e){}
  document.body.classList.toggle('rz-adv',UI.adv);
  if(!loadSaved()){ reset(); UI.tab = 'tpl'; }
  build(root);
  heads();
  new MutationObserver(function(){ if(UI.playing) return; build(root); heads(); }).observe(document.documentElement,{attributes:true,attributeFilter:['data-current']});
  window.RZ = {state:function(){ return S; },play:play,exportVideo:exportVideo,addSticker:addSticker};
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
