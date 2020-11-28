export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    // console.log("mutations/setCoach");
    state.coaches = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
    //getTime 方法的返回值一個數值，表示從1970年1月1日0時0分0秒（UTC，即協調世界時）距離該日期對象所代表時間的毫秒數。
  },
};
