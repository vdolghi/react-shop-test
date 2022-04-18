# Specifications

- Products page
  - A list with products (image, name, short description, price) and button to add in cart any product
  - List must implement pagination (5 items per page)
- Checkout page
  - A list with products from cart (image, name, price)
    - Input to change quantity for each product
    - Button to remove product from cart
    - Button to add a voucher to each individual product (voucher is applicable per product)
    - Some products must not allow adding voucher, the button must be hidden
    - After a voucher is applied the product price must be changed accordingly (show both: price before and after)
  - A form with billing information
     - Name
     - Email
     - Phone (validate only format like: +X XX XXX XX)
     - Address (Country, City, Address, Zip)
     - All fields are required
  - Next Button
- Confirmation Page
  - The page must show a message with products count and total price to pay
  - Button to confirm (will reset cart and redirect to products page)
  - The page is accessible only after user click on 'Next' from Checkout page

# Requirements: 
- Code Style
- Best Practices
- React Hooks
- Redux
- React Router
- Bootstrap
- Input Validations

# Boilerplate
- Products data is stored in `src/data/products.json`
- Routing is in `src/App.js`
- UI is prepared for `src/pages/Cart.js` and `src/pages/Products.js`
- Redux is initialised in `src/store`