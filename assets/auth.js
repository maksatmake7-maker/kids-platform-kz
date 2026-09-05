/* ===== Білім Аралы — работа с сервером (аккаунты и профили) =====
   Подключается на страницах входа/регистрации/выбора профиля.
   Использует те же ключи localStorage, что и progress.js, чтобы
   оба файла видели одни и те же токены.
*/

var API_BASE = 'https://kids-platform-backend-production.up.railway.app';

var PARENT_TOKEN_KEY = 'bilim_araly_parent_token';
var CHILD_TOKEN_KEY = 'bilim_araly_child_token';
var CHILD_INFO_KEY = 'bilim_araly_child_info'; // { name, avatarEmoji, grade, direction } — для мгновенного отображения без лишнего запроса

function getParentToken(){
  try { return localStorage.getItem(PARENT_TOKEN_KEY); } catch(e){ return null; }
}
function setParentToken(token){
  try { localStorage.setItem(PARENT_TOKEN_KEY, token); } catch(e){}
}
function clearParentToken(){
  try { localStorage.removeItem(PARENT_TOKEN_KEY); } catch(e){}
}

function getChildToken(){
  try { return localStorage.getItem(CHILD_TOKEN_KEY); } catch(e){ return null; }
}
function setChildToken(token){
  try { localStorage.setItem(CHILD_TOKEN_KEY, token); } catch(e){}
}
function clearChildToken(){
  try {
    localStorage.removeItem(CHILD_TOKEN_KEY);
    localStorage.removeItem(CHILD_INFO_KEY);
  } catch(e){}
}

function getChildInfo(){
  try {
    var raw = localStorage.getItem(CHILD_INFO_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e){ return null; }
}
function setChildInfo(info){
  try { localStorage.setItem(CHILD_INFO_KEY, JSON.stringify(info)); } catch(e){}
}

function apiRequest(path, options){
  options = options || {};
  var headers = options.headers || {};
  headers['Content-Type'] = 'application/json';
  return fetch(API_BASE + path, {
    method: options.method || 'GET',
    headers: headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  }).then(function(res){
    return res.json().then(function(data){
      if(!res.ok) throw new Error(data.error || 'Что-то пошло не так');
      return data;
    });
  });
}

function apiRequestAuth(path, options, token){
  options = options || {};
  options.headers = options.headers || {};
  options.headers['Authorization'] = 'Bearer ' + token;
  return apiRequest(path, options);
}

// ---------- регистрация и вход ----------

function registerAccount(accountType, organizationName, email, password, displayName){
  return apiRequest('/api/register', {
    method: 'POST',
    body: { accountType: accountType, organizationName: organizationName, email: email, password: password, displayName: displayName }
  }).then(function(data){
    setParentToken(data.token);
    return data;
  });
}

function loginAccount(email, password){
  return apiRequest('/api/login', {
    method: 'POST',
    body: { email: email, password: password }
  }).then(function(data){
    setParentToken(data.token);
    return data;
  });
}

function logoutParent(){
  clearParentToken();
  clearChildToken();
}

// ---------- детские профили ----------

function listChildren(){
  var token = getParentToken();
  if(!token) return Promise.reject(new Error('Не выполнен вход'));
  return apiRequestAuth('/api/children', {}, token);
}

function createChild(name, grade, direction, avatarEmoji){
  var token = getParentToken();
  if(!token) return Promise.reject(new Error('Не выполнен вход'));
  return apiRequestAuth('/api/children', {
    method: 'POST',
    body: { name: name, grade: grade, direction: direction, avatarEmoji: avatarEmoji }
  }, token);
}

function selectChild(childId, childMeta){
  var token = getParentToken();
  if(!token) return Promise.reject(new Error('Не выполнен вход'));
  return apiRequestAuth('/api/children/' + childId + '/select', { method: 'POST' }, token)
    .then(function(data){
      setChildToken(data.childToken);
      if(childMeta) setChildInfo(childMeta);
      return data;
    });
}

// ---------- перенос локального прогресса на сервер (один раз, по желанию) ----------

function importLocalProgressToServer(){
  var childToken = getChildToken();
  if(!childToken) return Promise.reject(new Error('Профиль ребёнка не выбран'));

  var local = loadProgress(); // из progress.js
  var entries = [];
  if(local.games){
    Object.keys(local.games).forEach(function(key){
      var g = local.games[key];
      entries.push({ gameKey: key, score: g.bestScore || 0, total: g.total || 0, timesPlayed: g.timesPlayed || 1 });
    });
  }
  if(entries.length === 0) return Promise.resolve({ ok: true, imported: 0 });

  return apiRequestAuth('/api/progress/import', { method: 'POST', body: { entries: entries } }, childToken);
}
