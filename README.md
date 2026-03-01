# iPRO - Simulador de Tienda Online

Proyecto integrador de JavaScript que simula una experiencia de compra interactiva con sistema de descuentos por día.

## 📋 Descripción

iPRO es una tienda virtual de productos Apple que ofrece descuentos especiales según el día de la semana. El usuario puede navegar por el catálogo, verificar descuentos disponibles y consultar precios de productos de forma interactiva.

## ✨ Características

- Sistema de descuentos por día de la semana (martes y jueves)
- Catálogo de 4 productos Apple premium
- Descuentos variables por producto (entre 10% y 15%)
- Interfaz interactiva mediante prompts y alerts
- Validación de selección de productos
- Cálculo automático de precios finales

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)

## 📦 Productos Disponibles

1. **MacBook 14 Pro Ultimate** - $7.000.000 (10% descuento)
2. **iPhone 17 PRO MAX** - $3.000.000 (8% descuento)
3. **iPhone Air** - $2.500.000 (12% descuento)
4. **AirPods Pro** - $250.000 (15% descuento)

## 🚀 Cómo Usar

1. Abrí el archivo `index.html` en tu navegador
2. Ingresá tu nombre cuando se te solicite
3. El sistema te informará si hay descuentos disponibles hoy
4. Elegí un producto del menú (1-4)
5. Visualizá el precio final con o sin descuento

## 📂 Estructura del Proyecto
```
iPRO/
│
|── index.html         # Estructura principal
|── styles/
│   └── style.css       # Estilos de la página
|── scripts/
│   └── main.js         # Lógica del simulador
|── images/             # Imágenes de productos
└── README.md           # Este archivo
```

## 💻 Funcionalidades Implementadas

### Algoritmos
- **Condicionales:** Validación de nombre, verificación de día de descuento, validación de producto
- **Ciclos:** Búsqueda de día actual en array de días con descuento (while)
- **Arrays:** DIAS_DESCUENTO y PRODUCTOS con objetos
- **Funciones:**
  - `saludar(nombre)` - Da bienvenida al usuario
  - `diaDescuento()` - Verifica si hoy hay descuento
  - `obtenerProducto(index)` - Busca producto por índice
  - `calcularPrecioFinal(producto, estado)` - Calcula precio con/sin descuento

### Interacción Usuario
- **Input:** `prompt()` para nombre y selección de producto
- **Output:** `alert()` para mensajes y resultados

## 📝 Requisitos del Proyecto

Este proyecto fue desarrollado cumpliendo los siguientes requisitos académicos:

- ✅ Estructura HTML completa
- ✅ Archivo JavaScript correctamente vinculado
- ✅ Uso de algoritmos condicionales
- ✅ Implementación de ciclos
- ✅ Manejo de arrays
- ✅ Uso de funciones con parámetros y return
- ✅ Interacción mediante prompt/confirm y alert/console.log
- ✅ Sin manipulación del DOM
- ✅ Sin frameworks de JavaScript

## 👨‍💻 Autor

**Meier Leandro Agustín**

## 📅 Fecha

Enero 2026

## 📄 Licencia

Ningún derecho reservado - Proyecto educativo

---

💡 **Nota:** Este es un proyecto académico con fines educativos. Los precios y productos son ficticios.
