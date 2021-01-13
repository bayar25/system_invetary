import namespace from '../../utils/namespace.js';

export default namespace('product', {
  getters: [
    'getIdProduct',
    'getTypeQuery',
    'getActiveProduct',
    'getProduct',
    'getUpProduct',
    'getIdCategory',
    'getIdBrand',
    'getListProductSearch',
    'getListProduct',
  ],
  actions: [
    'addProduct',
    'upProduct',
    'delProduct',
    'viewProduct',
    'viewProductSearch',
    'resetProduct'
  ],
  mutations: [
    'setTypeQuery',
    'setIdProduct',
    'setProduct',
    'setUpProduct',
    'setIdCategory',
    'setIdBrand',
    'setListProductSearch',
    'setListProduct',
  ]
});
