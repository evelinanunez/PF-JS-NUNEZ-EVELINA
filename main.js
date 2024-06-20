let carrito = JSON.parse(localStorage.getItem("carrito"))  || []


    const crearCard = (productos) =>{
        try {
            productos.forEach((producto)=>{
                crearCardProducto(producto);
            })
        } catch (error) {
            console.log(error);
        }
       
    }
    const crearCardProducto = (producto) =>{
        try {
            const contenedor = document.getElementById("contenedorProductos");;
            const card = document.createElement("div");
            card.className= " card estilosCard";
            card.innerHTML = `
                            <img src="${producto.imagen}" class="card-img-top" alt="...">
                            <div class="card-body" id="${producto.id}">
                                <h5 class="card-title">${producto.titulo}</h5>
                                <h5>$ ${producto.precio}</h5>
                                <p class="card-text">${producto.descripcion}</p>
                                <input class="cantidad" type="number" max="${producto.stock}" min="1" value="1"/>
                                <button class="btn-agregar-carrito">Agregar al Carrito</button>
                            </div>
                                `
                                contenedor.append(card);      
        } catch (error) {
            console.log(error);
        }
                      
    }
    
const obtenerProductos = async() =>{
    try {
        const response = await fetch("./productos.json");
        const productos = await response.json();
        return productos;
    } catch (error) {
        console.log(error)
    }
}


const agregarAlCarrito = (productos) => {
    try {
        const contenedorProductos = document.getElementById("contenedorProductos");
        contenedorProductos.addEventListener("click", (ev) => {
            if (ev.target && ev.target.classList.contains("btn-agregar-carrito")) {
                const parentElement = ev.target.parentElement;
                const id = parentElement.id;
                const cantidad = parseInt(parentElement.getElementsByClassName("cantidad")[0].value, 10);
                const producto = productos.find(producto => producto.id == id);

                const productoEnCarrito = carrito.find(item => item.id == id);
                if (productoEnCarrito) {
                    productoEnCarrito.cantidad += cantidad;
                } else {
                    carrito.push({ ...producto, cantidad });
                }

                localStorage.setItem("carrito", JSON.stringify(carrito));

                Swal.fire({
                    title: "Producto agregado al Carrito!",
                    text: `Detalle:  ${cantidad} U -  ${producto.titulo}`,
                    icon: "success"
                });
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const eliminarDelCarrito = () => {
    try {
        const contenedorCarrito = document.getElementById("contenedorProductosCarrito");
        contenedorCarrito.addEventListener('click', (ev) => {
            if (ev.target && ev.target.classList.contains("btn-eliminar-producto-carrito")) {
                const divBotones = ev.target.parentElement;
                const divRow = divBotones.parentElement;
                const cardCarrito = divRow.parentElement;
                const id = cardCarrito.id;

                borrarProductoCarrito(id);

                Swal.fire({
                    title: "Producto Eliminado del Carrito!",
                    icon: "success"
                });

                const productoEnCarrito = carrito.find(item => item.id == id);
                if (!productoEnCarrito || productoEnCarrito.cantidad <= 0) {
                    borrarCardProductoCarrito(id);
                }
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const borrarCardProductoCarrito = (id) => {
    try {
        const element = document.getElementById(id);
        element.remove();
    } catch (error) {
        console.log(error);
    }
}

const borrarProductoCarrito = (id, cantidad) => {
  
        try {
            carrito = carrito.filter(producto => producto.id != id)
            localStorage.setItem("carrito",JSON.stringify(carrito))
        } catch (error) {
            console.log(error);
        }
    
}

const crearCardProductoCarrito = (producto)=>{
    try {
        const contenedor = document.getElementById("contenedorProductosCarrito");
        const card = document.createElement("div");
        card.className= "card mb-3";
        card.id= producto.id;
        card.innerHTML =`
                        <div class="row g-0" >
                            <div class="col-md-4">
                                <img src="${producto.imagen}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-6">
                                <div class="card-body">
                                    <h5 class="card-title">${producto.titulo}</h5>
                                    <h1 class="card-price">$ ${producto.precio}</h1>
                                    <p class="card-text">${producto.descripcion}</p>
                                    <p class="card-text">Cantidad: ${producto.cantidad}</p>
                                    <p class="card-text">Total:$ ${producto.precio * producto.cantidad } </p>
                                </div>
                            </div>
                            <div class="col-md-2 d-flex flex-column align-items-center justify-content-center">
                                <button class="btn btn-danger btn-eliminar-producto-carrito m-2 w-100">Eliminar</button>
                                <button class="btn btn-primary btn-comprar m-2 w-100" disabled>Comprar</button>
                            </div>
                        </div>
                        `
                        contenedor.append(card);
    } catch (error) {
        console.log(error);
    }
   
}
const  agregarContenedorDeCarritoVacio= ()=>{
    try {
        const contenedor = document.getElementById("contenedorProductosCarrito");
        const contenedorMensaje = document.createElement("div");
        contenedorMensaje.innerHTML =`
                                        <div class="container mt-5">
                                            <div class="row justify-content-center">
                                                <div class="col-md-6 text-center">
                                                    <div class="alert alert-warning" role="alert">
                                                        <h4 class="alert-heading">Carrito Vacío</h4>
                                                        <p>Tu carrito está vacío. Añade productos para continuar con tu compra.</p>
                                                        <hr>
                                                        <a href="/index.html" class="btn-agregar-carrito">Ir a la tienda</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                     `
                                     contenedor.append(contenedorMensaje);    
    } catch (error) {
        console.log(error);
    }
                         
}


 const verCarrito = () => {
    if(carrito == ''){
        agregarContenedorDeCarritoVacio();
    }
    carrito.forEach(producto => {
        crearCardProductoCarrito(producto);
    })
    eliminarDelCarrito(carrito);
}     


const main = async () => {
    const productos = await obtenerProductos();
    crearCard(productos);
    agregarAlCarrito(productos);

}


