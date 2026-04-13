(function () {
  var isEn = window.location.pathname.indexOf('/en/') !== -1;
  var label = isEn ? 'Read aloud' : 'Les opp';
  var labelStop = isEn ? 'Stop' : 'Stopp';
  var lang = isEn ? 'en-US' : 'nb-NO';

  if (!window.speechSynthesis) return;

  var style = document.createElement('style');
  style.textContent = `
    .read-aloud-btn {
      display: inline-flex; align-items: center; gap: 6px;
      font-family: var(--sans, 'IBM Plex Sans', system-ui, sans-serif);
      font-size: 13px; font-weight: 500; letter-spacing: .02em;
      color: var(--ink-faded, #6b6257);
      background: var(--paper-dark, #e8e3d6);
      border: 1px solid var(--line, #c9c0ae);
      border-radius: 6px; padding: 5px 14px 5px 10px;
      cursor: pointer; transition: all .15s ease;
      margin-bottom: 8px;
    }
    .read-aloud-btn:hover {
      color: var(--ink, #1a1612);
      border-color: var(--ink-ghost, #a39886);
    }
    .read-aloud-btn.playing {
      color: var(--rust, #b04428);
      border-color: var(--rust, #b04428);
      background: rgba(176, 68, 40, .08);
    }
    .read-aloud-btn svg {
      width: 16px; height: 16px; flex-shrink: 0;
      fill: currentColor;
    }
  `;
  document.head.appendChild(style);

  var speakerIcon = '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
  var stopIcon = '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1"/></svg>';

  var activeBtn = null;

  function getTextFromSection(section) {
    var clone = section.cloneNode(true);
    clone.querySelectorAll('.quiz, .read-aloud-btn, script, style, svg, .toc, .section-badge, .margin-note, button, .reveal .answer').forEach(function (el) {
      el.remove();
    });
    return (clone.innerText || clone.textContent || '').trim();
  }

  function stopSpeaking() {
    speechSynthesis.cancel();
    if (activeBtn) {
      activeBtn.innerHTML = speakerIcon + label;
      activeBtn.classList.remove('playing');
      activeBtn = null;
    }
  }

  function speakChunks(chunks, btn) {
    if (!chunks.length) { stopSpeaking(); return; }
    var utterance = new SpeechSynthesisUtterance(chunks[0]);
    utterance.lang = lang;
    utterance.rate = 1.05;
    utterance.onend = function () {
      speakChunks(chunks.slice(1), btn);
    };
    utterance.onerror = function () {
      stopSpeaking();
    };
    speechSynthesis.speak(utterance);
  }

  function splitText(text) {
    var paragraphs = text.split(/\n\s*\n/);
    var chunks = [];
    paragraphs.forEach(function (p) {
      p = p.trim();
      if (!p) return;
      if (p.length <= 200) { chunks.push(p); return; }
      var sentences = p.match(/[^.!?]+[.!?]+[\s]*/g) || [p];
      var current = '';
      sentences.forEach(function (s) {
        if ((current + s).length > 200 && current) {
          chunks.push(current.trim());
          current = s;
        } else {
          current += s;
        }
      });
      if (current.trim()) chunks.push(current.trim());
    });
    return chunks;
  }

  document.querySelectorAll('section[id]').forEach(function (section) {
    var container = section.querySelector('.container');
    if (!container) return;
    var h2 = container.querySelector('h2');
    if (!h2) return;

    var btn = document.createElement('button');
    btn.className = 'read-aloud-btn';
    btn.innerHTML = speakerIcon + label;
    btn.setAttribute('aria-label', label);

    btn.addEventListener('click', function () {
      if (activeBtn === btn) {
        stopSpeaking();
        return;
      }
      stopSpeaking();

      var text = getTextFromSection(section);
      if (!text) return;

      activeBtn = btn;
      btn.innerHTML = stopIcon + labelStop;
      btn.classList.add('playing');

      var chunks = splitText(text);
      speakChunks(chunks, btn);
    });

    h2.insertAdjacentElement('afterend', btn);
  });

  window.addEventListener('beforeunload', function () {
    speechSynthesis.cancel();
  });
})();
