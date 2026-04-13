(function() {
  var path = window.location.pathname;
  var inEn = path.indexOf('/en/') !== -1;
  var a = document.createElement('a');
  a.className = 'lang-switch';
  a.style.cssText = 'font-family:var(--mono);font-size:11px;letter-spacing:0.12em;color:var(--rust);text-decoration:none;border:1px solid var(--rust);padding:3px 10px;border-radius:2px;margin-left:auto;';

  if (inEn) {
    a.href = path.replace('/en/', '/');
    a.textContent = 'NORSK';
    a.title = 'Bytt til norsk';
  } else {
    var base = path.substring(0, path.lastIndexOf('/') + 1);
    var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    var kapMatch = path.match(/\/(kap\d+)\//);
    if (kapMatch) {
      a.href = base.replace('/' + kapMatch[1] + '/', '/en/' + kapMatch[1] + '/') + file;
    } else {
      a.href = base + 'en/' + (file || '');
    }
    a.textContent = 'EN';
    a.title = 'Switch to English';
  }

  var nav = document.querySelector('.site-nav .container');
  if (nav) {
    nav.style.display = 'flex';
    nav.style.alignItems = 'center';
    nav.appendChild(a);
    return;
  }
  var code = document.querySelector('.index-hero .course-code');
  if (code) {
    a.style.marginLeft = '12px';
    a.style.verticalAlign = 'middle';
    code.parentNode.insertBefore(a, code.nextSibling);
  }
})();
