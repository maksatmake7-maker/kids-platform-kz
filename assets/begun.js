/* «Поймай, если сможешь» — бесконечный бег в псевдо-3D: 3 дорожки, свайпы, сосед с большим животом гонится сзади. */
(function(){
var L = {
ru:{h2:'Поймай, если сможешь',lead:'Сосед с большим животом гонится за тобой по улицам Казахстана! Меняй дорожки, прыгай, кувыркайся и собирай монеты.',
 how:'Свайп (или стрелки): влево и вправо — дорожка, вверх — прыжок, вниз — кувырок. Заборы — прыгай, низкие перекладины — кувыркайся, машины — объезжай.',
 who:'Кто бежит?',boy:'Мальчик',dog:'Собачка',start:'Бежать!',over:'Сосед поймал!',score:'Очки',best:'Рекорд',again:'Ещё раз',coins:'Монеты',
 say:['Стой, шалун!','Всё равно догоню!','Отдай арбуз!','Куда побежал?!']},
kz:{h2:'Қуып жетіп көр',lead:'Қарны үлкен көрші сені Қазақстан көшелерімен қуып келеді! Жолақты ауыстыр, секір, домала және тиын жина.',
 how:'Сырғыт (немесе көрсеткілер): солға-оңға — жолақ, жоғары — секіру, төмен — домалау. Қоршауға — секір, төменгі кедергіге — домала, көлікті — айналып өт.',
 who:'Кім жүгіреді?',boy:'Бала',dog:'Төбет',start:'Жүгіру!',over:'Көрші ұстап алды!',score:'Ұпай',best:'Рекорд',again:'Тағы бір рет',coins:'Тиын',
 say:['Тоқта, бұзық!','Бәрібір қуып жетемін!','Қарбызымды қайтар!','Қайда қаштың?!']},
en:{h2:'Catch me if you can',lead:'The neighbour with the big belly is chasing you through the streets of Kazakhstan! Switch lanes, jump, roll and collect coins.',
 how:'Swipe (or arrow keys): left/right = lane, up = jump, down = roll. Jump fences, roll under low bars, dodge cars.',
 who:'Who runs?',boy:'Boy',dog:'Doggy',start:'Run!',over:'The neighbour caught you!',score:'Score',best:'Best',again:'Again',coins:'Coins',
 say:['Stop, rascal!','I will catch you!','Give back my melon!','Where are you going?!']}
};
function lang(){ var c = document.documentElement.getAttribute('data-current'); if(!c){ try{ c = localStorage.getItem('bilim_lang_v1'); }catch(e){} } if(c==='kz') return 'kz'; if(c==='en'||c==='de'||c==='fr'||c==='zh') return 'en'; return 'ru'; }
function t(k){ var d = L[lang()]; return (d && d[k]!==undefined) ? d[k] : L.ru[k]; }
var W=960,H=540,HZ=165,YB=530,F=12,LW=205,H0=6,GAP0=3.2;
var root,cv,cx,ov,st,raf,last=0,hero='boy',best=0,AC;
try{ best = +localStorage.getItem('begun_best')||0; }catch(e){}
function h(tag,at,kids){ var e = document.createElement(tag); at = at||{}; Object.keys(at).forEach(function(k){ if(k==='class') e.className = at[k]; else if(k.indexOf('on')===0) e[k] = at[k]; else e.setAttribute(k,at[k]); }); (kids||[]).forEach(function(c){ e.appendChild(typeof c==='string' ? document.createTextNode(c) : c); }); return e; }
function tone(f0,f1,d,ty,v){ try{ if(!AC){ var C = window.AudioContext||window.webkitAudioContext; AC = new C(); } if(AC.state==='suspended') AC.resume(); var o = AC.createOscillator(), g = AC.createGain(), n = AC.currentTime; o.type = ty||'sine'; o.frequency.setValueAtTime(f0,n); o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),n+d); g.gain.setValueAtTime(v||0.12,n); g.gain.exponentialRampToValueAtTime(0.0001,n+d); o.connect(g); g.connect(AC.destination); o.start(n); o.stop(n+d+0.02); }catch(e){} }
function sc(d){ return F/(F+d); }
function gy(d){ return HZ+(YB-HZ)*sc(d); }
function lx(l,s){ return W/2+l*LW*s; }
function rnd(a,b){ return a+Math.random()*(b-a); }
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }

