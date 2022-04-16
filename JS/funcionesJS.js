/* Apartado de funciones */

function calcularLitros(mayores, menores)
    {
        return((mayores*litrosMayores*7) + (menores*litrosMenores*7));
    }

function calcularBidones20L(litros)
    {
        return(Math.round(litros/20));
    }

function calcularBidones12L(litros)
    {
        return(Math.round(litros/12));
    }

function calcularPrecio20L(bidones)
    {
        return(bidones*Precio20L);
    }

    function calcularPrecio12L(bidones)
    {
        return(bidones*Precio12L);
    }

/* variables globales */
const litrosMayores = 1.5;
const litrosMenores = 1;
const Precio12L = 200;
const Precio20L = 300;
let bidones20LTotales;
let precio20LTotal;
let bidones12LTotales;
let precio12LTotal;

/* array de productos */

const listaproductos =[
    {id:0, nombreProducto:"Bidon 12Lts", precio: 200},
    {id:1, nombreProducto:"Bidon 20Lts", precio: 300},
    {id:2, nombreProducto:"Bidon 12Lts Bajo Sodio", precio: 270},
    {id:3, nombreProducto:"Sifon 1.5Lts", precio: 50},
    {id:4, nombreProducto:"Sifon 1/2Lts", precio: 50},
];



                /* Funciones principales */

/*calculador de consumo semanal */

function calculadorDeconsumo(cantPersonasMayores, cantPersonasMenores){

    /* hago el proceso para bidones de 20L */

    bidones20LTotales = calcularBidones20L(calcularLitros(cantPersonasMayores, cantPersonasMenores));
    precio20LTotal = calcularPrecio20L(bidones20LTotales);

    /* hago el proceso para bidones de 12L */

    bidones12LTotales = calcularBidones12L(calcularLitros(cantPersonasMayores, cantPersonasMenores));
    precio12LTotal = calcularPrecio12L(bidones12LTotales);
    }



    /* --Simulador carrito de compras-- */


    function carritoDeComras(){

    let productosElegidos =[];

    /* proceso agregar productos al carrito eligiendo la cantidad */

    alert("A continuación ingrese el numero de la siguiente lista para sumar los productos a su carrito");

    let productoElegido = parseInt(prompt("0 -Bidon 12Lts \n1 -Bidon 20Lts \n2 -Bidon 12Lts Bajo Sodio \n3 -Sifon 1.5Lts \n4 -Sifon 1/2Lts \n99 para terminar"));

    
    while (productoElegido !="99"){
        
        let cantidadElegida = parseInt(prompt("ingrese cantidad a agregar"));

        for(let i=0; i<cantidadElegida; i++){

            productosElegidos.push(listaproductos[productoElegido]);
        }

        productoElegido = parseInt(prompt("0 -Bidon 12Lts \n1 -Bidon 20Lts \n2 -Bidon 12Lts Bajo Sodio \n3 -Sifon 1.5Lts \n4 -Sifon 1/2Lts \n99 para terminar"));
    
    }

    alert(`Tu carrito tiene ${productosElegidos.length} productos`);


    alert("A continuación ingrese la opcion que corresponda");


    opcion = prompt("ingrese 1 para borrar productos ,\nIngrese 2 para finalizar compra");

    /* Proceso para borrar productos del carrito */

    if(opcion==1){

        alert("A continuación ingrese el numero de la siguiente lista para borrar los productos de su carrito");

        productoElegido = parseInt(prompt("0 -Bidon 12Lts \n1 -Bidon 20Lts \n2 -Bidon 12Lts Bajo Sodio \n3 -Sifon 1.5Lts \n4 -Sifon 1/2Lts \n99 para terminar"));

        while (productoElegido !="99"){

            productosElegidos = productosElegidos.filter((el) => el.id != productoElegido);
            
            alert(`Tu carrito tiene ${productosElegidos.length} productos`);

            productoElegido = parseInt(prompt("0 -Bidon 12Lts \n1 -Bidon 20Lts \n2 -Bidon 12Lts Bajo Sodio \n3 -Sifon 1.5Lts \n4 -Sifon 1/2Lts \n99 para terminar"));
        }
    }

        /* proceso para mostrar cant de productos y valor total */
        else {

            let valorCompra = 0
            productosElegidos.forEach((prod) => {
                valorCompra = valorCompra + prod.precio;
            })

            alert(`Tu carrito tiene ${productosElegidos.length} productos por un valor de ${valorCompra}`);

        }
}


/* ---interaccion con HTML--- */

/* Proceso consumo */
let botonConsumo = document.getElementById("enviarPersonas");
let overlay = document.getElementById('overlay');
let popup = document.getElementById('popup');
let btnCerrarPopup = document.getElementById('btn-cerrar-popup');
let texto20litros = document.getElementById('infoBidones20L');
let texto12litros = document.getElementById('infoBidones12L');


botonConsumo.onclick = () => {
    
    let inputMayores = document.getElementById("personasMayores").value;
    let inputMenores = document.getElementById("personasMenores").value;
    calculadorDeconsumo(inputMayores, inputMenores);
    texto20litros.innerText = "Necesitaria " + bidones20LTotales + " bidones de 20Lts semanales, con un costo de $" + precio20LTotal;
    texto12litros.innerText = "O necesitaria " + bidones12LTotales + " bidones de 12Lts semanales, con un costo de $" + precio12LTotal;
    overlay.classList.add('active');
	popup.classList.add('active');
}

btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
});



/* Proceso carrito */
let botonCarrito = document.getElementById("carritodeCompras");

botonCarrito.onclick = () => {
    
    carritoDeComras();
}