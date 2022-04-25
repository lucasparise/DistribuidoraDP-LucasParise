
/*---------calculador de consumo semanal --------*/

/* variables globales calculador de consumo */
const litrosMayores = 1.5;
const litrosMenores = 1;
const Precio12L = 200;
const Precio20L = 300;
let bidones20LTotales;
let precio20LTotal;
let bidones12LTotales;
let precio12LTotal;


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


function calculadorDeconsumo(cantPersonasMayores, cantPersonasMenores){

    /* hago el proceso para bidones de 20L */

    bidones20LTotales = calcularBidones20L(calcularLitros(cantPersonasMayores, cantPersonasMenores));
    precio20LTotal = calcularPrecio20L(bidones20LTotales);

    /* hago el proceso para bidones de 12L */

    bidones12LTotales = calcularBidones12L(calcularLitros(cantPersonasMayores, cantPersonasMenores));
    precio12LTotal = calcularPrecio12L(bidones12LTotales);
    }


/* ---interaccion con HTML--- */

let botonConsumo = document.getElementById("enviarPersonas");
botonConsumo.addEventListener('click', popUpInfoConsumo);

function popUpInfoConsumo() {
    let inputMayores = document.getElementById("personasMayores").value;
    let inputMenores = document.getElementById("personasMenores").value;
    calculadorDeconsumo(inputMayores, inputMenores);
    Swal.fire({
        icon: 'info',
        text: "Necesitaria " + bidones20LTotales + " bidones de 20Lts semanales, con un costo de $" + precio20LTotal + " , o necesitaria " + bidones12LTotales + " bidones de 12Lts semanales, con un costo de $" + precio12LTotal,
        
    })
}

/* ----------Fin proceso calcular consumo------- */