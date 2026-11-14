/* Білім Аралы — тексты шахмат на языках сайта (assets/chess-text.js). Черновик перевода — на проверку носителем.
   CHESS_TEXT[язык][ключ]; язык берётся из localStorage 'bilim_lang_v1', запасной — русский. */
(function(){
  var T = {};
  T.ru = {
    title: 'Шахматы', sub: 'Игра, которая тренирует ум. Выбери уровень — от 1 до 11 класса.',
    cls: '{n} класс', tier1: 'Малыш', tier2: 'Новичок', tier3: 'Любитель', tier4: 'Знаток', tier5: 'Мастер', tier6: 'Эксперт',
    pickLevel: 'Выбери уровень', pickColor: 'Чем играешь?', white: 'Белыми', black: 'Чёрными', random: 'Как повезёт', start: 'Начать игру',
    back: '← На главную', beaten: 'Пройден', wins: 'Побед',
    turnYou: 'Твой ход', turnAi: 'Компьютер думает…', check: 'Шах!', youCheck: 'Тебе шах! Защити короля.',
    win: 'Мат! Ты победил! 🎉', lose: 'Мат. Компьютер выиграл. Попробуй ещё раз!', stalemate: 'Пат — ничья.', draw50: 'Ничья: 50 ходов без взятий и ходов пешек.',
    material: 'Ничья: не хватает фигур для мата.', repeat: 'Ничья: позиция повторилась три раза.',
    undo: 'Отменить ход', hint: 'Подсказка', again: 'Новая партия', levels: 'Уровни', help: 'Как ходят фигуры', next: 'Следующий уровень',
    promo: 'Во что превратить пешку?', Q: 'Ферзь', R: 'Ладья', B: 'Слон', N: 'Конь', P: 'Пешка', K: 'Король',
    helpTitle: 'Как ходят фигуры',
    hK: 'Король — на одну клетку в любую сторону. Его нельзя оставлять под шахом.', hQ: 'Ферзь — на любое число клеток по прямой и по диагонали.',
    hR: 'Ладья — по горизонтали и вертикали.', hB: 'Слон — по диагонали.', hN: 'Конь — буквой «Г», может перепрыгивать через фигуры.',
    hP: 'Пешка — вперёд на 1 клетку (с начала — на 2), а бьёт по диагонали вперёд.', hGoal: 'Цель — поставить мат: король под ударом, и ему некуда уйти.', ok: 'Понятно',
    bStart: 'Привет! Я Барсик. Давай играть! Нажми на фигуру, потом на клетку.', bGood: 'Хороший ход!', bCheckYou: 'Осторожно, король под шахом!', bCheckAi: 'Шах! Так держать!',
    bWin: 'Ура! Ты молодец!', bLose: 'Ничего, в следующий раз получится!', bDraw: 'Ничья — тоже неплохо!', bHint: 'Вот моя подсказка!', bUndo: 'Вернули ход. Подумай ещё!',
    lang: 'Язык'
  };
  T.kz = {
    title: 'Шахмат', sub: 'Ақылды жаттықтыратын ойын. Деңгейді таңда — 1-сыныптан 11-сыныпқа дейін.',
    cls: '{n}-сынып', tier1: 'Бүлдіршін', tier2: 'Жаңадан бастаушы', tier3: 'Әуесқой', tier4: 'Білгір', tier5: 'Шебер', tier6: 'Сарапшы',
    pickLevel: 'Деңгейді таңда', pickColor: 'Қай түспен ойнайсың?', white: 'Ақпен', black: 'Қарамен', random: 'Тағдыр шешсін', start: 'Ойынды бастау',
    back: '← Басты бетке', beaten: 'Өтілді', wins: 'Жеңіс',
    turnYou: 'Сенің жүрісің', turnAi: 'Компьютер ойланып жатыр…', check: 'Шах!', youCheck: 'Саған шах! Патшаны қорға.',
    win: 'Мат! Сен жеңдің! 🎉', lose: 'Мат. Компьютер жеңді. Тағы бір рет байқап көр!', stalemate: 'Пат — тең ойын.', draw50: 'Тең ойын: 50 жүріс бойы алу мен пешка жүрісі болмады.',
    material: 'Тең ойын: мат қою үшін фигура жетпейді.', repeat: 'Тең ойын: позиция үш рет қайталанды.',
    undo: 'Жүрісті қайтару', hint: 'Көмек', again: 'Жаңа партия', levels: 'Деңгейлер', help: 'Фигуралар қалай жүреді', next: 'Келесі деңгей',
    promo: 'Пешканы қандай фигураға айналдырамыз?', Q: 'Ферзь', R: 'Тура', B: 'Піл', N: 'Ат', P: 'Пешка', K: 'Патша',
    helpTitle: 'Фигуралар қалай жүреді',
    hK: 'Патша — кез келген бағытта бір шаршы. Оны шахта қалдыруға болмайды.', hQ: 'Ферзь — түзу және диагональ бойынша кез келген шаршыға.',
    hR: 'Тура — көлденең және тігінен.', hB: 'Піл — диагональ бойынша.', hN: 'Ат — «Г» әрпі тәрізді жүреді, фигуралардан секіріп өтеді.',
    hP: 'Пешка — алға бір шаршы (бастапқыда екі), ал диагональ бойынша алға қарай алады.', hGoal: 'Мақсат — мат қою: патша шахта тұр және қашатын жері жоқ.', ok: 'Түсінікті',
    bStart: 'Сәлем! Мен Барсикпін. Ойнайық! Фигураны, сосын шаршыны бас.', bGood: 'Жақсы жүріс!', bCheckYou: 'Абайла, патшаға шах!', bCheckAi: 'Шах! Солай жалғастыр!',
    bWin: 'Ура! Жарайсың!', bLose: 'Ештеңе етпейді, келесі жолы шығады!', bDraw: 'Тең ойын да жаман емес!', bHint: 'Міне, менің кеңесім!', bUndo: 'Жүріс қайтарылды. Тағы ойлан!',
    lang: 'Тіл'
  };
  T.en = {
    title: 'Chess', sub: 'A game that trains the mind. Pick a level — from grade 1 to grade 11.',
    cls: 'Grade {n}', tier1: 'Little one', tier2: 'Beginner', tier3: 'Amateur', tier4: 'Skilled', tier5: 'Master', tier6: 'Expert',
    pickLevel: 'Pick a level', pickColor: 'Which side?', white: 'White', black: 'Black', random: 'Surprise me', start: 'Start the game',
    back: '← Home', beaten: 'Beaten', wins: 'Wins',
    turnYou: 'Your move', turnAi: 'The computer is thinking…', check: 'Check!', youCheck: 'You are in check! Protect your king.',
    win: 'Checkmate! You won! 🎉', lose: 'Checkmate. The computer won. Try again!', stalemate: 'Stalemate — a draw.', draw50: 'Draw: 50 moves without a capture or pawn move.',
    material: 'Draw: not enough pieces to checkmate.', repeat: 'Draw: the position repeated three times.',
    undo: 'Undo move', hint: 'Hint', again: 'New game', levels: 'Levels', help: 'How the pieces move', next: 'Next level',
    promo: 'What should the pawn become?', Q: 'Queen', R: 'Rook', B: 'Bishop', N: 'Knight', P: 'Pawn', K: 'King',
    helpTitle: 'How the pieces move',
    hK: 'King — one square in any direction. You must never leave it in check.', hQ: 'Queen — any number of squares in a straight line or diagonal.',
    hR: 'Rook — along rows and columns.', hB: 'Bishop — along diagonals.', hN: 'Knight — in an “L” shape, and it can jump over pieces.',
    hP: 'Pawn — forward one square (two from the start) and captures diagonally forward.', hGoal: 'The goal is checkmate: the king is attacked and has nowhere to go.', ok: 'Got it',
    bStart: "Hi! I'm Barsik. Let's play! Tap a piece, then tap a square.", bGood: 'Nice move!', bCheckYou: 'Careful, your king is in check!', bCheckAi: 'Check! Keep it up!',
    bWin: 'Hooray! Well done!', bLose: "That's okay, next time you'll win!", bDraw: 'A draw is not bad either!', bHint: "Here's my hint!", bUndo: 'Move taken back. Think again!',
    lang: 'Language'
  };
  T.zh = {
    title: '国际象棋', sub: '锻炼大脑的游戏。选择难度——从1年级到11年级。',
    cls: '{n}年级', tier1: '小宝宝', tier2: '新手', tier3: '爱好者', tier4: '行家', tier5: '大师', tier6: '专家',
    pickLevel: '选择难度', pickColor: '你执哪一方？', white: '白方', black: '黑方', random: '随机', start: '开始游戏',
    back: '← 返回首页', beaten: '已通关', wins: '胜场',
    turnYou: '轮到你了', turnAi: '电脑在思考……', check: '将军！', youCheck: '你被将军了！保护好国王。',
    win: '将死！你赢了！🎉', lose: '被将死了。电脑赢了。再试一次吧！', stalemate: '无子可动——和棋。', draw50: '和棋：50步内没有吃子和兵的移动。',
    material: '和棋：子力不足以将死。', repeat: '和棋：局面重复了三次。',
    undo: '悔棋', hint: '提示', again: '新的一局', levels: '难度', help: '棋子怎么走', next: '下一难度',
    promo: '兵要升变成什么？', Q: '后', R: '车', B: '象', N: '马', P: '兵', K: '王',
    helpTitle: '棋子怎么走',
    hK: '王——向任何方向走一格。不能让王被将军。', hQ: '后——沿直线或斜线走任意格数。',
    hR: '车——沿横线和竖线走。', hB: '象——沿斜线走。', hN: '马——走“日”字，可以跳过其他棋子。',
    hP: '兵——向前走一格（开局可走两格），斜前方吃子。', hGoal: '目标是将死：王被攻击且无处可逃。', ok: '明白了',
    bStart: '你好！我是巴尔西克。我们来下棋吧！先点棋子，再点格子。', bGood: '走得好！', bCheckYou: '小心，你的王被将军了！', bCheckAi: '将军！继续加油！',
    bWin: '太棒了！你真厉害！', bLose: '没关系，下次一定行！', bDraw: '和棋也不错！', bHint: '这是我的提示！', bUndo: '已悔棋。再想一想！',
    lang: '语言'
  };
  T.uz = {
    title: 'Shaxmat', sub: 'Aqlni charxlaydigan o‘yin. Darajani tanla — 1-sinfdan 11-sinfgacha.',
    cls: '{n}-sinf', tier1: 'Bolakay', tier2: 'Yangi boshlovchi', tier3: 'Havaskor', tier4: 'Bilimdon', tier5: 'Usta', tier6: 'Ekspert',
    pickLevel: 'Darajani tanla', pickColor: 'Qaysi rang bilan o‘ynaysan?', white: 'Oq', black: 'Qora', random: 'Qur’a', start: 'O‘yinni boshlash',
    back: '← Bosh sahifaga', beaten: 'O‘tilgan', wins: 'G‘alaba',
    turnYou: 'Sening yurishing', turnAi: 'Kompyuter o‘ylayapti…', check: 'Shoh!', youCheck: 'Senga shoh! Shohni himoya qil.',
    win: 'Mat! Sen yutding! 🎉', lose: 'Mat. Kompyuter yutdi. Yana urinib ko‘r!', stalemate: 'Pat — durang.', draw50: 'Durang: 50 yurish davomida olish va piyoda yurishi bo‘lmadi.',
    material: 'Durang: mat qilish uchun donalar yetmaydi.', repeat: 'Durang: pozitsiya uch marta takrorlandi.',
    undo: 'Yurishni qaytarish', hint: 'Maslahat', again: 'Yangi partiya', levels: 'Darajalar', help: 'Donalar qanday yuradi', next: 'Keyingi daraja',
    promo: 'Piyoda qaysi donaga aylansin?', Q: 'Farzin', R: 'Rux', B: 'Fil', N: 'Ot', P: 'Piyoda', K: 'Shoh',
    helpTitle: 'Donalar qanday yuradi',
    hK: 'Shoh — istalgan tomonga bir katak. Uni shoh ostida qoldirib bo‘lmaydi.', hQ: 'Farzin — to‘g‘ri chiziq va diagonal bo‘ylab istalgancha katak.',
    hR: 'Rux — gorizontal va vertikal bo‘ylab.', hB: 'Fil — diagonal bo‘ylab.', hN: 'Ot — “G” harfi shaklida yuradi, donalar ustidan sakrab o‘tadi.',
    hP: 'Piyoda — oldinga bir katak (boshida ikki katak), diagonal bo‘yicha oldinga uradi.', hGoal: 'Maqsad — mat qo‘yish: shoh hujum ostida va qochadigan joyi yo‘q.', ok: 'Tushunarli',
    bStart: 'Salom! Men Barsikman. O‘ynaymiz! Avval donani, keyin katakni bos.', bGood: 'Yaxshi yurish!', bCheckYou: 'Ehtiyot bo‘l, shohga shoh!', bCheckAi: 'Shoh! Shunday davom et!',
    bWin: 'Hurray! Barakalla!', bLose: 'Hechqisi yo‘q, keyingi safar bo‘ladi!', bDraw: 'Durang ham yomon emas!', bHint: 'Mana mening maslahatim!', bUndo: 'Yurish qaytarildi. Yana o‘yla!',
    lang: 'Til'
  };
  T.tg = {
    title: 'Шоҳмот', sub: 'Бозие, ки ақлро машқ медиҳад. Сатҳро интихоб кун — аз синфи 1 то синфи 11.',
    cls: 'Синфи {n}', tier1: 'Кӯдак', tier2: 'Навомӯз', tier3: 'Дӯстдор', tier4: 'Донишманд', tier5: 'Устод', tier6: 'Эксперт',
    pickLevel: 'Сатҳро интихоб кун', pickColor: 'Бо кадом ранг бозӣ мекунӣ?', white: 'Сафед', black: 'Сиёҳ', random: 'Бо қуръа', start: 'Оғози бозӣ',
    back: '← Ба саҳифаи асосӣ', beaten: 'Гузашта шуд', wins: 'Ғалаба',
    turnYou: 'Навбати ту', turnAi: 'Компютер фикр карда истодааст…', check: 'Шоҳ!', youCheck: 'Ба ту шоҳ! Шоҳро ҳимоя кун.',
    win: 'Мот! Ту ғолиб омадӣ! 🎉', lose: 'Мот. Компютер ғолиб омад. Боз кӯшиш кун!', stalemate: 'Пат — дуранг.', draw50: 'Дуранг: дар 50 ҳаракат гирифтан ва ҳаракати пиёда набуд.',
    material: 'Дуранг: барои мот кардан сангҳо намерасанд.', repeat: 'Дуранг: вазъият се маротиба такрор шуд.',
    undo: 'Бозгашти ҳаракат', hint: 'Маслиҳат', again: 'Бозии нав', levels: 'Сатҳҳо', help: 'Сангҳо чӣ тавр ҳаракат мекунанд', next: 'Сатҳи навбатӣ',
    promo: 'Пиёда ба кадом санг табдил ёбад?', Q: 'Вазир', R: 'Рух', B: 'Фил', N: 'Асп', P: 'Пиёда', K: 'Шоҳ',
    helpTitle: 'Сангҳо чӣ тавр ҳаракат мекунанд',
    hK: 'Шоҳ — ба ҳар тараф як хона. Онро зери шоҳ мондан мумкин нест.', hQ: 'Вазир — ба хатти рост ва диагонал ба ҳар қадар хона.',
    hR: 'Рух — уфуқӣ ва амудӣ.', hB: 'Фил — диагонал.', hN: 'Асп — ба шакли ҳарфи «Г», аз болои сангҳо мепарад.',
    hP: 'Пиёда — ба пеш як хона (аз аввал ду хона), диагонал ба пеш мегирад.', hGoal: 'Мақсад — мот гузоштан: шоҳ зери зарба аст ва ҷои гурез надорад.', ok: 'Фаҳмо',
    bStart: 'Салом! Ман Барсикам. Биё бозӣ кунем! Аввал санг, баъд хонаро пахш кун.', bGood: 'Ҳаракати хуб!', bCheckYou: 'Эҳтиёт шав, ба шоҳ шоҳ!', bCheckAi: 'Шоҳ! Чунин идома деҳ!',
    bWin: 'Ура! Офарин!', bLose: 'Ҳечи гап нест, дафъаи оянда мешавад!', bDraw: 'Дуранг ҳам бад нест!', bHint: 'Инак маслиҳати ман!', bUndo: 'Ҳаракат баргашт. Боз фикр кун!',
    lang: 'Забон'
  };
  T.ug = {
    title: 'Шаһмат', sub: 'Әқилни машиқландуридиған оюн. Дәрижини таллиғин — 1-синиптин 11-синипқичә.',
    cls: '{n}-синип', tier1: 'Бовақ', tier2: 'Йеңи башлиғучи', tier3: 'Һәвәскар', tier4: 'Билимдан', tier5: 'Уста', tier6: 'Әксперт',
    pickLevel: 'Дәрижини таллиғин', pickColor: 'Қайси рәң билән ойнайсән?', white: 'Ақ', black: 'Қара', random: 'Қуръа', start: 'Оюнни башлаш',
    back: '← Бешиға', beaten: 'Өтүлди', wins: 'Ғәләбә',
    turnYou: 'Сениң йүришиң', turnAi: 'Компьютер ойлиниватиду…', check: 'Шаһ!', youCheck: 'Саңа шаһ! Шаһни қоғда.',
    win: 'Мат! Сән ғәлибә қилдиң! 🎉', lose: 'Мат. Компьютер ғалип кәлди. Йәнә бир қетим синап бақ!', stalemate: 'Пат — тәң.', draw50: 'Тәң: 50 йүриш җәрянида елиш вә пияда йүриши болмиди.',
    material: 'Тәң: мат қоюшқа фигура йетишмәйду.', repeat: 'Тәң: ситуация үч қетим тәкрарланди.',
    undo: 'Йүришни қайтуруш', hint: 'Мәслиһәт', again: 'Йеңи партия', levels: 'Дәрижиләр', help: 'Фигуралар қандақ йүриду', next: 'Кейинки дәриҗә',
    promo: 'Пияда қайси фигурага айлансун?', Q: 'Вәзир', R: 'Рух', B: 'Пил', N: 'Ат', P: 'Пияда', K: 'Шаһ',
    helpTitle: 'Фигуралар қандақ йүриду',
    hK: 'Шаһ — һәр қандақ тәрәпкә бир уяча. Уни шаһ астида қалдурушқа болмайду.', hQ: 'Вәзир — тик сизиқ вә диагонал бойичә һәр қанчә уяча.',
    hR: 'Рух — туруқ вә көлдәнәң.', hB: 'Пил — диагонал бойичә.', hN: 'Ат — «Г» һәрпи шәклидә йүриду, фигуралардин секрәп өтиду.',
    hP: 'Пияда — алдиға бир уяча (башта икки), диагонал бойичә алдиға уриду.', hGoal: 'Мәқсәт — мат қоюш: шаһ һуҗум астида вә қечишқа йери йоқ.', ok: 'Чүшинәрлик',
    bStart: 'Салам! Мән Барсик. Ойнайли! Алди билән фигурини, андин уячини бас.', bGood: 'Яхши йүриш!', bCheckYou: 'Еһтият қил, шаһқа шаһ!', bCheckAi: 'Шаһ! Шундақ давамлаштур!',
    bWin: 'Урра! Алқиш!', bLose: 'Хата әмәс, кейинки қетим болиду!', bDraw: 'Тәң болуши һәм яманмас!', bHint: 'Мана мениң мәслиһитим!', bUndo: 'Йүриш қайтурулди. Йәнә ойлан!',
    lang: 'Тил'
  };
  T.fr = {
    title: 'Échecs', sub: 'Un jeu qui entraîne l’esprit. Choisis un niveau — de la 1re à la 11e année.',
    cls: 'Niveau {n}', tier1: 'Petit', tier2: 'Débutant', tier3: 'Amateur', tier4: 'Connaisseur', tier5: 'Maître', tier6: 'Expert',
    pickLevel: 'Choisis un niveau', pickColor: 'Avec quelle couleur ?', white: 'Blancs', black: 'Noirs', random: 'Au hasard', start: 'Commencer la partie',
    back: '← Accueil', beaten: 'Réussi', wins: 'Victoires',
    turnYou: 'À toi de jouer', turnAi: 'L’ordinateur réfléchit…', check: 'Échec !', youCheck: 'Tu es en échec ! Protège ton roi.',
    win: 'Échec et mat ! Tu as gagné ! 🎉', lose: 'Échec et mat. L’ordinateur a gagné. Réessaie !', stalemate: 'Pat — match nul.', draw50: 'Nul : 50 coups sans prise ni coup de pion.',
    material: 'Nul : pas assez de pièces pour faire mat.', repeat: 'Nul : la position s’est répétée trois fois.',
    undo: 'Annuler le coup', hint: 'Indice', again: 'Nouvelle partie', levels: 'Niveaux', help: 'Comment bougent les pièces', next: 'Niveau suivant',
    promo: 'En quoi transformer le pion ?', Q: 'Dame', R: 'Tour', B: 'Fou', N: 'Cavalier', P: 'Pion', K: 'Roi',
    helpTitle: 'Comment bougent les pièces',
    hK: 'Le roi — d’une case dans toutes les directions. On ne doit jamais le laisser en échec.', hQ: 'La dame — d’autant de cases que l’on veut, en ligne droite ou en diagonale.',
    hR: 'La tour — en ligne et en colonne.', hB: 'Le fou — en diagonale.', hN: 'Le cavalier — en « L », et il peut sauter par-dessus les pièces.',
    hP: 'Le pion — d’une case en avant (deux au départ) et il prend en diagonale vers l’avant.', hGoal: 'Le but : faire échec et mat — le roi est attaqué et ne peut plus s’échapper.', ok: 'Compris',
    bStart: 'Salut ! Je suis Barsik. On joue ! Touche une pièce, puis une case.', bGood: 'Joli coup !', bCheckYou: 'Attention, ton roi est en échec !', bCheckAi: 'Échec ! Continue comme ça !',
    bWin: 'Hourra ! Bravo !', bLose: 'Ce n’est pas grave, la prochaine fois tu y arriveras !', bDraw: 'Un nul, ce n’est pas mal non plus !', bHint: 'Voici mon indice !', bUndo: 'Coup annulé. Réfléchis encore !',
    lang: 'Langue'
  };
  T.de = {
    title: 'Schach', sub: 'Ein Spiel, das den Kopf trainiert. Wähle eine Stufe — von der 1. bis zur 11. Klasse.',
    cls: 'Klasse {n}', tier1: 'Kleiner Spatz', tier2: 'Anfänger', tier3: 'Hobbyspieler', tier4: 'Kenner', tier5: 'Meister', tier6: 'Experte',
    pickLevel: 'Wähle eine Stufe', pickColor: 'Mit welcher Farbe?', white: 'Weiß', black: 'Schwarz', random: 'Zufall', start: 'Spiel starten',
    back: '← Startseite', beaten: 'Geschafft', wins: 'Siege',
    turnYou: 'Du bist dran', turnAi: 'Der Computer denkt nach …', check: 'Schach!', youCheck: 'Du stehst im Schach! Schütze deinen König.',
    win: 'Schachmatt! Du hast gewonnen! 🎉', lose: 'Schachmatt. Der Computer hat gewonnen. Versuch es nochmal!', stalemate: 'Patt — Unentschieden.', draw50: 'Remis: 50 Züge ohne Schlagen und ohne Bauernzug.',
    material: 'Remis: zu wenig Figuren für ein Matt.', repeat: 'Remis: die Stellung wurde dreimal wiederholt.',
    undo: 'Zug zurück', hint: 'Tipp', again: 'Neue Partie', levels: 'Stufen', help: 'Wie ziehen die Figuren?', next: 'Nächste Stufe',
    promo: 'In was soll sich der Bauer verwandeln?', Q: 'Dame', R: 'Turm', B: 'Läufer', N: 'Springer', P: 'Bauer', K: 'König',
    helpTitle: 'Wie ziehen die Figuren?',
    hK: 'König — ein Feld in jede Richtung. Er darf nie im Schach stehen bleiben.', hQ: 'Dame — beliebig viele Felder geradeaus oder diagonal.',
    hR: 'Turm — waagerecht und senkrecht.', hB: 'Läufer — diagonal.', hN: 'Springer — in „L“-Form, er kann über Figuren springen.',
    hP: 'Bauer — ein Feld vorwärts (am Anfang zwei) und schlägt diagonal nach vorn.', hGoal: 'Das Ziel ist Schachmatt: Der König wird angegriffen und kann nicht mehr fliehen.', ok: 'Verstanden',
    bStart: 'Hallo! Ich bin Barsik. Lass uns spielen! Tippe eine Figur an, dann ein Feld.', bGood: 'Guter Zug!', bCheckYou: 'Vorsicht, dein König steht im Schach!', bCheckAi: 'Schach! Weiter so!',
    bWin: 'Hurra! Gut gemacht!', bLose: 'Macht nichts, beim nächsten Mal klappt es!', bDraw: 'Ein Remis ist auch nicht schlecht!', bHint: 'Hier ist mein Tipp!', bUndo: 'Zug zurückgenommen. Denk nochmal nach!',
    lang: 'Sprache'
  };
  window.CHESS_TEXT = T;
})();
