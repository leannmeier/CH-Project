// Simulador de tienda iPRO - Trabajo Integrador - Entrega Final
// Autor: Meier Leandro Agustín ©

const DIAS_DESCUENTO = ['martes', 'jueves']
// Productos vacío. Ahora en MockApi
let PRODUCTOS = []
let carrito = cargarCarritoDesdeStorage()
let nombreUsuario = ''

// Referencias a los elementos del DOM
const welcomeMsg = document.getElementById('welcomeMsg')
const discountBanner = document.getElementById('discountBanner')
const cartBtn = document.getElementById('cartBtn')
const cartCount = document.getElementById('cartCount')
const cartModal = document.getElementById('cartModal')
const closeCart = document.getElementById('closeCart')
const cartItems = document.getElementById('cartItems')
const cartTotal = document.getElementById('cartTotal')
const checkoutBtn = document.getElementById('checkoutBtn')

// Configuración de eventos
cartBtn.addEventListener('click', abrirCarrito)
closeCart.addEventListener('click', cerrarCarrito)
cartModal.addEventListener('click', (e) => { if (e.target === cartModal) cerrarCarrito() })
checkoutBtn.addEventListener('click', finalizarCompra)

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add')) {
        const id = parseInt(e.target.dataset.id)
        agregarAlCarrito(id)
    }
})

// Inicio de la aplicación
cargarProductos()

/**
 * Carga los productos desde MockApi
 */
async function cargarProductos() {
    try {
        Swal.fire({
            title: 'Cargando productos...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
        const response = await fetch('https://66551b203c1d3b6029384072.mockapi.io/iPRO/productos')
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }
        PRODUCTOS = await response.json()
        Swal.close()
        if (diaDescuento()) {
            discountBanner.classList.remove('hidden')
        }
        mostrarProductos()
        actualizarContadorCarrito()
        bienvenida()
    } catch (error) {
        console.error('Error cargando productos:', error)
        Swal.fire({
            icon: 'error',
            title: 'Error de conexión',
            text: 'No se pudieron cargar los productos. Por favor, recarga la página.',
            confirmButtonColor: '#0ea5e9',
            confirmButtonText: 'Recargar',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload()
            }
        })
    }
}

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
 * Devuelve un producto por su id o null si no existe
 * @param {number} id
 * @returns {Object|null}
 */
function obtenerProducto(id) {
    return PRODUCTOS.find(p => p.id == id) ?? null
}

/**
 * Muestra el modal de bienvenida usando SweetAlert2
 * Tambien se valida el nombre del usuario
 */
async function bienvenida() {
    const { value: nombre } = await Swal.fire({
        title: '¡Bienvenido a iPRO!',
        text: '¿Cuál es tu nombre?',
        input: 'text',
        inputPlaceholder: 'Tu nombre...',
        inputAttributes: {
            maxlength: 40,
            autocomplete: 'off'
        },
        confirmButtonText: 'Entrar',
        confirmButtonColor: '#0ea5e9',
        allowOutsideClick: false,
        allowEscapeKey: false,
        inputValidator: (value) => {
            if (!value || !value.trim()) {
                return 'Por favor, ingresá tu nombre'
            }
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim())) {
                return 'Solo se permiten letras, sin números ni símbolos'
            }
        }
    })
    if (nombre) {
        nombreUsuario = nombre.trim()
        welcomeMsg.textContent = `¡Hola, ${nombreUsuario}! Bienvenido/a a iPRO 👋`
        welcomeMsg.classList.remove('hidden')
        Toastify({
            text: `✨ ¡Bienvenido/a, ${nombreUsuario}!`,
            duration: 3000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #0ea5e9, #7dd3fc)",
            }
        }).showToast()
    }
}

/**
 * Agrega un producto al carrito por su id. Si ya existe, aumenta la cantidad
 * @param {number} id
 */
function agregarAlCarrito(id) {
    if (!nombreUsuario){
        Swal.fire({
            icon: 'warning',
            title: 'Atención',
            text: 'Por favor, ingresá tu nombre para continuar',
            confirmButtonColor: '#0ea5e9',
            confirmButtonText: 'Ingresar nombre'
        }).then(() => {
            bienvenida()
        })
        return
    }
    const producto = obtenerProducto(id)
    
    if(!producto){
        return
    }
    const itemExistente = carrito.find(item => item.id == id)
    if(itemExistente){
        itemExistente.cantidad++
    }
    else{
        carrito.push({ id: id, cantidad: 1 })
    }
    guardarCarritoEnStorage()
    actualizarContadorCarrito()
    Toastify({
        text: `✅ ${producto.nombre} agregado al carrito`,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: {
            background: "#16a34a",
        }
    }).showToast()
}

/**
 * Elimina un producto del carrito por su id
 * @param {number} id
 */
function eliminarDelCarrito(id) {
    const producto = obtenerProducto(id)
    Swal.fire({
        title: '¿Eliminar producto?',
        text: producto ? producto.nombre : 'Producto',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = carrito.filter(item => item.id !== id)
            guardarCarritoEnStorage()
            actualizarContadorCarrito()
            actualizarCarrito()
            Toastify({
                text: "🗑️ Producto eliminado del carrito",
                duration: 2000,
                gravity: "bottom",
                position: "right",
                style: {
                    background: "#dc2626",
                }
            }).showToast()
        }
    })
}

