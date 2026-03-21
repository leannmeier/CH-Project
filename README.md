# iPRO - Simulador de Tienda Online

Proyecto integrador de JavaScript que simula una experiencia de compra interactiva con sistema de descuentos por día, integración DOM y persistencia con localStorage.

---

## 📋 Descripción

iPRO es una tienda virtual de productos Apple que ofrece descuentos especiales según el día de la semana. El usuario puede ingresar su nombre, navegar por el catálogo, agregar productos a un carrito de compras y finalizar su compra, todo desde la interfaz web sin interrupciones de consola.

---

## ✨ Características

- Sistema de descuentos por día de la semana (martes y jueves)
- Catálogo de 4 productos Apple premium con precios renderizados dinámicamente
- Descuentos variables por producto (entre 8% y 15%)
- Modal de bienvenida con validación de nombre (sin `prompt()`)
- Carrito de compras con persistencia en `localStorage`
- Notificaciones tipo toast en lugar de `alert()`
- Banner de descuento activo según el día
- Interacción completamente manejada mediante eventos del DOM

---

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript Vanilla (ES6+)
- localStorage API

---

## 📦 Productos Disponibles

| # | Producto | Precio | Descuento |
|---|----------|--------|-----------|
| 1 | MacBook 14 Pro Ultimate | $7.000.000 | 10% |
| 2 | iPhone 17 PRO MAX | $3.000.000 | 8% |
| 3 | iPhone Air | $2.500.000 | 12% |
| 4 | AirPods Pro | $250.000 | 15% |

---

## 🚀 Cómo Usar

1. Abrí el archivo `index.html` en tu navegador
2. Ingresá tu nombre en el modal de bienvenida (solo letras)
3. El sistema mostrará automáticamente si hay descuentos activos hoy
4. Hacé click en **"Agregar al carrito"** en los productos que te interesen
5. Abrí el carrito con el botón 🛒 para revisar tu selección
6. Finalizá la compra desde el modal del carrito

---

## 📂 Estructura del Proyecto

```
CH-Project/
│
├── index.html              # Estructura principal y componentes del DOM
├── styles/
│   └── style.css           # Estilos, animaciones y diseño responsive
├── scripts/
│   └── main.js             # Lógica del simulador, eventos y storage
├── images/                 # Imágenes de productos
└── README.md               # Este archivo
```

---

## 💻 Funcionalidades Implementadas

### Lógica JS
- **Condicionales:** Validación de nombre, verificación de día de descuento, control de carrito vacío
- **Arrays y objetos:** `PRODUCTOS` con propiedades y `DIAS_DESCUENTO`
- **localStorage:** El carrito persiste entre sesiones con `JSON.stringify` / `JSON.parse`
- **Funciones:**
  - `diaDescuento()` — Verifica si hoy hay descuento
  - `calcularPrecioFinal(producto, hayDescuento)` — Calcula precio con/sin descuento
  - `calcularPorcentajeDescuento(producto)` — Devuelve el % de descuento
  - `esNombreValido(valor)` — Valida el nombre con regex
  - `obtenerProducto(id)` — Busca un producto por su id
  - `agregarAlCarrito(id)` — Agrega o incrementa un ítem en el carrito
  - `eliminarDelCarrito(id)` — Elimina un ítem del carrito
  - `renderizarCarrito()` — Construye el HTML del modal de carrito
  - `guardarCarritoEnStorage()` — Persiste el carrito en localStorage
  - `cargarCarritoDesdeStorage()` — Recupera el carrito al iniciar
  - `mostrarToast(mensaje)` — Muestra notificaciones temporales en pantalla

### Interacción con el DOM
- Los precios se renderizan dinámicamente al cargar la página
- El nombre se captura mediante un modal HTML con validación en tiempo real
- El carrito se actualiza y refleja cambios en pantalla sin recargar
- Los eventos se manejan con `addEventListener` con un criterio homogéneo
- Delegación de eventos en la sección de productos

---

## ✅ Criterios de Entrega

| Criterio | Detalle |
|----------|---------|
| **Funcionalidad** | Flujo completo: entrada (nombre, selección), proceso (descuento, carrito), salida (precios, total) |
| **Interactividad** | Entradas capturadas por eventos; salidas reflejadas en el DOM |
| **Escalabilidad** | Funciones con parámetros, arrays de objetos, localStorage, eventos homogéneos |
| **Integridad** | Sin `prompt()`, `alert()` ni `confirm()`; JS en archivo separado correctamente referenciado |
| **Legibilidad** | Variables y funciones con nombres descriptivos, comentarios en el código, estructura ordenada |

---

## 👨‍💻 Autor

**Meier Leandro Agustín**

## 📅 Fecha

Marzo 2026

## 📄 Licencia

Ningún derecho reservado — Proyecto educativo

---

> 💡 **Nota:** Este es un proyecto académico con fines educativos. Los precios y productos son ficticios.
