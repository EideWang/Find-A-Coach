//import axios from "axios";
export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      id: context.rootGetters.userId,
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate,
    };
    // axios
    //   .put(`https://udemy-vue-backend.firebaseio.com/coaches/${userId}.json`, coachData)
    //   .catch((err) => {
    //     console.log(err);
    //     this.error = "Some errors occur...";
    //   });

    // context.commit("registerCoach", {
    //   ...coachData,
    //   id: userId,
    // });
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://udemy-vue-backend.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );
    // const responseData = await response.json();
    if (!response.ok) {
      //error..
    }
    context.commit("registerCoach", {
      ...coachData,
      id: userId,
    });
  },

  // async registerCoach(context, payload) {
  //   const userId = context.rootGetters.userId;
  //   const coachData = {
  //     id: context.rootGetters.userId,
  //     firstName: payload.first,
  //     lastName: payload.last,
  //     areas: payload.areas,
  //     description: payload.desc,
  //     hourlyRate: payload.rate,
  //   };

  //   // fetch('https://udemy-vue-backend.firebaseio.com/coaches.json',{
  //   //   method:'POST'
  //   // })

  //   //因為userId登入已存在(在register as a coach前就存在)，改成更新方式，用PUT

  //   //const responseData = response.json();  //暫無用到

  //   //body.json()
  //   //一個能夠實現 (resolve) 把回傳的結果的 body text 解析成 JSON 型別的 Promise。這可以是任何能夠被 JSON 呈現的資料型別 — 物件 (object), 陣列 (array), 字串 (string), 數字 (number)...

  // loadCoaches(context) {
  // axios
  //   .get(`https://udemy-vue-backend.firebaseio.com/coaches.json`)
  //   .then((res) => {
  //     console.log("ACTION coaches/actions/loadCoaches");
  //     const responseData = res.data;
  //     const coaches = [];
  //     for (const key in responseData) {
  //       const coach = {
  //         id: key,
  //         firstName: responseData[key].firstName,
  //         lastName: responseData[key].lastName,
  //         areas: responseData[key].areas,
  //         description: responseData[key].description,
  //         hourlyRate: responseData[key].hourlyRate,
  //       };
  //       coaches.push(coach);
  //     }
  //     context.commit("setCoaches", coaches);
  //     console.log("ACTION commit coaches/actions/loadCoaches");
  //   })
  //   .catch((error) => {
  //     // handle error
  //     this.isLoading = false;
  //     // console.log(error);
  //     this.error = error;
  //   });

  async loadCoaches(context, payload) {
    // console.log("ACTION coaches/actions/loadCoaches");
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return; //不需要update
    }
    //const token = context.getters.token;
    const response = await fetch(`https://udemy-vue-backend.firebaseio.com/coaches.json`);
    const responseData = await response.json();
    if (!response.ok) {
      //handle error
      const error = new Error(responseData.message || "Failed to fetch..");
      throw error;
    }
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };
      coaches.push(coach);
    }
    // console.log("ACTION commit coaches/actions/loadCoaches");
    // console.log(coaches);
    context.commit("setCoaches", coaches);
    context.commit("setFetchTimestamp");
  },
};
