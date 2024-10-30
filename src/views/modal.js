import { productoActivo, setProductoActivo } from "../../main";
import { handleDeleteProduct } from "../services/products";

// === POPUP ===
const buttonCancelar = document.getElementById("buttonCancelar");
buttonCancelar.addEventListener("click", () => {
    closeModal();
});

//Función para abrir modal
export const openModal = () => {
    const modal = document.getElementById("modalPopUp");
    modal.style.display = "flex";

    const buttonDelete = document.getElementById("buttonEliminar");
    if(productoActivo){
        buttonDelete.style.display = "block";        
    }else{
        buttonDelete.style.display = "none";        
    };

    if(productoActivo){
        const nombreProducto = document.getElementById("nombreProducto"),
            imagenProducto = document.getElementById("imagenProducto"),
            precioProducto = document.getElementById("precioProducto"),
            categoriaProducto = document.getElementById("categoriaProducto"); 

            nombreProducto.value = productoActivo.nombreProducto;
            imagenProducto.value = productoActivo.imagenProducto;
            precioProducto.value = productoActivo.precioProducto;
            categoriaProducto.value = productoActivo.categoriaProducto;
    };

};

//Función para cerrar modal
export const closeModal = () => {
    const modal = document.getElementById("modalPopUp");
    modal.style.display = "none";
    setProductoActivo(null);
    resetModal();
};

//Función para resetear modal
const resetModal = () => {
    const nombreProducto = document.getElementById("nombreProducto"),
        imagenProducto = document.getElementById("imagenProducto"),
        precioProducto = document.getElementById("precioProducto"),
        categoriaProducto = document.getElementById("categoriaProducto");

        nombreProducto.value = "";
        imagenProducto.value = "";
        precioProducto.value = 0;
        categoriaProducto.value = "Seleccionar categoría";
};

const buttonEliminar = document.getElementById("buttonEliminar");
buttonEliminar.addEventListener("click", ()=>{
    handleButtonDelete();
});

const handleButtonDelete = ()=>{
    handleDeleteProduct();
};
