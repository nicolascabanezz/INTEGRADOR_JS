// === CATEGORÍAS ===

import { categoriaActiva } from "../../main";
import { handleGetProductsLocalStorage } from "../persistence/localStorage";
import { handleRenderList } from "../views/store";

const handleFilterProductsByCategory = (categoryIn) =>{
    const products = handleGetProductsLocalStorage();

    switch (categoryIn) {
        case categoriaActiva:
            handleRenderList(products);            
            break;
        case "Todo":
            handleRenderList(products);            
            break;
        case "Hamburguesas":
        case "Papas":
        case "Bebidas":
            const result = products.filter((el)=> el.categoriaProducto === categoryIn) 
            handleRenderList(result);            
        default:
            break;
        case "mayorPrecio":
            const resultMayorPrecio = products.sort((a,b)=> b.precioProducto - a.precioProducto);
            handleRenderList(resultMayorPrecio);
            break;
        case "menorPrecio":
            const resultMenorPrecio = products.sort((a,b)=> a.precioProducto - b.precioProducto);
            handleRenderList(resultMenorPrecio);
            break;
    }

};


//Render de la vista categorías

export const renderCategories = () => {
    //Tomamos elementos de la lista
    const ulList = document.getElementById("listFilter");
    //Creamos elementos dentro de la lista
    ulList.innerHTML = `
    <li id="Todo">Todos los productos</li>
    <li id="Hamburguesas">Hamburguesas</li>
    <li id="Papas">Papas</li>
    <li id="Bebidas">Bebidas</li>
    <li id="mayorPrecio">Mayor precio</li>
    <li id="menorPrecio">Menor precio</li>
    `;
    //Añadimos de forma dinámica el evento click
    const liElements = ulList.querySelectorAll("li");
    liElements.forEach((liElement) => {
        liElement.addEventListener("click", ()=>{
            console.log("Click en " + liElement.id);
            //Llamamos a la función
            handleClick(liElement);
        });
    });
    //Verificamos y manejamos el estilo del elemento que se encuentre activo
    const handleClick = (elemento) =>{
        handleFilterProductsByCategory(elemento.id);
        liElements.forEach((el)=>{
            if(el.classList.contains("liActive")){
                el.classList.remove("liActive");
            }else{
                if(elemento === el){
                    el.classList.add("liActive");
                }
            }
        });

    };

};
