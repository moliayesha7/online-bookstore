# BookNest — Simple Online Bookstore

A small student assignment built with HTML, CSS, and vanilla JavaScript. No installation or build step is required.

## Run

Open `index.html` in a modern browser (Chrome, Edge, or Firefox). Keep `index.html`, `style.css`, and `script.js` in the same folder.

## Features

### Intentional HTML validation errors

For the assignment, `index.html` includes three intentional errors: `href` on `header`, `action` on `main`, and `type` on `footer`. These attributes are not allowed on those elements. Comments next to each element explain the fix. Upload `index.html` to https://validator.w3.org/nu/ to inspect the checker results. Remove these three attributes when a valid HTML document is needed.

- Six sample books with authors and illustrative prices in Bangladeshi taka.
- Search by title or author, combined with category filters.
- Add books to a cart, change quantities, remove books, and see the total.
- Cart saved in browser localStorage where available.
- Demo order action that clears the cart and displays a confirmation.
- Responsive layout for phones and desktops, keyboard-accessible controls.

## Files

- `index.html`: page structure and cart dialog.
- `style.css`: layout, book illustrations, colours, and responsive styles.
- `script.js`: sample data, filtering, and cart interactions.

To add a book, add an entry with a unique `id` to the `books` array in `script.js`. Existing categories are Fiction, Poetry, and Self-growth; adding a different category also requires a filter button in `index.html`.

This is a frontend demo. There is no backend, login, real payment, delivery, or stored order history. Google Fonts is optional: system fonts are used when offline. Future work can add a database, authentication, admin book management, and real checkout.
