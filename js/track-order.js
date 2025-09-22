function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function renderOrderStatus() {
    const orderStatusContainer = document.getElementById('order-status');
    const trackingNumberFromUrl = getUrlParameter('order');
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));

    if (!lastOrder || lastOrder.trackingNumber !== trackingNumberFromUrl) {
        orderStatusContainer.innerHTML = `<h3>Pedido no encontrado</h3><p>Verifica el número de seguimiento e inténtalo de nuevo.</p>`;
        return;
    }

    const { trackingNumber, date, status, items } = lastOrder;

    let itemsHtml = items.map(item => {
        const personalizationText = item.personalization ? `(Mensaje: ${item.personalization})` : '';
        return `<li>${item.name} x ${item.quantity} ${personalizationText} - $${(item.price * item.quantity).toLocaleString('es-CL')} CLP</li>`;
    }).join('');

    orderStatusContainer.innerHTML = `
        <h3>Pedido #${trackingNumber}</h3>
        <p>Fecha del pedido: ${date}</p>
        <p>Estado actual: <strong>${status}</strong></p>
        <div class="order-details">
            <h4>Detalles de tu pedido:</h4>
            <ul>
                ${itemsHtml}
            </ul>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', renderOrderStatus);