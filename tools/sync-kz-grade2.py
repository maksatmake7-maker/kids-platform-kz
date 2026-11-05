#!/usr/bin/env python3
"""Казахское отделение, 2 класс: страницы grades/grade-2-kaz/ из русской версии grades/grade-2/.
Курсы тех же предметов переводятся словарём assets/ui-kz-g2.js, поэтому копия курса отличается только
языком (kz включается сам) и скрытой русской озвучкой (KZ_VOICE=True включает кнопку «Послушать»).
Запуск из корня репозитория:  python3 tools/sync-kz-grade2.py"""
import re, os, importlib.util
_sp = importlib.util.spec_from_file_location('mt', 'tools/modernize-trainers.py'); MT = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(MT)
KZ_VOICE = False
TRAINERS = {'fizra', 'izo', 'muzyka', 'trud', 'estestvo', 'digital', 'poznanie', 'math'}   # предметы, у которых тренажёры уже переведены на казахский (остальные добавляются по мере перевода)
# предмет (папка) -> (заголовок страницы, ключ курса в русской версии)
READY = {'fizra': ('Дене шынықтыру', 'fiz2-course.html'), 'izo': ('Бейнелеу өнері', 'izo2-course.html'),
         'muzyka': ('Музыка', 'muz2-course.html'), 'trud': ('Еңбекке баулу', 'trud2-course.html'),
         'poznanie': ('Дүниетану', 'poznanie2-course.html'),
         'estestvo': ('Жаратылыстану', 'estestvo2-course.html'),
         'digital': ('Цифрлық сауаттылық', 'digital2-course.html'),
         'math': ('Математика', 'math2-course.html')}
SRC, DST = 'grades/grade-2', 'grades/grade-2-kaz'
def rd(p): return open(p, encoding='utf-8').read()
def wr(p, s):
    os.makedirs(os.path.dirname(p), exist_ok=True); open(p, 'w', encoding='utf-8').write(s)
def lang_kz(h):
    h = h.replace('<html lang="ru">', '<html lang="kk">', 1)
    h = h.replace('<button class="active" data-lang="ru" onclick="applyLang(\'ru\')">RU</button>', '<button data-lang="ru" onclick="applyLang(\'ru\')">RU</button>', 1)
    h = h.replace('<button data-lang="kz" onclick="applyLang(\'kz\')">ҚАЗ</button>', '<button class="active" data-lang="kz" onclick="applyLang(\'kz\')">ҚАЗ</button>', 1)
    return h
def pre_i18n(h, depth):
    tag = '<script src="%sassets/i18n.js"></script>' % ('../' * depth)
    assert tag in h, tag
    pre = "<script>try{localStorage.setItem('bilim_lang_v1','kz')}catch(e){}</script>\n"
    if not KZ_VOICE: pre += '<script>window.BILIM_NO_VOICE=1</script>\n<style>#ac-speak,.mxs-snd,.mxs-replay{display:none !important}</style>\n'
    return h.replace(tag, pre + tag, 1)
def hub():
    h = lang_kz(rd('grades/grade-1-kaz/index.html'))
    h = h.replace('<title>Қазақ бөлімі 1 сынып — Білім Аралы</title>', '<title>Қазақ бөлімі 2 сынып — Білім Аралы</title>')
    sub = []
    order = [('fizra', '#4DB6AC', 'fizra', 'Физическая культура', 'Здоровье, разминка, бег, игры и честная игра'),
             ('izo', '#E8618C', 'izo', 'Изобразительное искусство', 'Краски, линии, лепка, узоры и поделки'),
             ('muzyka', '#C77DD9', 'muzyka', 'Музыка', 'Слушаем музыку, ритм, ноты, инструменты и песни'),
             ('trud', '#8C6F4E', 'trud', 'Трудовое обучение', 'Материалы, инструменты, поделки и выставка')]
    for sid, col, art, t, d in order:
        sub.append("    {id:'%s2', href:'%s/index.html', art:'%s', color:'%s', titleText:'%s', descText:'%s'}," % (sid, sid, art, col, t, d))
    sub.append("    {id:'poznanie2', href:'poznanie/index.html', art:'poznanie', color:'#F0954C', title:'poznanie_title', descText:'Семья, школа, родной край, карта и символы страны'},")
    sub.append("    {id:'estestvo2', href:'estestvo/index.html', art:'estestvo', color:'#6FBF73', title:'estestvo_title', descText:'Исследователь, растения, животные, воздух, вода, космос и магниты'},")
    sub.append("    {id:'dig2', href:'digital/index.html', art:'digital', color:'#5EC3E8', titleText:'Цифровая грамотность', descText:'Компьютер, поиск в сети, Scratch и роботы'},")
    sub.append("    {id:'math2', href:'math/index.html', art:'math', color:'#FFC93C', title:'math_title', descText:'Числа до 100, умножение и деление, периметр, время и задачи'},")
    soon = []
    for sid, art, col, t, d in soon:
        sub.append("    {id:'%s', soon:true, href:'#', art:'%s', color:'%s', title:'%s', desc:'%s'}," % (sid, art, col, t, d))
    sub.append("    {id:'kaz2', soon:true, href:'#', art:'kaz', color:'#3FB088', titleText:'Қазақ тілі', descText:'Ана тілі, оқу және жазу'},")
    blk = "window.HUB = {\n  grade: 2, dir: 'kz', lang: 'kz', tag: 'kaz_direction_grade2_title', h2: 'hub_title', lead: 'kaz_direction_desc',\n  subjects: [\n" + '\n'.join(sub) + "\n  ]\n};"
    h2 = re.sub(r'window\.HUB = \{.*?\n\};', lambda m: blk, h, flags=re.S); assert h2 != h
    wr(DST + '/index.html', h2)
def subject(sid):
    title, course = READY[sid]
    h = lang_kz(rd('%s/%s/index.html' % (SRC, sid)))
    h = re.sub(r'<title>.*?</title>', '<title>%s 2 сынып — Білім Аралы</title>' % title, h, count=1)
    h = h.replace('<a href="../index.html" class="back-link" data-i18n="back_home"></a>', '<a href="../index.html" class="back-link" data-i18n="kaz_direction_grade2_title"></a>')
    if sid not in TRAINERS:   # пока тренажёры не переведены — на странице предмета только курс
        m = re.search(r'<a href="%s".*?</a>\n' % re.escape(course), h, re.S); assert m, sid
        a = h.index('  <h3 class="quarter-heading"') if '<h3 class="quarter-heading"' in h else h.index('  <div class="island-grid">')
        b = h.index('</section>', a)
        h = h[:a] + '  <div class="island-grid">\n    ' + m.group(0) + '  </div>\n' + h[b:]
    wr('%s/%s/index.html' % (DST, sid), pre_i18n(h, 3))
    c = lang_kz(rd('%s/%s/%s' % (SRC, sid, course)))
    wr('%s/%s/%s' % (DST, sid, course), pre_i18n(c, 3))
    for f in (sorted(os.listdir('%s/%s' % (SRC, sid))) if sid in TRAINERS else []):   # страницы-тренажёры: тот же движок, новый дизайн
        if not f.endswith('.html') or f == 'index.html' or f.endswith('-course.html'): continue
        t = rd('%s/%s/%s' % (SRC, sid, f))
        t = MT.conv(t, MT.SUBJ[sid]) or t
        wr('%s/%s/%s' % (DST, sid, f), pre_i18n(lang_kz(t), 3))
hub()
for s in READY: subject(s)
print('готово: хаб + %d предмета' % len(READY))
