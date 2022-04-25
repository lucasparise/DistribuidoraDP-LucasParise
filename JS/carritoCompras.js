/*----------- inicio Proceso carrito ------------*/


/* array de productos */

class Producto{
    constructor(id, nombreProducto, descripcionProducto, precio, imagenProducto){
        this.id=id;
        this.nombreProducto=nombreProducto;
        this.descripcionProducto=descripcionProducto;
        this.precio = parseInt(precio);
        this.imagenProducto=imagenProducto;
    }
}

const listaProductos = [];

listaProductos.push(new Producto(0, "Dispenser + Botellón 12Lts.", "El dispenser se entrega sin cargo en el primer pedido o si es necesario realizar un cambio.", 200,"../Img/DispenserBidon12l.png"));

listaProductos.push(new Producto(1, "Dispenser + Botellón 20Lts.", "El dispenser se entrega sin cargo en el primer pedido o si es necesario realizar un cambio.", 300,"../Img/DispenserBidon20l.png"));

listaProductos.push(new Producto(2, "Abono Frio/Calor + Botellón 12Lts.", "Abono mensual por dispenser frio/calor + botellón 12lts.", 200 + 599,"../Img/DispenserFrioCalor12l.png"));

listaProductos.push(new Producto(3, "Abono Frio/Calor + Botellón 20Lts.", "Abono mensual por dispenser frio/calor + botellón 20lts.", 300 + 599,"../Img/DispenserFrioCalor20l.png"));

listaProductos.push(new Producto(4, "Botellón 20Lts.", "Entrega unicamente de botellón.", 200,"../Img/bidon12L.png"));

listaProductos.push(new Producto(5, "Botellón 12Lts.", "Entrega unicamente de botellón.", 300,"../Img/bidon20L.png"));

listaProductos.push(new Producto(6, "Botellón 12Lts. -Sodio", "Botellon de 12Lts bajo en sodio.", 270,"../Img/bidonsodio.png"));

listaProductos.push(new Producto(7, "Sifón 1.5Lts.", "Sifon de soda retornable de 1.5Lts.", 50,"../Img/SifonSoda.png"));

listaProductos.push(new Producto(8, "Sifón 1/2Lts. (solo bares)", "Sifon de soda retornable de 1/2Lts. Entrega unicamente a bares y restoranes.", 50,"../Img/sifonBar.png"));

listaProductos.push(new Producto(9, "Dispenser automático recargable", "Bomba Dispenser de agua para bidones con batería interna Recargable por Usb.", 2000,"../Img/DispenserBomba2.jpg"));

localStorage.setItem('listadoProductos', JSON.stringify(listaProductos));

/* renderizado de productos en HTML */

const DOMitems = document.querySelector('#cuerpoProductos');

function renderizarProductos() {
    listaProductos.forEach((item) => {
        /* estructura */
        const miCard = document.createElement('div');
        miCard.classList.add('card', 'mb-3');
        miCard.setAttribute("data-aos", "flip-left");
        miCard.setAttribute("style", "max-width: 540px;");

        /*tarjeta */
        const mitarjeta = document.createElement('div');
        mitarjeta.classList.add('row', 'g-0');

        /* div IMG */
        const divIMG = document.createElement('div');
        divIMG.classList.add('col-sm-4');

        /* IMG */
        const IMG = document.createElement('img');
        IMG.setAttribute("src", item.imagenProducto);
        IMG.classList.add('img-fluid', 'rounded-start');
        IMG.setAttribute("alt", item.nombreProducto);

        /* divcuerpo */
        const divCuerpo = document.createElement('div');
        divCuerpo.classList.add('col-sm-8');

        /* div Texto */
        const divTexto = document.createElement('div');
        divTexto.classList.add('card-body');
        
        /* titulo Item */
        const tituloItem = document.createElement('h5');
        tituloItem.classList.add('card-title');
        tituloItem.innerText = item.nombreProducto;

        /* texto descripcion */
        const descItem = document.createElement('p');
        descItem.classList.add('card-text');
        descItem.innerText = item.descripcionProducto;

        /* texto precio */
        const precioItem = document.createElement('p');
        precioItem.classList.add('card-text', 'text-muted');
        precioItem.innerText = "$"+item.precio;

        /* Boton para agregar al carrito */

        const botonAgregar = document.createElement('button');
        botonAgregar.classList.add('btn', 'btn-primary');
        botonAgregar.textContent = 'Agregar al carrito';
        botonAgregar.setAttribute('marcador', item.id);
        botonAgregar.addEventListener('click', agregarAlCarrito);
        botonAgregar.addEventListener('click', notificacionAgregarProducto);


        /* dependencia de nodos */
        DOMitems.appendChild(miCard);
        miCard.appendChild(mitarjeta);
        
        mitarjeta.appendChild(divIMG);
        mitarjeta.appendChild(divCuerpo);
        
        divIMG.appendChild(IMG);
        
        divCuerpo.appendChild(divTexto);
        divCuerpo.appendChild(botonAgregar);
        divTexto.appendChild(tituloItem);
        divTexto.appendChild(descItem);
        divTexto.appendChild(precioItem);
    });
}

renderizarProductos();

/* verifico si hay productos en el carrito en memoria */

let carritoEnMemoria = localStorage.getItem('listadoCarrito');
carritoEnMemoria = JSON.parse(carritoEnMemoria);

let carrito = [];

if (carritoEnMemoria.length>0){
    carrito = carritoEnMemoria;
}

function notificacionAgregarProducto(){
    Toastify({
        text: "Agregado al carrito",
        duration: 3000
    }).showToast();

}



/* interaccion con carrito */

function agregarAlCarrito(evento) {
    /* sumar producto a carrito */
    carrito.push(evento.target.getAttribute('marcador'))
    localStorage.setItem('listadoCarrito', JSON.stringify(carrito));
}