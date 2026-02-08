document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("authModal");
    const userIcon = document.getElementById("userIcon");
    const loginForm = document.querySelector(".form.login");
    const registerForm = document.querySelector(".form.register");

    if (!modal || !userIcon || !loginForm || !registerForm) {
        console.error("Auth elements missing");
        return;
    }

    // Open modal (Login first) from user icon
    userIcon.addEventListener("click", () => {
        modal.classList.add("show");
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
    });

    // Close modal
    window.closeAuth = function () {
        modal.classList.remove("show");
    };

    // Switch to Register
    window.showRegister = function () {
        loginForm.classList.remove("active");
        registerForm.classList.add("active");
    };

    // Switch to Login
    window.showLogin = function () {
        registerForm.classList.remove("active");
        loginForm.classList.add("active");
    };

});
function loginSuccess() {
    document.getElementById("authModal").style.display = "none";
    // After successful login, redirect to book management page
    window.location.href = "book_management.html";
}

// Handle category card clicks - navigate to menu.html
document.addEventListener("DOMContentLoaded", () => {
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      window.location.href = "menu.html";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const addCartBtns = document.querySelectorAll(".add-cart-btn");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  let count = 0;

  addCartBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      count++;
      cartCount.textContent = count;

      const product = btn.closest(".book-details");
      const productName = product.querySelector("h4").textContent;
      const productPrice = product.querySelector(".book-price").textContent;

      const item = document.createElement("div");
      item.textContent = `${productName} - ${productPrice}`;
      cartItems.appendChild(item);

      // Open cart sidebar
      cartSidebar.style.right = "0";
    });
  });

  // Optional: click cart icon to toggle sidebar
  document.getElementById("cart-icon").addEventListener("click", () => {
    cartSidebar.style.right = cartSidebar.style.right === "0px" ? "-350px" : "0";
  });
});


