module.exports = {
  first: function(store, lambda) {
    return Object.keys(store.data)
        .filter(k => lambda(store.data[k]))
        .map(key => store.data[key])[0];
  },
  find = function(store, lambda) {
    return Object.keys(store.data)
        .filter(k => lambda(store.data[k]))
        .map(key => store.data[key]);
  }
}