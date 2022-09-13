require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it('Testa se a função com parametro "computador" fetch é chamado', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se a funçao com parametro "computador" usa o endpoint correto', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWidth(url);
  });

  it('Testa se a função com paremetro "computador" tem a estrutura igual a computadorSearch', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  
  it('Testa se ao chamar a função sem paremetro apareça a menssagem de erro', async () => {
    await fetchProducts();
    expect(fetchProducts()).toThrowError('You must provide an url');
  });
  // fail('Teste vazio');
});
