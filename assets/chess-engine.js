/* Білім Аралы — шахматный движок (assets/chess-engine.js)
   Правила (ходы, рокировка, взятие на проходе, превращение, шах, мат, пат, ничьи) и компьютер-соперник на 11 уровней.
   Работает и в обычной странице, и в Web Worker (assets/chess-worker.js). Без внешних библиотек. */
(function(root){
  'use strict';
  /* фигуры: 1 пешка, 2 конь, 3 слон, 4 ладья, 5 ферзь, 6 король; чёрные = +8 */
  var P = 1, N = 2, B = 3, R = 4, Q = 5, K = 6;
  var START = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  var CH = { p: 1, n: 2, b: 3, r: 4, q: 5, k: 6 }, LET = ' pnbrqk';
  var KN = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]];
  var KG = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  var DB = [[-1,-1],[-1,1],[1,-1],[1,1]], DR = [[-1,0],[1,0],[0,-1],[0,1]];

  /* клетка = r*8+c; r=0 — восьмая горизонталь (верх доски у белых), c=0 — вертикаль a */
  function Pos(){ this.b = new Int8Array(64); this.side = 0; this.castle = 15; this.ep = -1; this.half = 0; this.full = 1; this.kw = 60; this.kb = 4; }
  Pos.prototype.clone = function(){ var p = new Pos(); p.b.set(this.b); p.side = this.side; p.castle = this.castle; p.ep = this.ep; p.half = this.half; p.full = this.full; p.kw = this.kw; p.kb = this.kb; return p; };

  function fromFEN(fen){
    var p = new Pos(), parts = fen.split(' '), rows = parts[0].split('/'), r, c, i, ch;
    for (r = 0; r < 8; r++){ c = 0; for (i = 0; i < rows[r].length; i++){ ch = rows[r][i];
      if (ch >= '1' && ch <= '8'){ c += +ch; continue; }
      var lo = ch.toLowerCase(), v = CH[lo] + (ch === lo ? 8 : 0); p.b[r * 8 + c] = v; if (lo === 'k'){ if (ch === lo) p.kb = r * 8 + c; else p.kw = r * 8 + c; } c++; } }
    p.side = parts[1] === 'b' ? 1 : 0; p.castle = 0; var cs = parts[2] || '-';
    if (cs.indexOf('K') >= 0) p.castle |= 1; if (cs.indexOf('Q') >= 0) p.castle |= 2; if (cs.indexOf('k') >= 0) p.castle |= 4; if (cs.indexOf('q') >= 0) p.castle |= 8;
    p.ep = (parts[3] && parts[3] !== '-') ? (8 - +parts[3][1]) * 8 + (parts[3].charCodeAt(0) - 97) : -1;
    p.half = +parts[4] || 0; p.full = +parts[5] || 1; return p;
  }
  function toFEN(p){
    var s = '', r, c, e, v;
    for (r = 0; r < 8; r++){ e = 0; for (c = 0; c < 8; c++){ v = p.b[r * 8 + c]; if (!v){ e++; continue; } if (e){ s += e; e = 0; } s += (v & 8) ? LET[v & 7] : LET[v & 7].toUpperCase(); } if (e) s += e; if (r < 7) s += '/'; }
    var cs = (p.castle & 1 ? 'K' : '') + (p.castle & 2 ? 'Q' : '') + (p.castle & 4 ? 'k' : '') + (p.castle & 8 ? 'q' : '');
    return s + ' ' + (p.side ? 'b' : 'w') + ' ' + (cs || '-') + ' ' + (p.ep >= 0 ? String.fromCharCode(97 + p.ep % 8) + (8 - (p.ep >> 3)) : '-') + ' ' + p.half + ' ' + p.full;
  }
  function key(p){ return toFEN(p).split(' ').slice(0, 4).join(' '); }
  function hash(p){ var h = 17, i, b = p.b; for (i = 0; i < 64; i++) h = (Math.imul(h, 31) + b[i]) | 0; return (Math.imul(h, 31) + p.side + p.castle * 2 + (p.ep + 1) * 32) | 0; }

  /* ход закодирован числом: from | to<<6 | promo<<12 (тип фигуры) | flags<<16 (1 взятие, 2 на проходе, 4 рокировка, 8 двойной ход пешки) */
  function mFrom(m){ return m & 63; } function mTo(m){ return (m >> 6) & 63; } function mPromo(m){ return (m >> 12) & 7; } function mFlags(m){ return m >> 16; }
  function mk(f, t, pr, fl){ return f | (t << 6) | ((pr || 0) << 12) | ((fl || 0) << 16); }

  /* атакована ли клетка sq стороной by (0 белые, 1 чёрные) */
  function attacked(p, sq, by){
    var b = p.b, r = sq >> 3, c = sq & 7, i, rr, cc, v, d, o = by ? 8 : 0;
    var pr = by ? r - 1 : r + 1;   // откуда бьют пешки
    if (pr >= 0 && pr < 8){ if (c > 0 && b[pr * 8 + c - 1] === P + o) return true; if (c < 7 && b[pr * 8 + c + 1] === P + o) return true; }
    for (i = 0; i < 8; i++){ rr = r + KN[i][0]; cc = c + KN[i][1]; if (rr >= 0 && rr < 8 && cc >= 0 && cc < 8 && b[rr * 8 + cc] === N + o) return true; }
    for (i = 0; i < 8; i++){ rr = r + KG[i][0]; cc = c + KG[i][1]; if (rr >= 0 && rr < 8 && cc >= 0 && cc < 8 && b[rr * 8 + cc] === K + o) return true; }
    for (d = 0; d < 4; d++){ rr = r + DB[d][0]; cc = c + DB[d][1];
      while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8){ v = b[rr * 8 + cc]; if (v){ if (v === B + o || v === Q + o) return true; break; } rr += DB[d][0]; cc += DB[d][1]; } }
    for (d = 0; d < 4; d++){ rr = r + DR[d][0]; cc = c + DR[d][1];
      while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8){ v = b[rr * 8 + cc]; if (v){ if (v === R + o || v === Q + o) return true; break; } rr += DR[d][0]; cc += DR[d][1]; } }
    return false;
  }
  function inCheck(p, side){ return attacked(p, side ? p.kb : p.kw, side ? 0 : 1); }

  /* псевдолегальные ходы (без проверки шаха своему королю) */
  function gen(p, capsOnly){
    var out = [], b = p.b, side = p.side, o = side ? 8 : 0, sq, v, t, r, c, i, rr, cc, d, to, tv, dir = side ? 1 : -1, start = side ? 1 : 6, last = side ? 7 : 0;
    for (sq = 0; sq < 64; sq++){
      v = b[sq]; if (!v || ((v & 8) ? 1 : 0) !== side) continue; t = v & 7; r = sq >> 3; c = sq & 7;
      if (t === P){
        rr = r + dir;
        if (rr >= 0 && rr < 8){
          for (i = -1; i <= 1; i += 2){ cc = c + i; if (cc < 0 || cc > 7) continue; to = rr * 8 + cc; tv = b[to];
            if (tv && ((tv & 8) ? 1 : 0) !== side){ if (rr === last){ out.push(mk(sq, to, Q, 1), mk(sq, to, R, 1), mk(sq, to, B, 1), mk(sq, to, N, 1)); } else out.push(mk(sq, to, 0, 1)); }
            else if (!tv && to === p.ep) out.push(mk(sq, to, 0, 3)); }
          to = rr * 8 + c;
          if (!b[to]){
            if (rr === last){ out.push(mk(sq, to, Q, 0)); if (!capsOnly) out.push(mk(sq, to, R, 0), mk(sq, to, B, 0), mk(sq, to, N, 0)); }
            else if (!capsOnly){ out.push(mk(sq, to, 0, 0)); if (r === start && !b[to + dir * 8]) out.push(mk(sq, to + dir * 8, 0, 8)); }
          }
        }
      } else if (t === N || t === K){
        var arr = t === N ? KN : KG;
        for (i = 0; i < 8; i++){ rr = r + arr[i][0]; cc = c + arr[i][1]; if (rr < 0 || rr > 7 || cc < 0 || cc > 7) continue; to = rr * 8 + cc; tv = b[to];
          if (!tv){ if (!capsOnly) out.push(mk(sq, to, 0, 0)); } else if (((tv & 8) ? 1 : 0) !== side) out.push(mk(sq, to, 0, 1)); }
        if (t === K && !capsOnly){   // рокировка
          var ks = side ? 4 : 1, qs = side ? 8 : 2, home = side ? 4 : 60, en = side ? 0 : 1;
          if (sq === home && !attacked(p, home, en ? 1 : 0)){
            if ((p.castle & ks) && !b[home + 1] && !b[home + 2] && b[home + 3] === R + o && !attacked(p, home + 1, en ? 1 : 0) && !attacked(p, home + 2, en ? 1 : 0)) out.push(mk(sq, home + 2, 0, 4));
            if ((p.castle & qs) && !b[home - 1] && !b[home - 2] && !b[home - 3] && b[home - 4] === R + o && !attacked(p, home - 1, en ? 1 : 0) && !attacked(p, home - 2, en ? 1 : 0)) out.push(mk(sq, home - 2, 0, 4));
          }
        }
      } else {
        var dirs = t === B ? DB : t === R ? DR : null, dl = dirs ? 4 : 8, ds;
        for (d = 0; d < (t === Q ? 8 : dl); d++){
          ds = t === Q ? (d < 4 ? DB[d] : DR[d - 4]) : dirs[d]; rr = r + ds[0]; cc = c + ds[1];
          while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8){ to = rr * 8 + cc; tv = b[to];
            if (!tv){ if (!capsOnly) out.push(mk(sq, to, 0, 0)); } else { if (((tv & 8) ? 1 : 0) !== side) out.push(mk(sq, to, 0, 1)); break; }
            rr += ds[0]; cc += ds[1]; }
        }
      }
    }
    return out;
  }

  /* сделать ход; возвращает данные для отмены */
  function make(p, m){
    var b = p.b, f = mFrom(m), t = mTo(m), fl = mFlags(m), v = b[f], cap = b[t], u = { m: m, cap: cap, castle: p.castle, ep: p.ep, half: p.half, kw: p.kw, kb: p.kb, v: v }, side = p.side;
    b[t] = mPromo(m) ? (mPromo(m) | (side ? 8 : 0)) : v; b[f] = 0;
    if (fl & 2){ var cs = side ? t - 8 : t + 8; u.capSq = cs; u.cap = b[cs]; b[cs] = 0; }
    if (fl & 4){ if (t > f){ b[t - 1] = b[t + 1]; b[t + 1] = 0; } else { b[t + 1] = b[t - 2]; b[t - 2] = 0; } }
    if ((v & 7) === K){ if (side) p.kb = t; else p.kw = t; }
    p.ep = (fl & 8) ? (f + t) >> 1 : -1;
    // права на рокировку
    if ((v & 7) === K) p.castle &= side ? 3 : 12;
    if (f === 63 || t === 63) p.castle &= ~1; if (f === 56 || t === 56) p.castle &= ~2; if (f === 7 || t === 7) p.castle &= ~4; if (f === 0 || t === 0) p.castle &= ~8;
    p.half = ((v & 7) === P || cap || (fl & 2)) ? 0 : p.half + 1; if (side) p.full++;
    p.side ^= 1; return u;
  }
  function unmake(p, u){
    var b = p.b, m = u.m, f = mFrom(m), t = mTo(m), fl = mFlags(m); p.side ^= 1; var side = p.side;
    b[f] = u.v; b[t] = (fl & 2) ? 0 : u.cap;
    if (fl & 2) b[u.capSq] = u.cap;
    if (fl & 4){ if (t > f){ b[t + 1] = b[t - 1]; b[t - 1] = 0; } else { b[t - 2] = b[t + 1]; b[t + 1] = 0; } }
    p.castle = u.castle; p.ep = u.ep; p.half = u.half; p.kw = u.kw; p.kb = u.kb; if (side) p.full--;
  }
  function legal(p){
    var ms = gen(p), out = [], i, u, side = p.side;
    for (i = 0; i < ms.length; i++){ u = make(p, ms[i]); if (!inCheck(p, side)) out.push(ms[i]); unmake(p, u); }
    return out;
  }

  function insufficient(p){
    var minors = 0, i, v, t, bishopsSq = [];
    for (i = 0; i < 64; i++){ v = p.b[i]; if (!v) continue; t = v & 7; if (t === P || t === R || t === Q) return false; if (t === N || t === B){ minors++; if (t === B) bishopsSq.push(((i >> 3) + (i & 7)) & 1); } }
    if (minors <= 1) return true;
    if (minors === 2 && bishopsSq.length === 2 && bishopsSq[0] === bishopsSq[1]) return true;
    return false;
  }
  /* состояние партии: 'play' | 'mate' | 'stalemate' | 'draw50' | 'material' (+ check) */
  function status(p){
    var ms = legal(p), chk = inCheck(p, p.side);
    if (!ms.length) return { state: chk ? 'mate' : 'stalemate', check: chk, moves: ms };
    if (p.half >= 100) return { state: 'draw50', check: chk, moves: ms };
    if (insufficient(p)) return { state: 'material', check: chk, moves: ms };
    return { state: 'play', check: chk, moves: ms };
  }

  /* ===== оценка позиции ===== */
  var VAL = [0, 100, 320, 330, 500, 900, 0];
  var PST = {
    1: [0,0,0,0,0,0,0,0, 50,50,50,50,50,50,50,50, 10,10,20,30,30,20,10,10, 5,5,10,25,25,10,5,5, 0,0,0,20,20,0,0,0, 5,-5,-10,0,0,-10,-5,5, 5,10,10,-20,-20,10,10,5, 0,0,0,0,0,0,0,0],
    2: [-50,-40,-30,-30,-30,-30,-40,-50, -40,-20,0,0,0,0,-20,-40, -30,0,10,15,15,10,0,-30, -30,5,15,20,20,15,5,-30, -30,0,15,20,20,15,0,-30, -30,5,10,15,15,10,5,-30, -40,-20,0,5,5,0,-20,-40, -50,-40,-30,-30,-30,-30,-40,-50],
    3: [-20,-10,-10,-10,-10,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,10,10,5,0,-10, -10,5,5,10,10,5,5,-10, -10,0,10,10,10,10,0,-10, -10,10,10,10,10,10,10,-10, -10,5,0,0,0,0,5,-10, -20,-10,-10,-10,-10,-10,-10,-20],
    4: [0,0,0,0,0,0,0,0, 5,10,10,10,10,10,10,5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, -5,0,0,0,0,0,0,-5, 0,0,0,5,5,0,0,0],
    5: [-20,-10,-10,-5,-5,-10,-10,-20, -10,0,0,0,0,0,0,-10, -10,0,5,5,5,5,0,-10, -5,0,5,5,5,5,0,-5, 0,0,5,5,5,5,0,-5, -10,5,5,5,5,5,0,-10, -10,0,5,0,0,0,0,-10, -20,-10,-10,-5,-5,-10,-10,-20],
    6: [-30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -30,-40,-40,-50,-50,-40,-40,-30, -20,-30,-30,-40,-40,-30,-30,-20, -10,-20,-20,-20,-20,-20,-20,-10, 20,20,0,0,0,0,20,20, 20,30,10,0,0,10,30,20]
  };
  var KEND = [-50,-40,-30,-20,-20,-30,-40,-50, -30,-20,-10,0,0,-10,-20,-30, -30,-10,20,30,30,20,-10,-30, -30,-10,30,40,40,30,-10,-30, -30,-10,30,40,40,30,-10,-30, -30,-10,20,30,30,20,-10,-30, -30,-30,0,0,0,0,-30,-30, -50,-30,-30,-30,-30,-30,-30,-50];
  /* оценка с точки зрения стороны, которая ходит */
  function evaluate(p){
    var b = p.b, s = 0, i, v, t, mat = 0, bw = 0, bb = 0, pw = 0;
    for (i = 0; i < 64; i++){ v = b[i]; if (!v) continue; t = v & 7; if (t !== K && t !== P) mat += VAL[t]; }
    var endg = mat < 2600;
    for (i = 0; i < 64; i++){
      v = b[i]; if (!v) continue; t = v & 7;
      if (v & 8){ var tb = t === K ? (endg ? KEND : PST[6]) : PST[t]; s -= VAL[t] + tb[(7 - (i >> 3)) * 8 + (i & 7)]; if (t === B) bb++; }
      else { var tw = t === K ? (endg ? KEND : PST[6]) : PST[t]; s += VAL[t] + tw[i]; if (t === B) bw++; }
    }
    if (bw > 1) s += 30; if (bb > 1) s -= 30;
    return p.side ? -s : s;
  }
  /* зеркалирование таблицы для чёрных: индекс (7-r)*8+c; выше записано как 63-(r*8+(7-c)) = (7-r)*8 + c — верно */

  /* ===== поиск ===== */
  var INF = 100000, MATE = 30000;
  var S = null;   // состояние текущего поиска
  function ord(p, ms, ttMove){
    var i, m, sc = new Array(ms.length), b = p.b;
    for (i = 0; i < ms.length; i++){ m = ms[i]; var s = 0, cap = b[mTo(m)], fl = mFlags(m);
      if (m === ttMove) s = 1e6;
      else if (cap || (fl & 2)){ var ct = fl & 2 ? P : (cap & 7); s = 10000 + VAL[ct] * 10 - VAL[b[mFrom(m)] & 7] / 10; }
      if (mPromo(m)) s += 9000 + VAL[mPromo(m)];
      sc[i] = s; }
    var idx = ms.map(function(_, k){ return k; }).sort(function(a, c){ return sc[c] - sc[a]; });
    return idx.map(function(k){ return ms[k]; });
  }
  function qs(p, alpha, beta, ply){
    if ((++S.nodes & 2047) === 0 && Date.now() > S.deadline) S.stop = true;
    if (S.stop) return 0;
    var stand = evaluate(p); if (stand >= beta) return beta; if (stand > alpha) alpha = stand;
    var ms = ord(p, gen(p, true), 0), i, u, sc, side = p.side;
    for (i = 0; i < ms.length; i++){
      u = make(p, ms[i]);
      if (inCheck(p, side)){ unmake(p, u); continue; }
      sc = -qs(p, -beta, -alpha, ply + 1); unmake(p, u);
      if (S.stop) return 0;
      if (sc >= beta) return beta; if (sc > alpha) alpha = sc;
    }
    return alpha;
  }
  function search(p, depth, alpha, beta, ply){
    if ((++S.nodes & 2047) === 0 && Date.now() > S.deadline) S.stop = true;
    if (S.stop) return 0;
    var side = p.side, chk = inCheck(p, side);
    if (ply > 0){
      if (p.half >= 100) return 0;
      var cnt = S.rep[hash(p)] || 0; if (cnt >= 1) return 0;   // повтор позиции в линии — считаем ничьей
    }
    if (chk) depth++;
    if (depth <= 0) return S.useQ ? qs(p, alpha, beta, ply) : evaluate(p);
    var ms = ord(p, gen(p), S.killer[ply] || 0), i, u, sc, legalN = 0, best = -INF, kk;
    if (ply > 0){ kk = hash(p); S.rep[kk] = (S.rep[kk] || 0) + 1; }
    for (i = 0; i < ms.length; i++){
      u = make(p, ms[i]);
      if (inCheck(p, side)){ unmake(p, u); continue; }
      legalN++;
      sc = -search(p, depth - 1, -beta, -alpha, ply + 1); unmake(p, u);
      if (S.stop){ if (ply > 0) S.rep[kk]--; return 0; }
      if (sc > best){ best = sc; if (sc > alpha){ alpha = sc; } }
      if (alpha >= beta){ if (!p.b[mTo(ms[i])]) S.killer[ply] = ms[i]; break; }
    }
    if (ply > 0) S.rep[kk]--;
    if (!legalN) return chk ? -MATE + ply : 0;
    return best;
  }

  /* уровни 1–11 (по классам): глубина, шум в оценке, шанс «зевнуть», время, видит ли размены до конца */
  var LEVELS = [null,
    { d: 1, noise: 500, blunder: 0.70, q: false, t: 300 },
    { d: 1, noise: 350, blunder: 0.50, q: false, t: 300 },
    { d: 1, noise: 220, blunder: 0.32, q: false, t: 400 },
    { d: 2, noise: 160, blunder: 0.20, q: false, t: 500 },
    { d: 2, noise: 100, blunder: 0.12, q: true, t: 600 },
    { d: 3, noise: 70, blunder: 0.06, q: true, t: 800 },
    { d: 3, noise: 40, blunder: 0.02, q: true, t: 900 },
    { d: 4, noise: 20, blunder: 0, q: true, t: 1200 },
    { d: 5, noise: 8, blunder: 0, q: true, t: 1500 },
    { d: 6, noise: 0, blunder: 0, q: true, t: 2200 },
    { d: 8, noise: 0, blunder: 0, q: true, t: 3200 }
  ];
  /* лучший ход для позиции; hist — ключи прошлых позиций (для повторов). Возвращает { move, score } */
  function bestMove(p0, level, hist, fixedTime){
    var L = LEVELS[Math.max(1, Math.min(11, level | 0))], p = p0.clone(), side = p.side, ms = legal(p), i, u;
    if (!ms.length) return null;
    if (ms.length === 1) return { move: ms[0], score: 0 };
    if (L.blunder && Math.random() < L.blunder){
      // «зевок»: случайный ход, но не отдаём мат в один ход на самых простых уровнях только случайно — это нормально для малышей
      return { move: ms[(Math.random() * ms.length) | 0], score: 0, blunder: true };
    }
    var rep = {}; (hist || []).forEach(function(k){ var h = hash(fromFEN(k + ' 0 1')); rep[h] = (rep[h] || 0) + 1; });
    S = { nodes: 0, stop: false, deadline: Date.now() + (fixedTime || L.t), rep: rep, killer: [], useQ: L.q };
    var best = null, bestSc = -INF, maxD = L.d, d, scores;
    for (d = 1; d <= maxD; d++){
      var ordered = ord(p, ms, best ? best.move : 0), cur = null, curSc = -INF, alpha = -INF, sc, list = [];
      for (i = 0; i < ordered.length; i++){
        u = make(p, ordered[i]);
        sc = -search(p, d - 1, -INF, -alpha, 1);
        unmake(p, u);
        if (S.stop) break;
        list.push([ordered[i], sc]);
        if (sc > curSc){ curSc = sc; cur = ordered[i]; if (!L.noise) alpha = sc; }
      }
      if (S.stop){ if (!best && cur) best = { move: cur, score: curSc, list: list }; break; }
      best = { move: cur, score: curSc, list: list }; bestSc = curSc;
      if (Math.abs(curSc) > MATE - 50) break;   // мат найден
    }
    if (!best) return { move: ms[0], score: 0 };
    if (L.noise && best.list && best.list.length){   // шум: выбираем среди ходов, которые не хуже лучшего более чем на «шум»
      var top = best.score, pool = best.list.filter(function(x){ return x[1] >= top - L.noise * (0.5 + Math.random()); });
      if (pool.length){ var pick = pool[(Math.random() * pool.length) | 0]; best = { move: pick[0], score: pick[1] }; }
    }
    return { move: best.move, score: best.score };
  }

  function sqName(s){ return String.fromCharCode(97 + (s & 7)) + (8 - (s >> 3)); }
  function moveStr(m){ return sqName(mFrom(m)) + sqName(mTo(m)) + (mPromo(m) ? LET[mPromo(m)] : ''); }

  /* проверка правильности (перфт) — для разработки */
  function perft(p, d){ if (d === 0) return 1; var ms = gen(p), n = 0, side = p.side, i, u; for (i = 0; i < ms.length; i++){ u = make(p, ms[i]); if (!inCheck(p, side)) n += perft(p, d - 1); unmake(p, u); } return n; }

  root.ChessEngine = { START: START, fromFEN: fromFEN, toFEN: toFEN, key: key, gen: gen, legal: legal, make: make, unmake: unmake, status: status, inCheck: inCheck,
    bestMove: bestMove, evaluate: evaluate, LEVELS: LEVELS, mFrom: mFrom, mTo: mTo, mPromo: mPromo, mFlags: mFlags, mk: mk, moveStr: moveStr, sqName: sqName, perft: perft, insufficient: insufficient };
  if (typeof module !== 'undefined') module.exports = root.ChessEngine;
})(typeof self !== 'undefined' ? self : this);
