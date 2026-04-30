/* Flashcards — horizontal navigation, randomized order
   Reads card data from <ol class="fc-deck"> children, shuffles once on load,
   and lets the student navigate with ←/→/space/enter/r when the widget is
   visible in the viewport. */
(function () {
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function init(root) {
    var deckList = root.querySelector('.fc-deck');
    if (!deckList) return;
    var items = Array.prototype.slice.call(deckList.querySelectorAll('[data-card]'));
    if (!items.length) return;

    var cards = items.map(function (li) {
      var f = li.querySelector('[data-fc-front]');
      var b = li.querySelector('[data-fc-back]');
      return {
        front: f ? f.innerHTML.trim() : '',
        back:  b ? b.innerHTML.trim() : ''
      };
    });
    shuffle(cards);

    var card  = root.querySelector('.fc-card');
    var front = root.querySelector('[data-fc-front-display]');
    var back  = root.querySelector('[data-fc-back-display]');
    var counter = root.querySelector('.fc-counter');
    var barFill = root.querySelector('.fc-bar-fill');
    var prevBtn = root.querySelector('.fc-prev');
    var nextBtn = root.querySelector('.fc-next');
    var shuffleBtn = root.querySelector('.fc-shuffle');

    var idx = 0;

    function render() {
      front.innerHTML = cards[idx].front;
      back.innerHTML  = cards[idx].back;
      card.classList.remove('flipped');
      counter.textContent = (idx + 1) + ' / ' + cards.length;
      barFill.style.width = ((idx + 1) / cards.length * 100) + '%';
    }

    function step(delta) {
      idx = (idx + delta + cards.length) % cards.length;
      render();
    }

    function flip() {
      card.classList.toggle('flipped');
    }

    function reshuffle() {
      shuffle(cards);
      idx = 0;
      render();
    }

    card.addEventListener('click', flip);
    prevBtn.addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
    nextBtn.addEventListener('click', function (e) { e.stopPropagation(); step( 1); });
    shuffleBtn.addEventListener('click', function (e) { e.stopPropagation(); reshuffle(); });

    // Keyboard — only when widget is in viewport
    var inView = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
      }, { threshold: 0.25 }).observe(root);
    } else {
      inView = true;
    }

    document.addEventListener('keydown', function (e) {
      if (!inView) return;
      // Don't hijack typing in inputs
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

      if (e.key === 'ArrowLeft')  { step(-1); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { step( 1); e.preventDefault(); }
      else if (e.key === ' ' || e.key === 'Enter') {
        // Only flip if focus is on the card itself, or no specific control —
        // avoids stealing space/enter from buttons.
        if (e.target === card || e.target === document.body) {
          flip(); e.preventDefault();
        }
      }
      else if (e.key === 'r' || e.key === 'R') { reshuffle(); }
    });

    render();
  }

  document.querySelectorAll('[data-flashcards]').forEach(init);
})();
