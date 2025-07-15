// ==UserScript==
// @name         DEFCON Workshop Signup
// @namespace    https://events.humanitix.com/
// @version      2025-07-15
// @description  Refresh page until it allows you to register
// @author       Jane <3
// @match        https://events.humanitix.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=humanitix.com
// @grant        none
// ==/UserScript==

(function monitorForSaleState() {
  const intervalID = setInterval(() => {
    fetch(location.href)
      .then(res => res.text())
      .then(newHTML => {
        if (!newHTML.includes("sale-state")) {
          // String "sale-state" not found — stop monitoring and click buttons (yay!)
          clearInterval(intervalID);

          // Click the first element with the class "button plus svelte-cv2ixs"
          const incrementBtn = document.querySelector('.button.plus.svelte-cv2ixs');
          if (incrementBtn) {
            incrementBtn.click();

            // Wait for the checkout button to be ready before clicking
            const waitThenClickCheckout = setInterval(() => {
              const checkoutBtn = document.querySelector('[data-testid="checkout-btn"]');
              const isDisabled = checkoutBtn?.getAttribute("aria-disabled") === "true";

              if (checkoutBtn && !isDisabled) {
                clearInterval(waitThenClickCheckout);
                checkoutBtn.click();
              }
            }, 500);
          }
        } else {
          // "sale-state" not found, refresh and keep checking
          location.reload();
        }
      })
      .catch(console.error);
  }, 2500);
})();