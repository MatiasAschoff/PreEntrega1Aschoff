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
        this._listaCarrito = []
        this._contenedor_carrito = document.getElementById('contenedor_carrito')
        this._total = document.getElementById('total')
        this._finalizar_compra = document.getElementById("finalizar_compra")
        this._vaciar_carrito = document.getElementById("vaciar_carrito")
        this._keyStorage = "listaCarrito"
    }

    levantarStorage() {
        this._listaCarrito = JSON.parse(localStorage.getItem(this._keyStorage)) || []

        if (this._listaCarrito.length > 0) {
            let listaAuxiliar = []

            for (let i = 0; i < this._listaCarrito.length; i++) {
                let productoDeLaClaseProducto = new Producto(this._listaCarrito[i])
                listaAuxiliar.push(productoDeLaClaseProducto)
            }

            this._listaCarrito = listaAuxiliar
        }
    }

    guardarEnStorage() {
        let listaCarritoJSON = JSON.stringify(this._listaCarrito)
        
        localStorage.setItem(this._keyStorage, listaCarritoJSON)
    }

    agregar(productoAgregar) {
        let existeElProducto = this._listaCarrito.some(producto => producto.id == productoAgregar.id)

        if (existeElProducto) {
            let producto = this._listaCarrito.find(producto => producto.id == productoAgregar.id)
            producto.cantidad = producto.cantidad + 1
        } else {
            this._listaCarrito.push(productoAgregar)
        }
    }

    eliminar(productoEliminar) {
        let producto = this._listaCarrito.find(producto => producto.id == productoEliminar.id)
        let indice = this._listaCarrito.indexOf(producto)
        this._listaCarrito.splice(indice, 1)
    }

    _limpiarContenedorCarrito() {
        this._contenedor_carrito.innerHTML = ""
    }

    _eventoBotonEliminarProducto(producto){
        let btn_eliminar = document.getElementById(`eliminar-${producto.id}`)

        btn_eliminar.addEventListener("click", () => {
            this.eliminar(producto)
            this.guardarEnStorage()
            this.mostrarProductos()
        })
    }


    _eventoBotonAumentarCantidad(producto){
        let btn_plus = document.getElementById(`plus-${producto.id}`)

        btn_plus.addEventListener("click", () => {
            producto.aumentarCantidad()
            this.mostrarProductos()
        })
    }

    _eventoBotonDisminuirCantidad(producto){
        let btn_minus = document.getElementById(`minus-${producto.id}`)
        btn_minus.addEventListener("click", () => {
            if (producto.disminuirCantidad()) {
                this.mostrarProductos()
            }
        })
    }

    mostrarProductos() {
        this._limpiarContenedorCarrito()

        this._listaCarrito.forEach(producto => {
            this._contenedor_carrito.innerHTML += producto.descripcionHTMLCarrito()
        })

        //EVENTO AL BOTÓN ELIMINAR PRODUCTO DEL CARRITO
        this._listaCarrito.forEach(producto => {

            this._eventoBotonEliminarProducto(producto)
            this._eventoBotonAumentarCantidad(producto)
            this._eventoBotonDisminuirCantidad(producto)

        })

        this._total.innerHTML = "Precio Total: $" + this._calcular_total()
    }

    _calcular_total() {
        return this._listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
    }

    eventoFinalizarCompra() {
        this._finalizar_compra.addEventListener("click", () => {

            if (this._listaCarrito.length > 0) {
                let precio_total = this._calcular_total()
                //LIMPIAR CARRITO
                this._listaCarrito = []
                //LIMPIAR EL STORAGE
                localStorage.removeItem(this._keyStorage)
                //TOTAL
                this._limpiarContenedorCarrito()
                this._total.innerHTML = ""
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

    eventoVaciarCarrito(){
        this._vaciar_carrito.addEventListener("click", ()=>{
            this._listaCarrito = []
            this._limpiarContenedorCarrito()
            localStorage.clear()
            this.mostrarProductos()
        })
    }
}

//CLASE CONTROLADORA DE PRODUCTOS (CARGAR PRODUCTOS - AGREGAR - MOSTRAR)
class ProductoController {
    constructor() {
        this.listaProductos = []
        this.contenedor_productos = document.getElementById("contenedor_productos")
    }
//CARGA DE DATOS DE JSON LOCAL CON FETCH
    async cargarProductos() {
        try {
            const response = await fetch('simular_api.json');
            const productos = await response.json();

            productos.forEach(productoData => {
                const producto = new Producto(productoData);
                this.agregar(producto);
            });

            this.mostrarProductos();
        } catch (error) {
            console.error('Error cargando productos:', error);
        }
    }

    agregar(producto) {
        this.listaProductos.push(producto)
    }

    eventoAgregarAlCarrito(){
        //damos evento al botón "añadir al carrito"
        this.listaProductos.forEach(producto => {

            const btn = document.getElementById(`ap-${producto.id}`)

            btn.addEventListener("click", () => {
                carrito.agregar(producto)
                carrito.guardarEnStorage()
                carrito.mostrarProductos()
                Toastify({
                    avatar: `${producto.img}`,
                    text: `¡${producto.nombre} añadido!`,
                    duration: 1000,
                    gravity: "bottom", 
                    position: "right", 
                    
                }).showToast();
            })
        })
    }

    mostrarProductos() {
        
        this.listaProductos.forEach(producto => {
            this.contenedor_productos.innerHTML += producto.descripcionHTML()
        })

        this.eventoAgregarAlCarrito()
    }
}

// INSTANCIA DEL CARRITO PARA LOS PRODUCTOS SELECCIONADOR POR EL CLIENTE
const carrito = new Carrito()
carrito.levantarStorage()
carrito.mostrarProductos()
//A LA ESPERA DEL CLICK
carrito.eventoFinalizarCompra()
carrito.eventoVaciarCarrito()

//INSTANCIA DE PRODUCTOCONTROLLER PARA GESTIONAR TODOS LOS PRODUCTOS 
const controlador_productos = new ProductoController()
controlador_productos.cargarProductos()
controlador_productos.mostrarProductos()