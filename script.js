// Book data is kept separate from the page so more books can be added easily.
const books = [
  { id: 1, title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', category: 'Fiction', price: 280, cover: '#315769', stage: '#e8eceb', mark: '✧' },
  { id: 2, title: 'Gitanjali', author: 'Rabindranath Tagore', category: 'Poetry', price: 220, cover: '#b75d3f', stage: '#f0e5dc', mark: '❋' },
  { id: 3, title: 'Atomic Habits', author: 'James Clear', category: 'Self-growth', price: 450, cover: '#dfcfac', stage: '#eeeade', ink: '#424637', mark: '◉' },
  { id: 4, title: 'Pather Panchali', author: 'Bibhutibhushan Bandyopadhyay', category: 'Fiction', price: 350, cover: '#62745b', stage: '#e7ebe1', mark: '❦' },
  { id: 5, title: 'The Prophet', author: 'Kahlil Gibran', category: 'Poetry', price: 260, cover: '#8a666b', stage: '#efe5e5', mark: '☾' },
  { id: 6, title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', price: 320, cover: '#c39343', stage: '#f1e9d7', mark: '☀' }
];

const storageKey = 'booknest-cart-v1';
let cart = {};
try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
    books.forEach(book => {
      if (Number.isInteger(saved[book.id]) && saved[book.id] > 0) cart[book.id] = Math.min(saved[book.id], 99);
    });
  }
} catch { /* The shop still works when browser storage is unavailable. */ }

let selectedCategory = 'All';
let toastTimer;
const money = amount => `৳${amount.toLocaleString('en-BD')}`;
const grid = document.querySelector('#book-grid');
const dialog = document.querySelector('#cart-dialog');

function renderBooks() {
  const query = document.querySelector('#search').value.trim().toLowerCase();
  const visibleBooks = books.filter(book =>
    (selectedCategory === 'All' || book.category === selectedCategory) &&
    `${book.title} ${book.author}`.toLowerCase().includes(query)
  );
  // Only trusted, fixed book data is inserted as HTML; the search text is never inserted.
  grid.innerHTML = visibleBooks.map(book => `
    <article class="book-card">
      <div class="book-stage" style="--stage:${book.stage}">
        <span class="category-tag">${book.category}</span>
        <div class="cover" style="--cover:${book.cover};--cover-ink:${book.ink || '#fff4df'}" aria-hidden="true">
          <span class="cover-kicker">THE BOOKNEST SHELF</span>
          <span class="cover-title">${book.title}</span>
          <span class="cover-mark">${book.mark}</span>
          <span class="cover-author">${book.author}</span>
        </div>
      </div>
      <div class="book-info"><p class="book-category">${book.category}</p><h3>${book.title}</h3><p class="author">${book.author}</p>
        <div class="book-bottom"><span class="price">${money(book.price)}</span><button class="add-button" data-add="${book.id}" aria-label="Add ${book.title} to bag">Add to bag <span aria-hidden="true">＋</span></button></div>
      </div>
    </article>`).join('');
  document.querySelector('#results').textContent = `Showing ${visibleBooks.length} of ${books.length} books`;
  document.querySelector('#empty-state').hidden = visibleBooks.length > 0;
}

function saveCart() {
  try { localStorage.setItem(storageKey, JSON.stringify(cart)); } catch { /* Keep the current session usable. */ }
  renderCart();
}

function renderCart() {
  const selectedBooks = books.filter(book => cart[book.id]);
  const count = selectedBooks.reduce((sum, book) => sum + cart[book.id], 0);
  const total = selectedBooks.reduce((sum, book) => sum + book.price * cart[book.id], 0);
  document.querySelector('#cart-count').textContent = count;
  document.querySelector('#open-cart').setAttribute('aria-label', `Open book bag, ${count} books`);
  document.querySelector('#cart-total').textContent = money(total);
  document.querySelector('#checkout').disabled = count === 0;
  document.querySelector('#cart-items').innerHTML = selectedBooks.length ? selectedBooks.map(book => `
    <div class="cart-row"><div><h3>${book.title}</h3><p>${money(book.price)} each · ${money(book.price * cart[book.id])}</p></div>
      <div class="quantity"><button data-change="-1" data-id="${book.id}" aria-label="Remove one ${book.title}">−</button><span>${cart[book.id]}</span><button data-change="1" data-id="${book.id}" aria-label="Add one ${book.title}" ${cart[book.id] >= 99 ? 'disabled' : ''}>+</button></div>
    </div>`).join('') : '<p class="cart-empty">Your bag is waiting for a good story.<br>Explore the bookshelf to add your first book.</p>';
}

function showToast(message) {
  const toast = document.querySelector('#toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
}

document.querySelector('#search').addEventListener('input', renderBooks);
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category;
    document.querySelectorAll('.filter').forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', active);
    });
    renderBooks();
  });
});

grid.addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const id = Number(button.dataset.add);
  if ((cart[id] || 0) >= 99) return showToast('You can add up to 99 copies of a book.');
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  showToast(`${books.find(book => book.id === id).title} added to your bag`);
});

document.querySelector('#open-cart').addEventListener('click', () => dialog.showModal());
document.querySelector('#close-cart').addEventListener('click', () => dialog.close());
document.querySelector('#cart-items').addEventListener('click', event => {
  const button = event.target.closest('[data-change]');
  if (!button) return;
  const id = Number(button.dataset.id);
  cart[id] = Math.min(99, (cart[id] || 0) + Number(button.dataset.change));
  if (cart[id] <= 0) delete cart[id];
  saveCart();
});

document.querySelector('#checkout').addEventListener('click', () => {
  if (!Object.keys(cart).length) return;
  cart = {};
  saveCart();
  dialog.close();
  showToast('Demo order completed! Thank you for visiting BookNest.');
});

renderBooks();
renderCart();