/* ---------- состояние ---------- */
function newGame(){
  st = {t:0,v:15,dist:0,coins:0,lane:0,lx:0,y:0,vy:0,air:false,slide:0,stum:0,inv:0,gap:GAP0,shake:0,dead:false,wait:false,
    obs:[],cns:[],sc:[],parts:[],spawnZ:22,scZ:6,sayT:0,sayI:0,flash:0};
  for(var z=6;z<80;z+=rnd(5,8)) addScenery(z);
  st.scZ = 80;
}
function addScenery(z){
  [-1,1].forEach(function(side){ if(Math.random()<0.8) st.sc.push({d:z+rnd(0,3),side:side,off:rnd(60,230),k:pick(['tree','tree','house','yurt','lamp','house','tree','board'])}); });
}
function addCoins(d,lane,n,y,step){ for(var i=0;i<n;i++) st.cns.push({d:d+i*(step||1.15),lane:lane,y:y,got:false}); }
function spawnRow(z){
  var r = Math.random(), lanes=[-1,0,1], free = pick(lanes), i;
  if(r<0.24){ lanes.forEach(function(l){ if(l!==free && Math.random()<0.8) st.obs.push({k:pick(['fence','barrel']),d:z,len:1,lane:l}); }); addCoins(z-1,free,6,40); }
  else if(r<0.42){ lanes.forEach(function(l){ st.obs.push({k:'fence',d:z,len:1,lane:l}); }); addCoins(z-1.2,0,5,115,0.55); }
  else if(r<0.58){ lanes.forEach(function(l){ st.obs.push({k:'bar',d:z,len:1,lane:l}); }); addCoins(z-1,free,5,30); }
  else if(r<0.82){ lanes.forEach(function(l){ if(l!==free) st.obs.push({k:'car',d:z,len:4,lane:l,c:pick(['#e63946','#4c8dff','#ffb703','#2ec27e'])}); }); addCoins(z,free,7,40); }
  else { st.obs.push({k:'barrel',d:z,len:1,lane:-1}); st.obs.push({k:'barrel',d:z,len:1,lane:1}); st.obs.push({k:'fence',d:z+2.2,len:1,lane:0}); addCoins(z-1,0,3,40); addCoins(z+4,free===0?1:free,4,40); }
}
function part(x,y,c,n,sp,up){ for(var i=0;i<n;i++) st.parts.push({x:x,y:y,vx:rnd(-sp,sp),vy:rnd(-sp*(up||1),-sp*0.2),life:rnd(0.3,0.7),c:c,r:rnd(2,5)}); }

/* ---------- логика ---------- */
function move(dir){ if(!st||st.dead||st.wait) return; var nl = Math.max(-1,Math.min(1,st.lane+dir)); if(nl!==st.lane){ st.lane = nl; tone(500,260,0.12,'triangle',0.08); } }
function jump(){ if(!st||st.dead||st.wait) return; if(!st.air){ st.vy = 950; st.air = true; st.slide = 0; tone(300,760,0.16,'square',0.08); part(lx(st.lx,sc(H0)),gy(H0),'#e8dcc0',8,120,1); } }
function roll(){ if(!st||st.dead||st.wait) return; if(st.air){ st.vy = Math.min(st.vy,-700); return; } if(st.slide<=0){ st.slide = 0.7; tone(700,200,0.25,'sawtooth',0.05); } }
function update(dt){
  if(st.wait){ st.t += dt; return; }
  st.t += dt; st.v = Math.min(32,15+st.t*0.16); var mv = st.v*dt; st.dist += mv;
  st.lx += (st.lane-st.lx)*Math.min(1,dt*13);
  if(st.air){ st.y += st.vy*dt; st.vy -= 2700*dt; if(st.y<=0){ st.y = 0; st.vy = 0; st.air = false; part(lx(st.lx,sc(H0)),gy(H0),'#e8dcc0',7,110,1); } }
  if(st.slide>0) st.slide -= dt; if(st.stum>0) st.stum -= dt; if(st.inv>0) st.inv -= dt; if(st.shake>0) st.shake -= dt; if(st.flash>0) st.flash -= dt;
  st.obs.forEach(function(o){ o.d -= mv; }); st.cns.forEach(function(c){ c.d -= mv; }); st.sc.forEach(function(s){ s.d -= mv; });
  st.spawnZ -= mv; st.scZ -= mv;
  while(st.spawnZ<70){ var z = st.spawnZ+rnd(10,14)*(1+st.v/60); spawnRow(Math.max(z,70)); st.spawnZ = Math.max(z,70); }
  while(st.scZ<80){ addScenery(80); st.scZ += rnd(5,8); }
  st.obs = st.obs.filter(function(o){ return o.d+o.len>-6; }); st.cns = st.cns.filter(function(c){ return c.d>-4 && !c.got; }); st.sc = st.sc.filter(function(s){ return s.d>-5; });
  /* столкновения */
  var hl = st.lx;
  st.obs.forEach(function(o){
    if(o.hit || o.d>H0+0.45 || o.d+o.len<H0-0.45 || Math.abs(o.lane-hl)>0.62) return;
    var bad = false;
    if(o.k==='fence'||o.k==='barrel') bad = st.y<(o.k==='fence'?62:75);
    else if(o.k==='bar') bad = st.slide<=0;
    else if(o.k==='car') bad = st.y<150;
    if(bad && st.inv<=0){ o.hit = true; st.stum = 0.55; st.inv = 1.3; st.gap -= 1.15; st.shake = 0.35; st.flash = 0.15; tone(160,50,0.35,'sawtooth',0.2); part(lx(st.lx,sc(H0)),gy(H0)-60*sc(H0),'#ffd24a',14,260,1); }
  });
  st.cns.forEach(function(c){ if(!c.got && Math.abs(c.d-H0)<0.7 && Math.abs(c.lane-hl)<0.6 && Math.abs(c.y-(st.y+55))<85){ c.got = true; st.coins++; tone(900+Math.min(st.coins,20)*25,1500,0.12,'sine',0.1); var s=sc(c.d); part(lx(c.lane,s),gy(c.d)-c.y*s,'#ffe066',8,170,1); } });
  /* сосед */
  st.gap += (st.stum>0?0:0.16)*dt; if(st.gap>GAP0) st.gap = GAP0;
  if(st.gap<0.55){ endGame(); return; }
  st.sayT -= dt; if(st.sayT<=-2.4){ st.sayT = 2.8; st.sayI = (st.sayI+1)%4; }
  /* частицы */
  st.parts.forEach(function(p){ p.x += p.vx*dt; p.y += p.vy*dt; p.vy += 600*dt; p.life -= dt; }); st.parts = st.parts.filter(function(p){ return p.life>0; });
  if(!st.air && Math.random()<0.5) part(lx(st.lx,sc(H0)),gy(H0),'rgba(230,220,190,.8)',1,50,0.5);
}
function endGame(){ st.dead = true; tone(300,50,0.7,'sawtooth',0.22); var s = score(); if(s>best){ best = s; try{ localStorage.setItem('begun_best',best); }catch(e){} } setTimeout(showOver,450); }
function score(){ return Math.floor(st.dist/3)+st.coins*10; }

