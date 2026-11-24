/* Движок уроков «нового формата»: видео-лекция → практика → проверка освоения → отчёт.
   Урок = описание (spec), см. grades/grade-4/russian/lessons/*.js */
(function(){
"use strict";
function $(id){return document.getElementById(id)}
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!==undefined)e.innerHTML=h;return e}
function norm(s){return String(s).toLowerCase().replace(/ё/g,'е').replace(/[^а-я]/g,'')}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function fb(){return el('div','fb')}
function show(f,ok,t){f.className='fb show '+(ok?'ok':'no');f.innerHTML=t}
function hintBlock(h1,h2){
  var w=el('div'),lvl=0,b=el('button','hbtn','💡 Нужна подсказка'),box=el('div','hint');
  b.onclick=function(){lvl++;if(lvl===1){box.innerHTML=h1;box.classList.add('show');b.textContent=h2?'💡 Ещё подсказка':'💡 Подсказка открыта'}else if(lvl===2&&h2){box.innerHTML=h1+'<br><br>'+h2;b.textContent='💡 Все подсказки открыты'}};
  w.appendChild(b);w.appendChild(box);return w;
}
function run(P){
  var S,KEY=P.key;
  function fresh(){var st={};Object.keys(P.skills).forEach(function(k){st[k]=[0,0]});return {stat:st,done:{},final:null,cur:0}}
  try{S=JSON.parse(localStorage.getItem(KEY))}catch(e){}
  if(!S||!S.stat)S=fresh();
  Object.keys(P.skills).forEach(function(k){S.stat[k]=S.stat[k]||[0,0]});S.done=S.done||{};
  function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
  function note(sk,ok){S.stat[sk][1]++;if(ok)S.stat[sk][0]++;save()}
  var defs=[['intro','Разбор',stepIntro]];
  if(P.wizard)defs.push(['wizard',P.wizard.tab||'Шаги',stepWizard]);
  if(P.sort)defs.push(['sort','Сортировка',stepSort]);
  if(P.init)defs.push(['init',P.init.tab||'Впиши',stepInit]);
  if(P.err)defs.push(['err','Найди ошибку',stepErr]);
  if(P.write)defs.push(['write','Пиши сам',stepWrite]);
  defs.push(['final','Проверка',stepFinal],['report','Итог',stepReport]);
  var cur=Math.min(S.cur||0,defs.length-1);
  function idx(name){for(var i=0;i<defs.length;i++)if(defs[i][0]===name)return i}
  function goto(n){cur=n;S.cur=n;save();render();window.scrollTo({top:0,behavior:'smooth'})}
  function next(name){S.done[idx(name)]=1;save();goto(idx(name)+1)}
  function drawSteps(){var box=$('steps');box.innerHTML='';defs.forEach(function(s,i){var d=el('div','stp'+(i===cur?' on':'')+(S.done[i]?' done':''),(i+1)+'. '+s[1]);d.onclick=function(){goto(i)};box.appendChild(d)})}
  function nextBtn(name,locked){var nb=el('button','btn','Дальше →');nb.disabled=!!locked&&!S.done[idx(name)];nb.onclick=function(){goto(idx(name)+1)};return nb}
  function mark(name){S.done[idx(name)]=1;save()}

  function stepIntro(){
    var c=el('div','card'),I=P.intro;
    c.innerHTML='<h2>'+I.title+'</h2><div class="goal"><b>Цель урока:</b> '+I.goal+'</div>'+
      (P.film?'<div class="vid"><h3>🎬 Видео-объяснение</h3><div class="mf" data-film="'+P.film+'" id="vidbox"></div></div>':'')+I.html+
      '<button class="btn" id="n1">Понятно, дальше →</button>';
    $('stage').appendChild(c);
    if(P.film)try{MF.mount($('vidbox'))}catch(e){}
    $('n1').onclick=function(){next('intro')};
  }

  function stepWizard(){
    var Wz=P.wizard,c=el('div','card');
    c.innerHTML='<h2>'+Wz.title+'</h2><div class="rule">'+Wz.rule+'</div><p>'+Wz.lead+'</p>';
    var holder=el('div'),i=0,part=0,tried=false;c.appendChild(holder);$('stage').appendChild(c);
    function nextWord(){if(i>=Wz.items.length){mark('wizard');holder.innerHTML='<div class="fb show ok">Отлично! Ты справился со всеми словами.</div><p></p>';holder.lastChild.appendChild(nextBtn('wizard'));return}part=0;tried=false;draw()}
    function draw(){
      var W=Wz.items[i],st=Wz.steps[part];holder.innerHTML='';
      holder.appendChild(el('div','q','Слово №'+(i+1)+' из '+Wz.items.length+': «'+W.w+'»'));
      var done=el('div');holder.appendChild(done);
      for(var p=0;p<part;p++){var lab=Wz.steps[p].opts.filter(function(o){return o[0]===W.a[p]})[0][1];done.appendChild(el('div','small','✔ '+Wz.steps[p].title+' '+lab))}
      holder.appendChild(el('h3','',st.title));
      var ob=el('div','opts'),f=fb();
      st.opts.forEach(function(o){var b=el('button','opt',o[1]);b.onclick=function(){
        var ok=o[0]===W.a[part];if(!tried)note(st.skill,ok);
        if(ok){b.className='opt good';tried=false;setTimeout(function(){part++;if(part>=Wz.steps.length){i++;nextWord()}else draw()},650)}
        else{b.className='opt bad';tried=true;show(f,false,st.miss+' Попробуй ещё раз.')}};ob.appendChild(b)});
      holder.appendChild(ob);holder.appendChild(f);holder.appendChild(hintBlock(st.hint1[Math.min(i,st.hint1.length-1)]||st.hint1[0],st.hint2));
    }
    nextWord();
  }

  function stepSort(){
    var Sx=P.sort,c=el('div','card');
    c.innerHTML='<h2>'+Sx.title+'</h2><p>Нажми на слово, потом на колонку, куда оно относится.</p>';
    var pool=el('div','pool'),cols=el('div','sorts'),f=fb(),sel=null,left=Sx.items.length,mistakes=0;
    var colById={};Sx.cols.forEach(function(k){colById[k.id]=k});
    shuffle(Sx.items).forEach(function(s){var ch=el('span','chip',s[0]);ch.onclick=function(){if(sel)sel.classList.remove('sel');sel=ch;ch.classList.add('sel');ch._d=s};pool.appendChild(ch)});
    Sx.cols.forEach(function(k){var col=el('div','col','<h4>'+k.label+'</h4>');col.onclick=function(){
      if(!sel)return;var s=sel._d,ok=s[1]===k.id;
      if(!sel._t){sel._t=1;note(Sx.skill,ok)}
      if(ok){sel.classList.remove('sel');sel.classList.add('good');sel.onclick=null;col.appendChild(sel);sel=null;left--;show(f,true,'Верно!');
        if(!left){mark('sort');show(f,true,'Все слова на местах'+(mistakes?'. Ошибок: '+mistakes:' без ошибок')+'! 🎉');nb.disabled=false}}
      else{mistakes++;show(f,false,'«'+s[0]+'» — не в эту колонку. Подумай: '+colById[s[1]].why+'.')}};cols.appendChild(col)});
    c.appendChild(pool);c.appendChild(cols);c.appendChild(f);c.appendChild(hintBlock(Sx.hint1,Sx.hint2));
    var nb=nextBtn('sort',true);nb.style.marginTop='12px';c.appendChild(nb);$('stage').appendChild(c);
  }

  function stepInit(){
    var X=P.init,c=el('div','card');
    c.innerHTML='<h2>'+X.title+'</h2><div class="rule">'+X.rule+'</div><p>'+X.lead+'</p>';
    var done=0;
    X.items.forEach(function(it,k){
      var row=el('div');row.style.margin='14px 0';row.innerHTML='<div class="q">'+(k+1)+'. '+it[0]+' →</div>';
      var inp=el('input','ans');inp.placeholder=X.ph||'ответ';var b=el('button','btn sec','Проверить');b.style.marginLeft='8px';var f=fb(),tried=false,solved=false;
      b.onclick=function(){if(solved)return;var ans=[].concat(it[1]);var ok=ans.some(function(a){return norm(inp.value)===norm(a)});if(!tried){note(X.skill,ok);tried=true}
        if(ok){solved=true;show(f,true,'Верно. '+it[2]);inp.disabled=true;done++;if(done===X.items.length){mark('init');nb.disabled=false}}
        else show(f,false,X.miss)};
      inp.onkeydown=function(e){if(e.key==='Enter')b.onclick()};
      row.appendChild(inp);row.appendChild(b);row.appendChild(f);row.appendChild(hintBlock(it[3]||X.hint));c.appendChild(row)});
    var nb=nextBtn('init',true);c.appendChild(nb);$('stage').appendChild(c);
  }

  function stepErr(){
    var X=P.err,c=el('div','card');
    c.innerHTML='<h2>Найди ошибку</h2><p>'+X.lead+'</p>';var left=X.sets.length;
    X.sets.forEach(function(set,k){
      var box=el('div');box.style.margin='14px 0';box.appendChild(el('div','q','Список '+(k+1)));var f=fb(),tried=false,fin=false;
      set.forEach(function(r){var row=el('div','err-row',r[0]);row.onclick=function(){if(fin)return;var ok=r[1]===0;if(!tried){note(X.skill,ok);tried=true}
        if(ok){fin=true;row.classList.add('bad');show(f,true,'Верно, это ошибка. '+r[2]);left--;if(!left){mark('err');nb.disabled=false}}
        else{row.classList.add('good');show(f,false,'В этой строке всё правильно. Проверь остальные.')}};box.appendChild(row)});
      box.appendChild(f);box.appendChild(hintBlock(X.hint));c.appendChild(box)});
    var nb=nextBtn('err',true);c.appendChild(nb);$('stage').appendChild(c);
  }

  function stepWrite(){
    var X=P.write,c=el('div','card');
    c.innerHTML='<h2>Пиши сам</h2><div class="goal"><b>Задание.</b> '+X.task+'</div><textarea id="wr" placeholder="'+(X.ph||'')+'"></textarea><p><button class="btn sec" id="chk">Показать образец и проверить себя</button></p><div id="smp" class="hide"></div>';
    $('stage').appendChild(c);$('wr').value=S.wr||'';$('wr').oninput=function(){S.wr=this.value;save()};
    $('chk').onclick=function(){var s=$('smp');s.classList.remove('hide');
      s.innerHTML='<div class="sample"><b>Образец.</b> '+X.sample+'</div><p><b>Проверь себя:</b></p>'+X.checks.map(function(t){return '<label class="ck"><input type="checkbox" class="cc"> '+t+'</label>'}).join('')+'<p><button class="btn" id="n6" disabled>Дальше →</button></p>';
      var cc=s.querySelectorAll('.cc');function upd(){var all=true;for(var i=0;i<cc.length;i++)if(!cc[i].checked)all=false;$('n6').disabled=!all}
      for(var i=0;i<cc.length;i++)cc[i].onchange=upd;$('n6').onclick=function(){next('write')}};
    if(S.done[idx('write')])$('chk').click();
  }

  function stepFinal(){
    var X=P.final,c=el('div','card');
    c.innerHTML='<h2>Проверка</h2><p>'+X.qs.length+' вопросов. Подсказок нет. Чтобы тема считалась освоенной, нужно не меньше '+X.pass+' верных ответов.</p>';
    var order=shuffle(X.qs),k=0,right=0,box=el('div');c.appendChild(box);$('stage').appendChild(c);
    function q(){
      if(k>=order.length){S.final=right;mark('final');box.innerHTML='<div class="fb show '+(right>=X.pass?'ok':'no')+'">Результат: '+right+' из '+order.length+'.</div><p></p>';var b=el('button','btn','Смотреть итог →');b.onclick=function(){goto(idx('report'))};box.lastChild.appendChild(b);return}
      var it=order[k];box.innerHTML='<div class="q">'+(k+1)+' из '+order.length+'. '+it.q+'</div>';
      var ob=el('div','opts');it.opts.forEach(function(o){var b=el('button','opt',o[1]);b.onclick=function(){var ok=o[0]===it.a;note(X.skill,ok);if(ok)right++;
        b.className='opt '+(ok?'good':'bad');var f=fb();show(f,ok,(ok?'Верно. ':'Неверно. ')+it.expl);box.appendChild(f);
        var all=ob.querySelectorAll('button');for(var i=0;i<all.length;i++)all[i].disabled=true;
        var nx=el('button','btn','Дальше →');nx.style.marginTop='8px';nx.onclick=function(){k++;q()};box.appendChild(nx)};ob.appendChild(b)});
      box.appendChild(ob);
    }
    q();
  }

  function stepReport(){
    var X=P.final,c=el('div','card'),fin=S.final;
    var lv=fin===null?['c','Проверка не пройдена']:fin>=X.pass?['a','Тема освоена']:fin===X.pass-1?['b','Почти освоено']:['c','Нужно повторить'];
    c.innerHTML='<h2>Итог урока</h2><p><span class="lvl '+lv[0]+'">'+lv[1]+'</span>'+(fin!==null?' &nbsp; Итоговая проверка: '+fin+' из '+X.qs.length:'')+'</p>';
    var grid=el('div','skills'),weak=[];
    Object.keys(P.skills).forEach(function(k){var a=S.stat[k][0],t=S.stat[k][1],p=t?Math.round(100*a/t):0;
      var lab=!t?['c','не пройдено']:p>=80?['a','уверенно']:p>=50?['b','есть пробелы']:['c','повторить'];
      if(t&&p<80&&P.tips&&P.tips[k])weak.push(P.tips[k]);
      grid.appendChild(el('div','sk','<b>'+P.skills[k]+'</b><div class="bar"><i style="width:'+p+'%"></i></div><span class="lvl '+lab[0]+'">'+lab[1]+'</span> <span class="small">'+(t?a+' из '+t+' с первой попытки':'')+'</span>'))});
    c.appendChild(grid);
    c.appendChild(el('p','',weak.length?'<b>Что повторить:</b> '+weak.join(', ')+'.':'Пробелов не видно. Молодец!'));
    c.appendChild(el('p','small','Этот отчёт может посмотреть родитель или учитель: по нему видно, что ребёнок освоил, а что нужно повторить.'));
    var r=el('button','btn sec','Пройти урок заново');r.onclick=function(){if(confirm('Стереть результаты и начать заново?')){S=fresh();save();cur=0;render()}};c.appendChild(r);
    $('stage').appendChild(c);
  }
  function render(){$('stage').innerHTML='';drawSteps();defs[cur][2]()}
  render();
}
window.RusLesson={run:run};
})();
