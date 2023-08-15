//CLASE PRODUCTO (AUMENTAR CANT. - DISMINUIR CANT - DESCRIPCIONES)
class Producto {
    constructor({ id, nombre, precio, descripcion, img }) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = 1
        this.descripcion = descripcion
        this.img = img
    }

    aumentarCantidad() {
        this.cantidad++
    }

    disminuirCantidad() {
        if (this.cantidad > 1) {
            this.cantidad--
            return true
        }
        return false
    }

    descripcionHTMLCarrito() {
        return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${this.img}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${this.nombre}</h5>
                        <p class="card-text">Cantidad: <button class="btn btn-dark" id="minus-${this.id}"><i class="fa-solid fa-minus fa-1x"></i></button>${this.cantidad}<button class="btn btn-dark" id="plus-${this.id}"><i class="fa-solid fa-plus"></i></button> </p>
                        <p class="card-text">Precio: $${this.precio}</p>
                        <button class="btn btn-danger" id="eliminar-${this.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>`
    }

    descripcionHTML() {
        return `<div class="card" style="width: 18rem;">
        <img src="${this.img}" class="card-img-top tamImagen " alt="...">
        <div class="card-body">
            <h5 class="card-title">${this.nombre}</h5>
            <p class="card-text">${this.descripcion}</p>
            <p class="card-text">$${this.precio}</p>
            <button class="btn btn-primary" id="ap-${this.id}">Añadir al carrito</button>
        </div>
    </div>
        `
    }
}

//CLASE CARRITO (STORAGE - GUARDAR EN STORAGE - AGREGAR - ELIMINAR - LIMPIAR CARRITO -
//                            MOSTRAR PRODUCTOS - CALCULAR TOTAL - FINALIZAR COMPRA)
class Carrito {
    constructor() {
        this.listaCarrito = []
        this.contenedor_carrito = document.getElementById('contenedor_carrito')
        this.total = document.getElementById('total')
        this.finalizar_compra = document.getElementById("finalizar_compra")
        this.keyStorage = "listaCarrito"
    }

    levantarStorage() {
        this.listaCarrito = JSON.parse(localStorage.getItem(this.keyStorage)) || []

        if (this.listaCarrito.length > 0) {
            let listaAuxiliar = []

            for (let i = 0; i < this.listaCarrito.length; i++) {
                let productoDeLaClaseProducto = new Producto(this.listaCarrito[i])
                listaAuxiliar.push(productoDeLaClaseProducto)
            }

            this.listaCarrito = listaAuxiliar
        }
    }

    guardarEnStorage() {
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        
        localStorage.setItem(this.keyStorage, listaCarritoJSON)
    }

    agregar(productoAgregar) {
        let existeElProducto = this.listaCarrito.some(producto => producto.id == productoAgregar.id)

        if (existeElProducto) {
            let producto = this.listaCarrito.find(producto => producto.id == productoAgregar.id)
            producto.cantidad = producto.cantidad + 1
        } else {
            this.listaCarrito.push(productoAgregar)
        }
    }

    eliminar(productoEliminar) {
        let producto = this.listaCarrito.find(producto => producto.id == productoEliminar.id)
        let indice = this.listaCarrito.indexOf(producto)
        this.listaCarrito.splice(indice, 1)
    }

    limpiarContenedorCarrito() {
        this.contenedor_carrito.innerHTML = ""
    }

    mostrarProductos() {
        this.limpiarContenedorCarrito()

        this.listaCarrito.forEach(producto => {
            contenedor_carrito.innerHTML += producto.descripcionHTMLCarrito()
        })

        //EVENTO AL BOTÓN ELIMINAR PRODUCTO DEL CARRITO
        this.listaCarrito.forEach(producto => {

            let btn_eliminar = document.getElementById(`eliminar-${producto.id}`)
            let btn_plus = document.getElementById(`plus-${producto.id}`)
            let btn_minus = document.getElementById(`minus-${producto.id}`)

            btn_eliminar.addEventListener("click", () => {
                this.eliminar(producto)
                this.guardarEnStorage()
                this.mostrarProductos()
            })

            btn_plus.addEventListener("click", () => {
                producto.aumentarCantidad()
                this.mostrarProductos()
            })

            btn_minus.addEventListener("click", () => {
                if (producto.disminuirCantidad()) {
                    this.mostrarProductos()
                }
            })
        })
        total.innerHTML = "Precio Total: $" + this.calcular_total()
    }

    calcular_total() {
        return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
    }

    eventoFinalizarCompra() {
        this.finalizar_compra.addEventListener("click", () => {

            if (this.listaCarrito.length > 0) {
                let precio_total = this.calcular_total()
                //LIMPIAR CARRITO
                this.listaCarrito = []
                //LIMPIAR EL STORAGE
                localStorage.removeItem(this.keyStorage)
                //TOTAL
                this.limpiarContenedorCarrito()
                this.total.innerHTML = ""
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `¡El total de su compra es de:  $${precio_total}`,
                    text: "Se enviará el comprobante por e-mail",
                    timer: 3000
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: '¡Añada productos para realizar la compra!',
                    timer: 3000
                })
            }
        })
    }
}

