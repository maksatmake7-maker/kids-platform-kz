/* «Стань режиссёром»: готовые сказки по мотивам народных сюжетов (общее достояние), свои нарисованные герои. */
(function(){
function C(id,x,act,mv,s){ return ['c:'+id,x,326,s||230,'bounce','none',act||'stand',mv||'none']; }
function E(e,x,y,s,anim,idle){ return [e,x,y,s||110,anim||'zoom',idle||'none']; }
function S(bg,ru,kz,en,st,o){ o = o||{}; o.bg = bg; o.st = st; if(!o.tp) o.tp = 'top'; o.tx = {ru:ru,kz:kz,en:en}; return o; }
var B='bubble';
window.RZTALES = [
{id:'t_kolobok',tale:1,music:'merry',n:{ru:'Колобок',kz:'Домалақ нан',en:'The Little Bun'},sc:[
 S(8,'Бабушка испекла круглый Колобок','Әже домалақ нан пісірді','Grandma baked a little round bun',[C('grandma',300,'stand'),C('grandpa',620,'wave'),E('🥯',470,170,120,'bounce','float')]),
 S(5,'Я от дедушки ушёл, я от бабушки ушёл!','Мен атамнан да, әжемнен де кеттім!','I ran away from Grandpa and Grandma!',[E('🌲',140,320,200),E('🥯',330,300,110,'slide','spin'),C('rabbit',680,'wave'),E('🌲',860,330,190)],{tsty:B,sx:['boing']}),
 S(5,'И от тебя, Волк, уйду!','Сенен де кетем, Қасқыр!','And I will run from you too, Wolf!',[E('🥯',300,300,110,'slide','spin'),C('wolf',660,'talk','none',240),E('🌲',860,330,190)],{tsty:B,sx:['roar']}),
 S(5,'А Медведю я тоже скажу: до свидания!','Аюға да қош айтамын!','And goodbye to you too, Bear!',[E('🥯',300,300,110,'slide','spin'),C('bear',660,'wave','none',250),E('🌲',130,320,190)],{tsty:B}),
 S(0,'Хитрая Лиса перехитрила Колобка. Вот и сказке конец!','Айлакер Түлкі нанды алдап алды. Ертегі осымен бітті!','The clever Fox tricked the bun. The end!',[C('fox',480,'talk'),E('🥯',700,300,100,'zoom','float'),E('🌻',150,390,120)],{cam:'zin',sx:['ding']})
]},
{id:'t_repka',tale:1,music:'calm',n:{ru:'Репка',kz:'Асқабақ',en:'The Giant Turnip'},sc:[
 S(0,'Посадил дед репку','Ата шалғам егті','Grandpa planted a turnip',[C('grandpa',380,'stand'),E('🌱',650,380,130,'zoom','wiggle')]),
 S(0,'Выросла репка большая-пребольшая','Шалғам үлкен болып өсті','The turnip grew huge',[C('grandpa',330,'up'),E('🧅',680,330,230,'zoom')]),
 S(0,'Дед зовёт бабку. Тянут-потянут — вытянуть не могут!','Ата әжені шақырды. Тартады, бірақ шыға алмайды!','Grandpa calls Grandma. They pull and pull!',[C('grandpa',250,'walk'),C('grandma',470,'walk'),E('🧅',720,330,230,'zoom')],{tsty:B}),
 S(0,'Позвали внучку, кошку и мышку','Немересін, мысықты және тышқанды шақырды','They called the girl, the cat and the mouse',[C('grandpa',150,'walk','none',200),C('grandma',320,'walk','none',200),C('girl',480,'walk','none',200),C('cat',640,'walk','none',200),E('🐭',770,380,90,'bounce','wiggle'),E('🧅',880,330,200,'zoom')],{sx:['steps']}),
 S(0,'Ура! Вытянули репку все вместе!','Ура! Бәріміз бірге шалғамды суырдық!','Hooray! Together they pulled it out!',[C('grandpa',250,'up'),C('grandma',420,'dance'),C('girl',590,'jump'),E('🎉',480,100,120,'bounce','float')],{sx:['clap']})
]},
{id:'t_teremok',tale:1,music:'merry',n:{ru:'Теремок',kz:'Шағын үй',en:'The Little House'},sc:[
 S(5,'В лесу стоит теремок. В нём поселилась мышка','Орманда кішкентай үй тұр. Онда тышқан тұрады','A little house stands in the forest. A mouse moved in',[E('🌲',130,320,200),E('🏠',520,320,250),E('🐭',760,390,110,'bounce','wiggle')]),
 S(5,'Пришла лягушка: «Можно к вам?»','Бақа келді: «Кіруге бола ма?»','A frog came: "May I join you?"',[E('🏠',720,320,250),E('🐭',560,390,100),E('🐸',300,380,120,'slide','wiggle')],{tsty:B,sx:['boing']}),
 S(5,'Прибежали зайчик и лисичка','Қоян мен түлкі жүгіріп келді','A hare and a fox ran up',[E('🏠',720,320,230),C('rabbit',300,'walk','right',200),C('fox',520,'wave','none',200)]),
 S(5,'Пришёл серый волк. Все дружно его пустили','Сұр қасқыр келді. Бәрі оны қуана қабылдады','The grey wolf came. They welcomed him',[E('🏠',720,320,230),C('fox',280,'stand','none',190),C('wolf',470,'wave','none',210)]),
 S(5,'Пришёл медведь. Теремок затрещал — но все друзья построили новый, большой!','Аю келді. Үй қирады, бірақ достар жаңа, үлкен үй салды!','The bear came. The house cracked — but friends built a bigger one!',[C('bear',320,'wave','none',270),E('🏠',700,320,280),E('🎉',500,100,120,'bounce','float')],{sx:['roar','clap'],cam:'zin'})
]},
{id:'t_ryaba',tale:1,music:'calm',n:{ru:'Курочка Ряба',kz:'Тауық Ряба',en:'The Speckled Hen'},sc:[
 S(8,'Жили-были дед да баба, и была у них курочка Ряба','Ата мен әже тұрыпты, олардың тауығы болыпты','Once lived Grandpa and Grandma, and a speckled hen',[C('grandpa',250,'wave'),C('grandma',470,'stand'),E('🐔',730,360,170,'bounce','wiggle')]),
 S(8,'Снесла курочка яичко — не простое, золотое','Тауық жұмыртқа салды — қарапайым емес, алтын','The hen laid an egg — a golden one',[E('🐔',380,350,200,'bounce','wiggle'),E('🥚',700,330,120,'zoom','float'),E('✨',700,230,110,'fade','spin')],{sx:['ding']}),
 S(8,'Дед бил-бил — не разбил. Баба била-била — не разбила','Ата ұрды — сынбады. Әже ұрды — сынбады','Grandpa hit it — no crack. Grandma hit it — no crack',[C('grandpa',280,'up'),C('grandma',520,'up'),E('🥚',760,340,110)]),
 S(8,'Мышка бежала, хвостиком махнула — яичко упало и разбилось','Тышқан жүгіріп өтті, құйрығымен қақты — жұмыртқа сынды','A mouse ran by, flicked its tail — the egg fell and broke',[E('🐭',320,380,130,'slide','wiggle'),E('💥',600,330,160,'bounce')],{sx:['boing']}),
 S(8,'Не плачь, дед и баба! Я снесу вам другое яичко — простое!','Жылама, ата, жылама, әже! Мен сендерге басқа жұмыртқа саламын!','Don\'t cry! I will lay you another egg — a simple one!',[C('grandpa',250,'stand'),C('grandma',450,'stand'),E('🐔',700,360,170,'bounce','wiggle'),E('❤️',480,100,100,'fade','float')],{tsty:B})
]},
{id:'t_3bears',tale:1,music:'calm',n:{ru:'Три медведя',kz:'Үш аю',en:'The Three Bears'},sc:[
 S(5,'Девочка пошла в лес за грибами и заблудилась','Қыз орманға саңырауқұлақ теруге барып адасып қалды','A girl went to the forest for mushrooms and got lost',[E('🌲',130,320,200),C('girl',480,'walk','right'),E('🍄',800,390,100),E('🌲',880,330,190)],{sx:['steps']}),
 S(8,'В домике она нашла три чашки: большую, среднюю и маленькую','Үйден үш тостаған тапты: үлкен, орташа және кішкентай','In a house she found three bowls: big, medium and little',[C('girl',300,'eat'),E('🍲',560,380,150),E('🍲',690,390,115),E('🍲',790,395,85)]),
 S(8,'Наелась и уснула в маленькой кроватке','Тойып, кішкентай төсекке ұйықтап қалды','She ate and fell asleep in the little bed',[E('🛏️',500,370,260),C('girl',500,'sleep','none',210)],{light:'eve'}),
 S(8,'Вернулись три медведя: «Кто спал в моей кроватке?»','Үш аю қайтып келді: «Менің төсегімде кім жатыр?»','The three bears came back: "Who slept in my bed?"',[C('bear',250,'talk','none',300),C('bear',500,'stand','none',240),C('bear',720,'wave','none',180)],{tsty:B,sx:['roar']}),
 S(5,'Девочка проснулась, испугалась и убежала домой','Қыз оянып, қорқып, үйіне қашты','The girl woke up, got scared and ran home',[C('girl',350,'walk','right'),E('🌲',150,320,200),E('🏠',800,330,200)],{sx:['steps'],cam:'panr'})
]},
{id:'t_3pigs',tale:1,music:'adv',n:{ru:'Три поросёнка',kz:'Үш торай',en:'The Three Little Pigs'},sc:[
 S(5,'Жили-были три поросёнка. Они решили построить домики','Үш торай өмір сүріпті. Олар үй салуды шешті','Three little pigs decided to build houses',[E('🐷',280,370,150,'bounce','wiggle'),E('🐷',480,370,150,'bounce','wiggle'),E('🐷',680,370,150,'bounce','wiggle'),E('🌲',860,330,190)]),
 S(5,'Один построил домик из соломы, другой — из веток','Бірі сабаннан, екіншісі бұтақтан үй салды','One built a house of straw, another of sticks',[E('🌾',300,350,230),E('🪵',640,350,230),E('🐷',470,390,110,'bounce','wiggle')]),
 S(5,'А третий — из крепких кирпичей!','Ал үшіншісі мықты кірпіштен салды!','And the third built his house of strong bricks!',[E('🧱',480,340,260,'zoom'),E('🐷',720,390,140,'bounce','wiggle'),E('💪',250,260,110,'bounce')],{tsty:B}),
 S(5,'Пришёл волк: «Дую-дую — разрушу!»','Қасқыр келді: «Үрлеймін — қиратамын!»','A wolf came: "I\'ll huff and puff!"',[C('wolf',300,'talk','none',250),E('💨',560,310,150,'slide','wiggle'),E('🌾',780,350,200)],{tsty:B,sx:['wind','roar']}),
 S(5,'Кирпичный домик устоял, и все поросята спаслись!','Кірпіш үй мықты тұрды, үш торай да аман қалды!','The brick house stood strong. All three pigs were safe!',[E('🧱',500,340,270),E('🐷',250,390,140,'bounce','wiggle'),E('🐷',760,390,140,'bounce','wiggle'),E('🎉',500,90,120,'bounce','float')],{sx:['clap']})
]},
{id:'t_foxcrane',tale:1,music:'calm',n:{ru:'Лиса и журавль',kz:'Түлкі мен тырна',en:'The Fox and the Crane'},sc:[
 S(5,'Лиса позвала журавля в гости','Түлкі тырнаны қонаққа шақырды','The fox invited the crane for dinner',[C('fox',320,'wave'),E('🦢',650,340,230,'slide','wiggle'),E('🌲',880,330,190)],{tsty:B}),
 S(8,'Угощает кашей, размазанной по тарелке. Журавлю клювом не взять','Түлкі ботқаны тақтайға жайып берді. Тырнаға тұмсықпен алу қиын','She served porridge on a flat plate. The crane cannot eat it',[E('🍲',500,380,170),C('fox',250,'eat'),E('🦢',730,340,220,'zoom','wiggle'),E('❓',730,170,100,'bounce','float')]),
 S(8,'Тогда журавль позвал лису и подал еду в кувшине','Сонда тырна түлкіні шақырып, тамақты құмыраға салып берді','Then the crane invited the fox and served food in a jug',[E('🏺',520,350,200),E('🦢',250,340,220,'zoom','wiggle'),C('fox',730,'stand')]),
 S(8,'Лиса не достала. Не делай другим того, чего не хочешь себе!','Түлкі жей алмады. Өзіңе ұнамағанды басқаға жасама!','The fox could not reach it. Treat others as you want to be treated!',[C('fox',480,'sit'),E('🏺',730,360,150),E('💡',480,100,110,'bounce','float')],{sx:['ding'],tsty:B})
]},
{id:'t_aldar',tale:1,music:'adv',n:{ru:'Алдар Көсе и бай (по мотивам)',kz:'Алдар Көсе және бай (ертегі желісі бойынша)',en:'Aldar Kose and the Rich Man (retelling)'},sc:[
 S(3,'Хитроумный Алдар Көсе шёл по степи','Айлакер Алдар Көсе далада келе жатты','Clever Aldar Kose walked across the steppe',[C('kzboy',380,'walk','right'),E('⛺',780,320,240),E('☀️',860,90,100,'fade','spin')],{sx:['steps'],cam:'panr'}),
 S(3,'Жадный бай не захотел угостить гостя','Сараң бай қонақты тамақтандырғысы келмеді','The greedy rich man did not want to feed his guest',[C('grandpa',650,'talk','none',250),C('kzboy',280,'stand'),E('⛺',860,320,200)],{tsty:B}),
 S(3,'«У меня волшебный казан — он сам варит плов!» — сказал Алдар','«Менің сиқырлы қазаным бар — өзі палау пісіреді!» — деді Алдар','"I have a magic pot — it cooks pilaf by itself!" said Aldar',[C('kzboy',320,'talk','none',250),E('🍲',620,370,170,'zoom','wiggle'),E('✨',620,260,110,'fade','spin'),E('⛺',870,320,200)],{tsty:B,sx:['ding']}),
 S(3,'Бай поверил и отдал за него табун лошадей','Бай сеніп, қазан үшін жылқысын берді','The rich man believed him and gave a herd of horses',[C('grandpa',250,'stand','none',230),C('horse',540,'walk','right',240),C('kzboy',780,'dance')],{sx:['steps']}),
 S(3,'Но хитрость — не лучший путь. Честность и доброта дороже!','Бірақ айла — ең жақсы жол емес. Адалдық пен мейірім қымбат!','But tricks are not the best way. Honesty and kindness are worth more!',[C('kzboy',320,'wave'),C('kzgirl',560,'wave'),E('❤️',440,110,110,'bounce','float')],{light:'eve',sx:['clap']})
]},
{id:'t_duckling',tale:1,music:'calm',n:{ru:'Гадкий утёнок',kz:'Ұсқынсыз үйрек',en:'The Ugly Duckling'},sc:[
 S(4,'Вылупились на свет утята. Один был большой и серый','Үйрек балапандары шықты. Бірі үлкен әрі сұр болды','Ducklings hatched. One was big and grey',[E('🐥',250,360,120,'bounce','wiggle'),E('🐥',400,360,120,'bounce','wiggle'),E('🦆',640,350,170,'bounce','wiggle')]),
 S(5,'Все смеялись над ним, и он убежал','Бәрі оған күлді, ол қашып кетті','Everyone laughed at him, and he ran away',[E('🦆',650,350,170,'slide','wiggle'),E('😢',650,230,90,'fade','float'),E('🐥',280,360,110,'zoom')],{cam:'panl'}),
 S(6,'Зимой ему было холодно и одиноко','Қыста оған суық әрі жалғыз болды','In winter he was cold and lonely',[E('🦆',480,350,180,'zoom','wiggle'),E('❄️',250,150,90,'fade','float'),E('❄️',760,120,80,'fade','float')],{light:'eve',sx:['wind']}),
 S(4,'Весной он увидел прекрасных лебедей','Көктемде ол әдемі аққуларды көрді','In spring he saw beautiful swans',[E('🦢',300,340,200,'slide','float'),E('🦢',650,340,200,'slide','float'),E('🌸',480,110,100,'fade','float')]),
 S(4,'Он взглянул в воду — и увидел, что сам стал красивым лебедем!','Суға қарап, өзінің де әдемі аққу екенін көрді!','He looked in the water — and saw he was a swan too!',[E('🦢',480,330,260,'zoom','float'),E('✨',480,160,130,'fade','spin'),E('🎉',800,110,100,'bounce','float')],{sx:['ding','clap'],cam:'zin'})
]},
{id:'t_hood',tale:1,music:'adv',n:{ru:'Девочка и волк',kz:'Қыз бен қасқыр',en:'The Girl and the Wolf'},sc:[
 S(5,'Девочка шла через лес к бабушке с корзинкой пирожков','Қыз әжесіне ұштық себетпен орман арқылы бара жатты','A girl walked through the forest to Grandma with a basket of pies',[E('🌲',130,320,200),C('girl',480,'walk','right'),E('🧺',780,390,110),E('🌲',880,330,190)],{sx:['steps']}),
 S(5,'Навстречу вышел хитрый волк','Қарсы алдынан айлакер қасқыр шықты','A sly wolf stepped out to meet her',[C('girl',300,'stand'),C('wolf',680,'talk','none',250)],{tsty:B,sx:['roar']}),
 S(8,'Волк прибежал к бабушкиному дому первым','Қасқыр әженің үйіне бірінші жетті','The wolf reached Grandma\'s house first',[E('🏠',300,330,230),C('wolf',650,'walk','left',250),E('🛏️',880,370,150)],{sx:['steps']}),
 S(8,'Тут пришёл лесник и прогнал волка','Сол кезде орманшы келіп, қасқырды қуып жіберді','Then a woodsman came and drove the wolf away',[C('man',320,'up'),C('wolf',640,'walk','right',230),E('💨',520,330,130,'slide')],{sx:['roar']}),
 S(8,'Бабушка и внучка снова вместе. Они пьют чай с пирожками','Әже мен немере қайта қосылды. Олар шай ішіп, ұштық жеді','Grandma and the girl are together again, enjoying tea and pies',[C('grandma',300,'wave'),C('girl',560,'eat'),E('🍵',780,390,100),E('❤️',430,100,100,'bounce','float')],{sx:['ding']})
]},
{id:'t_hare',tale:1,music:'merry',n:{ru:'Заяц и черепаха',kz:'Қоян мен тасбақа',en:'The Hare and the Tortoise'},sc:[
 S(0,'Заяц хвастался, что быстрее всех. Черепаха предложила гонку','Қоян өзін ең жылдам санады. Тасбақа жарысуды ұсынды','The hare bragged he was fastest. The tortoise suggested a race',[C('rabbit',300,'talk','none',240),E('🐢',650,360,170,'bounce','wiggle'),E('🏁',860,330,130)],{tsty:B}),
 S(0,'Заяц побежал вперёд, а черепаха пошла потихоньку','Қоян алға жүгірді, тасбақа бірте-бірте жүрді','The hare dashed ahead; the tortoise walked slowly',[C('rabbit',640,'walk','right',220),E('🐢',250,360,150,'slide','wiggle')],{sx:['steps'],cam:'panr'}),
 S(5,'Заяц решил отдохнуть и уснул под деревом','Қоян демалмақ болып, ағаш түбінде ұйықтап қалды','The hare decided to rest and fell asleep under a tree',[E('🌲',300,320,230),C('rabbit',520,'sleep','none',230)],{light:'eve'}),
 S(0,'Черепаха шла и шла — и первой пришла к финишу!','Тасбақа тоқтамай жүріп, мәреге бірінші жетті!','The tortoise kept going — and reached the finish first!',[E('🐢',500,350,200,'zoom','wiggle'),E('🏁',760,330,150),E('🎉',500,100,130,'bounce','float')],{sx:['clap']}),
 S(0,'Не хвались, будь упорным — и победишь!','Мақтанба, табанды бол — жеңесің!','Don\'t boast — be persistent and you will win!',[C('rabbit',330,'sit'),E('🐢',640,360,180,'zoom','wiggle'),E('🏆',480,120,120,'bounce','float')],{sx:['ding']})
]}
];
})();
