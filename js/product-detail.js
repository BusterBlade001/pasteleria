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

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function renderProductDetail() {
    const productCode = getUrlParameter('code');
    const product = products.find(p => p.code === productCode);
    const productContainer = document.getElementById('product-container');
    const productTitle = document.getElementById('product-title');

    if (!product) {
        productContainer.innerHTML = '<p>Producto no encontrado.</p>';
        return;
    }
    
    productTitle.textContent = `${product.name} - Pastelería Mil Sabores`;

    productContainer.innerHTML = `
        <img src="https://via.placeholder.com/600x400.png?text=${product.name.replace(/ /g, '+')}" alt="${product.name}">
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