/* ===== Білім Аралы — миры предметов (данные) =====
   Подключать ПЕРЕД subject.js. Каждый предмет: цвет акцента, парящие в небе предметы (fl),
   4 острова на горизонте (isl), плавающие в море предметы (sea).
   fl/sea: строка SVG (цвет берётся из --c) или {t:'буква'} — цветной кубик с текстом. */
(function(){
  'use strict';
  var T = window.SubjectThemes = {};
  var ISLE = '<path d="M2 74 Q18 64 60 64 Q102 64 118 74Z" fill="#7DBF86"/><path d="M2 74 H118 Q102 80 60 80 Q18 80 2 74Z" fill="#E7C98C"/>';
  var isl = function(s){ return '<svg viewBox="0 0 120 84">' + ISLE + s + '</svg>'; };
  var sv = function(s){ return '<svg viewBox="0 0 40 40">' + s + '</svg>'; };
  var K = '#2B2F44';
  var txt = function(x, y, t, sz, col){ return '<text x="' + x + '" y="' + y + '" font-family="Baloo 2,sans-serif" font-weight="800" font-size="' + sz + '" text-anchor="middle" fill="' + col + '">' + t + '</text>'; };

  /* ---------- Грамота: Страна букв ---------- */
  T.reading = {
    accent: '#FF6B5B', cols: ['#FF6B5B', '#FFC93C', '#3FB088', '#5EC3E8', '#C77DD9', '#FF8A3D'],
    fl: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ә', 'Қ', 'Я', 'О', 'У', 'Ы', 'Ж', 'М', 'Н', 'Р'].map(function(t){ return { t: t }; }).concat([
      sv('<path d="M6 8 H34 V32 H6Z" fill="none" stroke="var(--c)" stroke-width="5" stroke-linejoin="round"/><path d="M20 8 V32" stroke="var(--c)" stroke-width="4"/>')
    ]),
    isl: [
      isl('<path d="M18 66 L18 30 Q40 20 60 32 Q80 20 102 30 L102 66 Q80 56 60 68 Q40 56 18 66Z" fill="#FFF7E1" stroke="#C9573F" stroke-width="3.4" stroke-linejoin="round"/><path d="M60 32 V68" stroke="#C9573F" stroke-width="2.6"/><path d="M26 40 Q42 35 54 41 M26 48 Q42 43 54 49 M66 41 Q78 35 94 40 M66 49 Q78 43 94 48" stroke="#E9B8A8" stroke-width="2.4" fill="none"/>'),
      isl('<g font-family="Baloo 2,sans-serif" font-weight="800" font-size="16" text-anchor="middle" fill="#fff"><rect x="26" y="42" width="28" height="26" rx="4" fill="#5EC3E8"/><text x="40" y="62">А</text><rect x="60" y="42" width="28" height="26" rx="4" fill="#FFC93C"/><text x="74" y="62">Б</text><rect x="42" y="16" width="28" height="26" rx="4" fill="#FF6B5B" transform="rotate(-7 56 29)"/><text x="55" y="36" transform="rotate(-7 56 29)">В</text></g>'),
      isl('<rect x="50" y="22" width="20" height="42" fill="#FFD21F" stroke="#B8920C" stroke-width="3"/><path d="M50 22 L60 4 L70 22Z" fill="#F2C99A" stroke="#B8920C" stroke-width="3" stroke-linejoin="round"/><path d="M56 10 L60 4 L64 10Z" fill="' + K + '"/><rect x="50" y="56" width="20" height="8" fill="#F28CA0" stroke="#B8920C" stroke-width="3"/><ellipse class="s-glow" cx="60" cy="8" rx="22" ry="14" fill="#FFF3A8" opacity="0"/>'),
      isl('<rect x="22" y="52" width="76" height="13" rx="2" fill="#3FB088" stroke="#1F7A5A" stroke-width="2.4"/><rect x="30" y="39" width="64" height="13" rx="2" fill="#FF8A3D" stroke="#B85F10" stroke-width="2.4"/><rect x="38" y="26" width="52" height="13" rx="2" fill="#5EC3E8" stroke="#2F7FA8" stroke-width="2.4"/><path d="M28 58 H50 M38 45 H58 M46 32 H64" stroke="#fff" stroke-width="2" opacity=".7"/>')
    ],
    sea: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ә', 'Қ'].map(function(t){ return { t: t, round: 1 }; })
  };

  /* ---------- Казахский язык: Великая степь ---------- */
  var horns = sv('<path d="M20 34 C10 34 6 22 12 14 C17 8 26 11 24 18 C23 23 17 22 18 18" fill="none" stroke="var(--c)" stroke-width="4.4" stroke-linecap="round"/><path d="M20 34 C30 34 34 22 28 14 C23 8 14 11 16 18 C17 23 23 22 22 18" fill="none" stroke="var(--c)" stroke-width="4.4" stroke-linecap="round"/>');
  T.kazakh = {
    accent: '#29B6C8', cols: ['#29B6C8', '#FFC93C', '#E5524F', '#3FB088', '#4C90F0'],
    fl: [horns, horns,
      sv('<circle cx="20" cy="20" r="7" fill="var(--c)"/><g stroke="var(--c)" stroke-width="3" stroke-linecap="round">' + [0, 1, 2, 3, 4, 5, 6, 7].map(function(i){ return '<path d="M20 4 V9" transform="rotate(' + i * 45 + ' 20 20)"/>'; }).join('') + '</g>'),
      sv('<path d="M20 4 L25 15 L36 20 L25 25 L20 36 L15 25 L4 20 L15 15Z" fill="var(--c)"/>'),
      sv('<path d="M20 36 V22 M20 26 Q10 24 8 12 Q16 14 20 26 M20 26 Q30 24 32 12 Q24 14 20 26" fill="none" stroke="var(--c)" stroke-width="3.4" stroke-linecap="round"/><path d="M13 14 Q20 -2 27 14 Q20 24 13 14Z" fill="var(--c)"/>')],
    isl: [
      isl('<rect x="30" y="42" width="60" height="24" fill="#F4E8CC" stroke="#B58A52" stroke-width="2.6"/><path d="M36 42 L48 66 M48 42 L60 66 M60 42 L72 66 M72 42 L84 66 M84 42 L72 66 M72 42 L60 66 M60 42 L48 66 M48 42 L36 66" stroke="#D8C39A" stroke-width="1.4" fill="none"/><path d="M24 46 Q60 -8 96 46Z" fill="#fff" stroke="#B58A52" stroke-width="2.6"/><path d="M36 38 Q60 22 84 38" fill="none" stroke="#29B6C8" stroke-width="4"/><path d="M52 66 V50 Q60 44 68 50 V66Z" fill="#B5702F"/><circle cx="60" cy="14" r="4" fill="#FFC93C" stroke="#B58A52" stroke-width="2"/>'),
      isl('<rect x="56" y="6" width="9" height="38" fill="#A56B33" stroke="#7A4A1E" stroke-width="2.6"/><rect x="53" y="1" width="15" height="10" rx="3" fill="#7A4A1E"/><ellipse cx="60" cy="54" rx="20" ry="14" fill="#C98A4B" stroke="#7A4A1E" stroke-width="3"/><circle cx="60" cy="54" r="5.4" fill="#3A1E08"/><path d="M58 11 V54 M63 11 V54" stroke="#F3E3C0" stroke-width="1.2"/>'),
      isl('<g fill="none" stroke="#2F9B4A" stroke-width="3" stroke-linecap="round"><path d="M32 68 V46"/><path d="M60 68 V40"/><path d="M88 68 V48"/></g><path d="M25 44 Q32 28 39 44 Q32 52 25 44Z" fill="#E5524F"/><path d="M53 38 Q60 22 67 38 Q60 46 53 38Z" fill="#FFC93C"/><path d="M81 46 Q88 30 95 46 Q88 54 81 46Z" fill="#FF8A3D"/>'),
      isl('<path d="M8 68 L40 22 L72 68Z" fill="#7C8FB6"/><path d="M40 22 L52 40 L44 36 L40 42 L34 35 L28 40Z" fill="#fff"/><path d="M52 68 L82 32 L112 68Z" fill="#94A8CC"/><path d="M82 32 L91 44 L85 41 L82 46 L77 41 L73 44Z" fill="#fff"/>')
    ],
    sea: [sv('<path d="M20 4 L34 20 L20 36 L6 20Z" fill="none" stroke="var(--c)" stroke-width="4"/><path d="M20 12 L28 20 L20 28 L12 20Z" fill="var(--c)"/>')]
  };

  /* ---------- Естествознание: Живая природа ---------- */
  var leaf = sv('<path d="M6 34 Q4 8 34 6 Q36 34 6 34Z" fill="var(--c)"/><path d="M8 32 Q18 20 30 10" stroke="rgba(255,255,255,.7)" stroke-width="2.2" fill="none" stroke-linecap="round"/>');
  var fly = sv('<g fill="var(--c)"><ellipse cx="11" cy="14" rx="9" ry="8"/><ellipse cx="29" cy="14" rx="9" ry="8"/><ellipse cx="12" cy="27" rx="6.4" ry="6"/><ellipse cx="28" cy="27" rx="6.4" ry="6"/></g><rect x="18.2" y="9" width="3.6" height="23" rx="1.8" fill="#2B2F44"/><path d="M19 9 Q16 3 12 3 M21 9 Q24 3 28 3" stroke="#2B2F44" stroke-width="1.6" fill="none" stroke-linecap="round"/>');
  T.estestvo = {
    accent: '#4BB863', cols: ['#4BB863', '#FF8A3D', '#FF6B9A', '#5EC3E8', '#FFC93C'],
    fl: [leaf, leaf, fly, fly,
      sv('<g fill="var(--c)">' + [0, 1, 2, 3, 4].map(function(i){ return '<ellipse cx="20" cy="10" rx="5.4" ry="8" transform="rotate(' + i * 72 + ' 20 20)"/>'; }).join('') + '</g><circle cx="20" cy="20" r="5" fill="#FFC21F"/>'),
      sv('<path d="M20 4 Q34 22 28 30 Q20 38 12 30 Q6 22 20 4Z" fill="var(--c)"/><path d="M15 28 Q14 22 18 18" stroke="rgba(255,255,255,.7)" stroke-width="2.2" fill="none" stroke-linecap="round"/>')],
    isl: [
      isl('<rect x="54" y="42" width="12" height="24" rx="2" fill="#8B5A2B"/><circle cx="60" cy="30" r="22" fill="#3FA85A"/><circle cx="44" cy="40" r="13" fill="#4DBB68"/><circle cx="76" cy="40" r="13" fill="#4DBB68"/><g fill="#E5392F"><circle cx="50" cy="26" r="3.6"/><circle cx="68" cy="22" r="3.6"/><circle cx="62" cy="38" r="3.6"/><circle cx="78" cy="38" r="3.6"/></g>'),
      isl('<g stroke="#2F9B4A" stroke-width="3" stroke-linecap="round" fill="none"><path d="M30 68 V48"/><path d="M60 68 V38"/><path d="M90 68 V50"/></g>' + [[30, 44], [60, 34], [90, 46]].map(function(p, i){ return '<g transform="translate(' + p[0] + ' ' + p[1] + ')">' + [0, 1, 2, 3, 4, 5, 6, 7].map(function(k){ return '<ellipse cx="0" cy="-8" rx="3.4" ry="6" fill="' + (i === 1 ? '#FF6B9A' : '#fff') + '" transform="rotate(' + k * 45 + ')"/>'; }).join('') + '<circle r="4.4" fill="#FFC21F"/></g>'; }).join('')),
      isl('<rect x="52" y="44" width="16" height="22" rx="5" fill="#FFF3DA" stroke="#C9B58A" stroke-width="2.4"/><path d="M30 46 Q30 18 60 18 Q90 18 90 46Z" fill="#E5392F" stroke="#9E2020" stroke-width="2.6"/><g fill="#fff"><circle cx="46" cy="34" r="4.4"/><circle cx="64" cy="28" r="5"/><circle cx="76" cy="40" r="3.6"/></g>'),
      isl('<rect x="56" y="48" width="8" height="18" fill="#8B5A2B"/><path d="M60 6 L80 30 H40Z M60 20 L88 50 H32Z" fill="#2F8F4E"/><path d="M60 6 L66 14 Q60 12 54 14Z" fill="#fff"/>')
    ],
    sea: [sv('<ellipse cx="20" cy="26" rx="17" ry="9" fill="#4BB863"/><path d="M20 26 L34 20" stroke="#BFE6C8" stroke-width="3"/><g fill="#FF8FB5"><ellipse cx="20" cy="17" rx="3.6" ry="7"/><ellipse cx="14" cy="19" rx="3.6" ry="7" transform="rotate(-40 14 19)"/><ellipse cx="26" cy="19" rx="3.6" ry="7" transform="rotate(40 26 19)"/></g>')]
  };

  /* ---------- Цифровая грамотность: Цифровой мир ---------- */
  T.digital = {
    accent: '#5EC3E8', cols: ['#5EC3E8', '#3FB088', '#C77DD9', '#FF8A3D', '#4C90F0'],
    fl: ['0', '1', '1', '0', '1', '0', '1', '0'].map(function(t){ return { t: t }; }).concat([
      sv('<g fill="none" stroke="var(--c)" stroke-width="4" stroke-linecap="round"><path d="M5 15 Q20 3 35 15"/><path d="M10 22 Q20 14 30 22"/></g><circle cx="20" cy="30" r="3.4" fill="var(--c)"/>'),
      sv('<path d="M8 4 L8 32 L15 26 L20 37 L25 34 L20 24 L30 24Z" fill="var(--c)"/>'),
      sv('<g fill="var(--c)"><rect x="6" y="10" width="8" height="8"/><rect x="26" y="10" width="8" height="8"/><rect x="6" y="18" width="28" height="8"/><rect x="14" y="26" width="12" height="8"/></g>')
    ]),
    isl: [
      isl('<rect x="22" y="14" width="76" height="44" rx="6" fill="#2B2F44"/><rect x="28" y="20" width="64" height="32" rx="3" fill="#BFE9FF"/><circle cx="50" cy="34" r="3.2" fill="#2B2F44"/><circle cx="70" cy="34" r="3.2" fill="#2B2F44"/><path d="M50 42 Q60 50 70 42" fill="none" stroke="#2B2F44" stroke-width="3" stroke-linecap="round"/><rect x="54" y="58" width="12" height="8" fill="#2B2F44"/><rect x="40" y="64" width="40" height="5" rx="2" fill="#6B7390"/>'),
      isl('<line x1="60" y1="10" x2="60" y2="20" stroke="#6B7390" stroke-width="3"/><circle cx="60" cy="8" r="5" fill="#FF6B5B"/><ellipse class="s-glow" cx="60" cy="8" rx="16" ry="12" fill="#FF9A8C" opacity="0"/><rect x="34" y="20" width="52" height="26" rx="8" fill="#B8C4D8" stroke="#6B7390" stroke-width="3"/><circle cx="48" cy="33" r="5.4" fill="#2B2F44"/><circle cx="72" cy="33" r="5.4" fill="#2B2F44"/><circle cx="49.5" cy="31.5" r="1.8" fill="#fff"/><circle cx="73.5" cy="31.5" r="1.8" fill="#fff"/><rect x="40" y="48" width="40" height="18" rx="5" fill="#8FA0BE" stroke="#6B7390" stroke-width="3"/>'),
      isl('<rect x="14" y="40" width="92" height="26" rx="5" fill="#E7ECF4" stroke="#6B7390" stroke-width="3"/>' + [0, 1, 2, 3, 4, 5, 6, 7].map(function(i){ return '<rect x="' + (20 + i * 10.6) + '" y="45" width="8" height="6" rx="1.4" fill="#8FA0BE"/>'; }).join('') + [0, 1, 2, 3, 4, 5, 6, 7].map(function(i){ return '<rect x="' + (20 + i * 10.6) + '" y="54" width="8" height="6" rx="1.4" fill="#8FA0BE"/>'; }).join('')),
      isl('<rect x="38" y="22" width="44" height="44" rx="5" fill="#3FB088" stroke="#1F7A5A" stroke-width="3"/><rect x="48" y="32" width="24" height="24" rx="3" fill="#1F7A5A"/>' + [0, 1, 2, 3].map(function(i){ return '<rect x="' + (43 + i * 10) + '" y="14" width="4" height="8" fill="#B8C4D8"/><rect x="' + (43 + i * 10) + '" y="66" width="4" height="8" fill="#B8C4D8"/>'; }).join('') + '<circle cx="60" cy="44" r="4" fill="#7FE0B8"/>')
    ],
    sea: ['0', '1', '1', '0', '1', '0'].map(function(t){ return { t: t, round: 1 }; })
  };

  /* ---------- Познание мира: Остров открытий ---------- */
  T.poznanie = {
    accent: '#FF8A3D', cols: ['#FF8A3D', '#4C90F0', '#3FB088', '#E5524F', '#FFC93C'],
    fl: [
      sv('<path d="M20 2 L24 16 L38 20 L24 24 L20 38 L16 24 L2 20 L16 16Z" fill="var(--c)"/><circle cx="20" cy="20" r="3" fill="#fff"/>'),
      sv('<path d="M20 36 C8 24 8 6 20 6 C32 6 32 24 20 36Z" fill="var(--c)"/><circle cx="20" cy="16" r="5" fill="#fff"/>'),
      sv('<circle cx="20" cy="20" r="16" fill="none" stroke="var(--c)" stroke-width="4"/><path d="M20 8 L24 20 L20 32 L16 20Z" fill="var(--c)"/>'),
      sv('<path d="M10 30 C2 30 2 20 10 20 C10 10 24 8 28 16 C36 16 38 30 30 30Z" fill="var(--c)"/>'),
      sv('<circle cx="20" cy="20" r="8" fill="var(--c)"/><g stroke="var(--c)" stroke-width="3" stroke-linecap="round">' + [0, 1, 2, 3, 4, 5, 6, 7].map(function(i){ return '<path d="M20 3 V8" transform="rotate(' + i * 45 + ' 20 20)"/>'; }).join('') + '</g>')
    ],
    isl: [
      isl('<path d="M44 68 L60 54 L76 68Z" fill="#B5702F"/><circle cx="60" cy="34" r="24" fill="#4C90F0" stroke="#2F5FB0" stroke-width="3"/><path d="M44 26 Q52 18 58 26 Q56 34 48 36 Q42 32 44 26Z M64 36 Q74 30 78 38 Q74 48 66 46Z" fill="#6CC77A"/><ellipse cx="52" cy="22" rx="5" ry="3" fill="#fff" opacity=".4"/>'),
      isl('<rect x="46" y="12" width="28" height="52" rx="8" fill="#2B2F44"/><circle cx="60" cy="24" r="7" fill="#E5392F"/><circle cx="60" cy="38" r="7" fill="#FFC21F"/><circle cx="60" cy="52" r="7" fill="#2FB04A"/><rect x="56" y="62" width="8" height="6" fill="#6B7390"/>'),
      isl('<rect x="30" y="38" width="60" height="28" fill="#F2C27B" stroke="#8B5A2B" stroke-width="3"/><path d="M22 40 L60 8 L98 40Z" fill="#D9534F" stroke="#8B2E2B" stroke-width="3" stroke-linejoin="round"/><rect x="54" y="48" width="14" height="18" fill="#8B5A2B"/><rect x="36" y="44" width="12" height="12" fill="#BFE6FF" stroke="#8B5A2B" stroke-width="2"/><rect x="72" y="44" width="12" height="12" fill="#BFE6FF" stroke="#8B5A2B" stroke-width="2"/>'),
      isl('<rect x="57" y="10" width="6" height="58" fill="#8B5A2B"/><path d="M63 16 H96 L104 24 L96 32 H63Z" fill="#FF8A3D" stroke="#B85F10" stroke-width="2"/><path d="M57 38 H26 L18 46 L26 54 H57Z" fill="#4C90F0" stroke="#2F5FB0" stroke-width="2"/>')
    ],
    sea: [sv('<path d="M20 4 L20 26 L34 26Z" fill="#fff"/><path d="M18 8 L18 26 L8 26Z" fill="var(--c)"/><path d="M6 28 H34 L30 36 H10Z" fill="#8B5A2B"/>')]
  };

  /* ---------- Музыка: Страна музыки ---------- */
  var note1 = sv('<ellipse cx="13" cy="31" rx="7" ry="5.4" fill="var(--c)" transform="rotate(-18 13 31)"/><path d="M19 29 V6 Q27 8 29 16" fill="none" stroke="var(--c)" stroke-width="3.4" stroke-linecap="round"/>');
  var note2 = sv('<ellipse cx="9" cy="32" rx="6" ry="4.6" fill="var(--c)" transform="rotate(-18 9 32)"/><ellipse cx="28" cy="28" rx="6" ry="4.6" fill="var(--c)" transform="rotate(-18 28 28)"/><path d="M14 30 V8 L33 5 V26" fill="none" stroke="var(--c)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 12 L33 9" stroke="var(--c)" stroke-width="4.4"/>');
  T.muzyka = {
    accent: '#C77DD9', cols: ['#C77DD9', '#FF6B9A', '#4C90F0', '#FFC93C', '#3FB088'],
    fl: [note1, note1, note2, note2, note1, note2,
      sv('<path d="M20 2 L25 15 L38 16 L28 25 L31 38 L20 31 L9 38 L12 25 L2 16 L15 15Z" fill="var(--c)"/>')],
    isl: [
      isl('<ellipse cx="60" cy="30" rx="26" ry="9" fill="#FFF3DA" stroke="#B88A55" stroke-width="3"/><path d="M34 30 V54 Q60 66 86 54 V30" fill="#E5524F" stroke="#B83C39" stroke-width="3"/><path d="M34 40 L44 56 L52 38 L60 60 L68 38 L76 56 L86 40" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M42 12 L58 28 M82 8 L64 27" stroke="#C99A5B" stroke-width="3.4" stroke-linecap="round"/><circle cx="42" cy="11" r="3.6" fill="#FFC93C"/><circle cx="83" cy="7" r="3.6" fill="#FFC93C"/>'),
      isl('<rect x="14" y="32" width="92" height="34" rx="4" fill="#fff" stroke="' + K + '" stroke-width="3"/>' + [1, 2, 3, 4, 5, 6, 7].map(function(i){ return '<path d="M' + (14 + i * 11.5) + ' 32 V66" stroke="' + K + '" stroke-width="1.6"/>'; }).join('') + [1, 2, 4, 5, 6].map(function(i){ return '<rect x="' + (14 + i * 11.5 - 4) + '" y="32" width="8" height="20" rx="1.4" fill="' + K + '"/>'; }).join('') + '<rect x="14" y="26" width="92" height="8" rx="3" fill="#C77DD9"/>'),
      isl(['#E5524F', '#FF8A3D', '#FFC93C', '#3FB088', '#5EC3E8', '#C77DD9'].map(function(c, i){ return '<rect x="' + (22 + i * 14) + '" y="' + (18 + i * 5) + '" width="11" height="' + (50 - i * 5) + '" rx="3" fill="' + c + '" stroke="rgba(0,0,0,.2)" stroke-width="1.6"/>'; }).join('') + '<path d="M18 74 V66" stroke="#8B5A2B" stroke-width="0"/>'),
      isl('<path d="M30 62 Q30 24 60 20 Q90 24 90 62Z" fill="#FFC93C" stroke="#B8920C" stroke-width="3.4"/><path d="M40 60 Q40 32 58 28" fill="none" stroke="#FFF3A8" stroke-width="3.4" stroke-linecap="round"/><rect x="26" y="60" width="68" height="7" rx="3" fill="#E2B24A" stroke="#B8920C" stroke-width="3"/><circle cx="60" cy="14" r="5" fill="#FFC93C" stroke="#B8920C" stroke-width="3"/>')
    ],
    sea: [note1, note2]
  };

  /* ---------- ИЗО: Страна красок ---------- */
  T.izo = {
    accent: '#FF4F9A', cols: ['#FF4F9A', '#FFC93C', '#4C90F0', '#3FB088', '#FF8A3D', '#C77DD9'],
    fl: [
      sv('<path d="M20 4 C26 4 28 10 32 12 C38 14 38 22 32 26 C30 32 24 36 18 34 C10 34 4 26 8 20 C4 14 10 6 16 8 C17 5 18 4 20 4Z" fill="var(--c)"/><circle cx="14" cy="16" r="3" fill="#fff" opacity=".45"/>'),
      sv('<path d="M20 4 C26 16 32 22 32 28 C32 34 26 38 20 38 C14 38 8 34 8 28 C8 22 14 16 20 4Z" fill="var(--c)"/><path d="M14 28 Q13 23 17 19" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".6"/>'),
      sv('<path d="M4 30 Q12 8 22 20 Q30 32 36 10" fill="none" stroke="var(--c)" stroke-width="7" stroke-linecap="round"/>'),
      sv('<circle cx="20" cy="20" r="14" fill="var(--c)"/><circle cx="14" cy="14" r="3.4" fill="#fff" opacity=".5"/>'),
      sv('<path d="M8 36 L30 8 Q34 5 36 8 Q34 14 14 36Z" fill="#C99A5B"/><path d="M30 8 Q34 5 36 8 L32 12Z" fill="var(--c)"/>')
    ],
    isl: [
      isl('<path d="M44 68 L56 24 M76 68 L64 24 M60 68 V30" stroke="#8B5A2B" stroke-width="3.4" stroke-linecap="round"/><rect x="32" y="12" width="56" height="38" rx="2" fill="#fff" stroke="#8B5A2B" stroke-width="3"/><path d="M38 44 Q52 14 60 36 Q68 16 82 44Z" fill="#6CC77A"/><circle cx="48" cy="22" r="5" fill="#FFC93C"/><path d="M38 44 H82" stroke="#4C90F0" stroke-width="5"/>'),
      isl('<path d="M18 46 C18 26 44 18 70 22 C96 26 106 44 92 58 C84 66 70 58 62 62 C48 68 18 64 18 46Z" fill="#DDA35E" stroke="#8B5A2B" stroke-width="3"/><circle cx="76" cy="52" r="5" fill="#B8803F" stroke="#8B5A2B" stroke-width="2"/><circle cx="34" cy="36" r="6" fill="#E5524F"/><circle cx="50" cy="28" r="6" fill="#FFC93C"/><circle cx="68" cy="30" r="6" fill="#3FB088"/><circle cx="84" cy="38" r="6" fill="#4C90F0"/>'),
      isl([['#E5524F', 24], ['#FFC93C', 50], ['#4C90F0', 76]].map(function(c){ return '<rect x="' + c[1] + '" y="42" width="22" height="24" rx="4" fill="#fff" stroke="#9BB0C6" stroke-width="2.6"/><rect x="' + (c[1] + 1) + '" y="46" width="20" height="14" fill="' + c[0] + '"/><rect x="' + (c[1] + 3) + '" y="36" width="16" height="8" rx="2" fill="#9BB0C6"/>'; }).join('')),
      isl('<rect x="54" y="14" width="12" height="50" rx="3" fill="#C99A5B" stroke="#8B5A2B" stroke-width="2.6"/><path d="M54 14 Q60 -2 66 14Z" fill="#FF4F9A" stroke="#B02A6C" stroke-width="2.6" stroke-linejoin="round"/><rect x="52" y="34" width="16" height="6" fill="#B8C4D8" stroke="#6B7390" stroke-width="2"/>')
    ],
    sea: [
      sv('<circle cx="20" cy="22" r="13" fill="var(--c)"/><circle cx="14" cy="16" r="3.4" fill="#fff" opacity=".5"/>')
    ]
  };

  /* ---------- Труд: Мастерская ---------- */
  T.trud = {
    accent: '#F2A93B', cols: ['#F2A93B', '#E5524F', '#3FB088', '#4C90F0', '#C77DD9', '#FF6B9A'],
    fl: [
      sv('<g fill="none" stroke="var(--c)" stroke-width="4" stroke-linecap="round"><path d="M18 22 L34 6 M22 22 L6 6"/></g><circle cx="12" cy="30" r="6" fill="none" stroke="var(--c)" stroke-width="4"/><circle cx="28" cy="30" r="6" fill="none" stroke="var(--c)" stroke-width="4"/>'),
      sv('<rect x="8" y="6" width="24" height="5" rx="2" fill="var(--c)"/><rect x="8" y="29" width="24" height="5" rx="2" fill="var(--c)"/><rect x="11" y="11" width="18" height="18" fill="#fff" opacity=".75"/><path d="M11 14 H29 M11 19 H29 M11 24 H29" stroke="var(--c)" stroke-width="2.6"/>'),
      sv('<circle cx="20" cy="20" r="15" fill="var(--c)"/><circle cx="20" cy="20" r="10" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/><g fill="#fff"><circle cx="16" cy="16" r="2.2"/><circle cx="24" cy="16" r="2.2"/><circle cx="16" cy="24" r="2.2"/><circle cx="24" cy="24" r="2.2"/></g>'),
      sv('<rect x="6" y="6" width="28" height="28" rx="3" fill="var(--c)" transform="rotate(-8 20 20)"/>'),
      sv('<path d="M20 4 L36 34 H4Z" fill="var(--c)"/>'),
      sv('<path d="M6 20 Q12 8 20 20 Q28 32 34 20" fill="none" stroke="var(--c)" stroke-width="3.6" stroke-linecap="round"/><path d="M34 20 L38 14" stroke="var(--c)" stroke-width="3.6" stroke-linecap="round"/>')
    ],
    isl: [
      isl('<rect x="38" y="16" width="44" height="8" rx="3" fill="#C99A5B" stroke="#8B5A2B" stroke-width="2.6"/><rect x="38" y="58" width="44" height="8" rx="3" fill="#C99A5B" stroke="#8B5A2B" stroke-width="2.6"/><rect x="42" y="24" width="36" height="34" fill="#E5524F"/><path d="M42 30 L78 38 M42 38 L78 46 M42 46 L78 54 M42 54 L78 58" stroke="#FF9A8C" stroke-width="3"/><path d="M78 40 Q96 40 96 52" fill="none" stroke="#E5524F" stroke-width="3" stroke-linecap="round"/>'),
      isl('<path d="M28 34 H92 L84 66 H36Z" fill="#E2B76A" stroke="#8B5A2B" stroke-width="3" stroke-linejoin="round"/><path d="M32 44 H88 M34 54 H86 M48 34 L46 66 M60 34 V66 M72 34 L74 66" stroke="#B8803F" stroke-width="2.2"/><path d="M28 34 Q60 6 92 34" fill="none" stroke="#8B5A2B" stroke-width="3.4" stroke-linecap="round"/>'),
      isl('<rect x="30" y="36" width="60" height="30" fill="#FFE9A8" stroke="#B8920C" stroke-width="3"/><path d="M22 38 L60 10 L98 38Z" fill="#FF6B9A" stroke="#B02A6C" stroke-width="3" stroke-linejoin="round"/><rect x="54" y="46" width="12" height="20" fill="#8B5A2B"/><rect x="36" y="42" width="11" height="11" fill="#BFE6FF" stroke="#B8920C" stroke-width="2"/><rect x="73" y="42" width="11" height="11" fill="#BFE6FF" stroke="#B8920C" stroke-width="2"/>'),
      isl('<g fill="none" stroke="#E5524F" stroke-width="6" stroke-linecap="round"><path d="M56 40 L84 12 M64 40 L36 12"/></g><circle cx="42" cy="54" r="11" fill="none" stroke="#E5524F" stroke-width="6"/><circle cx="78" cy="54" r="11" fill="none" stroke="#E5524F" stroke-width="6"/>')
    ],
    sea: [
      sv('<circle cx="20" cy="20" r="14" fill="var(--c)" stroke="#fff" stroke-width="3"/><g fill="#fff"><circle cx="15" cy="15" r="2.4"/><circle cx="25" cy="15" r="2.4"/><circle cx="15" cy="25" r="2.4"/><circle cx="25" cy="25" r="2.4"/></g>')
    ]
  };

  /* ---------- Физкультура: Стадион ---------- */
  var ball = sv('<circle cx="20" cy="20" r="15" fill="var(--c)" stroke="rgba(0,0,0,.28)" stroke-width="2.2"/><path d="M5 20 H35 M20 5 V35 M10 9 Q20 20 10 31 M30 9 Q20 20 30 31" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="1.8"/>');
  var soccer = sv('<circle cx="20" cy="20" r="15" fill="#fff" stroke="' + K + '" stroke-width="2.4"/><path d="M20 12 L27 17 L24 26 H16 L13 17Z" fill="' + K + '"/><path d="M20 12 V5 M27 17 L34 14 M24 26 L28 33 M16 26 L12 33 M13 17 L6 14" stroke="' + K + '" stroke-width="2"/>');
  T.fizra = {
    accent: '#2FB04A', cols: ['#FF8A1F', '#E5524F', '#4C90F0', '#FFC93C', '#2FB04A'],
    fl: [ball, soccer, ball, soccer,
      sv('<path d="M12 4 H28 L30 18 H10Z" fill="none"/><path d="M13 4 L20 20 L27 4" fill="none" stroke="#E5524F" stroke-width="5" stroke-linejoin="round"/><circle cx="20" cy="28" r="9" fill="var(--c)" stroke="rgba(0,0,0,.25)" stroke-width="2"/><path d="M20 23 L21.6 26.6 L25.4 27 L22.6 29.6 L23.4 33.4 L20 31.4 L16.6 33.4 L17.4 29.6 L14.6 27 L18.4 26.6Z" fill="#fff"/>'),
      sv('<path d="M6 30 C6 8 34 8 34 30" fill="none" stroke="var(--c)" stroke-width="4.4" stroke-linecap="round"/><rect x="2" y="28" width="9" height="8" rx="3" fill="#E5524F"/><rect x="29" y="28" width="9" height="8" rx="3" fill="#E5524F"/>')],
    isl: [
      isl('<path d="M18 66 V22 H102 V66" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/><path d="M22 22 V66 M102 22 V66" stroke="#B8C4D8" stroke-width="2"/><g stroke="#C9D3E4" stroke-width="1.6">' + [0, 1, 2, 3, 4, 5, 6].map(function(i){ return '<path d="M' + (28 + i * 11) + ' 22 V66"/>'; }).join('') + [0, 1, 2, 3].map(function(i){ return '<path d="M20 ' + (32 + i * 10) + ' H100"/>'; }).join('') + '</g><circle cx="60" cy="58" r="8" fill="#fff" stroke="' + K + '" stroke-width="2.4"/><path d="M60 52 L65 56 L63 62 H57 L55 56Z" fill="' + K + '"/>'),
      isl('<rect x="57" y="30" width="6" height="38" fill="#6B7390"/><rect x="34" y="6" width="52" height="30" rx="3" fill="#fff" stroke="#6B7390" stroke-width="3"/><rect x="48" y="16" width="24" height="16" fill="none" stroke="#E5524F" stroke-width="3"/><ellipse cx="60" cy="40" rx="16" ry="4.4" fill="none" stroke="#FF8A1F" stroke-width="4"/><path d="M44 42 L48 56 M76 42 L72 56 M54 44 L56 58 M66 44 L64 58" stroke="#fff" stroke-width="2"/>'),
      isl('<rect x="44" y="30" width="32" height="36" fill="#FFC93C" stroke="#B8920C" stroke-width="3"/><rect x="14" y="44" width="30" height="22" fill="#C0C8D8" stroke="#6B7390" stroke-width="3"/><rect x="76" y="52" width="30" height="14" fill="#E2A15B" stroke="#8B5A2B" stroke-width="3"/>' + txt(60, 56, '1', 20, '#fff') + txt(29, 60, '2', 16, '#fff') + txt(91, 63, '3', 12, '#fff') + '<path d="M60 12 L63 20 L71 21 L65 26 L67 34 L60 30 L53 34 L55 26 L49 21 L57 20Z" fill="#FFC93C" stroke="#B8920C" stroke-width="2"/>'),
      isl('<path d="M30 66 H90" stroke="#E5524F" stroke-width="3"/><rect x="58" y="8" width="4" height="58" fill="#8B5A2B"/><path d="M62 10 H92 L84 20 L92 30 H62Z" fill="#FF8A1F" stroke="#B85F10" stroke-width="2.4"/><circle cx="36" cy="56" r="10" fill="#fff" stroke="' + K + '" stroke-width="2.4"/><circle cx="80" cy="58" r="8" fill="#FF8A1F" stroke="#B85F10" stroke-width="2.4"/>')
    ],
    sea: [ball, soccer]
  };

  /* ---------- Игровая комната: Страна игрушек ---------- */
  var balloon = sv('<path d="M20 3 C31 3 34 12 31 20 C28 27 23 29 20 29 C17 29 12 27 9 20 C6 12 9 3 20 3Z" fill="var(--c)"/><path d="M17 8 Q13 11 13 17" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".6"/><path d="M18 29 L20 32 L22 29Z" fill="var(--c)"/><path d="M20 32 Q16 35 20 38" stroke="#6B7390" stroke-width="1.6" fill="none"/>');
  var kite = sv('<path d="M20 2 L33 16 L20 30 L7 16Z" fill="var(--c)"/><path d="M20 2 V30 M7 16 H33" stroke="#fff" stroke-width="1.8" opacity=".7"/><path d="M20 30 Q14 34 20 37 Q26 40 20 43" stroke="#6B7390" stroke-width="1.6" fill="none"/>');
  var piece = sv('<path d="M6 12 H15 Q12 6 18 4 Q24 6 21 12 H30 V21 Q36 18 37 24 Q36 30 30 27 V36 H6Z" fill="var(--c)"/>');
  T.playroom = {
    accent: '#7C9CFF', cols: ['#7C9CFF', '#FF6B9A', '#FFC93C', '#3FB088', '#FF8A3D', '#C77DD9'],
    fl: [balloon, balloon, kite, piece, piece, ball, { t: 'A' }, { t: '1' }, { t: 'Б' }, { t: '2' },
      sv('<path d="M20 36 C6 26 4 14 12 9 C17 6 20 10 20 12 C20 10 23 6 28 9 C36 14 34 26 20 36Z" fill="var(--c)"/>'),
      sv('<path d="M20 2 L25 15 L38 16 L28 25 L31 38 L20 31 L9 38 L12 25 L2 16 L15 15Z" fill="var(--c)"/>')],
    isl: [
      isl('<g font-family="Baloo 2,sans-serif" font-weight="800" text-anchor="middle" fill="#fff"><rect x="30" y="48" width="26" height="20" rx="3" fill="#FF6B9A"/><text x="43" y="64" font-size="15">А</text><rect x="58" y="48" width="26" height="20" rx="3" fill="#3FB088"/><text x="71" y="64" font-size="15">Б</text><rect x="42" y="28" width="26" height="20" rx="3" fill="#FFC93C"/><text x="55" y="44" font-size="15">В</text><rect x="46" y="9" width="20" height="19" rx="3" fill="#7C9CFF"/><text x="56" y="23" font-size="13">1</text></g>'),
      isl('<circle cx="42" cy="22" r="8" fill="#C98A4B" stroke="#7A4A1E" stroke-width="2.4"/><circle cx="78" cy="22" r="8" fill="#C98A4B" stroke="#7A4A1E" stroke-width="2.4"/><ellipse cx="60" cy="52" rx="22" ry="17" fill="#C98A4B" stroke="#7A4A1E" stroke-width="3"/><ellipse cx="60" cy="56" rx="12" ry="10" fill="#F0CFA0"/><circle cx="60" cy="32" r="18" fill="#C98A4B" stroke="#7A4A1E" stroke-width="3"/><ellipse cx="60" cy="38" rx="8" ry="6" fill="#F0CFA0"/><circle cx="53" cy="29" r="2.6" fill="#2B2F44"/><circle cx="67" cy="29" r="2.6" fill="#2B2F44"/><ellipse cx="60" cy="36" rx="3" ry="2.2" fill="#2B2F44"/><path d="M52 44 Q60 50 68 44" fill="none" stroke="#E5524F" stroke-width="3" stroke-linecap="round"/>'),
      isl('<path d="M22 28 L60 6 L98 28Z" fill="#FF6B9A" stroke="#B02A6C" stroke-width="3" stroke-linejoin="round"/><path d="M40 17 L44 28 M60 6 V28 M80 17 L76 28" stroke="#fff" stroke-width="2.6" opacity=".8"/><rect x="24" y="28" width="72" height="5" fill="#FFC93C"/><path d="M32 33 V62 M60 33 V62 M88 33 V62" stroke="#B8920C" stroke-width="3.4"/><ellipse cx="46" cy="46" rx="9" ry="6" fill="#fff" stroke="#9BB0C6" stroke-width="2"/><ellipse cx="76" cy="50" rx="9" ry="6" fill="#7C9CFF" stroke="#4A64C0" stroke-width="2"/><rect x="22" y="62" width="76" height="5" rx="2" fill="#E5524F"/>'),
      isl('<rect x="26" y="40" width="40" height="22" rx="3" fill="#E5524F" stroke="#9E2020" stroke-width="3"/><rect x="66" y="30" width="22" height="32" rx="3" fill="#E5524F" stroke="#9E2020" stroke-width="3"/><rect x="70" y="34" width="14" height="12" rx="2" fill="#BFE9FF"/><rect x="62" y="18" width="30" height="8" rx="2" fill="#2B2F44"/><rect x="30" y="28" width="10" height="12" fill="#2B2F44"/><circle cx="38" cy="64" r="8" fill="#FFC93C" stroke="#B8920C" stroke-width="3"/><circle cx="58" cy="64" r="8" fill="#FFC93C" stroke="#B8920C" stroke-width="3"/><circle cx="82" cy="64" r="8" fill="#FFC93C" stroke="#B8920C" stroke-width="3"/><circle cx="36" cy="22" r="4" fill="#fff" opacity=".8"/><circle cx="31" cy="14" r="3" fill="#fff" opacity=".6"/>')
    ],
    sea: [
      sv('<ellipse cx="20" cy="26" rx="14" ry="9" fill="#FFD21F"/><circle cx="29" cy="16" r="7" fill="#FFD21F"/><path d="M34 16 L40 18 L34 20Z" fill="#FF8A1F"/><circle cx="30" cy="14" r="1.6" fill="#2B2F44"/><path d="M12 26 Q18 22 24 26" stroke="#E5B800" stroke-width="2" fill="none"/>'),
      sv('<path d="M18 4 L18 24 L32 24Z" fill="#fff"/><path d="M16 8 L16 24 L6 24Z" fill="var(--c)"/><path d="M4 26 H36 L32 34 H8Z" fill="var(--c)" stroke="rgba(0,0,0,.2)" stroke-width="1.4"/>')
    ]
  };
})();
