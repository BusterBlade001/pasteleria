function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Función principal de renderizado y simulación (RF: Seguimiento en Tiempo Real)
function renderOrderStatus() {
    const orderStatusContainer = document.getElementById('order-status');
    const trackingNumberFromUrl = getUrlParameter('order');
    // Busca la última orden guardada
    let lastOrder = JSON.parse(localStorage.getItem('lastOrder'));

    if (!lastOrder || lastOrder.trackingNumber !== trackingNumberFromUrl) {
         orderStatusContainer.innerHTML = `<h3>Pedido no encontrado</h3><p>Verifica el número de seguimiento e inténtalo de nuevo.</p>`;
         return;
    }

    const { trackingNumber, date, deliveryDate, status, items } = lastOrder;

    let itemsHtml = items.map(item => {
        const personalizationText = item.personalization ? `(Mensaje: ${item.personalization})` : '';
        return `<li>${item.name} x ${item.quantity} ${personalizationText} - $${(item.price * item.quantity).toLocaleString('es-CL')} CLP</li>`;
    }).join('');

    // Función interna para actualizar el DOM con el estado actual
    function updateDisplay(currentStatus) {
        orderStatusContainer.innerHTML = `
            <h3>Pedido #${trackingNumber}</h3>
            <p>Fecha del pedido: ${date}</p>
            <p>Entrega programada para: <strong>${deliveryDate}</strong></p>
            <p>Estado actual: <strong class="status-${currentStatus.toLowerCase().replace(' ', '-')}">${currentStatus}</strong></p>
            <div class="order-details">
                <h4>Detalles de tu pedido:</h4>
                <ul>
                    ${itemsHtml}
                </ul>
            </div>
        `;
    }

    // SIMULACIÓN DE PROGRESO DE LA ORDEN
    const statusCycle = ['Preparación', 'Control de Calidad', 'En Camino', 'Entregado'];
    let currentStatusIndex = statusCycle.indexOf(status);
    if (currentStatusIndex === -1) currentStatusIndex = 0; // Inicia en Preparación si no está

    // Actualiza la pantalla por primera vez
    updateDisplay(status);

    // Ciclo de actualización solo si la orden no ha sido entregada
    if (status !== 'Entregado') {
        const intervalId = setInterval(() => {
            currentStatusIndex++;
            if (currentStatusIndex < statusCycle.length) {
                const newStatus = statusCycle[currentStatusIndex];
                updateDisplay(newStatus);
                
                // Actualiza el estado en el localStorage
                lastOrder.status = newStatus;
                localStorage.setItem('lastOrder', JSON.stringify(lastOrder));
                
                // Si llegamos a Entregado, detenemos el ciclo
                if (newStatus === 'Entregado') {
                    clearInterval(intervalId);
                }
            }
        }, 5000); // Cambia el estado cada 5 segundos (simulación)
    }
}

document.addEventListener('DOMContentLoaded', renderOrderStatus);