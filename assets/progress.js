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
}

function getTotalStars(){
  return loadProgress().totalStars || 0;
}

function updateProgressBadge(){
  var badge = document.getElementById('total-stars-badge');
  if(badge) badge.textContent = '⭐ ' + getTotalStars();
}

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
});
