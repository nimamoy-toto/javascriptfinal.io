// Cart storage
let cartItems = [];

const products = [
  {
    name: "Dracula",
    category: "Horror",
    author: "Bram Stoker",
    price: "$50.99",
    image: "https://i.pinimg.com/1200x/b7/b0/e9/b7b0e9a8dab280ed2ac6e8b802ff7ede.jpg"
  },
  {
    name: "បុរសឈុតពណ៌ស",
    category: "Novel",
    author: "Mao Chanreaksmey",
    price: "$8",
    image: "https://cdn.prod.website-files.com/617235cde0463e5aa8d3dc95/65cf3c7ea10234ecb7a9275c_white%20suit%20new.png"
  },
  {
    name: "The Shining",
    category: "Horror",
    author: "Stephen King",
    price: "$35.99",
    image: "https://images.penguinrandomhouse.com/cover/9780385333312"
  },
   {
    name: "កំណត់ហេតុពណ៌ស្វាយ ភាគ២",
    category: "Novel",
    author: "Mao Chanreaksmey",
    price: "$8",
    image: "https://cdn.prod.website-files.com/617235cde0463e5aa8d3dc95/61948a64ec3d40b54af287af_front%20purple%20II.jpg"
  },
  {
    name: "កំណត់ហេតុពណ៌ស្វាយ",
    category: "Novel",
    author: "Mao Chanreaksmey",
    price: "$8",
    image: "https://cdn.prod.website-files.com/617235cde0463e5aa8d3dc95/61948a68f4ef39b30f4c39c3_diary.jpg"
  },
  {
    name: "Pride and Prejudice",
    category: "Novel",
    author: "Jane Austen",
    price: "$22.99",
    image: "https://images.penguinrandomhouse.com/cover/9780141439518"
  },
  {
    name: "The Great Gatsby",
    category: "Novel",
    author: "F. Scott Fitzgerald",
    price: "$25.99",
    image: "https://images.penguinrandomhouse.com/cover/9780743273565"
  },
  {
    name: "តាមប្រមាញ់ឧក្រិដ្ឋជន",
    category: "Mystery",
    author: "Ouch Thavy",
    price: "$8",
    image: "https://cdn.prod.website-files.com/617235cde0463e5aa8d3dc95/6195f49623c75c5dabecbd7f_criminal.png"
  },
  {
    name: "Sherlock Holmes",
    category: "Mystery",
    author: "Arthur Conan Doyle",
    price: "$31.90",
    image: "https://th.bing.com/th/id/OIP.TXz4R5nC2BJIGRKg_GFFRgHaLM?w=184&h=278&c=7&r=0&o=7&pid=1.7&rm=3"
  },
  {
    name: "Gone Girl",
    category: "Mystery",
    author: "Gillian Flynn",
    price: "$28.99",
    image: "https://images.penguinrandomhouse.com/cover/9780307588379"
  }
];

let currentCategory = "All";

function displayProducts(list) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  list.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>by <span>${product.author}</span></p> 
        <p class="price">${product.price}</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    `;
  });
}

function filterCategory(category) {
  currentCategory = category;
  filterProducts();
}

function filterProducts() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();

  let filtered = products.filter(product => {
    const matchesCategory =
      currentCategory === "All" || product.category === currentCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchValue);

    return matchesCategory && matchesSearch;
  });

  displayProducts(filtered);
}
             
// Initial load
displayProducts(products);

// Cart functionality
document.addEventListener("DOMContentLoaded", () => {
  // Handle "Add to Cart" button clicks
  document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("add-to-cart")) {
      const card = e.target.closest(".product-card");
      if (card) {
        const titleEl = card.querySelector("h4") || card.querySelector("h3");
        const priceEl = card.querySelector(".price");
        const title = titleEl ? titleEl.textContent : "Unknown Item";
        const price = priceEl ? priceEl.textContent : "$0.00";
        
        // Add item to cart
        cartItems.push({ title, price });
        updateCartCount();
        alert(`${title} added to cart!`);
      }
    }
  });

  // Handle cart button click
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openCartModal();
    });
  }
});

function updateCartCount() {
  const cartBadge = document.getElementById("cartBadge");
  if (cartBadge) {
    cartBadge.textContent = cartItems.length;
    if (cartItems.length > 0) {
      cartBadge.style.display = "flex";
    }
  }
}

function openCartModal() {
  const modal = document.getElementById("cartModal");
  const cartList = document.getElementById("cartList");
  
  if (!modal) return;
  
  cartList.innerHTML = "";
  
  if (cartItems.length === 0) {
    cartList.innerHTML = "<p style='text-align:center;padding:20px;'>Your cart is empty</p>";
  } else {
    cartItems.forEach((item, idx) => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <div style="flex:1;">
          <strong>${item.title}</strong>
          <p>${item.price}</p>
        </div>
        <button class="remove-btn" onclick="removeCartItem(${idx})">Remove</button>
      `;
      cartList.appendChild(itemEl);
    });
  }
  
  modal.classList.add("show");
}

function closeCartModal() {
  const modal = document.getElementById("cartModal");
  if (modal) {
    modal.classList.remove("show");
  }
}

function removeCartItem(idx) {
  cartItems.splice(idx, 1);
  updateCartCount();
  openCartModal(); // Refresh modal view
}

window.openCartModal = openCartModal;
window.closeCartModal = closeCartModal;
window.removeCartItem = removeCartItem;
