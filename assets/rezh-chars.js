/* Белім Аралы — рисованные герои для «Стань режиссёром»: звери и люди в полный рост, умеют стоять, идти, махать, прыгать, говорить.
   Всё рисуется кодом на canvas (никаких внешних картинок). Персонаж занимает квадрат 1×1, центр в (0,0), ступни на y=+0.45. */
(function(){
'use strict';
var INK = '#3b2a20', OL = 0.013;

function sh(hex,k){ /* осветлить/затемнить цвет */
  var n = parseInt(hex.slice(1),16), r = n>>16, g = (n>>8)&255, b = n&255;
  function f(v){ return Math.max(0,Math.min(255,Math.round(v+k))); }
  return 'rgb('+f(r)+','+f(g)+','+f(b)+')';
}
function ln(c,x1,y1,x2,y2,w,col,outline){
  c.lineCap = 'round';
  if(outline!==false){ c.strokeStyle = INK; c.lineWidth = w+OL*2; c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke(); }
  c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke();
}
function el(c,x,y,rx,ry,fill,out,rot){
  c.beginPath(); c.ellipse(x,y,Math.max(0.0001,rx),Math.max(0.0001,ry),rot||0,0,6.2832);
  if(fill){ c.fillStyle = fill; c.fill(); } if(out!==false){ c.lineWidth = OL; c.strokeStyle = INK; c.stroke(); }
}
function poly(c,pts,fill,out){
  c.beginPath(); pts.forEach(function(p,i){ if(i) c.lineTo(p[0],p[1]); else c.moveTo(p[0],p[1]); }); c.closePath();
  if(fill){ c.fillStyle = fill; c.fill(); } if(out!==false){ c.lineWidth = OL; c.strokeStyle = INK; c.lineJoin = 'round'; c.stroke(); }
}
function blink(t){ return (t%3.4) < 0.13; }

/* ================= ЗВЕРИ ================= */
var BEASTS = {
 leopard:{n:{ru:'Барсик',kz:'Барсик',en:'Barsik'},col:'#e9e5dd',belly:'#fbf8f2',L:.25,lw:.075,brx:.27,bry:.15,hr:.125,neck:0,ear:'round',tail:'long',spots:'rosette',eye:'#79b9e8',muz:'#fbf8f2',tailcol:'#d9d3c8'},
 lion:{n:{ru:'Лев',kz:'Арыстан',en:'Lion'},col:'#e3a63c',belly:'#f4cc7a',L:.26,lw:.08,brx:.27,bry:.15,hr:.12,neck:0,ear:'round',tail:'tuft',mane:'#9c5a1f',muz:'#f4cc7a',tailcol:'#e3a63c'},
 tiger:{n:{ru:'Тигр',kz:'Жолбарыс',en:'Tiger'},col:'#f08a26',belly:'#fff1dc',L:.25,lw:.078,brx:.28,bry:.15,hr:.125,neck:0,ear:'round',tail:'long',stripes:1,muz:'#fff1dc',tailcol:'#f08a26'},
 dog:{n:{ru:'Собака',kz:'Ит',en:'Dog'},col:'#cb8d4b',belly:'#f2dcb4',L:.24,lw:.07,brx:.25,bry:.135,hr:.115,neck:0,ear:'floppy',earcol:'#8d5624',tail:'up',muz:'#f2dcb4',tailcol:'#cb8d4b'},
 cat:{n:{ru:'Кошка',kz:'Мысық',en:'Cat'},col:'#9ca3ad',belly:'#e8ebef',L:.22,lw:.065,brx:.23,bry:.125,hr:.115,neck:0,ear:'point',tail:'up',stripes:1,muz:'#e8ebef',tailcol:'#9ca3ad'},
 bear:{n:{ru:'Медведь',kz:'Аю',en:'Bear'},col:'#7d553a',belly:'#a67c5a',L:.23,lw:.1,brx:.3,bry:.18,hr:.14,neck:0,ear:'round',tail:'short',muz:'#c9a37e',tailcol:'#7d553a'},
 fox:{n:{ru:'Лиса',kz:'Түлкі',en:'Fox'},col:'#ea7430',belly:'#fff3e6',L:.24,lw:.06,brx:.24,bry:.125,hr:.11,neck:0,ear:'point',earcol:'#3a2a22',tail:'bushy',muz:'#fff3e6',tailcol:'#ea7430',tailtip:'#ffffff',snout:1.35},
 wolf:{n:{ru:'Волк',kz:'Қасқыр',en:'Wolf'},col:'#8e949d',belly:'#d3d7dc',L:.27,lw:.068,brx:.27,bry:.14,hr:.115,neck:0,ear:'point',tail:'bushy',muz:'#d3d7dc',tailcol:'#8e949d',snout:1.35},
 rabbit:{n:{ru:'Заяц',kz:'Қоян',en:'Rabbit'},col:'#f2ede7',belly:'#ffffff',L:.2,lw:.07,brx:.2,bry:.15,hr:.12,neck:0,ear:'long',earcol:'#f3b8c4',tail:'puff',muz:'#ffffff',tailcol:'#ffffff'},
 horse:{n:{ru:'Конь',kz:'Жылқы',en:'Horse'},col:'#a8693b',belly:'#c78a57',L:.36,lw:.055,brx:.3,bry:.14,hr:.095,neck:.12,ear:'point',tail:'flow',mane:'#3b2416',muz:'#c78a57',tailcol:'#3b2416',snout:1.9,hoof:'#2b1d14'},
 camel:{n:{ru:'Верблюд',kz:'Түйе',en:'Camel'},col:'#cba461',belly:'#e2c78f',L:.36,lw:.06,brx:.28,bry:.14,hr:.088,neck:.2,ear:'round',tail:'short',humps:2,muz:'#e2c78f',tailcol:'#cba461',snout:1.5,hoof:'#7a5a2c'},
 sheep:{n:{ru:'Овца',kz:'Қой',en:'Sheep'},col:'#f7f4ee',belly:'#f7f4ee',L:.22,lw:.06,brx:.25,bry:.16,hr:.1,neck:0,ear:'floppy',earcol:'#3b3b3b',tail:'puff',wool:1,face:'#3d3d3d',muz:'#555',tailcol:'#f7f4ee'},
 cow:{n:{ru:'Корова',kz:'Сиыр',en:'Cow'},col:'#fdfbf7',belly:'#fdfbf7',L:.27,lw:.07,brx:.3,bry:.16,hr:.115,neck:0,ear:'floppy',earcol:'#2b2b2b',tail:'tuft',patch:1,horns:1,muz:'#f6b9c4',tailcol:'#2b2b2b',snout:1.3},
 elephant:{n:{ru:'Слон',kz:'Піл',en:'Elephant'},col:'#9ca5b0',belly:'#b9c1ca',L:.25,lw:.12,brx:.31,bry:.2,hr:.15,neck:0,ear:'elephant',tail:'short',trunk:1,muz:'#9ca5b0',tailcol:'#9ca5b0'}
};

function drawBeast(c,sp,t,act){
  var ph = t*9, walk = act==='walk', L = sp.L, brx = sp.brx, bry = sp.bry, by = 0.45-L-bry*0.55, lw = sp.lw;
  var jy = act==='jump' ? -Math.abs(Math.sin(t*5))*0.2 : (walk ? -Math.abs(Math.sin(ph))*0.012 : 0);
  var wag = Math.sin(t*(act==='talk'?9:5))*0.06;
  c.save(); c.translate(0,jy);
  function leg(x,a,col,far){
    var hx = x, hy = by+bry*0.55, ex = hx+Math.sin(a)*L, ey = hy+Math.cos(a)*L;
    ln(c,hx,hy,ex,ey,lw,col);
    el(c,ex+Math.sin(a)*0.01,ey+0.005,lw*0.62,lw*0.42,sp.hoof||col,true,0);
  }
  function legAng(p,fr){ if(walk) return Math.sin(ph+p)*0.55; if(act==='wave' && fr===1 && p===Math.PI) return 2.1+Math.sin(t*9)*0.45; return 0; }
  var far = sh(sp.col,-34);
  leg(-brx*0.62+0.05,legAng(Math.PI,0),far); leg(brx*0.62+0.05,legAng(0,1)*(act==='wave'?0:1),far);
  /* хвост */
  var tx = -brx*0.92, ty = by-bry*0.25, tc = sp.tailcol||sp.col;
  c.save(); c.lineCap = 'round';
  if(sp.tail==='long'){ c.strokeStyle = INK; c.lineWidth = 0.07+OL*2; c.beginPath(); c.moveTo(tx,ty); c.quadraticCurveTo(tx-0.2,ty+0.08,tx-0.3,ty-0.1+wag); c.stroke(); c.strokeStyle = tc; c.lineWidth = 0.07; c.beginPath(); c.moveTo(tx,ty); c.quadraticCurveTo(tx-0.2,ty+0.08,tx-0.3,ty-0.1+wag); c.stroke(); if(sp.spots){ c.strokeStyle = '#555a66'; c.lineWidth = 0.075; c.setLineDash([0.02,0.07]); c.beginPath(); c.moveTo(tx,ty); c.quadraticCurveTo(tx-0.2,ty+0.08,tx-0.3,ty-0.1+wag); c.stroke(); } }
  else if(sp.tail==='up'){ c.strokeStyle = INK; c.lineWidth = 0.05+OL*2; c.beginPath(); c.moveTo(tx,ty); c.quadraticCurveTo(tx-0.14,ty-0.05,tx-0.1+wag,ty-0.26); c.stroke(); c.strokeStyle = tc; c.lineWidth = 0.05; c.beginPath(); c.moveTo(tx,ty); c.quadraticCurveTo(tx-0.14,ty-0.05,tx-0.1+wag,ty-0.26); c.stroke(); }
  else if(sp.tail==='bushy'){ c.translate(tx-0.1,ty+0.03); c.rotate(0.35+wag); el(c,0,0,0.17,0.075,tc); if(sp.tailtip) el(c,-0.11,0,0.07,0.065,sp.tailtip,false); c.rotate(-0.35-wag); c.translate(-(tx-0.1),-(ty+0.03)); }
  else if(sp.tail==='tuft'){ c.strokeStyle = INK; c.lineWidth = 0.035+OL*2; c.beginPath(); c.moveTo(tx,ty); c.quadraticCurveTo(tx-0.1,ty+0.1,tx-0.1+wag,ty+0.2); c.stroke(); c.strokeStyle = sp.col; c.lineWidth = 0.035; c.beginPath(); c.moveTo(tx,ty); c.quadraticCurveTo(tx-0.1,ty+0.1,tx-0.1+wag,ty+0.2); c.stroke(); el(c,tx-0.1+wag,ty+0.22,0.04,0.05,sp.mane||'#2b2b2b'); }
  else if(sp.tail==='flow'){ c.strokeStyle = tc; c.lineWidth = 0.07; c.beginPath(); c.moveTo(tx,ty); c.quadraticCurveTo(tx-0.14,ty+0.12,tx-0.12+wag,ty+0.32); c.stroke(); }
  else if(sp.tail==='puff'){ el(c,tx-0.02,ty,0.05,0.05,tc); }
  else if(sp.tail==='short'){ el(c,tx-0.02,ty+0.02,0.045,0.04,tc); }
  c.restore();
  /* горбы */
  if(sp.humps){ el(c,-0.07,by-bry*0.95,0.1,0.13,sp.col); el(c,0.1,by-bry*0.95,0.1,0.13,sp.col); }
  /* шерсть овцы / тело */
  if(sp.wool){ for(var i=0;i<12;i++){ var a = i/12*6.2832; el(c,Math.cos(a)*brx*0.85,by+Math.sin(a)*bry*0.85,0.085,0.085,'#f7f4ee'); } el(c,0,by,brx*0.9,bry*0.9,'#f7f4ee',false); }
  else el(c,0,by,brx,bry,sp.col);
  /* узоры на теле */
  c.save(); c.beginPath(); c.ellipse(0,by,brx,bry,0,0,6.2832); c.clip();
  if(!sp.wool){ c.fillStyle = sp.belly; c.fillRect(-brx,by+bry*0.35,brx*2,bry); }
  if(sp.spots){ c.strokeStyle = '#555a66'; c.lineWidth = 0.014; [[-0.17,-0.05,0.045],[-0.05,-0.07,0.05],[0.08,-0.05,0.045],[0.18,0.0,0.04],[-0.12,0.05,0.04],[0.02,0.03,0.045],[0.14,0.07,0.035],[-0.22,0.04,0.035]].forEach(function(s){ c.beginPath(); c.arc(s[0],by+s[1],s[2],0,6.2832); c.stroke(); c.fillStyle = 'rgba(85,90,102,.25)'; c.fill(); }); }
  if(sp.stripes){ c.strokeStyle = '#2b2118'; c.lineWidth = 0.028; for(var k=-4;k<=4;k++){ c.beginPath(); c.moveTo(k*0.06,by-bry); c.quadraticCurveTo(k*0.06+0.02,by,k*0.06-0.01,by+bry*0.5); c.stroke(); } }
  if(sp.patch){ c.fillStyle = '#2b2b2b'; el(c,-0.1,by-0.03,0.09,0.07,'#2b2b2b',false); el(c,0.12,by+0.05,0.07,0.06,'#2b2b2b',false); }
  c.restore();
  el(c,0,by,brx,bry,false);
  /* передние/задние ближние ноги */
  leg(-brx*0.62,legAng(0,0),sp.col); leg(brx*0.62,legAng(Math.PI,1),sp.col);
  /* шея и голова */
  var hr = sp.hr, nk = sp.neck, sx = brx*0.7, sy = by-bry*0.3;
  var hx = brx*0.78+hr*0.5, hy = by-bry*0.55-hr*0.15-nk; if(act==='talk') hy += Math.sin(t*14)*0.008; if(act==='wave') hy += Math.sin(t*9)*0.01;
  if(nk>0){ ln(c,sx,sy,hx-hr*0.2,hy+hr*0.5,hr*1.15,sp.col); if(sp.mane){ ln(c,sx-0.04,sy-0.02,hx-hr*0.7,hy-hr*0.2,0.05,sp.mane); } }
  if(sp.mane && nk===0){ el(c,hx-0.01,hy+0.01,hr*1.55,hr*1.5,sp.mane); }
  if(sp.ear==='elephant') el(c,hx-hr*0.5,hy+hr*0.1,hr*0.95,hr*1.2,sh(sp.col,-12));
  /* дальнее ухо */
  function ears(){
    var e = sp.ear, ec = sp.earcol || sp.col;
    if(e==='round'){ el(c,hx-hr*0.45,hy-hr*0.85,hr*0.38,hr*0.38,sp.col); el(c,hx-hr*0.45,hy-hr*0.85,hr*0.2,hr*0.2,sp.belly,false); }
    else if(e==='point'){ poly(c,[[hx-hr*0.7,hy-hr*0.5],[hx-hr*0.5,hy-hr*1.7],[hx-hr*0.05,hy-hr*0.8]],ec); poly(c,[[hx-hr*0.55,hy-hr*0.75],[hx-hr*0.48,hy-hr*1.35],[hx-hr*0.22,hy-hr*0.85]],'#f3b8c4',false); }
    else if(e==='long'){ c.save(); c.translate(hx-hr*0.3,hy-hr*0.6); c.rotate(-0.25+Math.sin(t*3)*0.04); el(c,0,-hr*1.2,hr*0.32,hr*1.3,ec&&sp.col); el(c,0,-hr*1.2,hr*0.17,hr*1.0,sp.earcol,false); c.restore(); }
    else if(e==='floppy'){ el(c,hx-hr*0.35,hy-hr*0.1,hr*0.34,hr*0.7,ec,true,0.2); }
  }
  ears();
  el(c,hx,hy,hr,hr*(sp.face?1.05:1),sp.face||sp.col);
  /* морда */
  var sn = sp.snout||1, mx = hx+hr*0.55*sn, my = hy+hr*0.32;
  el(c,mx,my,hr*0.62*sn,hr*0.48,sp.muz||sp.belly);
  if(sp.trunk){
    var tw = Math.sin(t*4)*0.03; c.save(); c.lineCap = 'round';
    c.strokeStyle = INK; c.lineWidth = hr*0.7+OL*2; c.beginPath(); c.moveTo(hx+hr*0.7,hy+hr*0.2); c.quadraticCurveTo(hx+hr*1.2,hy+hr*1.4,hx+hr*0.8+tw,hy+hr*2.3); c.stroke();
    c.strokeStyle = sp.col; c.lineWidth = hr*0.7; c.beginPath(); c.moveTo(hx+hr*0.7,hy+hr*0.2); c.quadraticCurveTo(hx+hr*1.2,hy+hr*1.4,hx+hr*0.8+tw,hy+hr*2.3); c.stroke(); c.restore();
    ln(c,hx+hr*0.45,hy+hr*0.55,hx+hr*0.65,hy+hr*1.1,0.03,'#fffdf5');
  } else {
    el(c,mx+hr*0.5*sn,my-hr*0.12,hr*0.14,hr*0.1,sp.noseCol||'#2b2b2b',false);
    if(act==='talk'){ var o = 0.02+Math.abs(Math.sin(t*12))*0.035; el(c,mx+hr*0.1*sn,my+hr*0.3+o*0.5,hr*0.3*sn,o,'#7a1f2a'); }
    else { c.strokeStyle = INK; c.lineWidth = 0.008; c.beginPath(); c.arc(mx+hr*0.15*sn,my+hr*0.1,hr*0.25,0.2,1.5); c.stroke(); }
  }
  var ex = hx+hr*0.22, ey = hy-hr*0.18;
  if(blink(t)){ ln(c,ex-hr*0.2,ey,ex+hr*0.2,ey,0.01,INK,false); }
  else { el(c,ex,ey,hr*0.27,hr*0.3,'#ffffff'); el(c,ex+hr*0.05,ey,hr*0.16,hr*0.2,sp.eye||'#2a2a2a',false); el(c,ex+hr*0.08,ey,hr*0.09,hr*0.11,'#111',false); el(c,ex+hr*0.12,ey-hr*0.07,hr*0.05,hr*0.05,'#fff',false); }
  if(sp.ear==='round'||sp.ear==='point'||sp.ear==='long'){ /* ближнее ухо */ var e = sp.ear;
    if(e==='round') el(c,hx+hr*0.1,hy-hr*0.95,hr*0.38,hr*0.38,sp.col);
    else if(e==='point'){ poly(c,[[hx-hr*0.1,hy-hr*0.7],[hx+hr*0.2,hy-hr*1.75],[hx+hr*0.6,hy-hr*0.6]],sp.earcol||sp.col); poly(c,[[hx+0.0,hy-hr*0.8],[hx+hr*0.2,hy-hr*1.4],[hx+hr*0.4,hy-hr*0.75]],'#f3b8c4',false); }
    else if(e==='long'){ c.save(); c.translate(hx+hr*0.05,hy-hr*0.7); c.rotate(0.15+Math.sin(t*3+1)*0.04); el(c,0,-hr*1.25,hr*0.32,hr*1.3,sp.col); el(c,0,-hr*1.25,hr*0.17,hr*1.0,sp.earcol,false); c.restore(); } }
  if(sp.horns){ poly(c,[[hx-hr*0.2,hy-hr*0.95],[hx-hr*0.35,hy-hr*1.5],[hx,hy-hr*1.0]],'#f4e6b0'); poly(c,[[hx+hr*0.25,hy-hr*0.95],[hx+hr*0.4,hy-hr*1.5],[hx+hr*0.6,hy-hr*0.85]],'#f4e6b0'); }
  c.restore();
}

/* ================= ЛЮДИ ================= */
var PEOPLE = {
 boy:{n:{ru:'Мальчик',kz:'Ұл бала',en:'Boy'},skin:'#f5c9a0',hair:'#3a2a1c',hs:'short',top:'#4c8dff',bot:'#2f4d8a',shoe:'#fff',},
 girl:{n:{ru:'Девочка',kz:'Қыз бала',en:'Girl'},skin:'#f5c9a0',hair:'#5a3220',hs:'braids',top:'#ff7aa8',bot:'skirt',botc:'#ffb3d0',shoe:'#c0407a'},
 man:{n:{ru:'Мужчина',kz:'Ер адам',en:'Man'},skin:'#f0be96',hair:'#2b2118',hs:'short',top:'#2ec27e',bot:'#3b4a63',shoe:'#2b2b2b',mus:1,tall:1},
 woman:{n:{ru:'Женщина',kz:'Әйел адам',en:'Woman'},skin:'#f0be96',hair:'#6b3a1f',hs:'long',top:'#b79cff',bot:'skirt',botc:'#8a6fe0',shoe:'#7a3a5a'},
 grandpa:{n:{ru:'Дедушка',kz:'Ата',en:'Grandpa'},skin:'#eebf9a',hair:'#d8d8d8',hs:'bald',top:'#8a7a5a',bot:'#4a4a4a',shoe:'#2b2b2b',beard:'#e8e8e8',glasses:1,cane:1},
 grandma:{n:{ru:'Бабушка',kz:'Әже',en:'Grandma'},skin:'#eebf9a',hair:'#dcdcdc',hs:'bun',top:'#c85a8a',bot:'skirt',botc:'#a94673',shoe:'#5a3a3a',glasses:1,scarf:'#ffffff'},
 kzboy:{n:{ru:'Казахский мальчик',kz:'Қазақ баласы',en:'Kazakh boy'},skin:'#f2c49a',hair:'#1f1812',hs:'short',top:'#c9302c',bot:'#2b2b44',shoe:'#4a2a1a',hat:'tubeteika',chapan:'#1f5ea8'},
 kzgirl:{n:{ru:'Казахская девочка',kz:'Қазақ қызы',en:'Kazakh girl'},skin:'#f2c49a',hair:'#1f1812',hs:'braids',top:'#2aa5a0',bot:'skirt',botc:'#d9a33a',shoe:'#6a2a2a',hat:'saukele'},
 astronaut:{n:{ru:'Космонавт',kz:'Ғарышкер',en:'Astronaut'},skin:'#f5c9a0',hair:'#3a2a1c',hs:'short',top:'#f1f4f8',bot:'#dfe5ec',shoe:'#8a94a3',hat:'helmet'},
 doctor:{n:{ru:'Врач',kz:'Дәрігер',en:'Doctor'},skin:'#f5c9a0',hair:'#4a3020',hs:'long',top:'#ffffff',bot:'#e6eef7',shoe:'#4c8dff',hat:'doccap',coat:1,steth:1},
 teacher:{n:{ru:'Учитель',kz:'Мұғалім',en:'Teacher'},skin:'#f0be96',hair:'#3a2a1c',hs:'short',top:'#e8913a',bot:'#4a4a5a',shoe:'#2b2b2b',glasses:1,book:1},
 cook:{n:{ru:'Повар',kz:'Аспаз',en:'Cook'},skin:'#f0be96',hair:'#2b2118',hs:'short',top:'#ffffff',bot:'#3b3b3b',shoe:'#2b2b2b',hat:'chef',mus:1,apron:1},
 firefighter:{n:{ru:'Пожарный',kz:'Өрт сөндіруші',en:'Firefighter'},skin:'#f0be96',hair:'#2b2118',hs:'short',top:'#e53935',bot:'#7a2a24',shoe:'#2b2b2b',hat:'fhelmet',stripe:1},
 police:{n:{ru:'Полицейский',kz:'Полиция қызметкері',en:'Police officer'},skin:'#f0be96',hair:'#2b2118',hs:'short',top:'#4a6da0',bot:'#2f3f5a',shoe:'#1f1f1f',hat:'pcap'},
 robot:{n:{ru:'Робот',kz:'Робот',en:'Robot'},robot:1}
};

function drawRobot(c,t,act){
  var walk = act==='walk', ph = t*9, jy = act==='jump' ? -Math.abs(Math.sin(t*5))*0.18 : 0;
  c.save(); c.translate(0,jy);
  var sw = walk ? Math.sin(ph)*0.4 : 0;
  [[-0.07,sw],[0.07,-sw]].forEach(function(l){ ln(c,l[0],0.08,l[0]+Math.sin(l[1])*0.3,0.08+Math.cos(l[1])*0.3,0.07,'#8a97a8'); el(c,l[0]+Math.sin(l[1])*0.3,0.4,0.06,0.03,'#4a5568'); });
  poly(c,[[-0.15,-0.2],[0.15,-0.2],[0.15,0.1],[-0.15,0.1]],'#b9c6d6'); el(c,0,-0.05,0.06,0.06,'#ff6b6b'); el(c,0,-0.05,0.025,0.025,'#fff',false);
  var wv = act==='wave', ta = act==='talk';
  var la = walk ? -sw : 0.15, ra = wv ? 2.5+Math.sin(t*9)*0.4 : (walk ? sw : -0.15), jmp = act==='jump';
  if(jmp){ la = -2.6; ra = 2.6; }
  [[-0.17,la],[0.17,ra]].forEach(function(a){ ln(c,a[0],-0.15,a[0]+Math.sin(a[1])*0.22,-0.15+Math.cos(a[1])*0.22,0.05,'#8a97a8'); el(c,a[0]+Math.sin(a[1])*0.22,-0.15+Math.cos(a[1])*0.22,0.035,0.035,'#4a5568'); });
  ln(c,0,-0.34,0,-0.44,0.015,'#4a5568'); el(c,0,-0.46,0.025,0.025,'#ffd24a');
  poly(c,[[-0.13,-0.34],[0.13,-0.34],[0.13,-0.2],[-0.13,-0.2]],'#cfd9e6');
  el(c,-0.055,-0.28,0.035,0.035,'#4cc9ff'); el(c,0.055,-0.28,0.035,0.035,'#4cc9ff'); el(c,-0.05,-0.29,0.012,0.012,'#fff',false); el(c,0.06,-0.29,0.012,0.012,'#fff',false);
  if(ta){ var o = 0.01+Math.abs(Math.sin(t*12))*0.02; el(c,0,-0.225,0.04,o,'#333'); } else { ln(c,-0.04,-0.225,0.04,-0.225,0.012,'#333',false); }
  c.restore();
}

function drawPerson(c,P,t,act){
  if(P.robot) return drawRobot(c,t,act);
  var walk = act==='walk', ph = t*9, jump = act==='jump';
  var jy = jump ? -Math.abs(Math.sin(t*5))*0.2 : (walk ? -Math.abs(Math.sin(ph))*0.012 : 0);
  var sc = P.tall ? 1 : 1; c.save(); c.translate(0,jy);
  var hy = -0.33, hr = 0.125;
  /* ноги */
  var la = walk ? Math.sin(ph)*0.3 : 0, ra = -la, isSkirt = P.bot==='skirt', botc = P.botc || P.bot, legcol = isSkirt ? P.skin : P.bot;
  if(jump){ la = -0.18; ra = 0.18; }
  [[-0.065,la],[0.065,ra]].forEach(function(l){
    var hx = l[0], hyy = 0.06, ex = hx+Math.sin(l[1])*0.4, ey = hyy+Math.cos(l[1])*0.4;
    ln(c,hx,hyy,ex,ey,0.08,legcol); el(c,ex+Math.sin(l[1])*0.02,ey+0.012,0.062,0.032,P.shoe||'#333');
  });
  /* руки (задний план) и плащ/халат */
  var armL = -0.22, armR = 0.22;
  if(walk){ armL = -0.3-Math.sin(ph)*0.22; armR = 0.3-Math.sin(ph)*0.22; }
  if(act==='wave'){ armR = 2.5+Math.sin(t*9)*0.45; }
  else if(act==='talk'){ armR = 0.9+Math.sin(t*5)*0.3; armL = -0.5+Math.sin(t*4+1)*0.2; }
  else if(jump){ armL = -2.6; armR = 2.6; }
  function arm(sx,a,sleeve){ var ex = sx+Math.sin(a)*0.25, ey = -0.17+Math.cos(a)*0.25; ln(c,sx,-0.17,ex,ey,0.065,sleeve); el(c,ex+Math.sin(a)*0.01,ey+Math.cos(a)*0.01,0.037,0.037,P.skin); return [ex,ey]; }
  var topc = P.chapan || P.top;
  var h = null;
  if(P.hs==='long' || P.hs==='braids' && false){ poly(c,[[-0.14,-0.38],[0.14,-0.38],[0.15,-0.12],[-0.15,-0.12]],P.hair); }
  /* торс/платье */
  if(P.chapan){ poly(c,[[-0.14,-0.21],[0.14,-0.21],[0.2,0.28],[-0.2,0.28]],P.chapan); ln(c,0,-0.2,0,0.28,0.012,'#f2c14e',false); ln(c,-0.2,0.27,0.2,0.27,0.03,'#f2c14e',false); poly(c,[[-0.05,-0.21],[0.05,-0.21],[0,-0.14]],P.top); c.fillStyle = '#c9302c'; c.fillRect(-0.15,0.0,0.3,0.03); }
  else if(isSkirt){ poly(c,[[-0.13,-0.21],[0.13,-0.21],[0.12,-0.02],[-0.12,-0.02]],P.top); poly(c,[[-0.12,-0.04],[0.12,-0.04],[0.22,0.22],[-0.22,0.22]],botc); }
  else { poly(c,[[-0.14,-0.21],[0.14,-0.21],[0.13,0.08],[-0.13,0.08]],P.top); if(P.coat){ poly(c,[[-0.15,-0.21],[0.15,-0.21],[0.16,0.18],[-0.16,0.18]],P.top); ln(c,0,-0.2,0,0.18,0.012,'#cfd8e3',false); }
    if(P.apron){ poly(c,[[-0.1,-0.12],[0.1,-0.12],[0.11,0.12],[-0.11,0.12]],'#f1f1f1',false); }
    if(P.stripe){ c.fillStyle = '#ffd24a'; c.fillRect(-0.135,-0.03,0.27,0.035); c.fillRect(-0.135,0.03,0.27,0.02); }
    if(P.hat==='pcap'){ poly(c,[[-0.02,-0.15],[0.02,-0.15],[0.02,-0.1],[-0.02,-0.1]],'#ffd24a',false); } }
  if(P.scarf){ el(c,0,-0.21,0.12,0.03,P.scarf); }
  if(P.steth){ c.strokeStyle = '#444'; c.lineWidth = 0.012; c.beginPath(); c.arc(0,-0.2,0.07,0.2,2.9); c.stroke(); el(c,0.0,-0.12,0.02,0.02,'#888'); }
  if(P.book){ /* книга в левой руке */ }
  var sl = P.chapan ? P.chapan : (P.top==='#ffffff' ? '#ffffff' : P.top);
  var hr1 = arm(-0.15,armL,sl), hr2 = arm(0.15,armR,sl);
  if(P.book){ poly(c,[[hr1[0]-0.05,hr1[1]-0.05],[hr1[0]+0.05,hr1[1]-0.05],[hr1[0]+0.05,hr1[1]+0.05],[hr1[0]-0.05,hr1[1]+0.05]],'#4c8dff'); }
  if(P.cane){ ln(c,hr2[0]+0.01,hr2[1],hr2[0]+0.02,0.44,0.02,'#7a5a3a'); }
  /* шея и голова */
  ln(c,0,-0.22,0,-0.18,0.07,P.skin,false);
  var hdy = hy + (act==='talk' ? Math.sin(t*14)*0.005 : 0);
  if(P.hs==='bun') el(c,0,hdy-0.15,0.055,0.055,P.hair);
  if(P.hs==='braids'){ ln(c,-0.12,hdy,-0.14,hdy+0.2,0.035,P.hair); ln(c,0.12,hdy,0.14,hdy+0.2,0.035,P.hair); el(c,-0.14,hdy+0.22,0.025,0.025,'#ff6b9a'); el(c,0.14,hdy+0.22,0.025,0.025,'#ff6b9a'); }
  el(c,0,hdy,hr,hr*1.04,P.skin);
  if(P.hs!=='bald'){ el(c,0,hdy-0.045,hr*1.04,hr*0.72,P.hair,false); c.lineWidth = OL; c.strokeStyle = INK; c.beginPath(); c.ellipse(0,hdy-0.045,hr*1.04,hr*0.72,0,3.3,6.1); c.stroke();
    el(c,0,hdy-0.0,hr*0.82,hr*0.6,P.skin,false); }
  if(P.hs==='bald'){ el(c,-0.12,hdy-0.02,0.022,0.045,P.hair); el(c,0.12,hdy-0.02,0.022,0.045,P.hair); }
  if(P.hat==='tubeteika'){ el(c,0,hdy-0.075,hr*1.0,hr*0.62,'#1f3a6b'); c.save(); c.beginPath(); c.ellipse(0,hdy-0.075,hr*1.0,hr*0.62,0,0,6.2832); c.clip(); c.fillStyle = '#f2c14e'; c.fillRect(-hr,hdy-0.07,hr*2,0.022); c.fillStyle = '#c9302c'; c.fillRect(-hr,hdy-0.04,hr*2,0.012); c.restore(); }
  if(P.hat==='saukele'){ poly(c,[[-0.1,hdy-0.07],[0.1,hdy-0.07],[0.05,hdy-0.33],[-0.05,hdy-0.33]],'#c9302c'); poly(c,[[-0.12,hdy-0.04],[0.12,hdy-0.04],[0.1,hdy-0.08],[-0.1,hdy-0.08]],'#f2c14e'); el(c,0,hdy-0.34,0.03,0.03,'#f2c14e'); el(c,0,hdy-0.15,0.022,0.022,'#4cc9ff',false); el(c,-0.045,hdy-0.22,0.015,0.015,'#fff',false); el(c,0.045,hdy-0.22,0.015,0.015,'#fff',false); }
  if(P.hat==='chef'){ el(c,0,hdy-0.14,0.1,0.06,'#fff'); el(c,-0.06,hdy-0.18,0.06,0.05,'#fff'); el(c,0.06,hdy-0.18,0.06,0.05,'#fff'); c.fillStyle = '#fff'; c.fillRect(-0.09,hdy-0.13,0.18,0.07); c.lineWidth = OL; c.strokeStyle = INK; c.strokeRect(-0.09,hdy-0.13,0.18,0.07); }
  if(P.hat==='doccap'){ el(c,0,hdy-0.09,hr*0.95,0.05,'#ffffff'); el(c,0.07,hdy-0.1,0.025,0.025,'#e53935',false); }
  if(P.hat==='fhelmet'){ el(c,0,hdy-0.07,hr*1.1,hr*0.7,'#e53935'); c.fillStyle = '#e53935'; c.fillRect(-hr*1.3,hdy-0.03,hr*2.6,0.03); c.fillStyle = '#ffd24a'; c.fillRect(-0.025,hdy-0.15,0.05,0.04); }
  if(P.hat==='pcap'){ el(c,0,hdy-0.08,hr*1.05,hr*0.55,'#27384f'); c.fillStyle = '#1b2738'; c.fillRect(-hr*0.95,hdy-0.05,hr*1.9,0.03); el(c,0,hdy-0.09,0.02,0.02,'#ffd24a',false); }
  /* лицо */
  var fy = hdy+0.012;
  if(blink(t)){ ln(c,-0.06,fy,-0.03,fy,0.01,INK,false); ln(c,0.03,fy,0.06,fy,0.01,INK,false); }
  else { el(c,-0.045,fy,0.017,0.022,'#2a1c14',false); el(c,0.045,fy,0.017,0.022,'#2a1c14',false); el(c,-0.04,fy-0.008,0.006,0.006,'#fff',false); el(c,0.05,fy-0.008,0.006,0.006,'#fff',false); }
  el(c,-0.075,fy+0.03,0.022,0.014,'rgba(255,120,140,.45)',false); el(c,0.075,fy+0.03,0.022,0.014,'rgba(255,120,140,.45)',false);
  if(P.mus){ el(c,0,fy+0.035,0.05,0.012,P.hair,false); }
  if(act==='talk'){ var o = 0.008+Math.abs(Math.sin(t*12))*0.022; el(c,0,fy+0.05,0.025,o,'#7a1f2a'); }
  else { c.strokeStyle = '#7a3a2a'; c.lineWidth = 0.009; c.lineCap = 'round'; c.beginPath(); c.arc(0,fy+0.035,0.03,0.25,2.9); c.stroke(); }
  if(P.beard){ c.fillStyle = P.beard; c.beginPath(); c.moveTo(-0.08,fy+0.04); c.quadraticCurveTo(0,fy+0.14,0.08,fy+0.04); c.quadraticCurveTo(0,fy+0.06,-0.08,fy+0.04); c.fill(); }
  if(P.glasses){ c.strokeStyle = '#333'; c.lineWidth = 0.009; c.beginPath(); c.arc(-0.045,fy,0.03,0,6.3); c.stroke(); c.beginPath(); c.arc(0.045,fy,0.03,0,6.3); c.stroke(); ln(c,-0.015,fy,0.015,fy,0.008,'#333',false); }
  if(P.hat==='helmet'){ c.fillStyle = 'rgba(190,225,255,.35)'; c.strokeStyle = '#e8eef5'; c.lineWidth = 0.025; c.beginPath(); c.arc(0,hdy,0.17,0,6.3); c.fill(); c.stroke(); c.strokeStyle = INK; c.lineWidth = OL; c.beginPath(); c.arc(0,hdy,0.185,0,6.3); c.stroke(); c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 0.014; c.beginPath(); c.arc(0,hdy,0.13,3.6,4.5); c.stroke(); }
  c.restore();
}

/* ================= интерфейс ================= */
var LIST = [];
Object.keys(BEASTS).forEach(function(k){ LIST.push({id:k,cat:'beasts',n:BEASTS[k].n}); });
Object.keys(PEOPLE).forEach(function(k){ LIST.push({id:k,cat:'people',n:PEOPLE[k].n}); });
function draw(c,id,size,t,act){
  c.save(); c.scale(size,size);
  if(BEASTS[id]){ c.translate(0,0.45); c.scale(1.45,1.45); c.translate(0,-0.45); drawBeast(c,BEASTS[id],t||0,act||'stand'); } else if(PEOPLE[id]) drawPerson(c,PEOPLE[id],t||0,act||'stand');
  c.restore();
}
window.RZC = {isBeast:function(id){ return !!BEASTS[id]; },list:LIST,draw:draw,has:function(id){ return !!(BEASTS[id]||PEOPLE[id]); }};
})();
