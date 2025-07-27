document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const noItemsMessage = document.getElementById('no-items-msg');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function displayCartItems() {
        if (cartItems.length === 0) {
            noItemsMessage.style.display = 'block';
        } else {
            noItemsMessage.style.display = 'none';
            cartItemsContainer.innerHTML = '';
            cartItems.forEach((item, index) => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>Price: ₹${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }
    }

    
    function removeItemFromCart(index) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems();
        updateCartCount();
    }

    
    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.dataset.index;
            removeItemFromCart(index);
        }
    });

    
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = cartItems.length;
    }

    
    displayCartItems();
    updateCartCount();
});
