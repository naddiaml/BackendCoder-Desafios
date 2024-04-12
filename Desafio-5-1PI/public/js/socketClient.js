const socket = io();

socket.on('productListUpdate', (products) => {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - ${product.description}`;
        productList.appendChild(li);
    });
});
