const products = [
    { code: "TC001", category: "Tortas Cuadradas", name: "Torta Cuadrada de Chocolate", price: 45000, description: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas.", image: "img/torta-cuadrada-de-chocolate.jpg" },
    { code: "TC002", category: "Tortas Cuadradas", name: "Torta Cuadrada de Frutas", price: 50000, description: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.", image: "img/torta-cuadrada-de-frutas.jpg" },
    { code: "TT001", category: "Tortas Circulares", name: "Torta Circular de Vainilla", price: 40000, description: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.", image: "img/torta-circular-de-vainilla.jpg" },
    { code: "TT002", category: "Tortas Circulares", name: "Torta Circular de Manjar", price: 42000, description: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.", image: "img/torta-circular-de-manjar.jpg" },
    { code: "PI001", category: "Postres Individuales", name: "Mousse de Chocolate", price: 5000, description: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.", image: "img/mousse-de-chocolate.jpg" },
    { code: "PI002", category: "Postres Individuales", name: "Tiramisú Clásico", price: 5500, description: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.", image: "img/tiramisu-clasico.jpg" },
    { code: "PSA001", category: "Productos Sin Azúcar", name: "Torta Sin Azúcar de Naranja", price: 48000, description: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.", image: "img/torta-sin-azucar-naranja.jpg" },
    { code: "PSA002", category: "Productos Sin Azúcar", name: "Cheesecake Sin Azúcar", price: 47000, description: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.", image: "img/Cheesecake--sin-azucar.jpg" },
    { code: "PT001", category: "Pastelería Tradicional", name: "Empanada de Manzana", price: 3000, description: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.", image: "img/empanada-de-manzana.jpg" },
    { code: "PT002", category: "Pastelería Tradicional", name: "Tarta de Santiago", price: 6000, description: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.", image: "img/tarta-de-santiago.jpg" },
    { code: "PG001", category: "Productos Sin Gluten", name: "Brownie Sin Gluten", price: 4000, description: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.", image: "img/brownie-sin-gluten.jpg" },
    { code: "PG002", category: "Productos Sin Gluten", name: "Pan Sin Gluten", price: 3500, description: "Suave y esponjoso, ideal para sandwiches o para acompañar cualquier comida.", image: "img/pan-sin-gluten.jpg" },
    { code: "PV001", category: "Productos Vegana", name: "Torta Vegana de Chocolate", price: 50000, description: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.", image: "img/torta-vegana-de-chocolate.jpg" },
    { code: "PV002", category: "Productos Vegana", name: "Galletas Veganas de Avena", price: 4500, description: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.", image: "img/galletas-veganas-de-avena.jpg" },
    { code: "TE001", category: "Tortas Especiales", name: "Torta Especial de Cumpleaños", price: 55000, description: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.", image: "img/torta-especial-de-cumpleaños.jpg" },
    { code: "TE002", category: "Tortas Especiales", name: "Torta Especial de Boda", price: 60000, description: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.", image: "img/torta-especial-de-boda.jpg" }
];

function renderProducts(filteredProducts = products) {
    const productList = document.getElementById('product-list');
    // Verifica que el elemento exista antes de intentar manipularlo
    if (!productList) return; 
    
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('a');
        productCard.className = 'product-card';
        productCard.href = `product-detail.html?code=${product.code}`;
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">$${product.price.toLocaleString('es-CL')} CLP</p>
        `;
        productList.appendChild(productCard);
    });
}

// Lógica de actualización del carrito ahora para el modal
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    // Verifica que los elementos existan. Si no existen (ej: en otras páginas), no hagas nada.
    if (!cartItemsContainer || !cartTotalElement) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';
    let total = 0;

    const checkoutBtn = document.getElementById('checkout-btn');
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        if (checkoutBtn) checkoutBtn.disabled = true;
    } else {
        if (checkoutBtn) checkoutBtn.disabled = false;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            // Botón de eliminar para el item del carrito
            cartItem.innerHTML = `
                <div>
                    <p>${item.name} x ${item.quantity}</p>
                    ${item.personalization ? `<p style="font-size:0.9rem; color: #888;">(Mensaje: ${item.personalization})</p>` : ''}
                </div>
                <div>
                    <p>$${(item.price * item.quantity).toLocaleString('es-CL')} CLP</p>
                    <button class="remove-item-btn" data-code="${item.code}" data-personalization="${item.personalization || ''}">X</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });
    }

    cartTotalElement.textContent = `$${total.toLocaleString('es-CL')} CLP`;
    
    // Añadir listeners para eliminar productos
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const code = e.target.dataset.code;
            const personalization = e.target.dataset.personalization;
            removeItemFromCart(code, personalization);
        });
    });
}

function removeItemFromCart(code, personalization) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const indexToRemove = cart.findIndex(item => item.code === code && (item.personalization || '') === personalization);

    if (indexToRemove !== -1) {
        cart.splice(indexToRemove, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart(); // Volver a renderizar el carrito
    }
}


function filterAndSearchProducts() {
    // Verificar que los elementos de filtrado existan (solo existen en index.html)
    const searchInput = document.getElementById('header-search-input');
    const categoryFilter = document.getElementById('category-filter');
    if (!searchInput || !categoryFilter) return;

    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    
    const filtered = products.filter(product => {
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    renderProducts(filtered);
}

// Solo añadir listeners si los elementos existen (para evitar errores en product-detail.html)
if (document.getElementById('category-filter')) {
    document.getElementById('category-filter').addEventListener('change', filterAndSearchProducts);
}
if (document.getElementById('header-search-input')) {
    document.getElementById('header-search-input').addEventListener('input', filterAndSearchProducts);
}


function generateTrackingNumber() {
    return 'PS-' + Math.floor(10000000 + Math.random() * 90000000);
}

// Añadimos el listener de checkout condicionalmente, ya que ahora existe en varias páginas.
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const deliveryDateInput = document.getElementById('delivery-date');

        if (cart.length === 0) {
            alert('El carrito está vacío. Agrega productos para finalizar la compra.');
            return;
        }

        // Si el input de fecha existe, validarlo
        if (deliveryDateInput) {
            const deliveryDate = deliveryDateInput.value;
            if (!deliveryDate) {
                alert('Por favor, selecciona una fecha de entrega preferida.');
                return;
            }
            
            // Validación: La fecha de entrega debe ser futura
            const today = new Date();
            const todayString = today.toISOString().split('T')[0];
            
            if (deliveryDate < todayString) {
                alert('La fecha de entrega debe ser hoy o posterior.');
                return;
            }
        }
        
        const trackingNumber = generateTrackingNumber();
        const orderData = {
            trackingNumber: trackingNumber,
            date: new Date().toLocaleDateString('es-CL'),
            deliveryDate: deliveryDateInput ? deliveryDateInput.value : 'No especificada', 
            status: 'Preparación',
            items: cart
        };

        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        localStorage.setItem('cart', JSON.stringify([]));
        
        // Cierra el modal y actualiza la vista
        const cartModal = document.getElementById('cart-modal');
        if (cartModal) cartModal.style.display = 'none';
        updateCart(); 

        alert(`¡Gracias por tu compra! Tu pedido ha sido confirmado. Número de seguimiento: ${trackingNumber}`);
        
        window.location.href = `track-order.html?order=${trackingNumber}`;
    });
}


// Listener de compartir condicional
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
    shareBtn.addEventListener('click', () => {
        const shareUrl = window.location.href;
        const shareText = "¡Descubre la dulzura de la vida con Pastelería Mil Sabores! Te encantarán sus tortas y postres tradicionales.";
        
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: shareText,
                url: shareUrl,
            }).then(() => {
                console.log('Contenido compartido con éxito.');
            }).catch(console.error);
        } else {
            alert("¡Copia este enlace para compartir! " + shareUrl);
        }
    });
}


function toggleProfileButton() {
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = user.email === 'admin@pasteleria.cl';
    
    // Obtenemos los nuevos íconos del header
    const loginIcon = document.getElementById('header-login-icon');
    const profileIcon = document.getElementById('header-profile-icon');
    const adminLink = document.getElementById('admin-link');
    
    if (loginIcon && profileIcon) {
        if (isLoggedIn) {
            loginIcon.style.display = 'none';
            profileIcon.style.display = 'inline-flex'; 
            if (isAdmin && adminLink) {
                adminLink.style.display = 'inline-flex';
            } else if (adminLink) {
                adminLink.style.display = 'none';
            }
        } else {
            loginIcon.style.display = 'inline-flex';
            profileIcon.style.display = 'none';
            if (adminLink) adminLink.style.display = 'none';
        }
    }
}

// Lógica para mostrar/ocultar el modal del carrito
function setupCartModal() {
    const cartModal = document.getElementById('cart-modal');
    const cartIcon = document.getElementById('header-cart-icon');
    // Aseguramos que solo seleccionamos el botón de cerrar DENTRO del modal
    const closeBtn = document.querySelector('.cart-modal .close-btn');

    if (!cartModal || !cartIcon || !closeBtn) return;
    
    cartIcon.onclick = function() {
        updateCart(); // Asegurarse de que el carrito esté actualizado antes de mostrar
        cartModal.style.display = 'block';
    }

    closeBtn.onclick = function() {
        cartModal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Solo llama a renderProducts si estamos en index.html (donde existe #product-list)
    if (document.getElementById('product-list')) {
        renderProducts();
    }
    
    // Esta lógica se ejecuta en TODAS las páginas que incluyan script.js
    toggleProfileButton(); 
    setupCartModal(); 
    updateCart(); // Llama a updateCart (que también es robusta)
});