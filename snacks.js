document.addEventListener('DOMContentLoaded', function () {
    const cartItemsContainer = document.getElementById('cart-items');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>Price: ₹${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                </div>
            `;
        });
    }

    function addToCart(item) {
        cartItems.push(item);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems();
    }

    displayCartItems();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.closest('.product');
            const productName = product.querySelector('h3').textContent;
            const productPrice = parseFloat(product.querySelector('.price').textContent.slice(1));
            const productQuantity = parseInt(product.querySelector('input[type="number"]').value);
            const productImage = product.querySelector('img').src;

            addToCart({ name: productName, price: productPrice, quantity: productQuantity, image: productImage });
        });
    });
});
