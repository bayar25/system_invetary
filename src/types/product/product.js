import namespace from '../../utils/namespace.js';

export default namespace('product', {
  getters: [
    'getValidProduct',
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
