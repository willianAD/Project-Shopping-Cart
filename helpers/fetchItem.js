const fetchItem = async (param) => {
  try {
    const url = `https://api.mercadolibre.com/items/${param}`;
    const response = await fetch(url);
    const item = await response.json();
    return item;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
