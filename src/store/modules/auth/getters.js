export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    //有token表示已登入
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
