# SET APART — Christian Streetwear Store

This is a responsive storefront starter with an interactive product grid, category filters, shopping cart, and Stripe Checkout integration. The product visuals are original CSS-generated mockups, not photographs of manufactured inventory.

## Important before launch
- This project is a working storefront template, but it is **not live for real payments until you configure Stripe and deploy it**.
- Because the store owner is under 18, ask a parent/guardian to own and manage the Stripe account, payout bank account, business/tax details, and hosting account. Do not paste payment secrets into public files or GitHub.
- Product names, prices, shipping, return terms, taxes, and final inventory are sample setup values. Verify them before accepting orders.
- The website does not include a real business address. Use “Online store” until you have a legitimate business mailing address; do not publish a home address.
- `setapartclothing.com` is only a suggested domain, not a domain this project owns or has verified as available.

## Run locally
1. Install Node.js (LTS).
2. In this folder run `npm install`.
3. Set your Stripe test secret key in your terminal environment:
   - macOS/Linux: `export STRIPE_SECRET_KEY=sk_test_your_test_key`
   - Windows PowerShell: `$env:STRIPE_SECRET_KEY="sk_test_your_test_key"`
4. Run `npm start`.
5. Open `http://localhost:3000`.

Use Stripe **test mode** first. Never use a live secret key in frontend JavaScript.

## Connect real payments
1. A parent/guardian should create and verify the Stripe account and add payout bank details.
2. In Stripe, copy the **test secret key** and set it as `STRIPE_SECRET_KEY` in your hosting provider's environment variables. Test checkout end-to-end before launch.
3. Deploy this Node app to a Node-compatible host (for example, Render or Railway). Deploy the entire repository, not only the `public` folder.
4. In the host's settings, add `STRIPE_SECRET_KEY` as a secret environment variable, then redeploy.
5. Test a full checkout in test mode. Only when the account, products, policies, and payouts are ready should the guardian switch to the live Stripe secret key.
6. Add a custom domain through your hosting provider after purchasing/confirming availability with a domain registrar.

Stripe Checkout will collect the customer's US shipping address and charge the configured prices. This starter does not yet calculate shipping rates, product variants/sizes, sales tax settings, inventory, order fulfillment, or email receipts beyond Stripe's standard options. Add those before public launch.

## Customize
- Edit products/prices in both `server.js` and `public/app.js`.
- Edit product descriptions and visual concepts in `public/index.html`.
- Adjust colors, layout, and garment mockups in `public/styles.css`.
- Add real product images once you have samples or supplier-approved photos.

## Suggested launch checklist
- [ ] Parent/guardian reviews payment, tax, privacy, and consumer obligations.
- [ ] Confirm supplier quality, production time, sizes, shipping cost, and returns.
- [ ] Order a sample of each garment and check print durability.
- [ ] Replace concept previews with accurate product photos.
- [ ] Add size selection, shipping rates, and fulfillment workflow.
- [ ] Add privacy policy, terms, returns, and contact information.
- [ ] Test checkout, refunds, shipping notifications, and mobile layout.
