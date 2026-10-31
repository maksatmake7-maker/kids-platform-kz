/* ===== Білім Аралы — переводы «Дома Барсика» (дом, гардероб) на 7 языков =====
   Языки: ru, kz, en, zh, uz (кириллица), tg, ug (арабское письмо, справа налево) — как в assets/i18n.js.
   Подключать после assets/i18n.js (он задаёт applyLang) и до house-back.js / house.js.

   Что делает:
   • HI.t(ключ, {подстановки}) — текст на текущем языке (если перевода нет — русский);
   • разметка: data-hi="ключ" (текст), data-hi-aria="ключ|ключ" (подпись для чтения с экрана), data-hi-title="ключ" (заголовок вкладки);
   • HI.on(fn) — вызвать fn при смене языка (страницы перерисовывают то, что строят скриптом);
   • язык берётся из ?lang=xx в ссылке, иначе из последнего выбора ребёнка (localStorage 'bilim_lang_v1'), иначе русский;
   • голос: записи есть для ru и kz (assets/audio/barsik/<ru|kz>/house_<id>.mp3). На остальных языках Барсик молчит и показывает только текст.

   Тексты на казахском проверяет Максат. Остальные языки — рабочий перевод, его стоит показать носителям. */
(function(){
  'use strict';
  var LANGS = ['ru', 'kz', 'en', 'zh', 'uz', 'tg', 'ug'];
  var SKEY = 'bilim_lang_v1';

  var T = {};

  /* ---------------------------------------------------------------- русский */
  T.ru = {
    house_name: 'Дом Барсика', wardrobe_name: 'Гардероб Барсика', wardrobe_h1: 'Гардероб',
    into_house: '← В дом', back_lessons: 'Вернуться к урокам', back_grade: 'К выбору класса',
    roof_aria: 'Крыша дома с вывеской «Дом Барсика»',
    room_bed: 'Спальня и гардероб', room_kitchen: 'Кухня', room_play: 'Игровая', room_attic: 'Чердак',
    chip_open: 'Открыто', chip_kitchen: 'Скоро: накормить баурсаками', chip_play: 'Скоро: игрушки и мяч', chip_attic: 'Скоро: альбом наклеек',
    goal_lbl: 'Моя цель', btn_buy: 'Купить', btn_wear: 'Надеть', btn_off: 'Снять', btn_need: 'Ещё {n}',
    note: 'Звёзды копятся за игры и уроки. Купленную вещь можно снимать и надевать сколько угодно. Если надеть вещь, Барсик будет в ней и на других страницах.',
    goal_main: 'Ещё {n} {games}, и куплю {acc}',
    goal_sub: 'Не хватает {need} из {price} звёзд. За пройденную игру дают около {per}.',
    goal_done_main: 'Звёзд хватает на любую вещь', goal_done_sub: 'Выбирай, что надеть. Новые вещи появятся позже.',
    games_one: 'игра', games_few: 'игры', games_many: 'игр',
    item_bow: 'Бантик', acc_bow: 'бантик', item_cap: 'Кепка', acc_cap: 'кепку',
    item_hat: 'Шапка с помпоном', acc_hat: 'шапку с помпоном', item_scarf: 'Шарф', acc_scarf: 'шарф',
    item_glasses: 'Тёмные очки', acc_glasses: 'тёмные очки', item_cape: 'Плащ героя', acc_cape: 'плащ героя',
    item_crown: 'Корона', acc_crown: 'корону',
    gift_ru_only: 'Подарок дня пока только на русском.', btn_ru: 'По-русски',
    qk_house: 'Дом Барсика', qk_gift: 'Подарок дня', qk_new: 'новый', qk_got: 'получен',
    say_hello1: 'Привет! Это мой дом. Заходи!',
    say_hello2: 'Ура, ты пришёл! Давай посмотрим, во что я могу одеться?',
    say_wardrobe_in: 'Это мой гардероб. Здесь живут все мои вещи.',
    say_gift: 'Смотри, мне подарили бантик! Спасибо!',
    say_wow1: 'Ого, красиво!', say_wow2: 'Мне очень идёт!', say_wow3: 'Вот это обновка!',
    say_wow4: 'Ура, я самый нарядный кот!', say_wow5: 'Мур-р! Мне нравится!',
    say_buy_bow: 'Бантик! Как будто праздник.', say_buy_cap: 'Кепка! Теперь я спортсмен!',
    say_buy_hat: 'Шапка с помпоном! Тепло и красиво!', say_buy_scarf: 'Шарф! Мне совсем не холодно.',
    say_buy_glasses: 'Тёмные очки! Я как настоящая звезда!', say_buy_cape: 'Плащ героя! Лечу спасать задачи!',
    say_buy_crown: 'Корона! Теперь я король острова!',
    say_need_more: 'Пока не хватает звёзд. Давай ещё поиграем!',
    say_off: 'Сниму. Хочу примерить что-нибудь другое.',
    say_kitchen_soon: 'Здесь скоро будет кухня. Я так люблю баурсаки!',
    say_play_soon: 'Здесь будет игровая. Скоро поиграем!',
    say_attic_soon: 'А на чердаке будут наклейки. Я соберу их все!',
    say_bye: 'Приходи ещё! Я буду ждать.'
  };

  /* ---------------------------------------------------------------- қазақша */
  T.kz = {
    house_name: 'Барсиктің үйі', wardrobe_name: 'Барсиктің гардеробы', wardrobe_h1: 'Гардероб',
    into_house: '← Үйге', back_lessons: 'Сабаққа оралу', back_grade: 'Сынып таңдауға',
    roof_aria: '«Барсиктің үйі» деген жазуы бар үй төбесі',
    room_bed: 'Жатын бөлме және гардероб', room_kitchen: 'Ас үй', room_play: 'Ойын бөлмесі', room_attic: 'Шатыр',
    chip_open: 'Ашық', chip_kitchen: 'Жақында: бауырсақ беру', chip_play: 'Жақында: ойыншықтар мен доп', chip_attic: 'Жақында: жапсырмалар альбомы',
    goal_lbl: 'Менің мақсатым', btn_buy: 'Сатып алу', btn_wear: 'Кию', btn_off: 'Шешу', btn_need: 'Тағы {n}',
    note: 'Жұлдыздар ойындар мен сабақтар үшін жиналады. Сатып алынған затты қалағаныңша шешіп, киіп жүре бересің. Затты киіп қойсаң, Барсик басқа беттерде де сонымен жүреді.',
    goal_main: 'Тағы {n} {games}, сонда {acc} сатып аламын',
    goal_sub: '{price} жұлдыздың {need}-і жетіспейді. Бір ойын үшін шамамен {per} жұлдыз беріледі.',
    goal_done_main: 'Жұлдыз кез келген затқа жетеді', goal_done_sub: 'Нені киетініңді таңда. Жаңа заттар кейін пайда болады.',
    games_other: 'ойын',
    item_bow: 'Бантик', acc_bow: 'бантикті', item_cap: 'Кепка', acc_cap: 'кепканы',
    item_hat: 'Помпоны бар бөрік', acc_hat: 'помпоны бар бөрікті', item_scarf: 'Мойынорамал', acc_scarf: 'мойынорамалды',
    item_glasses: 'Қара көзілдірік', acc_glasses: 'қара көзілдірікті', item_cape: 'Батыр плащы', acc_cape: 'батыр плащын',
    item_crown: 'Тәж', acc_crown: 'тәжді',
    gift_ru_only: 'Күн сыйы әзірге тек орыс тілінде.', btn_ru: 'Орысша',
    qk_house: 'Барсиктің үйі', qk_gift: 'Күн сыйы', qk_new: 'жаңа', qk_got: 'алынды',
    say_hello1: 'Сәлем! Бұл менің үйім. Кіре бер!',
    say_hello2: 'Ура, келдің! Қане, не киіп көрсем екен?',
    say_wardrobe_in: 'Бұл менің гардеробым. Мұнда менің барлық заттарым тұрады.',
    say_gift: 'Қарашы, маған бантик сыйлады! Рақмет!',
    say_wow1: 'Уау, қандай әдемі!', say_wow2: 'Маған өте жарасты!', say_wow3: 'Мынау жаңа киім!',
    say_wow4: 'Ура, мен ең сәнді мысықпын!', say_wow5: 'Мур-р! Маған ұнайды!',
    say_buy_bow: 'Бантик! Мереке сияқты.', say_buy_cap: 'Кепка! Енді мен спортшымын!',
    say_buy_hat: 'Помпоны бар бөрік! Жылы әрі әдемі!', say_buy_scarf: 'Мойынорамал! Енді мүлде тоңбаймын.',
    say_buy_glasses: 'Қара көзілдірік! Мен нағыз жұлдызбын!', say_buy_cape: 'Батыр плащы! Есептерді құтқаруға ұшамын!',
    say_buy_crown: 'Тәж! Енді мен аралдың патшасымын!',
    say_need_more: 'Әзірге жұлдыз жетпейді. Тағы ойнайық!',
    say_off: 'Шешемін. Басқа бірдеңені киіп көргім келеді.',
    say_kitchen_soon: 'Мұнда жақында ас үй болады. Мен бауырсақты қатты жақсы көремін!',
    say_play_soon: 'Мұнда ойын бөлмесі болады. Жақында ойнаймыз!',
    say_attic_soon: 'Ал шатырда жапсырмалар болады. Мен бәрін жинаймын!',
    say_bye: 'Тағы кел! Мен күтемін.'
  };

  /* ---------------------------------------------------------------- English */
  T.en = {
    house_name: "Barsik's House", wardrobe_name: "Barsik's Wardrobe", wardrobe_h1: 'Wardrobe',
    into_house: '← To the house', back_lessons: 'Back to lessons', back_grade: 'To class selection',
    roof_aria: 'House roof with the sign "Barsik\'s House"',
    room_bed: 'Bedroom & wardrobe', room_kitchen: 'Kitchen', room_play: 'Playroom', room_attic: 'Attic',
    chip_open: 'Open', chip_kitchen: 'Soon: feed Barsik baursaks', chip_play: 'Soon: toys and a ball', chip_attic: 'Soon: sticker album',
    goal_lbl: 'My goal', btn_buy: 'Buy', btn_wear: 'Put on', btn_off: 'Take off', btn_need: '{n} more',
    note: 'Stars are earned in games and lessons. You can take a bought item off and put it on as often as you like. If you wear an item, Barsik wears it on other pages too.',
    goal_main: '{n} more {games}, and I\'ll buy {acc}',
    goal_sub: 'Missing {need} of {price} stars. A finished game gives about {per}.',
    goal_done_main: 'You have enough stars for anything', goal_done_sub: 'Pick what to wear. New items will appear later.',
    games_one: 'game', games_other: 'games',
    item_bow: 'Bow', acc_bow: 'a bow', item_cap: 'Cap', acc_cap: 'a cap',
    item_hat: 'Pompom hat', acc_hat: 'a pompom hat', item_scarf: 'Scarf', acc_scarf: 'a scarf',
    item_glasses: 'Sunglasses', acc_glasses: 'sunglasses', item_cape: "Hero's cape", acc_cape: "a hero's cape",
    item_crown: 'Crown', acc_crown: 'a crown',
    gift_ru_only: 'The daily gift is only in Russian for now.', btn_ru: 'In Russian',
    qk_house: "Barsik's House", qk_gift: 'Daily gift', qk_new: 'new', qk_got: 'got it',
    say_hello1: 'Hi! This is my house. Come in!',
    say_hello2: "Hooray, you're here! Let's see what I can wear!",
    say_wardrobe_in: 'This is my wardrobe. All my things live here.',
    say_gift: 'Look, I got a bow as a gift! Thank you!',
    say_wow1: 'Wow, so pretty!', say_wow2: 'It really suits me!', say_wow3: 'What a great new outfit!',
    say_wow4: "Hooray, I'm the best-dressed cat!", say_wow5: 'Purr-r! I love it!',
    say_buy_bow: 'A bow! It feels like a party.', say_buy_cap: "A cap! Now I'm an athlete!",
    say_buy_hat: 'A pompom hat! Warm and cute!', say_buy_scarf: "A scarf! I'm not cold at all.",
    say_buy_glasses: 'Sunglasses! I look like a real star!', say_buy_cape: "A hero's cape! Off I fly to rescue the problems!",
    say_buy_crown: "A crown! Now I'm the king of the island!",
    say_need_more: 'Not enough stars yet. Let\'s play some more!',
    say_off: "I'll take it off. I want to try something else.",
    say_kitchen_soon: 'A kitchen is coming here soon. I love baursaks!',
    say_play_soon: "A playroom will be here. We'll play soon!",
    say_attic_soon: "The attic will have stickers. I'll collect them all!",
    say_bye: "Come back soon! I'll be waiting."
  };

  /* ---------------------------------------------------------------- 中文 */
  T.zh = {
    house_name: '巴雷斯的家', wardrobe_name: '巴雷斯的衣柜', wardrobe_h1: '衣柜',
    into_house: '← 回到家里', back_lessons: '返回学习', back_grade: '返回选择年级',
    roof_aria: '屋顶上挂着“巴雷斯的家”的牌子',
    room_bed: '卧室和衣柜', room_kitchen: '厨房', room_play: '游戏室', room_attic: '阁楼',
    chip_open: '已开放', chip_kitchen: '即将推出：喂包尔萨克', chip_play: '即将推出：玩具和皮球', chip_attic: '即将推出：贴纸册',
    goal_lbl: '我的目标', btn_buy: '购买', btn_wear: '穿上', btn_off: '脱下', btn_need: '还差{n}',
    note: '星星可以通过游戏和课程获得。买到的东西可以随时脱下或穿上。穿上之后，巴雷斯在其他页面也会穿着它。',
    goal_main: '再玩{n}{games}，我就能买{acc}',
    goal_sub: '还差{need}颗星（共需{price}颗）。完成一个游戏大约能得{per}颗星。',
    goal_done_main: '星星够买任何东西了', goal_done_sub: '选一件穿上吧，新东西以后会出现。',
    games_other: '个游戏',
    item_bow: '蝴蝶结', acc_bow: '蝴蝶结', item_cap: '鸭舌帽', acc_cap: '鸭舌帽',
    item_hat: '绒球帽', acc_hat: '绒球帽', item_scarf: '围巾', acc_scarf: '围巾',
    item_glasses: '墨镜', acc_glasses: '墨镜', item_cape: '英雄披风', acc_cape: '英雄披风',
    item_crown: '王冠', acc_crown: '王冠',
    gift_ru_only: '每日礼物目前仅提供俄语版。', btn_ru: '俄语',
    qk_house: '巴雷斯的家', qk_gift: '每日礼物', qk_new: '新', qk_got: '已领取',
    say_hello1: '你好！这是我的家，快进来吧！',
    say_hello2: '太好了，你来啦！我们来看看我能穿什么吧！',
    say_wardrobe_in: '这是我的衣柜，我所有的东西都在这里。',
    say_gift: '看，有人送了我一个蝴蝶结！谢谢！',
    say_wow1: '哇，真好看！', say_wow2: '我穿着真合适！', say_wow3: '这身新衣服太棒了！',
    say_wow4: '耶，我是最漂亮的猫！', say_wow5: '喵～我喜欢！',
    say_buy_bow: '蝴蝶结！像过节一样。', say_buy_cap: '鸭舌帽！现在我是运动员啦！',
    say_buy_hat: '带绒球的帽子！又暖和又好看！', say_buy_scarf: '围巾！我一点也不冷了。',
    say_buy_glasses: '墨镜！我像真正的明星！', say_buy_cape: '英雄披风！我要飞去解决难题啦！',
    say_buy_crown: '王冠！现在我是小岛的国王！',
    say_need_more: '星星还不够，我们再玩一会儿吧！',
    say_off: '我先脱下来，想试试别的。',
    say_kitchen_soon: '这里很快会有厨房。我最爱吃包尔萨克了！',
    say_play_soon: '这里会有游戏室，很快我们就能一起玩！',
    say_attic_soon: '阁楼里会有贴纸，我要把它们全部集齐！',
    say_bye: '再来玩哦！我会等你的。'
  };

  /* ---------------------------------------------------------------- ўзбекча (кирилл, как на остальном сайте) */
  T.uz = {
    house_name: 'Барсикнинг уйи', wardrobe_name: 'Барсикнинг гардероби', wardrobe_h1: 'Гардероб',
    into_house: '← Уйга', back_lessons: 'Дарсларга қайтиш', back_grade: 'Синф танлашга',
    roof_aria: '«Барсикнинг уйи» ёзуви бор уй томи',
    room_bed: 'Ётоқхона ва гардероб', room_kitchen: 'Ошхона', room_play: 'Ўйин хонаси', room_attic: 'Чордоқ',
    chip_open: 'Очиқ', chip_kitchen: 'Тез орада: боурсоқ билан меҳмон қилиш', chip_play: 'Тез орада: ўйинчоқлар ва тўп', chip_attic: 'Тез орада: стикерлар альбоми',
    goal_lbl: 'Менинг мақсадим', btn_buy: 'Сотиб олиш', btn_wear: 'Кийиш', btn_off: 'Ечиш', btn_need: 'Яна {n}',
    note: 'Юлдузлар ўйинлар ва дарслар учун йиғилади. Сотиб олинган нарсани истаганча еч ва кийиб юраверасан. Нарсани кийиб қўйсанг, Барсик бошқа саҳифаларда ҳам шунда бўлади.',
    goal_main: 'Яна {n} та {games}, ва {acc} оламан',
    goal_sub: '{price} юлдуздан {need} таси етмайди. Битта ўйин учун тахминан {per} юлдуз берилади.',
    goal_done_main: 'Юлдуз ҳамма нарсага етади', goal_done_sub: 'Нимани кийишни танла. Янги нарсалар кейин чиқади.',
    games_other: 'ўйин',
    item_bow: 'Бантик', acc_bow: 'бантикни', item_cap: 'Кепка', acc_cap: 'кепкани',
    item_hat: 'Помпонли шапка', acc_hat: 'помпонли шапкани', item_scarf: 'Шарф', acc_scarf: 'шарфни',
    item_glasses: 'Қора кўзойнак', acc_glasses: 'қора кўзойнакни', item_cape: 'Қаҳрамон плащи', acc_cape: 'қаҳрамон плащини',
    item_crown: 'Тож', acc_crown: 'тожни',
    gift_ru_only: 'Кун совғаси ҳозирча фақат рус тилида.', btn_ru: 'Русча',
    qk_house: 'Барсикнинг уйи', qk_gift: 'Кун совғаси', qk_new: 'янги', qk_got: 'олинди',
    say_hello1: 'Салом! Бу менинг уйим. Кир!',
    say_hello2: 'Ура, келдинг! Қани, нима кийиб кўрсам экан?',
    say_wardrobe_in: 'Бу менинг гардеробим. Бу ерда барча нарсаларим туради.',
    say_gift: 'Қара, менга бантик совға қилишди! Раҳмат!',
    say_wow1: 'Вой, қандай чиройли!', say_wow2: 'Менга жуда ярашди!', say_wow3: 'Мана бу янги кийим!',
    say_wow4: 'Ура, мен энг чиройли мушукман!', say_wow5: 'Мур-р! Менга ёқди!',
    say_buy_bow: 'Бантик! Худди байрамдагидек.', say_buy_cap: 'Кепка! Энди мен спортчиман!',
    say_buy_hat: 'Помпонли шапка! Илиқ ва чиройли!', say_buy_scarf: 'Шарф! Энди умуман совуқ қотмайман.',
    say_buy_glasses: 'Қора кўзойнак! Мен чинакам юлдузман!', say_buy_cape: 'Қаҳрамон плащи! Масалаларни қутқаришга учаман!',
    say_buy_crown: 'Тож! Энди мен оролнинг шоҳиман!',
    say_need_more: 'Ҳозирча юлдуз етмайди. Яна ўйнайлик!',
    say_off: 'Ечаман. Бошқасини кийиб кўргим келяпти.',
    say_kitchen_soon: 'Бу ерда яқинда ошхона бўлади. Мен боурсоқни жуда яхши кўраман!',
    say_play_soon: 'Бу ерда ўйин хонаси бўлади. Тез орада ўйнаймиз!',
    say_attic_soon: 'Чордоқда стикерлар бўлади. Ҳаммасини йиғаман!',
    say_bye: 'Яна кел! Мен кутаман.'
  };

  /* ---------------------------------------------------------------- тоҷикӣ */
  T.tg = {
    house_name: 'Хонаи Барсик', wardrobe_name: 'Ҷевони либоси Барсик', wardrobe_h1: 'Ҷевони либос',
    into_house: '← Ба хона', back_lessons: 'Бозгашт ба дарсҳо', back_grade: 'Ба интихоби синф',
    roof_aria: 'Бому тахтаи «Хонаи Барсик»',
    room_bed: 'Хонаи хоб ва ҷевони либос', room_kitchen: 'Ошхона', room_play: 'Хонаи бозӣ', room_attic: 'Болохона',
    chip_open: 'Кушода', chip_kitchen: 'Ба қарибӣ: баурсак додан', chip_play: 'Ба қарибӣ: бозичаҳо ва тӯб', chip_attic: 'Ба қарибӣ: албоми стикерҳо',
    goal_lbl: 'Ҳадафи ман', btn_buy: 'Харидан', btn_wear: 'Пӯшидан', btn_off: 'Кашидан', btn_need: 'Боз {n}',
    note: 'Ситораҳо барои бозиҳо ва дарсҳо ҷамъ мешаванд. Чизи харидашударо ҳар қадар хоҳӣ, мекашӣ ва мепӯшӣ. Агар чизро пӯшида монӣ, Барсик дар саҳифаҳои дигар низ бо он мегардад.',
    goal_main: 'Боз {n} {games}, ва {acc} мехарам',
    goal_sub: 'Аз {price} ситора {need}-ташон намерасад. Барои як бозӣ тақрибан {per} ситора медиҳанд.',
    goal_done_main: 'Ситора ба ҳама чиз мерасад', goal_done_sub: 'Интихоб кун, чиро мепӯшӣ. Чизҳои нав баъдтар пайдо мешаванд.',
    games_other: 'бозӣ',
    item_bow: 'Бантик', acc_bow: 'бантикро', item_cap: 'Кепка', acc_cap: 'кепкаро',
    item_hat: 'Кулоҳи помпондор', acc_hat: 'кулоҳи помпондорро', item_scarf: 'Шарф', acc_scarf: 'шарфро',
    item_glasses: 'Айнаки сиёҳ', acc_glasses: 'айнаки сиёҳро', item_cape: 'Плащи қаҳрамон', acc_cape: 'плащи қаҳрамонро',
    item_crown: 'Тоҷ', acc_crown: 'тоҷро',
    gift_ru_only: 'Тӯҳфаи рӯз ҳоло танҳо бо забони русӣ аст.', btn_ru: 'Бо русӣ',
    qk_house: 'Хонаи Барсик', qk_gift: 'Тӯҳфаи рӯз', qk_new: 'нав', qk_got: 'гирифта шуд',
    say_hello1: 'Салом! Ин хонаи ман аст. Дароя!',
    say_hello2: 'Ура, омадӣ! Биё бубинем, ман чӣ пӯшида метавонам?',
    say_wardrobe_in: 'Ин ҷевони либоси ман аст. Ин ҷо ҳамаи чизҳои ман меистанд.',
    say_gift: 'Бин, ба ман бантик тӯҳфа доданд! Ташаккур!',
    say_wow1: 'Вой, чӣ қадар зебо!', say_wow2: 'Ба ман хеле мерасад!', say_wow3: 'Ана, либоси нав!',
    say_wow4: 'Ура, ман зеботарин гурба ҳастам!', say_wow5: 'Мур-р! Ба ман маъқул аст!',
    say_buy_bow: 'Бантик! Мисли ҷашн.', say_buy_cap: 'Кепка! Акнун ман варзишгар ҳастам!',
    say_buy_hat: 'Кулоҳи помпондор! Гарм ва зебо!', say_buy_scarf: 'Шарф! Ман тамоман сард нестам.',
    say_buy_glasses: 'Айнаки сиёҳ! Ман мисли ситораи ҳақиқӣ!', say_buy_cape: 'Плащи қаҳрамон! Барои наҷот додани масъалаҳо мепарам!',
    say_buy_crown: 'Тоҷ! Акнун ман шоҳи ҷазира ҳастам!',
    say_need_more: 'Ҳоло ситора намерасад. Биёед боз бозӣ кунем!',
    say_off: 'Мекашам. Мехоҳам чизи дигареро пӯшам.',
    say_kitchen_soon: 'Ин ҷо ба қарибӣ ошхона мешавад. Ман баурсакро хеле дӯст медорам!',
    say_play_soon: 'Ин ҷо хонаи бозӣ мешавад. Ба қарибӣ бозӣ мекунем!',
    say_attic_soon: 'Дар болохона стикерҳо мешаванд. Ман ҳамаашро ҷамъ мекунам!',
    say_bye: 'Боз биё! Ман интизор мешавам.'
  };

  /* ---------------------------------------------------------------- ئۇيغۇرچە (справа налево; в стрелках «→») */
  T.ug = {
    house_name: 'بارىسنىڭ ئۆيى', wardrobe_name: 'بارىسنىڭ كىيىم ئىشكاپى', wardrobe_h1: 'كىيىم ئىشكاپى',
    into_house: '→ ئۆيگە', back_lessons: 'دەرسكە قايتىش', back_grade: 'سىنىپ تاللاشقا',
    roof_aria: '«بارىسنىڭ ئۆيى» دەپ يېزىلغان تاختاي بار ئۆي ئۆگزىسى',
    room_bed: 'ياتاق ۋە كىيىم ئىشكاپى', room_kitchen: 'ئاشخانا', room_play: 'ئويۇن ئۆيى', room_attic: 'ئۆگزە ئۆي',
    chip_open: 'ئوچۇق', chip_kitchen: 'يېقىندا: باۋىرساق بېرىش', chip_play: 'يېقىندا: ئويۇنچۇق ۋە توپ', chip_attic: 'يېقىندا: چاپلاقلار ئالبومى',
    goal_lbl: 'مېنىڭ نىشانىم', btn_buy: 'سېتىۋېلىش', btn_wear: 'كىيىش', btn_off: 'سېلىش', btn_need: 'يەنە {n}',
    note: 'يۇلتۇزلار ئويۇن ۋە دەرسلەردىن يىغىلىدۇ. سېتىۋالغان نەرسىنى خالىغانچە سېلىپ ۋە كىيىپ بولىدۇ. نەرسىنى كىيسىڭىز، بارىس باشقا بەتلەردىمۇ شۇنى كىيىپ تۇرىدۇ.',
    goal_main: 'يەنە {n} {games}، ئاندىن {acc} ئالىمەن',
    goal_sub: '{price} يۇلتۇزدىن {need} دانىسى يەتمەيدۇ. بىر ئويۇن ئۈچۈن تەخمىنەن {per} يۇلتۇز بېرىلىدۇ.',
    goal_done_main: 'يۇلتۇز ھەرقانداق نەرسىگە يېتىدۇ', goal_done_sub: 'كىيمەكچى بولغىنىڭىزنى تاللاڭ. يېڭى نەرسىلەر كېيىن چىقىدۇ.',
    games_other: 'ئويۇن',
    item_bow: 'كېپىنەك لېنتا', acc_bow: 'كېپىنەك لېنتىنى', item_cap: 'سپورت قالپىقى', acc_cap: 'سپورت قالپىقىنى',
    item_hat: 'پومپونلۇق قالپاق', acc_hat: 'پومپونلۇق قالپاقنى', item_scarf: 'بوينىباغ', acc_scarf: 'بوينىباغنى',
    item_glasses: 'قارا كۆزەينەك', acc_glasses: 'قارا كۆزەينەكنى', item_cape: 'قەھرىمان يېپىنچىسى', acc_cape: 'قەھرىمان يېپىنچىسىنى',
    item_crown: 'تاج', acc_crown: 'تاجنى',
    gift_ru_only: 'كۈنلۈك سوۋغات ھازىرچە پەقەت رۇسچە.', btn_ru: 'رۇسچە',
    qk_house: 'بارىسنىڭ ئۆيى', qk_gift: 'كۈنلۈك سوۋغات', qk_new: 'يېڭى', qk_got: 'ئېلىندى',
    say_hello1: 'ياخشىمۇسىز! بۇ مېنىڭ ئۆيۈم. كىرىڭ!',
    say_hello2: 'ھە، كەلدىڭىز! كېلىڭ، مەن نېمە كىيەلەيمەن، كۆرۈپ باقايلى!',
    say_wardrobe_in: 'بۇ مېنىڭ كىيىم ئىشكاپىم. بارلىق نەرسىلىرىم مۇشۇ يەردە تۇرىدۇ.',
    say_gift: 'قاراڭ، ماڭا كېپىنەك لېنتا سوغا قىلىندى! رەھمەت!',
    say_wow1: 'ۋاي، نېمىدېگەن چىرايلىق!', say_wow2: 'ماڭا بەكمۇ ياراشتى!', say_wow3: 'مانا بۇ يېڭى كىيىم!',
    say_wow4: 'ھە، مەن ئەڭ چىرايلىق مۈشۈك!', say_wow5: 'مۇر-ر! ماڭا يېقىپ قالدى!',
    say_buy_bow: 'كېپىنەك لېنتا! خۇددى بايرامدىكىدەك.', say_buy_cap: 'سپورت قالپىقى! ئەمدى مەن سپورتچى!',
    say_buy_hat: 'پومپونلۇق قالپاق! ئىسسىق ھەم چىرايلىق!', say_buy_scarf: 'بوينىباغ! ماڭا ھېچ سوغۇق ئەمەس.',
    say_buy_glasses: 'قارا كۆزەينەك! مەن ھەقىقىي يۇلتۇز!', say_buy_cape: 'قەھرىمان يېپىنچىسى! مەسىلىلەرنى قۇتقۇزغىلى ئۇچىمەن!',
    say_buy_crown: 'تاج! ئەمدى مەن ئارالنىڭ پادىشاھى!',
    say_need_more: 'يۇلتۇز ھازىرچە يەتمىدى. يەنە ئوينايلى!',
    say_off: 'سېلىۋېتىمەن. باشقا نەرسە كىيىپ باقاي.',
    say_kitchen_soon: 'بۇ يەردە ئاشخانا بولىدۇ. مەن باۋىرساقنى ناھايىتى ياخشى كۆرىمەن!',
    say_play_soon: 'بۇ يەردە ئويۇن ئۆيى بولىدۇ. يېقىندا ئوينايمىز!',
    say_attic_soon: 'ئۆگزە ئۆيدە چاپلاقلار بولىدۇ. مەن ھەممىسىنى يىغىمەن!',
    say_bye: 'يەنە كېلىڭ! مەن كۈتىمەن.'
  };

  /* ---------------------------------------------------------------- движок */
  var urlLang = null;
  try { var m = /[?&]lang=([a-z]{2})/.exec(location.search); if (m && T[m[1]]) urlLang = m[1]; } catch(e){}
  function stored(){ try { var s = localStorage.getItem(SKEY); return (s && T[s]) ? s : null; } catch(e){ return null; } }
  function remember(l){ try { localStorage.setItem(SKEY, l); } catch(e){} }

  var cur = urlLang || stored() || 'ru';
  var ready = false, subs = [];

  function fmt(s, v){
    if (!v) return s;
    return s.replace(/\{(\w+)\}/g, function(all, k){ return v[k] === undefined ? all : v[k]; });
  }
  function t(key, v){
    var s = (T[cur] && T[cur][key] !== undefined) ? T[cur][key] : T.ru[key];
    return s === undefined ? '' : fmt(s, v);
  }
  /* слово «игра» в нужной форме (в русском и английском есть формы числа) */
  function games(n){
    var d = T[cur], form;
    if (cur === 'ru'){ var m10 = n % 10, m100 = n % 100; form = (m10 === 1 && m100 !== 11) ? 'one' : (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) ? 'few' : 'many'; }
    else if (cur === 'en') form = (n === 1) ? 'one' : 'other';
    else form = 'other';
    return d['games_' + form] || d.games_other || d.games_one || T.ru.games_many;
  }
  function arrow(){ return cur === 'ug' ? '→' : '←'; }
  /* голосовые записи есть только для русского и казахского */
  function voiceDir(){ return (cur === 'ru' || cur === 'kz') ? cur : null; }

  function apply(root){
    root = root || document;
    [].forEach.call(root.querySelectorAll('[data-hi]'), function(el){ el.textContent = t(el.getAttribute('data-hi')); });
    [].forEach.call(root.querySelectorAll('[data-hi-aria]'), function(el){
      el.setAttribute('aria-label', el.getAttribute('data-hi-aria').split('|').map(function(k){ return t(k); }).join('. '));
    });
    var ti = document.querySelector('title[data-hi-title]');
    if (ti) document.title = t(ti.getAttribute('data-hi-title')) + ' — Білім Аралы';
    document.documentElement.setAttribute('lang', cur === 'kz' ? 'kk' : cur);
  }
  function on(fn){ subs.push(fn); }
  function changed(){
    apply();
    subs.forEach(function(fn){ try { fn(cur); } catch(e){} });
  }

  /* оборачиваем applyLang из i18n.js: до готовности страницы его «авто-русский» вызов игнорируем */
  var orig = window.applyLang;
  if (typeof orig === 'function'){
    window.applyLang = function(l){
      orig(l);
      if (!ready) return;
      if (!T[l]) l = 'ru';
      cur = l; remember(l); changed();
    };
  }
  function start(){
    ready = true;
    if (typeof window.applyLang === 'function') window.applyLang(cur);   /* ставит кнопки языка, направление письма, перерисовывает */
    else { remember(cur); changed(); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  window.HI = { T: T, LANGS: LANGS, t: t, games: games, arrow: arrow, voiceDir: voiceDir, apply: apply, on: on, lang: function(){ return cur; } };
})();
