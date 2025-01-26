/* Carrito */
let contenedorCarro = []

/* Cargar carrito desde localStorage al iniciar */
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        contenedorCarro = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

/* Guardar carrito en localStorage */
function guardarCarritoEnLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(contenedorCarro));
}

const tarjetaProducto = document.querySelectorAll(".productos__container-card")

tarjetaProducto.forEach(tarjeta => {
    tarjeta.addEventListener("click", e => {
        if(e.target.classList.contains("addCarBtn")){

            const infoProducto = {
                Imagen: tarjeta.querySelector("img").src,
                Cantidad: 1,
                Nombre: tarjeta.querySelector(".nombre").textContent,
                Precio: parseFloat(tarjeta.querySelector(".precio").textContent.slice(1))
            }
            
            const productoExistente = contenedorCarro.find(producto => infoProducto.Nombre===producto.Nombre)

            if(productoExistente){
                productoExistente.Cantidad++
            } else{
                contenedorCarro.push(infoProducto)
            }
            actualizarCarrito()

            console.log(contenedorCarro);
            
        }
        
        
    })
})

const listadoCarrito = document.querySelector(".listado-carrito")

function actualizarCarrito(){

    listadoCarrito.innerHTML=""
    contenedorCarro.forEach((item, index) =>{
        const li = document.createElement("li")
        li.classList.add("info-carrito")
        li.innerHTML = `
            <div class="foto-carrito">
                <img src="${item.Imagen}" alt="">
            </div>
            <div class="titulo-carrito">
                <span class="articulo">${item.Nombre}</span>
                    <div class="precio-cantidad">
                        <span class="precio">$${item.Precio}</span>
                        <input type="number" class="cantidad" min="1" value="${item.Cantidad}">
                    </div>
            </div>
            <div class="quitar-articulo">
                <img src="../../assets/close-circle-fill.png" class="quitar" alt="" data-index="${index}">
            </div>
        
        `
        listadoCarrito.appendChild(li)
    })
    actualizarTotal()
    contadorArticulos()
    cantidadProducto()
    eliminarArticulos()
    guardarCarritoEnLocalStorage();
}
/* Actualizar precio en compra */
function actualizarTotal(){
    const totalCompra = document.querySelector(".total-carrito")
    const total = contenedorCarro.reduce((acc, item) => acc + item.Precio * item.Cantidad, 0)

    totalCompra.innerHTML = `
    <span class="total">Total $</span><span class="precio-total">${total}</span>
    `
}
/* Actualizar numero en el carrito de compra */
function contadorArticulos(){
    const contadorCarrito = document.querySelector(".contador-carrito")
    const contador = contenedorCarro.reduce((acc, item) => acc + item.Cantidad, 0)

    contadorCarrito.innerHTML = ` <span>${contador}</span>
    `
}

function cantidadProducto(){
    const cantidadInput = document.querySelectorAll(".cantidad")
    cantidadInput.forEach((input, index) => {
        input.addEventListener("change", (e)=>{
            if(e.target.classList.contains("cantidad")){
                contenedorCarro[index].Cantidad = parseInt(e.target.value) || 1
                actualizarTotal()
                contadorArticulos()

                guardarCarritoEnLocalStorage();
            }
        })
    })
}

function eliminarArticulos(){
    const botonEliminar = document.querySelectorAll(".quitar")
    botonEliminar.forEach(item => {
        item.addEventListener("click", (e) =>{
            if(e.target.classList.contains("quitar")){
                const index = parseInt(e.target.getAttribute("data-index"))
                contenedorCarro.splice(index,1)
                actualizarCarrito()
                actualizarTotal()
                contadorArticulos()
                cantidadProducto()

                guardarCarritoEnLocalStorage();
            }
        })
    })
}

/* Boton carrito */
const botonCarrito = document.getElementById("boton-carrito");
const contenedorCarrito = document.getElementById("contenedor-carrito");

botonCarrito.addEventListener("click", () => {
    contenedorCarrito.style.display = 
        contenedorCarrito.style.display === "block" ? "none" : "block";
});  

cargarCarritoDesdeLocalStorage();