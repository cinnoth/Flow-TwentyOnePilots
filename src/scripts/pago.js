/* Cargar carrito desde localStorage */
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

/* Guardar carrito en localStorage */
function guardarCarritoEnLocalStorage(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* Mostrar productos en la tabla */
function mostrarCarritoEnTabla() {
    const contenedorCarro = cargarCarritoDesdeLocalStorage();
    const tablaBody = document.getElementById("tabla-carrito-body");
    const totalCarrito = document.querySelector(".total-carro");

    tablaBody.innerHTML = "";
    let total = 0;

    contenedorCarro.forEach((producto, index) => {
        const subtotal = producto.Cantidad * producto.Precio;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${producto.Imagen}" alt="${producto.Nombre}" width="50"></td>
            <td>${producto.Nombre}</td>
            <td>$${producto.Precio.toFixed(2)}</td>
            <td>
                <input type="number" class="cantidad-input" min="1" value="${producto.Cantidad}" data-index="${index}">
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });

    // Mostrar el total actualizado
    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;

    // Agregar eventos para modificar cantidad
    const inputsCantidad = document.querySelectorAll(".cantidad-input");
    inputsCantidad.forEach((input) => {
        input.addEventListener("change", (e) => {
            const index = parseInt(e.target.dataset.index);
            const nuevaCantidad = parseInt(e.target.value) || 1;

            contenedorCarro[index].Cantidad = nuevaCantidad;
            guardarCarritoEnLocalStorage(contenedorCarro);
            mostrarCarritoEnTabla();
          
        });
    });

    // Agregar eventos para eliminar productos
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");
    botonesEliminar.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const index = parseInt(e.target.dataset.index);

            contenedorCarro.splice(index, 1);
            guardarCarritoEnLocalStorage(contenedorCarro);
            mostrarCarritoEnTabla();
           
        });
    });
}

/* Mostrar carrito al cargar la página */
document.addEventListener("DOMContentLoaded", mostrarCarritoEnTabla);
