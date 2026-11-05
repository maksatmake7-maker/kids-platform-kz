#!/usr/bin/env python3
"""Переводит страницы-тренажёры (игры) со старого оформления на «мир предмета» (world.css + subject.css),
как у страниц курсов и тренажёров математики. Контент и игровые скрипты не трогает.
Запуск из корня:  python3 tools/modernize-trainers.py grades/grade-1-kaz
Идемпотентно: страницы, где уже есть world.css, пропускаются."""
import re, os, sys
SUBJ = {'alippe': 'reading', 'anatili': 'kazakh', 'digital': 'digital', 'estestvo': 'estestvo', 'fizra': 'fizra',
        'izo': 'izo', 'matematika': 'math', 'math': 'math', 'muzyka': 'muzyka', 'poznanie': 'poznanie', 'trud': 'trud',
        'reading': 'reading', 'kazakh': 'kazakh', 'russian': 'reading', 'literature': 'reading', 'english': 'english'}
def conv(h, subj):
    if 'world.css' in h: return None
    css = '<link rel="stylesheet" href="../../../assets/styles.css">\n'
    assert css in h
    h = h.replace(css, css + '<link rel="stylesheet" href="../../../assets/world.css">\n<link rel="stylesheet" href="../../../assets/subject.css">\n', 1)
    h = re.sub(r'<body>\n(?:<div class="cloud cloud\d"></div>\n)+', f'<body class="w-page" data-subject="{subj}">\n', h, count=1)
    assert 'class="w-page"' in h
    js = '<script src="../../../assets/progress.js"></script>\n'
    assert js in h
    add = '<script src="../../../assets/world.js"></script>\n'
    if subj != 'math': add += '<script src="../../../assets/subject-themes.js"></script>\n'
    add += '<script src="../../../assets/subject.js"></script>\n'
    h = h.replace(js, js + add, 1)
    return h
def main(root):
    n = 0
    for sub in sorted(os.listdir(root)):
        d = f'{root}/{sub}'
        if not os.path.isdir(d): continue
        for f in sorted(os.listdir(d)):
            if not f.endswith('.html') or f == 'index.html' or f.endswith('-course.html'): continue
            p = f'{d}/{f}'
            h = conv(open(p, encoding='utf-8').read(), SUBJ[sub])
            if h is None: continue
            open(p, 'w', encoding='utf-8').write(h); n += 1
    print('страниц обновлено:', n)
if __name__ == '__main__': main(sys.argv[1])
