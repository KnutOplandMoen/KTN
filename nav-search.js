(function() {
  var PREFIX = '../';
  var PAGES = [
    'kap1/innhold.html',
    'kap2/http-og-web.html', 'kap2/p2p-video-cdn.html', 'kap2/epost-dns-sockets.html',
    'kap3/transport-udp.html', 'kap3/palitelig-dataoverforing.html', 'kap3/tcp.html', 'kap3/congestion.html',
    'kap4/rutere-videresending.html', 'kap4/ip-adressering.html',
    'kap5/innhold.html',
    'kap6/grunnleggende-tilgang.html', 'kap6/ethernet-svitsjer.html',
    'kap7/innhold.html',
    'kap8/kryptografi.html', 'kap8/protokoller-brannmur.html',
    'kap9/innhold.html',
    'reisen/index.html'
  ];

  var input = document.getElementById('nav-search');
  var resultsEl = document.getElementById('nav-search-results');
  if (!input || !resultsEl) return;

  var active = -1;
  var items = [];
  var debounceTimer;
  var fuse = null;

  function buildIndex() {
    return Promise.all(PAGES.map(function(page) {
      return fetch(PREFIX + page)
        .then(function(r) { return r.text(); })
        .then(function(html) {
          var doc = new DOMParser().parseFromString(html, 'text/html');
          var mainEl = doc.querySelector('main');
          var chapter = mainEl ? (mainEl.dataset.chapter || '') : '';
          var h1 = doc.querySelector('h1');
          var pageTitle = h1 ? h1.textContent.trim() : '';
          var entries = [];
          var sections = doc.querySelectorAll('section[id]');
          if (sections.length) {
            sections.forEach(function(sec) {
              var h2 = sec.querySelector('h2');
              entries.push({
                title: h2 ? h2.textContent.trim() : pageTitle,
                chapter: chapter,
                url: PREFIX + page + '#' + sec.id,
                body: sec.textContent.replace(/\s+/g, ' ').trim()
              });
            });
          } else {
            entries.push({
              title: pageTitle,
              chapter: chapter,
              url: PREFIX + page,
              body: (mainEl || doc.body).textContent.replace(/\s+/g, ' ').trim()
            });
          }
          return entries;
        })
        .catch(function() { return []; });
    })).then(function(arrays) {
      var index = [];
      arrays.forEach(function(a) { index = index.concat(a); });
      return index;
    });
  }

  function ensureFuse(cb) {
    if (window.Fuse) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  ensureFuse(function() {
    buildIndex().then(function(searchIndex) {
      fuse = new Fuse(searchIndex, {
        keys: [
          { name: 'title', weight: 0.45 },
          { name: 'body', weight: 0.45 },
          { name: 'chapter', weight: 0.1 }
        ],
        threshold: 0.3,
        ignoreLocation: true,
        includeMatches: true,
        minMatchCharLength: 2
      });
      input.placeholder = 'S\u00f8k i alle kapitler\u2026';
      input.disabled = false;
    });
  });

  function snippet(body, query, maxLen) {
    var words = query.trim().split(/\s+/).filter(function(w) { return w.length > 1; });
    if (words.length) {
      var re = new RegExp(words.map(function(w) {
        return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }).join('|'), 'i');
      var match = re.exec(body);
      if (match) {
        var start = Math.max(0, match.index - 60);
        var end = Math.min(body.length, match.index + match[0].length + maxLen - 60);
        var s = body.substring(start, end);
        if (start > 0) s = '\u2026' + s;
        if (end < body.length) s = s + '\u2026';
        return s;
      }
    }
    return body.length > maxLen ? body.substring(0, maxLen) + '\u2026' : body;
  }

  function highlight(text, query) {
    if (!query) return text;
    var words = query.trim().split(/\s+/).filter(function(w) { return w.length > 1; });
    if (!words.length) return text;
    var re = new RegExp('(' + words.map(function(w) {
      return w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }).join('|') + ')', 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }

  function render(hits, query) {
    active = -1;
    if (!hits.length) {
      resultsEl.innerHTML = '<div class="nav-sr-empty">Ingen treff for \u00ab' + query + '\u00bb</div>';
      resultsEl.classList.add('active');
      items = [];
      return;
    }
    var html = '';
    var max = Math.min(hits.length, 8);
    for (var i = 0; i < max; i++) {
      var item = hits[i].item;
      var bodySnip = snippet(item.body, query, 120);
      html += '<a class="nav-sr-item" href="' + item.url + '">' +
        '<div class="nav-sr-chapter">' + item.chapter + '</div>' +
        '<div class="nav-sr-title">' + highlight(item.title, query) + '</div>' +
        '<div class="nav-sr-body">' + highlight(bodySnip, query) + '</div>' +
        '</a>';
    }
    resultsEl.innerHTML = html;
    resultsEl.classList.add('active');
    items = resultsEl.querySelectorAll('.nav-sr-item');
  }

  function close() {
    resultsEl.classList.remove('active');
    resultsEl.innerHTML = '';
    active = -1;
    items = [];
  }

  function setActive(idx) {
    for (var i = 0; i < items.length; i++) items[i].classList.remove('nav-sr-active');
    if (idx >= 0 && idx < items.length) {
      items[idx].classList.add('nav-sr-active');
      items[idx].scrollIntoView({ block: 'nearest' });
    }
    active = idx;
  }

  input.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    var q = input.value.trim();
    if (!fuse || q.length < 2) { close(); return; }
    debounceTimer = setTimeout(function() {
      render(fuse.search(q), q);
    }, 150);
  });

  input.addEventListener('keydown', function(e) {
    if (!resultsEl.classList.contains('active') || !items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(active < items.length - 1 ? active + 1 : 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(active > 0 ? active - 1 : items.length - 1);
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      items[active].click();
    } else if (e.key === 'Escape') {
      close();
      input.blur();
    }
  });

  document.addEventListener('click', function(e) {
    if (!resultsEl.contains(e.target) && e.target !== input) close();
  });
})();
