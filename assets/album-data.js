/* ===== Білім Аралы — «Альбом наклеек Казахстана» (чердак Дома Барсика): данные =====
   Подключать после assets/house-i18n.js. Здесь:
   • ALBUM_STICKERS — 20 наклеек по порядку открытия: id, фон, рисунок (SVG 120×120, нарисован кодом), названия и факты на 7 языках;
   • тексты страницы и фразы Барсика — добавляются в словарь HI.T (assets/house-i18n.js).
   Порядок и цену открытия считает assets/album.js (по числу заработанных звёзд; звёзды не тратятся).
   Факты проверяет Максат; казахские — в первую очередь. Остальные языки — рабочий перевод. */
(function(){
  'use strict';
  function rays(cx, cy, r1, r2, n, w){
    var d = '';
    for (var i = 0; i < n; i++){
      var a = i * 2 * Math.PI / n;
      d += 'M' + (cx + r1 * Math.cos(a)).toFixed(1) + ' ' + (cy + r1 * Math.sin(a)).toFixed(1) + ' L' + (cx + r2 * Math.cos(a)).toFixed(1) + ' ' + (cy + r2 * Math.sin(a)).toFixed(1) + ' ';
    }
    return '<path d="' + d + '" stroke="#FEC50C" stroke-width="' + (w || 2) + '" stroke-linecap="round" fill="none"/>';
  }

  /* t: язык → [название, факт] */
  var S = [
    { id: 'baursak', bg: '#FFE9B8',
      art: `<ellipse cx="60" cy="90" rx="40" ry="9" fill="#fff" stroke="#C9C2B0" stroke-width="2"/><g fill="#E0A040" stroke="#B87A1E" stroke-width="2.5"><circle cx="40" cy="76" r="15"/><circle cx="78" cy="76" r="15"/><circle cx="59" cy="60" r="15"/><circle cx="59" cy="82" r="13"/></g><g fill="#F6C46A" opacity=".85"><circle cx="35" cy="71" r="4"/><circle cx="73" cy="71" r="4"/><circle cx="54" cy="55" r="4"/></g>`,
      t: {
        ru: ['Баурсак', 'Баурсаки — пышные кусочки жареного теста. Их подают гостям.'],
        kz: ['Бауырсақ', 'Бауырсақ — қуырылған жұмсақ қамырдан жасалады. Оны қонаққа ұсынады.'],
        en: ['Baursak', 'Baursaks are puffy pieces of fried dough. They are served to guests.'],
        zh: ['包尔萨克', '包尔萨克是膨松的油炸面团，用来招待客人。'],
        uz: ['Боурсоқ', 'Боурсоқ қовурилган юмшоқ хамирдан тайёрланади. Уни меҳмонларга тортишади.'],
        tg: ['Баурсак', 'Баурсак — порчаҳои пухтаи хамири бирёншуда аст. Онро ба меҳмонон пешкаш мекунанд.'],
        ug: ['باۋىرساق', 'باۋىرساق قورۇلغان يۇمشاق خېمىردىن ئېتىلىدۇ. ئۇنى مېھمانلارغا تەقدىم قىلىدۇ.']
      } },
    { id: 'yurt', bg: '#CFE6FA',
      art: `<rect x="12" y="86" width="96" height="22" fill="#9BD08A"/><rect x="26" y="62" width="68" height="28" fill="#FFF7E3" stroke="#7A3B2E" stroke-width="3"/><path d="M20 64 Q60 14 100 64 Z" fill="#FFF7E3" stroke="#7A3B2E" stroke-width="3" stroke-linejoin="round"/><path d="M26 67 H94" stroke="#E8584A" stroke-width="5"/><rect x="51" y="72" width="18" height="18" rx="2" fill="#A8683A" stroke="#7A3B2E" stroke-width="2"/><circle cx="60" cy="28" r="4" fill="#7A3B2E"/><path d="M34 72 l8 18 M44 72 l8 18 M76 72 l8 18" stroke="#E5D3A8" stroke-width="2"/>`,
      t: {
        ru: ['Юрта', 'Юрту можно быстро разобрать и перевезти. В ней жили кочевники.'],
        kz: ['Киіз үй', 'Киіз үйді тез жинап, көшіріп апаруға болады. Онда көшпенділер тұрған.'],
        en: ['Yurt', 'A yurt can be taken down and moved quickly. Nomads lived in it.'],
        zh: ['毡房', '毡房可以很快拆开搬走，游牧民族住在里面。'],
        uz: ['Юрта', 'Юртани тез йиғиб, кўчириб кетиш мумкин. Унда кўчманчилар яшаган.'],
        tg: ['Хайма', 'Хаймаро зуд ҷамъ карда, кӯчонидан мумкин аст. Дар он кӯчманчиён зиндагӣ мекарданд.'],
        ug: ['كىگىز ئۆي', 'كىگىز ئۆينى تېز يىغىپ كۆچۈرۈپ كېتىشكە بولىدۇ. ئۇنىڭدا كۆچمەنلەر ياشىغان.']
      } },
    { id: 'dombra', bg: '#FFE4A8',
      art: `<g transform="rotate(38 60 60)"><rect x="56.5" y="14" width="7" height="48" rx="3" fill="#7A3B2E"/><rect x="53" y="8" width="14" height="12" rx="4" fill="#5A2A1E"/><path d="M60 52 C34 52 30 92 60 102 C90 92 86 52 60 52Z" fill="#C98F5B" stroke="#7A3B2E" stroke-width="3"/><circle cx="60" cy="78" r="7" fill="#3B2A1A"/><path d="M58.5 20 V84 M61.5 20 V84" stroke="#FFF7E3" stroke-width="1.4"/></g>`,
      t: {
        ru: ['Домбра', 'У домбры две струны. На ней играют кюи.'],
        kz: ['Домбыра', 'Домбыраның екі ішегі бар. Онда күй тартады.'],
        en: ['Dombra', 'A dombra has two strings. People play kuis on it.'],
        zh: ['冬不拉', '冬不拉有两根弦，人们用它演奏乐曲。'],
        uz: ['Дўмбира', 'Дўмбиранинг иккита тори бор. Унда куйлар чалинади.'],
        tg: ['Домбра', 'Домбра ду тор дорад. Бар он кӯйҳо менавозанд.'],
        ug: ['دومبرا', 'دومبرانىڭ ئىككى تارى بار. ئۇنىڭدا كۈيلەر چېلىنىدۇ.']
      } },
    { id: 'tulip', bg: '#E3F0C4',
      art: `<path d="M60 60 V104" stroke="#3F8F6B" stroke-width="5" stroke-linecap="round"/><path d="M60 98 C40 96 34 80 36 66 C50 70 58 82 60 98Z" fill="#3FB088"/><path d="M60 92 C78 90 86 76 84 62 C70 66 62 78 60 92Z" fill="#3FB088"/><path d="M38 30 C36 62 48 72 60 72 C72 72 84 62 82 30 C74 40 68 36 60 24 C52 36 46 40 38 30Z" fill="#E8584A" stroke="#B12F3A" stroke-width="2.5" stroke-linejoin="round"/><path d="M60 26 C58 46 58 58 60 70" stroke="#B12F3A" stroke-width="2" fill="none" opacity=".5"/>`,
      t: {
        ru: ['Тюльпан', 'В степях и горах Казахстана растут дикие тюльпаны. Весной они цветут яркими коврами.'],
        kz: ['Қызғалдақ', 'Қазақстанның дала мен тауларында жабайы қызғалдақ өседі. Көктемде олар түрлі-түсті кілемдей гүлдейді.'],
        en: ['Tulip', 'Wild tulips grow in the steppes and mountains of Kazakhstan. In spring they bloom like bright carpets.'],
        zh: ['郁金香', '哈萨克斯坦的草原和山上长着野生郁金香，春天开成一片鲜艳的花毯。'],
        uz: ['Лола', 'Қозоғистоннинг даштлари ва тоғларида ёввойи лолалар ўсади. Баҳорда улар чиройли гиламдек очилади.'],
        tg: ['Лола', 'Дар дашту кӯҳҳои Қазоқистон лолаҳои худрӯй мерӯянд. Баҳорон онҳо мисли қолини рангин мешукуфанд.'],
        ug: ['لالە', 'قازاقىستاننىڭ دالا ۋە تاغلىرىدا يابايى لالە ئۆسىدۇ. باھاردا ئۇلار رەڭدار گىلەمدەك ئېچىلىدۇ.']
      } },
    { id: 'apple', bg: '#FFD9D2',
      art: `<path d="M60 38 C44 26 22 38 26 64 C29 86 46 100 60 94 C74 100 91 86 94 64 C98 38 76 26 60 38Z" fill="#E8584A" stroke="#B12F3A" stroke-width="3" stroke-linejoin="round"/><path d="M60 38 C60 30 62 24 68 18" stroke="#7A3B2E" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M66 28 C72 16 86 16 90 22 C84 32 72 34 66 28Z" fill="#3FB088" stroke="#1F6B4F" stroke-width="2"/><path d="M36 56 C36 48 42 44 48 44" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/>`,
      t: {
        ru: ['Яблоко', 'Название города Алматы идёт от слова «алма» — яблоко. В горах рядом растут дикие яблони.'],
        kz: ['Алма', 'Алматы қаласының атауы «алма» сөзінен шыққан. Жақын таулардың арасында жабайы алма ағаштары өседі.'],
        en: ['Apple', 'The city name Almaty comes from the word alma, which means apple. Wild apple trees grow in the mountains nearby.'],
        zh: ['苹果', '阿拉木图这个名字来自“阿尔玛”，意思是苹果。附近的山里长着野苹果树。'],
        uz: ['Олма', 'Алмати шаҳрининг номи «алма» — олма сўзидан келиб чиққан. Яқин тоғларда ёввойи олма дарахтлари ўсади.'],
        tg: ['Себ', 'Номи шаҳри Олмаато аз калимаи «алма» — себ омадааст. Дар кӯҳҳои наздик себҳои ёвво мерӯянд.'],
        ug: ['ئالما', 'ئالمۇتا شەھىرىنىڭ نامى «ئالما» دېگەن سۆزدىن كەلگەن. يېقىن ئەتراپتىكى تاغلاردا يابايى ئالما دەرىخى ئۆسىدۇ.']
      } },
    { id: 'snowleopard', bg: '#DCE8F5',
      art: `<circle cx="36" cy="40" r="11" fill="#E4EAF1" stroke="#5F6F80" stroke-width="2.5"/><circle cx="84" cy="40" r="11" fill="#E4EAF1" stroke="#5F6F80" stroke-width="2.5"/><circle cx="36" cy="41" r="5" fill="#9AA8B8"/><circle cx="84" cy="41" r="5" fill="#9AA8B8"/><ellipse cx="60" cy="64" rx="32" ry="29" fill="#F1F5F9" stroke="#5F6F80" stroke-width="2.5"/><g fill="#5F6F80"><ellipse cx="42" cy="46" rx="4" ry="3"/><ellipse cx="78" cy="46" rx="4" ry="3"/><ellipse cx="60" cy="40" rx="3.5" ry="3"/><ellipse cx="33" cy="66" rx="3" ry="4"/><ellipse cx="87" cy="66" rx="3" ry="4"/></g><ellipse cx="48" cy="60" rx="7" ry="6" fill="#fff" stroke="#5F6F80" stroke-width="2"/><ellipse cx="72" cy="60" rx="7" ry="6" fill="#fff" stroke="#5F6F80" stroke-width="2"/><circle cx="48" cy="60" r="4" fill="#8DC9A0"/><circle cx="72" cy="60" r="4" fill="#8DC9A0"/><circle cx="48" cy="60" r="2" fill="#1D3557"/><circle cx="72" cy="60" r="2" fill="#1D3557"/><path d="M54 72 H66 L60 79Z" fill="#E8A0A8"/><path d="M60 79 V83 M52 86 Q60 90 68 86" stroke="#5F6F80" stroke-width="2" fill="none" stroke-linecap="round"/>`,
      t: {
        ru: ['Снежный барс', 'Снежный барс, или ирбис, живёт высоко в горах. Увидеть его почти невозможно.'],
        kz: ['Қар барысы', 'Қар барысы, яғни ирбис, биік тауда тұрады. Оны көру өте қиын.'],
        en: ['Snow leopard', 'The snow leopard, or irbis, lives high in the mountains. It is almost impossible to spot.'],
        zh: ['雪豹', '雪豹生活在高高的山上，几乎没人能见到它。'],
        uz: ['Қор барси', 'Қор барси, яъни ирбис, баланд тоғларда яшайди. Уни кўриш деярли мумкин эмас.'],
        tg: ['Паланги барфӣ', 'Паланги барфӣ, яъне ирбис, дар кӯҳҳои баланд зиндагӣ мекунад. Дидани он қариб номумкин аст.'],
        ug: ['قار بارسى', 'قار بارسى ئېگىز تاغلاردا ياشايدۇ. ئۇنى كۆرۈش دېگەندەك مۇمكىن ئەمەس.']
      } },
    { id: 'baiterek', bg: '#CFE6FA',
      art: `<rect x="12" y="96" width="96" height="12" fill="#9BD08A"/><path d="M40 98 L54 58 H66 L80 98Z" fill="#B8C4D0" stroke="#5F6F80" stroke-width="2.5" stroke-linejoin="round"/><path d="M54 58 L50 38 H70 L66 58Z" fill="#CBD6E0" stroke="#5F6F80" stroke-width="2.5" stroke-linejoin="round"/><circle cx="60" cy="28" r="16" fill="#FFC93C" stroke="#C98A00" stroke-width="3"/><path d="M46 28 H74 M60 14 V42" stroke="#C98A00" stroke-width="1.5" opacity=".6"/><path d="M60 12 V6" stroke="#5F6F80" stroke-width="3" stroke-linecap="round"/><path d="M48 82 H72 M52 70 H68" stroke="#5F6F80" stroke-width="2"/>`,
      t: {
        ru: ['Байтерек', 'Байтерек — башня в Астане высотой 105 метров. Наверху у неё золотой шар.'],
        kz: ['Бәйтерек', 'Бәйтерек — Астанадағы биіктігі 105 метр мұнара. Оның төбесінде алтын шар бар.'],
        en: ['Baiterek', 'Baiterek is a tower in Astana, 105 meters tall. It has a golden ball at the top.'],
        zh: ['巴伊杰列克塔', '巴伊杰列克塔在阿斯塔纳，高105米，塔顶有一个金色的圆球。'],
        uz: ['Байтерак', 'Байтерак — Остонадаги баландлиги 105 метр минора. Унинг тепасида олтин шар бор.'],
        tg: ['Байтерек', 'Байтерек — манора дар Остона бо баландии 105 метр. Дар болои он кураи тиллоӣ ҳаст.'],
        ug: ['بەيتەرەك', 'بەيتەرەك — ئاستانادىكى ئېگىزلىكى 105 مېتىر مۇنار. ئۇنىڭ ئۈستىدە ئالتۇن شار بار.']
      } },
    { id: 'camel', bg: '#FFE4A8',
      art: `<rect x="12" y="92" width="96" height="16" fill="#F2D08A"/><path d="M34 92 V74 M46 92 V76 M76 92 V76 M88 92 V74" stroke="#9A6A3A" stroke-width="6" stroke-linecap="round"/><path d="M28 64 C28 56 38 54 44 58 C46 48 54 46 58 56 C62 46 72 46 76 58 C88 56 96 62 94 72 C92 80 80 80 70 78 H40 C32 78 28 72 28 64Z" fill="#C98F5B" stroke="#7A3B2E" stroke-width="2.5" stroke-linejoin="round"/><path d="M30 62 C22 54 22 44 26 36 L36 38 C34 48 36 54 42 58Z" fill="#C98F5B" stroke="#7A3B2E" stroke-width="2.5" stroke-linejoin="round"/><ellipse cx="24" cy="32" rx="10" ry="6" fill="#C98F5B" stroke="#7A3B2E" stroke-width="2.5"/><circle cx="27" cy="30" r="1.8" fill="#3B2A1A"/><path d="M94 70 C100 74 100 82 96 88" stroke="#7A3B2E" stroke-width="3" fill="none" stroke-linecap="round"/>`,
      t: {
        ru: ['Верблюд', 'Верблюд может долго идти без воды. Его называют кораблём пустыни.'],
        kz: ['Түйе', 'Түйе суға тоймай ұзақ жүре алады. Оны шөлдің кемесі дейді.'],
        en: ['Camel', 'A camel can walk a long time without water. It is called the ship of the desert.'],
        zh: ['骆驼', '骆驼可以很久不喝水，被称为沙漠之舟。'],
        uz: ['Туя', 'Туя сувсиз узоқ юра олади. Уни саҳро кемаси дейишади.'],
        tg: ['Шутур', 'Шутур бе об муддати дароз роҳ рафта метавонад. Онро киштии биёбон меноманд.'],
        ug: ['تۆگە', 'تۆگە سۇسىز ئۇزۇن يول يۈرەلەيدۇ. ئۇنى قۇملۇق كېمىسى دەپ ئاتايدۇ.']
      } },
    { id: 'shanyrak', bg: '#7CC4EE',
      art: `<circle cx="60" cy="60" r="36" fill="none" stroke="#FFC93C" stroke-width="7"/><g stroke="#FFC93C" stroke-width="5" fill="none" stroke-linecap="round"><path d="M60 24 Q78 60 60 96"/><path d="M60 24 Q78 60 60 96" transform="rotate(60 60 60)"/><path d="M60 24 Q78 60 60 96" transform="rotate(120 60 60)"/></g><circle cx="60" cy="60" r="6" fill="#fff" stroke="#FFC93C" stroke-width="3"/>`,
      t: {
        ru: ['Шаңырақ', 'Шаңырақ — круглое окно в куполе юрты. Он есть и на гербе Казахстана.'],
        kz: ['Шаңырақ', 'Шаңырақ — киіз үйдің күмбезіндегі дөңгелек терезе. Ол Қазақстанның елтаңбасында да бар.'],
        en: ['Shanyrak', 'The shanyrak is the round opening at the top of a yurt. It is also on the coat of arms of Kazakhstan.'],
        zh: ['沙尼拉克', '沙尼拉克是毡房顶上的圆形天窗，哈萨克斯坦国徽上也有它。'],
        uz: ['Шанирак', 'Шанирак — юрта гумбазидаги думалоқ дераза. У Қозоғистон гербида ҳам бор.'],
        tg: ['Шанирак', 'Шанирак — тирезаи мудаввар дар гумбази хайма. Он дар нишони давлатии Қазоқистон ҳам ҳаст.'],
        ug: ['شاڭىراق', 'شاڭىراق — كىگىز ئۆي گۈمبىزىدىكى يۇمىلاق دېرىزە. ئۇ قازاقىستان گېربىدىمۇ بار.']
      } },
    { id: 'beshbarmak', bg: '#FFE9B8',
      art: `<ellipse cx="60" cy="82" rx="44" ry="18" fill="#fff" stroke="#C9C2B0" stroke-width="2.5"/><path d="M24 78 C34 66 44 90 54 78 C64 66 74 90 84 78 C90 72 94 76 96 78" stroke="#F1D58B" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M28 88 C38 78 48 98 58 88 C68 78 78 98 88 88" stroke="#F1D58B" stroke-width="7" fill="none" stroke-linecap="round"/><g fill="#A8683A" stroke="#7A3B2E" stroke-width="2"><rect x="38" y="52" width="20" height="16" rx="5"/><rect x="60" y="48" width="22" height="18" rx="5"/><rect x="50" y="62" width="18" height="14" rx="5"/></g><g fill="#fff" opacity=".85"><circle cx="46" cy="58" r="3"/><circle cx="72" cy="55" r="3"/></g>`,
      t: {
        ru: ['Бешбармак', 'Бешбармак значит «пять пальцев»: его едят руками. Это блюдо ставят на праздничный стол.'],
        kz: ['Бесбармақ', 'Бесбармақ — «бес саусақ» деген мағына береді, оны қолмен жейді. Бұл ас мерекелік дастарханға қойылады.'],
        en: ['Beshbarmak', 'Beshbarmak means five fingers, because people eat it with their hands. It is served at festive tables.'],
        zh: ['别什巴尔马克', '“别什巴尔马克”意思是五指，因为要用手抓着吃，它是节日餐桌上的名菜。'],
        uz: ['Бешбармоқ', 'Бешбармоқ «беш бармоқ» деган маънони билдиради: уни қўл билан ейишади. Бу таом байрам дастурхонига қўйилади.'],
        tg: ['Бешбармак', 'Бешбармак маънои «панҷ ангушт»-ро дорад: онро бо даст мехӯранд. Ин хӯрок ба дастурхони ид гузошта мешавад.'],
        ug: ['بەشبارماق', 'بەشبارماق «بەش بارماق» دېگەن مەنىدە، ئۇنى قول بىلەن يەيدۇ. بۇ تائام بايرام داستىخىنىغا قويۇلىدۇ.']
      } },
    { id: 'eagle', bg: '#E6DCF5',
      art: `<path d="M60 52 C48 36 28 36 16 44 C30 44 36 52 40 66 C48 58 52 56 60 62Z" fill="#7A4F2E" stroke="#4A2E1A" stroke-width="2.5" stroke-linejoin="round"/><path d="M60 52 C72 36 92 36 104 44 C90 44 84 52 80 66 C72 58 68 56 60 62Z" fill="#7A4F2E" stroke="#4A2E1A" stroke-width="2.5" stroke-linejoin="round"/><ellipse cx="60" cy="74" rx="14" ry="22" fill="#9A6A3A" stroke="#4A2E1A" stroke-width="2.5"/><circle cx="60" cy="46" r="11" fill="#C9A15A" stroke="#4A2E1A" stroke-width="2.5"/><path d="M54 48 L60 62 L66 48Z" fill="#F2B632" stroke="#8A5A00" stroke-width="2" stroke-linejoin="round"/><circle cx="55" cy="43" r="2.4" fill="#3B2A1A"/><circle cx="65" cy="43" r="2.4" fill="#3B2A1A"/><path d="M53 94 V104 M67 94 V104" stroke="#F2B632" stroke-width="4" stroke-linecap="round"/>`,
      t: {
        ru: ['Беркут', 'Беркут — крупный орёл. Казахские охотники приручают его и охотятся вместе.'],
        kz: ['Беркут', 'Беркут — үлкен қыран. Қазақ аңшылары оны қолға үйретіп, бірге аң аулайды.'],
        en: ['Golden eagle', 'The golden eagle is a large eagle. Kazakh hunters tame it and hunt together.'],
        zh: ['金雕', '金雕是一种大型的鹰，哈萨克猎人驯养它，一起打猎。'],
        uz: ['Бургут', 'Бургут — йирик қуш. Қозоқ овчилари уни ўргатиб, бирга овга чиқишади.'],
        tg: ['Уқоб', 'Уқоб — паррандаи калон. Шикорчиёни қазоқ онро ром карда, якҷоя шикор мекунанд.'],
        ug: ['بۈركۈت', 'بۈركۈت — چوڭ قۇش. قازاق ئوۋچىلىرى ئۇنى ئۆگىتىپ، بىللە ئوۋغا چىقىدۇ.']
      } },
    { id: 'tenge', bg: '#D3EFE2',
      art: `<circle cx="60" cy="60" r="38" fill="#FFC93C" stroke="#C98A00" stroke-width="4"/><circle cx="60" cy="60" r="30" fill="none" stroke="#C98A00" stroke-width="2" stroke-dasharray="3 4"/><g stroke="#8A5A00" stroke-width="6" stroke-linecap="round"><path d="M42 44 H78"/><path d="M42 55 H78"/><path d="M60 55 V82"/></g>`,
      t: {
        ru: ['Тенге', 'Тенге — деньги Казахстана. Их ввели в 1993 году.'],
        kz: ['Теңге', 'Теңге — Қазақстанның ақшасы. Оны 1993 жылы енгізді.'],
        en: ['Tenge', 'The tenge is the money of Kazakhstan. It was introduced in 1993.'],
        zh: ['坚戈', '坚戈是哈萨克斯坦的货币，1993年开始使用。'],
        uz: ['Тенге', 'Тенге — Қозоғистоннинг пули. У 1993 йилда жорий этилган.'],
        tg: ['Тенге', 'Тенге — пули Қазоқистон аст. Онро соли 1993 ҷорӣ карданд.'],
        ug: ['تەڭگە', 'تەڭگە — قازاقىستاننىڭ پۇلى. ئۇ 1993-يىلى قوللىنىلغان.']
      } },
    { id: 'nauryz', bg: '#CFE6FA',
      art: `<g stroke="#FFC93C" stroke-width="4" stroke-linecap="round"><path d="M88 12 V18 M106 32 H112 M70 32 H64 M101 19 L105 15 M75 19 L71 15"/></g><circle cx="88" cy="32" r="12" fill="#FFC93C" stroke="#E8A800" stroke-width="2.5"/><path d="M12 94 Q60 72 108 94 V108 H12Z" fill="#8A5A3A"/><path d="M12 94 Q60 72 108 94" stroke="#6BB06B" stroke-width="7" fill="none"/><path d="M44 82 V60" stroke="#3F8F6B" stroke-width="4" stroke-linecap="round"/><path d="M44 62 C32 60 28 50 30 44 C40 46 44 54 44 62Z" fill="#3FB088"/><path d="M44 62 C56 60 60 50 58 44 C48 46 44 54 44 62Z" fill="#3FB088"/><g fill="#E8584A"><circle cx="72" cy="88" r="3"/><circle cx="84" cy="92" r="3"/></g>`,
      t: {
        ru: ['Наурыз', 'Наурыз — праздник весны. Его отмечают 21, 22 и 23 марта.'],
        kz: ['Наурыз', 'Наурыз — көктем мерекесі. Оны 21, 22 және 23 наурызда тойлайды.'],
        en: ['Nauryz', 'Nauryz is the spring holiday. It is celebrated on March 21, 22 and 23.'],
        zh: ['诺鲁孜节', '诺鲁孜节是春天的节日，在3月21日、22日和23日庆祝。'],
        uz: ['Наврўз', 'Наврўз — баҳор байрами. У 21, 22 ва 23 мартда нишонланади.'],
        tg: ['Наврӯз', 'Наврӯз — ҷашни баҳор аст. Онро 21, 22 ва 23-юми март ҷашн мегиранд.'],
        ug: ['نورۇز', 'نورۇز — باھار بايرىمى. ئۇ 3-ئاينىڭ 21، 22 ۋە 23-كۈنلىرى تەبرىكلىنىدۇ.']
      } },
    { id: 'asyk', bg: '#E3F0C4',
      art: `<g fill="#FFF7E3" stroke="#B8A27A" stroke-width="2.5" stroke-linejoin="round"><path d="M-18 -4 C-22 -10 -14 -12 -12 -7 H12 C14 -12 22 -10 18 -4 C22 4 14 6 12 3 H-12 C-14 6 -22 4 -18 -4Z" transform="translate(36 38) rotate(25)"/><path d="M-18 -4 C-22 -10 -14 -12 -12 -7 H12 C14 -12 22 -10 18 -4 C22 4 14 6 12 3 H-12 C-14 6 -22 4 -18 -4Z" transform="translate(82 42) rotate(-30)"/><path d="M-18 -4 C-22 -10 -14 -12 -12 -7 H12 C14 -12 22 -10 18 -4 C22 4 14 6 12 3 H-12 C-14 6 -22 4 -18 -4Z" transform="translate(40 80) rotate(-15)"/><path d="M-18 -4 C-22 -10 -14 -12 -12 -7 H12 C14 -12 22 -10 18 -4 C22 4 14 6 12 3 H-12 C-14 6 -22 4 -18 -4Z" transform="translate(84 84) rotate(40)"/></g>`,
      t: {
        ru: ['Асық', 'Асық — косточки для старинной игры. Нужно метко выбить чужую косточку.'],
        kz: ['Асық', 'Асық — көне ойынға арналған сүйектер. Басқа асықты дәл тигізіп ұту керек.'],
        en: ['Asyk', 'Asyk are knucklebones used for an old game. You have to knock out the other bone with a good throw.'],
        zh: ['羊拐骨', '羊拐骨是一种古老游戏用的小骨头，要准确地把别人的骨头打出去。'],
        uz: ['Асиқ', 'Асиқ — қадимий ўйин учун суякчалар. Бошқасининг суякчасини аниқ уриб чиқариш керак.'],
        tg: ['Асик', 'Асик — устухонакҳо барои бозии қадимӣ. Бояд устухонаки дигарро дақиқ зад.'],
        ug: ['ئاسىق', 'ئاسىق — قەدىمكى ئويۇن ئۈچۈن ئىشلىتىلىدىغان سۆڭەكچىلەر. باشقىسىنىڭ سۆڭىكىنى ئېنىق ئۇرۇپ چىقىرىش كېرەك.']
      } },
    { id: 'flag', bg: '#E3F0C4',
      art: `<rect x="22" y="20" width="5" height="88" rx="2" fill="#7A3B2E"/><rect x="27" y="26" width="74" height="50" fill="#00AFCA" stroke="#007D94" stroke-width="2"/><rect x="27" y="26" width="7" height="50" fill="#FEC50C" opacity=".85"/><circle cx="68" cy="48" r="9" fill="#FEC50C"/>` + rays(68, 48, 12, 17, 12, 2) + `<path d="M50 63 Q68 55 86 63 Q68 70 50 63Z" fill="#FEC50C"/>`,
      t: {
        ru: ['Флаг', 'На флаге Казахстана солнце и степной орёл на небесно-голубом фоне.'],
        kz: ['Мемлекеттік ту', 'Қазақстан туында аспан түстес өрісте күн мен қыран бейнеленген.'],
        en: ['Flag', 'The flag of Kazakhstan shows a sun and a steppe eagle on a sky-blue field.'],
        zh: ['国旗', '哈萨克斯坦国旗在天蓝色的底上有太阳和草原鹰。'],
        uz: ['Байроқ', 'Қозоғистон байроғида осмон ранг майдонда қуёш ва даштлар бургути тасвирланган.'],
        tg: ['Парчам', 'Дар парчами Қазоқистон офтоб ва уқоби дашт дар заминаи осмонӣ тасвир шудааст.'],
        ug: ['بايراق', 'قازاقىستان بايرىقىدا ئاسمان رەڭلىك يەرگە قۇياش ۋە دالا بۈركۈتى سىزىلغان.']
      } },
    { id: 'mountains', bg: '#CFE6FA',
      art: `<circle cx="26" cy="28" r="10" fill="#FFE08A"/><path d="M10 102 L40 52 L56 74 L76 22 L112 102Z" fill="#7A93BD" stroke="#4A6392" stroke-width="2.5" stroke-linejoin="round"/><path d="M76 22 L63 48 L71 44 L76 52 L82 43 L90 48Z" fill="#fff"/><path d="M40 52 L31 68 L38 64 L42 70 L48 63Z" fill="#fff"/>`,
      t: {
        ru: ['Хан-Тенгри', 'Хан-Тенгри — гора на границе Казахстана и Кыргызстана. Её высота больше семи тысяч метров.'],
        kz: ['Хан Тәңірі', 'Хан Тәңірі — Қазақстан мен Қырғызстан шекарасындағы тау. Оның биіктігі жеті мың метрден асады.'],
        en: ['Khan Tengri', 'Khan Tengri is a mountain on the border of Kazakhstan and Kyrgyzstan. It is more than seven thousand meters high.'],
        zh: ['汗腾格里峰', '汗腾格里峰在哈萨克斯坦和吉尔吉斯斯坦的边界上，高度超过七千米。'],
        uz: ['Хон-Тангри', 'Хон-Тангри — Қозоғистон ва Қирғизистон чегарасидаги тоғ. Унинг баландлиги етти минг метрдан ошади.'],
        tg: ['Хон-Тенгри', 'Хон-Тенгри — кӯҳ дар сарҳади Қазоқистон ва Қирғизистон. Баландии он аз ҳафт ҳазор метр зиёд аст.'],
        ug: ['خان تەڭرى', 'خان تەڭرى — قازاقىستان بىلەن قىرغىزىستان چېگراسىدىكى تاغ. ئۇنىڭ ئېگىزلىكى يەتتە مىڭ مېتىردىن ئاشىدۇ.']
      } },
    { id: 'baikonur', bg: '#1D3557',
      art: `<g fill="#fff"><circle cx="22" cy="24" r="2"/><circle cx="96" cy="30" r="2.4"/><circle cx="84" cy="14" r="1.6"/><circle cx="18" cy="70" r="1.8"/><circle cx="102" cy="76" r="2"/></g><path d="M60 14 C74 30 74 60 70 80 H50 C46 60 46 30 60 14Z" fill="#F1F5F9" stroke="#8FA3B8" stroke-width="2.5" stroke-linejoin="round"/><path d="M60 14 C66 22 70 30 71 38 H49 C50 30 54 22 60 14Z" fill="#E8584A"/><circle cx="60" cy="52" r="7" fill="#7CC4EE" stroke="#4A6392" stroke-width="2.5"/><path d="M50 66 L36 88 L50 82Z M70 66 L84 88 L70 82Z" fill="#E8584A" stroke="#B12F3A" stroke-width="2" stroke-linejoin="round"/><path d="M52 80 H68 L60 104Z" fill="#FFC93C"/><path d="M56 80 H64 L60 96Z" fill="#FF8A3C"/>`,
      t: {
        ru: ['Байконур', 'Байконур — космодром. Отсюда в 1961 году в космос полетел Юрий Гагарин.'],
        kz: ['Байқоңыр', 'Байқоңыр — ғарыш айлағы. Осы жерден 1961 жылы Юрий Гагарин ғарышқа ұшты.'],
        en: ['Baikonur', 'Baikonur is a spaceport. Yuri Gagarin flew into space from here in 1961.'],
        zh: ['拜科努尔', '拜科努尔是航天发射场，1961年尤里·加加林从这里飞向太空。'],
        uz: ['Байконур', 'Байконур — космодром. Бу ердан 1961 йилда Юрий Гагарин космосга учган.'],
        tg: ['Байконур', 'Байконур — кайҳонвард-майдон аст. Аз ин ҷо соли 1961 Юрий Гагарин ба кайҳон парвоз кард.'],
        ug: ['بايقوڭۇر', 'بايقوڭۇر — ئالەم پەرۋاز مەيدانى. 1961-يىلى يۇرىي گاگارىن بۇ يەردىن ئالەمگە ئۇچقان.']
      } },
    { id: 'balkhash', bg: '#FFF0CC',
      art: `<ellipse cx="60" cy="62" rx="50" ry="32" fill="#F2D08A"/><clipPath id="al-clip-balk"><ellipse cx="60" cy="62" rx="42" ry="25"/></clipPath><g clip-path="url(#al-clip-balk)"><rect x="12" y="30" width="48" height="64" fill="#3F8FD4"/><rect x="60" y="30" width="52" height="64" fill="#3FB088"/></g><ellipse cx="60" cy="62" rx="42" ry="25" fill="none" stroke="#fff" stroke-width="3"/><path d="M28 56 q5 -4 10 0 t10 0 M68 68 q5 -4 10 0 t10 0 M26 70 q5 -4 10 0 t10 0 M70 54 q5 -4 10 0 t10 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/>`,
      t: {
        ru: ['Озеро Балхаш', 'Озеро Балхаш особенное: вода в нём с одной стороны пресная, а с другой солёная.'],
        kz: ['Балқаш көлі', 'Балқаш көлі ерекше: оның бір жағының суы тұщы, екінші жағы тұзды.'],
        en: ['Lake Balkhash', 'Lake Balkhash is special: the water on one side is fresh and on the other side is salty.'],
        zh: ['巴尔喀什湖', '巴尔喀什湖很特别：一边的水是淡水，另一边的水是咸水。'],
        uz: ['Балхаш кўли', 'Балхаш кўли алоҳида: унинг бир тарафидаги сув чучук, иккинчи тарафидагиси шўр.'],
        tg: ['Кӯли Балхаш', 'Кӯли Балхаш хос аст: оби як тарафи он ширин, тарафи дигараш шӯр аст.'],
        ug: ['بالقاش كۆلى', 'بالقاش كۆلى ئالاھىدە: ئۇنىڭ بىر تەرىپىدىكى سۇ چۈچۈك، يەنە بىر تەرىپىدىكى سۇ شور.']
      } },
    { id: 'charyn', bg: '#FFD9B8',
      art: `<circle cx="92" cy="26" r="10" fill="#FFE08A"/><path d="M8 100 L8 70 L22 62 L26 46 L40 42 L44 58 L56 54 L60 38 L76 34 L80 54 L94 58 L98 72 L112 78 V100Z" fill="#C4572F" stroke="#8E3A1E" stroke-width="2.5" stroke-linejoin="round"/><path d="M26 46 V96 M40 42 V96 M60 38 V96 M76 34 V96 M94 58 V96" stroke="#8E3A1E" stroke-width="2" opacity=".5"/><rect x="8" y="92" width="104" height="16" fill="#E8B87A"/>`,
      t: {
        ru: ['Чарынский каньон', 'Чарынский каньон называют Долиной замков. Красные скалы похожи на башни и стены.'],
        kz: ['Шарын шатқалы', 'Шарын шатқалын «Сарайлар аңғары» дейді. Қызыл жартастар мұнара мен қабырғаға ұқсайды.'],
        en: ['Charyn Canyon', 'Charyn Canyon is called the Valley of Castles. The red rocks look like towers and walls.'],
        zh: ['恰伦大峡谷', '恰伦大峡谷被称为城堡谷，红色的岩石像塔楼和城墙。'],
        uz: ['Чарин каньони', 'Чарин каньонини Қасрлар водийси дейишади. Қизил қоялар минора ва деворларга ўхшайди.'],
        tg: ['Дараи Чарин', 'Дараи Чаринро Водии қалъаҳо меноманд. Сангҳои сурх ба бурҷу девор монанданд.'],
        ug: ['چارىن جىلغىسى', 'چارىن جىلغىسىنى قەسىرلەر جىلغىسى دەپ ئاتايدۇ. قىزىل قىيالار مۇنار ۋە تامغا ئوخشايدۇ.']
      } },
    { id: 'goldman', bg: '#FFF0CC',
      art: `<path d="M60 10 L84 74 H36Z" fill="#FFC93C" stroke="#C98A00" stroke-width="3" stroke-linejoin="round"/><path d="M60 22 L72 62 M60 22 L48 62" stroke="#C98A00" stroke-width="2" opacity=".6"/><g fill="#E8A800"><path d="M60 30 l5 10 h-10z"/><path d="M60 46 l6 12 h-12z"/></g><rect x="32" y="72" width="56" height="12" rx="4" fill="#E8A800" stroke="#C98A00" stroke-width="3"/><g fill="#fff" opacity=".9"><circle cx="42" cy="78" r="2.5"/><circle cx="52" cy="78" r="2.5"/><circle cx="62" cy="78" r="2.5"/><circle cx="72" cy="78" r="2.5"/><circle cx="82" cy="78" r="2.5"/></g><path d="M44 84 C46 100 74 100 76 84" fill="#FFC93C" stroke="#C98A00" stroke-width="3"/>`,
      t: {
        ru: ['Золотой человек', 'Золотой человек — воин древних саков. Его нашли в кургане Иссык, ему больше двух тысяч лет.'],
        kz: ['Алтын адам', 'Алтын адам — ежелгі сақ жауынгері. Оны Есік қорғанынан тапқан, ол екі мың жылдан астам бұрын өмір сүрген.'],
        en: ['Golden Man', 'The Golden Man was a warrior of the ancient Saka. He was found in the Issyk burial mound and lived over two thousand years ago.'],
        zh: ['黄金人', '黄金人是古代塞人的武士，在伊塞克古墓里被发现，已有两千多年。'],
        uz: ['Олтин одам', 'Олтин одам — қадимги сак жангчиси. У Иссиқ қўрғонидан топилган, икки минг йилдан ортиқ олдин яшаган.'],
        tg: ['Одами тиллоӣ', 'Одами тиллоӣ — ҷанговари сакҳои қадим. Ӯро дар теппаи Исик ёфтанд, зиёда аз ду ҳазор сол пеш зиндагӣ мекард.'],
        ug: ['ئالتۇن ئادەم', 'ئالتۇن ئادەم — قەدىمكى ساكلارنىڭ جەڭچىسى. ئۇ ئىسسىق قورغىنىدىن تېپىلغان، ئىككى مىڭ يىلدىن ئارتۇق ئىلگىرى ياشىغان.']
      } }
  ];

  /* ---------- тексты страницы и фразы Барсика (добавляются в словарь дома) ---------- */
  var UI = {
    ru: {
      attic_name: 'Чердак Барсика', album_h1: 'Альбом наклеек Казахстана', album_lbl: 'Мой альбом',
      album_count: 'Наклеек: {n} из {total}', album_next: 'До следующей наклейки: {n} ★',
      album_done_main: 'Все наклейки собраны!', album_done_sub: 'Скоро появятся новые.',
      album_locked: 'Нужно {n} ★', album_new: 'Новая!',
      album_hint: 'Нажми на наклейку, чтобы узнать о ней. Звёзды при этом не тратятся: наклейки открываются сами за звёзды, которые ты заработал.',
      say_album_in: 'Это мой чердак. Здесь я храню наклейки о Казахстане.',
      say_album_first: 'Пока наклеек нет. Давай поиграем, и первая появится!',
      say_album_new: 'Ура, новая наклейка! Открой её скорее!',
      say_album_open: 'Вот это находка!',
      say_album_locked: 'Эта наклейка ещё спрятана. Играй, и она откроется!',
      say_album_all: 'Ура, альбом полный! Я собрал всё о Казахстане.'
    },
    kz: {
      attic_name: 'Барсиктің шатыры', album_h1: 'Қазақстан жапсырмалар альбомы', album_lbl: 'Менің альбомым',
      album_count: 'Жапсырма: {n} / {total}', album_next: 'Келесі жапсырмаға дейін: {n} ★',
      album_done_main: 'Барлық жапсырма жиналды!', album_done_sub: 'Жақында жаңалары шығады.',
      album_locked: 'Керек: {n} ★', album_new: 'Жаңа!',
      album_hint: 'Жапсырманы басып, ол туралы біл. Жұлдыздар жұмсалмайды: жапсырмалар тапқан жұлдыздарың үшін өздігінен ашылады.',
      say_album_in: 'Бұл менің шатырым. Мұнда мен Қазақстан туралы жапсырмаларды сақтаймын.',
      say_album_first: 'Әзірге жапсырма жоқ. Ойнайық, сонда біріншісі пайда болады!',
      say_album_new: 'Ура, жаңа жапсырма! Тез ашып көр!',
      say_album_open: 'Мынау тамаша олжа!',
      say_album_locked: 'Бұл жапсырма әлі жасырулы. Ойна, сонда ол ашылады!',
      say_album_all: 'Ура, альбом толды! Мен Қазақстан туралы бәрін жинадым.'
    },
    en: {
      attic_name: "Barsik's Attic", album_h1: 'Kazakhstan sticker album', album_lbl: 'My album',
      album_count: 'Stickers: {n} of {total}', album_next: 'Until the next sticker: {n} ★',
      album_done_main: 'All stickers collected!', album_done_sub: 'New ones will appear soon.',
      album_locked: 'Needs {n} ★', album_new: 'New!',
      album_hint: 'Tap a sticker to learn about it. Stars are not spent: stickers open by themselves for the stars you have earned.',
      say_album_in: 'This is my attic. I keep stickers about Kazakhstan here.',
      say_album_first: "No stickers yet. Let's play, and the first one will appear!",
      say_album_new: 'Hooray, a new sticker! Open it quickly!',
      say_album_open: 'What a find!',
      say_album_locked: "This sticker is still hidden. Keep playing and it will open!",
      say_album_all: "Hooray, the album is full! I've collected everything about Kazakhstan."
    },
    zh: {
      attic_name: '巴雷斯的阁楼', album_h1: '哈萨克斯坦贴纸册', album_lbl: '我的贴纸册',
      album_count: '贴纸：{n} / {total}', album_next: '距离下一张贴纸：{n} ★',
      album_done_main: '所有贴纸都集齐了！', album_done_sub: '很快会有新的贴纸。',
      album_locked: '需要 {n} ★', album_new: '新！',
      album_hint: '点一点贴纸，了解它的故事。星星不会被花掉：贴纸会根据你赚到的星星自动解锁。',
      say_album_in: '这是我的阁楼，我把关于哈萨克斯坦的贴纸都放在这里。',
      say_album_first: '还没有贴纸。我们去玩吧，第一张很快就会出现！',
      say_album_new: '耶，有新贴纸啦！快打开看看！',
      say_album_open: '这个发现太棒了！',
      say_album_locked: '这张贴纸还藏着呢。继续玩，它就会打开！',
      say_album_all: '耶，贴纸册满啦！我集齐了关于哈萨克斯坦的一切。'
    },
    uz: {
      attic_name: 'Барсикнинг чордоғи', album_h1: 'Қозоғистон стикерлар альбоми', album_lbl: 'Менинг альбомим',
      album_count: 'Стикерлар: {n} / {total}', album_next: 'Кейинги стикергача: {n} ★',
      album_done_main: 'Барча стикерлар йиғилди!', album_done_sub: 'Яқинда янгилари чиқади.',
      album_locked: 'Керак: {n} ★', album_new: 'Янги!',
      album_hint: 'Стикерни босиб, у ҳақида бил. Юлдузлар сарфланмайди: стикерлар топган юлдузларинг учун ўзи очилади.',
      say_album_in: 'Бу менинг чордоғим. Бу ерда мен Қозоғистон ҳақидаги стикерларни сақлайман.',
      say_album_first: 'Ҳозирча стикер йўқ. Ўйнайлик, биринчиси пайдо бўлади!',
      say_album_new: 'Ура, янги стикер! Тезроқ оч!',
      say_album_open: 'Мана бу топилма!',
      say_album_locked: 'Бу стикер ҳали яширин. Ўйна, у очилади!',
      say_album_all: 'Ура, альбом тўлди! Мен Қозоғистон ҳақида ҳамма нарсани йиғдим.'
    },
    tg: {
      attic_name: 'Болохонаи Барсик', album_h1: 'Албоми стикерҳои Қазоқистон', album_lbl: 'Албоми ман',
      album_count: 'Стикерҳо: {n} аз {total}', album_next: 'То стикери навбатӣ: {n} ★',
      album_done_main: 'Ҳамаи стикерҳо ҷамъ шуданд!', album_done_sub: 'Ба қарибӣ нав пайдо мешаванд.',
      album_locked: 'Лозим: {n} ★', album_new: 'Нав!',
      album_hint: 'Стикерро пахш кун, то дар бораи он бифаҳмӣ. Ситораҳо харҷ намешаванд: стикерҳо барои ситораҳои ёфтаат худ аз худ кушода мешаванд.',
      say_album_in: 'Ин болохонаи ман аст. Ин ҷо ман стикерҳоро дар бораи Қазоқистон нигоҳ медорам.',
      say_album_first: 'Ҳоло стикер нест. Биёед бозӣ кунем, якумаш пайдо мешавад!',
      say_album_new: 'Ура, стикери нав! Зуд кушо!',
      say_album_open: 'Ин ёфтаи аҷоиб аст!',
      say_album_locked: 'Ин стикер ҳоло пинҳон аст. Бозӣ кун, кушода мешавад!',
      say_album_all: 'Ура, албом пур шуд! Ман ҳама чизро дар бораи Қазоқистон ҷамъ кардам.'
    },
    ug: {
      attic_name: 'بارىسنىڭ ئۆگزە ئۆيى', album_h1: 'قازاقىستان چاپلاقلار ئالبومى', album_lbl: 'مېنىڭ ئالبومۇم',
      album_count: 'چاپلاق: {total} دىن {n}', album_next: 'كېيىنكى چاپلاققىچە: {n} ★',
      album_done_main: 'بارلىق چاپلاقلار يىغىلدى!', album_done_sub: 'يېقىندا يېڭىلىرى چىقىدۇ.',
      album_locked: 'لازىم: {n} ★', album_new: 'يېڭى!',
      album_hint: 'چاپلاقنى چېكىپ ئۇنىڭ ھەققىدە بىلىڭ. يۇلتۇزلار خەجلەنمەيدۇ: چاپلاقلار تاپقان يۇلتۇزىڭىزغا ئاساسەن ئۆزلىكىدىن ئېچىلىدۇ.',
      say_album_in: 'بۇ مېنىڭ ئۆگزە ئۆيۈم. مەن بۇ يەردە قازاقىستان توغرىسىدىكى چاپلاقلارنى ساقلايمەن.',
      say_album_first: 'ھازىرچە چاپلاق يوق. ئوينايلى، بىرىنچىسى چىقىدۇ!',
      say_album_new: 'ھە، يېڭى چاپلاق! تېزرەك ئېچىڭ!',
      say_album_open: 'مانا بۇ ئېسىل تېپىلما!',
      say_album_locked: 'بۇ چاپلاق تېخى يوشۇرۇن. ئوينىسىڭىز، ئېچىلىدۇ!',
      say_album_all: 'ھە، ئالبوم توشتى! مەن قازاقىستان توغرىسىدىكى ھەممە نەرسىنى يىغدىم.'
    }
  };

  var H = window.HI;
  if (H && H.T){
    Object.keys(UI).forEach(function(l){ if (H.T[l]) for (var k in UI[l]) H.T[l][k] = UI[l][k]; });
  }
  window.ALBUM_STICKERS = S;
  window.ALBUM_UI = UI;
})();
