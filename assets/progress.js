/* ===== Білім Аралы — накопительный прогресс =====
   Общие звёзды за все игры сохраняются в этом браузере/устройстве
   (localStorage) — не пропадают при обновлении страницы или переходе
   между играми. Не требует аккаунта или пароля.

   ВАЖНАЯ ОГОВОРКА: это НЕ полноценный аккаунт — прогресс привязан
   к конкретному браузеру на конкретном устройстве. Если открыть сайт
   с другого телефона/компьютера или очистить данные браузера —
   прогресс не перенесётся. Настоящие аккаунты с входом по паролю —
   отдельная, более крупная задача на будущее.
*/

var PROGRESS_KEY = 'bilim_araly_progress_v1';
var PROGRESS_API_BASE = 'https://kids-platform-backend-production.up.railway.app';

function loadProgress(){
  try {
    var raw = localStorage.getItem(PROGRESS_KEY);
    if(raw) return JSON.parse(raw);
  } catch(e){ /* localStorage недоступен — просто не сохраняем */ }
  return { totalStars: 0, games: {} };
}

function saveProgress(data){
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
  } catch(e){ /* тихо игнорируем — например, приватный режим браузера */ }
}

/**
 * Вызывается каждой игрой на финальном экране.
 * gameKey — уникальный слаг игры (например 'count', 'addition', 'kazletter')
 * score — сколько правильных ответов набрано в этой сессии
 * total — сколько всего вопросов было в сессии
 */
function recordGameResult(gameKey, score, total){
  var data = loadProgress();
  data.totalStars = (data.totalStars || 0) + score;
  if(!data.games) data.games = {};

  var prev = data.games[gameKey] || { bestScore: 0, timesPlayed: 0 };
  data.games[gameKey] = {
    bestScore: Math.max(prev.bestScore || 0, score),
    total: total,
    timesPlayed: (prev.timesPlayed || 0) + 1,
    lastScore: score
  };

  saveProgress(data);
  updateProgressBadge();
  syncProgressToServer(gameKey, score, total); // не блокирует и не ломает работу без входа
}

/**
 * Если родитель вошёл и выбрал профиль ребёнка (childToken в localStorage) —
 * отправляет результат на сервер в фоне. Если токена нет (сайт используется
 * без входа, как раньше) — просто ничего не делает, localStorage уже сохранил.
 * Сетевые ошибки тихо игнорируются — прогресс уже в безопасности локально.
 */
function syncProgressToServer(gameKey, score, total){
  var token = null;
  try { token = localStorage.getItem('bilim_araly_child_token'); } catch(e){ return; }
  if(!token) return;
  try {
    fetch(PROGRESS_API_BASE + '/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ gameKey: gameKey, score: score, total: total })
    }).catch(function(){ /* нет связи — ничего страшного, попробуем в другой раз */ });
  } catch(e){ /* fetch недоступен в этом окружении — просто пропускаем */ }
}

function getTotalStars(){
  return loadProgress().totalStars || 0;
}

function updateProgressBadge(){
  var badge = document.getElementById('total-stars-badge');
  if(badge) badge.textContent = '⭐ ' + getTotalStars();
}

/**
 * Проверяет, сыграна ли игра хотя бы один раз.
 */
function isGameCompleted(gameKey){
  var data = loadProgress();
  return !!(data.games && data.games[gameKey] && data.games[gameKey].timesPlayed > 0);
}

/**
 * Разблокировка четвертей по прогрессу: следующая четверть открывается,
 * только когда пройдены ВСЕ игры из более ранних непустых четвертей.
 * Ищет на странице элементы с классом .island-grid[data-requires="key1,key2,..."]
 * и .quarter-heading[data-requires="..."] — если хоть одна игра из списка
 * не пройдена, блок помечается как заблокированный (класс .locked),
 * ссылки внутри становятся некликабельными, показывается объяснение.
 */
function applyQuarterLocks(){
  var blocks = document.querySelectorAll('[data-requires]');
  blocks.forEach(function(block){
    var required = block.getAttribute('data-requires');
    if(!required) return;
    var keys = required.split(',').map(function(k){ return k.trim(); }).filter(Boolean);
    var allDone = keys.every(function(k){ return isGameCompleted(k); });

    if(allDone){
      block.classList.remove('locked');
    } else {
      block.classList.add('locked');
    }
  });
}

document.addEventListener('DOMContentLoaded', function(){
  applyQuarterLocks();
});

function injectProgressBadge(){
  var header = document.querySelector('header');
  if(!header) return;
  if(document.getElementById('total-stars-badge')) return;

  var badge = document.createElement('div');
  badge.id = 'total-stars-badge';
  badge.className = 'total-stars-badge';
  badge.textContent = '⭐ ' + getTotalStars();

  var langToggle = header.querySelector('.lang-toggle');
  if(langToggle){
    header.insertBefore(badge, langToggle);
  } else {
    header.appendChild(badge);
  }
}

document.addEventListener('DOMContentLoaded', function(){
  injectProgressBadge();
  updateAuthLink();
});

/**
 * Если родитель уже вошёл — меняет "Войти" на имя выбранного ребёнка
 * (ссылка ведёт на выбор профиля) или на "Профили", если ребёнок ещё
 * не выбран. Если не вошёл — оставляет "Войти" как есть.
 */
function updateAuthLink(){
  var link = document.getElementById('auth-link');
  if(!link) return;
  var parentToken = null, childInfoRaw = null;
  try {
    parentToken = localStorage.getItem('bilim_araly_parent_token');
    childInfoRaw = localStorage.getItem('bilim_araly_child_info');
  } catch(e){ return; }

  if(!parentToken) return; // не вошёл — оставляем "Войти"

  link.href = 'profiles.html';
  if(childInfoRaw){
    try {
      var info = JSON.parse(childInfoRaw);
      link.textContent = (info.avatarEmoji || '🐆') + ' ' + info.name;
    } catch(e){ link.textContent = 'Профили'; }
  } else {
    link.textContent = 'Профили';
  }
}
