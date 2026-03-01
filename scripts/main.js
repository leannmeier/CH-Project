// Simulador de tienda iPRO - Trabajo Integrador - Entrega 2
// Autor: Meier Leandro Agustín ©

const DIAS_DESCUENTO = ['martes','jueves'] // Dias que serán los de descuento
const PRODUCTOS = [
    {
        id: 1,
        nombre: 'MacBook 14 Pro Ultimate', 
        precio: 7000000, 
        descuento: 0.90
    },
    {
        id: 2,
        nombre: 'iPhone 17 PRO MAX', 
        precio: 3000000, 
        descuento: 0.92
    },
    {
        id: 3,
        nombre: 'iPhone Air', 
        precio: 2500000, 
        descuento: 0.88
    },
    {
        id: 4,
        nombre: 'AirPods Pro',
        precio: 250000, 
        descuento: 0.85
    },
] // Los productos disponibles

const nombre = validarNombre()

if(nombre){
    alert(`Hola ${nombre}! Un gusto que estes acá\nDisfruta de los productos y compra algo!`)
    ofrecerProductos()
}
else{
    alert('Hubo un error en sus datos. No podrá comprar pero si mirar los precios! ')
}


function validarNombre(){ // Metodo para validar el nombre de entrada utilizando regex
    let nombre
    do{
        nombre = prompt('¡Bienvenido a iPRO! ¿Cuál es tu nombre?');
        if (nombre === null) break; // Si el usuario cancela
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.trim())) {
            alert('Por favor ingresá solo letras, sin números ni símbolos.');
        }
    }while (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.trim()));
    return nombre
}

function ofrecerProductos(){
    let salir = false
    while(!salir){
        const productoElegido = prompt('¿Qué producto te interesa?\n1. MacBook\n2. iPhone 17 Pro Max\n3. iPhone Air\n4. AirPods Pro\n0. Salir');
        console.log(productoElegido)
        if(productoElegido < PRODUCTOS.length + 1 && productoElegido > 0){
            const producto = PRODUCTOS.find(obj => obj.id === parseInt(productoElegido)) 
            console.log(producto)
            const precioFinal = calcularPrecioFinal(producto,diaDescuento())
            alert(`${producto.nombre}\nPrecio sin descuento: ${producto.precio}\nPrecio final: $${precioFinal.toLocaleString()}`);
        }
        else if(parseInt(productoElegido) === 0){
            alert('Usted esta por salir');
        }
        else if(productoElegido === null){
            alert('No ha seleccionado nada');
        }
        else{
            alert('Producto inexistente');
        }
        const continuar = confirm('¿Desea continuar?')
        if(!continuar){
            seguirComprando = !seguirComprando
            alert('Gracias por venir a iPRO!!!')
        }
    }
}

function diaDescuento() { // Método que determina si el dia de hoy es día de descuento
    let descuento = false
    let i = 0
    const hoy = new Date()

    const nombreDia = hoy.toLocaleDateString('es-ES', {weekday: 'long'})
    while( i < DIAS_DESCUENTO.length && !descuento){
        if(DIAS_DESCUENTO[i] === nombreDia){
            descuento = true
        }
        i++
    }
    return descuento
}

function calcularPrecioFinal(producto,estado){ // Método que devuelve el valor final del producto con el descuento incluido
    let precioFinal = producto.precio
    if(estado){
        precioFinal = precioFinal * producto.descuento
    }
    return precioFinal
}