//CLASE CONTROLADORA DE PRODUCTOS (CARGAR PRODUCTOS - AGREGAR - MOSTRAR)
class ProductoController {
    constructor() {
        this.listaProductos = []
    }

    cargarProductos() {
        const p1 = new Producto({ id: 1, nombre: "Smart tv Philips 6900", precio: 110000, descripcion: "Full HD - Dolby Atmos - Android 10 - 3 puertos HDMI - 2 puertos USB", img: "https://images.philips.com/is/image/philipsconsumer/6beb5493cd3d4725bd0cafb700cc4cb9?$jpglarge$&wid=420&hei=360 " })
        const p2 = new Producto({ id: 2, nombre: "Tablet Lenovo tab M10", precio: 140000, descripcion: "Memoria interna de 256 GB - incluye cable USB-c - Procesador quad-Core", img: "https://images.fravega.com/f500/a4b5fffbab7e13d5a52f41e71aaf0366.jpg" })
        const p3 = new Producto({ id: 3, nombre: "Auriculares Sony 1000X", precio: 160000, descripcion: "Alcance 10m - 30 hs de duración de batería - Cancelación de ruido", img: "https://www.sony.com.ar/image/5d02da5df552836db894cead8a68f5f3?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF" })
        const p4 = new Producto({ id: 4, nombre: "Smart Watch Samsung 5pro", precio: 175000, descripcion: "Pantalla SAMOLED de 1.4 - Resistente hasta 50 mts bajo el agua - 80 hs de duración de batería", img: "https://http2.mlstatic.com/D_NQ_NP_2X_932337-MLU54959626547_042023-F.webp" })
        const p5 = new Producto({ id: 5, nombre: "Celular Motorola G72", precio: 135000, descripcion: "Dual SIM - Almacenamiento interno de 128 GB - Memoria RAM de 6 GB", img: "https://www.cetrogar.com.ar/media/catalog/product/2/0/2022_victoria_basicpack_bright-white_pdp-hero.jpg?width=500&height=500&canvas=500,500&quality=80&bg-color=255,255,255&fit=bounds" })
        const p6 = new Producto({ id: 6, nombre: "Notebook Lenovo V15", precio: 436000, descripcion: "Core i5 - 16 GB RAM - Placa de video Iris Xe G7 - Es antireflejo", img: "https://http2.mlstatic.com/D_NQ_NP_2X_859834-MLU70065239743_062023-F.webp" })
        const p7 = new Producto({ id: 7, nombre: "Proyector Samsung Sp-Isp3blaxzb", precio: 330000, descripcion: "Mini HDMI - Full HD 1080 p - Tecnología de proyeción DLP", img: "https://http2.mlstatic.com/D_NQ_NP_2X_917779-MLA50739463894_072022-F.webp" })
        const p8 = new Producto({ id: 8, nombre: "Asistente Amazon 5th Gen", precio: 55000, descripcion: "Con reconocimiento de voz - Control inteligente de dispositivos del Hogar - Pantalla digital", img: "https://http2.mlstatic.com/D_NQ_NP_780781-MLU69957173342_062023-O.webp" })
        const p9 = new Producto({ id: 9, nombre: "Samsung S23 ultra", precio: 610000, descripcion: "Memoria interna de 256 GB - Cámaras de 200 mpx y 12 mpx - Procesador Snapdragon 735", img: "https://images.start.com.ar/SM-S918BZKMARO-3.jpg" })
        const p10 = new Producto({ id: 10, nombre: "Monitor LG ultra Wide", precio: 390000, descripcion: "Pantalla LCD de 34p - 75Hz de frecuencia - Respuesta de 5ms", img: "https://images.fravega.com/f300/2801e349c144f409f5d41bd5814aedb4.jpg.webp" })
        
        this.agregar(p1)
        this.agregar(p2)
        this.agregar(p3)
        this.agregar(p4)
        this.agregar(p5)
        this.agregar(p6)
        this.agregar(p7)
        this.agregar(p8)
        this.agregar(p9)
        this.agregar(p10)
    }

    agregar(producto) {
        this.listaProductos.push(producto)
    }

    mostrarProductos() {
        let contenedor_productos = document.getElementById("contenedor_productos")
        this.listaProductos.forEach(producto => {
            contenedor_productos.innerHTML += producto.descripcionHTML()
        })

        //EVENTO AL BOTÓN AÑADIR AL CARRITO
        this.listaProductos.forEach(producto => {

            const btn = document.getElementById(`ap-${producto.id}`)

            btn.addEventListener("click", () => {
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrarProductos()
                Toastify({
                    avatar: `${producto.img}`,
                    text: `¡${producto.nombre} añadido!`,
                    duration: 100000,
                    gravity: "bottom",
                    position: "right",
                    
                }).showToast();
            })
        })
    }
}

// INSTANCIA DEL CARRITO PARA LOS PRODUCTOS SELECCIONADOR POR EL CLIENTE
const carrito = new Carrito()
carrito.levantarStorage()
carrito.mostrarProductos()
carrito.eventoFinalizarCompra()

//INSTANCIA DE PRODUCTOCONTROLLER PARA GESTIONAR TODOS LOS PRODUCTOS 
const controlador_productos = new ProductoController()
controlador_productos.cargarProductos()
controlador_productos.mostrarProductos()