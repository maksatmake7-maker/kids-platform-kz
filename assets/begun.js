/* «Беги, мальчик, беги!» — бесконечный бег: за героем гонится сосед с большим животом. */
(function(){
var L = {
ru:{h2:'Беги, мальчик, беги!',lead:'За тобой гонится сосед с большим животом! Прыгай через препятствия и собирай звёзды.',
 how:'Нажми на экран или пробел — прыжок. Золотая звезда — жизнь, синяя — полёт (держи нажатой), зелёная — большой прыжок.',
 who:'Кто бежит?',boy:'Мальчик',dog:'Собачка',start:'Бежать!',over:'Сосед поймал!',score:'Очки',best:'Рекорд',again:'Ещё раз',fly:'Полёт',jump:'Большой прыжок'},
kz:{h2:'Жүгір, бала, жүгір!',lead:'Артыңнан қарны үлкен көрші қуып келеді! Кедергілерден секіріп, жұлдыздарды жина.',
 how:'Экранды бас немесе бос орын — секіру. Алтын жұлдыз — өмір, көк — ұшу (басып тұр), жасыл — үлкен секіру.',
 who:'Кім жүгіреді?',boy:'Бала',dog:'Төбет',start:'Жүгіру!',over:'Көрші ұстап алды!',score:'Ұпай',best:'Рекорд',again:'Тағы бір рет',fly:'Ұшу',jump:'Үлкен секіру'},
en:{h2:'Run, boy, run!',lead:'The neighbour with the big belly is chasing you! Jump over obstacles and collect stars.',
 how:'Tap the screen or press Space to jump. Gold star = life, blue = fly (hold), green = big jump.',
 who:'Who runs?',boy:'Boy',dog:'Doggy',start:'Run!',over:'The neighbour caught you!',score:'Score',best:'Best',again:'Again',fly:'Fly',jump:'Big jump'}
};
function lang(){ var c = document.documentElement.getAttribute('data-current'); if(!c){ try{ c = localStorage.getItem('bilim_lang_v1'); }catch(e){} } if(c==='kz') return 'kz'; if(c==='en'||c==='de'||c==='fr'||c==='zh') return 'en'; return 'ru'; }
function t(k){ var d = L[lang()]; return (d && d[k]!==undefined) ? d[k] : L.ru[k]; }
var W = 960, H = 540, G = 440, root, cv, cx, ov, hero = 'boy', st = null, raf = 0, last = 0, best = 0, AC = null;
try{ best = +localStorage.getItem('begun_best')||0; }catch(e){}
function h(tag,at,kids){ var e = document.createElement(tag); at = at||{}; Object.keys(at).forEach(function(k){ if(k==='class') e.className = at[k]; else if(k.indexOf('on')===0) e[k] = at[k]; else e.setAttribute(k,at[k]); }); (kids||[]).forEach(function(c){ e.appendChild(typeof c==='string' ? document.createTextNode(c) : c); }); return e; }
function tone(f0,f1,d,ty,v){ try{ if(!AC){ var C = window.AudioContext||window.webkitAudioContext; AC = new C(); } if(AC.state==='suspended') AC.resume(); var o = AC.createOscillator(), g = AC.createGain(), n = AC.currentTime; o.type = ty||'sine'; o.frequency.setValueAtTime(f0,n); o.frequency.exponentialRampToValueAtTime(f1,n+d); g.gain.setValueAtTime(v||0.15,n); g.gain.exponentialRampToValueAtTime(0.0001,n+d); o.connect(g); g.connect(AC.destination); o.start(n); o.stop(n+d+0.02); }catch(e){} }
var OB = ['📦','🪵','🚧','🪨','🧺'], SIZEH = {'📦':70,'🪵':60,'🚧':80,'🪨':60,'🧺':64};
function newGame(){
  st = {t:0,x:0,sp:340,y:G,vy:0,air:false,lives:3,inv:0,gap:200,score:0,stars:0,fly:0,sj:0,hold:false,obs:[],pick:[],nextOb:1.2,nextSt:0.8,dead:false,hit:0};
}
function jump(){ if(!st || st.dead) return; if(st.fly>0) return; if(!st.air){ st.vy = st.sj>0 ? -1180 : -880; st.air = true; tone(300,700,0.15,'square',0.1); } }
function frame(now){
  raf = requestAnimationFrame(frame); var dt = Math.min(0.04,(now-last)/1000||0.016); last = now; if(!st) return;
  if(!st.dead && !st.wait) update(dt); draw();
}
function update(dt){
  st.t += dt; st.sp = 340+Math.min(260,st.t*6); st.x += st.sp*dt; st.score += st.sp*dt/60;
  if(st.inv>0) st.inv -= dt; if(st.fly>0) st.fly -= dt; if(st.sj>0) st.sj -= dt; if(st.hit>0) st.hit -= dt;
  st.gap = Math.min(230,st.gap+dt*8);
  if(st.fly>0){ var target = st.hold ? 150 : G-120; st.y += (target-st.y)*Math.min(1,dt*4); st.vy = 0; st.air = true; if(st.fly<=0) st.air = true; }
  else { st.vy += 2600*dt; st.y += st.vy*dt; if(st.y>=G){ st.y = G; st.vy = 0; st.air = false; } }
  st.nextOb -= dt; st.nextSt -= dt;
  if(st.nextOb<=0){ var e = OB[Math.floor(Math.random()*OB.length)]; st.obs.push({e:e,x:W+80,h:SIZEH[e]}); st.nextOb = (0.9+Math.random()*1.0)*(340/st.sp)*1.5; }
  if(st.nextSt<=0){ var r = Math.random(), k = r<0.12 ? 'life' : r<0.26 ? 'fly' : r<0.42 ? 'jump' : 'coin'; st.pick.push({k:k,x:W+60,y:G-80-Math.random()*190}); st.nextSt = 0.5+Math.random()*0.9; }
  st.obs.forEach(function(o){ o.x -= st.sp*dt; }); st.pick.forEach(function(o){ o.x -= st.sp*dt; });
  st.obs = st.obs.filter(function(o){ return o.x>-100; }); st.pick = st.pick.filter(function(o){ return o.x>-60 && !o.got; });
  var px = 300, sz = 170, bx0 = px-26, bx1 = px+26, by0 = st.y-0.46*sz+0.05*sz, by1 = st.y;
  st.pick.forEach(function(o){ if(Math.abs(o.x-px)<48 && o.y>by0-50 && o.y<by1+30){ o.got = true;
    if(o.k==='life'){ st.lives = Math.min(5,st.lives+1); st.gap = Math.min(230,st.gap+60); tone(600,1200,0.25,'sine',0.2); }
    else if(o.k==='fly'){ st.fly = 6; tone(400,1000,0.3,'triangle',0.2); } else if(o.k==='jump'){ st.sj = 9; tone(500,900,0.25,'triangle',0.2); } else { st.stars++; st.score += 5; tone(900,1300,0.1,'sine',0.15); } } });
  if(st.inv<=0 && st.fly<=0){ st.obs.forEach(function(o){ if(o.x>bx0-o.h*0.35 && o.x<bx1+o.h*0.35 && by1>G-o.h+8){ st.lives--; st.inv = 1.4; st.gap -= 70; st.hit = 0.4; st.vy = -500; st.air = true; tone(200,70,0.3,'sawtooth',0.18); } }); }
  if(st.lives<=0 || st.gap<=0) endGame();
}
function endGame(){ st.dead = true; tone(300,60,0.6,'sawtooth',0.2); var sc = Math.floor(st.score); if(sc>best){ best = sc; try{ localStorage.setItem('begun_best',best); }catch(e){} } showOver(sc); }
function ch(id,x,y,s,tm,act,flip){ cx.save(); cx.translate(x,y); if(flip) cx.scale(-1,1); if(window.RZC) RZC.draw(cx,id,s,tm,act); cx.restore(); }
function draw(){
  var g = cx.createLinearGradient(0,0,0,G); g.addColorStop(0,'#7ec8ff'); g.addColorStop(1,'#e6f7ff'); cx.fillStyle = g; cx.fillRect(0,0,W,H);
  var x = st.x; cx.fillStyle = 'rgba(255,255,255,.85)'; for(var i=0;i<4;i++){ var cxp = ((i*330-x*0.1)%1300+1300)%1300-170; cx.beginPath(); cx.arc(cxp,80+i*30,28,0,7); cx.arc(cxp+34,66+i*30,36,0,7); cx.arc(cxp+72,80+i*30,28,0,7); cx.fill(); }
  cx.fillStyle = '#9ccf9a'; cx.beginPath(); cx.moveTo(0,G-20); for(var k=0;k<=W;k+=40) cx.lineTo(k,G-60-Math.sin((k+x*0.3)/130)*40); cx.lineTo(W,G); cx.lineTo(0,G); cx.fill();
  cx.fillStyle = '#6fbf73'; cx.fillRect(0,G,W,H-G); cx.fillStyle = '#5aa85f'; for(var m=0;m<26;m++){ var gx = ((m*60-x)%1560+1560)%1560-60; cx.fillRect(gx,G+16,34,6); cx.fillRect(gx+20,G+50,40,6); }
  st.obs.forEach(function(o){ cx.font = o.h+'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'bottom'; cx.fillText(o.e,o.x,G+10); });
  st.pick.forEach(function(o){ var bob = Math.sin(st.t*5+o.x*0.01)*6, col = {life:'#ffd24a',coin:'#ffd24a',fly:'#4cc9ff',jump:'#2ec27e'}[o.k]; cx.font = '54px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle';
    cx.save(); cx.shadowColor = col; cx.shadowBlur = 18; cx.fillText(o.k==='life'?'❤️':'⭐',o.x,o.y+bob); cx.restore(); if(o.k==='fly'||o.k==='jump'){ cx.fillStyle = col; cx.globalAlpha = 0.55; cx.beginPath(); cx.arc(o.x,o.y+bob,30,0,7); cx.fill(); cx.globalAlpha = 1; cx.fillText('⭐',o.x,o.y+bob); } });
  /* сосед */
  var nx = 300-st.gap-40, ns = 215, ny = G-0.46*ns+4, tm = st.t*1.3;
  cx.fillStyle = 'rgba(0,0,0,.2)'; cx.beginPath(); cx.ellipse(nx,G+6,70,10,0,0,7); cx.fill();
  cx.save(); cx.translate(nx,ny+Math.abs(Math.sin(tm*9))*-5); if(window.RZC) RZC.draw(cx,'man',ns,tm,'walk');
  cx.fillStyle = '#2ec27e'; cx.strokeStyle = '#3b2a1c'; cx.lineWidth = 4; cx.beginPath(); cx.ellipse(ns*0.1,ns*0.04,ns*0.27,ns*0.2,0,0,7); cx.fill(); cx.stroke(); cx.fillStyle = '#1f8a58'; cx.beginPath(); cx.arc(ns*0.14,ns*0.06,4,0,7); cx.fill(); cx.restore();
  cx.font = '36px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; cx.textAlign = 'center'; cx.fillText('💢',nx+60,ny-ns*0.42+Math.sin(st.t*10)*4);
  /* герой */
  var sz = hero==='dog' ? 190 : 170, py = st.y-0.46*sz, blink = st.inv>0 && Math.floor(st.t*14)%2===0;
  cx.fillStyle = 'rgba(0,0,0,'+(0.22*Math.max(0.3,1-(G-st.y)/300))+')'; cx.beginPath(); cx.ellipse(300,G+6,50,9,0,0,7); cx.fill();
  if(!blink){ cx.save(); if(st.fly>0){ cx.fillStyle = 'rgba(255,255,255,.9)'; var wf = Math.sin(st.t*18)*14; cx.beginPath(); cx.ellipse(262,py-10,46,16+wf,-0.5,0,7); cx.ellipse(338,py-10,46,16-wf,0.5,0,7); cx.fill(); }
    ch(hero,300,py,sz,st.t,st.air ? (hero==='dog'?'walk':'jump') : 'walk', false); cx.restore(); }
  /* HUD */
  cx.font = '800 30px "Baloo 2",sans-serif'; cx.textAlign = 'left'; cx.textBaseline = 'top'; cx.fillStyle = '#1D3557'; cx.fillText('⭐ '+Math.floor(st.score)+'   '+t('best')+': '+Math.max(best,Math.floor(st.score)),20,16);
  cx.textAlign = 'right'; cx.fillText('❤️'.repeat(Math.max(0,st.lives)),W-20,16);
  if(st.fly>0||st.sj>0){ cx.textAlign = 'center'; cx.fillStyle = st.fly>0?'#0a7bb5':'#1f8a58'; cx.fillText((st.fly>0?'🪽 '+t('fly')+' ':'🦘 '+t('jump')+' ')+Math.ceil(Math.max(st.fly,st.sj)),W/2,60); }
}
function showOver(sc){ ov.innerHTML = ''; ov.style.display = 'flex'; ov.appendChild(h('h3',{},['😱 '+t('over')])); ov.appendChild(h('p',{},[t('score')+': '+sc+'   '+t('best')+': '+best])); ov.appendChild(h('button',{class:'bg-btn go',onclick:begin},['🏃 '+t('again')])); }
function showStart(){
  ov.innerHTML = ''; ov.style.display = 'flex'; if(!st) newGame(); st.wait = true;
  ov.appendChild(h('h3',{},['🏃 '+t('h2')])); ov.appendChild(h('p',{},[t('how')])); ov.appendChild(h('p',{},[t('who')]));
  var r = h('div',{class:'bg-row'}); ['boy','dog'].forEach(function(k){ r.appendChild(h('button',{class:'bg-btn'+(hero===k?' on':''),onclick:function(){ hero = k; showStart(); }},[(k==='boy'?'🧒 ':'🐶 ')+t(k)])); }); ov.appendChild(r);
  ov.appendChild(h('button',{class:'bg-btn go',onclick:begin},['🏃 '+t('start')]));
}
function begin(){ newGame(); ov.style.display = 'none'; try{ tone(500,500,0.01,'sine',0.001); }catch(e){} }
function init(){
  root = document.getElementById('bg-app'); if(!root) return;
  var hh = document.getElementById('bg-h2'), ld = document.getElementById('bg-lead'); function titles(){ if(hh) hh.textContent = '🏃 '+t('h2'); if(ld) ld.textContent = t('lead'); } titles();
  var wrap = h('div',{class:'bg-wrap'}); cv = h('canvas',{width:W,height:H}); cx = cv.getContext('2d'); ov = h('div',{class:'bg-ov'}); wrap.appendChild(cv); wrap.appendChild(ov); root.appendChild(wrap);
  wrap.addEventListener('pointerdown',function(e){ if(e.target.closest && e.target.closest('button')) return; e.preventDefault(); if(st){ st.hold = true; jump(); } });
  window.addEventListener('pointerup',function(){ if(st) st.hold = false; });
  window.addEventListener('keydown',function(e){ if(e.code==='Space'||e.code==='ArrowUp'){ e.preventDefault(); if(st){ st.hold = true; jump(); } } });
  window.addEventListener('keyup',function(){ if(st) st.hold = false; });
  newGame(); showStart(); raf = requestAnimationFrame(frame);
  var ll = lang(); setInterval(function(){ if(lang()!==ll){ ll = lang(); titles(); if(!st || st.wait) showStart(); } },700);
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
