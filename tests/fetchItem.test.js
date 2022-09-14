require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it('Testa se a função com parametro "MLB1615760527" fetch é chamado', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('Testa se a função com parametro "MLB1615760527" usa o endpoint correto', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Testa se a função com parametro "MLB1615760527" tem a estrutura igual a item', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });

  it('Testa se ao chamar a função sem paremetro apareça a menssagem de erro', async () => {
    const result = await fetchItem();
    expect(result).toEqual(new Error('You must provide an url'));
  });
  // fail('Teste vazio');
});
