// ================= GLOBAL VARIABLES =================

let books = [];
let editIndex = null;

// ================= CLASS =================

class Book {
  constructor(authorName, bookArticle, price) {
    this.authorName = authorName;
    this.bookArticle = bookArticle;
    this.price = price;
  }

  getStatus() {
    return this.price > 0 ? "Available" : "Out of Stock";
  }
}


// ================= ADD OR EDIT BOOK =================

function addBook() {
  let authorName = document.getElementById("authorName").value.trim();
  let bookArticle = document.getElementById("bookArticle").value.trim();
  let price = Number(document.getElementById("price").value);

  // Validation
  if (authorName === "" || bookArticle === "" || isNaN(price)) {
    alert("Please enter author name, book article, and price");
    return;
  }

  if (price < 0) {
    alert("Price must be a positive number");
    return;
  }

  // Edit mode
  if (editIndex !== null) {
    books[editIndex].authorName = authorName;
    books[editIndex].bookArticle = bookArticle;
    books[editIndex].price = price;
    editIndex = null;
  }
  // Add mode
  else {
    let book = new Book(authorName, bookArticle, price);
    books.push(book);
  }

  clearForm();
  searchBook();
}


// ================= DISPLAY BOOKS =================

function displayBooks(list = books) {
  let table = document.getElementById("bookTable");
  table.innerHTML = "";

  list.forEach((book, index) => {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${book.authorName}</td>
        <td>${book.bookArticle}</td>
         <td>$${book.price.toFixed(2)}</td>
        <td>
          <span class="badge ${
            book.getStatus() === "Available" ? "bg-success" : "bg-danger"
          }">
            ${book.getStatus()}
          </span>
        </td>
        <td>
          <button
            class="btn btn-sm btn-warning me-1"
            onclick="editBook(${books.indexOf(book)})"
          >
            Edit
          </button>
          <button
            class="btn btn-sm btn-danger"
            onclick="deleteBook(${books.indexOf(book)})"
          >
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

// ================= SEARCH BOOK =================

function searchBook() {
  let keyword = document.getElementById("searchInput").value.toLowerCase();

  let filteredBooks = books.filter((book) =>
    book.bookArticle.toLowerCase().includes(keyword),
  );

  displayBooks(filteredBooks);
}

// ================= EDIT BOOK =================

function editBook(index) {
  let book = books[index];
  document.getElementById("authorName").value = book.authorName;
  document.getElementById("bookArticle").value = book.bookArticle;
  document.getElementById("price").value = book.price;
  editIndex = index;
}

// ================= DELETE BOOK =================

function deleteBook(index) {
  if (confirm("Are you sure you want to delete this book?")) {
    books.splice(index, 1);
    searchBook();
  }
}

// ================= CLEAR FORM =================

function clearForm() {
  document.getElementById("authorName").value = "";
  document.getElementById("bookArticle").value = "";
  document.getElementById("price").value = "";
}
