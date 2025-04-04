document.addEventListener("DOMContentLoaded", () => {
    const addtoCardButtons = document.querySelectorAll(".add-to-cart");
    const cartItemCount = document.querySelector(".cart-icon span"); // Bitta element
    const cartItemList = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");
    const cartIcon = document.querySelector(".cart-icon");
    const sidebar = document.getElementById("sidebar"); // To'g'ri ID
    const searchInput = document.querySelector(".search--box input");
    const cards = document.querySelectorAll(".card");
    const minusButtons = document.querySelectorAll(".quantity-btn.minus");
    const plusButtons = document.querySelectorAll(".quantity-btn.plus");
  
    let cartItems = [];
    let totalAmount = 0;
  
    // Savat UI ni yangilash funksiyasi
    function updateCartUI() {
      updateCartItemCount(cartItems.length);
      updateCartItemList();
      updateCartTotal();
    }
  
    // Savatdagi elementlar sonini yangilash
    function updateCartItemCount(count) {
      cartItemCount.textContent = count;
    }
  
    // Savatdagi mahsulotlar ro'yxatini yangilash
    function updateCartItemList() {
      cartItemList.innerHTML = "";
      cartItems.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item", "individual-cart-item");
        cartItem.innerHTML = `
          <span>(${item.quantity}x) ${item.name}</span>
          <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          <button class="remove-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
        `;
        cartItemList.append(cartItem);
      });
  
      const removeButtons = document.querySelectorAll(".remove-btn");
      removeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const index = event.target.closest(".remove-btn").dataset.index;
          removeItemFromCart(index);
        });
      });
    }
  
    // Savatdan mahsulotni o'chirish
    function removeItemFromCart(index) {
      const removeItem = cartItems.splice(index, 1)[0];
      totalAmount -= removeItem.price * removeItem.quantity;
      updateCartUI();
    }
  
    // Umumiy summani yangilash
    function updateCartTotal() {
      cartTotal.textContent = `$${totalAmount.toFixed(2)}`;
    }
  
    // Miqdor tanlash funksionalligi
    minusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const quantityElement = button.nextElementSibling;
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) {
          quantity--;
          quantityElement.textContent = quantity;
        }
      });
    });
  
    plusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const quantityElement = button.previousElementSibling;
        let quantity = parseInt(quantityElement.textContent);
        if (quantity < 10) { // Maksimal miqdorni cheklash
          quantity++;
          quantityElement.textContent = quantity;
        }
      });
    });
  
    // Har bir "Add to Cart" tugmasi uchun event listener
    addtoCardButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        // Animatsiya qo'shish
        button.classList.add("animate");
        setTimeout(() => {
          button.classList.remove("animate");
        }, 500);
        
        const quantityElement = button.parentElement.querySelector(".quantity");
        const quantity = parseInt(quantityElement.textContent);
        
        const item = {
          name: document.querySelectorAll(".card .card--title")[index].textContent,
          price: parseFloat(
            document.querySelectorAll(".price")[index].textContent.slice(1)
          ),
          quantity: quantity,
        };
  
        const exisitingItem = cartItems.find(
          (cartItem) => cartItem.name === item.name
        );
        if (exisitingItem) {
          exisitingItem.quantity += quantity;
        } else {
          cartItems.push(item);
        }
  
        totalAmount += item.price * quantity;
        updateCartUI();
        
        // Miqdorni qayta 1 ga o'rnatish
        quantityElement.textContent = "1";
        
        // Mobil qurilmalarda mahsulot qo'shilganda sidebar ochiladi
        if (window.innerWidth <= 768) {
          sidebar.classList.add("open");
        }
      });
    });
  
    // Savat ochish
    cartIcon.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  
    // Savat yopish
    const closeButton = document.querySelector(".sidebar-close");
    closeButton.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
    
    // Mobil qurilmalarda sidebar tashqarisiga bosilganda yopiladi
    document.addEventListener("click", (event) => {
      if (window.innerWidth <= 768 && 
          sidebar.classList.contains("open") && 
          !sidebar.contains(event.target) && 
          !cartIcon.contains(event.target)) {
        sidebar.classList.remove("open");
      }
    });
    
    // Qidiruv funksiyasi
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      
      cards.forEach(card => {
        const title = card.querySelector(".card--title").textContent.toLowerCase();
        const description = card.querySelector(".card--description").textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });