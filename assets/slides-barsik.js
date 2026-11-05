/* Слайд-страницы в новом виде: Барсик (анимированный, barsik.js) «рассказывает» слайды в облачке.
   Подключается на страницах со .slide-deck после barsik.js; сами слайды и initSlideDeck не меняются. */
(function(){
  'use strict';
  function run(){
    document.querySelectorAll('.slide-deck').forEach(function(deck){
      if(deck.getAttribute('data-sb')) return; deck.setAttribute('data-sb','1');
      deck.classList.add('sb-deck');
      var host = document.createElement('div'); host.className = 'sb-bs';
      deck.insertBefore(host, deck.firstChild);
      var b = null;
      try{ if(window.Barsik) b = Barsik.mount(host, { grade:1, track:true }); }catch(e){}
      if(!b) return;
      var slides = [].slice.call(deck.querySelectorAll('.slide')), last = -1, tm = 0;
      function sync(){
        var i = slides.findIndex(function(s){ return s.classList.contains('active'); });
        if(i < 0 || i === last) return; last = i;
        clearTimeout(tm);
        try{
          if(i === slides.length - 1){ b.set('cheer'); return; }
          b.set('idle'); b.talk(true);
          tm = setTimeout(function(){ try{ b.talk(false); }catch(e){} }, 2400);
        }catch(e){}
      }
      new MutationObserver(sync).observe(deck, { attributes:true, subtree:true, attributeFilter:['class'] });
      sync();
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