/**
 * Actualiza el número del badge del carrito
 */
function actualizarContadorCarrito() {
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    cartCount.textContent = total
}
/**
 * Renderiza dinámicamente las cards de productos desde mockapi 
 */
function mostrarProductos() {
    const productsSection = document.getElementById('productsSection')
    const hayDescuento = diaDescuento()

    productsSection.innerHTML = PRODUCTOS.map(producto => {
        const precioFinal = calcularPrecioFinal(producto, hayDescuento)
        const porcentaje = calcularPorcentajeDescuento(producto)
        return `
            <article class="card" data-id="${producto.id}">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                ${hayDescuento ? `<span class="discount-badge">-${porcentaje}%</span>` : ''}
                <p class="price">$${precioFinal.toLocaleString('es-AR')} ARS</p>
                ${hayDescuento ? `<p class="price-original">Precio normal: $${producto.precio.toLocaleString('es-AR')}</p>` : ''}
                <button class="btn-add" data-id="${producto.id}">Agregar al carrito</button>
            </article>
        `
    }).join('')
}

/**
 * Renderiza los items del carrito en el modal
 */
function actualizarCarrito() {
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>'
        cartTotal.textContent = ''
        checkoutBtn.disabled = true
        return
    }
    checkoutBtn.disabled = false
    const hayDescuento = diaDescuento()
    cartItems.innerHTML = carrito.map(item => {
        const producto = obtenerProducto(item.id)
        if (!producto) return ''

        const precioActual = calcularPrecioFinal(producto, hayDescuento)
        const subtotal = precioActual * item.cantidad
        return `
            <div class="cart-item">
                <span>${producto.nombre} x${item.cantidad}</span>
                <span>$${subtotal.toLocaleString('es-AR')}</span>
                <button class="cart-item-remove" data-id="${item.id}">🗑️</button>
            </div>
        `
    }).join('')

    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id)
            eliminarDelCarrito(id)
        })
    })

    const totalGeneral = carrito.reduce((acc, item) => {
        const producto = obtenerProducto(item.id)
        if (!producto) return acc
        const precioActual = calcularPrecioFinal(producto, hayDescuento)
        return acc + (precioActual * item.cantidad)
    }, 0)

    cartTotal.textContent = `Total: $${totalGeneral.toLocaleString('es-AR')} ARS`
}

/**
 * Abre el modal del carrito
 */
function abrirCarrito() {
    actualizarCarrito()
    cartModal.classList.remove('hidden')
}

/**
 * Cierra el modal del carrito
 */
function cerrarCarrito() {
    cartModal.classList.add('hidden')
}

/**
 * Simula el procesamiento de un pago
 * Retorna una promesa que se resuelve o rechaza aleatoriamente
 * @returns {Promise}
 * (no se me ocurrio otra forma)
 */
function procesarPago() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const exito = Math.random() > 0.2
            exito ? resolve() : reject(new Error('Error en el procesamiento del pago'))
        }, 2000)
    })
}

/**
 * Finaliza la compra usando promesas con then/catch/finally
 * Usa SweetAlert2 para confirmación y feedback
 */
function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacio',
            text: 'Agrega productos para continuar',
            confirmButtonColor: '#0ea5e9'
        })
        return
    }
    const hayDescuento = diaDescuento()
    const total = carrito.reduce((acc, item) => {
        const producto = obtenerProducto(item.id)
        if (!producto) return acc
        const precioActual = calcularPrecioFinal(producto, hayDescuento)
        return acc + (precioActual * item.cantidad)
    }, 0)
    Swal.fire({
        title: '¿Confirmar compra?',
        html: `
            <p style="font-size: 1.1em; margin: 10px 0;">
                <strong>Total:</strong> $${total.toLocaleString('es-AR')} ARS
            </p>
            <p style="font-size: 0.9em; color: #64748b;">
                Se procesará el pago de forma segura
            </p>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#16a34a',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Procesando pago...',
                html: 'Por favor espera un momento',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            procesarPago()
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: '¡La compra ha sido exitosa!',
                        html: `
                            <p>Gracias por tu compra, <strong>${nombreUsuario}</strong></p>
                            <p style="font-size: 1.1em; color: #16a34a; margin: 10px 0;">
                                Total: <strong>$${total.toLocaleString('es-AR')} ARS</strong>
                            </p>
                            <p style="font-size: 0.9em; color: #64748b;">
                                Recibirás un email con los detalles de tu compra
                            </p>
                        `,
                        confirmButtonColor: '#16a34a',
                        confirmButtonText: '¡Genial!'
                    })
                    carrito = []
                    guardarCarritoEnStorage()
                })
                .catch((error) => {
                    console.error('Error en el pago:', error)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en el pago',
                        text: 'Hubo un error en el procesamiento de tu compra. Intentalo nuevamente',
                        confirmButtonColor: '#dc2626',
                        confirmButtonText: 'Entendido'
                    })
                })
                .finally(() => {
                    cerrarCarrito()
                    actualizarContadorCarrito()
                })
        }
    })
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