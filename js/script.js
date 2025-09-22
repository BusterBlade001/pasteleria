const products = [
    { code: "TC001", category: "Tortas Cuadradas", name: "Torta Cuadrada de Chocolate", price: 45000, description: "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas." },
    { code: "TC002", category: "Tortas Cuadradas", name: "Torta Cuadrada de Frutas", price: 50000, description: "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones." },
    { code: "TT001", category: "Tortas Circulares", name: "Torta Circular de Vainilla", price: 40000, description: "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión." },
    { code: "TT002", category: "Tortas Circulares", name: "Torta Circular de Manjar", price: 42000, description: "Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos." },
    { code: "PI001", category: "Postres Individuales", name: "Mousse de Chocolate", price: 5000, description: "Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate." },
    { code: "PI002", category: "Postres Individuales", name: "Tiramisú Clásico", price: 5500, description: "Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida." },
    { code: "PSA001", category: "Productos Sin Azúcar", name: "Torta Sin Azúcar de Naranja", price: 48000, description: "Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables." },
    { code: "PSA002", category: "Productos Sin Azúcar", name: "Cheesecake Sin Azúcar", price: 47000, description: "Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa." },
    { code: "PT001", category: "Pastelería Tradicional", name: "Empanada de Manzana", price: 3000, description: "Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda." },
    { code: "PT002", category: "Pastelería Tradicional", name: "Tarta de Santiago", price: 6000, description: "Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos." },
    { code: "PG001", category: "Productos Sin Gluten", name: "Brownie Sin Gluten", price: 4000, description: "Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor." },
    { code: "PG002", category: "Productos Sin Gluten", name: "Pan Sin Gluten", price: 3500, description: "Suave y esponjoso, ideal para sandwiches o para acompañar cualquier comida." },
    { code: "PV001", category: "Productos Vegana", name: "Torta Vegana de Chocolate", price: 50000, description: "Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos." },
    { code: "PV002", category: "Productos Vegana", name: "Galletas Veganas de Avena", price: 4500, description: "Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano." },
    { code: "TE001", category: "Tortas Especiales", name: "Torta Especial de Cumpleaños", price: 55000, description: "Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos." },
    { code: "TE002", category: "Tortas Especiales", name: "Torta Especial de Boda", price: 60000, description: "Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda." }
];

function renderProducts(filteredProducts = products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('a');
        productCard.className = 'product-card';
        productCard.href = `product-detail.html?code=${product.code}`;
        productCard.innerHTML = `
            <img src="https://via.placeholder.com/250x200.png?text=${product.name.replace(/ /g, '+')}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">$${product.price.toLocaleString('es-CL')} CLP</p>
        `;
        productList.appendChild(productCard);
    });
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            const personalizationText = item.personalization ? ` <br> (Mensaje: ${item.personalization})` : '';
            cartItem.innerHTML = `
                <p>${item.name} x ${item.quantity}${personalizationText}</p>
                <p>$${(item.price * item.quantity).toLocaleString('es-CL')} CLP</p>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });
    }

    cartTotalElement.textContent = `$${total.toLocaleString('es-CL')} CLP`;
}

function filterAndSearchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedCategory = document.getElementById('category-filter').value;
    
    const filtered = products.filter(product => {
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    renderProducts(filtered);
}

document.getElementById('category-filter').addEventListener('change', filterAndSearchProducts);
document.getElementById('search-input').addEventListener('input', filterAndSearchProducts);

function generateTrackingNumber() {
    return 'PS-' + Math.floor(10000000 + Math.random() * 90000000);
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length > 0) {
        const trackingNumber = generateTrackingNumber();
        const orderData = {
            trackingNumber: trackingNumber,
            date: new Date().toLocaleDateString('es-CL'),
            status: 'Preparación',
            items: cart
        };

        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        localStorage.setItem('cart', JSON.stringify([]));
        updateCart();

        alert(`¡Gracias por tu compra! Tu pedido ha sido confirmado. Número de seguimiento: ${trackingNumber}`);
        
        window.location.href = `track-order.html?order=${trackingNumber}`;

    } else {
        alert('El carrito está vacío. Agrega productos para finalizar la compra.');
    }
});

document.getElementById('share-btn').addEventListener('click', () => {
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

function toggleProfileButton() {
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isAdmin = user.email === 'admin@pasteleria.cl';
    
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const profileLink = document.getElementById('profile-link');
    const adminLink = document.getElementById('admin-link');

    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        profileLink.style.display = 'list-item'; 
        if (isAdmin) {
            adminLink.style.display = 'list-item';
        }
    } else {
        loginBtn.style.display = 'list-item';
        registerBtn.style.display = 'list-item';
        profileLink.style.display = 'none';
        adminLink.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
    toggleProfileButton();
});