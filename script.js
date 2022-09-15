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

const objetoResults = async (param) => {
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

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */

// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText; ESTE ESTÁ ERRADO!!!

// const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

 const cartItemClickListener = (event) => {
  event.target.remove();
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const meuCarrinho = async () => {
  const getButton = document.querySelectorAll('.item__add');
  const getOl = document.querySelector('.cart__items');
  getButton.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const id = event.target.parentNode.firstChild.innerText;
      const item = await fetchItem(id);
      getOl.appendChild(createCartItemElement(item));
    });
  });
};

const clearCarrinho = () => {
  const getOl = document.querySelector('.cart__items');
  getOl.innerHTML = '';
};

const resetCarrinho = () => {
  const clearBtn = document.querySelector('.empty-cart');
  clearBtn.addEventListener('click', clearCarrinho);
};

// const sumProdutos = async () => {
//   const getTotal = document.querySelector('.total-price');
//   console.log(getTotal);
//   // getTotal.innerText = ;
// };

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
  await objetoResults('computador');
  removeLoading();
  meuCarrinho();
  resetCarrinho();
  // sumProdutos();
};
