// Simulador de tienda iPRO - Trabajo Integrador -  Pre-Entrega 1
// Autor: Meier Leandro Agustín ©

console.log('Sincronización exitosa')

const DIAS_DESCUENTO = ['martes','jueves'] // Dias que serán los de descuento
const PRODUCTOS = [
    {nombre: 'MacBook 14 Pro Ultimate', precio: 7000000, descuento: 0.90},
    {nombre: 'iPhone 17 PRO MAX', precio: 3000000, descuento: 0.92},
    {nombre: 'iPhone Air', precio: 2500000, descuento: 0.88},
    {nombre: 'AirPods Pro', precio: 250000, descuento: 0.85}
] // Los productos disponibles

const nombre = prompt('¡Bienvenido a iPRO! ¿Cuál es tu nombre?')

saludar(nombre)

if(diaDescuento() && nombre !== null){
    alert('¡APROVECHA QUE HOY ES DÍA DE DESCUENTOS!🎉🥳🎊');
} else if(nombre === null) {
    alert('No hay descuentos para vos, bigote')
} else{
    alert('Hoy no es dia de descuentos')
}

if(nombre !== null){
    let seguirComprando = true
    while(seguirComprando){
        const productoElegido = prompt('¿Qué producto te interesa?\n1. MacBook\n2. iPhone 17 Pro Max\n3. iPhone Air\n4. AirPods Pro');
        const producto = obtenerProducto(parseInt(productoElegido)) 
        if(producto !== null){
            const precioFinal = calcularPrecioFinal(producto,diaDescuento())
            alert(`${producto.nombre}\nPrecio sin descuento: ${producto.precio}\nPrecio final: $${precioFinal.toLocaleString()}`);
        } else{
            alert('Producto inexistente');
        }
        const continuar = confirm('¿Queres ver otro producto?')
        if(!continuar){
            seguirComprando = !seguirComprando
            alert('Gracias por venir a iPRO!!!')
        }
    }
}

function saludar(nombre){ //Método de bienvenida
    if(nombre !== null){
    alert(`Hola ${nombre}! Un gusto que estes acá\nDisfruta de los productos y compra algo!`)
    }
    else{
        alert('Oh sos re ortiva chabón...')
    }
}

function diaDescuento() { // Método que determina si el dia de hoy es es dis de descuento
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

function obtenerProducto(index){ // Método que devuelve el producto seleccionado. Si no lo encuentra, devuelve null
    const productoEncontrado = PRODUCTOS.at(index -1)
    return productoEncontrado !== undefined ? productoEncontrado : null
}

function calcularPrecioFinal(producto,estado){ // Método que devuelve el valor final del producto con el descuento incluido
    let precioFinal = producto.precio
    if(estado){
        precioFinal = precioFinal * producto.descuento
    }
    return precioFinal
}