/* ---------- рисование: фигуры ---------- */
function rr(c,x,y,w,h,r){ c.beginPath(); c.moveTo(x+r,y); c.arcTo(x+w,y,x+w,y+h,r); c.arcTo(x+w,y+h,x,y+h,r); c.arcTo(x,y+h,x,y,r); c.arcTo(x,y,x+w,y,r); c.closePath(); }
function limb(c,x0,y0,x1,y1,w,col){ c.strokeStyle = col; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(x0,y0); c.lineTo(x1,y1); c.stroke(); }
function drawBoy(c,tm,air,slide){
  var ph = Math.sin(tm*14), a = air?0:1;
  var l1 = air?-22:-Math.max(0,ph)*24, l2 = air?-14:-Math.max(0,-ph)*24;
  limb(c,-13,-60,-15,-8+l1,15,'#2f4d8a'); limb(c,13,-60,15,-8+l2,15,'#2f4d8a');
  c.fillStyle = '#fff'; c.beginPath(); c.ellipse(-15,-5+l1,10,6,0,0,7); c.ellipse(15,-5+l2,10,6,0,0,7); c.fill();
  limb(c,-28,-108,-34,-84+(air?-30:ph*20),11,'#e8a98a'); limb(c,28,-108,34,-84+(air?-30:-ph*20),11,'#e8a98a');
  c.fillStyle = '#e63946'; rr(c,-27,-118,54,62,14); c.fill();
  c.fillStyle = '#ffb703'; rr(c,-19,-112,38,42,8); c.fill(); c.fillStyle = '#e09a00'; c.fillRect(-19,-92,38,4); c.fillRect(-2,-112,4,42);
  c.fillStyle = '#e8a98a'; c.beginPath(); c.arc(0,-134,19,0,7); c.fill();
  c.fillStyle = '#3a2a1c'; c.beginPath(); c.arc(0,-136,19,0.1,Math.PI-0.1,true); c.fill(); c.beginPath(); c.arc(0,-134,19,0.2,Math.PI-0.2); c.fill();
  c.fillStyle = '#4c8dff'; c.beginPath(); c.arc(0,-140,20,Math.PI,0); c.fill(); c.fillRect(-20,-141,40,5); c.fillStyle = '#e8a98a'; c.beginPath(); c.arc(-20,-132,5,0,7); c.arc(20,-132,5,0,7); c.fill();
}
function drawDog(c,tm,air){
  var ph = Math.sin(tm*16), w = Math.sin(tm*22)*14;
  var l1 = air?-18:-Math.max(0,ph)*16, l2 = air?-18:-Math.max(0,-ph)*16;
  limb(c,-16,-34,-18,-6+l1,13,'#a8692c'); limb(c,16,-34,18,-6+l2,13,'#a8692c');
  c.fillStyle = '#f2dcb4'; c.beginPath(); c.ellipse(-18,-4+l1,9,5,0,0,7); c.ellipse(18,-4+l2,9,5,0,0,7); c.fill();
  limb(c,0,-52,w,-100,9,'#8d5624'); c.fillStyle = '#f2dcb4'; c.beginPath(); c.arc(w,-102,7,0,7); c.fill();
  c.fillStyle = '#cb8d4b'; c.beginPath(); c.ellipse(0,-52,36,30,0,0,7); c.fill();
  c.fillStyle = '#b87a38'; c.beginPath(); c.ellipse(0,-44,22,16,0,0,7); c.fill();
  c.fillStyle = '#cb8d4b'; c.beginPath(); c.arc(0,-90,21,0,7); c.fill();
  c.fillStyle = '#8d5624'; c.beginPath(); c.ellipse(-22,-92,8,15,0.3,0,7); c.ellipse(22,-92,8,15,-0.3,0,7); c.fill();
  c.fillStyle = '#e63946'; rr(c,-14,-74,28,7,3); c.fill();
}
function drawNeighbor(c,tm){
  var ph = Math.sin(tm*12);
  limb(c,-20,-66,-24,-10-Math.max(0,ph)*26,22,'#f0be96'); limb(c,20,-66,24,-10-Math.max(0,-ph)*26,22,'#f0be96');
  c.fillStyle = '#5b3a24'; c.beginPath(); c.ellipse(-26,-8-Math.max(0,ph)*26,16,7,0,0,7); c.ellipse(26,-8-Math.max(0,-ph)*26,16,7,0,0,7); c.fill();
  c.fillStyle = '#7a5a3a'; rr(c,-46,-92,92,40,12); c.fill();
  limb(c,-62,-116,-74,-146+ph*14,17,'#f0be96'); limb(c,62,-116,74,-146-ph*14,17,'#f0be96');
  c.fillStyle = '#f0be96'; c.beginPath(); c.arc(-74,-150+ph*14,12,0,7); c.arc(74,-150-ph*14,12,0,7); c.fill();
  c.fillStyle = '#f4f4f4'; c.beginPath(); c.ellipse(0,-108,66,50,0,0,7); c.fill(); c.strokeStyle = '#d8d8d8'; c.lineWidth = 3; c.beginPath(); c.moveTo(0,-150); c.lineTo(0,-62); c.stroke();
  c.fillStyle = '#f0be96'; c.beginPath(); c.arc(-34,-146,14,0,7); c.arc(34,-146,14,0,7); c.fill();
  c.fillStyle = '#e8a98a'; c.fillRect(-14,-166,28,22);
  c.fillStyle = '#f0be96'; c.beginPath(); c.arc(0,-182,27,0,7); c.fill(); c.beginPath(); c.arc(-27,-180,7,0,7); c.arc(27,-180,7,0,7); c.fill();
  c.fillStyle = '#fff'; c.globalAlpha = 0.45; c.beginPath(); c.ellipse(-8,-194,9,5,-0.5,0,7); c.fill(); c.globalAlpha = 1;
  c.strokeStyle = '#2b2118'; c.lineWidth = 4; c.beginPath(); c.arc(0,-180,28,Math.PI*0.15,Math.PI*0.85); c.stroke();
  c.fillStyle = '#7ec8ff'; c.beginPath(); c.ellipse(36,-196-((tm*60)%24),4,6,0,0,7); c.fill();
}
function hrz(d,key){ return d+key; }

