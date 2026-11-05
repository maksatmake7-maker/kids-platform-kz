/* ===== Білім Аралы — переводы «Дома Барсика» (дом, гардероб) на 7 языков =====
   Языки: ru, kz, en, zh, uz (латиница), tg, ug (арабское письмо, справа налево), fr, de — как в assets/i18n.js.
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
  var LANGS = ['ru', 'kz', 'en', 'zh', 'uz', 'tg', 'ug', 'fr', 'de'];
  var SKEY = 'bilim_lang_v1';

  var T = {};

  /* ---------------------------------------------------------------- русский */
  T.ru = {
    house_name: 'Дом Барсика', wardrobe_name: 'Гардероб Барсика', wardrobe_h1: 'Гардероб',
    into_house: '← В дом', back_lessons: 'Вернуться к урокам', back_grade: 'К выбору класса',
    roof_aria: 'Крыша дома с вывеской «Дом Барсика»',
    room_bed: 'Спальня и гардероб', room_kitchen: 'Кухня', room_play: 'Игровая', room_attic: 'Чердак',
    chip_open: 'Открыто', chip_kitchen: 'Скоро: накормить баурсаками', chip_play: 'Скоро: игрушки и мяч',
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
    say_bye: 'Приходи ещё! Я буду ждать.'
  };

  /* ---------------------------------------------------------------- қазақша */
  T.kz = {
    house_name: 'Барсиктің үйі', wardrobe_name: 'Барсиктің гардеробы', wardrobe_h1: 'Гардероб',
    into_house: '← Үйге', back_lessons: 'Сабаққа оралу', back_grade: 'Сынып таңдауға',
    roof_aria: '«Барсиктің үйі» деген жазуы бар үй төбесі',
    room_bed: 'Жатын бөлме және гардероб', room_kitchen: 'Ас үй', room_play: 'Ойын бөлмесі', room_attic: 'Шатыр',
    chip_open: 'Ашық', chip_kitchen: 'Жақында: бауырсақ беру', chip_play: 'Жақында: ойыншықтар мен доп',
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
    say_bye: 'Тағы кел! Мен күтемін.'
  };

  /* ---------------------------------------------------------------- English */
  T.en = {
    house_name: "Barsik's House", wardrobe_name: "Barsik's Wardrobe", wardrobe_h1: 'Wardrobe',
    into_house: '← To the house', back_lessons: 'Back to lessons', back_grade: 'To class selection',
    roof_aria: 'House roof with the sign "Barsik\'s House"',
    room_bed: 'Bedroom & wardrobe', room_kitchen: 'Kitchen', room_play: 'Playroom', room_attic: 'Attic',
    chip_open: 'Open', chip_kitchen: 'Soon: feed Barsik baursaks', chip_play: 'Soon: toys and a ball',
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
    say_bye: "Come back soon! I'll be waiting."
  };

  /* ---------------------------------------------------------------- 中文 */
  T.zh = {
    house_name: '巴雷斯的家', wardrobe_name: '巴雷斯的衣柜', wardrobe_h1: '衣柜',
    into_house: '← 回到家里', back_lessons: '返回学习', back_grade: '返回选择年级',
    roof_aria: '屋顶上挂着“巴雷斯的家”的牌子',
    room_bed: '卧室和衣柜', room_kitchen: '厨房', room_play: '游戏室', room_attic: '阁楼',
    chip_open: '已开放', chip_kitchen: '即将推出：喂包尔萨克', chip_play: '即将推出：玩具和皮球',
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
    say_bye: '再来玩哦！我会等你的。'
  };

  /* ---------------------------------------------------------------- o'zbekcha (lotin, как на остальном сайте) */
  T.uz = {
    house_name: 'Barsikning uyi', wardrobe_name: 'Barsikning garderobi', wardrobe_h1: 'Garderob',
    into_house: '← Uyga', back_lessons: 'Darslarga qaytish', back_grade: 'Sinf tanlashga',
    roof_aria: '«Barsikning uyi» yozuvi bor uy tomi',
    room_bed: 'Yotoqxona va garderob', room_kitchen: 'Oshxona', room_play: 'O\'yin xonasi', room_attic: 'Chordoq',
    chip_open: 'Ochiq', chip_kitchen: 'Tez orada: boursoq bilan mehmon qilish', chip_play: 'Tez orada: o\'yinchoqlar va to\'p',
    goal_lbl: 'Mening maqsadim', btn_buy: 'Sotib olish', btn_wear: 'Kiyish', btn_off: 'Yechish', btn_need: 'Yana {n}',
    note: 'Yulduzlar o\'yinlar va darslar uchun yig\'iladi. Sotib olingan narsani istagancha yech va kiyib yuraverasan. Narsani kiyib qo\'ysang, Barsik boshqa sahifalarda ham shunda bo\'ladi.',
    goal_main: 'Yana {n} ta {games}, va {acc} olaman',
    goal_sub: '{price} yulduzdan {need} tasi yetmaydi. Bitta o\'yin uchun taxminan {per} yulduz beriladi.',
    goal_done_main: 'Yulduz hamma narsaga yetadi', goal_done_sub: 'Nimani kiyishni tanla. Yangi narsalar keyin chiqadi.',
    games_other: 'o\'yin',
    item_bow: 'Bantik', acc_bow: 'bantikni', item_cap: 'Kepka', acc_cap: 'kepkani',
    item_hat: 'Pomponli shapka', acc_hat: 'pomponli shapkani', item_scarf: 'Sharf', acc_scarf: 'sharfni',
    item_glasses: 'Qora ko\'zoynak', acc_glasses: 'qora ko\'zoynakni', item_cape: 'Qahramon plashchi', acc_cape: 'qahramon plashchini',
    item_crown: 'Toj', acc_crown: 'tojni',
    gift_ru_only: 'Kun sovg\'asi hozircha faqat rus tilida.', btn_ru: 'Ruscha',
    qk_house: 'Barsikning uyi', qk_gift: 'Kun sovg\'asi', qk_new: 'yangi', qk_got: 'olindi',
    say_hello1: 'Salom! Bu mening uyim. Kir!',
    say_hello2: 'Ura, kelding! Qani, nima kiyib ko\'rsam ekan?',
    say_wardrobe_in: 'Bu mening garderobim. Bu yerda barcha narsalarim turadi.',
    say_gift: 'Qara, menga bantik sovg\'a qilishdi! Rahmat!',
    say_wow1: 'Voy, qanday chiroyli!', say_wow2: 'Menga juda yarashdi!', say_wow3: 'Mana bu yangi kiyim!',
    say_wow4: 'Ura, men eng chiroyli mushukman!', say_wow5: 'Mur-r! Menga yoqdi!',
    say_buy_bow: 'Bantik! Xuddi bayramdagidek.', say_buy_cap: 'Kepka! Endi men sportchiman!',
    say_buy_hat: 'Pomponli shapka! Iliq va chiroyli!', say_buy_scarf: 'Sharf! Endi umuman sovuq qotmayman.',
    say_buy_glasses: 'Qora ko\'zoynak! Men chinakam yulduzman!', say_buy_cape: 'Qahramon plashchi! Masalalarni qutqarishga uchaman!',
    say_buy_crown: 'Toj! Endi men orolning shohiman!',
    say_need_more: 'Hozircha yulduz yetmaydi. Yana o\'ynaylik!',
    say_off: 'Yechaman. Boshqasini kiyib ko\'rgim kelyapti.',
    say_kitchen_soon: 'Bu yerda yaqinda oshxona bo\'ladi. Men boursoqni juda yaxshi ko\'raman!',
    say_play_soon: 'Bu yerda o\'yin xonasi bo\'ladi. Tez orada o\'ynaymiz!',
    say_bye: 'Yana kel! Men kutaman.'
  };

  /* ---------------------------------------------------------------- тоҷикӣ */
  T.tg = {
    house_name: 'Хонаи Барсик', wardrobe_name: 'Ҷевони либоси Барсик', wardrobe_h1: 'Ҷевони либос',
    into_house: '← Ба хона', back_lessons: 'Бозгашт ба дарсҳо', back_grade: 'Ба интихоби синф',
    roof_aria: 'Бому тахтаи «Хонаи Барсик»',
    room_bed: 'Хонаи хоб ва ҷевони либос', room_kitchen: 'Ошхона', room_play: 'Хонаи бозӣ', room_attic: 'Болохона',
    chip_open: 'Кушода', chip_kitchen: 'Ба қарибӣ: баурсак додан', chip_play: 'Ба қарибӣ: бозичаҳо ва тӯб',
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
    say_bye: 'Боз биё! Ман интизор мешавам.'
  };

  /* ---------------------------------------------------------------- уйғурчә (справа налево; в стрелках «→») */
  T.ug = {
    house_name: 'Барсикниң өйи', wardrobe_name: 'Барсикниң кийим ишкапи', wardrobe_h1: 'Кийим ишкапи',
    into_house: '→ Өйгә', back_lessons: 'Дәрскә қайтиш', back_grade: 'Синип таллашқа',
    roof_aria: '«Барсикниң өйи» дәп йезилған тахтай бар өй өгзиси',
    room_bed: 'Ятақ вә кийим ишкапи', room_kitchen: 'Ашхана', room_play: 'Оюн өйи', room_attic: 'Өгзә өй',
    chip_open: 'Очуқ', chip_kitchen: 'Йеқинда: бавирсақ бериш', chip_play: 'Йеқинда: оюнчуқ вә топ',
    goal_lbl: 'Мениң нишаним', btn_buy: 'Сетивелиш', btn_wear: 'Кийиш', btn_off: 'Селиш', btn_need: 'Йәнә {n}',
    note: 'Юлтузлар оюн вә дәрсләрдин йиғилиду. Сетивалған нәрсини халиғанчә селип вә кийип болиду. Нәрсини кийсиңиз, Барсик башқа бәтләрдиму шуни кийип туриду.',
    goal_main: 'Йәнә {n} {games}, андин {acc} алимән',
    goal_sub: '{price} юлтуздин {need} даниси йәтмәйду. Бир оюн үчүн тәхминән {per} юлтуз берилиду.',
    goal_done_main: 'Юлтуз һәрқандақ нәрсигә йетиду', goal_done_sub: 'Киймәкчи болғиниңизни таллаң. Йеңи нәрсиләр кейин чиқиду.',
    games_other: 'Оюн',
    item_bow: 'Кепинәк лента', acc_bow: 'Кепинәк лентини', item_cap: 'Спорт қалпиқи', acc_cap: 'Спорт қалпиқини',
    item_hat: 'Помпонлуқ қалпақ', acc_hat: 'Помпонлуқ қалпақни', item_scarf: 'Бойнибағ', acc_scarf: 'Бойнибағни',
    item_glasses: 'Қара көзәйнәк', acc_glasses: 'Қара көзәйнәкни', item_cape: 'Қәһриман йепинчиси', acc_cape: 'Қәһриман йепинчисини',
    item_crown: 'Таҗ', acc_crown: 'Таҗни',
    gift_ru_only: 'Күнлүк совғат һазирчә пәқәт русчә.', btn_ru: 'Русчә',
    qk_house: 'Барсикниң өйи', qk_gift: 'Күнлүк совғат', qk_new: 'Йеңи', qk_got: 'Елинди',
    say_hello1: 'Яхшимусиз! Бу мениң өйүм. Кириң!',
    say_hello2: 'Һә, кәлдиңиз! Келиң, мән немә кийәләймән, көрүп бақайли!',
    say_wardrobe_in: 'Бу мениң кийим ишкапим. Барлиқ нәрсилирим мушу йәрдә туриду.',
    say_gift: 'Қараң, маңа кепинәк лента соға қилинди! Рәһмәт!',
    say_wow1: 'Вай, немидегән чирайлиқ!', say_wow2: 'Маңа бәкму ярашти!', say_wow3: 'Мана бу йеңи кийим!',
    say_wow4: 'Һә, мән әң чирайлиқ мүшүк!', say_wow5: 'Мур-р! Маңа йеқип қалди!',
    say_buy_bow: 'Кепинәк лента! Худди байрамдикидәк.', say_buy_cap: 'Спорт қалпиқи! Әмди мән спортчи!',
    say_buy_hat: 'Помпонлуқ қалпақ! Иссиқ һәм чирайлиқ!', say_buy_scarf: 'Бойнибағ! Маңа һеч соғуқ әмәс.',
    say_buy_glasses: 'Қара көзәйнәк! Мән һәқиқий юлтуз!', say_buy_cape: 'Қәһриман йепинчиси! Мәсилиләрни қутқузғили учимән!',
    say_buy_crown: 'Таҗ! Әмди мән аралниң падишаһи!',
    say_need_more: 'Юлтуз һазирчә йәтмиди. Йәнә ойнайли!',
    say_off: 'Селиветимән. Башқа нәрсә кийип бақай.',
    say_kitchen_soon: 'Бу йәрдә ашхана болиду. Мән бавирсақни наһайити яхши көримән!',
    say_play_soon: 'Бу йәрдә оюн өйи болиду. Йеқинда ойнаймиз!',
    say_bye: 'Йәнә келиң! Мән күтимән.'
  };

  /* французский и немецкий: пока без собственных строк берём английские (цепочка прототипов); свои строки — Object.assign(T.fr, {...}) */
  T.fr = Object.create(T.en); T.de = Object.create(T.en);
  /* французский и немецкий: черновой перевод (нужна проверка носителями). */
  Object.assign(T.fr, {
    "house_name": "La maison de Barsik",
    "wardrobe_name": "La garde-robe de Barsik",
    "wardrobe_h1": "Garde-robe",
    "into_house": "← Vers la maison",
    "back_lessons": "Retour aux leçons",
    "back_grade": "Choisir une classe",
    "roof_aria": "Toit de la maison avec l'enseigne « La maison de Barsik »",
    "room_bed": "Chambre et garde-robe",
    "room_kitchen": "Cuisine",
    "room_play": "Salle de jeux",
    "room_attic": "Grenier",
    "chip_open": "Ouvert",
    "chip_kitchen": "Bientôt : donner des baursaks à Barsik",
    "chip_play": "Bientôt : jouets et ballon",
    "goal_lbl": "Mon objectif",
    "btn_buy": "Acheter",
    "btn_wear": "Mettre",
    "btn_off": "Enlever",
    "btn_need": "Encore {n}",
    "note": "Les étoiles s'accumulent grâce aux jeux et aux leçons. Tu peux enlever et remettre un objet acheté autant que tu veux. Si tu mets un objet, Barsik le garde aussi sur les autres pages.",
    "goal_main": "Encore {n} {games}, et j'achète {acc}",
    "goal_sub": "Il manque {need} étoiles sur {price}. Un jeu terminé rapporte environ {per}.",
    "goal_done_main": "Tu as assez d'étoiles pour n'importe quel objet",
    "goal_done_sub": "Choisis ce que tu veux mettre. De nouveaux objets arriveront plus tard.",
    "games_one": "jeu",
    "item_bow": "Nœud",
    "acc_bow": "un nœud",
    "item_cap": "Casquette",
    "acc_cap": "une casquette",
    "item_hat": "Bonnet à pompon",
    "acc_hat": "un bonnet à pompon",
    "item_scarf": "Écharpe",
    "acc_scarf": "une écharpe",
    "item_glasses": "Lunettes de soleil",
    "acc_glasses": "des lunettes de soleil",
    "item_cape": "Cape de héros",
    "acc_cape": "une cape de héros",
    "item_crown": "Couronne",
    "acc_crown": "une couronne",
    "gift_ru_only": "Pour l'instant, le cadeau du jour n'existe qu'en russe.",
    "btn_ru": "En russe",
    "qk_house": "La maison de Barsik",
    "qk_gift": "Cadeau du jour",
    "qk_new": "nouveau",
    "qk_got": "reçu",
    "say_hello1": "Salut ! Voici ma maison. Entre !",
    "say_hello2": "Hourra, tu es là ! Voyons ce que je peux mettre !",
    "say_wardrobe_in": "Voici ma garde-robe. Toutes mes affaires habitent ici.",
    "say_gift": "Regarde, on m'a offert un nœud ! Merci !",
    "say_wow1": "Oh là là, c'est joli !",
    "say_wow2": "Ça me va très bien !",
    "say_wow3": "Quelle belle nouveauté !",
    "say_wow4": "Hourra, je suis le chat le plus élégant !",
    "say_wow5": "Ronron ! J'adore !",
    "say_buy_bow": "Un nœud ! On dirait un jour de fête.",
    "say_buy_cap": "Une casquette ! Maintenant, je suis un sportif !",
    "say_buy_hat": "Un bonnet à pompon ! Chaud et mignon !",
    "say_buy_scarf": "Une écharpe ! Je n'ai plus froid du tout.",
    "say_buy_glasses": "Des lunettes de soleil ! Je ressemble à une vraie star !",
    "say_buy_cape": "Une cape de héros ! Je m'envole sauver les problèmes !",
    "say_buy_crown": "Une couronne ! Maintenant, je suis le roi de l'île !",
    "say_need_more": "Il me manque encore des étoiles. Jouons encore un peu !",
    "say_off": "Je l'enlève. Je veux essayer autre chose.",
    "say_kitchen_soon": "Ici, il y aura bientôt une cuisine. J'adore les baursaks !",
    "say_play_soon": "Ici, il y aura une salle de jeux. On jouera bientôt !",
    "say_bye": "Reviens vite ! Je t'attendrai.",
    "games_other": "jeux"
  });
  Object.assign(T.de, {
    "house_name": "Barsiks Haus",
    "wardrobe_name": "Barsiks Kleiderschrank",
    "wardrobe_h1": "Kleiderschrank",
    "into_house": "← Ins Haus",
    "back_lessons": "Zurück zu den Lektionen",
    "back_grade": "Zur Klassenauswahl",
    "roof_aria": "Dach des Hauses mit dem Schild „Barsiks Haus“",
    "room_bed": "Schlafzimmer und Kleiderschrank",
    "room_kitchen": "Küche",
    "room_play": "Spielzimmer",
    "room_attic": "Dachboden",
    "chip_open": "Geöffnet",
    "chip_kitchen": "Bald: Barsik mit Baursaks füttern",
    "chip_play": "Bald: Spielzeug und ein Ball",
    "goal_lbl": "Mein Ziel",
    "btn_buy": "Kaufen",
    "btn_wear": "Anziehen",
    "btn_off": "Ausziehen",
    "btn_need": "Noch {n}",
    "note": "Sterne gibt es für Spiele und Lektionen. Ein gekauftes Teil kannst du so oft ausziehen und wieder anziehen, wie du möchtest. Wenn du ein Teil anziehst, trägt Barsik es auch auf den anderen Seiten.",
    "goal_main": "Noch {n} {games}, und ich kaufe {acc}",
    "goal_sub": "Es fehlen {need} von {price} Sternen. Ein beendetes Spiel bringt etwa {per}.",
    "goal_done_main": "Du hast genug Sterne für jedes Teil",
    "goal_done_sub": "Such aus, was du anziehen möchtest. Neue Sachen kommen später dazu.",
    "games_one": "Spiel",
    "item_bow": "Schleife",
    "acc_bow": "eine Schleife",
    "item_cap": "Kappe",
    "acc_cap": "eine Kappe",
    "item_hat": "Bommelmütze",
    "acc_hat": "eine Bommelmütze",
    "item_scarf": "Schal",
    "acc_scarf": "einen Schal",
    "item_glasses": "Sonnenbrille",
    "acc_glasses": "eine Sonnenbrille",
    "item_cape": "Heldenumhang",
    "acc_cape": "einen Heldenumhang",
    "item_crown": "Krone",
    "acc_crown": "eine Krone",
    "gift_ru_only": "Das Tagesgeschenk gibt es vorerst nur auf Russisch.",
    "btn_ru": "Auf Russisch",
    "qk_house": "Barsiks Haus",
    "qk_gift": "Tagesgeschenk",
    "qk_new": "neu",
    "qk_got": "erhalten",
    "say_hello1": "Hallo! Das ist mein Haus. Komm rein!",
    "say_hello2": "Hurra, du bist da! Schauen wir mal, was ich anziehen kann!",
    "say_wardrobe_in": "Das ist mein Kleiderschrank. Hier wohnen alle meine Sachen.",
    "say_gift": "Schau mal, ich habe eine Schleife geschenkt bekommen! Danke!",
    "say_wow1": "Wow, wie schön!",
    "say_wow2": "Das steht mir richtig gut!",
    "say_wow3": "Was für ein tolles neues Teil!",
    "say_wow4": "Hurra, ich bin der schickste Kater!",
    "say_wow5": "Schnurr! Das gefällt mir!",
    "say_buy_bow": "Eine Schleife! Wie auf einem Fest.",
    "say_buy_cap": "Eine Kappe! Jetzt bin ich ein Sportler!",
    "say_buy_hat": "Eine Bommelmütze! Warm und niedlich!",
    "say_buy_scarf": "Ein Schal! Mir ist gar nicht mehr kalt.",
    "say_buy_glasses": "Eine Sonnenbrille! Ich sehe aus wie ein echter Star!",
    "say_buy_cape": "Ein Heldenumhang! Ich fliege los und rette die Aufgaben!",
    "say_buy_crown": "Eine Krone! Jetzt bin ich der König der Insel!",
    "say_need_more": "Mir fehlen noch Sterne. Lass uns noch ein bisschen spielen!",
    "say_off": "Ich ziehe es aus. Ich möchte etwas anderes anprobieren.",
    "say_kitchen_soon": "Hier wird bald eine Küche sein. Ich liebe Baursaks!",
    "say_play_soon": "Hier kommt ein Spielzimmer hin. Bald spielen wir!",
    "say_bye": "Komm bald wieder! Ich warte auf dich.",
    "games_other": "Spiele"
  });

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
    else if (cur === 'en' || cur === 'fr' || cur === 'de') form = (n === 1) ? 'one' : 'other';
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
