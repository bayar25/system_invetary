import namespace from '../../utils/namespace.js';

export default namespace('brand', {
  getters: [
    'getIdBrand',
    'getTypeQuery',
    'getActiveBrand',
    'getBrand',
    'getUpBrand',
    'getListBrand',
  ],
  actions: [
    'addBrand',
    'upBrand',
    'delBrand',
    'viewBrand',
    'resetBrand'
  ],
  mutations: [
    'setTypeQuery',
    'setIdBrand',
    'setBrand',
    'setUpBrand',
    'setListBrand',
  ]
});
