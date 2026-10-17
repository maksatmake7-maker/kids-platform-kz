/* ===== Білім Аралы — голос Барсика для игр (клипы + запасной синтез) =====
   Игры генерируют задания случайно, поэтому озвучка собирается из КОРОТКИХ клипов:
   числа 0–20 и несколько десятков фраз. Один раз записали (мужской голос ElevenLabs) — работает для любых заданий.
   mp3 лежат в assets/audio/barsik/<язык>/<id>.mp3 (ru, kz, en). Нет mp3 → говорит браузер (голос выбираем мужской).
   Другие языки сайта пока озвучиваются по-русски (см. lang()).
*/
(function(){
  var NUM = {
    ru: ['ноль','один','два','три','четыре','пять','шесть','семь','восемь','девять','десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать','двадцать'],
    kz: ['нөл','бір','екі','үш','төрт','бес','алты','жеті','сегіз','тоғыз','он','он бір','он екі','он үш','он төрт','он бес','он алты','он жеті','он сегіз','он тоғыз','жиырма'],
    en: ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty']
  };
  var NUMX = {   // круглые десятки 30–100 (клипы n30…n100)
    ru: {30:'тридцать',40:'сорок',50:'пятьдесят',60:'шестьдесят',70:'семьдесят',80:'восемьдесят',90:'девяносто',100:'сто'},
    kz: {30:'отыз',40:'қырық',50:'елу',60:'алпыс',70:'жетпіс',80:'сексен',90:'тоқсан',100:'жүз'},
    en: {30:'thirty',40:'forty',50:'fifty',60:'sixty',70:'seventy',80:'eighty',90:'ninety',100:'one hundred'}
  };
  function numText(L, n){ return n <= 20 ? NUM[L][n] : NUMX[L][n]; }
  var F = {
    ru: {
      howmuch:'Сколько будет', plus:'плюс', minus:'минус', eq:'равно', ne:'не равно', gt:'больше, чем', lt:'меньше, чем',
      howmany:'Сколько всего?', left:'Сколько осталось?', count:'Посчитай!', put:'Положи в корзину столько:',
      inbasket:'В корзине', needbe:'Нужно, чтобы стало', addmiss:'Добавь, сколько не хватает.',
      missing:'Какое число спряталось?', pickSign:'Выбери знак.', pop:'Лопни столько шаров:', blank:'сколько',
      look:'Смотри!', tapall:'Нажми на каждый предмет.', fly:'Улетают шарики!', which:'Что больше?', ready:'Нажми на галочку, когда будет готово.',
      tengeq:'Сколько тенге?', pay:'Заплати', tenge:'тенге', collect:'Собери из монет', clockq:'Который час?', setclock:'Покажи стрелкой на часах', matchclock:'Найди такие часы',
      half:'Найди половину числа', deal:'Раздай поровну, по одному каждому.', oneplate:'Сколько в одной тарелке?', breakbar:'Разломи шоколадку пополам.', tensin:'Сколько десятков в числе', countten:'Считай десятками!',
      onesin:'Сколько единиц в числе', wheremore:'Где больше?', whereless:'Где меньше?', same:'Поровну.', makeeq:'Сделай поровну: добавь или убери.',
      frogjump:'На сколько прыгает лягушка?', next:'Какое число следующее?', findshape:'Найди:', whatis:'Что это?', findclosed:'Найди замкнутую линию.', findopen:'Найди незамкнутую линию.',
      sh_tochka:'Точка', sh_pryamaya:'Прямая', sh_krivaya:'Кривая', sh_lomanaya:'Ломаная', sh_otrezok:'Отрезок', sh_luch:'Луч', sh_ugol:'Угол', sh_closed:'Замкнутая линия', sh_open:'Незамкнутая линия',
      measq:'Длина, масса или объём?', instq:'Чем это измерить?', unitq:'В чём это измеряют?', cmq:'Сколько сантиметров?', kgq:'Сколько килограммов?', lq:'Сколько литров?', dmq:'Сколько сантиметров в одном дециметре?', result:'Получается', m_length:'Длина.', m_mass:'Масса.', m_volume:'Объём.',
      was:'Было', addmore:'Добавили ещё', tookaway:'Забрали', howmanynow:'Сколько стало?', firstbox:'В первой коробке', secondbox:'А во второй на', morek:'больше.', lessk:'меньше.', howsecond:'Сколько во второй коробке?', whichop:'Какое действие подходит?',
      nextbead:'Какая бусина следующая?', missbead:'Какая бусина спряталась?', buildbeads:'Продолжи узор: выбери две бусины.', repeats:'Смотри, как повторяется узор!',
      tfq:'Верно или неверно?', findwrong:'Найди неверное равенство.', findright:'Найди верное равенство.',
      flatq:'Плоская или пространственная?', findflat:'Найди плоскую фигуру.', findsolid:'Найди пространственную фигуру.', sortq:'Разложи по корзинам.', flatsay:'Плоская фигура — как рисунок на бумаге.', solidsay:'Пространственную фигуру можно взять в руки.',
      n_root:'Корень', n_stem:'Стебель', n_leaf:'Лист', n_flower:'Цветок', n_fruit:'Плод', n_seed:'Семя',
      n_wheat:'Пшеница', n_carrot:'Морковь', n_tomato:'Помидор', n_potato:'Картофель', n_sunflower:'Подсолнух', n_spruce:'Ель', n_cactus:'Кактус', n_grass:'Трава', n_clover:'Клевер', n_daisy:'Ромашка',
      n_lion:'Лев', n_wolf:'Волк', n_fox:'Лиса', n_bear:'Медведь', n_deer:'Олень', n_cow:'Корова', n_sheep:'Овца', n_hen:'Курица', n_dog:'Собака', n_cat:'Кошка',
      n_swan:'Лебедь', n_duck:'Утка', n_bird:'Птица', n_squirrel:'Белка', n_hamster:'Хомяк', n_ant:'Муравей', n_hedgehog:'Ёж', n_bat:'Летучая мышь',
      n_water:'Вода', n_sun:'Свет', n_warmth:'Тепло', n_candy:'Конфета', n_toy:'Игрушка', n_phone:'Телефон', n_console:'Игровая приставка', n_shoes:'Кроссовки', n_ball:'Мяч', n_car:'Машина',
      findpart:'Найди часть растения:', namepart:'Как называется эта часть?', missingpart:'Какой части не хватает?',
      wildcultq:'Дикорастущее или культурное?', wildanimalq:'Дикое или домашнее?', needq:'Нужно это растению?', adaptq:'Как это животное переживает зиму?',
      findwild:'Найди дикорастущее растение.', findcult:'Найди культурное растение.', findwildan:'Найди дикое животное.', finddomestic:'Найди домашнее животное.',
      sortplants:'Разложи растения: дикие и культурные.', sortanimals:'Разложи животных: дикие и домашние.', sortwinter:'Как кто зимует? Разложи по местам.',
      wholives:'Кто здесь живёт?', givegrow:'Выбери всё, что нужно растению, чтобы расти.', whatlacks:'Растению плохо. Чего ему не хватает?',
      whomigrate:'Кто улетает на юг?', whostore:'Кто запасает корм на зиму?', whosleep:'Кто спит всю зиму?',
      wildsay:'Дикорастущее растение растёт само, без помощи человека.', cultsay:'Культурное растение сажает и выращивает человек.',
      wildansay:'Дикое животное живёт на воле и само добывает еду.', domsay:'Домашнее животное живёт рядом с человеком, он о нём заботится.',
      needsay:'Растению нужны вода, свет и тепло.', notneedsay:'Растению это не нужно.',
      a_migration:'Улетает в тёплые края.', a_foodstore:'Запасает корм на зиму.', a_hibernate:'Спит всю зиму.',
      lack_water:'Нужна вода.', lack_light:'Нужен свет.', lack_warm:'Нужно тепло.'
    },
    kz: {
      howmuch:'неше болады?', plus:'плюс', minus:'минус', eq:'тең', ne:'тең емес', gt:'артық', lt:'кем',
      howmany:'Барлығы неше?', left:'Неше қалды?', count:'Санап көр!', put:'Себетке мынаны сал:',
      inbasket:'Себетте', needbe:'болуы керек', addmiss:'Жетпегенін қос.',
      missing:'Қай сан жасырынды?', pickSign:'Белгіні таңда.', pop:'Мына санша шарды жар:', blank:'қанша',
      look:'Қарашы!', tapall:'Әр затқа бас.', fly:'Шарлар ұшып барады!', which:'Қайсысы көп?', ready:'Дайын болғанда құсбелгіні бас.',
      tengeq:'Неше теңге?', pay:'төле', tenge:'теңге', collect:'Монеталардан жина', clockq:'Сағат неше?', setclock:'Сағатта көрсет', matchclock:'Мынадай сағатты тап',
      half:'санының жартысын тап', deal:'Тең бөл, әрқайсысына біреуден бер.', oneplate:'Бір тәрелкеде қанша?', breakbar:'Шоколадты екіге бөл.', tensin:'санында неше ондық бар?', countten:'Ондықтап санайық!',
      onesin:'санында неше бірлік бар?', wheremore:'Қайсысында көп?', whereless:'Қайсысында аз?', same:'Тең.', makeeq:'Тең ет: қос немесе ал.',
      frogjump:'Бақа қанша секіреді?', next:'Келесі сан қандай?', findshape:'тап', whatis:'Бұл не?', findclosed:'Тұйық сызықты тап.', findopen:'Ашық сызықты тап.',
      sh_tochka:'Нүкте', sh_pryamaya:'Түзу', sh_krivaya:'Қисық', sh_lomanaya:'Сынық сызық', sh_otrezok:'Кесінді', sh_luch:'Сәуле', sh_ugol:'Бұрыш', sh_closed:'Тұйық сызық', sh_open:'Ашық сызық',
      measq:'Ұзындық, масса немесе көлем?', instq:'Мұны немен өлшейміз?', unitq:'Бұл қандай өлшеммен өлшенеді?', cmq:'Неше сантиметр?', kgq:'Неше килограмм?', lq:'Неше литр?', dmq:'Бір дециметрде неше сантиметр бар?', result:'Шығады', m_length:'Ұзындық.', m_mass:'Масса.', m_volume:'Көлем.',
      was:'Бастапқыда', wasend:'болды.', addmore:'Тағы', addend:'қосты.', tookaway:'алып кетті.', howmanynow:'Қанша болды?', firstbox:'Бірінші қорапта', secondbox:'Екінші қорапта одан', morek:'артық.', lessk:'кем.', howsecond:'Екінші қорапта неше?', whichop:'Қандай амал керек?',
      nextbead:'Келесі моншақ қандай?', missbead:'Қай моншақ жасырынды?', buildbeads:'Өрнекті жалғастыр: екі моншақ таңда.', repeats:'Қарашы, өрнек қалай қайталанады!',
      tfq:'Дұрыс па, бұрыс па?', findwrong:'Бұрыс теңдікті тап.', findright:'Дұрыс теңдікті тап.',
      flatq:'Жазық па, көлемді ме?', findflat:'Жазық фигураны тап.', findsolid:'Көлемді фигураны тап.', sortq:'Себеттерге бөл.', flatsay:'Жазық фигура — қағаздағы сурет сияқты.', solidsay:'Көлемді фигураны қолға алуға болады.',
      n_root:'Тамыр', n_stem:'Сабақ', n_leaf:'Жапырақ', n_flower:'Гүл', n_fruit:'Жеміс', n_seed:'Тұқым',
      n_wheat:'Бидай', n_carrot:'Сәбіз', n_tomato:'Қызанақ', n_potato:'Картоп', n_sunflower:'Күнбағыс', n_spruce:'Шырша', n_cactus:'Кактус', n_grass:'Шөп', n_clover:'Беде', n_daisy:'Түймедақ',
      n_lion:'Арыстан', n_wolf:'Қасқыр', n_fox:'Түлкі', n_bear:'Аю', n_deer:'Бұғы', n_cow:'Сиыр', n_sheep:'Қой', n_hen:'Тауық', n_dog:'Ит', n_cat:'Мысық',
      n_swan:'Аққу', n_duck:'Үйрек', n_bird:'Құс', n_squirrel:'Тиін', n_hamster:'Хомяк', n_ant:'Құмырсқа', n_hedgehog:'Кірпі', n_bat:'Жарқанат',
      n_water:'Су', n_sun:'Жарық', n_warmth:'Жылу', n_candy:'Кәмпит', n_toy:'Ойыншық', n_phone:'Телефон', n_console:'Ойын приставкасы', n_shoes:'Кроссовка', n_ball:'Доп', n_car:'Көлік',
      findpart:'Өсімдіктің бөлігін тап:', namepart:'Бұл бөлік қалай аталады?', missingpart:'Қай бөлігі жетіспейді?',
      wildcultq:'Жабайы ма, мәдени ме?', wildanimalq:'Жабайы ма, үй жануары ма?', needq:'Бұл өсімдікке керек пе?', adaptq:'Бұл жануар қысты қалай өткізеді?',
      findwild:'Жабайы өсімдікті тап.', findcult:'Мәдени өсімдікті тап.', findwildan:'Жабайы жануарды тап.', finddomestic:'Үй жануарын тап.',
      sortplants:'Өсімдіктерді бөл: жабайы және мәдени.', sortanimals:'Жануарларды бөл: жабайы және үй жануарлары.', sortwinter:'Қысты қалай өткізеді? Орындарына қой.',
      wholives:'Мұнда кім тұрады?', givegrow:'Өсімдіктің өсуіне керектінің бәрін таңда.', whatlacks:'Өсімдікке жаман. Оған не жетіспейді?',
      whomigrate:'Кім оңтүстікке ұшады?', whostore:'Кім қысқа жем жинайды?', whosleep:'Кім бүкіл қыс ұйықтайды?',
      wildsay:'Жабайы өсімдік өздігінен өседі, адамның көмегінсіз.', cultsay:'Мәдени өсімдікті адам егеді және өсіреді.',
      wildansay:'Жабайы жануар еркін өмір сүреді, жемді өзі табады.', domsay:'Үй жануары адамның қасында тұрады, оған адам қамқор болады.',
      needsay:'Өсімдікке су, жарық және жылу керек.', notneedsay:'Бұл өсімдікке керек емес.',
      a_migration:'Жылы жаққа ұшады.', a_foodstore:'Қысқа жем жинайды.', a_hibernate:'Бүкіл қыс ұйықтайды.',
      lack_water:'Су керек.', lack_light:'Жарық керек.', lack_warm:'Жылу керек.'
    },
    en: {
      howmuch:'How much is', plus:'plus', minus:'minus', eq:'equals', ne:'is not equal to', gt:'is greater than', lt:'is less than',
      howmany:'How many in all?', left:'How many are left?', count:'Count them!', put:'Put this many in the basket:',
      inbasket:'In the basket there are', needbe:'We need', addmiss:'Add what is missing.',
      missing:'Which number is hiding?', pickSign:'Pick the sign.', pop:'Pop this many balloons:', blank:'how many',
      look:'Look!', tapall:'Tap every item.', fly:'The balloons fly away!', which:'Which is more?', ready:'Press the check mark when ready.',
      tengeq:'How many tenge?', pay:'Pay', tenge:'tenge', collect:'Make with coins', clockq:'What time is it?', setclock:'Show on the clock', matchclock:'Find this clock',
      half:'Find half of', deal:'Share equally, one for each.', oneplate:'How many on one plate?', breakbar:'Break the chocolate in half.', tensin:'How many tens in', countten:'Count by tens!',
      onesin:'How many ones in', wheremore:'Which has more?', whereless:'Which has fewer?', same:'Equal.', makeeq:'Make them equal: add or remove.',
      frogjump:'How far does the frog jump?', next:'What number comes next?', findshape:'Find:', whatis:'What is this?', findclosed:'Find the closed line.', findopen:'Find the open line.',
      sh_tochka:'Point', sh_pryamaya:'Straight line', sh_krivaya:'Curve', sh_lomanaya:'Broken line', sh_otrezok:'Segment', sh_luch:'Ray', sh_ugol:'Angle', sh_closed:'Closed line', sh_open:'Open line',
      measq:'Length, mass or volume?', instq:'What do we measure it with?', unitq:'What unit measures it?', cmq:'How many centimetres?', kgq:'How many kilograms?', lq:'How many litres?', dmq:'How many centimetres in one decimetre?', result:'It is', m_length:'Length.', m_mass:'Mass.', m_volume:'Volume.',
      was:'There were', addmore:'more were added.', tookaway:'were taken away.', howmanynow:'How many are there now?', firstbox:'The first box has', secondbox:'The second box has', morek:'more.', lessk:'fewer.', howsecond:'How many are in the second box?', whichop:'Which operation fits?',
      nextbead:'Which bead comes next?', missbead:'Which bead is hiding?', buildbeads:'Continue the pattern: choose two beads.', repeats:'Look how the pattern repeats!',
      tfq:'True or false?', findwrong:'Find the false equation.', findright:'Find the true equation.',
      flatq:'Flat or solid?', findflat:'Find the flat shape.', findsolid:'Find the solid shape.', sortq:'Sort into the baskets.', flatsay:'A flat shape is like a drawing on paper.', solidsay:'A solid shape can be held in your hands.',
      n_root:'Root', n_stem:'Stem', n_leaf:'Leaf', n_flower:'Flower', n_fruit:'Fruit', n_seed:'Seed',
      n_wheat:'Wheat', n_carrot:'Carrot', n_tomato:'Tomato', n_potato:'Potato', n_sunflower:'Sunflower', n_spruce:'Spruce', n_cactus:'Cactus', n_grass:'Grass', n_clover:'Clover', n_daisy:'Daisy',
      n_lion:'Lion', n_wolf:'Wolf', n_fox:'Fox', n_bear:'Bear', n_deer:'Deer', n_cow:'Cow', n_sheep:'Sheep', n_hen:'Hen', n_dog:'Dog', n_cat:'Cat',
      n_swan:'Swan', n_duck:'Duck', n_bird:'Bird', n_squirrel:'Squirrel', n_hamster:'Hamster', n_ant:'Ant', n_hedgehog:'Hedgehog', n_bat:'Bat',
      n_water:'Water', n_sun:'Light', n_warmth:'Warmth', n_candy:'Candy', n_toy:'Toy', n_phone:'Phone', n_console:'Game console', n_shoes:'Sneakers', n_ball:'Ball', n_car:'Car',
      findpart:'Find the plant part:', namepart:'What is this part called?', missingpart:'Which part is missing?',
      wildcultq:'Wild or cultivated?', wildanimalq:'Wild or domestic?', needq:'Does the plant need this?', adaptq:'How does this animal get through winter?',
      findwild:'Find the wild plant.', findcult:'Find the cultivated plant.', findwildan:'Find the wild animal.', finddomestic:'Find the domestic animal.',
      sortplants:'Sort the plants: wild and cultivated.', sortanimals:'Sort the animals: wild and domestic.', sortwinter:'How does each one spend winter? Sort them.',
      wholives:'Who lives here?', givegrow:'Choose everything the plant needs to grow.', whatlacks:'The plant is not well. What is missing?',
      whomigrate:'Who flies away south?', whostore:'Who stores food for winter?', whosleep:'Who sleeps all winter?',
      wildsay:'A wild plant grows by itself, without help from people.', cultsay:'A cultivated plant is planted and grown by people.',
      wildansay:'A wild animal lives free and finds its own food.', domsay:'A domestic animal lives near people, and people take care of it.',
      needsay:'A plant needs water, light and warmth.', notneedsay:'The plant does not need this.',
      a_migration:'It flies to warm lands.', a_foodstore:'It stores food for winter.', a_hibernate:'It sleeps all winter.',
      lack_water:'It needs water.', lack_light:'It needs light.', lack_warm:'It needs warmth.'
    }
  };
  var PRAISE = {
    ru: ['Молодец!','Отлично!','Ура, правильно!','Супер!','Так держать!'],
    kz: ['Жарайсың!','Керемет!','Ура, дұрыс!','Тамаша!','Өте жақсы!'],
    en: ['Well done!','Great job!','Hooray, correct!','Super!','Keep it up!']
  };
  var OOPS = {
    ru: ['Ой! Не страшно, давай разберёмся.','Почти! Смотри, как надо.','Ничего, ошибаться полезно. Смотри!'],
    kz: ['Ой! Қорықпа, бірге қарайық.','Сәл қалды! Қара, былай.','Ештеңе етпейді, қателесу пайдалы. Қарашы!'],
    en: ['Oops! No worries, let us see.','Almost! Look how it works.','It is fine to make mistakes. Look!']
  };
  var MISC = {
    ru: { intro:'Привет! Я Барсик. Давай играть!', level:'Новый уровень! Ты молодец!', win:'Ура! Ты справился! Вот твоё сокровище!', sticker:'Тебе новый стикер!' },
    kz: { intro:'Сәлем! Мен Барсикпін. Ойнайық!', level:'Жаңа деңгей! Жарайсың!', win:'Ура! Сен жасадың! Міне, қазына!', sticker:'Саған жаңа стикер!' },
    en: { intro:'Hi! I am Barsik. Let us play!', level:'New level! Well done!', win:'Hooray! You did it! Here is your treasure!', sticker:'A new sticker for you!' }
  };

  /* Шаблоны фраз. Элементы массива: число (0–20) | '+' '−' '=' '≠' '<' '>' | '?' (пропуск) | 'f:ключ' (фрагмент).
     Порядок слов в казахском другой — поэтому шаблоны свои для каждого языка. */
  var TPL = {
    ru: {
      sum:   function(v){ return ['f:howmuch', v.a, '+', v.b]; },
      expr:  function(v){ return v.tokens.concat(v.q ? ['f:'+v.q] : []); },
      put:   function(v){ return ['f:put', v.n]; },
      putsum:function(v){ return ['f:put', v.a, '+', v.b]; },
      addmiss:function(v){ return ['f:inbasket', v.a, 'f:needbe', v.c, 'f:addmiss']; },
      pop:   function(v){ return ['f:pop', v.n]; },
      payx:  function(v){ return ['f:pay', v.n, 'f:tenge']; },
      collect:function(v){ return ['f:collect', v.n, 'f:tenge']; },
      setclock:function(v){ return ['f:setclock', v.n]; },
      matchclock:function(v){ return ['f:matchclock', v.n]; },
      half:  function(v){ return ['f:half', v.n]; },
      tensin:function(v){ return ['f:tensin', v.n]; },
      findshape:function(v){ return ['f:findshape', 'f:sh_'+v.k]; },
      onesin:function(v){ return ['f:onesin', v.n]; },
      story: function(v){
        var r = v.k === 'add' ? ['f:was', v.a, 'f:addmore', v.b] : v.k === 'sub' ? ['f:was', v.a, 'f:tookaway', v.b] : ['f:firstbox', v.a, 'f:secondbox', v.b, v.k === 'more' ? 'f:morek' : 'f:lessk'];
        if(!v.noq) r.push(v.k === 'add' ? 'f:howmanynow' : v.k === 'sub' ? 'f:left' : 'f:howsecond');
        return r; },
      findpart:function(v){ return ['f:findpart', 'f:n_'+v.k]; },
      named: function(v){ return ['f:n_'+v.n].concat(v.q ? ['f:'+v.q] : []); },
      q:     function(v){ return ['f:'+v.k]; }
    },
    kz: {
      sum:   function(v){ return [v.a, '+', v.b, 'f:howmuch']; },
      expr:  function(v){ return v.tokens.concat(v.q ? ['f:'+v.q] : []); },
      put:   function(v){ return ['f:put', v.n]; },
      putsum:function(v){ return ['f:put', v.a, '+', v.b]; },
      addmiss:function(v){ return ['f:inbasket', v.a, '.', v.c, 'f:needbe', 'f:addmiss']; },
      pop:   function(v){ return ['f:pop', v.n]; },
      payx:  function(v){ return [v.n, 'f:tenge', 'f:pay']; },
      collect:function(v){ return [v.n, 'f:tenge', 'f:collect']; },
      setclock:function(v){ return [v.n, 'f:setclock']; },
      matchclock:function(v){ return [v.n, 'f:matchclock']; },
      half:  function(v){ return [v.n, 'f:half']; },
      tensin:function(v){ return [v.n, 'f:tensin']; },
      findshape:function(v){ return ['f:sh_'+v.k, 'f:findshape']; },
      onesin:function(v){ return [v.n, 'f:onesin']; },
      story: function(v){
        var r = v.k === 'add' ? ['f:was', v.a, 'f:wasend', 'f:addmore', v.b, 'f:addend'] : v.k === 'sub' ? ['f:was', v.a, 'f:wasend', v.b, 'f:tookaway'] : ['f:firstbox', v.a, 'f:secondbox', v.b, v.k === 'more' ? 'f:morek' : 'f:lessk'];
        if(!v.noq) r.push(v.k === 'add' ? 'f:howmanynow' : v.k === 'sub' ? 'f:left' : 'f:howsecond');
        return r; },
      findpart:function(v){ return ['f:findpart', 'f:n_'+v.k]; },
      named: function(v){ return ['f:n_'+v.n].concat(v.q ? ['f:'+v.q] : []); },
      q:     function(v){ return ['f:'+v.k]; }
    },
    en: {
      sum:   function(v){ return ['f:howmuch', v.a, '+', v.b]; },
      expr:  function(v){ return v.tokens.concat(v.q ? ['f:'+v.q] : []); },
      put:   function(v){ return ['f:put', v.n]; },
      putsum:function(v){ return ['f:put', v.a, '+', v.b]; },
      addmiss:function(v){ return ['f:inbasket', v.a, '.', 'f:needbe', v.c, 'f:addmiss']; },
      pop:   function(v){ return ['f:pop', v.n]; },
      payx:  function(v){ return ['f:pay', v.n, 'f:tenge']; },
      collect:function(v){ return ['f:collect', v.n, 'f:tenge']; },
      setclock:function(v){ return ['f:setclock', v.n]; },
      matchclock:function(v){ return ['f:matchclock', v.n]; },
      half:  function(v){ return ['f:half', v.n]; },
      tensin:function(v){ return ['f:tensin', v.n]; },
      findshape:function(v){ return ['f:findshape', 'f:sh_'+v.k]; },
      onesin:function(v){ return ['f:onesin', v.n]; },
      story: function(v){
        var r = v.k === 'add' ? ['f:was', v.a, '.', v.b, 'f:addmore'] : v.k === 'sub' ? ['f:was', v.a, '.', v.b, 'f:tookaway'] : ['f:firstbox', v.a, '.', 'f:secondbox', v.b, v.k === 'more' ? 'f:morek' : 'f:lessk'];
        if(!v.noq) r.push(v.k === 'add' ? 'f:howmanynow' : v.k === 'sub' ? 'f:left' : 'f:howsecond');
        return r; },
      findpart:function(v){ return ['f:findpart', 'f:n_'+v.k]; },
      named: function(v){ return ['f:n_'+v.n].concat(v.q ? ['f:'+v.q] : []); },
      q:     function(v){ return ['f:'+v.k]; }
    }
  };
  var SYM = { '+':'plus', '−':'minus', '-':'minus', '=':'eq', '≠':'ne', '<':'lt', '>':'gt', '?':'blank', '☐':'blank' };

  function lang(){
    var l = document.documentElement.getAttribute('data-current') || 'ru';
    return (l === 'kz' || l === 'en') ? l : 'ru';
  }
  // список всех клипов языка: [{id,text}]
  function allClips(L){
    var out = [];
    NUM[L].forEach(function(t,i){ out.push({id:'n'+i, text:t, group:'числа'}); });
    Object.keys(NUMX[L]).forEach(function(k){ out.push({id:'n'+k, text:NUMX[L][k], group:'числа'}); });
    Object.keys(F[L]).forEach(function(k){ out.push({id:'f_'+k, text:F[L][k], group:'фразы'}); });
    PRAISE[L].forEach(function(t,i){ out.push({id:'praise'+i, text:t, group:'похвала'}); });
    OOPS[L].forEach(function(t,i){ out.push({id:'oops'+i, text:t, group:'ошибка'}); });
    Object.keys(MISC[L]).forEach(function(k){ out.push({id:'m_'+k, text:MISC[L][k], group:'события'}); });
    return out;
  }
  // число → один клип (0–20, круглые десятки) или два: «тридцать» + «пять»
  function pushNum(L, r, n){
    if(numText(L,n)){ r.push({id:'n'+n, text:numText(L,n)}); return; }
    if(n > 20 && n < 100){ var te = Math.floor(n/10)*10, on = n % 10; r.push({id:'n'+te, text:numText(L,te)}); if(on) r.push({id:'n'+on, text:numText(L,on)}); }
  }
  // токены → клипы [{id,text}]
  function clips(tokens, L){
    L = L || lang(); var r = [];
    tokens.forEach(function(t){
      if(typeof t === 'number'){ pushNum(L, r, t); return; }
      if(t === '.'){ return; }
      if(typeof t === 'string' && t.indexOf('f:') === 0){ var k = t.slice(2); if(F[L][k]) r.push({id:'f_'+k, text:F[L][k]}); return; }
      if(SYM[t]){ var key = SYM[t]; if(F[L][key]) r.push({id:'f_'+key, text:F[L][key]}); return; }
      if(typeof t === 'string' && /^\d+$/.test(t)){ pushNum(L, r, +t); return; }
      if(t && t.id) r.push(t);
    });
    return r;
  }
  function tpl(name, vars){ var L = lang(); return TPL[L][name](vars || {}); }
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function praise(){ var L = lang(), i = Math.floor(Math.random()*PRAISE[L].length); return [{id:'praise'+i, text:PRAISE[L][i]}]; }
  function oops(){ var L = lang(), i = Math.floor(Math.random()*OOPS[L].length); return [{id:'oops'+i, text:OOPS[L][i]}]; }
  function misc(k){ var L = lang(); return [{id:'m_'+k, text:MISC[L][k]}]; }

  /* ----- воспроизведение ----- */
  var base = (window.__mxBase || '../../../games/') + '../assets/audio/barsik/';
  var token = 0, curAudio = null, enabled = true;
  try { enabled = localStorage.getItem('bilim_mx_snd') !== '0'; } catch(e){}

  var MALE_RE = /pavel|dmitri|dmitry|dmitriy|yuri|yury|maxim|ivan|aleksandr|alexander|mikhail|boris|павел|дмитр|юри|максим|иван|александр|михаил|борис|male|мужск|daniel|david|james|google uk english male/i;
  var FEMALE_RE = /milena|alena|katya|svetlana|dariya|daria|irina|tatyana|elena|anna|female|женск|милена|алён|алена|катя|светлан|дарь|ирин|татьян|елен|анна|samantha|zira|susan/i;
  function bestVoice(L){
    if(!window.speechSynthesis) return null;
    var code = L === 'en' ? 'en' : (L === 'kz' ? 'kk' : 'ru');
    var vs = speechSynthesis.getVoices().filter(function(v){ return (v.lang||'').toLowerCase().indexOf(code) === 0; });
    if(!vs.length && L === 'kz') vs = speechSynthesis.getVoices().filter(function(v){ return (v.lang||'').toLowerCase().indexOf('ru') === 0; });
    var best = null, bs = -99;
    vs.forEach(function(v){
      var s = (MALE_RE.test(v.name)?20:0) - (FEMALE_RE.test(v.name)?8:0) + (/natural|online|neural/i.test(v.name)?4:0) + (!v.localService?1:0);
      if(s > bs){ bs = s; best = v; }
    });
    return best;
  }
  if(window.speechSynthesis && speechSynthesis.addEventListener){ try { speechSynthesis.addEventListener('voiceschanged', function(){}); speechSynthesis.getVoices(); } catch(e){} }

  function stop(){
    token++;
    if(curAudio){ try { curAudio.pause(); } catch(e){} curAudio = null; }
    if(window.speechSynthesis){ try { speechSynthesis.cancel(); } catch(e){} }
  }
  // say(clips, {onstart,onend}) → вернёт Promise
  function say(cl, o){
    o = o || {};
    stop();
    var tok = token, L = lang();
    return new Promise(function(resolve){
      if(!enabled || !cl.length){ resolve(); return; }
      if(o.onstart) o.onstart();
      var finished = false;
      var done = function(){ if(finished) return; finished = true; if(tok === token && o.onend) o.onend(); resolve(); };
      setTimeout(function(){ if(!finished && tok === token){ try { if(curAudio) curAudio.pause(); if(window.speechSynthesis) speechSynthesis.cancel(); } catch(e){} done(); } }, 1600*cl.length + 2500);   // страховка: озвучка не должна подвешивать игру
      var i = 0, fellBack = false;
      var tts = function(from){
        if(fellBack) return; fellBack = true;
        if(tok !== token || !window.speechSynthesis) return done();
        var text = cl.slice(from).map(function(c){ return c.text; }).join(', ');
        var u = new SpeechSynthesisUtterance(text);
        u.lang = L === 'en' ? 'en-US' : (L === 'kz' ? 'kk-KZ' : 'ru-RU'); u.rate = .9; u.pitch = 1;
        var v = bestVoice(L); if(v){ u.voice = v; u.lang = v.lang; }
        if(!v || !MALE_RE.test(v.name)) u.pitch = .85;   // нет мужского голоса → чуть ниже тон (сильнее нельзя: звучит жутко)
        u.onend = done; u.onerror = done;
        speechSynthesis.speak(u);
      };
      (function next(){
        if(tok !== token) return resolve();
        if(i >= cl.length) return done();
        var a = new Audio(base + L + '/' + cl[i].id + '.mp3');
        curAudio = a;
        var from = i;
        a.onended = function(){ i++; next(); };
        a.onerror = function(){ tts(from); };
        var p; try { p = a.play(); } catch(e){ tts(from); return; }
        if(p && p.catch) p.catch(function(){ tts(from); });
      })();
    });
  }
  function setEnabled(v){ enabled = !!v; try { localStorage.setItem('bilim_mx_snd', v ? '1' : '0'); } catch(e){} if(!v) stop(); }

  window.MXV = {
    lang:lang, tpl:tpl, clips:clips, say:say, stop:stop, praise:praise, oops:oops, misc:misc, allClips:allClips,
    enabled:function(){ return enabled; }, setEnabled:setEnabled, NUM:NUM, F:F
  };
})();
