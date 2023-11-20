// ==UserScript==
// @name         Blesta Translate
// @namespace    http://lolandbraa.no/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://translate.blesta.com/translation/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=blesta.com
// @grant        none
// ==/UserScript==

(function() {
    var observer = new MutationObserver(function(mutationsList, observer) {
        mutationsList.forEach(function(mutation) {
            if (mutation.attributeName === 'class' && mutation.target.id === 'google_translation') {
                if (mutation.target.classList.contains('alert-message') &&
                    mutation.target.classList.contains('block-message') &&
                    mutation.target.classList.contains('success')) {
                    var translationText = document.querySelector('#google_translation p').textContent.trim();
                    var textarea = document.getElementById('translation');
                    if (textarea) {
                        textarea.value = translationText;
                    }
                }
            }
        });
    });

    observer.observe(document.getElementById('google_translation'), { attributes: true });

    // Keyboard shortcut
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === '.') {
            var translationBox = document.getElementById('google_translation');
            if (translationBox) {
                translationBox.click();
            }
        }
    });

})();
