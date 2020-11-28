export default {
  requests(state, getters, rootState, rootGetters) {
    const coachId = rootGetters.userId;

    return state.requests.filter((req) => req.coachId === coachId);
  },
  hasRequests(state, getters) {
    //return state.requests && state.requests.length > 0;
    return getters.requests && state.requests.length > 0; //注意這裡getters.requests呼叫getters的方法
  },
};
