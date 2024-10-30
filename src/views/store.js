// === Store ===

import { setProductoActivo } from "../../main";
import { handleGetProductsLocalStorage } from "../persistence/localStorage";
import { openModal } from "./modal";



//Con esta función traemos los elementos y llamamos al render. Esta es la función que llamamos en el main.
export const handleGetProductsToStore = () => {
    const products = handleGetProductsLocalStorage();
    handleRenderList(products);
};

//Filtramos y renderizamos la sección con sus respectivos elementos
export const handleRenderList = (productosIn) => {
    
    //Filtrado de arrays por categoría
    const hamburguesas = productosIn.filter((el) => el.categoriaProducto === "Hamburguesas" );
    const papas = productosIn.filter((el) => el.categoriaProducto === "Papas" );
    const bebidas = productosIn.filter((el) => el.categoriaProducto === "Bebidas" );
    
    //Renderizamos los elementos de la sección
    const renderProductGroup = (productos, titulo) => {

        if(productos.length > 0){
        
            const productosHTML = productos.map((producto, index) =>{

                return `<div class="containerTargetItem" id="product-${producto.categoriaProducto}-${index}">
                    <div>
                        <img src='${producto.imagenProducto}'/>
                
                        <div>
                        <h2>${producto.nombreProducto}</h2>
                        </div>                
                
                        <div class="targetProps">
                        <p><b>Precio:</b> $ ${producto.precioProducto}</p>
                        </div>
                
                    </div>
                
                </div>`;

            }); 
            
            //Retornamos la sección con todos los elementos
            return `
                <section class="sectionStore">
                    <div class="containerTitleSection">
                    <h3>${titulo}</h3>
                    </div>
                    <div class="containerProductStore">${productosHTML.join("")}</div>
                </section>  
            `;

        }else{
            return "";
        };

    }; //Cierre función renderProductGroup

    //Renderizamos cada uno de los productos dentro de su categoría
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
    ${renderProductGroup(hamburguesas, "Hamburguesas")}
    ${renderProductGroup(papas, "Papas")}
    ${renderProductGroup(bebidas, "Bebidas")}
    `;

    //Añadimos los eventos de manera dinámica
    const addEvents = (productsIn) => {
        productsIn.forEach((element, index) => {
            const productContainer = document.getElementById(
                `product-${element.categoriaProducto}-${index}`
            );

            productContainer.addEventListener("click", ()=>{
                console.log("productoActivo", element);
                setProductoActivo(element);
                openModal();

            });

        });
    }; //Cierre función addEvents

    addEvents(hamburguesas);
    addEvents(papas);
    addEvents(bebidas);

};