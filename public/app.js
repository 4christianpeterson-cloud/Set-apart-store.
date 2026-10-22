// SET APART storefront preview — no checkout is active until real products and fulfillment are verified.
const $ = (selector) => document.querySelector(selector);
const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

// Keep the concept storefront honest: this preview does not accept orders.
const checkoutButton = $("#checkout-button");
const checkoutNote = $("#checkout-note");
if (checkoutButton) {
  checkoutButton.disabled = true;
  checkoutButton.textContent = "ORDERS OPEN SOON";
  checkoutButton.addEventListener("click", () => {
    const toast = $("#toast");
    if (toast) {
      toast.textContent = "Orders open after real products and fulfillment are verified.";
      toast.classList.add("show");
      window.setTimeout(() => toast.classList.remove("show"), 2600);
    }
  });
}
if (checkoutNote) {
  checkoutNote.textContent = "Preview only. Orders open after products, supplier fulfillment, and payments are verified.";
}

// Hide any legacy cart controls that aren't used on the current preview.
const cartTrigger = $("#cart-open");
if (cartTrigger) cartTrigger.hidden = true;
const cartPanel = $("#cart-panel");
if (cartPanel) cartPanel.setAttribute("aria-hidden", "true");

// The email form is intentionally a demo until an email provider is connected.
const newsletterForm = $("#newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = $("#newsletter-message");
    if (message) message.textContent = "Email signup isn't connected yet, so no email was saved.";
  });
}
