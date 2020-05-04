const install = function (Vue) {
  Vue.prototype.$bus=new Vue({
    methods: {
      emit(event, ...args) {
        this.$emit(event, ...args);
      },
      on(event, callback) {
        this.$on(event, callback);
      },
      off(event, callback) {
        this.$off(event, callback);
      }
    }
  });
};
export default install;