/* ---------- рисование: мир ---------- */
function box(d,len,lane,w,hh,front,top,side){
  var s0 = sc(d), s1 = sc(d+len), x0 = lx(lane,s0), x1 = lx(lane,s1), y0 = gy(d), y1 = gy(d+len), hw0 = w/2*s0, hw1 = w/2*s1;
  cx.fillStyle = top; cx.beginPath(); cx.moveTo(x0-hw0,y0-hh*s0); cx.lineTo(x0+hw0,y0-hh*s0); cx.lineTo(x1+hw1,y1-hh*s1); cx.lineTo(x1-hw1,y1-hh*s1); cx.fill();
  var sg = lane<0?1:(lane>0?-1:0);
  if(sg){ cx.fillStyle = side; cx.beginPath(); cx.moveTo(x0+sg*hw0,y0-hh*s0); cx.lineTo(x0+sg*hw0,y0); cx.lineTo(x1+sg*hw1,y1); cx.lineTo(x1+sg*hw1,y1-hh*s1); cx.fill(); }
  cx.fillStyle = front; cx.fillRect(x0-hw0,y0-hh*s0,hw0*2,hh*s0);
  return {x:x0,y:y0,s:s0,hw:hw0,hh:hh*s0};
}
function drawObs(o){
  var s = sc(o.d), x = lx(o.lane,s), y = gy(o.d), b, c = cx;
  if(o.hit) c.globalAlpha = 0.5;
  if(o.k==='fence'){ b = box(o.d,0.5,o.lane,170,62,'#c98b4a','#e6b06f','#a06a32'); c.fillStyle = '#a06a32'; for(var i=0;i<4;i++) c.fillRect(b.x-b.hw+b.hw*0.5*i,b.y-b.hh,b.hw*0.12,b.hh); c.fillRect(b.x-b.hw,b.y-b.hh*0.72,b.hw*2,b.hh*0.16); c.fillRect(b.x-b.hw,b.y-b.hh*0.28,b.hw*2,b.hh*0.16); }
  else if(o.k==='barrel'){ b = box(o.d,0.5,o.lane,64,78,'#2f80d1','#6bb1f0','#1f60a8'); c.fillStyle = '#e8eef8'; c.fillRect(b.x-b.hw,b.y-b.hh*0.62,b.hw*2,b.hh*0.12); c.fillRect(b.x-b.hw,b.y-b.hh*0.28,b.hw*2,b.hh*0.12); }
  else if(o.k==='bar'){ var h1 = 150*s, pw = 12*s; c.fillStyle = '#6d7480'; c.fillRect(x-85*s,y-h1,pw,h1); c.fillRect(x+85*s-pw,y-h1,pw,h1);
    c.fillStyle = '#ffb703'; c.fillRect(x-85*s,y-h1,170*s,34*s); c.fillStyle = '#1d1d1d'; for(var j=0;j<6;j++){ c.beginPath(); c.moveTo(x-85*s+j*28*s,y-h1); c.lineTo(x-85*s+j*28*s+14*s,y-h1); c.lineTo(x-85*s+j*28*s+2*s,y-h1+34*s); c.lineTo(x-85*s+j*28*s-12*s,y-h1+34*s); c.fill(); } }
  else if(o.k==='car'){ b = box(o.d,o.len,o.lane,170,100,o.c,'#f2f2f2','#00000044'); var w2 = b.hw*2; c.fillStyle = '#b8e4ff'; c.fillRect(b.x-b.hw*0.78,b.y-b.hh*0.92,w2*0.78,b.hh*0.42);
    c.fillStyle = '#111'; c.fillRect(b.x-b.hw*0.9,b.y-b.hh*0.2,b.hw*0.4,b.hh*0.2); c.fillRect(b.x+b.hw*0.5,b.y-b.hh*0.2,b.hw*0.4,b.hh*0.2);
    c.fillStyle = '#fff3b0'; c.beginPath(); c.arc(b.x-b.hw*0.7,b.y-b.hh*0.32,b.hw*0.09,0,7); c.arc(b.x+b.hw*0.7,b.y-b.hh*0.32,b.hw*0.09,0,7); c.fill(); }
  c.globalAlpha = 1;
}
function drawCoin(co){
  var s = sc(co.d), x = lx(co.lane,s), y = gy(co.d)-co.y*s, r = 20*s, w = Math.abs(Math.cos(st.t*6+co.d))*r+r*0.18;
  cx.save(); cx.shadowColor = '#ffd24a'; cx.shadowBlur = 12*s; cx.fillStyle = '#ffc928'; cx.beginPath(); cx.ellipse(x,y,w,r,0,0,7); cx.fill(); cx.restore();
  cx.fillStyle = '#ffe680'; cx.beginPath(); cx.ellipse(x,y,w*0.62,r*0.72,0,0,7); cx.fill();
  cx.fillStyle = '#fff'; cx.globalAlpha = 0.7; cx.beginPath(); cx.ellipse(x-w*0.25,y-r*0.3,w*0.14,r*0.2,0,0,7); cx.fill(); cx.globalAlpha = 1;
}
function drawScn(o){
  var s = sc(o.d), x = W/2+o.side*(LW*1.62+o.off)*s, y = gy(o.d), c = cx; if(s<0.14) return;
  if(o.k==='tree'){ c.fillStyle = '#7a4b22'; c.fillRect(x-7*s,y-80*s,14*s,80*s); c.fillStyle = '#2f9e44'; c.beginPath(); c.arc(x,y-110*s,42*s,0,7); c.arc(x-26*s,y-84*s,30*s,0,7); c.arc(x+26*s,y-84*s,30*s,0,7); c.fill(); c.fillStyle = '#51b85c'; c.beginPath(); c.arc(x-10*s,y-122*s,24*s,0,7); c.fill(); }
  else if(o.k==='house'){ var hc = ['#f4d9b0','#e8c1a0','#cfe3f0','#f2e4a8'][Math.floor(o.off)%4]; c.fillStyle = hc; c.fillRect(x-70*s,y-110*s,140*s,110*s); c.fillStyle = '#c0504d'; c.beginPath(); c.moveTo(x-82*s,y-110*s); c.lineTo(x,y-170*s); c.lineTo(x+82*s,y-110*s); c.fill(); c.fillStyle = '#7ec8ff'; c.fillRect(x-48*s,y-84*s,30*s,30*s); c.fillRect(x+18*s,y-84*s,30*s,30*s); c.fillStyle = '#7a4b22'; c.fillRect(x-14*s,y-52*s,28*s,52*s); }
  else if(o.k==='yurt'){ c.fillStyle = '#f6f1e4'; c.fillRect(x-62*s,y-62*s,124*s,62*s); c.beginPath(); c.moveTo(x-72*s,y-62*s); c.quadraticCurveTo(x,y-170*s,x+72*s,y-62*s); c.fill(); c.strokeStyle = '#2f80d1'; c.lineWidth = 6*s; c.beginPath(); c.moveTo(x-62*s,y-46*s); c.lineTo(x+62*s,y-46*s); c.stroke(); c.fillStyle = '#c0504d'; c.fillRect(x-16*s,y-46*s,32*s,46*s); c.strokeStyle = '#2f80d1'; c.beginPath(); c.arc(x,y-112*s,10*s,0,7); c.stroke(); }
  else if(o.k==='lamp'){ c.fillStyle = '#5a6270'; c.fillRect(x-4*s,y-150*s,8*s,150*s); c.fillRect(x-4*s,y-150*s,34*s*(-o.side),8*s); c.fillStyle = '#fff3b0'; c.beginPath(); c.arc(x-o.side*30*s,y-146*s,9*s,0,7); c.fill(); }
  else { c.fillStyle = '#5a6270'; c.fillRect(x-4*s,y-120*s,8*s,120*s); c.fillStyle = '#2f80d1'; rr(c,x-52*s,y-170*s,104*s,56*s,6*s); c.fill(); c.fillStyle = '#fff'; c.font = '800 '+Math.max(8,22*s)+'px Nunito,sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('★ ★ ★',x,y-142*s); }
}
function drawBg(){
  var c = cx, g = c.createLinearGradient(0,0,0,HZ+10); g.addColorStop(0,'#59b6f5'); g.addColorStop(1,'#d9f1ff'); c.fillStyle = g; c.fillRect(0,0,W,HZ+10);
  c.fillStyle = '#fff6b0'; c.beginPath(); c.arc(760,70,34,0,7); c.fill(); c.globalAlpha = 0.35; c.beginPath(); c.arc(760,70,52,0,7); c.fill(); c.globalAlpha = 1;
  c.fillStyle = 'rgba(255,255,255,.9)'; for(var i=0;i<5;i++){ var cxp = ((i*260+st.t*14)%1300)-170, cy = 40+(i%3)*28; c.beginPath(); c.arc(cxp,cy,22,0,7); c.arc(cxp+28,cy-10,28,0,7); c.arc(cxp+58,cy,22,0,7); c.fill(); }
  c.fillStyle = '#9fb4d6'; c.beginPath(); c.moveTo(0,HZ); [[0,95],[110,60],[210,110],[330,50],[470,108],[600,62],[720,112],[850,58],[960,100]].forEach(function(p){ c.lineTo(p[0],p[1]+25); }); c.lineTo(W,HZ); c.fill();
  c.fillStyle = '#fff'; [[110,60],[330,50],[600,62],[850,58]].forEach(function(p){ c.beginPath(); c.moveTo(p[0]-22,p[1]+46); c.lineTo(p[0],p[1]+25); c.lineTo(p[0]+22,p[1]+46); c.lineTo(p[0]+8,p[1]+40); c.lineTo(p[0]-4,p[1]+48); c.fill(); });
  c.fillStyle = '#7fbf7a'; c.beginPath(); c.moveTo(0,HZ); for(var k=0;k<=W;k+=40) c.lineTo(k,HZ-14-Math.sin(k/90)*8); c.lineTo(W,HZ); c.fill();
  c.fillStyle = '#78c26b'; c.fillRect(0,HZ-4,W,H);
  /* поверхность по полосам */
  var off = st.dist%6, n = 0;
  for(var d0=-off-6; d0<90; d0+=3, n++){
    var a = Math.max(d0,-3), b = d0+3; if(b<=-3) continue; var ya = gy(Math.max(a,-3)), yb = gy(b), alt = (Math.floor((st.dist-off+d0)/3))%2===0;
    c.fillStyle = alt?'#78c26b':'#6bb85f'; c.fillRect(0,yb,W,ya-yb+1);
    var sa = sc(Math.max(a,-3)), sb = sc(b);
    c.fillStyle = alt?'#6f7684':'#656c7a'; c.beginPath(); c.moveTo(lx(-1.6,sb),yb); c.lineTo(lx(1.6,sb),yb); c.lineTo(lx(1.6,sa),ya); c.lineTo(lx(-1.6,sa),ya); c.fill();
    c.fillStyle = alt?'#e63946':'#fff'; [-1.6,1.6].forEach(function(e){ c.beginPath(); c.moveTo(lx(e,sb),yb); c.lineTo(lx(e*1.08,sb),yb); c.lineTo(lx(e*1.08,sa),ya); c.lineTo(lx(e,sa),ya); c.fill(); });
    if(alt){ c.fillStyle = 'rgba(255,255,255,.7)'; [-0.5,0.5].forEach(function(e){ c.beginPath(); c.moveTo(lx(e,sb)-1.5*sb,yb); c.lineTo(lx(e,sb)+1.5*sb,yb); c.lineTo(lx(e,sa)+3*sa,ya); c.lineTo(lx(e,sa)-3*sa,ya); c.fill(); }); }
  }
}
function drawHeroFigure(){
  var s = sc(H0), x = lx(st.lx,s), y = gy(H0)-st.y*s, c = cx, k = s*1.4;
  c.fillStyle = 'rgba(0,0,0,'+(0.28*Math.max(0.3,1-st.y/260))+')'; c.beginPath(); c.ellipse(x,gy(H0)+2,44*s,9*s,0,0,7); c.fill();
  if(st.inv>0 && Math.floor(st.t*16)%2===0 && st.stum<=0) return;
  c.save(); c.translate(x,y); c.scale(k,k);
  if(st.stum>0) c.rotate(Math.sin(st.t*40)*0.12);
  if(st.slide>0){ c.translate(0,0); c.scale(1.15,0.5); c.translate(0,-4); }
  if(hero==='dog') drawDog(c,st.t,st.air); else drawBoy(c,st.t,st.air,st.slide>0);
  c.restore();
  if(st.flash>0){ c.fillStyle = 'rgba(255,60,60,.25)'; c.fillRect(0,0,W,H); }
}
function drawNeighborFigure(){
  var d = H0-st.gap, s = sc(d), x = lx(st.lx*0.9,s), y = gy(d)+6, c = cx, k = s*1.3;
  c.fillStyle = 'rgba(0,0,0,.3)'; c.beginPath(); c.ellipse(x,gy(d)+4,70*k,11*k,0,0,7); c.fill();
  c.save(); c.translate(x,y+Math.abs(Math.sin(st.t*12))*-6*k); c.scale(k,k); drawNeighbor(c,st.t*1.1); c.restore();
  var txt = t('say')[st.sayI]; if(st.sayT>0 && txt){ c.font = '800 '+Math.round(22)+'px Nunito,sans-serif'; var tw = c.measureText(txt).width+26, bx = Math.max(10,Math.min(W-tw-10,x-tw/2)), by = y-215*k-34;
    c.fillStyle = '#fff'; rr(c,bx,by,tw,38,14); c.fill(); c.strokeStyle = '#1D3557'; c.lineWidth = 3; c.stroke(); c.fillStyle = '#1D3557'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(txt,bx+tw/2,by+20); }
}
function draw(){
  var c = cx; c.save(); if(st.shake>0) c.translate(rnd(-6,6)*st.shake*3,rnd(-5,5)*st.shake*3);
  drawBg();
  var list = [];
  st.obs.forEach(function(o){ list.push([o.d+(o.k==='car'?o.len*0.5:0),0,o]); }); st.cns.forEach(function(o){ list.push([o.d,1,o]); }); st.sc.forEach(function(o){ list.push([o.d,2,o]); });
  list.push([H0,3,null]); list.push([H0+0.01,4,null]);
  list.sort(function(a,b){ return b[0]-a[0]; });
  list.forEach(function(it){ if(it[0]>85) return; if(it[1]<3 && (it[1]===2? it[0]<-1 : (it[1]===1? it[0]<0.4 : it[2].d+it[2].len<0.4))) return; if(it[1]===0) drawObs(it[2]); else if(it[1]===1) drawCoin(it[2]); else if(it[1]===2) drawScn(it[2]); else if(it[1]===3) drawHeroFigure(); else drawNeighborFigure(); });
  st.parts.forEach(function(p){ c.globalAlpha = Math.max(0,Math.min(1,p.life*2)); c.fillStyle = p.c; c.beginPath(); c.arc(p.x,p.y,p.r,0,7); c.fill(); }); c.globalAlpha = 1;
  /* линии скорости */
  c.strokeStyle = 'rgba(255,255,255,'+Math.min(0.35,(st.v-15)/40)+')'; c.lineWidth = 2; for(var i=0;i<14;i++){ var a = (i*0.449+0.1)%1, r0 = 140+((st.t*(260+st.v*10)+i*97)%520); var dx = (a-0.5)*2; c.beginPath(); c.moveTo(W/2+dx*r0*1.2,HZ+80+Math.abs(dx)*30+r0*0.5); c.lineTo(W/2+dx*(r0+60)*1.25,HZ+80+Math.abs(dx)*30+(r0+60)*0.55); c.stroke(); }
  c.restore();
  /* HUD */
  c.font = '800 30px "Baloo 2",sans-serif'; c.textAlign = 'left'; c.textBaseline = 'top'; c.lineWidth = 5; c.strokeStyle = 'rgba(29,53,87,.9)'; c.fillStyle = '#fff';
  var l1 = '⭐ '+score(), l2 = '🪙 '+st.coins; c.strokeText(l1,18,14); c.fillText(l1,18,14); c.strokeText(l2,18,52); c.fillText(l2,18,52);
  c.textAlign = 'right'; var l3 = t('best')+': '+Math.max(best,score()); c.strokeText(l3,W-18,14); c.fillText(l3,W-18,14);
  /* индикатор близости соседа */
  var f = Math.max(0,Math.min(1,(GAP0-st.gap)/(GAP0-0.55))); c.fillStyle = 'rgba(0,0,0,.35)'; rr(c,W-196,56,178,18,9); c.fill(); c.fillStyle = f>0.6?'#e63946':(f>0.3?'#ffb703':'#2ec27e'); rr(c,W-194,58,Math.max(10,174*(1-f)),14,7); c.fill(); c.font = '18px sans-serif'; c.textAlign = 'right'; c.fillStyle = '#fff'; c.fillText('😡',W-200,56);
}

/* ---------- цикл и интерфейс ---------- */
function frame(now){ raf = requestAnimationFrame(frame); var dt = Math.min(0.05,(now-last)/1000||0); last = now; if(st && !st.dead) update(dt); else if(st){ st.t += dt; st.parts.forEach(function(p){ p.x += p.vx*dt; p.y += p.vy*dt; p.vy += 600*dt; p.life -= dt; }); st.parts = st.parts.filter(function(p){ return p.life>0; }); if(st.shake>0) st.shake -= dt; } if(st) draw(); }
function showOver(){ ov.innerHTML = ''; ov.style.display = 'flex'; ov.appendChild(h('h3',{},['😱 '+t('over')])); ov.appendChild(h('p',{},['⭐ '+t('score')+': '+score()+'   🪙 '+st.coins+'   🏆 '+t('best')+': '+best])); ov.appendChild(h('button',{class:'bg-btn go',onclick:begin},['🏃 '+t('again')])); }
function showStart(){
  ov.innerHTML = ''; ov.style.display = 'flex'; if(!st || !st.wait) { newGame(); st.wait = true; }
  ov.appendChild(h('h3',{},['🏃 '+t('h2')])); ov.appendChild(h('p',{},[t('how')])); ov.appendChild(h('p',{},[t('who')]));
  var r = h('div',{class:'bg-row'}); ['boy','dog'].forEach(function(k){ r.appendChild(h('button',{class:'bg-btn'+(hero===k?' on':''),onclick:function(){ hero = k; showStart(); }},[(k==='boy'?'🧒 ':'🐶 ')+t(k)])); }); ov.appendChild(r);
  ov.appendChild(h('button',{class:'bg-btn go',onclick:begin},['🏃 '+t('start')]));
}
function begin(){ newGame(); ov.style.display = 'none'; tone(500,800,0.1,'sine',0.08); }
function init(){
  root = document.getElementById('bg-app'); if(!root) return;
  var hh = document.getElementById('bg-h2'), ld = document.getElementById('bg-lead'); function titles(){ if(hh) hh.textContent = '🏃 '+t('h2'); if(ld) ld.textContent = t('lead'); document.title = t('h2')+' — Білім Аралы'; } titles();
  var wrap = h('div',{class:'bg-wrap'}); cv = h('canvas',{width:W,height:H}); cx = cv.getContext('2d'); ov = h('div',{class:'bg-ov'}); wrap.appendChild(cv); wrap.appendChild(ov); root.appendChild(wrap);
  var sx=0,sy=0,sid=null,done=false;
  wrap.addEventListener('pointerdown',function(e){ if(e.target.closest && e.target.closest('button')) return; e.preventDefault(); sx = e.clientX; sy = e.clientY; sid = e.pointerId; done = false; });
  wrap.addEventListener('pointermove',function(e){ if(sid!==e.pointerId||done) return; var dx = e.clientX-sx, dy = e.clientY-sy; if(Math.max(Math.abs(dx),Math.abs(dy))<28) return; done = true; if(Math.abs(dx)>Math.abs(dy)) move(dx>0?1:-1); else if(dy<0) jump(); else roll(); });
  window.addEventListener('pointerup',function(e){ if(sid===e.pointerId){ if(!done && st && !st.dead && !st.wait) jump(); sid = null; } });
  window.addEventListener('keydown',function(e){ var k = e.code; if(k==='ArrowLeft'||k==='KeyA'){ e.preventDefault(); move(-1); } else if(k==='ArrowRight'||k==='KeyD'){ e.preventDefault(); move(1); } else if(k==='ArrowUp'||k==='Space'||k==='KeyW'){ e.preventDefault(); jump(); } else if(k==='ArrowDown'||k==='KeyS'){ e.preventDefault(); roll(); } });
  newGame(); showStart(); raf = requestAnimationFrame(frame);
  var ll = lang(); setInterval(function(){ if(lang()!==ll){ ll = lang(); titles(); if(!st || st.wait) showStart(); } },700);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
