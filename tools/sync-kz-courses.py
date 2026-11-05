#!/usr/bin/env python3
"""Копирует курсы 1 класса (русское отделение) в казахское отделение: grades/grade-1-kaz/.
Курсы на одном и том же движке, текст переводится словарями ui-kz*.js, поэтому копия отличается только:
  - lang="kk", кнопка ҚАЗ активна, язык kz выставляется до загрузки i18n.js;
  - русская озвучка (кнопка «Послушать») скрыта, пока нет казахской озвучки (KZ_VOICE = True включает кнопку);
  - карточки курсов добавляются в хабы казахского отделения.
Запуск из корня репозитория:  python3 tools/sync-kz-courses.py
Не копируем: kazakh/kaz-course.html (казахский как второй язык) и reading/gramota-course.html (русская грамота) —
в казахской школе вместо них Әліппе / Ана тілі."""
import re, os, sys
KZ_VOICE = False
MAP = {'estestvo': 'estestvo', 'fizra': 'fizra', 'izo': 'izo', 'math': 'matematika',
       'muzyka': 'muzyka', 'poznanie': 'poznanie', 'trud': 'trud'}
ROOT = 'grades'
def course_files(src):
    return sorted(f for f in os.listdir(f'{ROOT}/grade-1/{src}') if f.endswith('-course.html'))
def conv(html):
    html = html.replace('<html lang="ru">', '<html lang="kk">', 1)
    html = html.replace('<button class="active" data-lang="ru" onclick="applyLang(\'ru\')">RU</button>',
                        '<button data-lang="ru" onclick="applyLang(\'ru\')">RU</button>', 1)
    html = html.replace('<button data-lang="kz" onclick="applyLang(\'kz\')">ҚАЗ</button>',
                        '<button class="active" data-lang="kz" onclick="applyLang(\'kz\')">ҚАЗ</button>', 1)
    tag = '<script src="../../../assets/i18n.js"></script>'
    assert tag in html
    pre = "<script>try{localStorage.setItem('bilim_lang_v1','kz')}catch(e){}</script>\n"
    if not KZ_VOICE:
        pre += '<style>#ac-speak{display:none !important}</style>\n'
    html = html.replace(tag, pre + tag, 1)
    return html
def main():
    n = 0
    for src, dst in MAP.items():
        for f in course_files(src):
            h = open(f'{ROOT}/grade-1/{src}/{f}', encoding='utf-8').read()
            open(f'{ROOT}/grade-1-kaz/{dst}/{f}', 'w', encoding='utf-8').write(conv(h)); n += 1
        # карточки в хаб
        ru = open(f'{ROOT}/grade-1/{src}/index.html', encoding='utf-8').read()
        kzp = f'{ROOT}/grade-1-kaz/{dst}/index.html'
        kz = open(kzp, encoding='utf-8').read()
        cards = re.findall(r'    <a href="[^"]*-course\.html".*?</a>\n', ru, re.S)
        kz = re.sub(r'\n    <a href="[^"]*-course\.html".*?</a>(?=\n)', '', kz, flags=re.S)  # идемпотентно
        m = re.search(r'<div class="island-grid"[^>]*>\n', kz)
        assert m and cards, (src, bool(m), len(cards))
        kz = kz[:m.end()] + ''.join(cards) + kz[m.end():]
        open(kzp, 'w', encoding='utf-8').write(kz)
    print('курсов скопировано:', n)
main()
