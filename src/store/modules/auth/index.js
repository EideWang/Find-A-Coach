import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";
export default {
  state() {
    return {
      userId: null,
      token: null,
      // tokenExpiration: null,   //not used
      didAutoLogout: false,
    };
  },
  //   getters: getters,
  //   actions: actions,
  //   mutations: mutations,
  //可以簡略成下面
  getters,
  actions,
  mutations,
};
