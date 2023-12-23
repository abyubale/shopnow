export const getProductDetails = (productId) => {
  const url = productId
    ? `https://fakestoreapi.com/products/${productId}`
    : "https://fakestoreapi.com/products";
  console.log(url);
  return fetch(url).then((res) => res.json());
};

export const newApi = () => {
  return fetch("https://clumsy-miniskirt-tuna.cyclic.app/").then((res) =>
    res.json()
  );
};
