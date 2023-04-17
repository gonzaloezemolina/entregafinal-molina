const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton__carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})



// Function to add products to the kart interface
const cargarCarrito = () => {
    carritoContainer.innerHTML = ""

    carrito.forEach((producto) => {
        const divCarrito = document.createElement('div')
        divCarrito.classList.add('productoEnCarrito')
        divCarrito.innerHTML = `
        <p>${producto.titulo}</p>
        <p>Precio:$${producto.precio}</p>
        <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p>
        <button (${producto.id}) class="boton-eliminar"><i class="bi bi-trash-fill"></i></button>
        `
        carritoContainer.appendChild(divCarrito)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    precioTotal.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0)
    cargarBotonesEliminar();
}



//function kart empty
vaciarCarrito.addEventListener('click', () => {
    carrito.length = 0
    cargarCarrito();
    console.log(carrito);
    contadorCarrito.innerHTML = 0
})



//Delete product + toastify library
function cargarBotonesEliminar() {
    eliminarProducto = document.querySelectorAll(".boton-eliminar")

    eliminarProducto.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {

    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "black",
          color:"white",
          fontFamily:"Bebas",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: "1rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();




    const idBoton = e.currentTarget.id;
    const productoEliminado = carrito.find(producto => producto.id === idBoton)
    const index = carrito.findIndex(producto => producto.id === idBoton);
    carrito.splice(index, 1);
    cargarCarrito();
    cantidadCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
}

