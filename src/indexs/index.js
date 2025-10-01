const API_URL = 'http://localhost:8080/api/orders';

function mostrarMensaje(msg, tipo = 'success') {
  const msgDiv = document.getElementById('msg');
  msgDiv.textContent = msg;
  msgDiv.className = `message ${tipo}`;
  setTimeout(() => {
    msgDiv.textContent = '';
    msgDiv.className = '';
  }, 3000);
}

async function cargarOrdenes() {
  try {
    const res = await fetch(API_URL);
    const orders = await res.json();
    const ul = document.getElementById('orders');
    ul.innerHTML = '';
    if (orders.length === 0) {
      ul.innerHTML = '<li>No hay órdenes registradas.</li>';
      return;
    }
    orders.forEach(order => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>Orden #${order._id}</strong> - Total: $${order.total} <br>
        <em>Items:</em> ${order.items.map(i => `${i.product} (${i.quantity})`).join(', ')}
        <br><small>Usuario: ${order.user}</small>`;
      ul.appendChild(li);
    });
  } catch (err) {
    mostrarMensaje('Error al cargar órdenes', 'error');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cargarOrdenes();

  document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('userId').value.trim();
    const product = document.getElementById('product').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value, 10);

    if (!user || !product || !quantity) {
      mostrarMensaje('Completa todos los campos', 'error');
      return;
    }

    const order = {
      user,
      items: [{ product, quantity }],
      total: 0 
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (res.ok) {
        mostrarMensaje('Orden creada correctamente', 'success');
        document.getElementById('orderForm').reset();
        cargarOrdenes();
      } else {
        const errData = await res.json();
        mostrarMensaje(errData.error || 'Error al crear la orden', 'error');
      }
    } catch (err) {
      mostrarMensaje('Error de red al crear la orden', 'error');
    }
  });
});