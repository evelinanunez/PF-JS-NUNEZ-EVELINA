//const URL = "https://api-ecommerce-nunez-evelina-default-rtdb.firebaseio.com/";
const carrito = JSON.parse(localStorage.getItem("carrito"))  || []

/* const crearProducto = async (nombre,precio,categoria,stock,descripcion)=>{
    const producto = {
        nombre,
        precio,
        categoria,
        imagen: "./asserts/img/imagen_taza.png",
        stock,
        descripcion
    }
    try {
        const response = await fetch("./productos.json", {
            method: "POST",
            body: JSON.stringify(producto),
        })
    } catch (error) {
        console.log(error);
    }
    
    
} */
    const crearCardProducto = (producto) =>{
        const contenedor = document.getElementById("contenedorProductos");;
        const card = document.createElement("div");
        //card.id= producto.id;
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
    }
    
const obtenerProductos = async() =>{
    try {
        const response = await fetch("./productos.json");
        const productos = await response.json();
        productos.forEach(producto=>{
            crearCardProducto(producto)
        })
        return productos;
    } catch (error) {
        console.log(error)
    }
}


const agregarAlCarrito =(productos)=>{
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.addEventListener("click", (ev)=>{
        if(ev.target && ev.target.classList.contains("btn-agregar-carrito")){
            const parentElement = ev.target.parentElement;
            const id = parentElement.id;
            const cantidad = parentElement.getElementsByClassName("cantidad")[0].value
            const producto = productos.find(producto => producto.id == id)
            carrito.push({...producto,cantidad})
            localStorage.setItem("carrito",JSON.stringify(carrito))
            Swal.fire("Producto agregado al carrito!"); 
        }
    })
}

const crearCardProductoCarrito = (producto) =>{
    const contenedor = document.getElementById("contenedorProductosCarrito");
    const card = document.createElement("div");
    card.className= " card estilosCard";
    card.id= producto.id;
    card.innerHTML = `
                                <img src="${producto.imagen}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${producto.titulo}</h5>
                                        <h5>$ ${producto.precio}</h5>
                                        <p class="card-text">${producto.descripcion}</p>
                                        <div class="d-flex justify-content-center">
                                        <button class="btn btn-danger btn-eliminar-producto-carrito m-1">Eliminar</button>
                                        <button class="btn btn-primary btn-comprar m-1">Comprar</button>
                                        <div>
                                    </div>
                        `
                        contenedor.append(card);                    
}

const  agregarContenedorDeCarritoVacio= ()=>{
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
                                                    <a href="/index.html" class="btn btn-primary">Ir a la tienda</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                 `
                                 contenedor.append(contenedorMensaje);                             
}


 const verCarrito = () => {
    console.log(carrito)
    if(carrito == ''){
        agregarContenedorDeCarritoVacio();
    }
    carrito.forEach(producto => {
        crearCardProductoCarrito(producto);
    })
}     


const main = async () => {
    const productos = await obtenerProductos();
    agregarAlCarrito(productos);

}


