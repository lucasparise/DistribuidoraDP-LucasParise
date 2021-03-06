/* tomo los datos de memoria, listado de productos y los agregados */
let listaProductos = localStorage.getItem('listadoProductos');
listaProductos = JSON.parse(listaProductos);

let listacarrito = localStorage.getItem('listadoCarrito');
listacarrito = JSON.parse(listacarrito);

const DOMcarrito = document.querySelector('#carritoCompra');
const DOMcontador = document.querySelector('#contador');
const DOMtotal = document.querySelector('#precioTotal');

const DOMbotonVaciar = document.querySelector('#botonVaciar');
DOMbotonVaciar.addEventListener('click', popUpconfirmarVaciar);

const DOMbotonFinalizarCompra = document.querySelector('#finalizarCompra');


/* Envio y validacion de formulario */

$('#formularioEntrega').on('submit', function(event){
    event.preventDefault();
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
        form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
        else{
            popUpFinalizarCompra();
        }
        form.classList.add('was-validated')
        }, false)
    })
});

let contador;
let precioProductosTotal;


/* renderizado de los productos en el carrito */

function renderizarCarrito() {
    DOMcarrito.textContent = '';

    /* eliminar duplicados de carrito */
    const carritoSinDuplicados = [...new Set(listacarrito)];
    carritoSinDuplicados.forEach((item) => {
        let itemCarrito = listaProductos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        
        const numeroUnidadesItem = listacarrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);

        /* nodos del carrito */
        const nodoItemCarrito = document.createElement('li');
        nodoItemCarrito.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');

        const divTexto = document.createElement('div');
        divTexto.classList.add('flex-grow-1');

        const tituloItem = document.createElement('h6');
        tituloItem.classList.add('my-0');
        tituloItem.textContent = `${numeroUnidadesItem} x ${itemCarrito[0].nombreProducto}`;

        const descItem = document.createElement('small');
        descItem.classList.add('text-muted');
        descItem.textContent = itemCarrito[0].descripcionProducto;

        let precioSubtotal = parseInt(numeroUnidadesItem) * parseInt(itemCarrito[0].precio);

        const precioItem = document.createElement('span');
        precioItem.classList.add('text-muted');
        precioItem.textContent = "$" + precioSubtotal;

        /* Boton de borrar */
        const botonBorrarProducto = document.createElement('button');
        botonBorrarProducto.classList.add('btn', 'btn-danger', 'me-4');
        botonBorrarProducto.textContent = 'X';
        botonBorrarProducto.style.height = '2.5rem';
        botonBorrarProducto.dataset.item = item;

        botonBorrarProducto.addEventListener('click', borrarItemCarrito);

            /* dependencia de nodos */

        DOMcarrito.appendChild(nodoItemCarrito);
        nodoItemCarrito.appendChild(botonBorrarProducto);
        nodoItemCarrito.appendChild(divTexto);
        divTexto.appendChild(tituloItem);
        divTexto.appendChild(descItem);
        nodoItemCarrito.appendChild(precioItem);
        
        });
            /* calculo precio total y el contador */
            DOMcontador.textContent = carritoSinDuplicados.length;
            DOMtotal.textContent = "$" + calcularTotal();
            contador = carritoSinDuplicados.length;
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

/* funciones confirmar y vaciar carrito */

function popUpconfirmarVaciar(){
    if (listacarrito.length === 0){
        popUpCarritoVacio();
    }
    else{
        Swal.fire({
            icon: 'warning',
            iconColor: '#bf0202',
            title: 'Desea vaciar el carrito?',
            confirmButtonColor: '#bf0202',
            showCancelButton: true,
            confirmButtonText: 'Si, vaciar',
            cancelButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                vaciarCarrito();
            }
        })
    }
}


function vaciarCarrito() {
    listacarrito = [];
    renderizarCarrito();
    localStorage.setItem('listadoCarrito', JSON.stringify(listacarrito));
}


/* funcion calcular total */
function calcularTotal() {
    
    return listacarrito.reduce((total, item) => {
        const itemCarrito = listaProductos.filter((itemProductos) => {
            return itemProductos.id === parseInt(item);
        });
        return total + itemCarrito[0].precio;
    }, 0);
}

/* pop up error carrito vacio */

function popUpCarritoVacio(){
    Swal.fire({
        icon: 'error',
        iconColor: '#bf0202',
        title: 'Su carrito esta vacio',
        showConfirmButton: false,
        timer: 1500
    })
}

/* popUp error al procesar pedido */

function popUpErrorAlProcesar(){
    Swal.fire({
        icon: 'error',
        iconColor: '#bf0202',
        title: 'Error al procesar pedido, intente m??s tarde',
        showConfirmButton: false,
        timer: 1500
    })
}



/* --proceso finalizar compra-- */


/* popUp compra finalizada */

function popUpFinalizarCompra(){
    if (listacarrito.length === 0){
        popUpCarritoVacio();
    }
    else{
        Swal.fire({
            icon: 'warning',
            iconColor: '#1ea300',
            title: 'Desea finalizar su compra?',
            confirmButtonColor: '#1ea300',
            showCancelButton: true,
            confirmButtonText: 'Si, finalizar',
            cancelButtonText: `Seguir comprando`,
        }).then((result) => {
            if (result.isConfirmed) {
                enviarFormularioEntrega();
                vaciarCarrito();
            }
        })
    }
}

function popUpCompraFinalizada(){
    Swal.fire({
        icon: 'success',
        iconColor: '#1ea300',
        title: 'Su compra ha sido procesada',
        showConfirmButton: false,
        timer: 1500
    })
}


/* envio al mail de datos y carrito */


function enviarFormularioEntrega() {
    var formData = new FormData(formularioEntrega);
    formData.append('service_id', 'service_ywj7tn9');
    formData.append('template_id', 'template_rsbi9qs');
    formData.append('user_id', 'xgFdWOHtWslrzDiK7');
    formData.append('precioTotal', calcularTotal());
    formData.append('cantItems', contador);

    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false 
    }).done(function() {
        popUpCompraFinalizada();
    }).fail(function(error) {
        popUpErrorAlProcesar();
    });
}


renderizarCarrito();
