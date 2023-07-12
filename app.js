// Simulador interactivo de una tienda que le permite al usuario:
// Escoger productos del listado de la tienda
// Informar los productos seleccionados
// Calcular el valor total de los productos seleccionados
// Calcularle el iva
// Calcular un descuento si la compra supera un monto en específico
// Calcular las cuotas sin interés que ofrece la tienda


// PRECIOS DE LOS PRODUCTOS DE LA TIENDA
const precioSmartTv = 110000;
const precioTablet = 140000;
const precioAuriculares = 160000;
const precioSmartWatch = 175000;
const precioCelular = 135000;
const precioLaptop = 436000;

// SELECCIONADORES DE LA LISTA DE PRODUCTOS
const opcion1 = 1;
const opcion2 = 2;
const opcion3 = 3;
const opcion4 = 4;
const opcion5 = 5;
const opcion6 = 6;

// DESCRIPCIÓN DE LOS PRODUCTOS DE LA TIENDA
const smartTv = "Smart tv Philips 6900"
const tablet = "Tablet Lenovo tab M10"
const auriculares  = "Auriculares Sony 1000X"
const smartWatch = "Smart Watch Samsung 5pro"
const celular = "Celular Moto G72"
const laptop = "Notebook Lenovo V15"

// OTRAS VARIABLES GLOBALES
let rta = ""
let resultado = 0 
let ticket = "\n"

// FUNCION PARA SALUDAR
function saludar(){
    alert ("\n* * * * * * * * * * * * * * * * * * * * * * * * *"+
    "\n* * * Bienvenid@ a TIENDA TECNO * * *"+
    "\n* * * * * * * * * * * * * * * * * * * * * * * * * \n\n" );
}
// FUNCION PARA CALCULAR EL IVA
function iva(resultado){
    return resultado * 1.21
}
// FUNCIONES PARA CALCULAR LAS CUOTAS
function tresCuotas(resultadoConDescuento){
    return resultadoConDescuento / 3
}
function seisCuotas(resultadoConDescuento){
    return resultadoConDescuento / 6
}
function doceCuotas(resultadoConDescuento){
    return resultadoConDescuento / 12
}
// FUNCION PARA DESPEDIR
function despedir(){
    alert ("\n\nGRACIAS POR ELEGIR TIENDA TECNO: \n\n Saluda cordialmente Matias Aschoff, Gerente de Ventas")
}

//SALUDO A TRAVES DE UNA FUNCION
saludar ()

//BUCLE - CONDICIONALES - VARIABLE LOCAL
do{
    alert ("Seleccione la opción del producto que deseas comprar:\n\n"+opcion1+"-"+smartTv+"\t$"+ 
    precioSmartTv+"\n"+opcion2+"-"+tablet+"\t$"+ precioTablet+
    "\n"+opcion3+"-"+auriculares+"\t$"+ precioAuriculares+
    "\n"+opcion4+"-"+smartWatch+"\t$"+ precioSmartWatch+
    "\n"+opcion5+"-"+celular+"\t$"+ precioCelular+
    "\n"+opcion6+"-"+laptop+"\t$"+ precioLaptop);    

    let opcionElegida = Number(prompt("Ingrese el número que corresponde a la opción"))
    
    if(opcionElegida==opcion1){
    alert ("Usted compro un "+smartTv+"--> su precio es: $"+precioSmartTv)

    resultado = resultado + precioSmartTv 
    ticket = ticket +"\n" + smartTv +"\t$"+ precioSmartTv
    }
    else if(opcionElegida==opcion2){
    alert ("Usted compro una "+tablet+"--> su precio es: $"+precioTablet)
    
    resultado = resultado + precioTablet
    ticket = ticket +"\n" + tablet +"\t$"+ precioTablet
    }

    else if(opcionElegida==opcion3){
    alert ("Usted compro una "+auriculares+"--> su precio es: $"+precioAuriculares)
    
    resultado = resultado + precioAuriculares
    ticket = ticket +"\n" + auriculares +"\t$"+ precioAuriculares
    }
    else if(opcionElegida==opcion4){
    alert ("Usted compro una "+smartWatch+"--> su precio es: $"+precioSmartWatch)
    
    resultado = resultado + precioSmartWatch
    ticket = ticket +"\n" + smartWatch +"\t$"+ precioSmartWatch
    }
    else if(opcionElegida==opcion5){
    alert ("Usted compro una "+celular+"--> su precio es: $"+precioCelular)
    
    resultado = resultado + precioCelular
    ticket = ticket +"\n" + celular +"\t$"+ precioCelular
    }
    else if(opcionElegida==opcion6){
    alert ("Usted compro una "+laptop+"--> su precio es: $"+precioLaptop)
    
    resultado = resultado + precioLaptop
    ticket = ticket +"\n" + laptop +"\t$"+ precioLaptop
    }
    // SI NO SE ELIGE NINGUNA DE LAS OPCIONES, MOSTRAR EL SIGUIENTE MENSAJE
    else if(opcionElegida!=opcion1 && opcion2 && opcion3 && opcion4 && opcion5 && opcion6){
    alert("La opción escogida NO es válida, por favor intente de nuevo")
    }
    //PARA SALIR DEL BUCLE
    rta = prompt("¿Desea salir? Para salir escriba 'salir'").toLowerCase()
}while(rta != "salir")
//MOSTRAR TOTAL DE COMPRA
alert ("Usted compro: "+ticket+"\n\n El total de su compra es: $"+resultado)

//DESCUENTO DEL 10% PARA COMPRAS SUPERIORES A $180.000
if(resultado >= 180000){
    let resultadoConDescuento = iva(resultado)* 0.9
    
    alert("GRACIAS POR COMPRAR EN TIENDA TECNO: \n\n RESUMEN DE COMPRA: "+ticket 
        +"\n\nTotal: $" + resultado
        +"\n\n"+"El total con IVA es de: $"+iva(resultado)+"\n\nTotal con descuento: $" + resultadoConDescuento)
    
    alert("Tambien podrá abonar su compra en:\n\n --> 3 cuotas sin interes de: $"+tresCuotas(resultadoConDescuento)+
        "\n\n --> 6 cuotas sin interes de: $"+seisCuotas(resultadoConDescuento)+
        "\n\n --> 12 cuotas sin interes de: $"+doceCuotas(resultadoConDescuento))
    despedir()
}else{
    alert("Accedé a los DESCUENTOS que TIENDA TECNO tiene para vos \nen COMPRAS SUPERIORES a $180000")
    
    let resultadoConDescuento = iva(resultado)* 0.9
    
    alert("\n RESUMEN DE COMPRA: "+ticket 
        +"\n\nTotal: $" + resultado
        +"\n\n"+"El total con IVA es de: $"+iva(resultado)+"\n\nTotal con descuento: $" + resultadoConDescuento)
    
        despedir()
}


