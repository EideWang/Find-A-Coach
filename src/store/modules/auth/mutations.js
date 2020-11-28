export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    // state.tokenExpiration = payload.tokenExpiration; //這裡其實不會用到
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
