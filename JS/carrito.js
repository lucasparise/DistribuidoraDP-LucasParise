/* tomo los datos de memoria, listado de productos y los agregados */
let listaProductos = localStorage.getItem('listadoProductos');
listaProductos = JSON.parse(listaProductos);

let listacarrito = localStorage.getItem('listadoCarrito');
listacarrito = JSON.parse(listacarrito);

const DOMcarrito = document.querySelector('#carritoCompra');
const DOMcontador = document.querySelector('#contador');
const DOMtotal = document.querySelector('#precioTotal');
const DOMbotonVaciar = document.querySelector('#botonVaciar');
DOMbotonVaciar.addEventListener('click', vaciarCarrito);
let contador;

/* renderizado de los productos en el carrito */

function renderizarCarrito() {
    DOMcarrito.textContent = '';

    /* eliminar duplicados de carrito */
    const carritoSinDuplicados = [...new Set(listacarrito)];
    carritoSinDuplicados.forEach((item) => {
        let miItem = listaProductos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        
        const numeroUnidadesItem = listacarrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);

        /* nodos del carrito */
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');

        const divTexto = document.createElement('div');
        divTexto.classList.add('flex-grow-1');

        const tituloItem = document.createElement('h6');
        tituloItem.classList.add('my-0');
        tituloItem.textContent = `${numeroUnidadesItem} x ${miItem[0].nombreProducto}`;

        const descItem = document.createElement('small');
        descItem.classList.add('text-muted');
        descItem.textContent = miItem[0].descripcionProducto;

        let precioSubtotal = parseInt(numeroUnidadesItem) * parseInt(miItem[0].precio);

        const precioItem = document.createElement('span');
        precioItem.classList.add('text-muted');
        precioItem.textContent = "$" + precioSubtotal;

        /* Boton de borrar */
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'me-4');
        miBoton.textContent = 'X';
        miBoton.style.height = '2.5rem';
        miBoton.dataset.item = item;

        miBoton.addEventListener('click', borrarItemCarrito);

            /* dependencia de nodos */

        DOMcarrito.appendChild(miNodo);
        miNodo.appendChild(miBoton);
        miNodo.appendChild(divTexto);
        divTexto.appendChild(tituloItem);
        divTexto.appendChild(descItem);
        miNodo.appendChild(precioItem);
        
        });
            /* calculo precio total y el contador */
            DOMcontador.textContent = carritoSinDuplicados.length;
            DOMtotal.textContent = "$" + calcularTotal();
}

/* funcion boton de borrar producto */

function borrarItemCarrito(evento) {

    const id = evento.target.dataset.item;
    listacarrito = listacarrito.filter((carritoId) => {
        return carritoId !== id;
    });
    localStorage.setItem('listadoCarrito', JSON.stringify(listacarrito));
    renderizarCarrito();
}

/* funcion vaciar carrito */
function vaciarCarrito() {
    listacarrito = [];
    renderizarCarrito();
    localStorage.setItem('listadoCarrito', JSON.stringify(listacarrito));
}

/* funcion calcular total */
function calcularTotal() {
    
    return listacarrito.reduce((total, item) => {
        const miItem = listaProductos.filter((itemProductos) => {
            return itemProductos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0);
}


renderizarCarrito();
