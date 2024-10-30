// === LOCAL STORAGE ===

//Traer productos LocalStorage
export const handleGetProductsLocalStorage = () => {

    const products = JSON.parse(localStorage.getItem("products"));

    if (products) {
        return products;
    } else {
        return [];
    }
};

//Guardar en LocalStorage

//Recibimos un producto
export const setInLocalStorage = (productIn) => {

    //Traemos todos los elementos
    let productsInLocal = handleGetProductsLocalStorage();

    const existingIndex = productsInLocal.findIndex((productsLocal) =>
        productsLocal.id === productIn.id
    );

    //Verificamos si el producto existe
    if (existingIndex !== -1) { //Si es diferente de -1, existe
        //Si el producto existe, se reemplaza
        productsInLocal[existingIndex] = productIn;

    } else {
        //Si el producto no existe, se agrega
        productsInLocal.push(productIn);

    }

    //Seteamos el nuevo array
    localStorage.setItem("products", JSON.stringify(productsInLocal));

};