// La lista de 'products' fue movida a js/product-data.js

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function renderProductDetail() {
    // La variable products es ahora global, cargada por product-data.js
    const productCode = getUrlParameter('code');
    // Verifica si products existe (debería existir si product-data.js se carga primero)
    if (typeof products === 'undefined') {
        document.getElementById('product-container').innerHTML = '<p>Error: Datos de producto no cargados.</p>';
        return;
    }
    const product = products.find(p => p.code === productCode);
    const productContainer = document.getElementById('product-container');
    const productTitle = document.getElementById('product-title');

    if (!product) {
        productContainer.innerHTML = '<p>Producto no encontrado.</p>';
        return;
    }
    
    productTitle.textContent = `${product.name} - Pastelería Mil Sabores`;

    productContainer.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="max-width: 600px; height: 400px; object-fit: cover;">
        <div class="product-info">
            <h2 class="section-title">${product.name}</h2>
            <p class="price">$${product.price.toLocaleString('es-CL')} CLP</p>
            <p class="description">${product.description}</p>
            ${product.category === 'Tortas Especiales' || product.category.includes('Torta') ? `
                <div class="customization-options">
                    <label for="special-message">Añadir mensaje especial:</label>
                    <textarea id="special-message" placeholder="Ej: ¡Feliz cumpleaños!"></textarea>
                </div>
            ` : ''}
            <button id="add-to-cart-btn" class="btn-submit">Añadir al Carrito</button>
            <button id="share-product-btn" class="btn-share-product">Compartir Producto</button>
        </div>
    `;

    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
        const specialMessage = document.getElementById('special-message') ? document.getElementById('special-message').value : '';
        const cartItem = {
            ...product,
            quantity: 1,
            personalization: specialMessage
        };
        
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(item => item.code === cartItem.code && item.personalization === cartItem.personalization);
        
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity++;
        } else {
            cart.push(cartItem);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} ha sido añadido al carrito.`);
        
        // Llamada a la función global para actualizar el modal de carrito.
        if (typeof updateCart === 'function') {
            updateCart();
        }
    });
    
    document.getElementById('share-product-btn').addEventListener('click', () => {
        const shareUrl = window.location.href;
        const shareText = `¡Mira esta deliciosa torta en Pastelería Mil Sabores! ${product.name}`;
        
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: shareText,
                url: shareUrl,
            }).then(() => {
                console.log('Producto compartido con éxito.');
            }).catch(console.error);
        } else {
            alert("¡Copia este enlace para compartir! " + shareUrl);
        }
    });
}

document.addEventListener('DOMContentLoaded', renderProductDetail);