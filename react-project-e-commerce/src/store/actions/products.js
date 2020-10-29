export const filluserProducts = (products) => ({
  type: "FETCH_PRODUTS",
  productListe: products,
});
export const addProducts = (product) => ({
  type: "ADD_PRODUCT",
  newProduct: product,
});
export const modifyProduct = (product, productId) => ({
  type: "MODIFY_PRODUCT",
  payload: product,
  id : productId
});
export const signOutProduct = () => ({
  type: "SIGN_OUT_PRODUCT",
});
export const deleteProduct = (id) => ({
  type: "DELETE_PRODUCT",
  payload: id,
});
export const addToCart = (product) => ({
  type: "ADD_TOCART",
  payload: product,
});
export const incQuantity = (productID) => ({
  type: "INC_QUANTITY",
  payload: productID,
});
export const decQuantity = (productID) => ({
  type: "DEC_QUANTITY",
  payload: productID,
});
