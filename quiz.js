/**
 * Standardized quiz handler for KTN chapter pages.
 *
 * HTML contract (per quiz block):
 *   <div class="quiz" data-quiz>
 *     <div class="q-label">Spørsmål N</div>
 *     <div class="q-text">…question text…</div>
 *     <div class="options">
 *       <button class="option" data-correct="false">…</button>
 *       <button class="option" data-correct="true">…</button>
 *       …
 *     </div>
 *     <div class="explanation">…shown after answering…</div>
 *   </div>
 *
 * Just include this script at the bottom of any page and it will
 * wire up every [data-quiz] block automatically.
 */
(function () {
  document.querySelectorAll('[data-quiz]').forEach(function (quiz) {
    var btns = quiz.querySelectorAll('button.option');
    var explanation = quiz.querySelector('.explanation');

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (btn.disabled) return;

        btns.forEach(function (b) {
          b.disabled = true;
          if (b.dataset.correct === 'true') {
            b.classList.add('correct');
          } else if (b === btn) {
            b.classList.add('incorrect');
          }
        });

        if (explanation) explanation.classList.add('show');
      });
    });
  });
})();
