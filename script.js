const getOl = document.querySelector('.cart__items');
// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
*/

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
*/

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
*/

const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const objectResult = async (param) => {
  const itemsClass = document.querySelector('.items');
  const getProd = await fetchProducts(param);
  getProd.results.forEach((prod) => { 
    const obj = { 
      id: prod.id,
      title: prod.title,
      thumbnail: prod.thumbnail, 
    };
    const insertProdct = createProductItemElement(obj);
    itemsClass.appendChild(insertProdct);
  });
};

const clearCarrinho = () => {
  getOl.innerHTML = '';
  localStorage.clear();
};

const resetCarrinho = () => {
  const clearBtn = document.querySelector('.empty-cart');
  clearBtn.addEventListener('click', clearCarrinho);
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
*/

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
*/

const recuperaLocalStorage = () => {
  const armazena = localStorage.getItem('cartItems');
  return JSON.parse(armazena);
};

const sumTotal = () => {
  const getTotal = document.querySelector('.total-price');
  const array = recuperaLocalStorage() || [];
  const arraySplit = array.map((param) => param.split('$').splice(1, 1));
  const flat = arraySplit.flatMap((num) => num);
  const resultado = flat.reduce((acc, curr) => +acc + +curr, 0);
  getTotal.innerHTML = resultado;
};

const saveLocalStorage = (param) => {
  const armazena = recuperaLocalStorage() || [];
  const total = [...armazena, param];
  localStorage.setItem('cartItems', JSON.stringify(total));
  sumTotal();
};

const soma = () => {
  const getLi = document.querySelectorAll('.cart__item');
  console.log(getLi);
};

const cartItemClickListener = (event) => {
  event.target.remove();
};

const recuperaItems = () => {
  const imprime = recuperaLocalStorage() || [];
  imprime.forEach((valor) => {
    const li = document.createElement('li');
    li.className = 'cart__item';
    li.innerText = valor;
    li.addEventListener('click', cartItemClickListener);
    getOl.appendChild(li);
  });
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const myCart = async () => {
  const getButton = document.querySelectorAll('.item__add');
  getButton.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const id = event.target.parentNode.firstChild.innerText;
      const item = await fetchItem(id);
      const func = createCartItemElement(item);
      getOl.appendChild(func);
      saveLocalStorage(func.innerText);
    });
  });
};

const createLoading = () => {
  const div = document.createElement('div');
  div.className = 'loading';
  div.innerText = 'Carregando...';
  const itemsClass = document.querySelector('.items');
  itemsClass.appendChild(div);
};

const removeLoading = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
};

window.onload = async () => {
  createLoading();
  await objectResult('computador');
  myCart();
  resetCarrinho();
  recuperaItems();
  removeLoading();
  soma();
};
