export default {
  async contactCoach(context, payload) {
    const newRequest = {
      // id: new Date().toISOString(),
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://udemy-vue-backend.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST", //PUT會整個刷新取代，不是我們要的
        body: JSON.stringify(newRequest),
      }
    );
    if (!response.ok) {
      const error = new Error(response.message || "Fail to send");
      throw error;
    }
    const responseData = await response.json();
    newRequest.id = responseData.name; //firebase會自動生成UUID存在name裡
    newRequest.coachId = payload.coachId; //不另存在DB
    context.commit("addRequest", newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://udemy-vue-backend.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(response.message || "Fail to send");
      throw error;
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(request);
    }
    context.commit("setRequests", requests);
  },
};
