/* Білім Аралы — шахматный компьютер в отдельном потоке, чтобы страница не «замирала» (assets/chess-worker.js) */
importScripts('chess-engine.js');
self.onmessage = function(e){
  var d = e.data, r = null;
  try { r = ChessEngine.bestMove(ChessEngine.fromFEN(d.fen), d.level, d.hist || [], d.time || 0); } catch(x){ r = null; }
  self.postMessage({ id: d.id, move: r ? r.move : -1, blunder: !!(r && r.blunder) });
};
