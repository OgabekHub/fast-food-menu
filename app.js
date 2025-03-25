document.addEventListener("DOMContentLoaded", () => {
    const addtoCardButtons = document.querySelectorAll(".add-to-cart");
    const cartItemCount = document.querySelector(".cart-icon span"); // Bitta element
    const cartItemList = document.querySelector(".cart-items"); // "cart-tems" deb yozilgan edi, HTMLda moslashtirish kerak
    const cartTotal = document.querySelector(".cart-total");
    const cartIcon = document.querySelector(".cart-icon");
    const sidebar = document.getElementById("sidebar"); // To‘g‘ri ID
  
    let cartItems = [];
    let totalAmout = 0;
  
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
  
    // Savatdagi mahsulotlar ro‘yxatini yangilash
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
  
    // Savatdan mahsulotni o‘chirish
    function removeItemFromCart(index) {
      const removeItem = cartItems.splice(index, 1)[0];
      totalAmout -= removeItem.price * removeItem.quantity;
      updateCartUI();
    }
  
    // Umumiy summani yangilash
    function updateCartTotal() {
      cartTotal.textContent = `$${totalAmout.toFixed(2)}`;
    }
  
    // Har bir "Add to Cart" tugmasi uchun event listener
    addtoCardButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const item = {
          name: document.querySelectorAll(".card .card--title")[index].textContent,
          price: parseFloat(
            document.querySelectorAll(".price")[index].textContent.slice(1)
          ),
          quantity: 1,
        };
  
        const exisitingItem = cartItems.find(
          (cartItem) => cartItem.name === item.name
        );
        if (exisitingItem) {
          exisitingItem.quantity++;
        } else {
          cartItems.push(item);
        }
  
        totalAmout += item.price;
        updateCartUI();
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
  });