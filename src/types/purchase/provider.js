import namespace from '../../utils/namespace.js';

export default namespace('provider', {
  getters: [
    'getTypeQuery',
    'getProvider',
    'getUpProvider',
    'getActiveProvider',
    'getPhone',
    'getUpPhone',
    'getActivePhone',
    'getListProvider',
  ],
  actions: [
    'addProvider',
    'upProvider',
    'delProvider',
    'viewProvider',
    'resetProvider'
  ],
  mutations: [
    'setTypeQuery',
    'setProvider',
    'setUpProvider',
    'setActiveProvider',
    'setPhone',
    'setUpPhone',
    'setActivePhone',
    'setListProvider',
  ]
});
