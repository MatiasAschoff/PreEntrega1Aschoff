//CARRITO DE COMPRAS PARA UNA TIENDA DE PRODUCTOS TECNOLÓGICOS:

// Simulador interactivo de una tienda que le permite al usuario:
// Escoger productos del listado de la tienda
// Informar los productos seleccionados
// Eliminar productos del carrito de compras
// Calcular el valor total de los productos seleccionados
// Calcularle el iva
// Calcular un descuento si la compra supera un monto en específico


// PRODUCTOS  (DESCRIPCION - RESUMEN DE COMPRA - AUMENTAR LA CANTIDAD) 
class Producto{
    constructor(id,nombre, precio, cantidad){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
    }

    descripcion(){
        return  this.id+ "-" +
                this.nombre+
                "      $" + this.precio
    }

    resumenCompra(){
        return  this.nombre+
                "$" + this.precio+
                "   Cantidad: "+ this.cantidad
    }

    aumentarCantidad(cantidad){
        this.cantidad =  this.cantidad + cantidad
    }
}

// CONTROLADOR DE PRODUCTOS (AGREGAR - BUSCAR - MOSTRAR)
class ControladorDeProductos{
    constructor(){
        this.listaProductos = []
    }

    agregar(producto){
        this.listaProductos.push(producto)
    }

    buscarProductoPorID(id){
        return this.listaProductos.find(producto => producto.id == id)
    }

    mostrarProductos(){
        let listaEnTexto = ""
        this.listaProductos.forEach( producto => {
            listaEnTexto = listaEnTexto + producto.descripcion() +
            "\n-----------------------------------------------------\n"})
        alert(listaEnTexto)
    }
}

//CARRITO DE COMPRAS  (AGREGAR - MOSTRAR - TOTAL - IVA - DESCRIPCIÓN - DESCUENTO - ELIMINAR PRODUCTOS)
class Carrito{
    constructor(){
        this.listaCarrito = []
    }
    
    agregar(producto,cantidad){
        let existe = this.listaCarrito.some( elementos => elementos.id == producto.id)
        if(existe){
            producto.aumentarCantidad(cantidad)
        }else{
            producto.aumentarCantidad(cantidad)
            this.listaCarrito.push(producto)
        }
    }

    mostrarProductos(){
        let listaEnTexto = "Carrito de compras de Tienda TECNO:\n\n"
        this.listaCarrito.forEach(producto => {
            listaEnTexto = listaEnTexto + producto.resumenCompra() + "\n-----------------------------------------------------\n"

        })
        alert(listaEnTexto)
    }

    calcularTotal(){
        return this.listaCarrito.reduce( (acumulador,producto) => acumulador + producto.precio * producto.cantidad ,0)
    }

    calcularIVA(){
        return this.calcularTotal() * 1.21
    }

    calcularDescuento() {
    const totalConIVA = this.calcularIVA();
    if (totalConIVA > 500000) {
        const descuento = totalConIVA * 0.1;
        const totalConDescuento = totalConIVA - descuento;
        return totalConDescuento;
    } else {
        return totalConIVA;
    }
}

    eliminarProductoSeleccionado(id) {
        const indice = this.listaCarrito.findIndex(producto => producto.id === id);
        if (indice !== -1) {
            const productoEliminado = this.listaCarrito.splice(indice, 1);
            alert(`"El producto: "${productoEliminado[0].nombre}" fue eliminado del carrito.`);
        } else {
            alert(`No se encontró ningún producto con ID ${id} en el carrito.`);
        }
    }
}

// FUNCION PARA SALUDAR
function saludar(){
    alert ("\n* * * * * * * * * * * * * * * * * * * * * * * * *"+
    "\n* * * Bienvenid@ a TIENDA TECNO * * *"+
    "\n* * * * * * * * * * * * * * * * * * * * * * * * * \n\n A CONTINUACIÓN PODRÁ SELECCIONAR\n           EL PRODUCTO QUE DESEE" );
}

// FUNCION PARA DESPEDIR
function despedir(){
    alert ("\nGRACIAS POR ELEGIR TIENDA TECNO: \n\n Saluda cordialmente Matias Aschoff, Gerente de Ventas")
}

//FUNCION PARA CALCULAR EL DESCUENTO
function totalDescuento(){
    const totalConDescuento = CARRITO.calcularDescuento();
    if (totalConDescuento !== CARRITO.calcularIVA()) {
        alert("¡Felicitaciones! Su compra supera los $500.000. Ha obtenido un 10% de descuento.");
        alert("El total de su compra con descuento es de: " + totalConDescuento);
    }
}

//CONSTRUCTORES
const controladorProductos = new ControladorDeProductos()
const CARRITO = new Carrito()

controladorProductos.agregar(new Producto(1,"Smart tv Philips 6900         ", 110000, 0))
controladorProductos.agregar(new Producto(2,"Tablet Lenovo tab M10       ", 140000, 0))
controladorProductos.agregar(new Producto(3,"Auriculares Sony 1000X      ", 160000, 0))
controladorProductos.agregar(new Producto(4,"Smart Watch Samsung 5pro", 175000, 0))
controladorProductos.agregar(new Producto(5,"Celular Motorola G72          ", 135000, 0))
controladorProductos.agregar(new Producto(6,"Notebook Lenovo V15         ", 436000, 0))
controladorProductos.agregar(new Producto(7,"Proyector Samsung            ", 330000, 0))
controladorProductos.agregar(new Producto(8,"Asistente Amazon 5th Gen  ", 55000, 0))
controladorProductos.agregar(new Producto(9,"Samsung s23 ultra               ", 610000, 0))
controladorProductos.agregar(new Producto(10,"Monitor LG ultra Wide        ", 390000, 0))

//DEFINO RESPUESTA COMO VACIO
let rta

//SALUDO A TRAVES DE UNA FUNCION
saludar ()

//BUCLE DO - WHILE Y CONDICIONALES
do{
    controladorProductos.mostrarProductos()
    let opcion = Number(prompt("Ingrese el NÚMERO del producto que desea agregar al carrito"))
    let producto = controladorProductos.buscarProductoPorID(opcion)

    if (!producto) {
        alert("El producto seleccionado no existe. Por favor seleccione un NÚMERO VÁLIDO");
        continue;
    }
    let cantidad = Number(prompt("Ingrese la CANTIDAD del producto seleccionado que desea"))
    CARRITO.agregar(producto,cantidad)
    alert("El producto fué añadido exitosamente: ")

    rta = prompt("¿Desea ELIMINAR algún producto del carrito? Si/No").toLowerCase();
    if (rta === "si") {
        let idProductoAEliminar = Number(prompt("Ingrese el ID del producto que desea eliminar del carrito"));
        CARRITO.eliminarProductoSeleccionado(idProductoAEliminar);
        CARRITO.mostrarProductos();
    }

    CARRITO.mostrarProductos()
    rta = prompt("¿Desea salir? Para salir escriba 'salir'").toLowerCase()
}while(rta != "salir")

alert("El total de su compra es de: "+ CARRITO.calcularTotal())
alert("El total de su compra con IVA es de: "+ CARRITO.calcularIVA())
totalDescuento ()
despedir()
