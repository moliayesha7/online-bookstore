# BookNest — Simple Online Bookstore

A small student assignment built with HTML, CSS, and vanilla JavaScript. No installation or build step is required.

## Run

Open `index.html` in a modern browser (Chrome, Edge, or Firefox). Keep `index.html`, `style.css`, and `script.js` in the same folder.

## Features

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
