
//Array products
let productos = []

//Fetch from json file
fetch("./productos.json")
.then(Response => Response.json())
.then(data => {
    productos = data;
    cargarProductos(productos)
})



//Dom
const contenedorProductos = document.querySelector("#contenedor-productos")
let productoBotones = document.querySelectorAll(".producto__btn")
const carritoContainer = document.querySelector("#carrito-contenedor");
const contadorCarrito = document.querySelector("#contador__carrito")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const precioTotal = document.querySelector('#precioTotal')
let eliminarProducto = document.querySelectorAll(".boton-eliminar")



// Inyectar las tarjetas al html. div con la class producto y las siguientes caracteristicas de la tarjeta de producto.
function cargarProductos() {

    contenedorProductos.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("producto");
        div.innerHTML = `
    <img src="${producto.imagen}" class="producto__img">
    <div class="producto__descripcion">
        <h3 class="producto__tittle">${producto.titulo}</h3>
        <span class="producto__price">$${producto.precio}</span>
    </div>
    <button class="producto__btn" id="${producto.id}">Añadir al carrito</button>
</div>
    `;

        contenedorProductos.append(div);
    })
    btnProduct();
}

cargarProductos();


//
function btnProduct() {
    productoBotones = document.querySelectorAll(".producto__btn");

    productoBotones.forEach(boton => {
        boton.addEventListener("click", añadirAlCarrito);

    })
}





// kart array
const carrito = [];

// Function add to the kart + toastify library
function añadirAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "black",
          color:"white",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontFamily: "Bebas",
          fontSize: "1rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();


    const idBtn = e.currentTarget.id;
    const productoAdd = productos.find(producto => producto.id === idBtn);
    if (carrito.some(producto => producto.id === idBtn)) {
        const index = carrito.findIndex(producto => producto.id === idBtn)
        carrito[index].cantidad++;
    } else {
        productoAdd.cantidad = 1;
        carrito.push(productoAdd);
        console.log(carrito);
        cargarCarrito();
    }
    cantidadCarrito();
    //Local Storage
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito))
}


    //Function to update the kart counter
    function cantidadCarrito() {
        let contador = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
        contadorCarrito.innerText = contador;
    }



window.addEventListener('load', function () {
    if (carrito.length > 0) {
        cargarCarrito();
    }
});




