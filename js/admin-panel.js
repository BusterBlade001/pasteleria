document.addEventListener('DOMContentLoaded', () => {
    const productsTableBody = document.querySelector('#products-table tbody');
    const ordersTableBody = document.querySelector('#orders-table tbody');
    const adminMenu = document.querySelector('.admin-menu');
    const sections = {
        products: document.getElementById('products-view'),
        orders: document.getElementById('orders-view')
    };

    // Cargar datos simulados
    let products = JSON.parse(localStorage.getItem('products')) || [];
    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Si no hay productos, usar los datos de la tienda como base
    if (products.length === 0) {
        products = [
            { code: "TC001", name: "Torta Cuadrada de Chocolate", category: "Tortas Cuadradas", price: 45000 },
            { code: "TT001", name: "Torta Circular de Vainilla", category: "Tortas Circulares", price: 40000 },
            { code: "PT001", name: "Empanada de Manzana", category: "Pastelería Tradicional", price: 3000 },
        ];
        localStorage.setItem('products', JSON.stringify(products));
    }
    
    // Si no hay órdenes, usar la última orden de la tienda como base
    if (orders.length === 0) {
        const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
        if (lastOrder) {
            orders.push(lastOrder);
            localStorage.setItem('orders', JSON.stringify(orders));
        }
    }


    // Renderizar tablas
    function renderProducts() {
        productsTableBody.innerHTML = '';
        products.forEach(product => {
            const row = productsTableBody.insertRow();
            row.innerHTML = `
                <td>${product.code}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price.toLocaleString('es-CL')} CLP</td>
                <td class="action-buttons">
                    <button class="edit-btn" data-code="${product.code}">Editar</button>
                    <button class="delete-btn" data-code="${product.code}">Eliminar</button>
                </td>
            `;
        });
    }

    function renderOrders() {
        ordersTableBody.innerHTML = '';
        orders.forEach(order => {
            const row = ordersTableBody.insertRow();
            row.innerHTML = `
                <td>${order.trackingNumber}</td>
                <td>${order.date}</td>
                <td>${order.status}</td>
                <td class="action-buttons">
                    <button class="edit-btn" data-id="${order.trackingNumber}">Detalle</button>
                </td>
            `;
        });
    }

    // Manejar cambios de sección
    adminMenu.addEventListener('click', (e) => {
        const target = e.target.closest('li');
        if (!target) return;

        // Quitar la clase 'active' de todos los elementos del menú
        document.querySelectorAll('.admin-menu li').forEach(li => li.classList.remove('active'));
        // Agregar la clase 'active' al elemento clickeado
        target.classList.add('active');

        // Ocultar todas las secciones
        Object.values(sections).forEach(section => section.style.display = 'none');
        // Mostrar la sección seleccionada
        const sectionId = target.dataset.section;
        sections[sectionId].style.display = 'block';

        if (sectionId === 'products') {
            renderProducts();
        } else if (sectionId === 'orders') {
            renderOrders();
        }
    });

    // Simulación de añadir producto
    document.getElementById('add-product-btn').addEventListener('click', () => {
        const newName = prompt("Introduce el nombre del nuevo producto:");
        const newCategory = prompt("Introduce la categoría:");
        const newPriceInput = prompt("Introduce el precio:");

        const newPrice = parseInt(newPriceInput);

        // AÑADIDO: Validación básica
        if (!newName || !newCategory || isNaN(newPrice) || newPrice <= 0) {
             alert('Error: Todos los campos deben ser rellenados y el precio debe ser un número positivo.');
             return;
        }
        
        if (newName && newCategory && newPrice) {
            const newCode = `P${Math.floor(Math.random() * 1000)}`;
            products.push({
                code: newCode,
                name: newName,
                category: newCategory,
                price: newPrice
            });
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
            alert('Producto añadido con éxito.');
        }
    });

    // Delegar eventos para editar y eliminar
    productsTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const productCode = e.target.dataset.code;
            if (confirm(`¿Estás seguro de que quieres eliminar el producto con el código ${productCode}?`)) {
                products = products.filter(p => p.code !== productCode);
                localStorage.setItem('products', JSON.stringify(products));
                renderProducts();
                alert('Producto eliminado.');
            }
        } else if (e.target.classList.contains('edit-btn')) {
            const productCode = e.target.dataset.code;
            const productToEdit = products.find(p => p.code === productCode);

            if (productToEdit) {
                const newName = prompt("Editar nombre:", productToEdit.name)?.trim();
                const newCategory = prompt("Editar categoría:", productToEdit.category)?.trim();
                const newPriceInput = prompt("Editar precio:", productToEdit.price);
                const newPrice = parseInt(newPriceInput);
                
                // AÑADIDO: Validación básica en edición
                if (!newName || !newCategory || isNaN(newPrice) || newPrice <= 0) {
                     alert('Error: Todos los campos deben ser rellenados y el precio debe ser un número positivo.');
                     return;
                }

                if (newName !== null && newCategory !== null && newPrice !== null) {
                    productToEdit.name = newName;
                    productToEdit.category = newCategory;
                    productToEdit.price = newPrice;
                    localStorage.setItem('products', JSON.stringify(products));
                    renderProducts();
                    alert('Producto actualizado con éxito.');
                }
            }
        }
    });

    // Cargar la vista de productos por defecto al iniciar
    renderProducts();
});