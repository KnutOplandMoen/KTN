#!/usr/bin/env python3
"""Scan exam HTML files for multiple choice questions and report length tells."""
import re
import sys
import io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")

EXAM_DIR = Path(__file__).parent.parent / "eksamner"
FILES = sorted(EXAM_DIR.glob("ny*.html"))

article_re = re.compile(
    r'<article class="exam-q">(.*?)</article>',
    re.DOTALL,
)
qnum_re = re.compile(r'<span class="exam-q__num">Spørsmål (\d+)</span>')
opts_block_re = re.compile(
    r'<ul class="exam-q__opts">(.*?)</ul>',
    re.DOTALL,
)
opt_re = re.compile(
    r'<li><span class="opt-label">([ABCD])</span>(.*?)</li>',
    re.DOTALL,
)
correct_re = re.compile(r'Riktig svar:\s*([ABCD])')

def visible_len(html: str) -> int:
    """Strip tags & entities, return length."""
    t = re.sub(r'<[^>]+>', '', html)
    t = re.sub(r'&[a-z]+;', ' ', t)
    t = re.sub(r'\s+', ' ', t).strip()
    return len(t)

def text(html: str) -> str:
    t = re.sub(r'<[^>]+>', '', html)
    t = re.sub(r'\s+', ' ', t).strip()
    return t

problems = []
for f in FILES:
    src = f.read_text(encoding="utf-8")
    for art in article_re.findall(src):
        opts_match = opts_block_re.search(art)
        if not opts_match:
            continue  # not a classic MC
        qnum_m = qnum_re.search(art)
        correct_m = correct_re.search(art)
        if not qnum_m or not correct_m:
            continue
        qnum = qnum_m.group(1)
        correct = correct_m.group(1)
        opts = dict(opt_re.findall(opts_match.group(1)))
        if set(opts.keys()) != set("ABCD"):
            continue
        lens = {k: visible_len(v) for k, v in opts.items()}
        correct_len = lens[correct]
        other_max = max(v for k, v in lens.items() if k != correct)
        threshold = float(sys.argv[1]) if len(sys.argv) > 1 else 1.50
        if correct_len == max(lens.values()) and correct_len > other_max * threshold:
            problems.append({
                "file": f.name,
                "q": qnum,
                "correct": correct,
                "lens": lens,
                "ratio": correct_len / other_max,
                "texts": {k: text(v) for k, v in opts.items()},
            })

if not problems:
    print("No length tells found.")
else:
    print(f"Found {len(problems)} potential length tells:\n")
    for p in problems:
        print(f"=== {p['file']} Spørsmål {p['q']} (correct: {p['correct']}) ===")
        print(f"  Lengths: A={p['lens']['A']}, B={p['lens']['B']}, C={p['lens']['C']}, D={p['lens']['D']}")
        print(f"  Correct/2nd-longest ratio: {p['ratio']:.2f}x")
        for k in "ABCD":
            mark = " *" if k == p['correct'] else "  "
            print(f"  {mark}{k}: {p['texts'][k]}")
        print()
