/* Белiм Аралы — свои рисунки вместо новых смайликов (🪥 зубная щётка и др.).
   На части телефонов и компьютеров новые смайлики не показываются (пустое место). Этот файл заменяет их на наши SVG-картинки
   на ЛЮБОЙ странице сайта: уроки курсов, игры, квесты. Подключается из assets/progress.js, отдельно подключать не нужно.
   Работает сам: просматривает текст страницы и следит за новыми элементами. Чтобы добавить смайлик — допишите его в ICONS и ICON_RE. */
(function(){
if(window.__bilimIcons) return; window.__bilimIcons = 1;
function esc(t){ return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  var SV = function(body){ return '<svg viewBox="0 0 64 64" width="1.12em" height="1.12em" aria-hidden="true" style="vertical-align:-.2em">' + body + '</svg>'; };
  var ICONS = {
    '🪥': SV('<g transform="rotate(-35 32 32)"><rect x="4" y="27" width="40" height="10" rx="5" fill="#3b82f6"/><rect x="8" y="29.5" width="18" height="2.6" rx="1.3" fill="#93c5fd"/><rect x="40" y="22" width="20" height="20" rx="4" fill="#fff" stroke="#94a3b8" stroke-width="2"/><g stroke="#38bdf8" stroke-width="3" stroke-linecap="round"><path d="M44 18v6M50 18v6M56 18v6"/></g><g stroke="#f472b6" stroke-width="3" stroke-linecap="round"><path d="M47 18v6M53 18v6"/></g><path d="M42 27h16M42 32h16M42 37h16" stroke="#cbd5e1" stroke-width="1.5"/></g>'),
    '🪟': SV('<rect x="8" y="6" width="48" height="52" rx="4" fill="#92400e"/><rect x="13" y="11" width="17" height="19" rx="2" fill="#7dd3fc"/><rect x="34" y="11" width="17" height="19" rx="2" fill="#7dd3fc"/><rect x="13" y="34" width="17" height="19" rx="2" fill="#7dd3fc"/><rect x="34" y="34" width="17" height="19" rx="2" fill="#7dd3fc"/><path d="M16 26l6-9M37 26l6-9" stroke="#fff" stroke-width="2" opacity=".7"/>'),
    '🪑': SV('<rect x="16" y="6" width="6" height="30" rx="2" fill="#b45309"/><rect x="16" y="6" width="26" height="22" rx="3" fill="#d97706"/><rect x="12" y="34" width="38" height="8" rx="3" fill="#b45309"/><rect x="14" y="42" width="6" height="16" rx="2" fill="#92400e"/><rect x="42" y="42" width="6" height="16" rx="2" fill="#92400e"/>'),
    '🪙': SV('<circle cx="32" cy="32" r="24" fill="#fbbf24" stroke="#d97706" stroke-width="4"/><circle cx="32" cy="32" r="16" fill="none" stroke="#f59e0b" stroke-width="3"/><path d="M32 22l3 7 7 .6-5.4 4.6 1.8 7-6.4-4-6.4 4 1.8-7L22 29.6l7-.6z" fill="#f59e0b"/>'),
    '🪵': SV('<rect x="6" y="18" width="42" height="28" rx="6" fill="#a16207"/><path d="M12 26h30M12 32h30M12 38h30" stroke="#854d0e" stroke-width="2"/><ellipse cx="48" cy="32" rx="10" ry="14" fill="#d6a05a" stroke="#854d0e" stroke-width="2"/><ellipse cx="48" cy="32" rx="6" ry="9" fill="none" stroke="#a16207" stroke-width="2"/><ellipse cx="48" cy="32" rx="2.4" ry="3.5" fill="#a16207"/>'),
    '🪣': SV('<path d="M14 24c0-14 36-14 36 0" fill="none" stroke="#64748b" stroke-width="4"/><path d="M10 24h44l-5 32H15z" fill="#38bdf8" stroke="#0369a1" stroke-width="3" stroke-linejoin="round"/><ellipse cx="32" cy="24" rx="22" ry="5" fill="#bae6fd" stroke="#0369a1" stroke-width="3"/><path d="M20 34l2 16M44 34l-2 16" stroke="#0ea5e9" stroke-width="3" stroke-linecap="round"/>'),
    '🫖': SV('<path d="M50 24c10-2 10 14 0 14" fill="none" stroke="#be185d" stroke-width="5" stroke-linecap="round"/><path d="M14 22l-8-6" stroke="#be185d" stroke-width="5" stroke-linecap="round"/><ellipse cx="30" cy="38" rx="20" ry="17" fill="#f472b6" stroke="#be185d" stroke-width="3"/><path d="M16 22h28" stroke="#be185d" stroke-width="4" stroke-linecap="round"/><circle cx="30" cy="17" r="4" fill="#be185d"/><path d="M20 32c4-4 10-5 14-3" stroke="#fff" stroke-width="3" fill="none" opacity=".6" stroke-linecap="round"/>'),
    '🫁': SV('<path d="M30 6v20" stroke="#fb7185" stroke-width="5" stroke-linecap="round"/><path d="M30 24c-6 0-8-2-12 2-8 8-10 22-8 28 1 3 6 4 12 2 6-2 8-6 8-12z" fill="#fb7185" stroke="#be123c" stroke-width="3" stroke-linejoin="round"/><path d="M34 24c6 0 8-2 12 2 8 8 10 22 8 28-1 3-6 4-12 2-6-2-8-6-8-12z" fill="#fb7185" stroke="#be123c" stroke-width="3" stroke-linejoin="round"/>'),
    '🧃': SV('<path d="M38 4l-8 14" stroke="#16a34a" stroke-width="4" stroke-linecap="round"/><rect x="14" y="16" width="34" height="44" rx="5" fill="#fb923c" stroke="#c2410c" stroke-width="3"/><rect x="14" y="28" width="34" height="18" fill="#fff" opacity=".85"/><circle cx="31" cy="37" r="6" fill="#f97316"/><path d="M31 31c1-3 4-4 6-3" stroke="#16a34a" stroke-width="2" fill="none"/>'),
    '🧊': SV('<path d="M10 22l22-12 22 12v24L32 58 10 46z" fill="#bae6fd" stroke="#0284c7" stroke-width="3" stroke-linejoin="round"/><path d="M10 22l22 12 22-12M32 34v24" stroke="#0284c7" stroke-width="3" fill="none" stroke-linejoin="round"/><path d="M18 24l8-4" stroke="#fff" stroke-width="3" stroke-linecap="round"/>')
  };
  var ICON_RE = /(🪥|🪟|🪑|🪙|🪵|🪣|🫖|🫁|🧃|🧊)/g;
  function iconSpan(ch){ return '<span class="g2-ic" style="display:inline-block;line-height:1">' + ICONS[ch] + '<i style="font-size:0;position:absolute;opacity:0;pointer-events:none">' + ch + '</i></span>'; }
  function swapIcons(root){
    try {
      if(!root || !root.nodeType) return;
      var w = document.createTreeWalker(root.nodeType === 3 ? root.parentNode : root, NodeFilter.SHOW_TEXT, null), list = [], n;
      while((n = w.nextNode())){ if(root.nodeType === 3 && n !== root) continue; if(ICON_RE.test(n.nodeValue)){ var pn = n.parentNode && n.parentNode.nodeName; if(pn === 'I' && n.parentNode.parentNode && n.parentNode.parentNode.className === 'g2-ic'){ ICON_RE.lastIndex = 0; continue; } if(pn !== 'SCRIPT' && pn !== 'STYLE' && pn !== 'TEXTAREA' && pn !== 'OPTION' && pn !== 'TITLE') list.push(n); } ICON_RE.lastIndex = 0; }
      list.forEach(function(t){
        var sp = document.createElement('span'); sp.innerHTML = t.nodeValue.split(ICON_RE).map(function(part, i){ return i % 2 ? iconSpan(part) : esc(part); }).join('');
        while(sp.firstChild) t.parentNode.insertBefore(sp.firstChild, t); t.parentNode.removeChild(t);
      });
    } catch(e){}
  }
  try {
    var busy = false;
    var mo = new MutationObserver(function(muts){
      if(busy) return; busy = true;
      try { muts.forEach(function(m){
        if(m.type === 'characterData') swapIcons(m.target);
        else m.addedNodes && Array.prototype.forEach.call(m.addedNodes, function(nd){ if(nd.nodeType === 1 || nd.nodeType === 3) swapIcons(nd); });
      }); } catch(e){}
      busy = false;
    });
    var start = function(){ swapIcons(document.body); mo.observe(document.body, { childList:true, subtree:true, characterData:true }); };
    if(document.body) start(); else document.addEventListener('DOMContentLoaded', start);
  } catch(e){}
})();
