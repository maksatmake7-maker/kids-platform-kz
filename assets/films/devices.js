(function(){
  var h = MF.h, INK = '#1D3557';
  var ART = {
    monitor: '<rect x="8" y="6" width="84" height="46" rx="5" fill="#2D3748" stroke="#1D3557" stroke-width="2.4"/><rect x="14" y="12" width="72" height="34" rx="2" fill="#BFE6FF"/><path d="M20 38 L36 24 L48 34 L60 20 L80 40 Z" fill="#6CC77A"/><circle cx="72" cy="20" r="5" fill="#FFD21F"/><rect x="42" y="52" width="16" height="6" fill="#6B7788"/><rect x="30" y="58" width="40" height="5" rx="2" fill="#6B7788"/>',
    system: '<rect x="28" y="2" width="44" height="64" rx="5" fill="#E3EAF2" stroke="#1D3557" stroke-width="2.4"/><rect x="34" y="10" width="32" height="6" rx="2" fill="#9BB0C6"/><rect x="34" y="20" width="32" height="6" rx="2" fill="#9BB0C6"/><circle cx="50" cy="50" r="6" fill="#2FB04A" stroke="#1D3557" stroke-width="1.6"/>',
    keyboard: '<rect x="4" y="14" width="92" height="38" rx="5" fill="#E3EAF2" stroke="#1D3557" stroke-width="2.4"/>' + [0, 1, 2].map(function(r){ return [0, 1, 2, 3, 4, 5, 6, 7].map(function(c){ return '<rect x="' + (10 + c * 10.4) + '" y="' + (20 + r * 9.5) + '" width="8" height="6.5" rx="1.5" fill="#9BB0C6"/>'; }).join(''); }).join('') + '<rect x="24" y="43" width="52" height="5" rx="1.5" fill="#9BB0C6" opacity="0"/>',
    mouse: '<path d="M50 6 C70 6 78 20 78 38 C78 54 66 62 50 62 C34 62 22 54 22 38 C22 20 30 6 50 6 Z" fill="#E3EAF2" stroke="#1D3557" stroke-width="2.4"/><path d="M50 6 V30 M22 32 H78" stroke="#1D3557" stroke-width="2"/><path d="M50 6 C34 6 22 20 22 32 H50 Z" fill="#BFD3E8"/>',
    speaker: '<rect x="26" y="4" width="48" height="60" rx="6" fill="#2D3748" stroke="#1D3557" stroke-width="2.4"/><circle cx="50" cy="22" r="7" fill="#6B7788"/><circle cx="50" cy="46" r="11" fill="#6B7788"/><circle cx="50" cy="46" r="5" fill="#2D3748"/>',
    laptop: '<rect x="18" y="8" width="64" height="40" rx="4" fill="#2D3748" stroke="#1D3557" stroke-width="2.4"/><rect x="23" y="13" width="54" height="30" rx="2" fill="#BFE6FF"/><path d="M6 52 H94 L88 60 H12 Z" fill="#C9D3DE" stroke="#1D3557" stroke-width="2.2" stroke-linejoin="round"/>',
    tablet: '<rect x="22" y="4" width="56" height="58" rx="7" fill="#2D3748" stroke="#1D3557" stroke-width="2.4"/><rect x="27" y="10" width="46" height="42" rx="2" fill="#BFE6FF"/><circle cx="50" cy="57" r="2.4" fill="#6B7788"/><path d="M33 40 L43 28 L50 36 L58 24 L68 40 Z" fill="#6CC77A"/>',
    phone: '<rect x="34" y="2" width="32" height="62" rx="6" fill="#2D3748" stroke="#1D3557" stroke-width="2.4"/><rect x="38" y="9" width="24" height="44" rx="2" fill="#BFE6FF"/><circle cx="50" cy="58" r="2.2" fill="#6B7788"/><circle cx="50" cy="26" r="6" fill="#FFD21F"/>',
    headphones: '<path d="M22 40 V32 C22 16 34 8 50 8 C66 8 78 16 78 32 V40" fill="none" stroke="#1D3557" stroke-width="4.4" stroke-linecap="round"/><rect x="14" y="36" width="16" height="24" rx="6" fill="#E5524F" stroke="#1D3557" stroke-width="2.2"/><rect x="70" y="36" width="16" height="24" rx="6" fill="#E5524F" stroke="#1D3557" stroke-width="2.2"/>',
    eye: '<path d="M8 34 Q50 -4 92 34 Q50 72 8 34 Z" fill="#fff" stroke="#1D3557" stroke-width="2.6"/><circle cx="50" cy="34" r="14" fill="#2F7DE1" stroke="#1D3557" stroke-width="2"/><circle cx="50" cy="34" r="6" fill="#1D3557"/><circle cx="55" cy="29" r="2.4" fill="#fff"/>'
  };
  var ic = function(k, x, y, w, d){ return h.pop(h.at(x, y, w / 100, ART[k]), d); };
  var tx = function(t, x, y, d, s){ return h.text(x, y, t, { d: d, s: s || 6 }); };
  MF.register('devices', { lang: 'ru-RU', scenes: [
    { say: 'Компьютер помогает нам учиться, играть и общаться. Он состоит из нескольких частей. Давай с ними познакомимся.',
      svg: h.svg(ic('monitor', 8, 6, 70, .2) + ic('keyboard', 86, 6, 66, .8) + ic('mouse', 112, 46, 26, 1.4) + tx('компьютер', 80, 82, 2, 7), 'paper'), dur: 8 },
    { say: 'Монитор. На нём мы видим картинки, буквы и видео.',
      svg: h.svg(ic('monitor', 30, 4, 100, .2) + tx('монитор', 80, 84, 1, 7.5), 'paper'), dur: 6 },
    { say: 'Системный блок. Это главная часть компьютера. Внутри он считает и думает.',
      svg: h.svg(ic('system', 38, 2, 84, .2) + h.text(80, 84, 'системный блок', { d: 1, s: 7 }), 'paper'), dur: 7 },
    { say: 'Клавиатура. С её помощью мы печатаем буквы и цифры.',
      svg: h.svg(ic('keyboard', 28, 8, 104, .2) + tx('клавиатура', 80, 80, 1, 7.5), 'paper'), dur: 6 },
    { say: 'Мышка. Ею двигают стрелку на экране и нажимают на кнопки.',
      svg: h.svg(ic('mouse', 54, 8, 54, .2) + h.slide('<path d="M118 28 L118 52 L124 46 L129 56 L133 54 L128 44 L136 44 Z" fill="#fff" stroke="#1D3557" stroke-width="1.6" stroke-linejoin="round"/>', -30, -6, .8, 1.2) + tx('мышка', 80, 80, 1, 7.5), 'paper'), dur: 7 },
    { say: 'Колонки и наушники. Колонки играют звук для всех, а в наушниках звук слышишь только ты.',
      svg: h.svg(ic('speaker', 6, 6, 70, .2) + ic('headphones', 84, 12, 70, 1) + tx('колонки', 40, 82, 1.6, 6.5) + tx('наушники', 120, 82, 2, 6.5), 'paper'), dur: 8 },
    { say: 'Бывают и компьютеры, которые можно носить с собой. Это ноутбук, планшет и смартфон.',
      svg: h.svg(ic('laptop', 4, 12, 62, .2) + ic('tablet', 62, 8, 48, 1) + ic('phone', 112, 6, 40, 1.8) + tx('ноутбук', 35, 80, 1.2, 6) + tx('планшет', 88, 80, 2, 6) + tx('смартфон', 132, 80, 2.6, 6), 'paper'), dur: 9 },
    { say: 'Берегись глаз. Не сиди у экрана долго: каждые несколько минут делай перерыв и смотри вдаль. Молодец!',
      svg: h.svg(ic('eye', 8, 12, 56, .2) + ic('monitor', 80, 6, 62, 1.2) + h.draw('M72 24 L66 28 M72 36 L66 32', { c: '#E5524F', w: 2, t: .6, d: 2 }) + tx('делай перерыв', 80, 82, 2.6, 7), 'paper'), dur: 8 }
  ] });
})();
