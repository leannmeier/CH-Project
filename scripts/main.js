// Simulador de tienda iPRO - Trabajo Integrador - Entrega 2
// Autor: Meier Leandro Agustín ©

const DIAS_DESCUENTO = ['martes','jueves']
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
] 

let carrito = cargarCarritoDesdeStorage()
let nombreUsuario = ''

const welcomeModal  = document.getElementById('welcomeModal')
const nameInput     = document.getElementById('nameInput')
const nameError     = document.getElementById('nameError')
const nameSubmit    = document.getElementById('nameSubmit')
const welcomeMsg    = document.getElementById('welcomeMsg')
const discountBanner = document.getElementById('discountBanner')
const cartBtn       = document.getElementById('cartBtn')
const cartCount     = document.getElementById('cartCount')
const cartModal     = document.getElementById('cartModal')
const closeCart     = document.getElementById('closeCart')
const cartItems     = document.getElementById('cartItems')
const cartTotal     = document.getElementById('cartTotal')
const checkoutBtn   = document.getElementById('checkoutBtn')
const toast         = document.getElementById('toast')

mostrarPrecios()
actualizarContadorCarrito()

nameSubmit.addEventListener('click', manejarNombre)
nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') manejarNombre() })

cartBtn.addEventListener('click', abrirCarrito)
closeCart.addEventListener('click', cerrarCarrito)
cartModal.addEventListener('click', (e) => { if (e.target === cartModal) cerrarCarrito() })

document.getElementById('productsSection').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add')) {
        const id = parseInt(e.target.dataset.id)
        agregarAlCarrito(id)
    }
})

checkoutBtn.addEventListener('click', finalizarCompra)

/**
 * Determina si el día de hoy es día de descuento
 * @returns {boolean}
 */
function diaDescuento() {
    const hoy = new Date()
    const nombreDia = hoy.toLocaleDateString('es-ES', { weekday: 'long' })
    return DIAS_DESCUENTO.includes(nombreDia)
}
/**
 * Calcula el precio final de un producto según si hay descuento activo
 * @param {Object} producto
 * @param {boolean} hayDescuento
 * @returns {number}
 */
function calcularPrecioFinal(producto, hayDescuento) {
    return hayDescuento ? producto.precio * producto.descuento : producto.precio
}
/**
 * Devuelve el porcentaje de descuento de un producto
 * @param {Object} producto
 * @returns {number}
 */
function calcularPorcentajeDescuento(producto) {
    return Math.round((1 - producto.descuento) * 100)
}
/**
 * Valida que el nombre ingresado solo contenga letras
 * @param {string} valor
 * @returns {boolean}
 */
function esNombreValido(valor) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor.trim()) && valor.trim().length > 0
}
/**
 * Devuelve un producto por su id o null si no existe
 * @param {number} id
 * @returns {Object|null}
 */
function obtenerProducto(id) {
    return PRODUCTOS.find(p => p.id === id) ?? null
}
function mostrarPrecios() {
    const hayDescuento = diaDescuento()

    if (hayDescuento) discountBanner.classList.remove('hidden')

    PRODUCTOS.forEach(producto => {
        const precioFinal = calcularPrecioFinal(producto, hayDescuento)
        const elPrecio = document.getElementById(`price-${producto.id}`)
        const elOriginal = document.getElementById(`original-${producto.id}`)
        const card = document.querySelector(`.card[data-id="${producto.id}"]`)

        elPrecio.textContent = `$${precioFinal.toLocaleString('es-AR')} ARS`

        if (hayDescuento) {
            elOriginal.textContent = `Precio normal: $${producto.precio.toLocaleString('es-AR')}`
            elOriginal.classList.remove('hidden')

            // Agregar badge de descuento si no existe
            if (!card.querySelector('.discount-badge')) {
                const badge = document.createElement('span')
                badge.classList.add('discount-badge')
                badge.textContent = `-${calcularPorcentajeDescuento(producto)}%`
                card.querySelector('h2').insertAdjacentElement('afterend', badge)
            }
        }
    })
}
function manejarNombre() {
    const valor = nameInput.value

    if (!esNombreValido(valor)) {
        nameError.textContent = 'Solo se permiten letras, sin números ni símbolos.'
        nameInput.focus()
        return
    }

    nombreUsuario = valor.trim()
    welcomeModal.classList.add('hidden')

    welcomeMsg.textContent = `¡Hola, ${nombreUsuario}! Bienvenido/a a iPRO 👋`
    welcomeMsg.classList.remove('hidden')

    mostrarToast(`¡Bienvenido/a, ${nombreUsuario}!`)
}
/**
 * Agrega un producto al carrito. Si ya existe, aumenta la cantidad
 * @param {number} id - ID del producto a agregar
 */
