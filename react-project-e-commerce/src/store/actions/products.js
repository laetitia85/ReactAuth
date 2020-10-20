export const addProducts = (newProducts) => ({
    type: "ADD_PRODUCTS",
    name: newProducts.name,
    category: newProducts.category,
    price: newProducts.price,
    description: newProducts.description,
    picture: newProducts.picture,

})