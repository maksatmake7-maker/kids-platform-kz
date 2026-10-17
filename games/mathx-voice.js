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
      lack_water:'Нужна вода.', lack_light:'Нужен свет.', lack_warm:'Нужно тепло.',
      n_eye:'Глаз', n_ear:'Ухо', n_nose:'Нос', n_mouth:'Рот', n_hand:'Рука', n_leg:'Нога',
      fn_eye:'Видеть', fn_ear:'Слышать', fn_nose:'Нюхать', fn_mouth:'Есть и говорить', fn_hand:'Брать', fn_leg:'Ходить',
      q_eye:'Чем мы видим?', q_ear:'Чем мы слышим?', q_nose:'Чем мы нюхаем?', q_mouth:'Чем мы едим?', q_hand:'Чем мы берём предметы?', q_leg:'Чем мы ходим?',
      fact_eye:'Глазами мы видим.', fact_ear:'Ушами мы слышим.', fact_nose:'Носом мы нюхаем.', fact_mouth:'Ртом мы едим и говорим.', fact_hand:'Руками мы берём предметы.', fact_leg:'Ногами мы ходим.',
      findbody:'Найди на теле:', whatbody:'Как называется эта часть тела?', whatfor:'Для чего нужна эта часть тела?', sensesort:'Чем мы это узнаём? Разложи.',
      n_apple:'Яблоко', n_milk:'Молоко', n_sleep:'Сон', n_bed:'Кровать', n_balloon:'Шарик', n_hat:'Шляпа',
      cat_food:'Питание', cat_rest:'Отдых', cat_not:'Не нужно',
      needkid:'Нужно это ребёнку, чтобы расти?', pickkid:'Выбери всё, что нужно ребёнку, чтобы расти.', sortkid:'Что нужно ребёнку? Разложи: питание, отдых или не нужно.',
      kidsay:'Ребёнку нужны питание и отдых, чтобы расти и быть здоровым.', notkidsay:'Это для игры. Расти помогают питание и отдых.', foodsay:'Еда помогает расти.', restsay:'Сон и отдых нужны, чтобы расти.',
      n_plane:'Самолёт', n_butterfly:'Бабочка', n_fish:'Рыба', n_boat:'Парусник', n_bike:'Велосипед',
      moveq:'Как это движется?', findfly:'Найди, что летает.', findswim:'Найди, что плавает.', findground:'Найди, что движется по земле.', sortmove:'Как это движется? Разложи по местам.',
      flysay:'Это летает по воздуху.', swimsay:'Это плавает по воде.', groundsay:'Это движется по земле.',
      wheremove:'Где это движется?',
      n_rocket:'Ракета', n_telescope:'Телескоп', n_satellite:'Спутник', n_clock:'Часы', n_calendar:'Календарь', n_hourglass:'Песочные часы',
      cat_space:'Космос', cat_time:'Время', use_space:'Изучать космос', use_time:'Измерять время', usewhat:'Для чего это нужно?', findit:'Найди:',
      findtime:'Найди, чем измеряют время.', findspace:'Найди, чем изучают космос.', sortst:'Для космоса или для времени? Разложи.',
      q_rocket:'Что летит в космос?', q_telescope:'Чем смотрят на звёзды?', q_satellite:'Что летает вокруг Земли?', q_clock:'Что показывает, который час?', q_calendar:'Где смотреть дату?', q_hourglass:'Что отмеряет время песком?',
      fact_rocket:'Ракета летит в космос.', fact_telescope:'Телескопом смотрят на звёзды и планеты.', fact_satellite:'Спутник летает вокруг Земли и помогает изучать космос.', fact_clock:'Часы показывают время.', fact_calendar:'Календарь показывает дни и месяцы.', fact_hourglass:'Песочные часы отмеряют время песком.',
      spacesay:'Это нужно, чтобы изучать космос.', timesay:'Это нужно, чтобы измерять время.',
      n_key:'Ключ', n_wrench:'Гаечный ключ', n_gear:'Шестерёнка', n_hammer:'Молоток', n_book:'Книга', n_banana:'Банан',
      magnetq:'Притянет это магнит?', findmagnet:'Найди, что притянет магнит.', findnotmagnet:'Найди, что магнит не притянет.', pickmagnet:'Выбери всё, что притянет магнит.', sortmagnet:'Притянет магнит или нет? Разложи.',
      magyes:'Магнит притягивает железные предметы.', magno:'Магнит не притягивает это: оно не из железа.',
      n_globe:'Глобус', n_orange:'Апельсин', n_dice:'Кубик', n_ruler:'Линейка', n_triangle:'Угольник',
      roundq:'Круглый, как Земля?', findround:'Найди предмет, похожий на Землю.', findnotround:'Найди предмет, который не круглый.', pickround:'Выбери всё, что круглое, как Земля.', sortround:'Круглый или нет? Разложи.',
      roundsay:'Он круглый, как Земля. Земля — шар.', notroundsay:'Он не круглый. А Земля круглая, как шар.'
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
      lack_water:'Су керек.', lack_light:'Жарық керек.', lack_warm:'Жылу керек.',
      n_eye:'Көз', n_ear:'Құлақ', n_nose:'Мұрын', n_mouth:'Ауыз', n_hand:'Қол', n_leg:'Аяқ',
      fn_eye:'Көру', fn_ear:'Есту', fn_nose:'Иіскеу', fn_mouth:'Жеу және сөйлеу', fn_hand:'Ұстау', fn_leg:'Жүру',
      q_eye:'Немен көреміз?', q_ear:'Немен естиміз?', q_nose:'Немен иіскейміз?', q_mouth:'Немен жейміз?', q_hand:'Немен зат ұстаймыз?', q_leg:'Немен жүреміз?',
      fact_eye:'Көзбен көреміз.', fact_ear:'Құлақпен естиміз.', fact_nose:'Мұрынмен иіскейміз.', fact_mouth:'Ауызбен жейміз және сөйлейміз.', fact_hand:'Қолмен зат ұстаймыз.', fact_leg:'Аяқпен жүреміз.',
      findbody:'Денеден тап:', whatbody:'Дененің бұл бөлігі қалай аталады?', whatfor:'Дененің бұл бөлігі не үшін керек?', sensesort:'Мұны немен білеміз? Бөліп қой.',
      n_apple:'Алма', n_milk:'Сүт', n_sleep:'Ұйқы', n_bed:'Төсек', n_balloon:'Шар', n_hat:'Қалпақ',
      cat_food:'Тамақтану', cat_rest:'Демалыс', cat_not:'Керек емес',
      needkid:'Балаға өсу үшін бұл керек пе?', pickkid:'Балаға өсу үшін не керек болса, соны таңда.', sortkid:'Балаға не керек? Бөліп қой: тамақтану, демалыс немесе керек емес.',
      kidsay:'Бала өсіп, сау болуы үшін тамақтану мен демалыс керек.', notkidsay:'Бұл ойын үшін. Өсуге тамақтану мен демалыс көмектеседі.', foodsay:'Тамақ өсуге көмектеседі.', restsay:'Өсу үшін ұйқы мен демалыс керек.',
      n_plane:'Ұшақ', n_butterfly:'Көбелек', n_fish:'Балық', n_boat:'Желкенді кеме', n_bike:'Велосипед',
      moveq:'Бұл қалай қозғалады?', findfly:'Ұшатынын тап.', findswim:'Жүзетінін тап.', findground:'Жермен жүретінін тап.', sortmove:'Бұл қалай қозғалады? Орнына бөліп қой.',
      flysay:'Бұл ауада ұшады.', swimsay:'Бұл суда жүзеді.', groundsay:'Бұл жермен жүреді.',
      wheremove:'Бұл қайда қозғалады?',
      n_rocket:'Зымыран', n_telescope:'Телескоп', n_satellite:'Серіктес', n_clock:'Сағат', n_calendar:'Күнтізбе', n_hourglass:'Құм сағат',
      cat_space:'Ғарыш', cat_time:'Уақыт', use_space:'Ғарышты зерттеу', use_time:'Уақытты өлшеу', usewhat:'Бұл не үшін керек?', findit:'Тап:',
      findtime:'Уақытты өлшейтінін тап.', findspace:'Ғарышты зерттейтінін тап.', sortst:'Ғарыш үшін бе, уақыт үшін бе? Бөліп қой.',
      q_rocket:'Ғарышқа не ұшады?', q_telescope:'Жұлдыздарды немен қараймыз?', q_satellite:'Жерді айналып не ұшады?', q_clock:'Сағат неше екенін не көрсетеді?', q_calendar:'Күнді қайдан қарауға болады?', q_hourglass:'Уақытты құммен не өлшейді?',
      fact_rocket:'Зымыран ғарышқа ұшады.', fact_telescope:'Телескоппен жұлдыздар мен планеталарды қарайды.', fact_satellite:'Серіктес Жерді айналып ұшып, ғарышты зерттеуге көмектеседі.', fact_clock:'Сағат уақытты көрсетеді.', fact_calendar:'Күнтізбе күндер мен айларды көрсетеді.', fact_hourglass:'Құм сағат уақытты құммен өлшейді.',
      spacesay:'Бұл ғарышты зерттеу үшін керек.', timesay:'Бұл уақытты өлшеу үшін керек.',
      n_key:'Кілт', n_wrench:'Сомын кілті', n_gear:'Тісті доңғалақ', n_hammer:'Балға', n_book:'Кітап', n_banana:'Банан',
      magnetq:'Магнит мұны тартады ма?', findmagnet:'Магнит тартатынын тап.', findnotmagnet:'Магнит тартпайтынын тап.', pickmagnet:'Магнит тартатынның бәрін таңда.', sortmagnet:'Магнит тарта ма, жоқ па? Бөліп қой.',
      magyes:'Магнит темір заттарды тартады.', magno:'Магнит мұны тартпайды: ол темірден емес.',
      n_globe:'Глобус', n_orange:'Апельсин', n_dice:'Текше', n_ruler:'Сызғыш', n_triangle:'Үшбұрыш сызғыш',
      roundq:'Жер сияқты дөңгелек пе?', findround:'Жерге ұқсайтын затты тап.', findnotround:'Дөңгелек емес затты тап.', pickround:'Жер сияқты дөңгелектің бәрін таңда.', sortround:'Дөңгелек пе, жоқ па? Бөліп қой.',
      roundsay:'Ол Жер сияқты дөңгелек. Жер — шар тәрізді.', notroundsay:'Ол дөңгелек емес. Ал Жер шар сияқты дөңгелек.'
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
      lack_water:'It needs water.', lack_light:'It needs light.', lack_warm:'It needs warmth.',
      n_eye:'Eye', n_ear:'Ear', n_nose:'Nose', n_mouth:'Mouth', n_hand:'Hand', n_leg:'Leg',
      fn_eye:'To see', fn_ear:'To hear', fn_nose:'To smell', fn_mouth:'To eat and talk', fn_hand:'To hold', fn_leg:'To walk',
      q_eye:'What do we see with?', q_ear:'What do we hear with?', q_nose:'What do we smell with?', q_mouth:'What do we eat with?', q_hand:'What do we hold things with?', q_leg:'What do we walk with?',
      fact_eye:'We see with our eyes.', fact_ear:'We hear with our ears.', fact_nose:'We smell with our nose.', fact_mouth:'We eat and talk with our mouth.', fact_hand:'We hold things with our hands.', fact_leg:'We walk with our legs.',
      findbody:'Find on the body:', whatbody:'What is this body part called?', whatfor:'What is this body part for?', sensesort:'What do we sense this with? Sort them.',
      n_apple:'Apple', n_milk:'Milk', n_sleep:'Sleep', n_bed:'Bed', n_balloon:'Balloon', n_hat:'Hat',
      cat_food:'Food', cat_rest:'Rest', cat_not:'Not needed',
      needkid:'Does a child need this to grow?', pickkid:'Pick everything a child needs to grow.', sortkid:'What does a child need? Sort: food, rest or not needed.',
      kidsay:'A child needs food and rest to grow and stay healthy.', notkidsay:'This is for play. Food and rest help us grow.', foodsay:'Food helps us grow.', restsay:'We need sleep and rest to grow.',
      n_plane:'Plane', n_butterfly:'Butterfly', n_fish:'Fish', n_boat:'Sailboat', n_bike:'Bicycle',
      moveq:'How does it move?', findfly:'Find what flies.', findswim:'Find what swims.', findground:'Find what moves on the ground.', sortmove:'How does it move? Sort them.',
      flysay:'It flies in the air.', swimsay:'It swims in the water.', groundsay:'It moves on the ground.',
      wheremove:'Where does it move?',
      n_rocket:'Rocket', n_telescope:'Telescope', n_satellite:'Satellite', n_clock:'Clock', n_calendar:'Calendar', n_hourglass:'Hourglass',
      cat_space:'Space', cat_time:'Time', use_space:'To study space', use_time:'To measure time', usewhat:'What is this for?', findit:'Find:',
      findtime:'Find what measures time.', findspace:'Find what we use to study space.', sortst:'For space or for time? Sort them.',
      q_rocket:'What flies into space?', q_telescope:'What do we look at stars with?', q_satellite:'What flies around the Earth?', q_clock:'What shows what time it is?', q_calendar:'Where can we look up the date?', q_hourglass:'What measures time with sand?',
      fact_rocket:'A rocket flies into space.', fact_telescope:'We look at stars and planets with a telescope.', fact_satellite:'A satellite flies around the Earth and helps us study space.', fact_clock:'A clock shows the time.', fact_calendar:'A calendar shows days and months.', fact_hourglass:'An hourglass measures time with sand.',
      spacesay:'This is used to study space.', timesay:'This is used to measure time.',
      n_key:'Key', n_wrench:'Wrench', n_gear:'Gear', n_hammer:'Hammer', n_book:'Book', n_banana:'Banana',
      magnetq:'Will a magnet attract this?', findmagnet:'Find what a magnet will attract.', findnotmagnet:'Find what a magnet will not attract.', pickmagnet:'Pick everything a magnet will attract.', sortmagnet:'Does a magnet attract it or not? Sort them.',
      magyes:'A magnet attracts iron objects.', magno:'A magnet does not attract this: it is not made of iron.',
      n_globe:'Globe', n_orange:'Orange', n_dice:'Cube', n_ruler:'Ruler', n_triangle:'Set square',
      roundq:'Is it round, like the Earth?', findround:'Find something that looks like the Earth.', findnotround:'Find something that is not round.', pickround:'Pick everything that is round like the Earth.', sortround:'Round or not? Sort them.',
      roundsay:'It is round, like the Earth. The Earth is a ball.', notroundsay:'It is not round. But the Earth is round like a ball.'
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
      findbody:function(v){ return ['f:findbody', 'f:n_'+v.k]; },
      findname:function(v){ return ['f:findit', 'f:n_'+v.k]; },
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
      findbody:function(v){ return ['f:findbody', 'f:n_'+v.k]; },
      findname:function(v){ return ['f:findit', 'f:n_'+v.k]; },
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
      findbody:function(v){ return ['f:findbody', 'f:n_'+v.k]; },
      findname:function(v){ return ['f:findit', 'f:n_'+v.k]; },
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
