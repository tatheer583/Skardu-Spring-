document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const ordersBody = document.getElementById('orders-body');
    const totalOrdersEl = document.getElementById('total-orders');
    const totalQtyEl = document.getElementById('total-qty');
    const lastOrderDateEl = document.getElementById('last-order-date');
    const logoutBtn = document.getElementById('logout-btn');

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = 'login.html';
        });
    }

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('adminToken');
                window.location.href = 'login.html';
                return;
            }

            if (!response.ok) throw new Error('Failed to fetch orders');
            
            const orders = await response.json();
            renderOrders(orders);
            updateStats(orders);
        } catch (error) {
            console.error('Fetch error:', error);
            ordersBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: red; padding: 3rem;">Error loading orders. Ensure backend is running.</td></tr>`;
        }
    };

    const updateOrderStatus = async (id, status) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    const renderOrders = (orders) => {
        if (orders.length === 0) {
            ordersBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 3rem;">No orders found yet.</td></tr>`;
            return;
        }

        ordersBody.innerHTML = orders.map(order => `
            <tr>
                <td>${new Date(order.createdAt).toLocaleDateString()} ${new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                <td style="font-weight: 600;">${order.customerName}</td>
                <td>${order.phone}</td>
                <td>${order.product}</td>
                <td style="text-align: center;">${order.quantity}</td>
                <td>
                    <select class="status-select status-${order.status.toLowerCase()}" onchange="updateStatus('${order._id}', this.value)">
                        <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                        <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>
                <td>
                    <button class="btn-action" onclick="window.location.href='https://wa.me/${order.phone.replace(/\s/g, '')}'">Chat</button>
                </td>
            </tr>
        `).join('');
    };

    const updateStats = (orders) => {
        let totalRevenue = 0;
        let activeCount = 0;

        // Pricing Map
        const prices = {
            '19 Liter Bottle': 300,
            '1.5 Liter Bottle': 100,
            '500 ML Bottle': 480,
            '12 Liter Bottle': 350
        };

        orders.forEach(order => {
            // Count active orders
            if (order.status === 'Pending' || order.status === 'Processing') {
                activeCount++;
            }

            // Calculate revenue from delivered orders
            if (order.status === 'Delivered') {
                const unitPrice = prices[order.product] || 0;
                totalRevenue += unitPrice * (order.quantity || 0);
            }
        });

        totalOrdersEl.textContent = orders.length;
        document.getElementById('total-revenue').textContent = `Rs. ${totalRevenue.toLocaleString()}`;
        document.getElementById('active-orders').textContent = activeCount;
        
        if (orders.length > 0) {
            const lastOrder = new Date(orders[0].createdAt);
            lastOrderDateEl.textContent = lastOrder.toLocaleDateString();
        }
    };

    window.updateStatus = updateOrderStatus;
    fetchOrders();
    setInterval(fetchOrders, 30000);
});
