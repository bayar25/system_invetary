import namespace from '../../utils/namespace.js';

export default namespace('Category', {
  getters: [
    'getIdCategory',
    'getTypeQuery',
    'getActiveCategory',
    'getCategory',
    'getUpCategory',
    'getListCategory',
  ],
  actions: [
    'addCategory',
    'upCategory',
    'delCategory',
    'viewCategory',
    'resetCategory'
  ],
  mutations: [
    'setTypeQuery',
    'setIdCategory',
    'setCategory',
    'setUpCategory',
    'setListCategory',
  ]
});
