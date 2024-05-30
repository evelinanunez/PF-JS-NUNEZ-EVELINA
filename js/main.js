const URL = "https://api-ecommerce-nunez-evelina-default-rtdb.firebaseio.com/";


const crearProducto = async (nombre,precio,categoria,stock,descripcion)=>{
    const producto = {
        nombre,
        precio,
        categoria,
        imagen: "./asserts/img/imagen_taza.png",
        stock,
        descripcion
    }
    try {
        const response = await fetch(URL + "productos.json", {
            method: "POST",
            body: JSON.stringify(producto),
        })
    } catch (error) {
        console.log(error);
    }
    
    
}

const obtenerProductos = async() =>{
    try {
        const response = await fetch(URL + "productos.json", {
            method:"GET"
        })
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

const crearCardProducto = (producto) =>{
    const contenedor = document.getElementById("ContenedorProductos");;
    const card = document.createElement("div");
    card.className= "card";
    card.className= " card estilosCard";
    card.innerHTML = `
                                <img src="${producto.imagen}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${producto.nombre}</h5>
                                        <h5>$ ${producto.precio}</h5>
                                        <p class="card-text">${producto.descripcion}</p>
                                        <a href="#" class="btn btn-primary">Comprar</a>
                                    </div>
                        `
                        contenedor.append(card);                    
}


const mostrarProductos = async () =>{
    const data = await obtenerProductos();
    const productos =await Object.keys(data).map(key =>({id:key,...data[key]}));
    productos.forEach(
        (producto)=>{ crearCardProducto(producto);}
    );
}

/* const mostrarFormulario = () => {
    const aplicacion = document.getElementById("app");
    const element = document.createElement("div");
    const elementFila = document.createElement("div");
    element.append(elementFila);
    elementFila.className= "row justify-content-center";
    element.className="container";
    element.id="formulario";
    elementFila.innerHTML= `
                            <div class="col-12 col-md-9">
                            <div class="mb-3">
                            <label for="nombreProducto" class="form-label">Nombre producto: </label>
                            <input type="text" class="form-control" id="nombreProducto" placeholder="Indique el nombre del producto">
                            </div>
                            <div class="mb-3">
                            <label for="precioProducto" class="form-label">Precio:</label>
                            <input type="number" class="form-control" id="precioProducto" placeholder="Coloque un precio para el producto">
                            </div>
                            <div class="mb-3">
                            <label for="categoriaProducto" class="form-label">Categoria de producto:</label>
                            <input type="text" class="form-control" id="categoriaProducto" placeholder="Seleccione tipo de producto">
                            </div>
                            <div class="mb-3">
                            <label for="formFile" class="form-label">Seleccione una imagen: </label>
                            <input class="form-control" type="file" id="formFile">
                            </div>
                            <div class="mb-3">
                            <label for="stockProducto" class="form-label">Stock disponible: </label>
                            <input class="form-control" type="number" id="stockProducto">
                            </div>
                            <div class="mb-3">
                            <label for="descripcionProducto" class="form-label">Descripción del producto:</label>
                            <textarea class="form-control" id="descripcionProducto" rows="3"></textarea>
                            </div>
                            <div class="mb-3 text-center">
                            <button type="button" class="btn btn-success" id="btnAgregarProducto">Enviar</button>
                            <button type="button" class="btn btn-dark" id="btnCancelarAgregarProducto">Cancelar</button>
                            </div>
  </div>
                           `
    aplicacion.append(element);
} */


const limpiarHtml = () => {
    const aplicacion = document.getElementById("app");
    aplicacion.innerHTML= "";
}    


const main = () => {
    const botonAgregar = document.getElementById("btnAgregarProducto");
    botonAgregar.addEventListener("click", ()=>{
        const nombre = document.getElementById("nombreProducto").value;
        const precio = parseFloat(document.getElementById("precioProducto").value);
        const categoria = document.getElementById("categoriaProducto").value;
        const stock = parseFloat(document.getElementById("stockProducto").value);
        const descripcion = document.getElementById("descripcionProducto").value;
        crearProducto(nombre,precio,categoria,stock,descripcion);
        nombre = "";
        precio="";
        categoria ="";
        stock= "";
        descripcion="";
    })

    const linkProductos = document.getElementById("mostrarProductos");
    linkProductos.addEventListener("click", ()=>{
        mostrarProductos();
    })

    const linkAgregarProducto = document.getElementById("agregarProducto");
    linkAgregarProducto.addEventListener("click", ()=>{
        mostrarFormulario();
    })

    const cancelarAgregarProducto = document.getElementById("btnCancelarAgregarProducto");
    cancelarAgregarProducto.addEventListener("click", ()=>{
        limpiarHtml();
    })
}


main();