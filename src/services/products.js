import Swal from "sweetalert2";
import { productoActivo } from "../../main";
import { handleGetProductsLocalStorage, setInLocalStorage } from "../persistence/localStorage";
import { closeModal } from "../views/modal";
import { handleGetProductsToStore, handleRenderList } from "../views/store";

// === PRODUCTOS ===
// === GUARDAR/MODIFICAR PRODUCTOS ===
const buttonAceptar = document.getElementById("buttonAceptar"); 
buttonAceptar.addEventListener("click", () => {
    console.log("Botón Aceptar clickeado");
    handleSaveOrModifyProducts();
});

//Función de guardado
const handleSaveOrModifyProducts = () => {
    const nombreProducto = document.getElementById("nombreProducto").value,
        imagenProducto = document.getElementById("imagenProducto").value,
        precioProducto = document.getElementById("precioProducto").value,
        categoriaProducto = document.getElementById("categoriaProducto").value;

         // Me aseguro de que todos los campos estén llenos
        if (!nombreProducto || !imagenProducto || !precioProducto || !categoriaProducto) {
            Swal.fire({
                title: "Error!",
                text: "Por favor completa todos los campos.",
                icon: "error"
        });
        
        return; // Salir de la función si hay campos vacíos
        };
        
        if (parseFloat(precioProducto) <= 0) {
            Swal.fire({
                title: "Error!",
                text: "El precio debe ser mayor que cero.",
                icon: "error"
            });
            return; // Salir de la función si el precio es cero o negativo
        }

        let object;
        //productoActivo = null;
        if(productoActivo){
            object = {
                ... productoActivo,
                nombreProducto,
                imagenProducto,
                precioProducto,
                categoriaProducto,
            };
        }else{            
            object = {
                id: new Date().toISOString(),
                nombreProducto,
                imagenProducto,
                precioProducto,
                categoriaProducto,
            }; 
        };
        
        Swal.fire({
            title: "Correcto!",
            text: "Producto guardado correctamente!",
            icon: "success"
        });

        setInLocalStorage(object);
        handleGetProductsToStore();
        //Cerramos el PopUp
        closeModal();
};

//Eliminar producto

export const handleDeleteProduct = ()=>{

    Swal.fire({
        title: "¿Está seguro?",
        text: "Si elimina el producto, será de forma permanente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductsLocalStorage();
            const result = products.filter((el) => el.id !== productoActivo.id);
              //Seteamos el nuevo array
              localStorage.setItem("products", JSON.stringify(result));
            const newProducts = handleGetProductsLocalStorage();
            handleRenderList(newProducts);
            closeModal();       
        }else{
            closeModal();   
        };
      });
};