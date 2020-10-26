  
export const filluserProducts = (products) => ({
    type: "FETCH_PRODUTS",
    productListe : products
})


export const addProducts = (product) => ({
    type: "ADD_PRODUCT",
    newProduct : product
   

})
export const modifyProduct = (product) => ({
    type: "MODIFY_PRODUCT",
    newProduct : product
})

export const signOutProduct = () => ({
    type: "SIGN_OUT_PRODUCT"
})

export const deleteProduct = (id) => ({
    type: "DELETE_PRODUCT",
    payload : id
})

