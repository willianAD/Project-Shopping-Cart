const fetchProducts = async (param) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

console.log(fetchProducts());

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