function agregarAlCarrito(id) {
    if (!nombreUsuario) {
        mostrarToast('⚠️ Ingresá tu nombre para comprar')
        return
    }

    const producto = obtenerProducto(id)
    if (!producto) return

    const itemExistente = carrito.find(item => item.id === id)

    if (itemExistente) {
        itemExistente.cantidad++
    } else {
        const precioFinal = calcularPrecioFinal(producto, diaDescuento())
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: precioFinal, cantidad: 1 })
    }

    guardarCarritoEnStorage()
    actualizarContadorCarrito()
    mostrarToast(`✅ ${producto.nombre} agregado al carrito`)
}
/**
 * Elimina un producto del carrito por su id
 * @param {number} id
 */
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id)
    guardarCarritoEnStorage()
    actualizarContadorCarrito()
    renderizarCarrito()
}
/**
 * Actualiza el número del badge del carrito
 */
function actualizarContadorCarrito() {
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    cartCount.textContent = total
}
/**
 * Renderiza los items del carrito en el modal
 */
function renderizarCarrito() {
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>'
        cartTotal.textContent = ''
        return
    }

    cartItems.innerHTML = carrito.map(item => `
        <div class="cart-item">
            <span>${item.nombre} x${item.cantidad}</span>
            <span>$${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
            <button class="cart-item-remove" onclick="eliminarDelCarrito(${item.id})">🗑️</button>
        </div>
    `).join('')

    const totalGeneral = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    cartTotal.textContent = `Total: $${totalGeneral.toLocaleString('es-AR')} ARS`
}
/**
 * Abre el modal del carrito
 */
function abrirCarrito() {
    renderizarCarrito()
    cartModal.classList.remove('hidden')
}
/**
 * Cierra el modal del carrito
 */
function cerrarCarrito() {
    cartModal.classList.add('hidden')
}
/**
 * Finaliza la compra, limpia el carrito y muestra confirmación
 */
function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarToast('⚠️ Tu carrito está vacío')
        return
    }
    carrito = []
    guardarCarritoEnStorage()
    actualizarContadorCarrito()
    cerrarCarrito()
    mostrarToast(`🎉 ¡Gracias por tu compra, ${nombreUsuario}!`)
}
/**
 * Guarda el carrito en localStorage
 */
function guardarCarritoEnStorage() {
    localStorage.setItem('carritoIPRO', JSON.stringify(carrito))
}
/**
 * Carga el carrito desde localStorage
 * @returns {Array}
 */
function cargarCarritoDesdeStorage() {
    const data = localStorage.getItem('carritoIPRO')
    return data ? JSON.parse(data) : []
}
let toastTimeout
/**
 * Muestra una notificación temporal en pantalla
 * @param {string} mensaje
 * @param {number} duracion - en milisegundos (default: 2500)
 */
function mostrarToast(mensaje, duracion = 2500) {
    clearTimeout(toastTimeout)
    toast.textContent = mensaje
    toast.classList.remove('hidden')
    toastTimeout = setTimeout(() => toast.classList.add('hidden'), duracion)
}
