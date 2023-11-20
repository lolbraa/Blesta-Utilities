// ==UserScript==
// @name         Blesta Translate Utilities
// @namespace    https://lolandbraa.no
// @version      1.1
// @description  Add keyboardshortcuts to Blesta Translator-page. "CTRL" + "M" to submit translation. "CTRL" + "," to copy the Google translation. "CTRL" + "." to click the first contribution.
// @author       Lolbraa
// @match        https://translate.blesta.com/translation/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=blesta.com
// @grant        none
// ==/UserScript==

// Install Tampermonkey to use

// Shortcuts
// "CTRL" + "M" to submit translation
// "CTRL" + "," to copy the Google translation
// "CTRL" + "." to click the first contribution (in confirmation-mode)

// To change shortcuts, edit the following:
var keySubmit = 'm';
var keyTranslate = ',';
var keyContribution = '.';

(function() {



    // Function to check if the page is in confirmation mode
    function checkConfirmationMode() {
        var span6Element = document.querySelector('.span6');

        if (span6Element) {
            var spansInSpan6 = span6Element.querySelectorAll('span');

            // Loop through each span within span6 to find 'For Confirmation'
            for (var i = 0; i < spansInSpan6.length; i++) {
                if (spansInSpan6[i].textContent.trim() === 'For Confirmation') {
                    return true; // Return true if 'For Confirmation' is found
                }
            }
        }

        return false; // Return false if 'For Confirmation' is not found
    }

    // Checking the state of confirmationMode
    var confirmationMode = checkConfirmationMode();
    console.log('Confirmation Mode:', confirmationMode);



    // Function to observe and copy translation text
    function copyTranslation() {
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
                            // Stop observing once translation is done
                            observer.disconnect();
                        }
                    }
                }
            });
        });

        observer.observe(document.getElementById('google_translation'), { attributes: true });

        var translationBox = document.getElementById('google_translation');
        if (translationBox) {
            translationBox.click();
        }
    }

    // Function to handle contribution box click (clicks only the first instance)
    function copyContribution() {
        var confirmationBox = document.querySelector('div.alert-message.block-message.success.contributed_definition');
        if (confirmationBox) {
            confirmationBox.click();
        }
    }

    // Function to simulate a click on the 'Translate' button
    function clickTranslateButton() {
        var translateButton = document.getElementById('translate');

        if (translateButton) {
            // Trigger a click event on the button
            translateButton.click();
        }
    }

    // Keyboard shortcuts handling
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey) {
            if (confirmationMode && event.key === keyContribution) {
                copyContribution();
            } else if (event.key === keyTranslate) {
                copyTranslation();
            } else if (event.key === keySubmit) {
                clickTranslateButton();
            }
        }
    });
})();
